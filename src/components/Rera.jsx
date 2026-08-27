import React from "react";
import { RERA } from "../mock";
import { ShieldCheck, ExternalLink } from "lucide-react";
import useReveal from "../hooks/useReveal";

const Rera = () => {
  const { ref, inView } = useReveal();
  return (
    <section className="py-10 md:py-15 bg-[var(--white)]">
      <div className="mx-auto max-w-[1360px] px-6 md:px-10">
        <div ref={ref} className={`reveal ${inView ? "in-view" : ""} border border-[var(--line)] bg-[var(--light-blue)] p-8 md:p-12`}>
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.1fr] gap-10 lg:gap-1 items-center">
            <div>
              <div className="flex items-center gap-3 mb-5">
                <ShieldCheck size={18} className="text-[var(--brass)]" strokeWidth={1.6} />
                <span className="text-[var(--brass)] text-[12px] tracking-wide-2 uppercase">
                  ( {RERA.eyebrow} )
                </span>
              </div>
              <h2 className="font-serif-display text-[var(--ink)] tracking-tighter leading-[1.22] sm:leading-[1.15] text-[32px] sm:text-[34px] md:text-[44px] lg:text-[52px] font-light">
                {RERA.title}
              </h2>
              <p className="mt-5 text-[var(--muted)] text-[15px] font-light leading-relaxed max-w-md">
                {RERA.intro}
              </p>
              <a
                href={RERA.portal}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 inline-flex items-center gap-2 text-[var(--forest)] text-[12px] tracking-wide-2 uppercase hover-underline"
              >
                MahaRERA Portal <ExternalLink size={14} />
              </a>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {RERA.wings.map((w) => (
                <div key={w.number} className="bg-[var(--light-blue)] border border-[var(--line)] p-3 text-center">
                  <img src={w.image} alt={`${w.wing} MahaRERA QR code`} className="w-24 h-24 mx-auto mb-3 object-contain" />
                  <div className="text-[14px] tracking-wide-2 uppercase text-[var(--sage)] mb-2">
                    {w.wing}
                  </div>
                  <div className="font-serif-display text-[var(--forest)] text-[15] break-all">
                    {w.number}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Rera;
