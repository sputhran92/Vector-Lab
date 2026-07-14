import React, { useState, useEffect } from "react";
import { X, ZoomIn, ArrowLeft, ShieldCheck, Eye, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { useNavigate } from "react-router-dom";

// Local image imports for the provided project assets

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
      id: "drive-sync-01",
      src: "https://lh3.googleusercontent.com/d/1-50hbklAoHSsct9MBx0QTTwldFuvofmq",
      title: "Sync Logo Design",
      type: "Traced Vector",
      project: "Sync Branding",
      badgeColor: "bg-green-50 text-green-700 border-green-100",
      description: "Modern geometric vector tracing of the Sync company mark with clean corporate shapes."
    },
    {
      id: "drive-portfolio-01",
      src: "https://lh3.googleusercontent.com/d/10bXsA4ji8Ub-U5YkfEJoz4un3eKwFnIW",
      title: "Creative Art Emblem",
      type: "Traced Vector",
      project: "Vibrant Art Portfolio",
      badgeColor: "bg-green-50 text-green-700 border-green-100",
      description: "Detailed vector trace of custom artwork displaying vivid colors and ultra-precise gradients."
    },
    {
      id: "drive-portfolio-02",
      src: "https://lh3.googleusercontent.com/d/147DXgEtNhmXqVrrr-E2evjdWRx-CH6cd",
      title: "Modern Crest Design",
      type: "Traced Vector",
      project: "Corporate Identity",
      badgeColor: "bg-green-50 text-green-700 border-green-100",
      description: "Stunning vector reconstruction of a professional crest with crisp, perfect curves."
    },
    {
      id: "drive-portfolio-03",
      src: "https://lh3.googleusercontent.com/d/14WE-VrL5YYJUXrj5wvuCovUZFej93ehc",
      title: "Dynamic Sports Mascot",
      type: "Traced Vector",
      project: "Athletics Division",
      badgeColor: "bg-green-50 text-green-700 border-green-100",
      description: "A high-intensity mascot badge traced perfectly to serve as scalable tournament merchandise."
    },
    {
      id: "drive-portfolio-04",
      src: "https://lh3.googleusercontent.com/d/16HO-t2MmNnKls0W_ewuqISaTXolKUXWV",
      title: "Sleek Brand Monogram",
      type: "Traced Vector",
      project: "Luxury Apparel",
      badgeColor: "bg-green-50 text-green-700 border-green-100",
      description: "Tracing of an elegant premium fashion monogram with pristine typographic details."
    },
    {
      id: "drive-logo-01-3",
      src: "https://lh3.googleusercontent.com/d/17jLN3WaTlgqDkTfj0ywnbEbOmtMqge1g",
      title: "Geometric Compass Logo",
      type: "Traced Vector",
      project: "Adventure Equipment",
      badgeColor: "bg-green-50 text-green-700 border-green-100",
      description: "Circular emblem representing directions, adventure, and exploration, traced into high-precision vector."
    },
    {
      id: "drive-portfolio-05",
      src: "https://lh3.googleusercontent.com/d/182d5cBmIiPGEUhtQqVXvTUgquhblCgIZ",
      title: "Handcrafted Retro Badge",
      type: "Traced Vector",
      project: "Artisanal Coffee",
      badgeColor: "bg-green-50 text-green-700 border-green-100",
      description: "Authentic vintage badge layout converted with precise paths to preserve handcrafted typography."
    },
    {
      id: "drive-logo-01-1",
      src: "https://lh3.googleusercontent.com/d/18pZ28a2B1wMPj8azMC95mYR7M7aIrRjl",
      title: "Tech Forward Insignia",
      type: "Traced Vector",
      project: "Software Innovation",
      badgeColor: "bg-green-50 text-green-700 border-green-100",
      description: "A clean vector emblem with isometric symmetry, perfect for software product icons."
    },
    {
      id: "drive-portfolio-06",
      src: "https://lh3.googleusercontent.com/d/1E0FEtlZVJ8gD2RdJitcnT_VoGhvC8MLM",
      title: "Minimalist Circle Mark",
      type: "Traced Vector",
      project: "Aviation Tech",
      badgeColor: "bg-green-50 text-green-700 border-green-100",
      description: "Circular geometric insignia designed with exact mathematical ratios and beautiful curves."
    },
    {
      id: "drive-portfolio-07",
      src: "https://lh3.googleusercontent.com/d/1F24RtnGKvNvsusuR1ExoVFupAsCW2ooL",
      title: "Corporate Shield Vector",
      type: "Traced Vector",
      project: "Trust & Security",
      badgeColor: "bg-green-50 text-green-700 border-green-100",
      description: "Polished corporate shield emblem featuring flat design guidelines and absolute symmetrical paths."
    },
    {
      id: "drive-portfolio-08",
      src: "https://lh3.googleusercontent.com/d/1Fr13IYS3Om8h3O_-VQaqNSPbYCbk47GK",
      title: "Modern Signature Icon",
      type: "Traced Vector",
      project: "Personal Branding",
      badgeColor: "bg-green-50 text-green-700 border-green-100",
      description: "Elegant personal signature stylized into a clean vector overlay for photography watermarking."
    },
    {
      id: "drive-portfolio-09",
      src: "https://lh3.googleusercontent.com/d/1HvbN0foEdD5ZW0NpiahEciCmfxkil6RT",
      title: "Vibrant Mascot Emblem",
      type: "Traced Vector",
      project: "Esports League",
      badgeColor: "bg-green-50 text-green-700 border-green-100",
      description: "High-fidelity esports gaming mascot illustration tracing with bold outlines and cell shading."
    },
    {
      id: "drive-portfolio-10",
      src: "https://lh3.googleusercontent.com/d/1J6kvWb_5RitiTYJMsDTZIF_E1Gk4r6HZ",
      title: "Futuristic Cyber Logo",
      type: "Traced Vector",
      project: "NextGen Consulting",
      badgeColor: "bg-green-50 text-green-700 border-green-100",
      description: "Sleek high-tech geometric cyber logo tracing featuring neon highlights and sharp corners."
    },
    {
      id: "drive-portfolio-11",
      src: "https://lh3.googleusercontent.com/d/1L10gM0W3srub4JDzwFGCq9J63_MEj9zP",
      title: "Elegant Wedding Crest",
      type: "Traced Vector",
      project: "Luxury Stationery",
      badgeColor: "bg-green-50 text-green-700 border-green-100",
      description: "Exquisite wedding crest emblem traced with delicate script monograms and fine floral lines."
    },
    {
      id: "drive-mgo-logo-1",
      src: "https://lh3.googleusercontent.com/d/1L15Pj7GRCBoD5UYnz7axbT0eXg4TyULw",
      title: "MGO Athletics Logo",
      type: "Traced Vector",
      project: "MGO Apparel",
      badgeColor: "bg-green-50 text-green-700 border-green-100",
      description: "Dynamic sporting seal traced with bold typography and highly detailed emblem artwork."
    },
    {
      id: "drive-portfolio-12",
      src: "https://lh3.googleusercontent.com/d/1LGiU4Sm5mYid4TxzEqNwbCrrEviDhgtZ",
      title: "Circular Seals & Stamps",
      type: "Traced Vector",
      project: "Classic Heritage",
      badgeColor: "bg-green-50 text-green-700 border-green-100",
      description: "Classic round heritage seal reconstructed in clean vector format, perfect for packaging labels."
    },
    {
      id: "drive-portfolio-13",
      src: "https://lh3.googleusercontent.com/d/1OATZSkR89RVTtqVljBDX8cXN-P-NZPOM",
      title: "Golden Ratio Geometry",
      type: "Traced Vector",
      project: "Architectural Design",
      badgeColor: "bg-green-50 text-green-700 border-green-100",
      description: "Detailed abstract circular layout constructed using perfect golden ratios and thin technical vectors."
    },
    {
      id: "drive-portfolio-14",
      src: "https://lh3.googleusercontent.com/d/1OBjPirNy6Gr-3lmdqxiwFsPY3iHFW7_t",
      title: "Dynamic Ribbon Monogram",
      type: "Traced Vector",
      project: "Creative Studio",
      badgeColor: "bg-green-50 text-green-700 border-green-100",
      description: "Beautiful interlacing ribbon style typography monogram logo design with rich detailed gradient mappings."
    },
    {
      id: "drive-portfolio-15",
      src: "https://lh3.googleusercontent.com/d/1P9AIcRbq3NXwWW0wuyveMPQ4Mb44FtX1",
      title: "Crest of Excellence",
      type: "Traced Vector",
      project: "Prestigious Academy",
      badgeColor: "bg-green-50 text-green-700 border-green-100",
      description: "Academic and professional crest design traced with high complexity detailing and royal gold colors."
    },
    {
      id: "drive-portfolio-16",
      src: "https://lh3.googleusercontent.com/d/1Qoj8-d3DBFanXRgsmlN88Ajw7Mam9EXW",
      title: "Compass Adventure Mark",
      type: "Traced Vector",
      project: "Outdoor Gear",
      badgeColor: "bg-green-50 text-green-700 border-green-100",
      description: "Stylized nautical compass logo trace showcasing beautiful geometric linework and rugged details."
    },
    {
      id: "drive-portfolio-17",
      src: "https://lh3.googleusercontent.com/d/1QqxGvnmumBJZRtyd05NCBMdQur4yBkde",
      title: "Organic Botanical Emblem",
      type: "Traced Vector",
      project: "Natura Wellness",
      badgeColor: "bg-green-50 text-green-700 border-green-100",
      description: "Vibrant wellness industry emblem displaying clean hand-drawn botanical lines in vector form."
    },
    {
      id: "drive-portfolio-18",
      src: "https://lh3.googleusercontent.com/d/1S8IiOa2wA39IvEfcf4Zdv_z0Oi51bAjc",
      title: "Symmetrical Geometric Shield",
      type: "Traced Vector",
      project: "Guardian Systems",
      badgeColor: "bg-green-50 text-green-700 border-green-100",
      description: "Modern, minimal symmetrical lines forming a security shield logo, reconstructed with supreme node alignment."
    },
    {
      id: "drive-logo-2-01",
      src: "https://lh3.googleusercontent.com/d/1SOJNdddMmk8sPYoXo-1FQ1vUmsqChEri",
      title: "Creative Labs Monogram",
      type: "Traced Vector",
      project: "Lab Technologies",
      badgeColor: "bg-green-50 text-green-700 border-green-100",
      description: "Bold stylized monogram brand identity, expertly vector traced with precise geometric balance."
    },
    {
      id: "drive-logo-1-01",
      src: "https://lh3.googleusercontent.com/d/1XtDlZ3xBzKM6LZwYBqTqLn4Nw5yDkd60",
      title: "Infinite Loop Insignia",
      type: "Traced Vector",
      project: "Infinity Digital",
      badgeColor: "bg-green-50 text-green-700 border-green-100",
      description: "Premium logo showing an interlocking endless loop, traced with uniform stroke weights."
    },
    {
      id: "drive-portfolio-19",
      src: "https://lh3.googleusercontent.com/d/1_tZFSkPMkkXQ51UXcxBBYZvW-FpYCZVm",
      title: "Royal Heraldry Crest",
      type: "Traced Vector",
      project: "Estates & Heritage",
      badgeColor: "bg-green-50 text-green-700 border-green-100",
      description: "Detailed traditional heraldry crest with lion supporters and royal crown elements in full vector scale."
    },
    {
      id: "drive-logo-1-01-2",
      src: "https://lh3.googleusercontent.com/d/1eJBbJ-HG5tFDgxlEDd6SFaElvuhziKi9",
      title: "Stylized Winged Crest",
      type: "Traced Vector",
      project: "Aero Dynamics",
      badgeColor: "bg-green-50 text-green-700 border-green-100",
      description: "Symmetrical winged shield badge with beautiful mechanical accents, traced with smooth bezier paths."
    },
    {
      id: "drive-portfolio-20",
      src: "https://lh3.googleusercontent.com/d/1eL28SAmW1IYB2nJJ4vpS8-JPOFEfDxVD",
      title: "Modern Gradient Star",
      type: "Traced Vector",
      project: "Cinematic Arts",
      badgeColor: "bg-green-50 text-green-700 border-green-100",
      description: "Star-shaped cinematic visual identity emblem, fully reconstructed with vivid vector color stops."
    },
    {
      id: "drive-compass-image",
      src: "https://lh3.googleusercontent.com/d/1iYhSILsmM0qv-SAj3HnOEn2O8iWn_3N_",
      title: "Vintage Compass Emblem",
      type: "Traced Vector",
      project: "Maritime Trade",
      badgeColor: "bg-green-50 text-green-700 border-green-100",
      description: "Classic hand-etched marine compass design expertly preserved and converted into infinite resolution paths."
    },
    {
      id: "drive-portfolio-21",
      src: "https://lh3.googleusercontent.com/d/1vJpZTcO8H0u_PJol66g6Z2PVynyviYuV",
      title: "Futuristic Shield Emblem",
      type: "Traced Vector",
      project: "Cyber Sec",
      badgeColor: "bg-green-50 text-green-700 border-green-100",
      description: "Premium shield graphic featuring abstract speed-lines and modern high-tech node structures."
    },
    {
      id: "drive-portfolio-sample",
      src: "https://lh3.googleusercontent.com/d/1wBLa_JPSU1o1O5r07NxPzwP63W0lnsxG",
      title: "Minimalist Monoline Logo",
      type: "Traced Vector",
      project: "Simple Co.",
      badgeColor: "bg-green-50 text-green-700 border-green-100",
      description: "Elegant, thin monoline logo traced to absolute pixel perfection with consistent visual spacing."
    },
    {
      id: "drive-portfolio-22",
      src: "https://lh3.googleusercontent.com/d/1zkPvcP3CxtEVen2z429TdQicwQpytqi9",
      title: "Retro Mascot Cartoon",
      type: "Traced Vector",
      project: "Retro Diner",
      badgeColor: "bg-green-50 text-green-700 border-green-100",
      description: "Charming 1950s-style character mascot lineart traced into clean vector paths with warm tones."
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
          className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3"
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

                {/* Footer details */}
                <div className="p-5 border-t border-gray-100 bg-white flex items-center justify-center">
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
