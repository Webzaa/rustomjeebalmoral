import React, { useState, useEffect, useLayoutEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { CONTACT, CONFIG_OPTIONS } from "../mock";
import { Check, X } from "lucide-react";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import {
  captureMarketingParams,
  getNormalizedMarketingData,
} from "../lib/marketing";
import { trackLeadSubmitted, trackFloorPlanDownloaded } from "../lib/tracking";
import useMoengageFormTracking from "../hooks/useMoengageFormTracking";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

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

const getIndianPhoneNumber = (raw = "") => {
  const digits = String(raw).replace(/\D/g, "");
  if (digits.length === 12 && digits.startsWith("91")) return digits.slice(2);
  if (digits.length === 11 && digits.startsWith("0")) return digits.slice(1);
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

const inputCls =
  "w-full bg-transparent border-b border-[var(--forest)]/25 focus:border-[var(--black)] outline-none py-3 text-[15px] placeholder:text-[var(--forest)]/45 text-[var(--forest)] transition-colors duration-300";

export default function EnquiryPopup({
  open,
  onClose,
  formName = "Popup",
  floorPlan = false, // true => also fire rustomjeePushFloorPlanDownloaded on success
  defaultConfig, // pre-selects the configuration pill (e.g. "4 BHK")
}) {
  // formName = MoEngage lead_form_name, set by whichever button opened the popup
  const formSlug = formName.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
  const modalRef = useRef(null);
  const navigate = useNavigate();
  const [form, setForm] = useState(INITIAL_FORM);
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  // MoEngage form tracking: attach only while the popup form is in the DOM
  useMoengageFormTracking(open);

  // moengage-form-tracking.js ends a modal form with a "hidden.bs.modal" event on the
  // closest .modal element (Bootstrap). This popup isn't Bootstrap, so fire that same
  // event ourselves whenever the popup closes (X, backdrop, Escape, after submit) so the
  // script can push lead_form_abandoned. It ignores forms that were submitted.
  useLayoutEffect(() => {
    if (!open) return undefined;
    const el = modalRef.current;
    return () => {
      if (el) el.dispatchEvent(new Event("hidden.bs.modal"));
    };
  }, [open]);

  // Reset the button label each time the popup opens
  useEffect(() => {
    if (open) setSubmitted(false);
  }, [open]);

  // Pre-select the configuration the visitor was looking at
  useEffect(() => {
    if (open && defaultConfig) {
      setForm((prev) => ({ ...prev, config: defaultConfig }));
    }
  }, [open, defaultConfig]);

  // Close on Escape
  useEffect(() => {
    if (!open) return undefined;
    const onKey = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  // Save any marketing params from the URL (gclid, utm_*, etc.) into cookies
  useEffect(() => {
    captureMarketingParams();
  }, []);

  const update = (key, value) => {
    setForm((prev) => ({ ...prev, [key]: value }));
    setErrors((prev) => {
      if (!prev[key]) return prev;
      const next = { ...prev };
      delete next[key];
      return next;
    });
  };

  const validateForm = () => {
    const newErrors = {};
    const nameTrimmed = form.name?.trim() || "";
    const phoneTrimmed = form.phone?.trim() || "";
    const emailTrimmed = form.email?.trim() || "";

    if (!nameTrimmed) {
      newErrors.name = "Full name is required.";
    } else if (nameTrimmed.length < 2) {
      newErrors.name = "Name must be at least 2 characters.";
    } else if (!/^[a-zA-Z\s'.]+$/.test(nameTrimmed)) {
      newErrors.name = "Please enter a valid name.";
    }

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

    if (!emailTrimmed) {
      newErrors.email = "Email address is required.";
    } else if (
      !/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(emailTrimmed)
    ) {
      newErrors.email = "Please enter a valid email address.";
    }

    if (!form.consent) {
      newErrors.consent = "Please authorize us to contact you.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const buildPayload = () => {
    const marketing = getNormalizedMarketingData() || {};
    return {
      name: form.name.trim(),
      email: form.email.trim(),
      mobile: getLocalPhoneNumber(form.phone, form.countryCode),
      countrycode: form.countryCode || "+91",
      countryname: form.countryName || "India",
      projectSelectValues: "Rustomjee balmoral",
      configuration: form.config,
      configInterestValues: [form.config],
      configTypeValues: [form.config],
      purposeValues: [""],
      visitdayValues: [""],
      favdestinationValues: [""],
      formname: "Rustomjee balmoral Enquiry",
      form_id: "",
      leadgen_id: "",
      page_id: "",
      ad_id: "",
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
      websitename: window.location.hostname,
    };
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (submitting) return;
    if (!validateForm()) return;

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

      if (!response.ok)
        throw new Error(`API request failed with status ${response.status}`);

      const result = await response.json();
      if (Number(result.status) !== 1)
        throw new Error(result.msg || "Lead submission failed.");

      toast.success(
        "Thank you — a Rustomjee relationship manager will call you within 24 hours."
      );
      // MoEngage: lead saved (status === 1). Fire-once guard lives in moengage-datalayer.js.
      trackLeadSubmitted({
        countryCode: payload.countrycode,
        mobile: payload.mobile,
        email: payload.email,
        name: payload.name,
        formName,
        formLocation: "modal",
        leadId: result.lead_id ?? result.leadId ?? "",
      });

      // Floor plan request: only the chosen configuration is passed from here
      if (floorPlan) {
        trackFloorPlanDownloaded(payload.configuration);
      }

      setSubmitted(true);
      setForm(INITIAL_FORM);
      setErrors({});
      onClose();
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

  if (!open) return null;

  return createPortal(
    <div
      ref={modalRef}
      className="modal fixed inset-0 z-[100] flex items-center justify-center px-4"
      role="dialog"
      aria-modal="true"
    >
      <div className="absolute inset-0 bg-black/60" onClick={onClose} />

      <div className="relative z-10 w-full max-w-lg bg-[var(--cream)] max-h-[90vh] overflow-y-auto overflow-x-hidden p-6 md:p-10 shadow-xl">
        <button
          onClick={onClose}
          aria-label="Close"
          className="absolute top-4 right-4 text-[var(--black)] hover:opacity-60 transition-opacity"
        >
          <X size={22} />
        </button>

        <div className="mb-6">
          <span className="text-[var(--brass-2)] text-[11px] tracking-wide-2 uppercase">
            ( {CONTACT.eyebrow} )
          </span>
          <h2 className="mt-2 font-serif-display text-[1.6rem] md:text-[2rem] leading-[1.1] font-light text-[var(--forest)]">
            {CONTACT.title}
          </h2>
        </div>

        <form
          id={`enquiry-popup-${formSlug}`}
          name={`enquiry-popup-${formSlug}`}
          onSubmit={handleSubmit}
          noValidate
          className="space-y-6"
        >
          <input type="hidden" name="formname" value={formName} />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <input
                className={inputCls}
                placeholder="Full Name"
                name="name"
                autoComplete="name"
                value={form.name}
                onChange={(e) => update("name", e.target.value)}
                disabled={submitting}
              />
              {errors.name && (
                <p className="mt-1.5 text-[12px] text-red-500">{errors.name}</p>
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
                containerClass="phone-input-light"
                inputProps={{
                  name: "mobile",
                  required: true,
                  autoComplete: "tel",
                  placeholder: "Phone Number",
                }}
              />
              {errors.phone && (
                <p className="mt-1.5 text-[12px] text-red-500">
                  {errors.phone}
                </p>
              )}
            </div>
          </div>

          <div>
            <input
              className={inputCls}
              placeholder="Email"
              type="email"
              name="email"
              autoComplete="email"
              value={form.email}
              onChange={(e) => update("email", e.target.value)}
              disabled={submitting}
            />
            {errors.email && (
              <p className="mt-1.5 text-[12px] text-red-500">{errors.email}</p>
            )}
          </div>

          <div>
            <div className="text-[11px] tracking-wide-2 uppercase text-[var(--forest)]/55 mb-3">
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
                      : "text-[var(--forest)]/80 border-[var(--forest)]/25 hover:border-[var(--forest)]/60"
                  } ${submitting ? "opacity-50 cursor-not-allowed" : ""}`}
                >
                  {c}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="flex items-start gap-2.5 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={form.consent}
                onChange={(e) => update("consent", e.target.checked)}
                disabled={submitting}
                className="mt-0.5 h-4 w-4 rounded border-[var(--forest)]/25 text-[var(--forest)] focus:ring-[var(--forest)] cursor-pointer accent-[var(--forest)] shrink-0"
              />
              <span className="text-[11px] md:text-[12px] text-[var(--forest)]/70 leading-normal">
                I agree and authorize team to contact me. This will override the
                registry with DNC / NDNC also contact me via email, sms,
                whatsapp and call
              </span>
            </label>
            {errors.consent && (
              <p className="mt-1.5 text-[12px] text-red-500">
                {errors.consent}
              </p>
            )}
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="w-full inline-flex items-center justify-center gap-2 bg-[var(--forest)] text-[var(--cream)] px-10 py-4 text-[12px] tracking-wide-2 uppercase hover:bg-[var(--forest)] hover:text-[var(--cream)] transition-colors duration-500 disabled:opacity-60"
          >
            {submitted ? (
              <>
                <Check size={16} /> Request Received
              </>
            ) : submitting ? (
              "Submitting..."
            ) : (
              "Request a Viewing"
            )}
          </button>
        </form>
      </div>
    </div>,
    document.body
  );
}