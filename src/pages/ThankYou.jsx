import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import logo02 from "../assets/images/logo02.png";
const ThankYou = () => {
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = "Thank You · Rustomjee Balmoral Golf Links";
  }, []);
    const goBack = () => {
      if (window.history.length > 1) {
        navigate(-1);
      } else {
        window.location.href = "/";
      }
    };

  return (
    <main className="w-100  min-h-[100svh] bg-[var(--cream)] text-[var(--ink)] flex items-center justify-center px-6 py-16">
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
      <div className="w-full max-w-[760px] text-center">

        {/* Eyebrow */}
        {/* <div className="flex items-center justify-center gap-3 mb-8">
          <span className="h-px w-10 bg-[var(--brass)]" />

          <span className="text-[var(--brass)] text-[11px] tracking-[0.28em] uppercase">
            Rustomjee Balmoral
          </span>

          <span className="h-px w-10 bg-[var(--brass)]" />
        </div> */}

        {/* Number */}
        {/* <div className="font-serif-display text-[var(--brass)] text-6xl md:text-8xl font-light leading-none">
          01
        </div> */}

        {/* Heading */}
        <h1 className="mt-8 font-serif-display text-[var(--ink)] text-[3rem] md:text-[5.5rem] font-light leading-[0.95]">
          Thank you.
        </h1>

        {/* Subheading */}
        <p className="mt-7 mx-auto max-w-xl text-[var(--muted)] text-[15px] md:text-[17px] font-light leading-relaxed">
          Thank you for your interest in Rustomjee Balmoral Golf Links.
          Our representative will connect with you shortly to assist you
          with the project and answer any questions you may have.
        </p>

        {/* Divider */}
        <div className="mx-auto mt-5 mb-5 h-px w-20 bg-[var(--line)]" />

        {/* CTA */}
        <button
          type="button"
          onClick={goBack}
          className="
            inline-flex
            items-center
            justify-center
            px-8
            py-4
            bg-[var(--forest)]
            text-[var(--cream)]
            text-[11px]
            tracking-[0.22em]
            uppercase
            transition-all
            duration-500
            hover:bg-[var(--brass)]
            hover:text-white
          "
        >
          Back to Balmoral
        </button>

      </div>
    </main>
  );
};

export default ThankYou;