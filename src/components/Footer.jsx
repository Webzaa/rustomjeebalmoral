import React from "react";
import { FOOTER, NAV_LINKS } from "../mock";
import { Link } from "react-router-dom";

const Footer = () => {
  const go = (href) => document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
  return (
    <footer className="bg-[var(--light-blue)] text-[var(--black)]">
      <div className="mx-auto max-w-[1360px] px-6 md:px-10 py-10 md:py-15 mb-10 md:mb-30">
        {/*<div className="grid grid-cols-1 md:grid-cols-[1.4fr_1fr_1fr] gap-12">
           <div>
            <div className="font-serif-display text-[2rem] leading-none">{FOOTER.developer}</div>
            <div className="text-[11px] tracking-luxe uppercase text-[var(--brass-2)] mt-2">
              {FOOTER.project}
            </div>
            <p className="mt-5 text-[var(--black)]/60 text-[14px] font-light">{FOOTER.location}</p>
          </div>

          <div>
            <div className="text-[11px] tracking-wide-2 uppercase text-[var(--black)]/50 mb-5">Explore</div>
              <ul className="space-y-3">
                {NAV_LINKS.map((l) => (
                  <li key={l.href}>
                    <button
                      onClick={() => go(l.href)}
                      className="text-[14px] font-light text-[var(--black)]/80 hover:text-[var(--black)] hover-underline"
                    >
                      {l.label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <div className="text-[11px] tracking-wide-2 uppercase text-[var(--black)]/50 mb-5">Enquiries</div>
              <button
                onClick={() => go("#enquire")}
                className="text-[14px] font-light text-[var(--black)]/80 hover:text-[var(--black)] hover-underline"
              >
                Register your interest
              </button>
              <p className="mt-4 text-[14px] font-light text-[var(--black)]/60">Chembur, Mumbai 400071</p>
            </div>
          </div> */}
          <p className="text-center">Sales Gallery: Rustomjee Balmoral Golf Links, Ramakrishna Chemburkar Marg, Charai, Chembur, Mumbai, Maharashtra 400071.</p>
        <div className="mt-6 pt-8  border-t border-black/10">
          <p className=" text-center pb-8 text-[11px] leading-relaxed text-[var(--black)]/45 font-light max-w-4x4">
            {FOOTER.disclaimer}
          </p>
          <div className=" pt-4 md:mb-[60px] border-t border-black/10 flex flex-col text-center sm:flex-row sm:justify-between sm:text-left items-center gap-2">
            <p className="text-[14px] md:text-[16px] text-[var(--black)]/40">
              © {new Date().getFullYear()} Rustomjee Balmoral Golf Links.
            </p>
            <p className="text-[14px] md:text-[16px] text-[var(--black)]/40">
              <Link to="PrivacyPolicy" rel="noopener noreferrer">Privacy Policy</Link> | <Link to="TermsConditions" rel="noopener noreferrer">Terms & Conditions</Link>
            </p>
          </div>
        </div>
      </div>
      
    </footer>
   
  );
};

export default Footer;
