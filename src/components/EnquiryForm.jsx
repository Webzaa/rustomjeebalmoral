import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { CONTACT, CONFIG_OPTIONS, IMAGES } from "../mock";
import { toast } from "sonner";
import { Check } from "lucide-react";
import useReveal from "../hooks/useReveal";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import {
  captureMarketingParams,
  getNormalizedMarketingData,
} from "../lib/marketing";
import { trackLeadSubmitted } from "../lib/tracking";
import useMoengageFormTracking from "../hooks/useMoengageFormTracking";

const API_URL = "https://wzpocs.in/API/rustomjeebalmoral/api.php";

const INITIAL_FORM = {
  name: "",
  email: "",
  phone: "",
  countryCode: "+91",
  countryName: "India",
  config: "4 BHK",
  message: "",
  consent: true,
};

/*
=========================================================
INDIAN PHONE NUMBER
=========================================================
Removes spaces, +, -, brackets etc.

+91 98765 43210 => 9876543210
919876543210    => 9876543210
09876543210     => 9876543210
9876543210      => 9876543210
*/

const getIndianPhoneNumber = (raw = "") => {
  const digits = String(raw).replace(/\D/g, "");

  if (digits.length === 12 && digits.startsWith("91")) {
    return digits.slice(2);
  }

  if (digits.length === 11 && digits.startsWith("0")) {
    return digits.slice(1);
  }

  return digits;
};

/*
Returns the local number without the country dial code.
react-phone-input-2 passes the full number (dial code included) to onChange.
*/
const getLocalPhoneNumber = (raw = "", countryCode = "+91") => {
  const digits = String(raw).replace(/\D/g, "");
  if (!countryCode || countryCode === "+91") return getIndianPhoneNumber(digits);
  const dial = String(countryCode).replace(/\D/g, "");
  return digits.startsWith(dial) ? digits.slice(dial.length) : digits;
};

export default function EnquiryForm({ compact = false }) {
  const navigate = useNavigate();

  const { ref, inView } = useReveal();

  // MoEngage lead_form_started / lead_form_abandoned
  useMoengageFormTracking();

  const [form, setForm] = useState(INITIAL_FORM);
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  // Save any marketing params from the URL (gclid, utm_*, etc.) into cookies
  useEffect(() => {
    captureMarketingParams();
  }, []);

  const inputCls =
    "w-full bg-transparent border-b border-white/25 py-3 text-[var(--cream)] placeholder-white/45 text-[15px] font-light focus:outline-none focus:border-[var(--brass-2)] transition-colors duration-400";

  /*
  =========================================================
  UPDATE FORM
  =========================================================
  */

  const update = (key, value) => {
    setForm((prev) => ({
      ...prev,
      [key]: value,
    }));

    // Clear error when user starts editing field
    setErrors((prev) => {
      if (!prev[key]) {
        return prev;
      }

      const next = { ...prev };
      delete next[key];
      return next;
    });
  };

  /*
  =========================================================
  VALIDATE FORM
  =========================================================
  */

  const validateForm = () => {
    const newErrors = {};

    const nameTrimmed = form.name?.trim() || "";
    const phoneTrimmed = form.phone?.trim() || "";
    const emailTrimmed = form.email?.trim() || "";

    // NAME
    if (!nameTrimmed) {
      newErrors.name = "Full name is required.";
    } else if (nameTrimmed.length < 2) {
      newErrors.name = "Name must be at least 2 characters.";
    } else if (!/^[a-zA-Z\s'.]+$/.test(nameTrimmed)) {
      newErrors.name = "Please enter a valid name.";
    }

    // PHONE
    if (!phoneTrimmed) {
      newErrors.phone = "Phone number is required.";
    } else {
      const indianPhone = getIndianPhoneNumber(phoneTrimmed);

      if (form.countryCode === "+91" || !form.countryCode) {
        if (indianPhone.length !== 10) {
          newErrors.phone = "Please enter a valid 10-digit phone number.";
        } else if (!/^[6-9]\d{9}$/.test(indianPhone)) {
          newErrors.phone = "Please enter a valid Indian phone number.";
        }
      } else {
        const localDigits = getLocalPhoneNumber(phoneTrimmed, form.countryCode);
        if (localDigits.length < 7) {
          newErrors.phone = "Please enter a valid phone number.";
        }
      }
    }

    // EMAIL
    if (!emailTrimmed) {
      newErrors.email = "Email address is required.";
    } else if (
      !/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(emailTrimmed)
    ) {
      newErrors.email = "Please enter a valid email address.";
    }

    // CONSENT
    if (!form.consent) {
      newErrors.consent = "Please authorize us to contact you.";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  /*
  =========================================================
  BUILD API PAYLOAD
  =========================================================
  */

  const buildPayload = () => {
    const marketing = getNormalizedMarketingData() || {};

    return {
      // BASIC USER DETAILS
      name: form.name.trim(),
      email: form.email.trim(),
      mobile: getLocalPhoneNumber(form.phone, form.countryCode),
      countrycode: form.countryCode || "+91",
      countryname: form.countryName || "India",

      // PROJECT
      projectSelectValues: "Rustomjee balmoral",
      configuration: form.config,
      configInterestValues: [form.config],
      configTypeValues: [form.config],

      // OTHER FORM VALUES
      purposeValues: [""],
      visitdayValues: [""],
      favdestinationValues: [""],
      formname: "Rustomjee balmoral Enquiry",
      form_id: "",
      leadgen_id: "",
      page_id: "",
      ad_id: "",

      // MARKETING DATA
      utm_source: marketing.utm_source || "",
      utm_sub_source: marketing.utm_sub_source || "",
      utm_medium: marketing.utm_medium || "",
      campaigncode: marketing.campaigncode || "",
      campaignname: marketing.campaignname || "",
      Lead_Keyword: marketing.Lead_Keyword || "",
      utm_adset: marketing.utm_adset || "",
      Lead_Placement: marketing.Lead_Placement || "",
      Lead_Device: marketing.Lead_Device || "",
      gad_source: marketing.gad_source || "",
      gad_campaignid: marketing.gad_campaignid || "",
      gbraid: marketing.gbraid || "",
      gclid: marketing.gclid || "",
      // EXTRA AD DATA (rename keys if your API expects different names)
      campaignid: marketing.campaignid || "",
      adgroupname: marketing.adgroupname || "",
      adgroupid: marketing.adgroupid || "",
      adname: marketing.utm_adname || "",

      // WEBSITE
      websitename: window.location.hostname,
    };
  };

  /*
  =========================================================
  SUBMIT FORM
  =========================================================
  */

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Prevent multiple submissions
    if (submitting) {
      return;
    }

    // Validate
    if (!validateForm()) {
      return;
    }

    setSubmitting(true);

    try {
      const payload = buildPayload();

      console.log("Lead Payload:", payload);

      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(payload),
      });

      // HTTP ERROR
      if (!response.ok) {
        throw new Error(`API request failed with status ${response.status}`);
      }

      // API RESPONSE
      const result = await response.json();

      console.log("API Response:", result);

      // API STATUS
      if (Number(result.status) !== 1) {
        throw new Error(result.msg || "Lead submission failed.");
      }

      // SUCCESS
      toast.success(
        "Thank you — a Rustomjee relationship manager will call you within 24 hours."
      );

      // MoEngage: lead saved (status === 1). Fire-once guard lives in moengage-datalayer.js.
      trackLeadSubmitted({
        countryCode: payload.countrycode,
        mobile: payload.mobile,
        email: payload.email,
        name: payload.name,
        formName: "Contact Us",
        formLocation: "body",
        leadId: result.lead_id ?? result.leadId ?? "",
      });

      setSubmitted(true);
      setForm(INITIAL_FORM);
      setErrors({});

      // REDIRECT
      navigate("/thank-you");
    } catch (error) {
      console.error("Lead submission failed:", error);

      toast.error(
        error?.message || "Unable to submit your enquiry. Please try again."
      );
    } finally {
      setSubmitting(false);
    }
  };

  /*
  =========================================================
  RENDER
  =========================================================
  */

  return (
    <section
      id={compact ? undefined : "enquire"}
      className={`relative overflow-hidden ${
        compact ? "py-10 md:py-14" : "py-20 md:py-32"
      }`}
    >
      {/* BACKGROUND */}
      {!compact && (
        <div
          className="absolute inset-[-5%] parallax-layer"
          data-parallax
          data-parallax-speed="0.08"
        >
          <img
            src={IMAGES.balcony}
            alt=""
            className="h-full w-full object-cover"
          />

          <div
            className="absolute inset-0"
            style={{
              backgroundColor: "rgba(27, 36, 31, 0.9)",
            }}
          />
        </div>
      )}

      {/* CONTENT */}
      <div className="relative z-10 mx-auto max-w-[1360px] px-6 md:px-10">
        <div
          ref={ref}
          className={`reveal ${
            inView ? "in-view" : ""
          } grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-20 items-start`}
        >
          {/* LEFT CONTENT */}
          <div className="text-[var(--cream)]">
            <div className="flex items-center gap-3 mb-6">
              <span className="h-px w-8 bg-[var(--brass-2)]" />

              <span className="text-[var(--brass-2)] text-[11px] tracking-wide-2 uppercase">
                ({CONTACT.eyebrow})
              </span>
            </div>

            <h2 className="font-serif-display text-[2.4rem] md:text-[3.6rem] leading-[1.02] font-light">
              {CONTACT.title}
            </h2>

            <p className="mt-6 text-[var(--cream)]/75 text-[15px] md:text-[16px] font-light leading-relaxed max-w-md">
              {CONTACT.intro}
            </p>
          </div>

          {/* FORM */}
          <form
            id={compact ? "enquiry-compact-form" : "enquiry-section-form"}
            name={compact ? "enquiry-compact-form" : "enquiry-section-form"}
            onSubmit={handleSubmit}
            className="space-y-7"
            noValidate
          >
            <input type="hidden" name="formname" value="Contact Us" />
            {/* NAME + PHONE */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-7">
              <div>
                <input
                  className={inputCls}
                  placeholder="Full Name"
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={(e) => update("name", e.target.value)}
                  autoComplete="name"
                  disabled={submitting}
                />

                {errors.name && (
                  <p className="mt-2 text-xs text-red-300">{errors.name}</p>
                )}
              </div>

              <div>
                <PhoneInput
                  country="in"
                  value={form.phone}
                  onChange={(phone, country) => {
                    update("phone", phone);
                    if (country?.dialCode) {
                      update("countryCode", `+${country.dialCode}`);
                    }
                    if (country?.name) {
                      update("countryName", country.name);
                    }
                  }}
                  enableSearch
                  disableCountryCode={true}
                  disableCountryGuess={true}
                  disabled={submitting}
                  placeholder="Phone Number"
                  containerClass="phone-input-dark"
                  inputProps={{
                    name: "mobile",
                    required: true,
                    autoComplete: "tel",
                    placeholder: "Phone Number",
                  }}
                />

                {errors.phone && (
                  <p className="mt-2 text-xs text-red-300">{errors.phone}</p>
                )}
              </div>
            </div>

            {/* EMAIL */}
            <div>
              <input
                className={inputCls}
                placeholder="Email"
                type="email"
                name="email"
                value={form.email}
                onChange={(e) => update("email", e.target.value)}
                autoComplete="email"
                disabled={submitting}
              />

              {errors.email && (
                <p className="mt-2 text-xs text-red-300">{errors.email}</p>
              )}
            </div>

            {/* CONFIGURATION */}
            <div>
              <div className="text-[11px] tracking-wide-2 uppercase text-white/55 mb-3">
                Preferred Configuration
              </div>

              <div className="flex flex-wrap gap-2">
                {CONFIG_OPTIONS.map((c) => (
                  <button
                    type="button"
                    key={c}
                    onClick={() => update("config", c)}
                    disabled={submitting}
                    className={`px-5 py-2.5 text-[12px] tracking-wide-2 uppercase border transition-all duration-400 ${
                      form.config === c
                        ? "bg-[var(--brass)] text-[var(--ink)] border-[var(--brass)]"
                        : "text-white/80 border-white/25 hover:border-white/60"
                    } ${submitting ? "opacity-50 cursor-not-allowed" : ""}`}
                  >
                    {c}
                  </button>
                ))}
              </div>
            </div>

            {/* OPTIONAL MESSAGE (disabled)
            <textarea
              className={`${inputCls} resize-none`}
              placeholder="Message (optional)"
              rows={2}
              value={form.message}
              onChange={(e) => update("message", e.target.value)}
            />
            */}

            {/* CONSENT CHECKBOX */}
            <div>
              <label className="flex items-start gap-2.5 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={form.consent}
                  onChange={(e) => update("consent", e.target.checked)}
                  disabled={submitting}
                  className="mt-0.5 h-4 w-4 rounded border-white/25 text-[var(--brass)] focus:ring-[var(--brass)] cursor-pointer accent-[var(--brass)] shrink-0"
                />
                <span className="text-[11px] md:text-[12px] text-white/70 leading-normal">
                  I agree and authorize team to contact me. This will override
                  the registry with DNC / NDNC also contact me via email, sms,
                  whatsapp and call
                </span>
              </label>

              {errors.consent && (
                <p className="mt-2 text-xs text-red-300">{errors.consent}</p>
              )}
            </div>

            {/* SUBMIT BUTTON */}
            <button
              type="submit"
              disabled={submitting}
              className={`w-full md:w-auto inline-flex items-center justify-center gap-2 bg-[var(--cream)] text-[var(--forest)] px-10 py-4 text-[12px] tracking-wide-2 uppercase transition-colors duration-500 ${
                submitting ? "opacity-60 cursor-not-allowed" : "hover:bg-white"
              }`}
            >
              {submitting ? (
                <>
                  <span
                    className="h-4 w-4 rounded-full border-2 border-[var(--forest)]/30 border-t-[var(--forest)] animate-spin"
                    aria-hidden="true"
                  />
                  Submitting...
                </>
              ) : submitted ? (
                <>
                  <Check size={16} />
                  Request Received
                </>
              ) : (
                "Request a Viewing"
              )}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}