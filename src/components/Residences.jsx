import React, { useState } from "react";
import { RESIDENCES } from "../mock";
import useReveal from "../hooks/useReveal";
import EnquiryPopup from "./EnquiryPopup";

const Stat = ({ label, value }) => (
  <div className="border-t border-[var(--line)] py-4">
    <div className="text-[11px] tracking-wide-2 uppercase text-[var(--sage)]">{label}</div>
    <div className="mt-1 font-serif-display text-[1.4rem] text-[var(--ink)]">{value}</div>
  </div>
);

const Residences = () => {
  const [active, setActive] = useState(0);
  const [popupOpen, setPopupOpen] = useState(false);
  const cfg = RESIDENCES.configs[active];
  const { ref, inView } = useReveal();

  return (
    <section id="residences" className="py-20 md:py-32 bg-[var(--cream)]">
      <div className="mx-auto max-w-[1360px] px-6 md:px-10">
        <div className="max-w-2xl mb-10 md:mb-14">
          <div className="flex items-center gap-3 mb-6">
            <span className="h-px w-8 bg-[var(--brass)]" />
            <span className="text-[var(--brass)] text-[11px] tracking-wide-2 uppercase">( {RESIDENCES.eyebrow} )</span>
          </div>
          <h2 className="font-serif-display text-[var(--ink)] text-[2.2rem] md:text-[3.2rem] leading-[1.05] font-light">{RESIDENCES.title}</h2>
        </div>

        <div className="flex flex-wrap gap-2 mb-10">
          {RESIDENCES.configs.map((c, i) => (
            <button
              key={c.key}
              onClick={() => setActive(i)}
              className={`px-6 py-3 text-[12px] tracking-wide-2 uppercase border transition-all duration-400 ${active === i ? "bg-[var(--forest)] text-[var(--cream)] border-[var(--forest)]" : "bg-transparent text-[var(--ink)] border-[var(--line)] hover:border-[var(--forest)]"}`}
            >
              {c.key}
            </button>
          ))}
        </div>

        <div ref={ref} className={`reveal ${inView ? "in-view" : ""} grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-14 items-center`}>
          <div className="relative overflow-hidden aspect-[4/3] order-1 parallax-layer" data-parallax data-parallax-speed="0.10">
            <img key={cfg.image} src={cfg.image} alt={cfg.name} className="h-full w-full object-cover" />
            <span className=" absolute bottom-5 right-5 font-serif-display text-[10px] text-[var(--cream)] opacity-90">AI Generated | Representational Image</span>
            <span className="absolute top-5 left-5 px-4 py-2 bg-[var(--cream)]/90 text-[var(--forest)] text-[11px] tracking-wide-2 uppercase">{cfg.key}</span>
          </div>

          <div className="order-2">
            <h3 className="font-serif-display text-[2rem] md:text-[2.6rem] font-light leading-tight text-[var(--ink)]">{cfg.name}</h3>
            <p className="mt-4 text-[var(--muted)] text-[15px] font-light leading-relaxed max-w-lg">{cfg.desc}</p>
            <div className="mt-8 max-w-md">
              <Stat label="Pricing" value={cfg.aspect} />
              <Stat label="Possession" value={cfg.possession} />
            </div>
            <button
              onClick={() => setPopupOpen(true)}
              className="mt-8 inline-flex items-center px-8 py-4 bg-[var(--forest)] text-[var(--cream)] text-[12px] tracking-wide-2 uppercase hover:bg-[var(--forest-2)] transition-colors duration-500"
            >
              Request Floor Plan
            </button>
          </div>
        </div>

        <p className="mt-10 text-[12px] text-[var(--sage)] font-light border-t border-[var(--line)] pt-6">{RESIDENCES.note}</p>
      </div>

      <EnquiryPopup
        open={popupOpen}
        onClose={() => setPopupOpen(false)}
        formName="Request Floor Plan"
        floorPlan
        defaultConfig={cfg.key}
      />
    </section>
  );
};

export default Residences;
