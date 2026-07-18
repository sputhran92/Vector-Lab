import React, { useState, useEffect } from "react";
import { Menu, X, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { useNavigate, useLocation } from "react-router-dom";
import logoImg from "../assets/images/vector_trace_lab_logo_1784371213382.jpg";

interface NavbarProps {
  currentPage: string;
  onPageChange: (page: string) => void;
  onQuoteClick: () => void;
}

export default function Navbar({ currentPage, onPageChange, onQuoteClick }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const isPortfolio = location.pathname === "/portfolio";

  const navLinks = [
    { name: "Home", id: "home" },
    { name: "Services", id: "services" },
    { name: "Portfolio", id: "portfolio" },
    { name: "FAQ", id: "faq" },
    { name: "Blogs", id: "blogs" },
    { name: "Contact Us", id: "contact" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    setIsOpen(false);
    if (id === "portfolio") {
      navigate("/portfolio");
    } else {
      navigate("/");
      onPageChange(id);
    }
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const isLinkActive = (id: string) => {
    if (id === "portfolio") {
      return isPortfolio;
    }
    return !isPortfolio && currentPage === id;
  };

  return (
    <header
      id="navbar"
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        scrolled || isPortfolio || currentPage !== "home"
          ? "bg-white/95 backdrop-blur-md shadow-sm border-b border-gray-100 py-3"
          : "bg-transparent py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          {/* Logo / Wordmark */}
          <a
            href="#home"
            onClick={(e) => handleLinkClick(e, "home")}
            className="flex items-center gap-2.5 text-primary-blue font-bold text-2xl tracking-tight select-none"
            id="nav-logo"
          >
            <div className="w-9 h-9 rounded-xl overflow-hidden shadow-sm flex items-center justify-center border border-gray-100 bg-white">
              <img 
                src={logoImg} 
                alt="Vector Trace Lab Logo" 
                className="w-full h-full object-cover" 
                referrerPolicy="no-referrer"
              />
            </div>
            <span className="text-brand-text-dark font-extrabold flex items-center gap-1.5">
              <span className="text-gray-900">Vector</span>
              <span className="text-primary-blue">Trace</span>
              <span className="text-gray-900">Lab</span>
            </span>
          </a>

          {/* Desktop Links */}
          <nav className="hidden lg:flex items-center gap-8" id="nav-desktop-links">
            {navLinks.map((link) => (
              <a
                key={link.id}
                href={`#${link.id}`}
                onClick={(e) => handleLinkClick(e, link.id)}
                className={`text-sm font-medium transition-colors hover:text-primary-blue ${
                  isLinkActive(link.id)
                    ? "text-primary-blue font-bold border-b-2 border-primary-blue pb-1"
                    : "text-gray-600 pb-1"
                }`}
              >
                {link.name}
              </a>
            ))}
          </nav>

          {/* Action CTA Button */}
          <div className="hidden lg:flex items-center" id="nav-desktop-cta">
            <button
              onClick={onQuoteClick}
              className="bg-primary-blue hover:bg-primary-blue/90 text-white px-5 py-2.5 rounded-lg text-sm font-semibold shadow-md shadow-primary-blue/10 hover:shadow-lg transition-all duration-200 flex items-center gap-1.5 group cursor-pointer"
              id="btn-nav-cta"
            >
              Get a Quote
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
            </button>
          </div>

          {/* Hamburger Menu Toggle */}
          <div className="lg:hidden flex items-center" id="nav-mobile-toggle">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-600 hover:text-primary-blue focus:outline-none p-2 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer"
              aria-label="Toggle Menu"
              id="btn-nav-hamburger"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="lg:hidden bg-white border-b border-gray-100 overflow-hidden"
            id="nav-mobile-drawer"
          >
            <div className="px-4 pt-2 pb-6 space-y-2 max-w-7xl mx-auto">
              {navLinks.map((link) => (
                <a
                  key={link.id}
                  href={`#${link.id}`}
                  onClick={(e) => handleLinkClick(e, link.id)}
                  className={`block px-4 py-3 rounded-lg text-base font-medium transition-colors ${
                    isLinkActive(link.id)
                      ? "bg-brand-bg-light text-primary-blue font-semibold"
                      : "text-gray-600 hover:bg-gray-50 hover:text-primary-blue"
                  }`}
                >
                  {link.name}
                </a>
              ))}
              <div className="pt-4 px-4">
                <button
                  onClick={() => {
                    setIsOpen(false);
                    onQuoteClick();
                  }}
                  className="w-full bg-primary-blue hover:bg-primary-blue/90 text-white py-3 px-4 rounded-lg text-center font-semibold shadow-sm transition-all flex items-center justify-center gap-2 cursor-pointer"
                  id="btn-nav-mobile-cta"
                >
                  Get a Quote
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
