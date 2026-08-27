import React, { useEffect, useState } from "react";
import { HERO, IMAGES } from "../mock";
import { ChevronDown } from "lucide-react";
import desktop from '../images/slider/slider03.webp';
import mobile from '../images/slider/slider03mobile.webp';
import qrWingA from '../images/qrcodewing-A.webp';
import qrWingC from '../images/qrwingc.webp';
import qrWingF from '../images/qrcodewing-F.webp';

const RERA_SLIDES = [
  { img: qrWingA, wing: "Wing A", number: "P51800080624" },
  { img: qrWingC, wing: "Wing C", number: "PR1180002502115" },
  { img: qrWingF, wing: "Wing F", number: "P51800080027" },
];

const Hero = () => {
  const [loaded, setLoaded] = useState(false);
  const [reraOpen, setReraOpen] = useState(false);
  const [reraSlide, setReraSlide] = useState(0);

  useEffect(() => {
    const t = setTimeout(() => setLoaded(true), 120);
    return () => clearTimeout(t);
  }, []);

  const scrollTo = (href) => {
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  const changeReraSlide = (direction) => {
    setReraSlide((prev) => {
      const next = prev + direction;
      if (next < 0 || next >= RERA_SLIDES.length) return prev;
      return next;
    });
  };

  const slide = RERA_SLIDES[reraSlide];

  return (
    <section className=" mt-[60px] md:mt-[80px] relative min-h-[590px] w-full overflow-hidden">
      {/* Ambient dawn backdrop with slow ken-burns drift */}
      <div className="absolute inset-0">
        <img
          src={desktop}
          alt="BPGC golf course at dawn beside Rustomjee Balmoral"
          className="hidden lg:block h-full w-full "
        />

        <img
          src={mobile}
          alt="BPGC golf course at dawn beside Rustomjee Balmoral"
          className="block lg:hidden w-full "
        />
        {/* <div className="absolute inset-0 bg-gradient-to-b from-black/45 via-black/25 to-black/60" />
        <div className="absolute inset-0 bg-gradient-to-t from-[var(--forest)]/40 to-transparent" /> */}
      </div>

      {/* <div className="relative z-10 h-full mx-auto max-w-[1360px] px-6 md:px-10 flex flex-col justify-end pb-24 md:pb-28">
        <div
          className={`transition-all duration-[1400ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${
            loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <div className="flex items-center gap-3 mb-6">
            <span className="h-px w-10 bg-[var(--brass-2)]" />
            <span className="text-white/85 text-[11px] md:text-[12px] tracking-wide-2 uppercase">
              {HERO.eyebrow}
            </span>
          </div>

          <h1 className="font-serif-display text-white font-light leading-[0.94] text-[15vw] sm:text-[12vw] md:text-[8.5vw] lg:text-[7.4rem]">
            <span className="block">{HERO.titleTop}</span>
            <span className="block italic text-[var(--brass-2)]">{HERO.titleBottom}</span>
          </h1>

          <p className="mt-7 max-w-xl text-white/80 text-[15px] md:text-[17px] font-light leading-relaxed">
            {HERO.subtitle}
          </p>

          <div className="mt-10 flex flex-wrap items-center gap-5">
            <button
              onClick={() => scrollTo("#philosophy")}
              className="group inline-flex items-center gap-3 bg-[var(--cream)] text-[var(--forest)] px-8 py-4 text-[12px] tracking-wide-2 uppercase hover:bg-white transition-colors duration-500"
            >
              {HERO.cta}
              <ChevronDown size={16} className="group-hover:translate-y-0.5 transition-transform duration-500" />
            </button>
            <button
              onClick={() => scrollTo("#residences")}
              className="text-white text-[12px] tracking-wide-2 uppercase hover-underline"
            >
              View Residences
            </button>
          </div>
        </div>
      </div> */}

      {/* MahaRERA trigger */}
      <div
        onClick={() => setReraOpen((prev) => !prev)}
        className="absolute top-0 right-0 z-40 cursor-pointer select-none bg-[#33333363] hover:bg-[#33333390] text-white text-[12px] md:text-[13px] tracking-wide-2 uppercase px-4 py-2.5 md:px-[18px] md:py-[10px] transition-colors duration-300"
      >
        MahaRERA Details
      </div>

      {/* MahaRERA panel */}
      {reraOpen && (
        <div className="absolute top-[0px] md:top-[0px] right-0 z-40 bg-[#a3a3a3] w-[210px] md:w-[250px]  text-white text-center px-4 md:px-[22px] pt-7 pb-5 shadow-[-4px_4px_24px_rgba(0,0,0,0.25)] animate-[fadeIn_0.25s_ease]">
          <button
            onClick={() => setReraOpen(false)}
            aria-label="Close"
            className="absolute text-[29px] top-2.5 right-3.5 text-[#ccc] hover:text-white text-lg leading-none"
          >
            ×
          </button>

          <h4 className="text-[13px] tracking-wide-2 font-semibold text-[var(--white)] uppercase mb-[18px]">
            Rustomjee Balmoral
          </h4>

          <div>
            <img
              src={slide.img}
              alt={`${slide.wing} QR code`}
              className="w-[110px] h-[110px] md:w-[130px] md:h-[130px] bg-white p-2 object-contain mx-auto"
            />
            <p className="text-[13px] tracking-wide uppercase text-white mt-4 mb-1">
              {slide.wing}
            </p>
            <p className="text-[13px] tracking-wide uppercase text-white mb-1">
              RERA Registration Number
            </p>
            <p className="text-[13px] tracking-wide text-white">{slide.number}</p>
          </div>

          <div className="flex justify-center gap-3.5 mt-[18px]">
            <button
              onClick={() => changeReraSlide(-1)}
              disabled={reraSlide === 0}
              aria-label="Previous"
              className="w-[30px] h-[30px] rounded-full border border-black/50 flex items-center justify-center text-sm hover:bg-black/15 disabled:opacity-30 disabled:cursor-not-allowed transition-colors duration-200"
            >
              <span className="text-[30px]" style={{ marginTop: "-7px" }}>‹</span>
            </button>
            <button
              onClick={() => changeReraSlide(1)}
              disabled={reraSlide === RERA_SLIDES.length - 1}
              aria-label="Next"
              className="w-[30px] h-[30px] rounded-full border border-black/50 flex items-center justify-center text-sm hover:bg-black/15 disabled:opacity-30 disabled:cursor-not-allowed transition-colors duration-200"
            >
              <span className="text-[30px]" style={{ marginTop: "-7px" }}>›</span>
            </button>
          </div>
        </div>
      )}

      <button
        onClick={() => scrollTo("#philosophy")}
        className="absolute bottom-7 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 text-white/70"
        aria-label="Scroll down"
      >
        <span className="text-black text-[10px] tracking-luxe uppercase">Scroll</span>
        <ChevronDown size={18} className="text-black animate-soft-pulse" />
      </button>
    </section>
  );
};

export default Hero;