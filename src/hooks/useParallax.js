import { useEffect } from "react";

// Applies a lightweight, viewport-relative parallax transform to elements
// marked with data-parallax. Uses requestAnimationFrame to avoid layout thrashing.
export default function useParallax() {
  useEffect(() => {
    const elements = Array.from(document.querySelectorAll("[data-parallax]"));
    if (!elements.length) return undefined;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reducedMotion) return undefined;

    let frame = null;

    const update = () => {
      frame = null;
      const viewportHeight = window.innerHeight;

      elements.forEach((element) => {
        const rect = element.getBoundingClientRect();
        if (rect.bottom < -120 || rect.top > viewportHeight + 120) return;

        const speed = Number(element.dataset.parallaxSpeed || 0.12);
        const centerOffset = rect.top + rect.height / 2 - viewportHeight / 2;
        const translateY = Math.max(-70, Math.min(70, -centerOffset * speed));

        element.style.setProperty("--parallax-y", `${translateY.toFixed(2)}px`);
      });
    };

    const onScroll = () => {
      if (frame === null) frame = window.requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame !== null) window.cancelAnimationFrame(frame);
    };
  }, []);
}
