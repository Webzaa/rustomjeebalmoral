import React, { useEffect, useRef, useState } from "react";
import { PHILOSOPHY } from "../mock";
import useReveal from "../hooks/useReveal";
import { ChevronLeft, ChevronRight } from "lucide-react";


/* =========================================================
   DESKTOP ROW
========================================================= */

const Row = ({ item, flip }) => {
  const { ref, inView } = useReveal();

  return (
    <div
      ref={ref}
      className={`
        reveal
        ${inView ? "in-view" : ""}
        grid
        grid-cols-1
        lg:grid-cols-2
        gap-8
        lg:gap-16
        items-center
      `}
    >
      {/* IMAGE */}

      <div
        className={`
          relative
          overflow-hidden
          ${flip ? "lg:order-2" : ""}
        `}
      >
        <div
          className="
            aspect-[4/3]
            overflow-hidden
            parallax-layer
          "
          data-parallax
          data-parallax-speed="0.10"
        >
          <img
            src={item.image}
            alt={item.title}
            className="
              h-full
              w-full
              object-cover
              transition-transform
              duration-[1600ms]
              ease-out
              hover:scale-105
            "
          />
          
        </div>
          <span className=" absolute bottom-5 right-5 font-serif-display text-[10px] text-[var(--cream)] opacity-90">{item.imagedisclaimer}</span>
        <span
          className="
            absolute
            top-5
            left-5
            font-serif-display
            text-5xl
            text-[var(--cream)]
            opacity-90
          "
        >
          {item.no}
        </span>
      </div>


      {/* CONTENT */}

      <div
        className={
          flip
            ? "lg:order-1 lg:pr-10"
            : "lg:pl-10"
        }
      >
        <div
          className="
            flex
            items-center
            gap-3
            mb-5
          "
        >
          <span
            className="
              h-px
              w-8
              bg-[var(--brass)]
            "
          />

          <span
            className="
              text-[var(--brass)]
              text-[11px]
              tracking-wide-2
              uppercase
            "
          >
            {item.no} · {item.kicker}
          </span>
        </div>

        <h3
          className="
            font-serif-display
            text-[var(--ink)]
            text-[2rem]
            md:text-[2.6rem]
            leading-[1.05]
            font-light
          "
        >
          {item.title}
        </h3>

        <p
          className="
            mt-5
            max-w-lg
            text-[var(--muted)]
            text-[15px]
            md:text-[16px]
            font-light
            leading-relaxed
          "
        >
          {item.body}
        </p>
      </div>
    </div>
  );
};


/* =========================================================
   MOBILE OVERVIEW
========================================================= */

const MobileOverview = () => {
  const items = PHILOSOPHY?.items || [];

  const [active, setActive] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(true);

  const trackRef = useRef(null);

  const touchStartX = useRef(0);
  const touchEndX = useRef(0);


  /* =======================================================
     INFINITE SLIDES
     
     Example:

     04 | 01 | 02 | 03 | 04 | 01
          ↑
        REAL 01
  ======================================================= */

  const slides =
    items.length > 1
      ? [
          items[items.length - 1],
          ...items,
          items[0],
        ]
      : items;


  const currentPosition =
    items.length > 1
      ? active + 1
      : 0;


  /* =======================================================
     MOVE SLIDER
  ======================================================= */

  const moveTo = (
    position,
    smooth = true
  ) => {
    if (!trackRef.current) {
      return;
    }

    setIsTransitioning(smooth);

    trackRef.current.style.transform =
      `translate3d(-${position * 100}%, 0, 0)`;
  };


  /* =======================================================
     INITIAL POSITION
     
     IMPORTANT:
     This hook is BEFORE the empty-state return.
  ======================================================= */

  useEffect(() => {
    if (items.length <= 1) {
      return;
    }

    moveTo(1, false);
  }, [items.length]);


  /* =======================================================
     INFINITE LOOP RESET
  ======================================================= */

  useEffect(() => {
    if (items.length <= 1) {
      return;
    }

    const track = trackRef.current;

    if (!track) {
      return;
    }

    const handleTransitionEnd = () => {
      /*
       * LAST → CLONED FIRST
       *
       * 04 | 01 | 02 | 03 | 04 | 01
       *                          ↑
       *
       * Reset silently to REAL 01.
       */

      if (
        active === 0 &&
        currentPosition === items.length + 1
      ) {
        setIsTransitioning(false);

        requestAnimationFrame(() => {
          moveTo(1, false);
        });

        return;
      }


      /*
       * FIRST → CLONED LAST
       *
       * 04 | 01 | 02 | 03 | 04 | 01
       *  ↑
       *
       * Reset silently to REAL LAST.
       */

      if (
        active === items.length - 1 &&
        currentPosition === 0
      ) {
        setIsTransitioning(false);

        requestAnimationFrame(() => {
          moveTo(items.length, false);
        });
      }
    };

    track.addEventListener(
      "transitionend",
      handleTransitionEnd
    );

    return () => {
      track.removeEventListener(
        "transitionend",
        handleTransitionEnd
      );
    };
  }, [
    active,
    currentPosition,
    items.length,
  ]);


  /* =======================================================
     NEXT
     
     01 → 02 → 03 → 04 → 01
  ======================================================= */

  const next = () => {
    if (items.length <= 1) {
      return;
    }

    const nextIndex =
      active + 1 >= items.length
        ? 0
        : active + 1;

    setActive(nextIndex);

    moveTo(
      currentPosition + 1,
      true
    );
  };


  /* =======================================================
     PREVIOUS
     
     01 ← 04 ← 03 ← 02 ← 01
  ======================================================= */

  const previous = () => {
    if (items.length <= 1) {
      return;
    }

    const previousIndex =
      active - 1 < 0
        ? items.length - 1
        : active - 1;

    setActive(previousIndex);

    moveTo(
      currentPosition - 1,
      true
    );
  };


  /* =======================================================
     TOUCH START
  ======================================================= */

  const handleTouchStart = (event) => {
    touchStartX.current =
      event.touches[0].clientX;

    touchEndX.current =
      event.touches[0].clientX;
  };


  /* =======================================================
     TOUCH MOVE
  ======================================================= */

  const handleTouchMove = (event) => {
    touchEndX.current =
      event.touches[0].clientX;
  };


  /* =======================================================
     TOUCH END
     
     Swipe LEFT  → NEXT
     Swipe RIGHT → PREVIOUS
  ======================================================= */

  const handleTouchEnd = () => {
    const distance =
      touchStartX.current -
      touchEndX.current;

    /*
     * Ignore taps / very small movement.
     */

    if (Math.abs(distance) < 40) {
      return;
    }

    if (distance > 0) {
      next();
    } else {
      previous();
    }
  };


  /* =======================================================
     DOT NAVIGATION
  ======================================================= */

  const goTo = (index) => {
    if (
      index < 0 ||
      index >= items.length
    ) {
      return;
    }

    setActive(index);

    moveTo(
      index + 1,
      true
    );
  };


  /* =======================================================
     EMPTY STATE
     
     ALL HOOKS ARE ABOVE THIS.
     This is now safe for React Hooks.
  ======================================================= */

  if (!items.length) {
    return null;
  }


  /* =======================================================
     RENDER
  ======================================================= */

  return (
    <div className="lg:hidden">

      {/* =================================================
          IMAGE SLIDER
      ================================================= */}

      <div
        className="
          relative
          overflow-hidden
          select-none
          touch-pan-y
        "
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >

        <div
          ref={trackRef}
          className={`
            flex
            w-full

            ${
              isTransitioning
                ? `
                  transition-transform
                  duration-700
                  ease-[cubic-bezier(0.16,1,0.3,1)]
                `
                : ""
            }
          `}
        >

          {slides.map(
            (slide, index) => (
              <div
                key={`${slide.no}-${index}`}
                className="
                  relative
                  w-full
                  shrink-0
                "
              >

                <div
                  className="
                    aspect-[4/3]
                    overflow-hidden
                    parallax-layer
                  "
                  data-parallax
                  data-parallax-speed="0.08"
                >

                  <img
                    src={slide.image}
                    alt={slide.title}
                    className="
                      h-full
                      w-full
                      object-cover
                    "
                    draggable="false"
                  />

                </div>


                <span
                  className="
                    absolute
                    top-5
                    left-5
                    font-serif-display
                    text-5xl
                    text-[var(--cream)]
                    opacity-90
                  "
                >
                  {slide.no}
                </span>

              </div>
            )
          )}

        </div>

      </div>


      {/* =================================================
          CONTENT
      ================================================= */}

      <div
        key={items[active].no}
        className="
          mt-8
          animate-[fadeIn_500ms_ease-out]
        "
      >

        <div
          className="
            flex
            items-center
            gap-3
            mb-5
          "
        >

          <span
            className="
              h-px
              w-8
              bg-[var(--brass)]
            "
          />

          <span
            className="
              text-[var(--brass)]
              text-[11px]
              tracking-wide-2
              uppercase
            "
          >
            {items[active].no} ·{" "}
            {items[active].kicker}
          </span>

        </div>


        <h3
          className="
            font-serif-display
            text-[var(--ink)]
            text-[2rem]
            leading-[1.05]
            font-light
          "
        >
          {items[active].title}
        </h3>


        <p
          className="
            mt-5
            text-[var(--muted)]
            text-[15px]
            font-light
            leading-relaxed
          "
        >
          {items[active].body}
        </p>

      </div>


      {/* =================================================
          CONTROLS
      ================================================= */}

      <div
        className="
          mt-8
          flex
          items-center
          justify-between
        "
      >

        {/* DOTS */}

        <div
          className="
            flex
            items-center
            gap-2
          "
          aria-label="Overview slides"
        >

          {items.map(
            (item, index) => (
              <button
                key={item.no}
                type="button"
                onClick={() =>
                  goTo(index)
                }
                aria-label={`Go to overview slide ${
                  index + 1
                }`}
                aria-current={
                  active === index
                    ? "true"
                    : undefined
                }
                className={`
                  h-1.5
                  transition-all
                  duration-500

                  ${
                    active === index
                      ? "w-8 bg-[var(--forest)]"
                      : "w-2 bg-[var(--line)]"
                  }
                `}
              />
            )
          )}

        </div>


        {/* ARROWS */}

        <div
          className="
            flex
            items-center
            gap-2
          "
        >

          <button
            type="button"
            onClick={previous}
            className="
              flex
              h-10
              w-10
              items-center
              justify-center
              border
              border-[var(--line)]
              transition-colors
              duration-300
              hover:bg-[var(--forest)]
              hover:text-white
            "
            aria-label="Previous overview slide"
          >
            <ChevronLeft size={17} />
          </button>


          <button
            type="button"
            onClick={next}
            className="
              flex
              h-10
              w-10
              items-center
              justify-center
              border
              border-[var(--line)]
              transition-colors
              duration-300
              hover:bg-[var(--forest)]
              hover:text-white
            "
            aria-label="Next overview slide"
          >
            <ChevronRight size={17} />
          </button>

        </div>

      </div>

    </div>
  );
};


/* =========================================================
   PHILOSOPHY SECTION
========================================================= */

const Philosophy = () => {
  return (
    <section
      id="philosophy"
      className="
        py-20
        md:py-32
        bg-[var(--cream)]
      "
    >

      <div
        className="
          mx-auto
          max-w-[1360px]
          px-6
          md:px-10
        "
      >

        {/* =================================================
            SECTION INTRO
        ================================================= */}

        <div
          className="
            max-w-2xl
            mb-14
            md:mb-24
          "
        >

          <div
            className="
              flex
              items-center
              gap-3
              mb-6
            "
          >

            <span
              className="
                h-px
                w-8
                bg-[var(--brass)]
              "
            />

            <span
              className="
                text-[var(--brass)]
                text-[11px]
                tracking-wide-2
                uppercase
              "
            >
              (
              {" "}
              {PHILOSOPHY.eyebrow}
              {" "}
              )
            </span>

          </div>


          <p
            className="
              font-serif-display
              text-[var(--ink)]
              text-[1.9rem]
              md:text-[2.6rem]
              leading-[1.15]
              font-light
            "
          >
            {PHILOSOPHY.intro}
          </p>

        </div>


        {/* =================================================
            MOBILE
        ================================================= */}

        <MobileOverview />


        {/* =================================================
            DESKTOP
        ================================================= */}

        <div
          className="
            hidden
            lg:block
            space-y-20
            md:space-y-28
          "
        >

          {PHILOSOPHY.items.map(
            (item, index) => (
              <Row
                key={item.no}
                item={item}
                flip={
                  index % 2 === 1
                }
              />
            )
          )}

        </div>

      </div>

    </section>
  );
};


export default Philosophy;