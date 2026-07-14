import { useState } from "react";
import { Layers, ZoomIn, Eye, ArrowRight, X, Sparkles, HelpCircle } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface PortfolioItem {
  id: string;
  title: string;
  category: string;
  difficulty: "Simple" | "Medium" | "Complex";
  beforeDesc: string;
  afterDesc: string;
  details: string;
  // Custom mock visual colors / types
  colorTheme: string;
  iconType: "tech" | "phoenix" | "apparel" | "map" | "racing" | "banner";
}

export default function Portfolio() {
  const [activeFilter, setActiveFilter] = useState("All");
  const [selectedItem, setSelectedItem] = useState<PortfolioItem | null>(null);

  const categories = ["All", "Logos", "Sketches", "Banners", "Apparel", "Maps"];

  const portfolioItems: PortfolioItem[] = [
    {
      id: "proj-1",
      title: "TechCorp Brand Logo",
      category: "Logos",
      difficulty: "Simple",
      beforeDesc: "Low-res 120x80px fuzzy web GIF",
      afterDesc: "Infinitely scalable SVG with clean geometry",
      details: "Client lost original vector source files for their main corporate logo. Recreated by hand with precise geometric alignment in under 4 hours.",
      colorTheme: "#1E5FBF",
      iconType: "tech"
    },
    {
      id: "proj-2",
      title: "Phoenix Mascot Sketch",
      category: "Sketches",
      difficulty: "Complex",
      beforeDesc: "Hand-drawn paper scan with shadows & smudges",
      afterDesc: "Production-ready vector line art & coloring",
      details: "Transformed a raw graphite sketch on textured notebook paper into a pristine, colored vector mascot. Optimized with custom ink strokes and flat pantone color fillings.",
      colorTheme: "#E05A47",
      iconType: "phoenix"
    },
    {
      id: "proj-3",
      title: "Retail Shop Signage",
      category: "Banners",
      difficulty: "Medium",
      beforeDesc: "Smartphone photo of an old storefront board",
      afterDesc: "150 DPI ready 40ft billboard vector file",
      details: "Digitized an existing physical shop sign from an angled mobile photo. Compensated for perspective distortion and matched retro font styles perfectly.",
      colorTheme: "#10B981",
      iconType: "banner"
    },
    {
      id: "proj-4",
      title: "Retro Cafe T-Shirt Emblem",
      category: "Apparel",
      difficulty: "Medium",
      beforeDesc: "Scanned vintage coffee mug printing",
      afterDesc: "Pruned screen-ready ink separation (3-color limit)",
      details: "Converted a blurry logo printed on a vintage ceramic mug into high-quality vector artwork tailored specifically for screen-printing mesh counts.",
      colorTheme: "#D97706",
      iconType: "apparel"
    },
    {
      id: "proj-5",
      title: "State Park Hiking Trails",
      category: "Maps",
      difficulty: "Complex",
      beforeDesc: "Faded, pixelated map screenshot from 2004",
      afterDesc: "Clean vector paths, modern iconography & typography",
      details: "Vectorized an ancient raster map of state park trails. Traced topographic elevation lines, trail tracks, and designed custom SVG icons for landmarks.",
      colorTheme: "#059669",
      iconType: "map"
    },
    {
      id: "proj-6",
      title: "Apex Racing Team Badge",
      category: "Logos",
      difficulty: "Medium",
      beforeDesc: "Compressed WhatsApp avatar image",
      afterDesc: "Smooth sporty gradient vector graphic",
      details: "Reconstructed a highly-compressed social media avatar into a razor-sharp racing mascot. Hand-adjusted complex dynamic curves and speed lines.",
      colorTheme: "#6366F1",
      iconType: "racing"
    },
    {
      id: "proj-7",
      title: "Eco-Earth Banner Asset",
      category: "Banners",
      difficulty: "Simple",
      beforeDesc: "Fuzzy raster graphic with compression noise",
      afterDesc: "Perfect geometric curves and scalable assets",
      details: "Cleaned up a noisy raster graphic to be printed on pull-up banner displays. Rebuilt background leaves, typography, and logo badge.",
      colorTheme: "#059669",
      iconType: "banner"
    },
    {
      id: "proj-8",
      title: "Custom Apparel Illustration",
      category: "Apparel",
      difficulty: "Complex",
      beforeDesc: "Pencil concept sketch of a roaring tiger",
      afterDesc: "Pruned embroidery-ready clean thread path file",
      details: "Traced a highly detailed ink-and-pencil tiger sketch, keeping stroke counts optimal and overlapping elements grouped for custom apparel embroidery machines.",
      colorTheme: "#B45309",
      iconType: "apparel"
    }
  ];

  const filteredItems = activeFilter === "All"
    ? portfolioItems
    : portfolioItems.filter(item => item.category === activeFilter);

  // Custom SVG generator inside placeholders to make them look authentic and cool
  const renderMockup = (type: string, isAfter: boolean, themeColor: string) => {
    const filterClass = isAfter ? "" : "blur-[1.5px] opacity-75 grayscale-[20%]";
    const pixelOverlay = !isAfter && (
      <div className="absolute inset-0 bg-radial-mesh opacity-[0.35] mix-blend-color-burn pointer-events-none" />
    );

    return (
      <div className={`relative w-full h-40 flex flex-col items-center justify-center p-4 overflow-hidden transition-all duration-300 ${isAfter ? "bg-white" : "bg-gray-100"}`}>
        {pixelOverlay}
        
        {/* Mock Graphic Content */}
        <div className={`w-20 h-20 flex items-center justify-center transition-all ${filterClass}`}>
          {type === "tech" && (
            <svg viewBox="0 0 100 100" className="w-full h-full fill-none" stroke={themeColor} strokeWidth={isAfter ? "6" : "5"}>
              <rect x="25" y="25" width="50" height="50" rx={isAfter ? "8" : "0"} />
              <circle cx="50" cy="50" r="16" />
              <path d="M50,10 L50,25 M50,75 L50,90 M10,50 L25,50 M75,50 L90,50" strokeLinecap="round" />
            </svg>
          )}

          {type === "phoenix" && (
            <svg viewBox="0 0 100 100" className="w-full h-full fill-none" stroke={themeColor} strokeWidth={isAfter ? "5" : "4"}>
              <path d="M10,50 C25,20 75,20 90,50 C70,40 50,40 50,50 C50,60 60,70 50,85 C40,70 10,60 10,50 Z" />
              <circle cx="50" cy="30" r="6" fill={isAfter ? themeColor : "none"} />
            </svg>
          )}

          {type === "banner" && (
            <svg viewBox="0 0 100 100" className="w-full h-full fill-none" stroke={themeColor} strokeWidth="6" strokeLinecap="round">
              <path d="M15,30 H85 L65,70 H35 Z" />
              <path d="M25,45 H75" stroke={isAfter ? "#4A90E2" : "gray"} strokeWidth="4" />
            </svg>
          )}

          {type === "apparel" && (
            <svg viewBox="0 0 100 100" className="w-full h-full fill-none" stroke={themeColor} strokeWidth="5" strokeLinecap="round">
              <circle cx="50" cy="50" r="32" strokeDasharray={isAfter ? "0" : "4 4"} />
              <path d="M30,50 Q50,20 70,50 T30,50" />
            </svg>
          )}

          {type === "map" && (
            <svg viewBox="0 0 100 100" className="w-full h-full fill-none" stroke={themeColor} strokeWidth={isAfter ? "4" : "3"}>
              <path d="M15,15 L35,45 L65,25 L85,75" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M15,85 L45,65 L75,85" stroke={isAfter ? "#4A90E2" : "gray"} strokeLinecap="round" />
              <circle cx="35" cy="45" r="5" fill={isAfter ? "red" : "none"} />
              <circle cx="85" cy="75" r="5" fill={isAfter ? "green" : "none"} />
            </svg>
          )}

          {type === "racing" && (
            <svg viewBox="0 0 100 100" className="w-full h-full fill-none" stroke={themeColor} strokeWidth="7" strokeLinecap="round" strokeLinejoin="round">
              <path d="M15,75 L85,25" />
              <path d="M25,55 L85,25 L55,85" stroke={isAfter ? "#4A90E2" : "gray"} strokeWidth="4" />
            </svg>
          )}
        </div>

        {/* Scalability Indicator Line (Only on Vector) */}
        {isAfter && (
          <div className="absolute bottom-2 right-2 flex items-center gap-1 bg-green-50 px-1.5 py-0.5 rounded text-[8px] font-mono text-green-700 border border-green-200">
            <Sparkles className="w-2.5 h-2.5" />
            VEC (AI)
          </div>
        )}
        {!isAfter && (
          <div className="absolute bottom-2 left-2 bg-red-50 px-1.5 py-0.5 rounded text-[8px] font-mono text-red-600 border border-red-200">
            RAS (PNG)
          </div>
        )}
      </div>
    );
  };

  return (
    <section
      id="portfolio"
      className="py-20 md:py-28 bg-white"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-4" id="portfolio-header">
          <span className="text-primary-blue text-xs font-bold uppercase tracking-widest bg-primary-blue/10 px-3 py-1 rounded-full">
            Before & After Showcase
          </span>
          <h2 className="text-3xl md:text-4xl font-extrabold text-brand-text-dark tracking-tight">
            Our Vector Tracing Portfolio
          </h2>
          <p className="text-brand-text-body text-base md:text-lg leading-relaxed">
            Take a look at real simulated recreation results. Hover or click each showcase card to examine our hand-drawn vector coordinate precision.
          </p>
        </div>

        {/* Filter Tab Bar */}
        <div className="flex flex-wrap justify-center gap-2 mb-12" id="portfolio-filter-tabs">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveFilter(category)}
              className={`px-5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 cursor-pointer ${
                activeFilter === category
                  ? "bg-primary-blue text-white shadow-md shadow-primary-blue/10"
                  : "bg-brand-bg-light text-brand-text-body hover:bg-gray-100 hover:text-brand-text-dark border border-gray-100"
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Showcase Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8" id="portfolio-grid">
          {filteredItems.map((item) => (
            <motion.div
              layout
              key={item.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.35 }}
              className="bg-white rounded-xl border border-gray-100 overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col group cursor-pointer"
              onClick={() => setSelectedItem(item)}
              id={`portfolio-card-${item.id}`}
            >
              
              {/* Comparative Before/After Side-by-Side Area */}
              <div className="grid grid-cols-2 border-b border-gray-100 relative">
                {/* Before Panel */}
                <div>
                  {renderMockup(item.iconType, false, item.colorTheme)}
                  <div className="absolute bottom-2 left-2 z-10 font-mono text-[9px] font-bold bg-gray-900/10 text-brand-text-dark px-1.5 py-0.5 rounded backdrop-blur-[2px]">
                    Raster Before
                  </div>
                </div>

                {/* After Panel */}
                <div className="border-l border-gray-100">
                  {renderMockup(item.iconType, true, item.colorTheme)}
                  <div className="absolute bottom-2 right-2 z-10 font-mono text-[9px] font-bold bg-primary-blue/10 text-primary-blue px-1.5 py-0.5 rounded backdrop-blur-[2px]">
                    Vector After
                  </div>
                </div>

                {/* Center Hover Ring overlay */}
                <div className="absolute inset-0 bg-primary-blue/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center pointer-events-none">
                  <div className="bg-white p-2.5 rounded-full shadow-md text-primary-blue scale-90 group-hover:scale-100 transition-transform duration-300">
                    <ZoomIn className="w-5 h-5" />
                  </div>
                </div>
              </div>

              {/* Text Card Body */}
              <div className="p-5 flex-grow flex flex-col justify-between">
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-[10px] font-bold text-primary-blue uppercase bg-primary-blue/5 px-2 py-0.5 rounded-full">
                      {item.category}
                    </span>
                    <span className="text-[10px] font-medium text-gray-400">
                      Difficulty: <strong className="text-brand-text-dark">{item.difficulty}</strong>
                    </span>
                  </div>
                  <h3 className="font-bold text-brand-text-dark text-base group-hover:text-primary-blue transition-colors duration-200">
                    {item.title}
                  </h3>
                  <p className="text-xs text-brand-text-body line-clamp-2">
                    {item.details}
                  </p>
                </div>

                <div className="pt-4 mt-4 border-t border-gray-50 flex items-center justify-between text-xs font-bold text-primary-blue group-hover:text-accent-blue transition-colors">
                  <span>View conversion specs</span>
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
                </div>
              </div>

            </motion.div>
          ))}
        </div>

        {/* Enlarged Specs Overlay Modal */}
        <AnimatePresence>
          {selectedItem && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-900/60 backdrop-blur-xs">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.25 }}
                className="bg-white rounded-2xl max-w-2xl w-full overflow-hidden shadow-2xl border border-gray-100 relative"
                id="portfolio-detail-modal"
              >
                {/* Close Button */}
                <button
                  onClick={() => setSelectedItem(null)}
                  className="absolute top-4 right-4 z-10 bg-gray-100 hover:bg-gray-200 text-gray-500 hover:text-gray-700 p-1.5 rounded-full transition-colors cursor-pointer"
                  id="btn-close-modal"
                >
                  <X className="w-5 h-5" />
                </button>

                {/* Comparative Header Showcase */}
                <div className="grid grid-cols-2 bg-brand-bg-light border-b border-gray-100">
                  <div className="p-6 flex flex-col items-center justify-center border-r border-gray-100">
                    <span className="text-[10px] font-mono font-bold text-red-600 bg-red-50 border border-red-200 px-2 py-0.5 rounded-md mb-2">
                      Original Input File
                    </span>
                    {renderMockup(selectedItem.iconType, false, selectedItem.colorTheme)}
                    <p className="text-xs font-medium text-brand-text-body mt-2 text-center">
                      {selectedItem.beforeDesc}
                    </p>
                  </div>

                  <div className="p-6 flex flex-col items-center justify-center">
                    <span className="text-[10px] font-mono font-bold text-green-700 bg-green-50 border border-green-200 px-2 py-0.5 rounded-md mb-2">
                      Final Hand-Traced Output
                    </span>
                    {renderMockup(selectedItem.iconType, true, selectedItem.colorTheme)}
                    <p className="text-xs font-medium text-primary-blue mt-2 text-center">
                      {selectedItem.afterDesc}
                    </p>
                  </div>
                </div>

                {/* Specs Details Body */}
                <div className="p-6 md:p-8 space-y-4">
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-white bg-primary-blue px-3 py-1 rounded-full">
                        {selectedItem.category}
                      </span>
                      <span className="text-xs font-medium text-gray-500">
                        Task Complexity: <strong className="text-brand-text-dark">{selectedItem.difficulty}</strong>
                      </span>
                    </div>
                    <span className="text-xs text-green-600 font-bold bg-green-50 border border-green-100 px-2.5 py-1 rounded-md">
                      ✓ Hand-Drawn Anchors Only
                    </span>
                  </div>

                  <h3 className="text-2xl font-extrabold text-brand-text-dark">
                    {selectedItem.title}
                  </h3>
                  
                  <p className="text-brand-text-body text-sm leading-relaxed">
                    {selectedItem.details}
                  </p>

                  <div className="bg-brand-bg-light p-4 rounded-xl border border-gray-100 space-y-2">
                    <h4 className="text-xs font-bold text-brand-text-dark uppercase tracking-wider">
                      Supplied Vector Deliverables:
                    </h4>
                    <p className="text-xs text-brand-text-body">
                      Our vectors are configured with optimized paths, closed shapes, neat color groupings, and standard embedded Pantone/CMYK definitions.
                    </p>
                    <div className="flex gap-2 flex-wrap pt-1">
                      {["AI (Adobe Illustrator CC)", "EPS (Print Legacy)", "SVG (Web Graphics)", "High-Res Transparent PNG", "Print PDF"].map((fmt) => (
                        <span key={fmt} className="bg-white border border-gray-200 text-brand-text-dark text-[10px] font-bold px-2 py-1 rounded">
                          {fmt}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="pt-4 flex justify-end">
                    <button
                      onClick={() => setSelectedItem(null)}
                      className="bg-primary-blue hover:bg-primary-blue/90 text-white font-bold text-sm px-6 py-2.5 rounded-lg transition-colors cursor-pointer"
                    >
                      Done, Close Specs
                    </button>
                  </div>
                </div>

              </motion.div>
            </div>
          )}
        </AnimatePresence>

      </div>
    </section>
  );
}
