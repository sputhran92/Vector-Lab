import React, { useState, useEffect } from "react";
import { Paintbrush, Check, X, ShieldAlert, Sliders, ChevronDown, ChevronUp, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface DesignPreset {
  id: string;
  name: string;
  description: string;
  primary: string;
  accent: string;
  bgLight: string;
  textDark: string;
  textBody: string;
}

export default function DesignSelector() {
  const presets: DesignPreset[] = [
    {
      id: "classic",
      name: "Classic Lab Blue",
      description: "Our default professional corporate vector identity",
      primary: "#1E5FBF",
      accent: "#4A90E2",
      bgLight: "#F5F8FC",
      textDark: "#1A2332",
      textBody: "#4A5568",
    },
    {
      id: "midnight",
      name: "Midnight Slate",
      description: "Modern dark aesthetic with sharp high-contrast cyan",
      primary: "#0F172A",
      accent: "#38BDF8",
      bgLight: "#F1F5F9",
      textDark: "#1E293B",
      textBody: "#475569",
    },
    {
      id: "emerald",
      name: "Emerald Precision",
      description: "Clean organic forest green for eco-conscious designs",
      primary: "#059669",
      accent: "#34D399",
      bgLight: "#F0FDF4",
      textDark: "#064E3B",
      textBody: "#374151",
    },
    {
      id: "sunset",
      name: "Sunset Coral",
      description: "Energetic rose & warm coral for lifestyle brands",
      primary: "#E11D48",
      accent: "#FB7185",
      bgLight: "#FFF1F2",
      textDark: "#4C0519",
      textBody: "#5C0F22",
    },
    {
      id: "royal",
      name: "Indigo Royal",
      description: "Cyberpunk royal violet for apparel & tech groups",
      primary: "#6366F1",
      accent: "#A5B4FC",
      bgLight: "#EEF2FF",
      textDark: "#1E1B4B",
      textBody: "#312E81",
    },
  ];

  const [activePreset, setActivePreset] = useState("classic");
  const [isVisible, setIsVisible] = useState(true);
  const [minimized, setMinimized] = useState(false);

  // Apply CSS variables to root element on change
  useEffect(() => {
    const selected = presets.find((p) => p.id === activePreset);
    if (selected) {
      const root = document.documentElement;
      root.style.setProperty("--primary-blue", selected.primary);
      root.style.setProperty("--accent-blue", selected.accent);
      root.style.setProperty("--brand-bg-light", selected.bgLight);
      root.style.setProperty("--brand-text-dark", selected.textDark);
      root.style.setProperty("--brand-text-body", selected.textBody);
    }
  }, [activePreset]);

  const handleSelectPreset = (presetId: string) => {
    setActivePreset(presetId);
  };

  const handleSkip = () => {
    setIsVisible(false);
  };

  const handleKeep = () => {
    setIsVisible(false);
  };

  return (
    <>
      {/* Banner / Selector Panel */}
      <AnimatePresence>
        {isVisible && (
          <motion.div
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -100, opacity: 0 }}
            transition={{ type: "spring", stiffness: 120, damping: 20 }}
            className="fixed top-0 left-0 w-full bg-white border-b-2 border-primary-blue/30 shadow-2xl z-[100] py-4 px-4 sm:px-6 lg:px-8"
            id="design-selector-banner"
          >
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
              
              {/* Header Info */}
              <div className="flex items-center gap-3 text-center md:text-left">
                <div className="bg-primary-blue/10 p-2 rounded-xl text-primary-blue flex-shrink-0 animate-pulse">
                  <Paintbrush className="w-5 h-5 stroke-[2.5]" />
                </div>
                <div>
                  <h4 className="font-extrabold text-brand-text-dark text-base flex items-center justify-center md:justify-start gap-1.5">
                    <Sparkles className="w-4 h-4 text-primary-blue" />
                    Select Your Preferred Design Template
                  </h4>
                  <p className="text-xs text-brand-text-body">
                    Switch between 5 professional brand palettes live! Select a layout style or skip to keep default.
                  </p>
                </div>
              </div>

              {/* Preset Color Swatches */}
              <div className="flex flex-wrap items-center justify-center gap-3" id="preset-swatches-wrapper">
                {presets.map((preset) => (
                  <button
                    key={preset.id}
                    onClick={() => handleSelectPreset(preset.id)}
                    className={`flex items-center gap-2 px-3 py-2 rounded-xl border transition-all cursor-pointer ${
                      activePreset === preset.id
                        ? "border-primary-blue bg-primary-blue/5 shadow-xs font-bold scale-105"
                        : "border-gray-200 hover:border-primary-blue/20 bg-gray-50/50 hover:bg-white"
                    }`}
                    title={preset.description}
                  >
                    {/* Circle Swatch preview */}
                    <div className="flex items-center">
                      <div
                        className="w-4.5 h-4.5 rounded-full border border-white shadow-xs"
                        style={{ backgroundColor: preset.primary }}
                      />
                      <div
                        className="w-3.5 h-3.5 rounded-full border border-white shadow-xs -ml-1.5"
                        style={{ backgroundColor: preset.accent }}
                      />
                    </div>
                    <span className="text-xs text-brand-text-dark">
                      {preset.name}
                    </span>
                    {activePreset === preset.id && (
                      <Check className="w-3.5 h-3.5 text-primary-blue stroke-[3]" />
                    )}
                  </button>
                ))}
              </div>

              {/* Selection Control Actions */}
              <div className="flex items-center gap-2">
                <button
                  onClick={handleKeep}
                  className="bg-primary-blue hover:bg-primary-blue/90 text-white font-bold text-xs py-2 px-4 rounded-lg shadow-sm hover:shadow-md transition-all cursor-pointer"
                >
                  Select & Keep
                </button>
                <button
                  onClick={handleSkip}
                  className="bg-gray-100 hover:bg-gray-200 text-gray-600 font-bold text-xs py-2 px-4 rounded-lg transition-all cursor-pointer"
                >
                  Skip
                </button>
              </div>

            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Gear / Customizer Trigger button in the corner to always let them reopen it */}
      {!isVisible && (
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="fixed bottom-6 right-6 z-[90]"
          id="design-reopen-trigger"
        >
          <button
            onClick={() => setIsVisible(true)}
            className="bg-primary-blue hover:bg-primary-blue/90 text-white p-3.5 rounded-full shadow-lg shadow-primary-blue/35 hover:scale-105 transition-all flex items-center gap-2 group cursor-pointer border border-white/20"
            title="Choose Another Design Preset"
          >
            <Paintbrush className="w-5 h-5 animate-spin-slow" />
            <span className="max-w-0 overflow-hidden group-hover:max-w-xs transition-all duration-300 font-bold text-xs whitespace-nowrap">
              Change Design Vibe
            </span>
          </button>
        </motion.div>
      )}
    </>
  );
}
