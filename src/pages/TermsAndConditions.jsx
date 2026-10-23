import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
// import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import logo02 from "../assets/images/logo02.png";

const Section = ({ number, title, children }) => {
  return (
    <section className="border-t border-[var(--line)] py-10 md:py-14">
      <div className="grid grid-cols-1 gap-6 md:grid-cols-[90px_minmax(0,1fr)] md:gap-10">

        <div className="font-serif-display text-3xl text-[var(--brass)]">
          {number}
        </div>

        <div>
          <h2 className="font-serif-display text-[1.8rem] font-light leading-tight text-[var(--ink)] md:text-[2.35rem]">
            {title}
          </h2>

          <div className="mt-5 space-y-4 text-[15px] font-light leading-[1.75] text-[var(--muted)] md:text-[16px]">
            {children}
          </div>
        </div>

      </div>
    </section>
  );
};


const TermsAndConditions = () => {
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = "Terms & Conditions · Rustomjee Balmoral Golf Links";
  }, []);
    const goBack = () => {
      if (window.history.length > 1) {
        navigate(-1);
      } else {
        window.location.href = "/";
      }
    };


  return (
    <div className="App bg-[var(--cream)] text-[var(--ink)]">

      {/* <Navbar /> */}
      <header className={` bg-[var(--forest)] fixed top-0 left-0 right-0 z-50 transition-all duration-700` }>
              <div className="mx-auto max-w-[1360px] px-6 md:px-10 py-5 flex items-center justify-between">
                <button
                  onClick={goBack}
                  className="text-left"
                >
                  <img
                    src={logo02}
                    alt="Rustomjee Balmoral Golf Links"
                    className="h-9 md:h-12 w-auto"
                  />
                </button>
      
                <button
                onClick={goBack}
                  className="font-serif-display px-6 py-2 border border-[var(--cream)] text-[var(--cream)] text-[13px] md:text-[15px] rounded-full tracking-wide-2 uppercase hover:opacity-70 transition-opacity hover:bg-[var(--blue)] hover:text-white transition-colors"
                >
                  ← Back
                </button>
              </div>
            </header>

      {/* =====================================================
          HERO
      ===================================================== */}

      <header className="relative overflow-hidden bg-[var(--forest)] pt-36 pb-24 text-[var(--cream)] md:pt-44 md:pb-32">

        <div className="pointer-events-none absolute inset-0 opacity-20">

          <div className="absolute -right-24 -top-24 h-[420px] w-[420px] rounded-full border border-[var(--brass-2)]" />

          <div className="absolute -right-10 -top-10 h-[300px] w-[300px] rounded-full border border-[var(--brass-2)]" />

        </div>


        <div className="relative z-10 mx-auto max-w-[1360px] px-6 md:px-10">

          <div className="mb-7 flex items-center gap-3">

            <span className="h-px w-10 bg-[var(--brass-2)]" />

            <span className="text-[11px] uppercase tracking-wide-2 text-white/75">
              Legal
            </span>

          </div>


          <h1 className="max-w-5xl font-serif-display text-[3.4rem] font-light leading-[0.92] sm:text-[4.5rem] md:text-[6rem] lg:text-[7rem]">

            Terms &
            <span className="block italic text-[var(--brass-2)]">
              Conditions
            </span>

          </h1>


          <p className="mt-8 max-w-xl text-[15px] font-light leading-relaxed text-white/70 md:text-[17px]">
            Please read these terms carefully before using
            this website or submitting an enquiry.
          </p>

        </div>

      </header>


      {/* =====================================================
          CONTENT
      ===================================================== */}

      <main className="py-16 md:py-24">

        <div className="mx-auto max-w-[1120px] px-6 md:px-10">

          {/* INTRO */}

          <div className="mb-14 md:mb-20">

            <div className="mb-6 flex items-center gap-3">

              <span className="h-px w-8 bg-[var(--brass)]" />

              <span className="text-[11px] uppercase tracking-wide-2 text-[var(--brass)]">
                Terms of Use
              </span>

            </div>


            <p className="max-w-4xl font-serif-display text-[1.45rem] font-light leading-[1.4] text-[var(--ink)] md:text-[1.9rem]">
              By accessing or using this website, you acknowledge
              that you have read, understood and agreed to these
              Terms and Conditions.
            </p>

          </div>


          <Section
            number="01"
            title="Website Information"
          >
            <p>
              This website has been created to provide information
              about the project, residences, amenities, lifestyle
              features and related offerings.
            </p>

            <p>
              Information displayed on the website is intended
              for general informational and marketing purposes
              and should not be treated as a substitute for
              independently verified project documentation.
            </p>
          </Section>


          <Section
            number="02"
            title="Accuracy of Information"
          >
            <p>
              Reasonable efforts are made to ensure that the
              information presented on this website is accurate
              and current.
            </p>

            <p>
              However, specifications, plans, dimensions,
              illustrations, images, amenities, landscaping,
              views, finishes and other representations may be
              subject to change.
            </p>

            <p>
              Users are advised to independently verify all
              project-related information and documents before
              making any purchase or investment decision.
            </p>
          </Section>


          <Section
            number="03"
            title="Images & Visual Representations"
          >
            <p>
              Images, renders, illustrations, lifestyle visuals
              and artistic representations displayed on this
              website are intended to communicate the proposed
              character and lifestyle of the project.
            </p>

            <p>
              Actual development, landscaping, finishes,
              furniture, fixtures, views and surrounding
              conditions may differ from the visuals shown.
            </p>

            <p>
              Where an image is identified as an AI-generated or
              representational visual, it is provided solely for
              illustrative purposes.
            </p>
          </Section>


          <Section
            number="04"
            title="No Offer or Contract"
          >
            <p>
              Information contained on this website does not,
              by itself, constitute an offer, invitation to offer,
              agreement, contract, allotment or commitment to sell
              any property.
            </p>

            <p>
              Any purchase, allotment or transaction shall be
              governed exclusively by the applicable documents,
              agreements and terms executed between the relevant
              parties.
            </p>
          </Section>


          <Section
            number="05"
            title="Enquiries"
          >
            <p>
              By submitting an enquiry through this website, you
              agree that the information provided may be used to
              contact you regarding your enquiry and the project.
            </p>

            <p>
              A submitted enquiry does not constitute a booking,
              reservation or confirmation of availability.
            </p>
          </Section>


          <Section
            number="06"
            title="Intellectual Property"
          >
            <p>
              Unless otherwise stated, the content of this
              website, including text, graphics, photographs,
              designs, layouts, logos, animations, videos and
              other materials, is protected by applicable
              intellectual-property laws.
            </p>

            <p>
              No material from this website may be copied,
              reproduced, modified, distributed, published or
              commercially exploited without appropriate
              authorisation.
            </p>
          </Section>


          <Section
            number="07"
            title="Third-Party Links"
          >
            <p>
              This website may contain links to websites or
              services operated by third parties.
            </p>

            <p>
              Such links are provided for convenience. We do not
              assume responsibility for the availability, content,
              accuracy, security or privacy practices of
              third-party websites.
            </p>
          </Section>


          <Section
            number="08"
            title="Website Availability"
          >
            <p>
              We endeavour to keep this website available and
              functioning properly but do not guarantee that the
              website will always be uninterrupted, error-free,
              secure or free from technical issues.
            </p>
          </Section>


          <Section
            number="09"
            title="Limitation of Liability"
          >
            <p>
              To the extent permitted by applicable law, we shall
              not be responsible for losses arising solely from
              reliance on general information presented on this
              website.
            </p>

            <p>
              Users should obtain and review the relevant official
              project documentation before making any decision.
            </p>
          </Section>


          <Section
            number="10"
            title="Changes to These Terms"
          >
            <p>
              These Terms and Conditions may be updated from time
              to time without prior notice.
            </p>

            <p>
              The updated version will become effective when it is
              published on this website.
            </p>
          </Section>


          <Section
            number="11"
            title="Governing Law"
          >
            <p>
              These Terms and Conditions shall be interpreted in
              accordance with applicable laws and regulations.
            </p>

            <p>
              Any specific jurisdiction, dispute-resolution
              mechanism or other legal provision applicable to the
              project should be confirmed against the final
              legal-approved project documentation.
            </p>
          </Section>


          {/* =================================================
              BACK TO HOME
          ================================================= */}

          <div className="mt-16 border-t border-[var(--line)] pt-8 md:mt-20">

            <button
              type="button"
              onClick={goBack}
              className="group inline-flex items-center gap-3 text-[11px] uppercase tracking-wide-2 text-[var(--forest)]"
            >
              <span className="transition-transform duration-300 group-hover:-translate-x-1">
                ←
              </span>

              Back to Balmoral
            </button>

          </div>

        </div>

      </main>


      <Footer />

    </div>
  );
};


export default TermsAndConditions;