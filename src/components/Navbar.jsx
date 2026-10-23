import React, { useEffect, useLayoutEffect, useState } from "react";
import { NAV_LINKS } from "../mock";
import { Menu, X } from "lucide-react";
import logo02 from "../assets/images/logo02.png";
import EnquiryPopup from "./EnquiryPopup";

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [popupOpen, setPopupOpen] = useState(false);
  const [popupForm, setPopupForm] = useState("Register Interest");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

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
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 ${
        scrolled
          ? "bg-[var(--cream)] backdrop-blur-md border-b border-[var(--line)] py-3"
          : "bg-transparent py-6"
      }`}
    >
      <div className="mx-auto max-w-[1360px] px-6 md:px-10 flex items-center justify-between">
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="text-left"
          aria-label="Back to top"
        >
          <img
            src={logo02}
            alt="Rustomjee® — It's Thoughtful · Balmoral Golf Links"
            className="w-auto h-[42px] md:h-[48px] object-contain transition-opacity duration-500"
          />
        </button>

        <nav className="hidden lg:flex items-center gap-9">
          {NAV_LINKS.map((l) => (
            <button
              key={l.href}
              onClick={() => go(l.href)}
              className={`text-[12px] tracking-wide-2 uppercase hover-underline transition-colors duration-500 ${
                scrolled ? "text-[var(--ink)]" : "text-white/85 hover:text-white"
              }`}
            >
              {l.label}
            </button>
          ))}
          <button
            onClick={() => { setPopupForm("Register Interest"); setPopupOpen(true); }}
            className={`hidden lg:inline-flex items-center px-6 py-3 text-[11px] tracking-wide-2 uppercase transition-all duration-500 ${
              scrolled
                ? "bg-[var(--forest)] text-[var(--cream)] hover:bg-[var(--forest-2)]"
                : "border border-white/50 text-white hover:bg-white hover:text-[var(--forest)]"
            }`}
          >
            Register Interest
          </button>
        </nav>

        <button
          className={`lg:hidden ${scrolled ? "text-[var(--ink)]" : "text-white"}`}
          onClick={() => setOpen(true)}
          aria-label="Open menu"
        >
          <Menu size={26} strokeWidth={1.4} />
        </button>
      </div>

      {open && (
        <div className="fixed inset-0 z-[60] bg-[var(--forest)] text-[var(--cream)] flex flex-col">
          <div className="flex items-center justify-between px-6 py-6">
            <div className="font-serif-display text-[22px]">Rustomjee</div>
            <button onClick={() => setOpen(false)} aria-label="Close menu">
              <X size={28} strokeWidth={1.4} />
            </button>
          </div>
          <nav className="flex-1 flex flex-col justify-center gap-2 px-8">
            {NAV_LINKS.map((l) => (
              <button
                key={l.href}
                onClick={() => go(l.href)}
                className="text-left font-serif-display text-[34px] py-2 border-b border-white/10"
              >
                {l.label}
              </button>
            ))}
            <button
              onClick={() => { setPopupForm("Register Interest"); setPopupOpen(true); }}
              className="mt-8 bg-[var(--brass)] text-[var(--ink)] px-6 py-4 text-[12px] tracking-wide-2 uppercase"
            >
              Register Interest
            </button>
          </nav>
        </div>
      )}
      <EnquiryPopup open={popupOpen} onClose={() => setPopupOpen(false)} formName={popupForm} />
    </header>
  );
};

export default Navbar;
