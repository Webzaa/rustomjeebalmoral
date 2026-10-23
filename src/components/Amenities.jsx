import React, {
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";

import { AMENITIES } from "../mock";
import useReveal from "../hooks/useReveal";

import {
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

/* =========================================================
   AI DISCLAIMER
========================================================= */

const AiDisclaimer = () => {
  return (
    <span
      className="
        absolute
        right-4
        bottom-4
        z-30
        whitespace-nowrap
        font-serif-display
        text-[10px]
        italic
        leading-none
        text-white/90
        drop-shadow-[0_1px_4px_rgba(0,0,0,0.9)]
        sm:right-5
        sm:bottom-5
        sm:text-[11px]
        md:text-[12px]
      "
    >
      AI Generated | Representational Image
    </span>
  );
};

/* =========================================================
   AMENITY CARD
========================================================= */

const Card = ({ item, index }) => {
  const { ref, inView } = useReveal();

  const hasImage = Boolean(item?.image);

  return (
    <article
      ref={ref}
      style={{
        transitionDelay: `${(index % 3) * 90}ms`,
      }}
      className={`
        reveal
        ${inView ? "in-view" : ""}
        group
        relative
        min-w-0
        overflow-hidden
        border
        border-[var(--line)]
        ${
          hasImage
            ? "bg-[var(--forest)] text-white"
            : "bg-[var(--cream-2)] text-[var(--ink)]"
        }
      `}
    >
      {/* ===================================================
          IMAGE
      =================================================== */}

      {hasImage && (
        <div
          className="
            absolute
            inset-[-5%]
            parallax-layer
          "
          data-parallax
          data-parallax-speed="0.08"
        >
          <img
            src={item.image}
            alt={item.title}
            loading={index < 3 ? "eager" : "lazy"}
            decoding="async"
            draggable="false"
            className="
              h-full
              w-full
              object-cover
              transition-transform
              duration-[1400ms]
              ease-out
              group-hover:scale-[1.05]
            "
          />

          <div
            className="
              absolute
              inset-0
              bg-gradient-to-t
              from-black/90
              via-black/20
              to-transparent
            "
          />
        </div>
      )}

      {/* ===================================================
          CARD CONTENT
      =================================================== */}

      <div
        className="
          relative
          z-10
          flex
          min-h-[350px]
          flex-col
          justify-between
          p-6
          pb-16

          sm:min-h-[370px]
          sm:p-7
          sm:pb-16

          md:min-h-[390px]
          md:p-7
          md:pb-16

          lg:min-h-[400px]
        "
      >
        {/* Number */}

        <div>
          <span
            className={`
              font-serif-display
              text-[3rem]
              font-light
              leading-none
              md:text-[3.2rem]

              ${
                hasImage
                  ? "text-[var(--brass-2)]"
                  : "text-[var(--brass)]"
              }
            `}
          >
            {item.no}
          </span>
        </div>

        {/* Content */}

        <div className="max-w-[94%]">
          <h3
            className={`
              font-serif-display
              text-[1.65rem]
              font-light
              leading-[1.05]

              sm:text-[1.75rem]
              md:text-[1.9rem]

              ${
                hasImage
                  ? "text-white"
                  : "text-[var(--ink)]"
              }
            `}
          >
            {item.title}
          </h3>

          <p
            className={`
              mt-3
              max-w-xl
              text-[13px]
              font-light
              leading-[1.5]

              sm:text-[14px]
              md:text-[15px]

              ${
                hasImage
                  ? "text-white/85"
                  : "text-[var(--muted)]"
              }
            `}
          >
            {item.body}
          </p>
        </div>
      </div>

      {/* ===================================================
          AI DISCLAIMER
      =================================================== */}

      {hasImage && item.aiGenerated && (
        <AiDisclaimer />
      )}
    </article>
  );
};

/* =========================================================
   AMENITIES
========================================================= */

const Amenities = () => {
  const items = AMENITIES?.items || [];

  /* =======================================================
     REFS
  ======================================================= */

  const sectionRef = useRef(null);
  const trackRef = useRef(null);

  const autoplayTimerRef = useRef(null);
  const resetTimerRef = useRef(null);
  const scrollTimerRef = useRef(null);

  const isVisibleRef = useRef(false);
  const isJumpingRef = useRef(false);

  /* =======================================================
     STATE

     active is ALWAYS the real item index.

     0 = 01
     1 = 02
     2 = 03
     3 = 04
     4 = 05
     5 = 06
  ======================================================= */

  const [active, setActive] = useState(0);

  /* =======================================================
     MOBILE CLONED ITEMS

     [06] [01] [02] [03] [04] [05] [06] [01]
       ↑
       clone

     Real items:
              01  02  03  04  05  06

     This gives us an infinite carousel.
  ======================================================= */

  const mobileItems =
    items.length > 1
      ? [
          items[items.length - 1],
          ...items,
          items[0],
        ]
      : items;

  /* =======================================================
     GET SLIDE POSITION
  ======================================================= */

  const getSlideLeft = useCallback((index) => {
    const track = trackRef.current;

    if (
      !track ||
      !track.children[index]
    ) {
      return 0;
    }

    return track.children[index].offsetLeft;
  }, []);

  /* =======================================================
     MOVE TO SLIDE
  ======================================================= */

  const moveTo = useCallback(
    (index, smooth = true) => {
      const track = trackRef.current;

      if (
        !track ||
        items.length <= 1 ||
        !track.children[index]
      ) {
        return;
      }

      const left = getSlideLeft(index);

      track.scrollTo({
        left,
        behavior: smooth
          ? "smooth"
          : "auto",
      });
    },
    [
      getSlideLeft,
      items.length,
    ]
  );

  /* =======================================================
     NEXT

     01 → 02
     02 → 03
     03 → 04
     04 → 05
     05 → 06
     06 → 01
  ======================================================= */

  const next = useCallback(() => {
    if (
      items.length <= 1 ||
      isJumpingRef.current
    ) {
      return;
    }

    setActive((current) => {
      const nextIndex = current + 1;

      /* =================================================
         NORMAL
      ================================================= */

      if (
        nextIndex < items.length
      ) {
        moveTo(
          nextIndex + 1,
          true
        );

        return nextIndex;
      }

      /* =================================================
         06 → CLONED 01

         Move visually to cloned 01 first.
      ================================================= */

      isJumpingRef.current = true;

      moveTo(
        items.length + 1,
        true
      );

      window.clearTimeout(
        resetTimerRef.current
      );

      resetTimerRef.current =
        window.setTimeout(() => {
          /*
           * Silently move:
           *
           * cloned 01
           *      ↓
           * real 01
           */

          moveTo(1, false);

          isJumpingRef.current = false;
        }, 650);

      return 0;
    });
  }, [
    items.length,
    moveTo,
  ]);

  /* =======================================================
     PREVIOUS

     01 ← 02
     02 ← 03
     03 ← 04
     04 ← 05
     05 ← 06
     06 ← 01
  ======================================================= */

  const previous = useCallback(() => {
    if (
      items.length <= 1 ||
      isJumpingRef.current
    ) {
      return;
    }

    setActive((current) => {
      const previousIndex =
        current - 1;

      /* =================================================
         NORMAL
      ================================================= */

      if (
        previousIndex >= 0
      ) {
        moveTo(
          previousIndex + 1,
          true
        );

        return previousIndex;
      }

      /* =================================================
         01 → CLONED 06
      ================================================= */

      isJumpingRef.current = true;

      moveTo(0, true);

      window.clearTimeout(
        resetTimerRef.current
      );

      resetTimerRef.current =
        window.setTimeout(() => {
          /*
           * Silently move:
           *
           * cloned 06
           *      ↓
           * real 06
           */

          moveTo(
            items.length,
            false
          );

          isJumpingRef.current = false;
        }, 650);

      return items.length - 1;
    });
  }, [
    items.length,
    moveTo,
  ]);

  /* =======================================================
     INITIAL MOBILE POSITION
     
     Start on REAL 01.

     Because slide 0 is cloned 06,
     real 01 is slide 1.
  ======================================================= */

  useEffect(() => {
    if (items.length <= 1) {
      return undefined;
    }

    const timer =
      window.setTimeout(() => {
        moveTo(1, false);
      }, 100);

    return () => {
      window.clearTimeout(timer);
    };
  }, [
    items.length,
    moveTo,
  ]);

  /* =======================================================
     DOT NAVIGATION
  ======================================================= */

  const goTo = useCallback(
    (index) => {
      if (
        items.length <= 1 ||
        isJumpingRef.current ||
        index === active
      ) {
        return;
      }

      setActive(index);

      moveTo(
        index + 1,
        true
      );
    },
    [
      active,
      items.length,
      moveTo,
    ]
  );

  /* =======================================================
     AUTOPLAY

     IMPORTANT:

     The timer DOES NOT start when the
     component/page loads.

     It starts ONLY when the Amenities
     section enters the viewport.

     Sequence:

     ENTER
       ↓
     01
       ↓
     WAIT 10 SEC
       ↓
     02
       ↓
     WAIT 10 SEC
       ↓
     03
       ↓
     ...
       ↓
     06
       ↓
     WAIT 10 SEC
       ↓
     01
  ======================================================= */

  useEffect(() => {
    if (items.length <= 1) {
      return undefined;
    }

    const section =
      sectionRef.current;

    if (!section) {
      return undefined;
    }

    /* =====================================================
       CLEAR AUTOPLAY
    ===================================================== */

    const clearAutoplay = () => {
      if (
        autoplayTimerRef.current !==
        null
      ) {
        window.clearTimeout(
          autoplayTimerRef.current
        );

        autoplayTimerRef.current = null;
      }
    };

    /* =====================================================
       SCHEDULE NEXT SLIDE

       Uses setTimeout instead of setInterval.

       This guarantees that every slide gets
       a fresh FULL 10-second period.
    ===================================================== */

    const scheduleNext = () => {
      clearAutoplay();

      /*
       * Desktop:
       * No autoplay.
       */

      if (
        window.innerWidth >= 1024
      ) {
        return;
      }

      /*
       * Section must be visible.
       */

      if (
        !isVisibleRef.current
      ) {
        return;
      }

      /*
       * Browser tab must be active.
       */

      if (document.hidden) {
        return;
      }

      /*
       * FULL 10 SECOND WAIT
       */

      autoplayTimerRef.current =
        window.setTimeout(() => {
          /*
           * Re-check everything
           * before changing slide.
           */

          if (
            !isVisibleRef.current ||
            document.hidden ||
            window.innerWidth >= 1024 ||
            isJumpingRef.current
          ) {
            return;
          }

          /*
           * Move to next amenity.
           */

          next();

          /*
           * Start a BRAND NEW
           * 10-second countdown.
           */

          scheduleNext();

        }, 10000);
    };

    /* =====================================================
       INTERSECTION OBSERVER

       Autoplay begins when the user actually
       reaches the Amenities section.
    ===================================================== */

    const observer =
      new IntersectionObserver(
        ([entry]) => {
          if (
            entry.isIntersecting
          ) {
            /*
             * Section entered viewport.
             */

            isVisibleRef.current =
              true;

            /*
             * Start fresh 10-second timer.
             *
             * 01 remains visible.
             */

            scheduleNext();

          } else {
            /*
             * Section left viewport.
             */

            isVisibleRef.current =
              false;

            clearAutoplay();
          }
        },
        {
          threshold: 0.25,
        }
      );

    observer.observe(section);

    /* =====================================================
       BROWSER TAB VISIBILITY

       If user switches tabs:

       pause timer

       When they return:

       start fresh 10-second countdown.
    ===================================================== */

    const handleVisibilityChange =
      () => {
        if (document.hidden) {
          clearAutoplay();

          return;
        }

        if (
          isVisibleRef.current
        ) {
          scheduleNext();
        }
      };

    document.addEventListener(
      "visibilitychange",
      handleVisibilityChange
    );

    /* =====================================================
       RESPONSIVE RESIZE
    ===================================================== */

    const handleResize = () => {
      /*
       * Desktop:
       * stop autoplay.
       */

      if (
        window.innerWidth >= 1024
      ) {
        clearAutoplay();

        return;
      }

      /*
       * Mobile/tablet:
       * restart timer if section
       * is visible.
       */

      if (
        isVisibleRef.current
      ) {
        scheduleNext();
      }
    };

    window.addEventListener(
      "resize",
      handleResize
    );

    /* =====================================================
       CLEANUP
    ===================================================== */

    return () => {
      clearAutoplay();

      observer.disconnect();

      document.removeEventListener(
        "visibilitychange",
        handleVisibilityChange
      );

      window.removeEventListener(
        "resize",
        handleResize
      );
    };
  }, [
    items.length,
    next,
  ]);

  /* =======================================================
     MOBILE SCROLL DETECTION

     Supports manual swipe:

     01 → swipe → 02

     06 → swipe → cloned 01
              ↓
           real 01
  ======================================================= */

  useEffect(() => {
    const track =
      trackRef.current;

    if (
      !track ||
      items.length <= 1
    ) {
      return undefined;
    }

    const handleScroll = () => {
      /*
       * Ignore our own infinite-loop
       * correction.
       */

      if (
        isJumpingRef.current
      ) {
        return;
      }

      window.clearTimeout(
        scrollTimerRef.current
      );

      scrollTimerRef.current =
        window.setTimeout(() => {
          /*
           * Desktop doesn't use this.
           */

          if (
            window.innerWidth >= 1024
          ) {
            return;
          }

          const slides =
            Array.from(
              track.children
            );

          if (
            !slides.length
          ) {
            return;
          }

          const currentScroll =
            track.scrollLeft;

          let closestIndex = 0;

          let closestDistance =
            Infinity;

          slides.forEach(
            (
              slide,
              index
            ) => {
              const distance =
                Math.abs(
                  slide.offsetLeft -
                    currentScroll
                );

              if (
                distance <
                closestDistance
              ) {
                closestDistance =
                  distance;

                closestIndex =
                  index;
              }
            }
          );

          /* =============================================
             CLONED FIRST

             cloned 01
                  ↓
             real 01
          ============================================= */

          if (
            closestIndex ===
            items.length + 1
          ) {
            isJumpingRef.current =
              true;

            setActive(0);

            moveTo(
              1,
              false
            );

            window.setTimeout(() => {
              isJumpingRef.current =
                false;
            }, 80);

            return;
          }

          /* =============================================
             CLONED LAST

             cloned 06
                  ↓
             real 06
          ============================================= */

          if (
            closestIndex === 0
          ) {
            isJumpingRef.current =
              true;

            setActive(
              items.length - 1
            );

            moveTo(
              items.length,
              false
            );

            window.setTimeout(() => {
              isJumpingRef.current =
                false;
            }, 80);

            return;
          }

          /* =============================================
             NORMAL SLIDE
          ============================================= */

          const realIndex =
            closestIndex - 1;

          if (
            realIndex >= 0 &&
            realIndex < items.length
          ) {
            setActive(
              realIndex
            );

            /*
             * IMPORTANT:
             *
             * Manual swipe should restart
             * the 10-second autoplay cycle.
             *
             * We don't directly call the timer
             * here because the IntersectionObserver
             * owns the timer lifecycle.
             */
          }
        }, 100);
    };

    track.addEventListener(
      "scroll",
      handleScroll,
      {
        passive: true,
      }
    );

    return () => {
      track.removeEventListener(
        "scroll",
        handleScroll
      );

      window.clearTimeout(
        scrollTimerRef.current
      );
    };
  }, [
    items.length,
    moveTo,
  ]);

  /* =======================================================
     CLEANUP
  ======================================================= */

  useEffect(() => {
    return () => {
      window.clearTimeout(
        autoplayTimerRef.current
      );

      window.clearTimeout(
        resetTimerRef.current
      );

      window.clearTimeout(
        scrollTimerRef.current
      );
    };
  }, []);

  /* =======================================================
     EMPTY STATE

     IMPORTANT:
     This comes AFTER all hooks.
  ======================================================= */

  if (!items.length) {
    return null;
  }

  /* =======================================================
     RENDER
  ======================================================= */

  return (
    <section
      ref={sectionRef}
      id="amenities"
      className="
        bg-[var(--cream)]
        py-16
        sm:py-20
        md:py-24
        lg:py-28
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
            INTRO
        ================================================= */}

        <div
          className="
            mb-10
            max-w-3xl

            sm:mb-12

            md:mb-14

            lg:mb-16
          "
        >
          <div
            className="
              mb-5
              flex
              items-center
              gap-3
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
                text-[10px]
                uppercase
                tracking-[0.25em]
                text-[var(--brass)]
                md:text-[11px]
              "
            >
              ( {AMENITIES.eyebrow} )
            </span>
          </div>

          <h2
            className="
              font-serif-display
              text-[2.2rem]
              font-light
              leading-[1.05]
              text-[var(--ink)]

              sm:text-[2.5rem]

              md:text-[3rem]

              lg:text-[3.2rem]
            "
          >
            {AMENITIES.title}
          </h2>

          <p
            className="
              mt-4
              max-w-2xl
              text-[14px]
              font-light
              leading-relaxed
              text-[var(--muted)]

              md:text-[15px]
            "
          >
            {AMENITIES.intro}
          </p>
        </div>

        {/* =================================================
            MOBILE SLIDER

            Structure:

            06 | 01 | 02 | 03 | 04 | 05 | 06 | 01

            Start position = real 01
        ================================================= */}

        <div
          ref={trackRef}
          className="
            flex
            gap-3
            overflow-x-auto
            overscroll-x-contain
            snap-x
            snap-mandatory
            scrollbar-hide
            pb-1

            sm:gap-4

            lg:hidden
          "
          style={{
            scrollBehavior: "smooth",
            WebkitOverflowScrolling:
              "touch",
            touchAction:
              "pan-x",
          }}
        >
          {mobileItems.map(
            (item, index) => (
              <div
                key={`${item.no}-mobile-${index}`}
                className="
                  w-[84vw]
                  shrink-0
                  snap-center

                  sm:w-[62vw]

                  md:w-[48vw]
                "
              >
                <Card
                  item={item}
                  index={index}
                />
              </div>
            )
          )}
        </div>

        {/* =================================================
            DESKTOP GRID

            01 | 02 | 03
            04 | 05 | 06

            No slider.
            No autoplay.
        ================================================= */}

        <div
          className="
            hidden
            lg:grid
            lg:grid-cols-3
            lg:gap-4
          "
        >
          {items.map(
            (item, index) => (
              <div
                key={`${item.no}-desktop`}
                className="w-auto"
              >
                <Card
                  item={item}
                  index={index}
                />
              </div>
            )
          )}
        </div>

        {/* =================================================
            MOBILE CONTROLS
        ================================================= */}

        <div
          className="
            mt-6
            flex
            items-center
            justify-between
            lg:hidden
          "
        >
          {/* =================================================
              DOTS
          ================================================= */}

          <div
            className="
              flex
              items-center
              gap-2
            "
          >
            {items.map(
              (item, index) => (
                <button
                  key={item.no}
                  type="button"
                  onClick={() =>
                    goTo(index)
                  }
                  aria-label={`Show amenity ${
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

          {/* =================================================
              ARROWS
          ================================================= */}

          <div className="flex gap-2">
            <button
              type="button"
              onClick={previous}
              aria-label="Previous amenity"
              className="
                flex
                h-9
                w-9
                items-center
                justify-center
                border
                border-[var(--line)]
                bg-transparent
                text-[var(--ink)]
                transition-all
                duration-300

                hover:bg-[var(--forest)]
                hover:text-white

                md:h-10
                md:w-10
              "
            >
              <ChevronLeft
                size={16}
              />
            </button>

            <button
              type="button"
              onClick={next}
              aria-label="Next amenity"
              className="
                flex
                h-9
                w-9
                items-center
                justify-center
                border
                border-[var(--line)]
                bg-transparent
                text-[var(--ink)]
                transition-all
                duration-300

                hover:bg-[var(--forest)]
                hover:text-white

                md:h-10
                md:w-10
              "
            >
              <ChevronRight
                size={16}
              />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Amenities;