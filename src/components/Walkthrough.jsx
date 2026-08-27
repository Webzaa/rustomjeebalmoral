import React, { useState } from "react";
import { WALKTHROUGH } from "../mock";
import { Play, X } from "lucide-react";
import { Dialog, DialogContent } from "./ui/dialog";
import useReveal from "../hooks/useReveal";

const Walkthrough = () => {
  const [active, setActive] = useState(null);
  const { ref, inView } = useReveal();

  return (
    <section id="walkthrough" className="py-10 md:py-15 bg-[var(--light-blue)] text-[var(--black)]">
      <div className="mx-auto max-w-[1360px] px-6 md:px-10">
        <div className="max-w-1xl mb-10 md:mb-15">
          <div className="flex items-center gap-3 mb-6">
            <span className="h-px w-8 bg-[var(--brass-2)]" />
            <span className="text-[var(--brass-2)] text-[12px] tracking-wide-2 uppercase">
              ( {WALKTHROUGH.eyebrow} )
            </span>
          </div>
          <h2 className="font-serif-display tracking-tighter leading-[1.22] sm:leading-[1.15] text-[32px] sm:text-[34px] md:text-[44px] lg:text-[52px] font-light capitalize">
            {WALKTHROUGH.title}
          </h2>
          <p className="mt-5 text-[var(--black)]/70 text-[15px] md:text-[24px] font-light leading-[1.4]">
            {WALKTHROUGH.intro}
          </p>
        </div>

        <div ref={ref} className={`reveal ${inView ? "in-view" : ""} grid grid-cols-1 md:grid-cols-2 gap-6`}>
          {WALKTHROUGH.videos.map((v) => (
            <button
              key={v.id}
              onClick={() => setActive(v)}
              className="border-2 border-white group relative overflow-hidden aspect-[16/10] w-full text-left"
            >
              <img
                src={v.poster}
                alt={v.title}
                className="h-full w-full object-cover transition-transform duration-[1600ms] ease-out group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/35 group-hover:bg-black/25 transition-colors duration-500" />
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="flex items-center justify-center h-10 w-10 md:h-16 md:w-16 rounded-full border border-white/60 bg-white/10 backdrop-blur-sm group-hover:scale-110 group-hover:bg-white group-hover:text-[var(--forest)] text-white transition-all duration-500">
                  <Play size={16} className="ml-0.5 md:ml-1 md:hidden" fill="currentColor" />
                  <Play size={20} className="ml-1 hidden md:block" fill="currentColor" />
                </span>
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-3">
                <span className="text-white text-[10px] md:text-[13px]  tracking-wide-2 uppercase leading-[1.4]">{v.title}</span>
              </div>
            </button>
          ))}
        </div>
      </div>

      <Dialog open={Boolean(active)} onOpenChange={(o) => !o && setActive(null)}>
        <DialogContent className="max-w-5xl w-[94vw] p-0 border-0 bg-black overflow-hidden">
          <button
            onClick={() => setActive(null)}
            className="absolute top-3 right-3 z-20 h-10 w-10 flex items-center justify-center rounded-full bg-black/60 text-white hover:bg-black transition-colors"
            aria-label="Close video"
          >
            <X size={20} />
          </button>
          {active && (
            <div className="aspect-video w-full">
              <iframe
                className="h-full w-full"
                src={`https://www.youtube-nocookie.com/embed/${active.id}?autoplay=1&rel=0`}
                title={active.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
};

export default Walkthrough;
