import React from "react";
import { PHILOSOPHY } from "../mock";
import useReveal from "../hooks/useReveal";

const Row = ({ item, flip }) => {
  const { ref, inView } = useReveal();

  return (
    <div ref={ref} className={` reveal ${inView ? "in-view" : ""} grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center`}>
      {/* IMAGE */}
      <div className={`relative overflow-hidden ${flip ? "lg:order-2" : ""} `} >
        <div className={` image_animation ${inView ? "active" : ""} aspect-[4/3] `}>
          <img src={item.image} alt={item.title} />
        </div>
        {/* Number */}
        <span className=" absolute top-5 left-5 font-serif-display text-[var(--cream)] text-5xl opacity-90 pointer-events-none">
          {item.no}
        </span>
      </div>

      {/* CONTENT */}
      <div className={` ${flip ? "lg:order-1 lg:pr-10" : "lg:pl-10"} `}>
        <div className="flex items-center gap-3 mb-5">
          <span className="h-px w-8 bg-[var(--blue)]" />
          <span className=" text-[var(--blue)] text-[16px] tracking-wide-2 uppercase">
            {item.no} · {item.kicker}
          </span>
        </div>
        <h3 className=" font-serif-display text-[var(--ink)] tracking-tighter leading-[1.22] sm:leading-[1.15] text-[32px] sm:text-[34px] md:text-[44px] lg:text-[52px] font-light capitalize">
          {item.title}
        </h3>
        <p className=" mt-5 text-[var(--muted)] text-[15px] md:text-[24px] font-light leading-[1.4] max-w-lg">
          {item.body}
        </p>
      </div>
    </div>
  );
};

const Philosophy = () => {
  return (
    <section id="philosophy" className="py-10 md:py-15 bg-[var(--white)]">
      <div className="mx-auto max-w-[1360px] px-6 md:px-10">

        {/* INTRO */}
        <div className="max-w-2xl mb-10 md:mb-15">

          <div className="flex items-center gap-3 mb-6">
            <span className="h-px w-8 bg-[var(--brass)]" />

            <span
              className="
                text-[var(--brass)]
                text-[12px]
                tracking-wide-2
                uppercase
              "
            >
              ( {PHILOSOPHY.eyebrow} )
            </span>
          </div>

          <p
            className="
              font-serif-display
              tracking-tighter
              leading-[1.22]
              sm:leading-[1.15]
              text-[32px]
              sm:text-[34px]
              md:text-[44px]
              lg:text-[52px]
              font-light
            "
          >
            {PHILOSOPHY.intro}
          </p>

        </div>

        {/* ROWS */}
        <div className="space-y-10 md:space-y-18">

          {PHILOSOPHY.items.map((item, i) => (
            <Row
              key={item.no}
              item={item}
              flip={i % 2 === 1}
            />
          ))}

        </div>

      </div>
    </section>
  );
};

export default Philosophy;