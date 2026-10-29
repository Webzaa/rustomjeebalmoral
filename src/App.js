import "./App.css";
import React from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";

import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Philosophy from "./components/Philosophy";
import SectionSeparator from "./components/SectionSeparator";
import Amenities from "./components/Amenities";
import Walkthrough from "./components/Walkthrough";
import Residences from "./components/Residences";
import Faq from "./components/Faq";
import EnquiryForm from "./components/EnquiryForm";
import Footer from "./components/Footer";

import { Toaster } from "./components/ui/sonner";
import useParallax from "./hooks/useParallax";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsAndConditions from "./pages/TermsAndConditions";
import ThankYou from "./pages/ThankYou";

/* =========================================================
   GTM ROUTE TRACKER (FOR SPA NAVIGATION)
========================================================= */

const GTMRouteTracker = () => {
  const location = useLocation();

  React.useEffect(() => {
    // Push pageview to GTM dataLayer on every route change
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
      event: "pageview",
      page_path: location.pathname + location.search,
      page_location: window.location.href,
      page_title: document.title,
    });
  }, [location]);

  return null;
};

/* =========================================================
   LANDING PAGE
========================================================= */

const Landing = () => {
  // Global parallax behaviour
  useParallax();

  React.useEffect(() => {
    document.title = "Rustomjee Balmoral Golf Links · Chembur";
  }, []);

  return (
    <div className="App bg-[var(--cream)]">

      {/* ===================================================
          NAVIGATION
      =================================================== */}

      <Navbar />


      {/* ===================================================
          MAIN CONTENT
      =================================================== */}

      <main>

        {/* Hero */}
        <Hero />
        
        {/* Project Philosophy */}
        <Philosophy />

        {/* Walkthrough */}
        <Walkthrough />

        {/* Section separator */}
        <SectionSeparator />

        {/* Amenities */}
        <Amenities />

        {/* Residences */}
        <Residences />

        {/* Faq */}
        <Faq />

        {/* Enquiry / Lead Form */}
        <EnquiryForm />

      </main>


      {/* ===================================================
          FOOTER
      =================================================== */}

      <Footer />


      {/* ===================================================
          TOAST NOTIFICATIONS
      =================================================== */}

      <Toaster />

    </div>
  );
};


/* =========================================================
   APP
========================================================= */

const App = () => {
  return (
   <BrowserRouter>
    <GTMRouteTracker />
    <Routes>
      <Route path="/" element={<Landing />} />

      <Route
        path="/privacy-policy"
        element={<PrivacyPolicy />}
      />

      <Route
        path="/terms-and-conditions"
        element={<TermsAndConditions />}
      />
      <Route
        path="/thank-you"
        element={<ThankYou />}
      />
    </Routes>
  </BrowserRouter>
  );
};


export default App;