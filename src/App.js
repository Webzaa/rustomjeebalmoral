import "./App.css";
import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Philosophy from "./components/Philosophy";
import Marquee from "./components/Marquee";
import Amenities from "./components/Amenities";
import Portfolio from "./components/Portfolio";
import Walkthrough from "./components/Walkthrough";
import Residences from "./components/Residences";
import Location from "./components/Location";
import Rera from "./components/Rera";
import EnquiryForm from "./components/EnquiryForm";
import EnquiryPopup from "./components/EnquiryPopup";
import Footer from "./components/Footer";
import { Toaster } from "./components/ui/sonner";
import PrivacyPolicy from "./components/privacy-policy";
import TermsConditions from "./components/terms-conditions";
import ThankYou from "./components/ThankYou";
import { gsap } from "gsap";
import { ScrollSmoother } from "gsap/ScrollSmoother";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const Landing = () => {
  const [scrolled, setScrolled] = useState(false);
  const [popupOpen, setPopupOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // ScrollSmoother setup
  useEffect(() => {
    gsap.registerPlugin(ScrollSmoother, ScrollTrigger);

    if (
      /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
        navigator.userAgent
      )
    ) {
      // mobile — skip smoother
    } else {
      if (ScrollSmoother.get()) {
        ScrollSmoother.get().kill();
      }
      var smoother = ScrollSmoother.create({
        content: ".viewport main",
        smooth: 2,
        smoothTouch: 0,
        effects: true,
      });
    }

    return () => {
      if (ScrollSmoother.get()) {
        ScrollSmoother.get().kill();
      }
    };
  }, []);

  return (
    <div className="App bg-[var(--cream)] viewport">
      <Navbar />
      <main>
        <Hero />
        <Philosophy />
        {/* <Marquee /> */}
        <Amenities />
        <Portfolio />
        <Walkthrough />
        <Residences />
        <Location />
        <EnquiryForm />
        <Rera />
        <Footer />
      </main>
      <Toaster />

      <button
        onClick={() => setPopupOpen(true)}
        className={`text-[20px] hidden max-[991px]:flex fixed bottom-0 left-0 right-0 z-50 py-3 justify-center items-center transition-all duration-700 shadow-[0_-4px_12px_rgba(0,0,0,0.5)] ${scrolled
            ? "bg-[var(--light-blue)] text-[var(--black)] hover:bg-[var(--light-blue)]"
            : "bg-[var(--light-blue)] border-t border-white/50 text-[var(--black)] hover:bg-white"
          }`}
      >
        Register Interest
      </button>

      <EnquiryPopup open={popupOpen} onClose={() => setPopupOpen(false)} />
    </div>
  );
};

// Detects the deployment folder at runtime (e.g. "/rustomjeebalmoralnewv21")
// by stripping any known app route off the current pathname.
// This means renaming or moving the deployed folder later needs no rebuild
// and no code change — it just works off whatever URL it's actually loaded at.
const getBasename = () => {
  const knownRoutes = ["/PrivacyPolicy", "/TermsConditions", "/ThankYou"];
  let path = window.location.pathname;

  for (const route of knownRoutes) {
    if (path.endsWith(route)) {
      path = path.slice(0, path.length - route.length);
      break;
    }
  }

  // BrowserRouter basename should not end with a trailing slash
  return path.replace(/\/$/, "");
};

function App() {
  return (
    <BrowserRouter basename={getBasename()}>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/PrivacyPolicy" element={<PrivacyPolicy />} />
        <Route path="/TermsConditions" element={<TermsConditions />} />
        <Route path="/ThankYou" element={<ThankYou />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;