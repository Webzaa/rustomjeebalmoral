<?php

//ini_set('display_errors', 1);
//ini_set('display_startup_errors', 1);
//error_reporting(E_ALL);

/**
 * googleadsapi.php
 *
 * Google Ads lead webhook handler.
 * Manager's webhook receives the lead from Google and calls this file
 * directly with the lead payload (no auth check needed on our side).
 *
 * Flow:
 *   Validate Request
 *   -> Save Raw Payload (log file)
 *   -> Check Campaign Master (campaigns table: exists? / not exists -> Google Ads API -> Store)
 *   -> Check AdGroup Master (adgroups table)
 *   -> Check Creative Master (ads table)
 *   -> Build Lead Object
 *   -> Store Lead (lead table)
 *   -> CRM Integration (optional)
 *   -> Return Success
 *
 * Assumes $mysqli (mysqli connection) is bootstrapped before this file runs.
 */

// Load database credentials
$dbConfig = [
    'host' => 'localhost',
    'user' => 'root',
    'pass' => '',
    'name' => 'test_rustomjee_prive_sudo',
];

if (file_exists(__DIR__ . '/config/db_config.php')) {
    $dbConfig = array_merge($dbConfig, require __DIR__ . '/config/db_config.php');
}

$mysqli = @new mysqli($dbConfig['host'], $dbConfig['user'], $dbConfig['pass'], $dbConfig['name']);

if ($mysqli->connect_error) {
    die("Database Connection Failed: " . $mysqli->connect_error);
}

header('Content-Type: application/json');

// ---------------------------------------------------------------------
// STEP 0: Bootstrap / dependencies
// ---------------------------------------------------------------------
$googleAdsConfigFile = file_exists(__DIR__ . '/config/google_ads_config.php')
    ? __DIR__ . '/config/google_ads_config.php'
    : __DIR__ . '/config/google_ads_config.example.php';
$googleAdsConfig = file_exists($googleAdsConfigFile) ? require $googleAdsConfigFile : [];
// require_once __DIR__ . '/../bootstrap.php'; // <-- uncomment / adjust: should set $mysqli


// ---------------------------------------------------------------------
// STEP 1b: Simple file logger — tail this file while testing
//   e.g. tail -f logs/google_ads.log
// ---------------------------------------------------------------------
define('GOOGLE_ADS_LOG_FILE', __DIR__ . '/logs/google_ads.log');

function logToFile(string $label, $data): void
{
    $logDir = dirname(GOOGLE_ADS_LOG_FILE);
    if (!is_dir($logDir)) {
        mkdir($logDir, 0775, true);
    }

    $line = sprintf(
        "[%s] %s: %s\n",
        date('Y-m-d H:i:s'),
        $label,
        is_string($data) ? $data : json_encode($data, JSON_PRETTY_PRINT)
    );

    file_put_contents(GOOGLE_ADS_LOG_FILE, $line, FILE_APPEND);
}


// ---------------------------------------------------------------------
// STEP 1: Validate Request
// ---------------------------------------------------------------------
function validateRequest(): array
{
    $rawBody = file_get_contents('php://input');
    $data = json_decode($rawBody, true);

    if (json_last_error() !== JSON_ERROR_NONE || empty($data)) {
        respondError('Invalid or empty JSON payload', 400);
    }

    if (empty($data['campaign_id'])) {
        respondError('Missing utm_campaignid in payload', 422);
    }

    return ['raw' => $rawBody, 'data' => $data];
}

function respondError(string $message, int $httpCode = 400): void
{
    http_response_code($httpCode);
    $body = ['success' => false, 'error' => $message];
    logToFile("RESPONSE ERROR (HTTP {$httpCode})", $body);
    echo json_encode($body);
    exit;
}

function respondSuccess(array $payload): void
{
    http_response_code(200);
    $body = array_merge(['success' => true], $payload);
    logToFile('RESPONSE SUCCESS', $body);
    echo json_encode($body);
    exit;
}


// ---------------------------------------------------------------------
// STEP 2: Save Raw Payload (to log file; DB table optional/commented out)
// ---------------------------------------------------------------------
function saveRawPayload(string $rawBody): void
{
    logToFile('INCOMING PAYLOAD', $rawBody);
}


// ---------------------------------------------------------------------
// STEP 3: Google Ads OAuth token (refresh_token grant)
// ---------------------------------------------------------------------
function getGoogleAdsAccessToken(array $config): string
{
    $ch = curl_init('https://oauth2.googleapis.com/token');
    curl_setopt_array($ch, [
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_POST           => true,
        CURLOPT_POSTFIELDS     => http_build_query([
            'client_id'     => $config['client_id'],
            'client_secret' => $config['client_secret'],
            'refresh_token' => $config['refresh_token'],
            'grant_type'    => 'refresh_token',
        ]),
        CURLOPT_HTTPHEADER => ['Content-Type: application/x-www-form-urlencoded'],
    ]);

    $response = curl_exec($ch);
    $httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
    curl_close($ch);

    logToFile("OAUTH TOKEN RESPONSE (HTTP {$httpCode})", $response);

    $body = json_decode($response, true);

    if ($httpCode !== 200 || empty($body['access_token'])) {
        respondError('Failed to obtain Google Ads access token', 502);
    }

    return $body['access_token'];
}

// ---------------------------------------------------------------------
// STEP 3b: Generic Google Ads searchStream query helper
// ---------------------------------------------------------------------
function googleAdsSearchStream(array $config, string $accessToken, string $gaql): array
{
    $url = "https://googleads.googleapis.com/{$config['api_version']}/customers/{$config['customer_id']}/googleAds:searchStream";

    $headers = [
        "Authorization: Bearer {$accessToken}",
        "developer-token: {$config['developer_token']}",
        "Content-Type: application/json",
    ];
    if (!empty($config['login_customer_id'])) {
        $headers[] = "login-customer-id: {$config['login_customer_id']}";
    }

    $ch = curl_init($url);
    curl_setopt_array($ch, [
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_POST           => true,
        CURLOPT_POSTFIELDS     => json_encode(['query' => $gaql]),
        CURLOPT_HTTPHEADER     => $headers,
    ]);

    $response = curl_exec($ch);
    $httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
    curl_close($ch);

    logToFile("SEARCHSTREAM RESPONSE (HTTP {$httpCode}) - query: {$gaql}", $response);

    if ($httpCode !== 200) {
        respondError('Google Ads API request failed', 502);
    }

    $decoded = json_decode($response, true);

    // searchStream returns an array of { results: [...] } chunks
    $rows = [];
    foreach ($decoded as $chunk) {
        if (!empty($chunk['results'])) {
            $rows = array_merge($rows, $chunk['results']);
        }
    }
    return $rows;
}

// ---------------------------------------------------------------------
// STEP 4: Check Campaign Master  (table: campaigns)
// columns: id, campaign_id (UNI), campaign_name, status, platform, created_at, updated_at
// ---------------------------------------------------------------------
function checkCampaignMaster(mysqli $mysqli, array $config, string $campaignId, ?string &$accessToken): string
{
    $stmt = $mysqli->prepare(
        "SELECT campaign_name FROM campaigns WHERE campaign_id = ? AND platform = 'google' LIMIT 1"
    );
    $stmt->bind_param('s', $campaignId);
    $stmt->execute();
    $result = $stmt->get_result();

    if ($row = $result->fetch_assoc()) {
        $stmt->close();
        return $row['campaign_name']; // Exists ✔
    }
    $stmt->close();

    // Not Exists -> Google Ads API -> Store Campaign Master
    if ($accessToken === null) {
        $accessToken = getGoogleAdsAccessToken($config);
    }

    $gaql = "SELECT campaign.id, campaign.name, campaign.status FROM campaign WHERE campaign.id = {$campaignId}";
    $rows = googleAdsSearchStream($config, $accessToken, $gaql);

    if (empty($rows[0]['campaign']['name'])) {
        respondError("Campaign {$campaignId} not found in Google Ads account", 404);
    }
    $campaignName = $rows[0]['campaign']['name'];
    $status = $rows[0]['campaign']['status'] ?? null;

    $insert = $mysqli->prepare(
        "INSERT INTO campaigns (campaign_id, campaign_name, status, platform)
         VALUES (?, ?, ?, 'google')"
    );
    $insert->bind_param('sss', $campaignId, $campaignName, $status);
    $insert->execute();
    $insert->close();

    return $campaignName;
}

// ---------------------------------------------------------------------
// STEP 5: Check AdGroup Master  (table: adgroups)
// columns: id, adgroup_id (UNI), campaign_id, adgroup_name, status, platform, created_at, updated_at
// ---------------------------------------------------------------------
function checkAdGroupMaster(mysqli $mysqli, array $config, string $adGroupId, string $campaignId, ?string &$accessToken): string
{
    $stmt = $mysqli->prepare(
        "SELECT adgroup_name FROM adgroups WHERE adgroup_id = ? AND platform = 'google' LIMIT 1"
    );
    $stmt->bind_param('s', $adGroupId);
    $stmt->execute();
    $result = $stmt->get_result();

    if ($row = $result->fetch_assoc()) {
        $stmt->close();
        return $row['adgroup_name'];
    }
    $stmt->close();

    if ($accessToken === null) {
        $accessToken = getGoogleAdsAccessToken($config);
    }

    $gaql = "SELECT ad_group.id, ad_group.name, ad_group.status FROM ad_group WHERE ad_group.id = {$adGroupId}";
    $rows = googleAdsSearchStream($config, $accessToken, $gaql);

    if (empty($rows[0]['adGroup']['name'])) {
        respondError("Ad group {$adGroupId} not found in Google Ads account", 404);
    }
    $adGroupName = $rows[0]['adGroup']['name'];
    $status = $rows[0]['adGroup']['status'] ?? null;

    $insert = $mysqli->prepare(
        "INSERT INTO adgroups (adgroup_id, campaign_id, adgroup_name, status, platform)
         VALUES (?, ?, ?, ?, 'google')"
    );
    $insert->bind_param('ssss', $adGroupId, $campaignId, $adGroupName, $status);
    $insert->execute();
    $insert->close();

    return $adGroupName;
}

// ---------------------------------------------------------------------
// STEP 6: Check Creative Master  (table: ads)
// columns: id, ad_id (UNI), adgroup_id, ad_name, status, platform, created_at, updated_at
// ---------------------------------------------------------------------
function checkCreativeMaster(mysqli $mysqli, array $config, string $adId, string $adGroupId, ?string &$accessToken): string
{
    $stmt = $mysqli->prepare(
        "SELECT ad_name FROM ads WHERE ad_id = ? AND platform = 'google' LIMIT 1"
    );
    $stmt->bind_param('s', $adId);
    $stmt->execute();
    $result = $stmt->get_result();

    if ($row = $result->fetch_assoc()) {
        $stmt->close();
        return $row['ad_name'];
    }
    $stmt->close();

    if ($accessToken === null) {
        $accessToken = getGoogleAdsAccessToken($config);
    }

    $gaql = "SELECT ad_group_ad.ad.id, ad_group_ad.ad.name, ad_group_ad.status
              FROM ad_group_ad WHERE ad_group_ad.ad.id = {$adId}";
    $rows = googleAdsSearchStream($config, $accessToken, $gaql);

    $adName = $rows[0]['adGroupAd']['ad']['name'] ?? "Ad {$adId}";
    $status = $rows[0]['adGroupAd']['status'] ?? null;

    $insert = $mysqli->prepare(
        "INSERT INTO ads (ad_id, adgroup_id, ad_name, status, platform)
         VALUES (?, ?, ?, ?, 'google')"
    );
    $insert->bind_param('ssss', $adId, $adGroupId, $adName, $status);
    $insert->execute();
    $insert->close();

    return $adName;
}


// ---------------------------------------------------------------------
// STEP 7: Build Lead Object  (maps onto real `lead` table columns)
// Adjust the $data['...'] keys on the left once you have a sample
// payload from your manager's webhook.
// ---------------------------------------------------------------------
function buildLeadObject(array $data, string $campaignName, string $adGroupName, string $adName): array
{
    return [
        'name'              => $data['name'] ?? null,
        'email'             => $data['email'] ?? null,
        'countrycode' => "91",
        'form_id' => $data['form_id'] ?? null,
        'mobile'            => $data['mobile'] ?? $data['phone'] ?? null,
        'ad_id' => $data['creative_id'] ?? null,
        'gclid'             => $data['gclid'] ?? null,
        'campaign_name'     => $campaignName,
        'ad_name'           => $adName,
        'utm_campaignid' => $data['campaign_id'] ?? null,
        'utm_campaignname' => $campaignName,
        'utm_adgroupid' => $data['adgroup_id'] ?? null,
        'utm_adgroupname' => $adGroupName,
        'utm_adid' => $data['creative_id'] ?? null,
        'utm_adname' => $adName,
        'lead_status'       => 'new',
        'payload'           => json_encode($data),
    ];
}


// ---------------------------------------------------------------------
// STEP 8: Store Lead  (table: lead)
// ---------------------------------------------------------------------
function storeLead(mysqli $mysqli, array $lead): int
{
    $stmt = $mysqli->prepare(
        "INSERT INTO `lead`
            (name, email, countrycode, mobile, ad_id, form_id, gclid,
             campaign_name, ad_name, utm_campaignid, utm_campaignname,
             utm_adgroupid, utm_adgroupname, utm_adid, utm_adname,
             lead_status, createddate)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, NOW())"
    );
    $stmt->bind_param(
        'ssssssssssssssss',
        $lead['name'],
        $lead['email'],
        $lead['countrycode'],
        $lead['mobile'],
        $lead['ad_id'],
        $lead['form_id'],
        $lead['gclid'],
        $lead['campaign_name'],
        $lead['ad_name'],
        $lead['utm_campaignid'],
        $lead['utm_campaignname'],
        $lead['utm_adgroupid'],
        $lead['utm_adgroupname'],
        $lead['utm_adid'],
        $lead['utm_adname'],
        $lead['lead_status']
    );
    $stmt->execute();
    $leadId = $stmt->insert_id;
    $stmt->close();

    return $leadId;
}

// ---------------------------------------------------------------------
// STEP 9: CRM Integration (optional) — plug in your Salesforce/CRM call here
// ---------------------------------------------------------------------
function syncLeadToCrm(mysqli $mysqli, array $lead, int $leadId): void
{
    /*
     * ============================================================
     * Salesforce Integration
     * ============================================================
     */

    // Load Salesforce credentials
    $sfConfigFile = file_exists(__DIR__ . '/config/salesforce_config.php')
        ? __DIR__ . '/config/salesforce_config.php'
        : __DIR__ . '/config/salesforce_config.example.php';
    $sfConfig = file_exists($sfConfigFile) ? require $sfConfigFile : [];

    $curl = curl_init();

    curl_setopt_array($curl, [
        CURLOPT_URL => 'https://login.salesforce.com/services/oauth2/token',
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_ENCODING => '',
        CURLOPT_MAXREDIRS => 10,
        CURLOPT_TIMEOUT => 30,
        CURLOPT_CONNECTTIMEOUT => 10,
        CURLOPT_FOLLOWLOCATION => true,
        CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
        CURLOPT_CUSTOMREQUEST => 'POST',

        CURLOPT_POSTFIELDS => http_build_query([
            'grant_type'    => $sfConfig['grant_type'] ?? 'password',
            'client_id'     => $sfConfig['client_id'] ?? 'YOUR_SALESFORCE_CLIENT_ID',
            'client_secret' => $sfConfig['client_secret'] ?? 'YOUR_SALESFORCE_CLIENT_SECRET',
            'username'      => $sfConfig['username'] ?? 'YOUR_SALESFORCE_USERNAME',
            'password'      => $sfConfig['password'] ?? 'YOUR_SALESFORCE_PASSWORD',
        ]),

        CURLOPT_HTTPHEADER => [
            'Content-Type: application/x-www-form-urlencoded',
            'Accept: application/json'
        ],

        CURLOPT_SSL_VERIFYPEER => true,
        CURLOPT_SSL_VERIFYHOST => 2,
    ]);

    $response1 = curl_exec($curl);

    $tokenHttpCode = curl_getinfo($curl, CURLINFO_HTTP_CODE);
    $tokenCurlError = curl_error($curl);

    curl_close($curl);


    /*
     * ============================================================
     * Salesforce Token Response
     * ============================================================
     */

    if ($response1 === false) {

        $curlresponse = json_encode([
            'success'   => false,
            'stage'     => 'salesforce_token',
            'http_code' => $tokenHttpCode,
            'error'     => $tokenCurlError
        ]);

        logToFile("SALESFORCE TOKEN ERROR", $curlresponse);

    } else {

        $tokenResponse = json_decode($response1, true);

        if (empty($tokenResponse['access_token'])) {

            $curlresponse = json_encode([
                'success'   => false,
                'stage'     => 'salesforce_token',
                'http_code' => $tokenHttpCode,
                'response'  => $tokenResponse ?: $response1
            ]);

            logToFile("SALESFORCE TOKEN ERROR", $curlresponse);

        } else {

            $token = $tokenResponse['access_token'];


            /*
             * ====================================================
             * Salesforce Lead Payload
             * ====================================================
             */

            $salesforcePayload = [
                "FirstName"              => $lead['name'] ?? '',
                "LastName"               => $lead['name'] ?? '',
                "EmailAddress"           => $lead['email'] ?? '',
                "DialingCode"            => $lead['countrycode'] ?? '91',
                "MobileNumber"           => $lead['mobile'] ?? '',
                "CampaignCode"           => "FY26_27",
                "CampaignName"           => "Digital FY 26_27",
                "Project"                => "Rustomjee Prive",
                "SourceGrouping"         => "Digital",
                "Source"                 => "Google",
                "SubSource"              => "Organic",
                "Device"                 => $lead['device'] ?? '',
                "GCLID"                  => $lead['gclid'] ?? '',
                "Keyword"                => $lead['keyword'] ?? '',
                "Placement"              => "Webzaa",
                "ProspectCapturingPoint" => "prospect",
                "WhatsappOptn"           => true,
                "preferredproject"       => "",
                "current_resd_location"  => "",
                "budget"                 => "0",
                "AdSetId"                => "",
                "AdsetName"              => $lead['adset'] ?? '',
                "AdId"                   => "",
                "AdName"                 => $lead['adcreative'] ?? '',
                "MetaId"                 => $lead['uniqueid'] ?? ''
            ];


            /*
             * ====================================================
             * Send Lead To Salesforce
             * ====================================================
             */

            $curl = curl_init();

            curl_setopt_array($curl, [
                CURLOPT_URL => 'https://rustomjeesf.my.salesforce.com/services/apexrest/WebEnqs',
                CURLOPT_RETURNTRANSFER => true,
                CURLOPT_ENCODING => '',
                CURLOPT_MAXREDIRS => 10,
                CURLOPT_TIMEOUT => 30,
                CURLOPT_CONNECTTIMEOUT => 10,
                CURLOPT_FOLLOWLOCATION => true,
                CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
                CURLOPT_CUSTOMREQUEST => 'POST',

                CURLOPT_POSTFIELDS => json_encode(
                    $salesforcePayload,
                    JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE
                ),

                CURLOPT_HTTPHEADER => [
                    'Authorization: Bearer ' . $token,
                    'Content-Type: application/json',
                    'Accept: application/json'
                ],

                CURLOPT_SSL_VERIFYPEER => true,
                CURLOPT_SSL_VERIFYHOST => 2,
            ]);

            $response = curl_exec($curl);

            $httpCode = curl_getinfo($curl, CURLINFO_HTTP_CODE);
            $curlError = curl_error($curl);

            curl_close($curl);


            /*
             * ====================================================
             * Salesforce Response
             * ====================================================
             */

            if ($response === false) {

                $curlresponse = json_encode([
                    'success'    => false,
                    'stage'      => 'salesforce_lead',
                    'http_code'  => $httpCode,
                    'curl_error' => $curlError
                ]);

                logToFile("SALESFORCE CURL ERROR", $curlresponse);

            } else {

                $curlresponse = json_encode([
                    'success'   => ($httpCode >= 200 && $httpCode < 300),
                    'stage'     => 'salesforce_lead',
                    'http_code' => $httpCode,
                    'response'  => $response
                ]);

                logToFile("SALESFORCE RESPONSE", $curlresponse);
            }
        }
    }


    /*
     * ============================================================
     * Update Lead Table
     * ============================================================
     */

    $stmt = $mysqli->prepare("
        UPDATE `lead`
        SET curlresponse = ?
        WHERE id = ?
    ");

    if (!$stmt) {
        logToFile("CRM DB ERROR", $mysqli->error);
        return;
    }

    $stmt->bind_param("si", $curlresponse, $leadId);

    if (!$stmt->execute()) {
        logToFile("CRM UPDATE ERROR", $stmt->error);
    }

    $stmt->close();
}

// =======================================================================
// MAIN EXECUTION
// =======================================================================
try {
    $request = validateRequest();
    $data = $request['data'];

    saveRawPayload($request['raw']);

    $accessToken = null; // fetched lazily, reused across the 3 master checks

    $campaignName = checkCampaignMaster($mysqli, $googleAdsConfig, (string) $data['campaign_id'], $accessToken);

    $adGroupName = !empty($data['adgroup_id'])
        ? checkAdGroupMaster($mysqli, $googleAdsConfig, (string) $data['adgroup_id'], (string) $data['campaign_id'], $accessToken)
        : '';

    $adName = !empty($data['creative_id'])
        ? checkCreativeMaster($mysqli, $googleAdsConfig, (string) $data['creative_id'], (string) ($data['adgroup_id'] ?? ''), $accessToken)
        : '';

    $lead = buildLeadObject($data, $campaignName, $adGroupName, $adName);
    logToFile('BUILT LEAD OBJECT', $lead);

    $leadId = storeLead($mysqli, $lead);

    try {
        syncLeadToCrm($mysqli, $lead, $leadId);
    } catch (Throwable $e) {
        logToFile('CRM ERROR', $e->getMessage());
    }

    respondSuccess(['lead_id' => $leadId]);
} catch (Throwable $e) {
    logToFile('ERROR', [
        'message' => $e->getMessage(),
        'file'    => $e->getFile(),
        'line'    => $e->getLine(),
        'trace'   => $e->getTraceAsString(),
    ]);

    echo json_encode([
        'success' => false,
        'message' => $e->getMessage(),
        'file'    => $e->getFile(),
        'line'    => $e->getLine()
    ]);
    exit;
}
