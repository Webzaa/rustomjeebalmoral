import React, { useState } from "react";
import { CONTACT, CONFIG_OPTIONS, IMAGES } from "../mock";
import { toast } from "sonner";
import { Check } from "lucide-react";
import useReveal from "../hooks/useReveal";
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

const inputCls =
  "w-full bg-transparent border-b border-white/25 focus:border-[var(--brass)] outline-none py-3 text-[15px] placeholder:text-white/45 text-[var(--cream)] transition-colors duration-300";

// Strips everything but digits, then drops a leading "91" country code
// if present (so "+91 98765 43210" and "9876543210" both resolve to
// the same 10-digit number).
const getIndianPhoneNumber = (raw) => {
  const digits = raw.replace(/\D/g, "");
  if (digits.length === 12 && digits.startsWith("91")) {
    return digits.slice(2);
  }
  if (digits.length === 11 && digits.startsWith("0")) {
    return digits.slice(1);
  }
  return digits;
};

export default function EnquiryForm() {
  const navigate = useNavigate();
  const { ref, inView } = useReveal();
  const [form, setForm] = useState(INITIAL_FORM);
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const update = (key, value) => {
    setForm((prev) => ({
      ...prev,
      [key]: value,
    }));
    // clear that field's error as soon as the user edits it
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
      if (indianPhone.length !== 10) {
        newErrors.phone = "Please enter a valid 10-digit phone number.";
      } else if (!/^[6-9]\d{9}$/.test(indianPhone)) {
        newErrors.phone = "Please enter a valid Indian phone number.";
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
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error(`API request failed with status ${response.status}`);
      }

      const result = await response.json();
      if (Number(result.status) !== 1) {
        throw new Error(result.msg || "Lead submission failed.");
      }

      toast.success(
        "Thank you — a Rustomjee relationship manager will call you within 24 hours."
      );

      setSubmitted(true);
      setForm(INITIAL_FORM);
      setErrors({});
      navigate("/thank-you");
    } catch (error) {
      console.error("Lead submission failed:", error);
      toast.error(error?.message || "Unable to submit your enquiry. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section id="enquire" className="relative py-10 md:py-15 overflow-hidden">
      <div className="absolute inset-0">
        <img src={IMAGES.balcony} alt="" className="h-full w-full object-cover" />
        <div className="absolute inset-0" style={{ backgroundColor: "rgba(27, 36, 31, 0.9)" }} />
      </div>

      <div className="relative z-10 mx-auto max-w-[1360px] px-6 md:px-10">
        <div
          ref={ref}
          className={`reveal ${inView ? "in-view" : ""} grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start`}
        >
          <div className="text-[var(--cream)]">
            <div className="flex items-center gap-3 mb-6">
              <span className="h-px w-8 bg-[var(--brass-2)]" />
              <span className="text-[var(--brass-2)] text-[12px] tracking-wide-2 uppercase">
                ( {CONTACT.eyebrow} )
              </span>
            </div>
            <h2 className="font-serif-display tracking-tighter leading-[1.22] sm:leading-[1.15] text-[32px] sm:text-[34px] md:text-[44px] lg:text-[52px] font-light">
              {CONTACT.title}
            </h2>
            <p className="mt-6 text-[var(--cream)]/75 text-[15px] md:text-[24px] font-light leading-[1.4] max-w-md">
              {CONTACT.intro}
            </p>
          </div>

          <form onSubmit={handleSubmit} noValidate className="space-y-7">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-7">
              <div>
                <input
                  className={inputCls}
                  placeholder="Full Name"
                  value={form.name}
                  onChange={(e) => update("name", e.target.value)}
                />
                {errors.name && (
                  <p className="mt-1.5 text-[12px] text-red-400">{errors.name}</p>
                )}
              </div>
              <div>
                <input
                  className={inputCls}
                  placeholder="Phone"
                  value={form.phone}
                  onChange={(e) => update("phone", e.target.value)}
                />
                {errors.phone && (
                  <p className="mt-1.5 text-[12px] text-red-400">{errors.phone}</p>
                )}
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
              {errors.email && (
                <p className="mt-1.5 text-[12px] text-red-400">{errors.email}</p>
              )}
            </div>

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
                    className={`px-5 py-2.5 text-[12px] tracking-wide-2 uppercase border transition-all duration-400 ${
                      form.config === c
                        ? "bg-[var(--black)] text-[var(--white)] border-[var(--black)]"
                        : "text-white/80 border-white/25 hover:border-white/60"
                    }`}
                  >
                    {c}
                  </button>
                ))}
              </div>
            </div>

            <textarea
              className={`${inputCls} resize-none`}
              placeholder="Message (optional)"
              rows={2}
              value={form.message}
              onChange={(e) => update("message", e.target.value)}
            />

            <button
              type="submit"
              disabled={submitting}
              className="w-full md:w-auto inline-flex items-center justify-center gap-2 bg-[var(--cream)] text-[var(--forest)] px-10 py-4 text-[12px] tracking-wide-2 uppercase hover:bg-white transition-colors duration-500 disabled:opacity-60"
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
      </div>
    </section>
  );
}