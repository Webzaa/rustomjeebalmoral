
import React, { useState } from "react";

const FAQS = [
  {
    question: "Where is Rustomjee Balmoral Golf Links located?",
    answer:
      "Rustomjee Balmoral Golf Links is located in Chembur, Mumbai, near the Bombay Presidency Golf Club. Its location offers access to major roads connecting BKC, the Eastern Express Highway and South Mumbai."
  },
  {
    question: "What configurations and prices are available?",
    answer:
      "The project features luxury 4 BHK and 5 BHK residences. Pricing varies by configuration, floor, tower and applicable charges. Contact the sales team for the latest price list and availability."
  },
  {
    question: "What are the carpet areas of the 4 BHK and 5 BHK residences?",
    answer:
      "Carpet areas vary by apartment configuration and layout. Request the latest floor plans and verify the exact carpet area against the applicable MahaRERA-approved documents."
  },
  {
    question: "Is there really a golf course next to the project?",
    answer:
      "Yes, the development is located near the Bombay Presidency Golf Club in Chembur. Its golf-course surroundings are a distinctive feature of the residential setting."
  },
  {
    question: "Will my home face the golf course?",
    answer:
      "Selected residences may offer golf-course views. The actual outlook depends on the tower, apartment orientation, floor and surrounding sightlines."
  },
  {
    question: "What amenities does Rustomjee Balmoral Golf Links offer?",
    answer:
      "Advertised lifestyle amenities include clubhouse and leisure facilities, swimming pool facilities, fitness and wellness spaces, recreational areas and landscaped outdoor spaces. Refer to the latest brochure for the confirmed amenity list."
  },
  {
    question: "How green is Rustomjee Balmoral Golf Links?",
    answer:
      "The development's golf-course surroundings and landscaped outdoor areas contribute to its green residential setting. Refer to the latest technical specifications for sustainability features."
  },
  {
    question: "What is the MahaRERA registration number?",
    answer:
      "Registration details can vary by wing or phase. Verify the registration number for your selected residence through the official MahaRERA portal before booking."
  },
  {
    question: "When is possession expected?",
    answer:
      "The possession timeline may vary by wing and phase. Confirm the expected possession date in the latest MahaRERA records and the agreement for your selected unit."
  },
  {
    question: "How well is the project connected to BKC, the airports and South Mumbai?",
    answer:
      "Chembur offers access to the Sion–BKC Connector, Santacruz–Chembur Link Road, Eastern Express Highway and Eastern Freeway. Actual travel times depend on traffic."
  }
//   {
//     question: "Which schools, hospitals and everyday facilities are nearby?",
//     answer:
//       "Chembur has established schools, hospitals, shopping destinations and daily conveniences. Verify distances and travel times for your preferred facilities."
//   },
//   {
//     question: "Who designed the project, and what makes its design distinctive?",
//     answer:
//       "The project emphasizes spacious luxury residences, private outdoor spaces and its golf-course setting. Refer to the official brochure for confirmed architect and design specifications."
//   }
];

const FAQ = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [showAll, setShowAll] = useState(false);

  const visibleFAQs = showAll ? FAQS : FAQS.slice(0, 4);

  return (
    <section id="faq" className="bg-[var(--cream-2)] py-20">
      <div className="mx-auto max-w-[1360px] px-6 md:px-10">
        {/* Single centered heading */}
        <div className="mx-auto mb-12 max-w-3xl text-center md:mb-16">
          <div className="mb-5 flex items-center justify-center gap-3">
            <span className="h-px w-8 bg-[var(--brass)]" />
            <span className="text-[11px] uppercase tracking-[0.2em] text-[var(--brass)]">
              Frequently Asked Questions
            </span>
            <span className="h-px w-8 bg-[var(--brass)]" />
          </div>
          <h2 className="font-serif-display text-[2.3rem] font-light leading-tight text-[var(--ink)] md:text-[3.5rem]">
            Everything You Need to Know
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-sm font-light leading-7 text-[var(--muted)] md:text-base">
            Find answers to your questions about Rustomjee Balmoral
            Golf Links, its residences, amenities and location.
          </p>
        </div>
        {/* Full-width accordion */}
        <div className="w-full border-t border-[var(--line)]">
          {visibleFAQs.map((faq, index) => {
            const isOpen = activeIndex === index;
            return (
              <div key={faq.question} className="border-b border-[var(--line)]">
                <h3>
                  <button type="button" id={`faq-trigger-${index}`} aria-expanded={isOpen} aria-controls={`faq-panel-${index}`} onClick={() => setActiveIndex(isOpen ? -1 : index)} className="group flex w-full items-center gap-4 py-5 text-left md:gap-6 md:py-6">
                    <span className="w-7 shrink-0 font-serif-display md:text-[1.3rem] text-[1rem] text-[var(--brass)] md:w-9">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span
                      className={`flex-1 md:text-[1.3rem] text-[1rem] md:leading-6 leading-4 transition-colors duration-300 md:text-base ${
                        isOpen
                          ? "text-[var(--forest)]"
                          : "text-[var(--ink)] group-hover:text-[var(--forest)]"
                      }`}
                    >
                      {faq.question}
                    </span>

                    <span
                      className={`flex h-8 w-8 shrink-0 items-center justify-center border text-[1.3rem] font-light transition-all duration-300 ${
                        isOpen
                          ? "border-[var(--forest)] bg-[var(--forest)] text-[var(--cream)]"
                          : "border-[var(--line)] text-[var(--forest)] group-hover:border-[var(--forest)]"
                      }`}
                      aria-hidden="true"
                    >
                      {isOpen ? "−" : "+"}
                    </span>
                  </button>
                </h3>

                <div id={`faq-panel-${index}`} role="region" aria-labelledby={`faq-trigger-${index}`} hidden={!isOpen} className="pb-6 pl-11 pr-10 md:pb-7 md:pl-16 md:pr-16">
                  <p className="max-w-5xl text-[13px] font-light leading-7 text-[var(--muted)] md:text-sm md:leading-8">
                    {faq.answer}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* See More / See Less */}
        <div className="mt-10 flex justify-center">
          <button type="button" onClick={() => {setShowAll(!showAll); setActiveIndex(-1);}} aria-expanded={showAll} className="group inline-flex items-center gap-3 border border-[var(--forest)] px-7 py-4 text-[11px] uppercase tracking-[0.18em] text-[var(--forest)] transition-all duration-300 hover:bg-[var(--forest)] hover:text-[var(--cream)]">
            {showAll ? "See Less" : "See More FAQs"}
            <span className={`inline-block transition-transform duration-300 ${showAll ? "rotate-180" : ""}`} aria-hidden="true">
              ↓
            </span>
          </button>
        </div>
      </div>
    </section>
  );
};

export default FAQ;
