import React, { useState, useEffect } from "react";
import { X, ZoomIn, ArrowLeft, ShieldCheck, Eye, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { useNavigate } from "react-router-dom";

// Local image imports for the provided project assets
import flemingBefore from "../assets/images/fleming_before_1784026693496.jpg";
import flemingAfter from "../assets/images/fleming_after_1784026705489.jpg";
import mtbgoatBefore from "../assets/images/mtbgoat_before_1784026888084.jpg";
import mtbgoatAfter from "../assets/images/mtbgoat_after_1784026900409.jpg";
import lincolnBefore from "../assets/images/lincoln_before_1784028083157.jpg";
import lincolnAfter from "../assets/images/lincoln_after_1784028072752.jpg";
import margaritaBefore from "../assets/images/margarita_before_1784028105649.jpg";
import margaritaAfter from "../assets/images/margarita_after_1784028094128.jpg";
import bearBefore from "../assets/images/bear_before_1784028125534.jpg";
import bearAfter from "../assets/images/bear_after_1784028115206.jpg";

interface GalleryItem {
  id: string;
  src: string;
  title: string;
  type: "Raster Original" | "Traced Vector";
  project: string;
  badgeColor: string;
  description: string;
}

export default function Portfolio() {
  const navigate = useNavigate();
  const [activeItem, setActiveItem] = useState<GalleryItem | null>(null);

  // Smooth scroll to top on mount
  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, []);

  // Simple, structured list of all provided images
  const galleryItems: GalleryItem[] = [
    {
      id: "fleming-before",
      src: flemingBefore,
      title: "Baseball Logo (Before)",
      type: "Raster Original",
      project: "Fleming Island Baseball",
      badgeColor: "bg-red-50 text-red-600 border-red-100",
      description: "Low-res blurry athletic logo with pixelated contours."
    },
    {
      id: "fleming-after",
      src: flemingAfter,
      title: "Baseball Logo (After)",
      type: "Traced Vector",
      project: "Fleming Island Baseball",
      badgeColor: "bg-green-50 text-green-700 border-green-100",
      description: "Crisp hand-drawn vector paths with perfect circular curves."
    },
    {
      id: "mtbgoat-before",
      src: mtbgoatBefore,
      title: "MTBGOAT Badge (Before)",
      type: "Raster Original",
      project: "MTBGOAT Mountain Biking",
      badgeColor: "bg-red-50 text-red-600 border-red-100",
      description: "Out-of-focus raster graphic with distorted edges."
    },
    {
      id: "mtbgoat-after",
      src: mtbgoatAfter,
      title: "MTBGOAT Badge (After)",
      type: "Traced Vector",
      project: "MTBGOAT Mountain Biking",
      badgeColor: "bg-green-50 text-green-700 border-green-100",
      description: "Symmetrical modern athletic brand with sharp typography."
    },
    {
      id: "lincoln-before",
      src: lincolnBefore,
      title: "Lions Sports Mascot (Before)",
      type: "Raster Original",
      project: "Lincoln Lions Sports",
      badgeColor: "bg-red-50 text-red-600 border-red-100",
      description: "Heavily compressed and blurred lion team logo."
    },
    {
      id: "lincoln-after",
      src: lincolnAfter,
      title: "Lions Sports Mascot (After)",
      type: "Traced Vector",
      project: "Lincoln Lions Sports",
      badgeColor: "bg-green-50 text-green-700 border-green-100",
      description: "Flawless multi-layered mascot with crisp gradients."
    },
    {
      id: "margarita-before",
      src: margaritaBefore,
      title: "Sombrero Apparel (Before)",
      type: "Raster Original",
      project: "Margarita Apparel Design",
      badgeColor: "bg-red-50 text-red-600 border-red-100",
      description: "Hand-drawn apparel rough layout with bleeding scan lines."
    },
    {
      id: "margarita-after",
      src: margaritaAfter,
      title: "Sombrero Apparel (After)",
      type: "Traced Vector",
      project: "Margarita Apparel Design",
      badgeColor: "bg-green-50 text-green-700 border-green-100",
      description: "Separated screenprint-ready solid vector layers."
    },
    {
      id: "bear-before",
      src: bearBefore,
      title: "Grizzly Mascot (Before)",
      type: "Raster Original",
      project: "Bear Pride Athletic",
      badgeColor: "bg-red-50 text-red-600 border-red-100",
      description: "Collegiate mascot with color leaks and pixel blockiness."
    },
    {
      id: "bear-after",
      src: bearAfter,
      title: "Grizzly Mascot (After)",
      type: "Traced Vector",
      project: "Bear Pride Athletic",
      badgeColor: "bg-green-50 text-green-700 border-green-100",
      description: "Reconstructed collegiate profiles with clean line weight."
    }
  ];

  return (
    <div className="min-h-screen bg-slate-50 pt-24 pb-16">
      {/* Page Header */}
      <div className="py-12 md:py-16 bg-white border-b border-gray-100 relative overflow-hidden" id="portfolio-header">
        <div className="absolute inset-0 bg-gradient-to-br from-primary-blue/5 via-transparent to-transparent opacity-75" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <span className="inline-flex items-center gap-1.5 text-primary-blue text-xs font-bold uppercase tracking-widest bg-primary-blue/10 px-4 py-1.5 rounded-full">
              <Sparkles className="w-3.5 h-3.5" /> High-Fidelity Vector Gallery
            </span>
            <h1 className="text-3xl md:text-4xl font-extrabold text-brand-text-dark tracking-tight">
              Our Traced Images Showcase
            </h1>
            <p className="text-brand-text-body text-sm md:text-base leading-relaxed">
              Browse the simple gallery of our conversion assets below. Tap any artwork card to open a full-resolution interactive lightbox overlay.
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12">
        {/* Simple 4-Column Desktop / 1-Column Mobile Responsive Grid */}
        <div
          className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
          id="portfolio-grid"
        >
          {galleryItems.map((item, index) => (
            <motion.div
              layout
              key={item.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.04 }}
              onClick={() => setActiveItem(item)}
              className="bg-white rounded-2xl border border-gray-200/60 overflow-hidden shadow-xs hover:shadow-md hover:-translate-y-1 transition-all duration-300 flex flex-col group cursor-pointer"
              id={`portfolio-card-${item.id}`}
            >
              {/* Image box with solid bg and hover state */}
              <div className="aspect-square w-full relative overflow-hidden bg-slate-100 flex items-center justify-center p-4">
                <img
                  src={item.src}
                  alt={item.title}
                  loading="lazy"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-contain transition-transform duration-300 group-hover:scale-102"
                />

                {/* Overlay details */}
                <div className="absolute inset-0 bg-primary-blue/40 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex flex-col items-center justify-center p-4 pointer-events-none">
                  <div className="bg-white p-2.5 rounded-full shadow-md text-primary-blue mb-1">
                    <ZoomIn className="w-5 h-5" />
                  </div>
                  <span className="text-white text-xs font-bold tracking-wide">View full size</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Back navigation button */}
        <div className="mt-16 text-center">
          <button
            onClick={() => navigate("/")}
            className="inline-flex items-center gap-2 text-sm font-bold text-brand-text-body hover:text-primary-blue bg-white border border-gray-200 rounded-xl px-6 py-3 shadow-2xs hover:shadow-xs hover:border-gray-300 transition-all cursor-pointer"
            id="back-home-btn"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Home
          </button>
        </div>

        {/* Simple Interactive Lightbox State Modal */}
        <AnimatePresence>
          {activeItem && (
            <div
              className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-brand-text-dark/95 backdrop-blur-xs"
              onClick={() => setActiveItem(null)}
              id="portfolio-lightbox-overlay"
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.2 }}
                className="relative bg-white rounded-2xl max-w-2xl w-full overflow-hidden shadow-2xl border border-gray-100"
                onClick={(e) => e.stopPropagation()}
                id="portfolio-lightbox-card"
              >
                {/* Header info */}
                <div className="p-4 border-b border-gray-100 flex items-center justify-between bg-white">
                  <div>
                    <span className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded border mr-2 ${activeItem.badgeColor}`}>
                      {activeItem.type}
                    </span>
                    <span className="text-xs font-semibold text-brand-text-body">{activeItem.project}</span>
                    <h3 className="text-base font-black text-brand-text-dark mt-0.5">
                      {activeItem.title}
                    </h3>
                  </div>
                  <button
                    onClick={() => setActiveItem(null)}
                    className="bg-slate-100 hover:bg-slate-200 text-brand-text-dark p-2 rounded-full transition-colors cursor-pointer"
                    aria-label="Close Lightbox"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* Full Image Area */}
                <div className="p-6 bg-slate-50 flex items-center justify-center min-h-[250px] max-h-[70vh] overflow-hidden">
                  <img
                    src={activeItem.src}
                    alt={activeItem.title}
                    referrerPolicy="no-referrer"
                    className="max-w-full max-h-[55vh] object-contain rounded-lg"
                  />
                </div>

                {/* Footer description details */}
                <div className="p-5 border-t border-gray-100 bg-white flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <p className="text-xs text-brand-text-body leading-relaxed max-w-md">
                    {activeItem.description}
                  </p>
                  <button
                    onClick={() => setActiveItem(null)}
                    className="bg-primary-blue hover:bg-primary-blue/90 text-white font-bold text-xs px-5 py-2.5 rounded-xl transition-colors cursor-pointer text-center whitespace-nowrap"
                  >
                    Close Preview
                  </button>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
