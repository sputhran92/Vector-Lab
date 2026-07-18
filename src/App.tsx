import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, useNavigate, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Services from "./components/Services";
import Features from "./components/Features";
import Process from "./components/Process";
import FeaturedPortfolio from "./components/FeaturedPortfolio";
import Portfolio from "./components/Portfolio";
import Terms from "./components/Terms";
import RefundPolicy from "./components/RefundPolicy";
import PrivacyPolicy from "./components/PrivacyPolicy";
import Pricing from "./components/Pricing";
import Testimonials from "./components/Testimonials";
import FAQ from "./components/FAQ";
import Contact from "./components/Contact";
import Blogs from "./components/Blogs";
import Footer from "./components/Footer";

function AppContent() {
  const [currentPage, setCurrentPage] = useState("home");
  const [prefilledService, setPrefilledService] = useState("");
  const [prefilledPlan, setPrefilledPlan] = useState("");
  
  useEffect(() => {
    document.title = "Vector Trace Lab | Professional Vector Tracing Services";
  }, []);
  
  const navigate = useNavigate();

  const scrollToSection = (id: string) => {
    const el = document.querySelector(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const handleQuoteClick = () => {
    setPrefilledService("");
    setPrefilledPlan("");
    navigate("/");
    setCurrentPage("contact");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handlePortfolioClick = () => {
    navigate("/portfolio");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleServiceSelect = (serviceName: string) => {
    setPrefilledService(serviceName);
    setPrefilledPlan("");
    navigate("/");
    setCurrentPage("contact");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handlePlanSelect = (planName: string) => {
    setPrefilledPlan(planName);
    setPrefilledService("");
    navigate("/");
    setCurrentPage("contact");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handlePageChange = (id: string) => {
    setCurrentPage(id);
  };

  return (
    <div className="min-h-screen bg-white font-sans text-brand-text-body antialiased selection:bg-primary-blue/10 selection:text-primary-blue">
      {/* 1. Navbar */}
      <Navbar
        currentPage={currentPage}
        onPageChange={handlePageChange}
        onQuoteClick={handleQuoteClick}
      />

      <Routes>
        {/* Main single page layout */}
        <Route
          path="/"
          element={
            <>
              {/* Page Views */}
              {currentPage === "home" && (
                <>
                  {/* 2. Hero Section */}
                  <Hero
                    onQuoteClick={handleQuoteClick}
                    onPortfolioClick={handlePortfolioClick}
                  />

                  {/* 4. Why Choose Us / Features */}
                  <Features />

                  {/* 5. Process / How It Works */}
                  <Process />

                  {/* Curated Featured Portfolio Section */}
                  <FeaturedPortfolio onPortfolioClick={handlePortfolioClick} />

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
            </>
          }
        />

        {/* New Separate Page called "Portfolio" */}
        <Route path="/portfolio" element={<Portfolio />} />
        {/* New Separate Page called "Terms" */}
        <Route path="/terms" element={<Terms />} />
        {/* New Separate Page called "RefundPolicy" */}
        <Route path="/refund-policy" element={<RefundPolicy />} />
        {/* New Separate Page called "PrivacyPolicy" */}
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
      </Routes>

      {/* 11. Footer */}
      <Footer
        onPageChange={handlePageChange}
        onServiceSelect={handleServiceSelect}
      />
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}
