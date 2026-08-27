import React from "react";
import { MARQUEE } from "../mock";

const Marquee = () => {
  const items = [...MARQUEE, ...MARQUEE];
  return (
    <section className="bg-[var(--forest)] py-8 md:py-10 overflow-hidden select-none">
      <div className="flex whitespace-nowrap w-max animate-marquee">
        {items.map((word, i) => (
          <div key={i} className="flex items-center">
            <span className="font-serif-display italic text-[var(--cream)] text-[1.7rem] md:text-[2.4rem] font-light px-8">
              {word}
            </span>
            <span className="text-[var(--brass-2)] text-[1.2rem]">✦</span>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Marquee;
