import React, { useState } from "react";
import { WALKTHROUGH } from "../mock";
import { Play, X } from "lucide-react";
import { Dialog, DialogContent } from "./ui/dialog";
import EnquiryForm from "./EnquiryForm";
import useReveal from "../hooks/useReveal";
import EnquiryPopup from "./EnquiryPopup";

const Walkthrough = () => {
  const [active, setActive] = useState(null);
  const [showLeadForm, setShowLeadForm] = useState(false);
  const { ref, inView } = useReveal();
  const firstVideo = WALKTHROUGH.videos[0];
  const secondVideo = WALKTHROUGH.videos[1];
  const [popupOpen, setPopupOpen] = useState(false);
  const [popupForm, setPopupForm] = useState("Watch Second Film");
  
  return (
    <section id="walkthrough" className="py-20 md:py-32 bg-[var(--forest)] text-[var(--cream)]">
      <div className="mx-auto max-w-[1360px] px-6 md:px-10">
        <div className="max-w-2xl mb-12 md:mb-16">
          <div className="flex items-center gap-3 mb-6">
            <span className="h-px w-8 bg-[var(--brass-2)]" />
            <span className="text-[var(--brass-2)] text-[11px] tracking-wide-2 uppercase">( {WALKTHROUGH.eyebrow} )</span>
          </div>
          <h2 className="font-serif-display text-[2.2rem] md:text-[3.2rem] leading-[1.05] font-light">{WALKTHROUGH.title}</h2>
          <p className="mt-5 text-[var(--cream)]/70 text-[15px] md:text-[16px] font-light leading-relaxed">{WALKTHROUGH.intro}</p>
        </div>

        <div ref={ref} className={`reveal ${inView ? "in-view" : ""} grid grid-cols-1 md:grid-cols-2 gap-6`}>
          <div className="relative overflow-hidden aspect-[16/10] bg-black parallax-layer" data-parallax data-parallax-speed="0.06">
            <iframe
              className="absolute inset-0 h-full w-full"
              src={`https://www.youtube-nocookie.com/embed/${firstVideo.id}?autoplay=1&mute=1&rel=0&playsinline=1`}
              title={firstVideo.title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
            <div className="pointer-events-none absolute bottom-0 left-0 right-0 p-5 md:p-6 bg-gradient-to-t from-black/70 to-transparent">
              <span className="text-white text-[12px] md:text-[13px] tracking-wide-2 uppercase">{firstVideo.title}</span>
            </div>
          </div>

          <button
            type="button"
            onClick={() => { setPopupForm("Watch Second Film"); setPopupOpen(true); }}
            className="group relative overflow-hidden aspect-[16/10] w-full text-left"
          >
            <div className="absolute inset-[-5%] parallax-layer" data-parallax data-parallax-speed="0.10">
              <img src={secondVideo.poster} alt={secondVideo.title} className="h-full w-full object-cover transition-transform duration-[1600ms] ease-out group-hover:scale-105" />
              
            </div>
            <span className=" absolute bottom-5 right-5 font-serif-display text-[10px] text-[var(--cream)] opacity-90">Artistic Impression</span>
            <div className="absolute inset-0 bg-black/45 group-hover:bg-black/30 transition-colors duration-500" />
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="flex items-center justify-center h-20 w-20 rounded-full border border-white/70 bg-white/10 backdrop-blur-sm group-hover:scale-110 group-hover:bg-white group-hover:text-[var(--forest)] text-white transition-all duration-500">
                <Play size={26} className="ml-1" fill="currentColor" />
              </span>
            </div>
            <div className="absolute bottom-0 left-0 right-0 p-6">
              <span className="text-white text-[12px] md:text-[13px] tracking-wide-2 uppercase">Watch the second film · Request access</span>
            </div>
          </button>
        </div>
      </div>

      <Dialog open={Boolean(active)} onOpenChange={(open) => !open && setActive(null)}>
        <DialogContent className="max-w-5xl w-[94vw] p-0 border-0 bg-black overflow-hidden">
          <button onClick={() => setActive(null)} className="absolute top-3 right-3 z-20 h-10 w-10 flex items-center justify-center rounded-full bg-black/60 text-white hover:bg-black transition-colors" aria-label="Close video">
            <X size={20} />
          </button>
          {active && (
            <div className="aspect-video w-full">
              <iframe className="h-full w-full" src={`https://www.youtube-nocookie.com/embed/${active.id}?autoplay=1&rel=0`} title={active.title} allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen />
            </div>
          )}
        </DialogContent>
      </Dialog>

      <Dialog open={showLeadForm} onOpenChange={setShowLeadForm}>
        <DialogContent className="max-w-4xl w-[94vw] max-h-[92vh] overflow-y-auto p-0 border-0 bg-[var(--forest)]">
          <EnquiryForm compact />
        </DialogContent>
      </Dialog>
      <EnquiryPopup open={popupOpen} onClose={() => setPopupOpen(false)} formName={popupForm} />
    </section>
  );
};

export default Walkthrough;
