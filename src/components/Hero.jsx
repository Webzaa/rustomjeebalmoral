import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import { ChevronLeft, ChevronRight } from "lucide-react";
import "swiper/css";
import EnquiryPopup from "./EnquiryPopup";
import { HERO } from "../mock";
import heroDesktop from "../assets/images/hero-desktop.jpg";
import heroMobile from "../assets/images/hero-mobile.jpg";
import qrCode1 from "../assets/images/qr-code-1.png";
import qrCode2 from "../assets/images/qr-code-2.png";
import qrCode3 from "../assets/images/qr-code-3.png";

const reraWings = [
  { wing: "Wing A", number: "P51800080624", qr: qrCode1 },
  { wing: "Wing C", number: "PR1180002502115", qr: qrCode2 },
  { wing: "Wing F", number: "P51800080027", qr: qrCode3 },
];

const Hero = () => {
  const [loaded, setLoaded] = useState(false);
  const [isMahaReraOpen, setIsMahaReraOpen] = useState(false);
  const [prevEl, setPrevEl] = useState(null);
  const [nextEl, setNextEl] = useState(null);
  const [popupOpen, setPopupOpen] = useState(false);
  const [popupForm, setPopupForm] = useState("Discover Tranquility");

  useEffect(() => {
    const t = setTimeout(() => setLoaded(true), 120);

    return () => clearTimeout(t);
  }, []);

  return (
    <section
      id="top"
      data-testid="hero-section"
      className="
        relative
        h-[100svh]
        min-h-[640px]
        w-full
        overflow-hidden
      "
    >
      {/* ================= MAHARERA BUTTON ================= */}
      <button
        type="button"
        onClick={() => setIsMahaReraOpen(true)}
        className="border absolute top-20 right-4 md:top-24 md:right-8 z-30 cursor-pointer bg-[#33333363] px-[17px] py-3 text-[13px] font-normal text-white backdrop-blur-[40px] transition-all duration-300 hover:bg-[#33333390]"
      >
        MAHARERA DETAILS
      </button>

      {/* ================= MAHARERA PANEL ================= */}
      <AnimatePresence>
        {isMahaReraOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.25 }}
            className="absolute top-20 right-4 md:top-24 md:right-8 z-40 h-[290px] w-[280px] bg-[#333333d0] p-4 flex flex-col justify-between items-center text-center text-white backdrop-blur-[40px] shadow-2xl max-md:top-16 max-md:left-4 max-md:right-4 max-md:h-[295px] max-md:w-[calc(100%-32px)] max-md:bg-[#05050595]"
          >
            <button
              type="button"
              onClick={() => setIsMahaReraOpen(false)}
              className="absolute right-3 top-2.5 z-50 cursor-pointer border-0 bg-transparent text-[24px] leading-none text-white hover:text-amber-200 transition-colors"
              aria-label="Close MahaRERA details"
            >
              ×
            </button>

            <h4 className="m-0 p-0 text-[13px] sm:text-[14px] tracking-widest font-medium text-white uppercase w-full text-center">
              RUSTOMJEE BALMORAL
            </h4>

            <div className="relative w-full my-auto">
              <Swiper
                modules={[Navigation, Autoplay]}
                navigation={{ prevEl, nextEl }}
                autoplay={{ delay: 5000, disableOnInteraction: false }}
                loop={true}
                className="w-full"
              >
                {reraWings.map((item) => (
                  <SwiperSlide key={item.wing}>
                    <div className="flex flex-col items-center justify-center">
                      <img
                        src={item.qr}
                        alt={`${item.wing} MahaRERA QR Code`}
                        className="mx-auto w-[105px] h-[105px] object-contain bg-white p-1 shadow-md"
                      />
                      <div className="mt-2 text-center text-white w-full">
                        <span className="text-[12px] sm:text-[14px] font-normal uppercase tracking-wider block opacity-90">
                          RERA Registration Number
                        </span>
                        <span className="text-[12px] sm:text-[14px] font-normal tracking-tight block mt-0.5 text-amber-100 whitespace-nowrap">
                          {item.wing} - {item.number}
                        </span>
                      </div>
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>

            <div className="flex items-center justify-center gap-3 w-full">
              <button
                ref={(node) => setPrevEl(node)}
                className="h-8 w-8 rounded-full border border-white/80 bg-black/25 flex items-center justify-center text-white hover:bg-white/30 transition-all cursor-pointer"
                aria-label="Previous QR"
              >
                <ChevronLeft size={16} strokeWidth={2} />
              </button>
              <button
                ref={(node) => setNextEl(node)}
                className="h-8 w-8 rounded-full border border-white/80 bg-black/25 flex items-center justify-center text-white hover:bg-white/30 transition-all cursor-pointer"
                aria-label="Next QR"
              >
                <ChevronRight size={16} strokeWidth={2} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* =====================================================
          HERO BACKGROUND
      ===================================================== */}

      <div
        className="
          absolute
          inset-[-6%]
          parallax-layer
        "
        data-parallax
        data-parallax-speed="0.08"
      >
        <picture>
          {/* Mobile Background */}
          <source
            media="(max-width: 767px)"
            srcSet={heroMobile}
          />

          {/* Desktop Background */}
          <img
            src={heroDesktop}
            alt="Rustomjee Balmoral Golf Links"
            className="
              h-full
              w-full
              object-cover
              animate-kenburns
            "
          />
        </picture>

        {/* Dark cinematic overlay */}
        <div
          className="
            absolute
            inset-0
            bg-gradient-to-b
            from-black/45
            via-black/25
            to-black/60
          "
        />

        {/* Forest tint */}
        <div
          className="
            absolute
            inset-0
            bg-gradient-to-t
            from-[var(--forest)]/40
            to-transparent
          "
        />
      </div>


      {/* =====================================================
          HERO CONTENT
      ===================================================== */}

      <div
        className="
          relative
          z-10
          mx-auto
          flex
          h-full
          max-w-[1360px]
          flex-col
          justify-end
          px-6
          pb-24
          md:px-10
          md:pb-28
        "
      >
        <div
          className={`
            transition-all
            duration-[1400ms]
            ease-[cubic-bezier(0.16,1,0.3,1)]
            ${
              loaded
                ? "translate-y-0 opacity-100"
                : "translate-y-8 opacity-0"
            }
          `}
        >

          {/* =================================================
              EYEBROW
          ================================================= */}

          <div
            className="
              
              mb-6
              flex
              items-center
              gap-3
            "
          >
            <span
              className="
              hidden
              md:inline
                h-px
                w-10
                bg-[var(--brass-2)]
              "
            />

            <span
              className="
              hidden
              md:inline
                text-[11px]
                uppercase
                tracking-wide-2
                text-white/85
                md:text-[12px]
              "
            >
              {HERO.eyebrow}
            </span>
          </div>


          {/* =================================================
              MAIN HEADING
          ================================================= */}

          <h1
            className="
              font-serif-display
              font-light
              leading-[0.94]
              text-white
              text-[15vw]
              sm:text-[10vw]
              md:text-[6.5vw]
              lg:text-[5.4rem]
            "
          >
            <span className="block">
              {HERO.titleTop}
            </span>

            <span
              className="
                block
                italic
                text-[var(--brass-2)]
              "
            >
              {HERO.titleBottom}
            </span>
          </h1>


          {/* =================================================
              SUBTITLE
          ================================================= */}

          <p
            className="
              mt-7
              max-w-xl
              text-[15px]
              font-light
              leading-relaxed
              text-white/80
              md:text-[17px]
            "
          >
            {HERO.subtitle}
          </p>


          {/* =================================================
              CTA BUTTONS
          ================================================= */}

          <div
            className="
              mt-10
              flex
              flex-wrap
              items-center
              gap-5
            "
          >

            {/* Discover Balmoral */}

            <button
              type="button"
              onClick={() => { setPopupForm("Discover Tranquility"); setPopupOpen(true); }}
              className="
                group
                inline-flex
                items-center
                gap-3
                bg-[var(--cream)]
                px-8
                py-4
                text-[12px]
                uppercase
                tracking-wide-2
                text-[var(--forest)]
                transition-colors
                duration-500
                hover:bg-white
              "
            >
              {HERO.cta}
            </button>


            {/* View Residences */}

            {/* <button
              type="button"
              onClick={() =>
                document
                  .querySelector("#residences")
                  ?.scrollIntoView({
                    behavior: "smooth",
                  })
              }
              className="
                text-[12px]
                uppercase
                tracking-wide-2
                text-white
                hover-underline
              "
            >
              View Residences
            </button> */}

          </div>

        </div>
      </div>
  <EnquiryPopup open={popupOpen} onClose={() => setPopupOpen(false)} formName={popupForm} />
    </section>
  );
};

export default Hero;