import React, { useState } from "react";
import { ArrowRight, Sparkles, Maximize2, X } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface FeaturedItem {
  id: string;
  src: string;
  title: string;
  project: string;
  description: string;
}

interface FeaturedPortfolioProps {
  onPortfolioClick: () => void;
}

export default function FeaturedPortfolio({ onPortfolioClick }: FeaturedPortfolioProps) {
  const [zoomedImage, setZoomedImage] = useState<FeaturedItem | null>(null);

  const featuredItems: FeaturedItem[] = [
    {
      id: "drive-sync-01",
      src: "https://lh3.googleusercontent.com/d/1-50hbklAoHSsct9MBx0QTTwldFuvofmq",
      title: "Sync Logo Design",
      project: "Sync Branding",
      description: "Modern geometric vector tracing of the Sync company mark with clean corporate shapes."
    },
    {
      id: "drive-portfolio-01",
      src: "https://lh3.googleusercontent.com/d/10bXsA4ji8Ub-U5YkfEJoz4un3eKwFnIW",
      title: "Creative Art Emblem",
      project: "Vibrant Art Portfolio",
      description: "Detailed vector trace of custom artwork displaying vivid colors and ultra-precise gradients."
    },
    {
      id: "drive-portfolio-02",
      src: "https://lh3.googleusercontent.com/d/1E0FEtlZVJ8gD2RdJitcnT_VoGhvC8MLM",
      title: "Modern Crest Design",
      project: "Corporate Identity",
      description: "Stunning vector reconstruction of a professional crest with crisp, perfect curves."
    },
    {
      id: "drive-portfolio-03",
      src: "https://lh3.googleusercontent.com/d/1zkPvcP3CxtEVen2z429TdQicwQpytqi9",
      title: "Dynamic Sports Mascot",
      project: "Athletics Division",
      description: "A high-intensity mascot badge traced perfectly to serve as scalable tournament merchandise."
    },
    {
      id: "drive-portfolio-04",
      src: "https://lh3.googleusercontent.com/d/1S8IiOa2wA39IvEfcf4Zdv_z0Oi51bAjc",
      title: "Sleek Brand Monogram",
      project: "Luxury Apparel",
      description: "Tracing of an elegant premium fashion monogram with pristine typographic details."
    },
    {
      id: "drive-portfolio-16",
      src: "https://lh3.googleusercontent.com/d/18pZ28a2B1wMPj8azMC95mYR7M7aIrRjl",
      title: "Compass Adventure Mark",
      project: "Outdoor Gear",
      description: "Stylized nautical compass logo trace showcasing beautiful geometric linework and rugged details."
    }
  ];

  return (
    <section id="featured-portfolio" className="py-20 md:py-28 bg-brand-bg-light/40 relative overflow-hidden">
      <AnimatePresence>
        {zoomedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 p-4"
            onClick={() => setZoomedImage(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative max-w-5xl w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setZoomedImage(null)}
                className="absolute -top-12 right-0 p-2 text-white hover:text-gray-300 transition-colors"
              >
                <X className="w-8 h-8" />
              </button>
              <img
                src={zoomedImage.src}
                alt={zoomedImage.title}
                className="w-full h-auto rounded-lg shadow-2xl"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Visual background details */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary-blue/5 rounded-full filter blur-3xl pointer-events-none -mr-48 -mt-48" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-accent-blue/5 rounded-full filter blur-3xl pointer-events-none -ml-48 -mb-48" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary-blue/10 border border-primary-blue/20 text-primary-blue text-xs font-semibold uppercase tracking-wider"
          >
            <Sparkles className="w-3.5 h-3.5 text-primary-blue animate-pulse" />
            Curated Masterpieces
          </motion.div>
          
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-brand-text-dark tracking-tight"
          >
            Featured Vector Works
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-brand-text-body/80 text-lg sm:text-xl leading-relaxed"
          >
            A sneak peek at our recent hand-drawn vectorizations. View the absolute sharpness and pixel-perfect quality of our vector recreation services.
          </motion.p>
        </div>

        {/* Portfolio Showcase Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {featuredItems.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -8 }}
              className="bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-md hover:shadow-xl transition-all duration-300 flex flex-col group h-full"
              id={`featured-card-${item.id}`}
            >
              {/* Image Stage */}
              <div className="relative aspect-square overflow-hidden bg-[#fafafa] flex items-center justify-center border-b border-gray-100">
                <img
                  src={item.src}
                  alt={item.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-105 p-0"
                  id={`featured-img-${item.id}`}
                />
                
                {/* Overlay on Hover */}
                <div className="absolute inset-0 bg-brand-text-dark/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <button
                    onClick={() => setZoomedImage(item)}
                    className="p-3 bg-white/20 backdrop-blur-sm rounded-full text-white hover:bg-white/40 transition-colors"
                  >
                    <Maximize2 className="w-6 h-6" />
                  </button>
                </div>
              </div>

              {/* Text Info */}
              <div className="p-6 flex-1 flex flex-col justify-between">
                <div className="space-y-2">
                  <span className="text-xs font-semibold text-primary-blue tracking-wider uppercase">
                    {item.project}
                  </span>
                  <h3 className="text-lg font-bold text-brand-text-dark group-hover:text-primary-blue transition-colors duration-200">
                    {item.title}
                  </h3>
                  <p className="text-sm text-brand-text-body/70 line-clamp-2">
                    {item.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* View All CTA */}
        <div className="text-center">
          <motion.button
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            onClick={onPortfolioClick}
            className="inline-flex items-center gap-2 bg-primary-blue hover:bg-primary-blue/90 text-white font-bold px-8 py-4 rounded-xl shadow-lg shadow-primary-blue/20 hover:shadow-xl transition-all duration-200 group cursor-pointer"
            id="btn-view-all-featured"
          >
            Explore Our Portfolio
            <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1.5" />
          </motion.button>
        </div>

      </div>
    </section>
  );
}
