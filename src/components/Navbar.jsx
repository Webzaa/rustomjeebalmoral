import React, { useEffect, useLayoutEffect, useState } from "react";
import { NAV_LINKS } from "../mock";
import { Menu, X } from "lucide-react";
import logo from '../images/logo.png';
import EnquiryPopup from "./EnquiryPopup";

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [popupOpen, setPopupOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // 🔒 Lock background scroll while mobile menu is open
  useLayoutEffect(() => {
    if (open) {
      const scrollY = window.scrollY;
      document.body.style.position = "fixed";
      document.body.style.top = `-${scrollY}px`;
      document.body.style.left = "0";
      document.body.style.right = "0";
      document.body.style.width = "100%";
      document.body.style.overflow = "hidden";

      return () => {
        document.body.style.position = "";
        document.body.style.top = "";
        document.body.style.left = "";
        document.body.style.right = "";
        document.body.style.width = "";
        document.body.style.overflow = "";
        window.scrollTo(0, scrollY);
      };
    }
  }, [open]);

  const go = (href) => {
    setOpen(false);
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        const el = document.querySelector(href);
        if (el) el.scrollIntoView({ behavior: "smooth" });
      });
    });
  };

  return (
    <header className={`bg-[var(--light-blue)] border-b border-[var(--line)] fixed top-0 left-0 right-0 z-50 transition-all duration-700 ${
        scrolled
          ? "bg-[var(--light-blue)] backdrop-blur-md border-b border-[var(--line)] py-3"
          : " py-3"
      }`}
    >
      <div className="mx-auto max-w-[1360px] px-6 md:px-10 flex items-center justify-between">
        <button onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} className="text-left">
          <img src={logo} alt="Rustomjee Balmoral Golf Links" className={`h-10 md:h-14 w-auto transition-all duration-500 ${scrolled ? "" : "" }`}/>
        </button>

        <nav className="hidden lg:flex items-center gap-6">
          {NAV_LINKS.map((l) => (
            <button
              key={l.href}
              onClick={() => go(l.href)}
              className={`text-[15px] tracking-wide-2 font-semibold uppercase hover-underline transition-colors duration-500 leading-[34px] ${
                scrolled ? "text-[var(--ink)]" : "text-black/85 hover:text-black"
              }`}
            >
              {l.label}
            </button>
          ))}
        </nav>

        <button
          onClick={() => setPopupOpen(true)}
          className={`font-serif-display bg-[var(--blue)] text-[var(--white)] rounded-[30px] hover:bg-[var(--light-blue)] hidden lg:inline-flex items-center px-6 py-3 text-[11px] tracking-wide-2 uppercase transition-all duration-500  ${
            scrolled
              ? "bg-[var(--black)] text-[var(--white)] hover:bg-[var(--light-blue)] border border-black/50 hover:text-[var(--black)]"
              : "border border-black/50 text-white hover:text-[var(--black)]"
          }`}
        >
          Register Interest
        </button>

        <button
          className={`lg:hidden ${scrolled ? "text-[var(--ink)]" : "text-black"}`}
          onClick={() => setOpen(true)}
          aria-label="Open menu"
        >
          <Menu size={26} strokeWidth={1.4} />
        </button>
      </div>

      {/* Mobile menu overlay — stays mounted, animates opacity over 0.1s */}
      <div
        className={`fixed inset-0 z-[60] bg-[var(--light-blue)] text-[var(--cream)] flex flex-col transition-opacity duration-100 ${
          open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      >
        <div className="flex items-center justify-between px-6 py-6">
          <div className="font-serif-display">
            <img src={logo} alt="Rustomjee Balmoral Golf Links" className={`h-10 md:h-14 w-auto transition-all duration-500 ${scrolled ? "" : ""
              }`}
          />
          </div>
          <button onClick={() => setOpen(false)} aria-label="Close menu" className="text-[var(--black)]">
            <X size={28} strokeWidth={1.4} />
          </button>
        </div>
        <nav className="flex-1 flex flex-col gap-2 px-8">
          {NAV_LINKS.map((l) => (
            <button
              key={l.href}
              onClick={() => go(l.href)}
              className="text-left text-[var(--black)] font-semibold text-[20px] py-2 border-b border-black/10"
            >
              {l.label}
            </button>
          ))}
          <button
            onClick={() => setPopupOpen(true)}
            className="mt-8 font-serif-display bg-[var(--blue)] text-[var(--white)] px-6 py-4 text-[12px] tracking-wide-2 uppercase"
          >
            Register Interest
          </button>
        </nav>
      </div>

      <EnquiryPopup open={popupOpen} onClose={() => setPopupOpen(false)} />
    </header>
  );
};

export default Navbar;