import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
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
          <h2 className="font-serif-display text-[1.8rem] md:text-[2.35rem] font-light leading-tight text-[var(--ink)]">
            {title}
          </h2>

          <div className="mt-5 space-y-4 text-[15px] md:text-[16px] font-light leading-[1.75] text-[var(--muted)]">
            {children}
          </div>
        </div>
      </div>
    </section>
  );
};

const PrivacyPolicy = () => {
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = "Privacy Policy · Rustomjee Balmoral Golf Links";
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

          <h1 className="max-w-4xl font-serif-display text-[3.4rem] font-light leading-[0.92] sm:text-[4.5rem] md:text-[6rem] lg:text-[7rem]">
            Privacy
            <span className="block italic text-[var(--brass-2)]">
              Policy
            </span>
          </h1>

          <p className="mt-8 max-w-xl text-[15px] font-light leading-relaxed text-white/70 md:text-[17px]">
            Your privacy matters to us. This policy explains how
            personal information submitted through this website
            is collected, used and protected.
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
                Your Information
              </span>
            </div>

            <p className="max-w-4xl font-serif-display text-[1.45rem] font-light leading-[1.4] text-[var(--ink)] md:text-[1.9rem]">
              This Privacy Policy describes how information
              provided by visitors and prospective customers
              through this website may be collected, processed
              and used in connection with the project and
              services presented on this website.
            </p>
          </div>


          {/* =================================================
              01
          ================================================= */}

          <Section
            number="01"
            title="Information We Collect"
          >
            <p>
              We may collect information that you voluntarily
              provide when you submit an enquiry, register your
              interest, request a callback, download project
              information or otherwise interact with this website.
            </p>

            <p>
              This information may include your name, mobile
              number, email address, location, preferences and
              other information that you choose to provide.
            </p>

            <p>
              We may also collect limited technical information,
              such as browser type, device information, IP
              address, pages visited and website interaction
              data, where permitted by applicable law.
            </p>
          </Section>


          {/* =================================================
              02
          ================================================= */}

          <Section
            number="02"
            title="How We Use Your Information"
          >
            <p>
              Information submitted through the website may be
              used to respond to your enquiry and provide you
              with information relating to the project,
              residences, amenities, availability and related
              services.
            </p>

            <p>
              We may also use your information to arrange
              callbacks, schedule meetings, respond to requests,
              improve our website and understand visitor
              interactions with our digital platforms.
            </p>

            <p>
              Where permitted by applicable law and subject to
              your preferences, your information may also be
              used for marketing and promotional communications.
            </p>
          </Section>


          {/* =================================================
              03
          ================================================= */}

          <Section
            number="03"
            title="Enquiry & Lead Management"
          >
            <p>
              When you submit an enquiry, the information
              provided by you may be shared with authorised
              representatives, sales teams, channel partners or
              service providers involved in responding to your
              enquiry.
            </p>

            <p>
              Such information will be used only for legitimate
              business purposes connected with your enquiry or
              the services requested by you, subject to applicable
              law.
            </p>
          </Section>


          {/* =================================================
              04
          ================================================= */}

          <Section
            number="04"
            title="Cookies & Analytics"
          >
            <p>
              This website may use cookies, pixels and similar
              technologies to improve functionality, understand
              website usage and measure the effectiveness of
              digital campaigns.
            </p>

            <p>
              These technologies may collect information about
              how you interact with the website. You may be able
              to manage or disable cookies through your browser
              settings, although certain website functionality
              may be affected.
            </p>
          </Section>


          {/* =================================================
              05
          ================================================= */}

          <Section
            number="05"
            title="Sharing of Information"
          >
            <p>
              We do not intend to sell your personal information.
            </p>

            <p>
              Information may, however, be shared with
              authorised service providers, technology providers,
              marketing partners, professional advisers,
              representatives and other parties where reasonably
              necessary to operate the website, respond to
              enquiries or provide requested services.
            </p>

            <p>
              Information may also be disclosed where required
              by applicable law, regulation, legal process or
              governmental authority.
            </p>
          </Section>


          {/* =================================================
              06
          ================================================= */}

          <Section
            number="06"
            title="Data Security"
          >
            <p>
              We take reasonable technical and organisational
              measures to protect personal information against
              unauthorised access, misuse, alteration,
              disclosure or destruction.
            </p>

            <p>
              However, no method of transmission or electronic
              storage can be guaranteed to be completely secure.
            </p>
          </Section>


          {/* =================================================
              07
          ================================================= */}

          <Section
            number="07"
            title="Data Retention"
          >
            <p>
              Personal information may be retained for as long
              as reasonably necessary to fulfil the purposes for
              which it was collected, comply with applicable
              legal and regulatory obligations, resolve disputes
              and enforce applicable agreements.
            </p>
          </Section>


          {/* =================================================
              08
          ================================================= */}

          <Section
            number="08"
            title="Your Choices"
          >
            <p>
              You may request information about the personal
              information we hold about you and, where applicable,
              request correction, updating or deletion of your
              information, subject to legal and regulatory
              requirements.
            </p>

            <p>
              You may also request that marketing communications
              be stopped. This will not necessarily prevent
              service-related or transactional communications
              where such communications are necessary.
            </p>
          </Section>


          {/* =================================================
              09
          ================================================= */}

          <Section
            number="09"
            title="Third-Party Websites"
          >
            <p>
              This website may contain links to third-party
              websites or services. We are not responsible for
              the privacy practices, security or content of such
              third-party websites.
            </p>

            <p>
              We recommend reviewing the privacy policy of any
              third-party website before providing personal
              information.
            </p>
          </Section>


          {/* =================================================
              10
          ================================================= */}

          <Section
            number="10"
            title="Changes to This Policy"
          >
            <p>
              We may update this Privacy Policy from time to time
              to reflect changes in our practices, technology,
              legal requirements or services.
            </p>

            <p>
              Any updated version will be made available on this
              website and will become effective from the date
              specified in the updated policy.
            </p>
          </Section>


          {/* =================================================
              CONTACT
          ================================================= */}

          <section className="border-t border-[var(--line)] pt-10 md:pt-14">
            <div className="max-w-3xl">
              <div className="mb-6 flex items-center gap-3">
                <span className="h-px w-8 bg-[var(--brass)]" />

                <span className="text-[11px] uppercase tracking-wide-2 text-[var(--brass)]">
                  Questions
                </span>
              </div>

              <h2 className="font-serif-display text-[2rem] font-light leading-tight text-[var(--ink)] md:text-[2.8rem]">
                Have a question about your information?
              </h2>

              <p className="mt-5 text-[15px] font-light leading-relaxed text-[var(--muted)] md:text-[16px]">
                For privacy-related requests or questions,
                please contact the authorised project team using
                the contact details provided on this website.
              </p>
            </div>
          </section>


          {/* =================================================
              BACK
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

export default PrivacyPolicy;