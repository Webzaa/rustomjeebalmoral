import React from "react";
import { PORTFOLIO } from "../mock";
import useReveal from "../hooks/useReveal";

const Tile = ({ img, i }) => {
  const { ref, inView } = useReveal();

  const spanClass =
    img.span === "tall"
      ? "md:row-span-2 aspect-[3/4] md:aspect-auto"
      : img.span === "wide"
      ? "md:col-span-2 aspect-[16/10] md:aspect-[2/1]"
      : "aspect-[4/3]";

  return (
    <figure
      ref={ref}
      style={{
        transitionDelay: `${(i % 3) * 90}ms`,
      }}
      className={`
        reveal
        ${inView ? "in-view" : ""}
        relative
        overflow-hidden
        group
        ${spanClass}
      `}
    >
      {/* =========================
          IMAGE
      ========================== */}
      <div
        className={`
          image_animation
          ${inView ? "active" : ""}
          h-full
          w-full
        `}
      >
        <img
          src={img.src}
          alt={img.alt}
          className="
            h-full
            w-full
            object-cover
          "
        />
      </div>

      {/* =========================
          HOVER OVERLAY
      ========================== */}
      <div
        className="
          absolute
          inset-0
          bg-[var(--forest)]/0
          group-hover:bg-[var(--forest)]/20
          transition-colors
          duration-700
          pointer-events-none
        "
      />

      {/* =========================
          CAPTION
      ========================== */}
      <figcaption
        className="
          absolute
          bottom-1
          left-0
          right-0
          p-6
          translate-y-0
          opacity-1
          group-hover:translate-y-0
          group-hover:opacity-100
          transition-all
          duration-700
        "
      >
        <span
          className="
            text-white
            text-[11px]
            tracking-wide-2
            uppercase
          "
        >
          {img.alt}
        </span>
      </figcaption>
    </figure>
  );
};

const Portfolio = () => {
  return (
    <section id="Portfolio" className="py-10 md:py-15 bg-[var(--white)]">
      <div className="mx-auto max-w-[1360px] px-6 md:px-10">

        {/* =========================
            HEADER
        ========================== */}
        <div
          className="
            flex
            flex-col
            md:flex-row
            md:items-end
            justify-between
            gap-6
            mb-10
            md:mb-15
          "
        >
          <div className="max-w-xl">

            {/* Eyebrow */}
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
                ( {PORTFOLIO.eyebrow} )
              </span>
            </div>

            {/* Title */}
            <h2
              className="
                font-serif-display
                text-[var(--ink)]
                tracking-tighter
                leading-[1.22]
                sm:leading-[1.15]
                text-[32px]
                sm:text-[34px]
                md:text-[44px]
                lg:text-[52px]
                font-light
                capitalize
              "
            >
              {PORTFOLIO.title}
            </h2>

          </div>

          {/* Intro */}
          <p
            className="
              text-[var(--muted)]
              text-[15px]
              md:text-[24px]
              font-light
              leading-[1.4]
              max-w-sm
            "
          >
            {PORTFOLIO.intro}
          </p>
        </div>


        {/* =========================
            PORTFOLIO GRID
        ========================== */}
        <div
          className="
            grid
            grid-cols-1
            md:grid-cols-3
            gap-4
            md:gap-5
            md:auto-rows-[1fr]
          "
        >
          {PORTFOLIO.images.map((img, i) => (
            <Tile
              key={i}
              img={img}
              i={i}
            />
          ))}
        </div>

      </div>
    </section>
  );
};

export default Portfolio;