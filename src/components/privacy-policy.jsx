import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../images/logo.png";

export default function PrivacyPolicy() {
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
            className="font-serif-display px-6 py-2 border border-[var(--blue)] text-[var(--ink)] text-[13px] md:text-[15px] rounded-full tracking-wide-2 uppercase hover:opacity-70 transition-opacity hover:bg-[var(--blue)] uppercase hover:text-white transition-colors"
          >
            ← Back
          </button>
        </div>
      </header>

      {/* ---- Page content ---- */}
      <div className="rb-root bg-[var(--cream,#faf7f2)] min-h-screen py-10 md:py-10">
        <div className="mx-auto px-6 md:px-10">
          {/* <p className="text-[var(--blue)] uppercase tracking-wide-2 text-[13px] md:text-[14px] font-semibold mb-3">
            Legal &amp; Policy
          </p> */}

          <h1 className="font-serif-display text-[var(--ink)] text-[2.4rem] md:text-[3.4rem] leading-[1] font-light mb-8">
            Privacy Policy
          </h1>

          <main className="rb-body text-left">
            <p className="text-[var(--muted)] text-[15px] md:text-[18px] font-light leading-[1.7]">
              Rustomjee (that is, our subsidiaries, our ultimate holding
              company and its subsidiaries) ("we", "our", "us") are committed
              to protecting and respecting your privacy. This privacy policy
              (together with our terms of use and any other documents
              referred to on it) sets out the basis on which any personal
              data we collect from you, or that you provide to us, will be
              processed by us. Please read the following carefully to
              understand our views and practices regarding your personal
              data and how we will treat it. By visiting{" "}
              <a
                href="https://www.rustomjee.com"
                className="text-[var(--blue)] underline"
              >
                www.rustomjee.com
              </a>{" "}
              or any other of our websites / mobile applications to which
              this privacy policy applies ("Sites") or otherwise providing us
              with information you are accepting and consenting to the
              practices described in this policy.
            </p>

            <h2 className="font-semibold text-[var(--ink)] text-[16px] md:text-[19px] mt-8 mb-3 uppercase tracking-wide-2">
              We May Collect And Process The Following Data About You:
            </h2>
            <ul className="list-disc pl-6 space-y-4 text-[var(--muted)] text-[15px] md:text-[18px] font-light leading-[1.7]">
              <li>
                <span className="font-semibold text-[var(--ink)]">
                  Information you give us:
                </span>{" "}
                You may give us information about you by filling in forms on
                our sites, or by submitting your CV, or by corresponding with
                us by phone, e-mail or otherwise or, by you interacting with
                any of our business partners, suppliers or sub-contractors
                (including estate agents, sales agents and our professional
                advisors) engaged on our behalf. This includes information
                you provide when you register to use our sites, subscribe to
                our service, email us, arrange property viewings with us,
                request brochures from us, complete an enquiry form, provide
                your CV and when you report a problem with our sites. The
                information you give us may include your name, address,
                e-mail address, phone number and any other information
                relevant to your enquiry or request for information or
                services which we may request and you may choose to provide
                to us from time to time.
              </li>
              <li>
                <span className="font-semibold text-[var(--ink)]">
                  Information we collect about you:
                </span>{" "}
                We may automatically collect: technical information,
                including the IP address, your login information, browser
                type and version, time zone setting, browser plug-in types
                and versions, operating system and platform; and information
                about your visit, including the full URL clickstream to,
                through and from our sites; materials you viewed or searched
                for; page response times, download errors, length of visits
                to certain pages, page interaction information, and methods
                used to browse away from the page and any phone number used
                to call our customer service number.
              </li>
              <li>
                <span className="font-semibold text-[var(--ink)]">
                  Information we receive from other sources:
                </span>{" "}
                We may receive information about you if you use our sites or
                the other services we provide. In this case we will have
                informed you when we collected that data that it may be
                shared internally and combined with data collected on our
                sites. We also work closely with third parties (including,
                for example, business partners, sub-contractors in
                technical, payment and delivery services, advertising
                networks, analytics providers, search information providers,
                credit reference agencies) and may receive information about
                you from them.
              </li>
            </ul>

            <h2 className="font-semibold text-[var(--ink)] text-[18px] md:text-[22px] mt-10 mb-3">
              Use Made of the Information
            </h2>
            <p className="text-[var(--muted)] text-[15px] md:text-[18px] font-light leading-[1.7] mb-3">
              We use information held about you in the following ways:
            </p>
            <ul className="list-disc pl-6 space-y-4 text-[var(--muted)] text-[15px] md:text-[18px] font-light leading-[1.7]">
              <li>
                <span className="font-semibold text-[var(--ink)]">
                  Information you give to us:
                </span>{" "}
                We will use this information to carry out our obligations
                arising from any contracts entered into between you and us
                and to provide you with the information and services that
                you request from us relating to the projects, properties,
                ventures or opportunities detailed on our sites or otherwise
                notified to you; to provide you with information about other
                goods and services we offer that are similar to those that
                you have already purchased or enquired about; to provide
                you, or permit selected third parties to provide you, with
                information about opportunities, goods or services we feel
                may interest you. If you are an existing customer, we will
                only contact you by e-mail, SMS, telephone or your preferred
                method of contact if different, with information about
                opportunities, goods and services similar to those which
                were the subject of a previous sale or negotiations of a
                sale to you. If you are a new customer, and where we permit
                third parties to use your data, we (or they) will contact
                you by e-mail, SMS, telephone or your preferred method of
                contact if different only if you have consented to this.
              </li>
            </ul>
            <p className="text-[var(--muted)] text-[15px] md:text-[18px] font-light leading-[1.7] mt-4">
              Note that there is a possibility for us to call you on your
              phone number after the specified TRAI timings.
            </p>
            <ul className="list-disc pl-6 space-y-4 text-[var(--muted)] text-[15px] md:text-[18px] font-light leading-[1.7] mt-4">
              <li>
                <span className="font-semibold text-[var(--ink)]">
                  Information we collect about you:
                </span>{" "}
                We will use this information to administer our sites and for
                internal operations, including troubleshooting, data
                analysis, testing, research, statistical and survey
                purposes; to improve our sites to ensure that content is
                presented in the most effective manner for you and for your
                computer; to allow you, when required, to participate in
                interactive features of our service; as part of our efforts
                to keep our sites safe and secure; to measure or understand
                the effectiveness of advertising we serve to you and others,
                and to deliver relevant advertising to you; to make
                suggestions and recommendations to you and other users of
                our sites about goods or services that may interest you or
                them.
              </li>
              <li>
                <span className="font-semibold text-[var(--ink)]">
                  Information we receive from other sources:
                </span>{" "}
                We may combine this information with information you give to
                us and information we collect about you. This includes but
                is not limited to information we receive from our sales
                agents. We may use this information and the combined
                information for the purposes set out above (depending on the
                types of information we receive).
              </li>
            </ul>

            <h3 className="font-semibold text-[var(--ink)] text-[17px] md:text-[20px] mt-10 mb-3">
              Disclosure of Your Information
            </h3>
            <ul className="list-disc pl-6 space-y-4 text-[var(--muted)] text-[15px] md:text-[18px] font-light leading-[1.7]">
              <li>
                We may share your personal information with any member of
                our group, which means our subsidiaries, our ultimate
                holding company and its subsidiaries.
              </li>
              <li>
                We may share your information with selected third parties
                including, where applicable: business partners, suppliers
                and sub-contractors (including, but not limited to, estate
                agents, sales agents and our professional advisors) for the
                performance of any contract or any potential contract we may
                enter into with them or you, or in relation to any ancillary
                requirements; advertisers and advertising networks that
                require the data to select and serve relevant adverts to you
                and others; and analytics and search engine providers that
                assist us in the improvement and optimisation of our sites.
              </li>
              <li>
                We may disclose your personal information to third parties
                if we sell or buy any business or assets; if Rustomjee or
                substantially all of its assets are acquired by a third
                party, your personal data will be one of the transferred
                assets; and if we are under a duty to disclose or share your
                personal data in order to comply with any legal obligation,
                or in order to enforce or apply our terms of use and other
                agreements, or to protect the rights, property, or safety of
                Rustomjee, our customers, or others. This includes
                exchanging information with other companies and
                organisations for the purposes of fraud protection and
                credit risk reduction.
              </li>
              <li>
                We may share your non sales related information such as
                cookies, email IDs, phone number etc to external parties.
                But, we do not share your sales related information such as
                PAN Card No, Credit / Debit Card details, preference details
                with the external parties.
              </li>
            </ul>

            <h3 className="font-semibold text-[var(--ink)] text-[17px] md:text-[20px] mt-10 mb-3">
              Where We Store Your Personal Data
            </h3>
            <ul className="list-disc pl-6 space-y-4 text-[var(--muted)] text-[15px] md:text-[18px] font-light leading-[1.7]">
              <li>
                The data that we collect from you may be transferred, stored
                and processed by staff who work for us or for one of our
                suppliers or one of our group companies. Such staff may be
                engaged in, among other things, the fulfilment of your order
                or enquiry and the provision of support services. By
                submitting your personal data, you agree to this transfer,
                storing or processing. We will take all steps reasonably
                necessary to ensure that your data is treated securely.
              </li>
              <li>
                We have put in place appropriate technical and
                organisational measures to guard against unauthorised or
                unlawful processing of personal data and accidental loss or
                destruction of, or damage to, personal data. Unfortunately,
                the transmission of information via the internet is not
                completely secure and we cannot guarantee the security of
                your data transmitted to our sites and any transmission is
                at your own risk.
              </li>
            </ul>

            <h3 className="font-semibold text-[var(--ink)] text-[17px] md:text-[20px] mt-10 mb-3">
              Your Rights
            </h3>
            <ul className="list-disc pl-6 space-y-4 text-[var(--muted)] text-[15px] md:text-[18px] font-light leading-[1.7]">
              <li>
                You have the right to ask us not to process your personal
                data for marketing purposes.
              </li>
              <li>
                Our sites may contain links to and from the websites of our
                partner networks, advertisers and affiliates. If you follow
                a link, please note that these websites have their own
                privacy policies and that we do not accept any
                responsibility or liability for these policies. Please check
                these policies before you submit any personal data to these
                websites.
              </li>
            </ul>

            <h3 className="font-semibold text-[var(--ink)] text-[17px] md:text-[20px] mt-10 mb-3">
              Cookies
            </h3>
            <p className="text-[var(--muted)] text-[15px] md:text-[18px] font-light leading-[1.7] mb-4">
              Our sites may use cookies to distinguish you from other users
              of our sites. This helps us to provide you with a good
              experience when you browse our sites and also allows us to
              improve our sites. By continuing to browse our sites, you are
              agreeing to our use of cookies. A cookie is a small file of
              letters and numbers that we store on your browser or the hard
              drive of your computer if you agree. Cookies contain
              information that is transferred to your computer's hard drive.
            </p>
            <p className="text-[var(--muted)] text-[15px] md:text-[18px] font-light leading-[1.7] mb-4">
              We use cookies that are required for the operation of our
              sites (they include, for example, cookies that enable you to
              log into the secure area of our sites); to allow us to
              recognise and count the number of visitors and to see how
              visitors move around our sites when they are using it; to
              recognise you when you return to our sites in order to enable
              us to personalise our content for you; to record your visit to
              our sites, the pages you have visited and the links you have
              followed in order to make our sites more relevant to your
              interests. Please note that third parties may also use
              cookies, over which we have no control.
            </p>
            <p className="text-[var(--muted)] text-[15px] md:text-[18px] font-light leading-[1.7]">
              You can block cookies by activating the setting on your
              browser that allows you to refuse the setting of all or some
              cookies. However, if you use your browser settings to block
              all cookies (including essential cookies) you may not be able
              to access all or parts of our site.
            </p>

            <h3 className="font-semibold text-[var(--ink)] text-[17px] md:text-[20px] mt-10 mb-3">
              Changes to Our Privacy Policy
            </h3>
            <p className="text-[var(--muted)] text-[15px] md:text-[18px] font-light leading-[1.7]">
              Any changes we may make to our privacy policy will be posted on
              this page and, where appropriate, notified to you by e-mail.
              Please check back frequently to see any updates or changes to
              our privacy policy.
            </p>
          </main>

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