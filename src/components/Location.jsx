import React from "react";
import { LOCATION } from "../mock";
import { MapPin } from "lucide-react";
import useReveal from "../hooks/useReveal";

const Location = () => {
  const { ref, inView } = useReveal();
  return (
    <section id="location" className="py-10 md:py-15 bg-[var(--light-blue)]">
      <div className="mx-auto max-w-[1360px] px-6 md:px-10">
        <div
          ref={ref}
          className={`reveal ${inView ? "in-view" : ""} grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center`}
        >
          <div>
            <div className="flex items-center gap-3 mb-6">
              <span className="h-px w-8 bg-[var(--brass)]" />
              <span className="text-[var(--brass)] text-[12px] tracking-wide-2 uppercase">
                ( {LOCATION.eyebrow} )
              </span>
            </div>
            <h2 className="font-serif-display text-[var(--ink)] tracking-tighter leading-[1.22] sm:leading-[1.15] text-[32px] sm:text-[34px] md:text-[44px] lg:text-[52px] font-light capitalize">
              {LOCATION.title}
            </h2>
            <p className="mt-5 text-[var(--muted)] text-[15px] md:text-[24px] font-light leading-[1.4] max-w-lg">
              {LOCATION.intro}
            </p>

            <ul className="mt-5">
              {LOCATION.points.map((p, i) => (
                <li
                  key={i}
                  className="flex items-center justify-between gap-4 border-t border-[var(--line)] py-4 last:border-b group"
                >
                  <span className="flex items-center gap-3 text-[var(--ink)] text-[15px] md:text-[20px] font-light leading-[1.4] font-light">
                    <img src={p.icon} alt="" className="h-10 w-10 object-contain shrink-0" />
                    {p.label}
                  </span>
                  <span className="font-serif-display text-[var(--forest)] text-[1.4rem] whitespace-nowrap">
                    {p.time}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          <div
  className={`circle_animation relative overflow-hidden aspect-[4/5] lg:aspect-[4/5] ${
    inView ? "active" : ""
  }`}
>
  <img
    src={LOCATION.image}
    alt="The BPGC golf course beside Balmoral"
    className="h-full w-full object-cover"
  />

  <div className="absolute inset-0 bg-gradient-to-t from-[var(--forest)]/40 to-transparent" />

  <div className="absolute bottom-6 left-6 right-6 text-black">
    <div className="text-[11px] tracking-wide-2 uppercase opacity-80">
      4.2-acre gated estate
    </div>

    <div className="font-serif-display text-[1.8rem] font-light">
      Chembur, Mumbai East
    </div>
  </div>
</div>
        </div>
      </div>
    </section>
  );
};

export default Location;
