import React from "react";
import { Shield, Mail, ArrowUp } from "lucide-react";
import { Link } from "react-router-dom";

interface FooterProps {
  onPageChange: (page: string) => void;
  onServiceSelect: (serviceName: string) => void;
}

export default function Footer({ onPageChange, onServiceSelect }: FooterProps) {
  
  const quickLinks = [
    { name: "Home", id: "home" },
    { name: "Services", id: "services" },
    { name: "FAQ", id: "faq" },
    { name: "Blogs", id: "blogs" },
    { name: "Contact Us", id: "contact" },
  ];

  const services = [
    { name: "Logo Tracing & Recreation", label: "Logo Recreation" },
    { name: "Sketch-to-Vector Conversion", label: "Sketch Tracing" },
    { name: "Banner & Signage Vectorization", label: "Large Format Banners" },
    { name: "T-Shirt & Apparel Artwork", label: "Apparel Separations" },
    { name: "Map & Technical Drawing Vectorization", label: "Technical Drafting" },
    { name: "Image Vectorization", label: "Photo Vectorization" },
  ];

  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    onPageChange(id);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="bg-white border-t border-gray-100 text-brand-text-body relative" id="main-footer">
      
      {/* Top Banner Accent */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary-blue via-accent-blue to-primary-blue" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12" id="footer-links-grid">
          
          {/* Column 1: Brand Wordmark */}
          <div className="lg:col-span-4 space-y-6">
            <a
              href="#home"
              onClick={(e) => handleLinkClick(e, "home")}
              className="flex items-center gap-2.5 text-primary-blue font-bold text-2xl tracking-tight select-none"
            >
              <div className="bg-primary-blue text-white p-1.5 rounded-lg shadow-sm flex items-center justify-center">
                <Shield className="w-5 h-5 stroke-[2.5]" />
              </div>
              <span className="text-brand-text-dark font-extrabold">
                Vector<span className="text-primary-blue">Lab</span>
              </span>
            </a>

            <p className="text-sm leading-relaxed text-brand-text-body max-w-sm">
              We provide professional, hand-crafted manual vector tracing services. Our designers redraw every curve with bezier coordinate precision, delivering scalable branding, apparel, signage, and technical assets ready for production.
            </p>
          </div>

          {/* Column 2: Quick Links */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="font-extrabold text-brand-text-dark text-sm uppercase tracking-wider">
              Quick Navigation
            </h4>
            <ul className="space-y-2.5 text-sm">
              {quickLinks.map((link) => (
                <li key={link.id}>
                  <a
                    href={`#${link.id}`}
                    onClick={(e) => handleLinkClick(e, link.id)}
                    className="hover:text-primary-blue transition-colors block"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Explore */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="font-extrabold text-brand-text-dark text-sm uppercase tracking-wider">
              Explore
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link to="/portfolio" className="hover:text-primary-blue transition-colors block">
                  Portfolio
                </Link>
              </li>
              <li>
                <Link to="/refund-policy" className="hover:text-primary-blue transition-colors block">
                  Refund & Cancellation Policy
                </Link>
              </li>
              <li>
                <Link to="/terms" className="hover:text-primary-blue transition-colors block">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link to="/privacy-policy" className="hover:text-primary-blue transition-colors block">
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Office Stats */}
          <div className="lg:col-span-2 space-y-4">
            <h4 className="font-extrabold text-brand-text-dark text-sm uppercase tracking-wider">
              Contact
            </h4>
            <ul className="space-y-3.5 text-sm">
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-primary-blue flex-shrink-0" />
                <span className="text-sm">
                  <a href="mailto:info@vectortracelab.com" className="hover:text-primary-blue transition-colors text-sm" style={{ fontSize: "14px" }}>
                    info@vectortracelab.com
                  </a>
                </span>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom copyright line */}
        <div className="mt-16 pt-8 border-t border-gray-100 flex flex-col sm:flex-row justify-between items-center gap-4" id="footer-bottom-bar">
          <p className="text-xs text-gray-400 text-center sm:text-left">
            &copy; {new Date().getFullYear()} Vector Lab (Vector Trace Lab). All rights reserved.
          </p>

          <div className="flex items-center gap-6 text-xs text-gray-400">
            
            {/* Scroll back to top button */}
            <button
              onClick={handleScrollToTop}
              className="bg-brand-bg-light hover:bg-primary-blue hover:text-white text-brand-text-dark p-2 rounded-lg border border-gray-100 shadow-xs transition-all flex items-center justify-center cursor-pointer"
              aria-label="Scroll to top"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
}
