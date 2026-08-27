import React, { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { CONTACT, CONFIG_OPTIONS } from "../mock";
import { Check, X } from "lucide-react";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { getMarketingData } from "@/lib/marketing";

const API_URL = "https://wzpocs.in/API/rustomjeebalmoral/api.php";

const INITIAL_FORM = {
  name: "",
  email: "",
  phone: "",
  config: "2 BHK",
  message: "",
  consent: true,
};

const getIndianPhoneNumber = (raw) => {
  const digits = raw.replace(/\D/g, "");
  if (digits.length === 12 && digits.startsWith("91")) return digits.slice(2);
  if (digits.length === 11 && digits.startsWith("0")) return digits.slice(1);
  return digits;
};

const inputCls =
  "w-full bg-transparent border-b border-[var(--forest)]/25 focus:border-[var(--black)] outline-none py-3 text-[15px] placeholder:text-[var(--forest)]/45 text-[var(--forest)] transition-colors duration-300";

export default function EnquiryPopup({ open, onClose }) {
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
      if (indianPhone.length !== 10) {
        newErrors.phone = "Please enter a valid 10-digit phone number.";
      } else if (!/^[6-9]\d{9}$/.test(indianPhone)) {
        newErrors.phone = "Please enter a valid Indian phone number.";
      }
    }

    if (!emailTrimmed) {
      newErrors.email = "Email address is required.";
    } else if (
      !/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(emailTrimmed)
    ) {
      newErrors.email = "Please enter a valid email address.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const buildPayload = () => {
    const marketing = getMarketingData() || {};
    return {
      name: form.name.trim(),
      email: form.email.trim(),
      mobile: getIndianPhoneNumber(form.phone),
      countrycode: "+91",
      countryname: "India",
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
      const response = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(payload),
      });

      if (!response.ok) throw new Error(`API request failed with status ${response.status}`);

      const result = await response.json();
      if (Number(result.status) !== 1) throw new Error(result.msg || "Lead submission failed.");

      toast.success("Thank you — a Rustomjee relationship manager will call you within 24 hours.");
      setSubmitted(true);
      setForm(INITIAL_FORM);
      setErrors({});
      onClose();
      navigate("/thank-you");
    } catch (error) {
      console.error("Lead submission failed:", error);
      toast.error(error?.message || "Unable to submit your enquiry. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  if (!open) return null;

  return createPortal(
    <div className="fixed inset-0 z-[100] flex items-center justify-center px-4" role="dialog" aria-modal="true">
      <div className="absolute inset-0 bg-black/60" onClick={onClose} />

      <div className="relative z-10 w-full max-w-lg bg-[var(--light-blue)] max-h-[90vh] overflow-y-auto p-6 md:p-10 shadow-xl">
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

        <form onSubmit={handleSubmit} noValidate className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <input
                className={inputCls}
                placeholder="Full Name"
                value={form.name}
                onChange={(e) => update("name", e.target.value)}
              />
              {errors.name && <p className="mt-1.5 text-[12px] text-red-500">{errors.name}</p>}
            </div>
            <div>
              <input
                className={inputCls}
                placeholder="Phone"
                value={form.phone}
                onChange={(e) => update("phone", e.target.value)}
              />
              {errors.phone && <p className="mt-1.5 text-[12px] text-red-500">{errors.phone}</p>}
            </div>
          </div>

          <div>
            <input
              className={inputCls}
              placeholder="Email"
              type="email"
              value={form.email}
              onChange={(e) => update("email", e.target.value)}
            />
            {errors.email && <p className="mt-1.5 text-[12px] text-red-500">{errors.email}</p>}
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
                  className={`px-4 py-2 text-[12px] tracking-wide-2 uppercase border transition-all duration-400 ${
                    form.config === c
                      ? "bg-[var(--black)] text-[var(--white)] border-[var(--black)]"
                      : "text-[var(--white)]/80 border-[var(--black)]/25 hover:border-[var(--black)]/60"
                  }`}
                >
                  {c}
                </button>
              ))}
            </div>
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="w-full inline-flex items-center justify-center gap-2 bg-[var(--black)] text-[var(--white)] px-10 py-4 text-[12px] tracking-wide-2 uppercase hover:bg-[var(--black)] transition-colors duration-500 disabled:opacity-60"
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