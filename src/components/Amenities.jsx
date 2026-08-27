import React from "react";
import { AMENITIES } from "../mock";
import useReveal from "../hooks/useReveal";

const Card = ({ item, i }) => {
  const { ref, inView } = useReveal();
  const hasImage = Boolean(item.image);
  return (
    <div
      ref={ref}
      style={{ transitionDelay: `${(i % 3) * 90}ms` }}
      className={`reveal ${inView ? "in-view" : ""} border-1 border-white group relative overflow-hidden border border-[var(--line)] ${
        hasImage ? "text-[var(--cream)]" : "bg-[var(--cream-2)] text-[var(--ink)]"
      }`}
    >
      {hasImage && (
        <div className="absolute inset-0">
          <img
            src={item.image}
            alt={item.title}
            className="h-full w-full  transition-transform duration-[1600ms] ease-out group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[var(--forest)]/85 via-[var(--forest)]/25 to-transparent" />
        </div>
      )}
      <div className="relative overlay z-10 p-3 md:p-3 h-[300px] md:h-[340px] flex flex-col justify-between">
        <span
          className={`font-serif-display text-4xl ${
            hasImage ? "text-[var(--cream)]" : "text-[var(--cream)]"
          }`}
        >
          {item.no}
        </span>
        <div>
          <h3 className="font-serif-display text-[1.6rem] md:text-[1.6rem] font-light leading-tight">
            {item.title}
          </h3>
          <p
            className={`mt-3 text-[18px] font-light leading-[1.4] ${
              hasImage ? "text-[var(--cream)]/80" : "text-[var(--muted)]"
            }`}
          >
            {item.body}
          </p>
        </div>
      </div>
    </div>
  );
};

const Amenities = () => {
  return (
    <section id="amenities" className="py-10 md:py-15 bg-[var(--light-blue)] text-[var(--black)]">
      <div className="mx-auto max-w-[1360px] px-6 md:px-10">
        <div className="max-w-2xl mb-10 md:mb-15">
          <div className="flex items-center gap-3 mb-6">
            <span className="h-px w-8 bg-[var(--brass)]" />
            <span className="text-[var(--brass)] text-[12px] tracking-wide-2 uppercase">
              ( {AMENITIES.eyebrow} )
            </span>
          </div>
          <h2 className="font-serif-display text-[var(--black)] tracking-tighter leading-[1.22] sm:leading-[1.15] text-[32px] sm:text-[34px] md:text-[44px] lg:text-[52px] font-light capitalize">
            {AMENITIES.title}
          </h2>
          <p className="mt-5 text-[var(--black)] text-[15px] md:text-[24px] font-light leading-[1.4]">
            {AMENITIES.intro}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {AMENITIES.items.map((item, i) => (
            <Card key={item.no} item={item} i={i} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Amenities;
