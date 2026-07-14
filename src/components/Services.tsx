import { ShieldAlert, PenTool, Layout, Shirt, Map, Image as ImageIcon, ArrowRight } from "lucide-react";
import { motion } from "motion/react";

interface ServicesProps {
  onServiceSelect: (serviceName: string) => void;
}

export default function Services({ onServiceSelect }: ServicesProps) {
  const services = [
    {
      id: "logo-tracing",
      icon: ShieldAlert, // Representing brand protection / exact tracing
      title: "Logo Tracing & Recreation",
      description: "Lose your original logo files? We recreate your existing logo from small JPG/PNG files, business cards, or screenshots into high-resolution vectors.",
    },
    {
      id: "sketch-to-vector",
      icon: PenTool,
      title: "Sketch-to-Vector Conversion",
      description: "Convert hand-drawn ideas or raw pencil sketches on paper into fully digitized, clean, geometric vector masterworks suitable for production.",
    },
    {
      id: "banner-signage",
      icon: Layout,
      title: "Banner & Signage Vectorization",
      description: "Prepare graphics for billboards, trade show booths, vehicle wraps, and large signs. Scale up infinitely with absolute pixel perfection.",
    },
    {
      id: "apparel-artwork",
      icon: Shirt,
      title: "T-Shirt & Apparel Artwork",
      description: "Prepare your illustrations for screen printing, direct-to-garment, or embroidery with clean lines, exact pantone separations, and flat solid colors.",
    },
    {
      id: "map-technical",
      icon: Map,
      title: "Map & Technical Drawings",
      description: "Digitize historical documents, architectural blueprints, floor plans, schematics, and maps into clean CAD/Illustrator vector lines.",
    },
    {
      id: "image-vectorization",
      icon: ImageIcon,
      title: "Image Vectorization",
      description: "Convert high-contrast photographs, multi-color cartoon characters, stencils, silhouette patterns, and complex rasters into clean digital assets.",
    },
  ];

  return (
    <section
      id="services"
      className="py-20 md:py-28 bg-brand-bg-light"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4" id="services-header">
          <span className="text-primary-blue text-xs font-bold uppercase tracking-widest bg-primary-blue/10 px-3 py-1 rounded-full">
            Our Expertise
          </span>
          <h2 className="text-3xl md:text-4xl font-extrabold text-brand-text-dark tracking-tight">
            Professional Vector Services We Offer
          </h2>
          <p className="text-brand-text-body text-base md:text-lg leading-relaxed">
            Every file is hand-drawn anchor by anchor in Adobe Illustrator to ensure the highest-quality path precision, correct curves, and clean overlapping shapes.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8" id="services-grid">
          {services.map((service, idx) => {
            const IconComponent = service.icon;
            return (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.4, delay: idx * 0.05 }}
                className="bg-white p-8 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between group"
                id={`service-card-${service.id}`}
              >
                <div className="space-y-4">
                  {/* Icon */}
                  <div className="w-12 h-12 rounded-lg bg-primary-blue/5 text-primary-blue flex items-center justify-center group-hover:bg-primary-blue group-hover:text-white transition-all duration-300 shadow-sm">
                    <IconComponent className="w-6 h-6 stroke-[2]" />
                  </div>
                  
                  {/* Title & Description */}
                  <h3 className="text-xl font-bold text-brand-text-dark group-hover:text-primary-blue transition-colors duration-200">
                    {service.title}
                  </h3>
                  <p className="text-brand-text-body text-sm leading-relaxed">
                    {service.description}
                  </p>
                </div>

                {/* Card CTA */}
                <div className="pt-6 mt-6 border-t border-gray-50 flex justify-between items-center">
                  <button
                    onClick={() => onServiceSelect(service.title)}
                    className="text-xs font-bold text-primary-blue flex items-center gap-1.5 hover:text-accent-blue transition-colors group-hover:translate-x-0.5 duration-200 cursor-pointer"
                  >
                    Select service & Quote
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
