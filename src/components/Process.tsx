import { UploadCloud, FileSpreadsheet, Layers, Download, ChevronRight } from "lucide-react";
import { motion } from "motion/react";

export default function Process() {
  const steps = [
    {
      step: "01",
      icon: UploadCloud,
      title: "Upload Your File",
      description: "Send us your raster images (JPG, PNG, GIF), screenshots, scans, or hand-drawn sketches using our instant secure submission form.",
    },
    {
      step: "02",
      icon: FileSpreadsheet,
      title: "Get a Custom Quote",
      description: "Our design leads evaluate your artwork complexity and send a fixed, fair quote with turnaround options within 10-20 minutes.",
    },
    {
      step: "03",
      icon: Layers,
      title: "We Trace & Design",
      description: "Our professional designers recreate your file by hand, tracing every line and node to perfection in high-resolution vector format.",
    },
    {
      step: "04",
      icon: Download,
      title: "Download Vector Files",
      description: "Review a high-res proof of your vectorized artwork. Once approved, instantly download all standard AI, EPS, SVG, and PDF master files.",
    },
  ];

  return (
    <section
      id="process"
      className="py-20 md:py-28 bg-brand-bg-light"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-20 space-y-4" id="process-header">
          <span className="text-primary-blue text-xs font-bold uppercase tracking-widest bg-primary-blue/10 px-3 py-1 rounded-full">
            Our Blueprint
          </span>
          <h2 className="text-3xl md:text-4xl font-extrabold text-brand-text-dark tracking-tight">
            How Vector Lab Works
          </h2>
          <p className="text-brand-text-body text-base md:text-lg leading-relaxed">
            From blurry raster to mathematically sharp vectors in four simple steps. We keep you informed and involved throughout the process.
          </p>
        </div>

        {/* Process Timeline */}
        <div className="relative" id="process-timeline-container">
          {/* Connecting Line (Desktop) */}
          <div className="hidden lg:block absolute top-[44px] left-[8%] right-[8%] h-1 bg-gradient-to-r from-primary-blue/30 via-primary-blue/50 to-primary-blue/30 z-0" />

          {/* Steps Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 relative z-10" id="process-steps-grid">
            {steps.map((item, idx) => {
              const IconComponent = item.icon;
              return (
                <motion.div
                  key={item.step}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.4, delay: idx * 0.1 }}
                  className="flex flex-col items-center text-center group"
                  id={`process-step-${item.step}`}
                >
                  {/* Circle Step Number & Icon Indicator */}
                  <div className="relative mb-6">
                    {/* Circle badge */}
                    <div className="w-20 h-20 rounded-2xl bg-white border border-gray-100 flex items-center justify-center text-primary-blue shadow-md group-hover:scale-105 group-hover:border-primary-blue/30 group-hover:shadow-lg transition-all duration-300 relative">
                      <IconComponent className="w-8 h-8 stroke-[1.8]" />
                      
                      {/* Step Badge */}
                      <span className="absolute -top-3.5 -right-3.5 bg-primary-blue text-white font-extrabold text-xs w-7 h-7 rounded-full flex items-center justify-center shadow">
                        {item.step}
                      </span>
                    </div>

                    {/* Desktop Arrows */}
                    {idx < steps.length - 1 && (
                      <div className="hidden lg:block absolute -right-6 top-1/2 -translate-y-1/2 text-primary-blue/30 group-hover:text-primary-blue transition-colors duration-300">
                        <ChevronRight className="w-5 h-5" />
                      </div>
                    )}
                  </div>

                  {/* Text Content */}
                  <div className="space-y-2 max-w-[260px]">
                    <h3 className="text-lg font-bold text-brand-text-dark group-hover:text-primary-blue transition-colors duration-200">
                      {item.title}
                    </h3>
                    <p className="text-brand-text-body text-xs sm:text-sm leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>



      </div>
    </section>
  );
}
