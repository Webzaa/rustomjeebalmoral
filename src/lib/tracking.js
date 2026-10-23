// MoEngage dataLayer helpers. The client-provided /js/moengage-datalayer.js
// (loaded in public/index.html) defines the global rustomjeePush* functions.
// Calls are guarded so a blocked/missing script never breaks form submission.

const PROJECT_SLUG = "rustomjee-balmoral-golflinks";

export function trackLeadSubmitted({
  countryCode,
  mobile,
  email,
  name,
  formName,
  formLocation,
  leadId,
}) {
  try {
    if (typeof window.rustomjeePushLeadSubmitted !== "function") return;

    window.rustomjeePushLeadSubmitted({
      phone: window.rustomjeeToDialFormat
        ? window.rustomjeeToDialFormat(countryCode, mobile)
        : "",
      email: (email || "").trim(),
      name: (name || "").trim(),
      project: PROJECT_SLUG,
      formName: formName || "",
      formLocation: formLocation || "", // "body" | "modal"
      leadId: leadId || "",
    });
  } catch (err) {
    console.error("MoEngage lead tracking failed:", err);
  }
}

/*
  FLOOR PLAN DOWNLOADED  (rustomjeePushFloorPlanDownloaded)

  Only `configuration` comes from the page (the config the visitor picked).
  Fill in the static values below per configuration:
    floorPlanId     - stable id / filename of that floor plan, e.g. "4bhk-floor-plan.pdf"
    carpetAreaSqft  - NUMBER in sq ft, no units or commas, e.g. 1250

  NOTE: moengage-datalayer.js fires each floor plan once per
  (floorPlanId + project). Keep floorPlanId different for 4 BHK and 5 BHK, otherwise
  the second one is silently dropped. If left empty, an id is derived from the
  configuration so they never collide.
*/
const FLOOR_PLANS = {
  "4 BHK": { floorPlanId: "", carpetAreaSqft: 0 },
  "5 BHK": { floorPlanId: "", carpetAreaSqft: 0 },
};

export function trackFloorPlanDownloaded(configuration) {
  try {
    if (typeof window.rustomjeePushFloorPlanDownloaded !== "function") return;

    const plan = FLOOR_PLANS[configuration] || {};

    window.rustomjeePushFloorPlanDownloaded({
      floorPlanId:
        plan.floorPlanId ||
        `${String(configuration || "floor-plan").toLowerCase().replace(/[^a-z0-9]+/g, "-")}-floor-plan`,
      configuration: configuration || "",
      carpetAreaSqft: typeof plan.carpetAreaSqft === "number" ? plan.carpetAreaSqft : 0,
      projectSlug: PROJECT_SLUG,
    });
  } catch (err) {
    console.error("MoEngage floor plan tracking failed:", err);
  }
}
