import React, { useState } from "react";
import { ArrowRight, Image as ImageIcon, Sparkles, Check, Play } from "lucide-react";
import { motion } from "motion/react";

interface HeroProps {
  onQuoteClick: () => void;
  onPortfolioClick: () => void;
}

export default function Hero({ onQuoteClick, onPortfolioClick }: HeroProps) {
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);

  const handleMove = (clientX: number, rect: DOMRect) => {
    const x = clientX - rect.left;
    const position = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderPosition(position);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    const container = e.currentTarget.getBoundingClientRect();
    if (e.touches[0]) {
      handleMove(e.touches[0].clientX, container);
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging || e.buttons === 1) {
      const container = e.currentTarget.getBoundingClientRect();
      handleMove(e.clientX, container);
    }
  };

  return (
    <section
      id="home"
      className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden bg-white"
    >
      {/* Background patterns */}
      <div className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none select-none">
        <svg width="100%" height="100%">
          <defs>
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#1E5FBF" strokeWidth="1" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Text Content */}
          <div className="lg:col-span-7 space-y-6 md:space-y-8 text-center lg:text-left" id="hero-text-container">
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-brand-bg-light border border-primary-blue/20 text-primary-blue text-xs font-semibold uppercase tracking-wider"
              id="hero-badge"
            >
              <Sparkles className="w-3.5 h-3.5" />
              100% Manual Hand-Drawn Vectorization
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-brand-text-dark tracking-tight leading-none"
              id="hero-title"
            >
              Turn Low-Res Raster Images into <span className="text-primary-blue">Perfect Vectors</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-lg md:text-xl text-brand-text-body max-w-2xl mx-auto lg:mx-0 leading-relaxed"
              id="hero-description"
            >
              Say goodbye to blurry pixels and jagged edges. We hand-trace your logos, sketches, maps, and artwork into infinitely scalable AI, EPS, SVG, and PDF vector files.
            </motion.p>

            {/* Quick Benefits */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex flex-wrap justify-center lg:justify-start gap-x-6 gap-y-3 pt-2"
              id="hero-benefits"
            >
              <div className="flex items-center gap-2 text-sm text-brand-text-dark font-medium">
                <div className="bg-primary-blue/10 text-primary-blue p-1 rounded-full">
                  <Check className="w-3.5 h-3.5 stroke-[3]" />
                </div>
                Fast 12-24h Delivery
              </div>
              <div className="flex items-center gap-2 text-sm text-brand-text-dark font-medium">
                <div className="bg-primary-blue/10 text-primary-blue p-1 rounded-full">
                  <Check className="w-3.5 h-3.5 stroke-[3]" />
                </div>
                Unlimited Revisions
              </div>
              <div className="flex items-center gap-2 text-sm text-brand-text-dark font-medium">
                <div className="bg-primary-blue/10 text-primary-blue p-1 rounded-full">
                  <Check className="w-3.5 h-3.5 stroke-[3]" />
                </div>
                100% Accuracy Guarantee
              </div>
            </motion.div>

            {/* Actions */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4"
              id="hero-actions"
            >
              <button
                onClick={onQuoteClick}
                className="w-full sm:w-auto bg-primary-blue hover:bg-primary-blue/90 text-white px-8 py-4 rounded-xl font-bold shadow-lg shadow-primary-blue/20 hover:shadow-xl transition-all duration-200 flex items-center justify-center gap-2 group cursor-pointer"
                id="btn-hero-primary"
              >
                Get Your Free Quote
                <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
              </button>
              <button
                onClick={onPortfolioClick}
                className="w-full sm:w-auto bg-white hover:bg-brand-bg-light text-brand-text-dark border-2 border-gray-200 hover:border-primary-blue/30 px-8 py-4 rounded-xl font-bold transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer"
                id="btn-hero-secondary"
              >
                View Portfolio
              </button>
            </motion.div>
          </div>

          {/* Interactive Hero Visual Comparison Slider */}
          <div className="lg:col-span-5 flex flex-col items-center justify-center w-full" id="hero-slider-container">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
              className="w-full max-w-md bg-brand-bg-light p-4 rounded-2xl border border-gray-100 shadow-xl"
            >
              <div
                className="relative h-80 w-full rounded-xl overflow-hidden select-none cursor-ew-resize bg-gray-200 border border-gray-300"
                onMouseMove={handleMouseMove}
                onTouchMove={handleTouchMove}
                onMouseDown={() => setIsDragging(true)}
                onMouseUp={() => setIsDragging(false)}
                onMouseLeave={() => setIsDragging(false)}
                id="before-after-slider-widget"
              >
                {/* Raster (Before) - Background Image */}
                <div className="absolute inset-0 w-full h-full bg-[#EBF1FA] flex flex-col items-center justify-center text-center p-6 filter blur-[0.7px]">
                  {/* Rasterized pixelation mesh overlay */}
                  <div className="absolute inset-0 bg-radial-mesh opacity-[0.4] mix-blend-color-burn" />
                  
                  {/* Pixelated simulated icon */}
                  <div className="w-32 h-32 text-gray-400 stroke-gray-300 relative flex items-center justify-center filter blur-[1.8px] opacity-75">
                    <svg viewBox="0 0 100 100" className="w-full h-full fill-none stroke-[#1E5FBF]/70" strokeWidth="8">
                      <polygon points="50,15 90,85 10,85" />
                      <circle cx="50" cy="55" r="18" />
                    </svg>
                  </div>
                  <div className="mt-4 font-mono text-xs font-bold bg-red-100 text-red-600 px-2 py-1 rounded">
                    RASTER: Blurry, Jagged Pixels
                  </div>
                </div>

                {/* Vector (After) - Overlaid Absolute Image */}
                <div
                  className="absolute inset-y-0 left-0 h-full overflow-hidden bg-brand-bg-light border-r-2 border-primary-blue/80"
                  style={{ width: `${sliderPosition}%` }}
                >
                  <div className="absolute inset-y-0 left-0 w-80 h-full bg-white flex flex-col items-center justify-center text-center p-6" style={{ width: "100%" }}>
                    <div className="absolute inset-0 bg-grid-pattern opacity-[0.04]" />
                    {/* Clean SVG Vector Icon */}
                    <div className="w-32 h-32 relative flex items-center justify-center">
                      <svg viewBox="0 0 100 100" className="w-full h-full fill-none stroke-primary-blue drop-shadow-sm" strokeWidth="8" strokeLinecap="round" strokeLinejoin="round">
                        <polygon points="50,15 90,85 10,85" />
                        <circle cx="50" cy="55" r="18" className="stroke-accent-blue" />
                      </svg>
                    </div>
                    <div className="mt-4 font-mono text-xs font-bold bg-green-100 text-green-700 px-2 py-1 rounded">
                      VECTOR: 100% Sharp & Scalable
                    </div>
                  </div>
                </div>

                {/* Slider Handle Bar */}
                <div
                  className="absolute top-0 bottom-0 pointer-events-none"
                  style={{ left: `calc(${sliderPosition}% - 1px)` }}
                >
                  <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-10 h-10 rounded-full bg-primary-blue hover:bg-primary-blue/90 text-white flex items-center justify-center shadow-lg cursor-pointer border-2 border-white select-none pointer-events-auto">
                    <div className="flex gap-0.5 items-center justify-center">
                      <span className="text-[10px] font-bold">◀</span>
                      <span className="text-[10px] font-bold">▶</span>
                    </div>
                  </div>
                </div>

                {/* Badges */}
                <div className="absolute top-3 left-3 bg-red-600 text-white text-[10px] font-bold px-2 py-0.5 rounded shadow">
                  Before
                </div>
                <div className="absolute top-3 right-3 bg-green-600 text-white text-[10px] font-bold px-2 py-0.5 rounded shadow">
                  After
                </div>
              </div>

              {/* Slider Instruction */}
              <p className="text-center text-xs text-brand-text-body mt-3 font-medium flex items-center justify-center gap-1.5">
                <span className="inline-block w-2 h-2 rounded-full bg-primary-blue animate-ping" />
                Drag the center slider to inspect vector precision
              </p>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}
