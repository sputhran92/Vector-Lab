import { useState } from "react";
import DesignSelector from "./components/DesignSelector";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Services from "./components/Services";
import Features from "./components/Features";
import Process from "./components/Process";
import Portfolio from "./components/Portfolio";
import Pricing from "./components/Pricing";
import Testimonials from "./components/Testimonials";
import FAQ from "./components/FAQ";
import Contact from "./components/Contact";
import Blogs from "./components/Blogs";
import Footer from "./components/Footer";

export default function App() {
  const [currentPage, setCurrentPage] = useState("home");
  const [prefilledService, setPrefilledService] = useState("");
  const [prefilledPlan, setPrefilledPlan] = useState("");

  const scrollToSection = (id: string) => {
    const el = document.querySelector(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const handleQuoteClick = () => {
    setPrefilledService("");
    setPrefilledPlan("");
    if (currentPage === "home") {
      scrollToSection("#contact");
    } else {
      setCurrentPage("contact");
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handlePortfolioClick = () => {
    setCurrentPage("home");
    setTimeout(() => {
      scrollToSection("#portfolio");
    }, 100);
  };

  const handleServiceSelect = (serviceName: string) => {
    setPrefilledService(serviceName);
    setPrefilledPlan("");
    if (currentPage === "home") {
      scrollToSection("#contact");
    } else {
      setCurrentPage("contact");
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handlePlanSelect = (planName: string) => {
    setPrefilledPlan(planName);
    setPrefilledService("");
    if (currentPage === "home") {
      scrollToSection("#contact");
    } else {
      setCurrentPage("contact");
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <div className="min-h-screen bg-white font-sans text-brand-text-body antialiased selection:bg-primary-blue/10 selection:text-primary-blue">
      {/* Design Preset Selector */}
      <DesignSelector />

      {/* 1. Navbar */}
      <Navbar
        currentPage={currentPage}
        onPageChange={setCurrentPage}
        onQuoteClick={handleQuoteClick}
      />

      {/* Page Views */}
      {currentPage === "home" && (
        <>
          {/* 2. Hero Section */}
          <Hero
            onQuoteClick={handleQuoteClick}
            onPortfolioClick={handlePortfolioClick}
          />

          {/* Condensed Services Overview */}
          <section className="py-20 bg-brand-bg-light border-b border-gray-100">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
              <span className="text-primary-blue text-xs font-bold uppercase tracking-widest bg-primary-blue/10 px-3 py-1 rounded-full">
                Vector Precision
              </span>
              <h2 className="text-3xl md:text-4xl font-extrabold text-brand-text-dark tracking-tight">
                Hand-Crafted Vector Services
              </h2>
              <p className="text-brand-text-body text-base max-w-2xl mx-auto leading-relaxed">
                We manual-trace legacy logos, hand-drawn paper sketches, large signage blueprints, apparel mockups, and photographic rasters into clean, editable SVG/AI assets.
              </p>
              <div className="pt-4">
                <button
                  onClick={() => {
                    setCurrentPage("services");
                    window.scrollTo({ top: 0, behavior: "smooth" });
                  }}
                  className="bg-primary-blue hover:bg-primary-blue/90 text-white font-extrabold text-sm py-3.5 px-8 rounded-xl shadow-md hover:shadow-lg transition-all duration-200 cursor-pointer"
                >
                  Explore All Tracing Services
                </button>
              </div>
            </div>
          </section>

          {/* 4. Why Choose Us / Features */}
          <Features />

          {/* 5. Process / How It Works */}
          <Process />

          {/* 6. Portfolio / Before-After Gallery */}
          <Portfolio />

          {/* 7. Pricing Section */}
          <Pricing onPlanSelect={handlePlanSelect} />

          {/* 8. Testimonials */}
          <Testimonials />

          {/* 10. Contact / Quote Form */}
          <Contact
            prefilledService={prefilledService}
            prefilledPlan={prefilledPlan}
          />
        </>
      )}

      {currentPage === "services" && (
        <div className="pt-24">
          <Services onServiceSelect={handleServiceSelect} />
        </div>
      )}

      {currentPage === "faq" && (
        <div className="pt-24">
          <FAQ />
        </div>
      )}

      {currentPage === "blogs" && (
        <div className="pt-24">
          <Blogs />
        </div>
      )}

      {currentPage === "contact" && (
        <div className="pt-24">
          <Contact
            prefilledService={prefilledService}
            prefilledPlan={prefilledPlan}
          />
        </div>
      )}

      {/* 11. Footer */}
      <Footer
        onPageChange={setCurrentPage}
        onServiceSelect={handleServiceSelect}
      />
    </div>
  );
}
