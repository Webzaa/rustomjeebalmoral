import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../images/logo.png";

export default function TermsConditions() {
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const goBack = () => {
    if (window.history.length > 1) {
      navigate(-1);
    } else {
      window.location.href = "/";
    }
  };

  return (
    <>
      {/* ---- Simple page header (logo + back link) ---- */}
      <header className="bg-[var(--light-blue)] border-b border-[var(--line)] sticky top-0 left-0 right-0 z-50">
        <div className="mx-auto max-w-[1360px] px-6 md:px-10 py-5 flex items-center justify-between">
          <button
            onClick={() => (window.location.href = "/")}
            className="text-left"
          >
            <img
              src={logo}
              alt="Rustomjee Balmoral Golf Links"
              className="h-9 md:h-12 w-auto"
            />
          </button>

          <button
            onClick={goBack}
            className="font-serif-display px-6 py-2 border border-[var(--blue)] text-[var(--ink)] text-[13px] md:text-[15px] rounded-full tracking-wide-2 uppercase hover:opacity-70 transition-opacity hover:bg-[var(--blue)] hover:text-white transition-colors"
          >
            ← Back
          </button>
        </div>
      </header>

      {/* ---- Page content ---- */}
      <div className="rb-root bg-[var(--cream,#faf7f2)] min-h-screen py-10 md:py-10">
        <div className="mx-auto px-6 md:px-10">
          <h1 className="font-serif-display text-[var(--ink)] text-[2.4rem] md:text-[3.4rem] leading-[1] font-light mb-8">
            Terms &amp; Conditions
          </h1>

          <main className="rb-body text-left">

            <p className="text-[var(--muted)] text-[15px] md:text-[18px] font-light leading-[1.7] mb-8">
              <strong className="font-semibold text-[var(--ink)]">
                We request you to familiarize yourself with the terms and
                conditions set out below before navigating further or viewing
                our website:
              </strong>
            </p>

            {/* Generic Details */}
            <h2 className="font-semibold text-[var(--ink)] text-[18px] md:text-[22px] mt-10 mb-4">
              Generic Details Regarding The Website
            </h2>

            <div className="space-y-5 text-[var(--muted)] text-[15px] md:text-[18px] font-light leading-[1.7]">
              <p>
                <strong className="font-semibold text-[var(--ink)]">
                  www.rustomjee.com
                </strong>{" "}
                is the corporate website operated by Keystone Realtors Private
                Limited and its group companies (that is, its affiliates,
                subsidiaries, ultimate holding company and its subsidiaries)
                ("Rustomjee Group").
              </p>

              <p>
                By proceeding to view our website or part thereof or any
                specific project related detail as disclosed on this website,
                you acknowledge that you have read, understood and accepted
                these terms which shall constitute the entire binding agreement
                between you and the Rustomjee Group. We may revise these terms
                at any time by amending this page. Please check this page from
                time to time to take notice of any changes we make, as they are
                binding on you.
              </p>

              <p>
                This website is meant to provide you with all the preliminary
                and basic information in respect of the group and our projects,
                therefore we request you to refrain from misusing and/or
                tampering with our website in any manner including but not
                limited to the introduction of viruses, trojans, etc., as the
                same will subject you necessary action under the applicable laws
                and regulations.
              </p>
            </div>

            {/* Contents */}
            <h2 className="font-semibold text-[var(--ink)] text-[18px] md:text-[22px] mt-10 mb-4">
              Contents of Our Site
            </h2>

            <div className="space-y-5 text-[var(--muted)] text-[15px] md:text-[18px] font-light leading-[1.7]">
              <p>
                All the details and materials disclosed on this website are
                provided for general guidance and information only, without
                warranties, guarantees, undertaking or term as to the
                condition, quality, state of readiness or fitness of any kind,
                either expressed or implied as to its completeness, accuracy,
                reliability, suitability or availability.
              </p>

              <p>
                Accessing / visiting this website does not constitute an offer
                and/or contract of any type between the Rustomjee Group and the
                viewer/recipient. None of our representatives or employees or
                consultants or agents or any person claiming through or under
                us has any authority to make or give any representation or
                warranty of any nature whatsoever in relation to any property.
              </p>

              <p>
                None of the information, materials or details mentioned on our
                website shall be regarded or taken as legal or financial advice
                and a thorough diligence of the same may be undertaken by you
                in that regard, if you so desire and deem fit.
              </p>

              <p>
                All transactions shall be subject to the terms and conditions
                of the Agreement to be entered into between Rustomjee Group and
                the intending party.
              </p>

              <p>
                All plans, specifications, designs, elevations, features,
                amenities, facilities and services mentioned in this website
                are indicative of the kind of development proposed and/or being
                undertaken for the respective projects and its finality is
                subject to the approval of the respective authorities.
              </p>

              <p>
                The Rustomjee Group reserves the right to change any or all of
                information, materials, images, project details visible on the
                website without prior notice or obligation. Artist's
                impressions are used to illustrate the amenities,
                specifications, images and other details and these may be
                applicable to select apartments only.
              </p>

              <p>
                All brands mentioned to be provided with respect to each
                specific project and/or apartment in a project is subject to
                availability and the Rustomjee Group and/or its representatives
                shall not be held liable in any manner whatsoever for the
                non-availability of such material. Tolerance of +/- 3% is
                possible in unit areas on account of design and construction
                exigencies.
              </p>
            </div>

            {/* Safety Measures */}
            <h2 className="font-semibold text-[var(--ink)] text-[18px] md:text-[22px] mt-10 mb-4">
              Safety Measures
            </h2>

            <p className="text-[var(--muted)] text-[15px] md:text-[18px] font-light leading-[1.7]">
              Though we have taken all the requisite care and precaution to
              make your experience of navigating and browsing our website an
              enjoyable and secure experience, we do not guarantee that our
              website will be secure or free from bugs or viruses. Therefore,
              we request you to use your own virus protection software.
            </p>

            {/* Intellectual Property */}
            <h2 className="font-semibold text-[var(--ink)] text-[18px] md:text-[22px] mt-10 mb-4">
              Intellectual Property Rights
            </h2>

            <div className="space-y-5 text-[var(--muted)] text-[15px] md:text-[18px] font-light leading-[1.7]">
              <p>
                The rights in terms of all the intellectual property on our
                website is held by us either as the owner or as a licensee. On
                visiting and browsing our website, you have deemed to have
                acknowledged and accepted that all of the copyright, database
                rights and any other intellectual property rights which subsist
                in the design, layout, processes, functions, data and content
                of our website belong to the Rustomjee Group or our licensors,
                information providers or contributors, as the case may be and
                we reserve all our rights in that regard.
              </p>

              <p>
                No part of our website, its contents or any of its underlying
                software and databases can be shared with any third party,
                reverse engineered, reverse assembled without our prior written
                consent.
              </p>

              <p>
                The contents, graphics, images, information and material as
                disclosed or depicted on this website are the exclusive
                property of the Rustomjee Group. No person shall use, copy,
                reproduce, imitate, publish, display, modify, create derivative
                works or database, transmit, exploit, sell or distribute the
                same in whole or in part.
              </p>

              <p>
                Facility, if any to print any article or portion of text
                material from the website through computer / electronic device
                does not tantamount to prior written consent, and will be
                strongly dealt with. Further using the contents, information,
                details and materials disclosed on this website for the
                purposes of any illustrations, photographs, video or audio
                sequences or any graphics separately from any accompanying text
                is not permitted.
              </p>
            </div>

            {/* Privacy Policy */}
            <h2 className="font-semibold text-[var(--ink)] text-[18px] md:text-[22px] mt-10 mb-4">
              Privacy Policy
            </h2>

            <p className="text-[var(--muted)] text-[15px] md:text-[18px] font-light leading-[1.7]">
              Our Privacy Policy sets out the terms on which we process any
              personal data we collect from you or that you provide to us. By
              using our website, you consent to such processing and you warrant
              that all data provided by you is accurate.
            </p>

            {/* Laws */}
            <h2 className="font-semibold text-[var(--ink)] text-[18px] md:text-[22px] mt-10 mb-4">
              Laws &amp; Jurisdiction
            </h2>

            <p className="text-[var(--muted)] text-[15px] md:text-[18px] font-light leading-[1.7]">
              The website terms and conditions shall be governed by the laws of
              India and the courts in Mumbai shall have exclusive jurisdiction
              in respect of any matter or dispute arising out of or in respect
              of the website terms and condition.
            </p>

          </main>

          {/* ---- Footer ---- */}
          <div className="mt-14 pt-8 border-t border-[var(--line)] flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-[var(--muted)] text-[13px] md:text-[14px]">
              © Rustomjee Balmoral Golf Links, Chembur, Mumbai — All Rights
              Reserved
            </p>

            <button
              onClick={goBack}
              className="font-serif-display px-6 py-2 border border-[var(--blue)] text-[var(--ink)] rounded-full text-[14px] font-light hover:bg-[var(--blue)] uppercase hover:text-white transition-colors"
            >
              ← Back
            </button>
          </div>
        </div>
      </div>
    </>
  );
}