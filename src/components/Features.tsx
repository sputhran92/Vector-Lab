import { Clock, RefreshCw, Compass, FileCode, Users, BadgeDollarSign, ShieldCheck } from "lucide-react";
import { motion } from "motion/react";

export default function Features() {
  const features = [
    {
      id: "accuracy",
      icon: Compass,
      title: "100% Vector Accuracy",
      description: "We don't use automatic tracing software that leaves messy paths and jagged nodes. Every single anchor point and bezier curve is hand-plotted with pixel perfection.",
    },
    {
      id: "turnaround",
      icon: Clock,
      title: "Fast 12 to 24h Delivery",
      description: "Most tracing projects are processed and delivered in less than 24 hours. Express 6-hour delivery is also available for urgent print deadlines.",
    },
    {
      id: "revisions",
      icon: RefreshCw,
      title: "Unlimited Free Revisions",
      description: "We want you to be completely satisfied. We'll adjust coordinates, shapes, colors, and line weights until your graphic is exactly how you need it.",
    },
    {
      id: "formats",
      icon: FileCode,
      title: "All industry Standard Formats",
      description: "You receive clean files fully compatible with all graphic design and print systems: Adobe Illustrator (AI), EPS, Scalable Vector Graphics (SVG), and PDF.",
    },
    {
      id: "team",
      icon: Users,
      title: "Expert Illustrator Team",
      description: "With over 10 years of professional vector tracing experience, we know how to handle complex graphics, fonts, gradients, and custom brand shapes.",
    },
    {
      id: "pricing",
      icon: BadgeDollarSign,
      title: "Fair & Affordable Pricing",
      description: "No hidden fees, setup costs, or subscriptions. Pay a flat, competitive rate per image based on complexity. Free instant quotes always included.",
    },
  ];

  return (
    <section
      className="py-20 md:py-28 bg-white"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header container */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center mb-16" id="features-header-wrapper">
          <div className="lg:col-span-6 space-y-4 text-center lg:text-left">
            <span className="text-primary-blue text-xs font-bold uppercase tracking-widest bg-primary-blue/10 px-3 py-1 rounded-full">
              Why Choose Vector Lab
            </span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-brand-text-dark tracking-tight leading-tight">
              We Breathe Precision. No Shortcuts, No AI Auto-Trace.
            </h2>
          </div>
          <div className="lg:col-span-6">
            <p className="text-brand-text-body text-base md:text-lg leading-relaxed text-center lg:text-left">
              Many online services use low-quality automatic conversion tools that create thousands of redundant anchor points and distorted curves. At Vector Lab, we redraw everything manually, ensuring flawless scalability for screen, paper, and physical signs.
            </p>
          </div>
        </div>

        {/* Features list */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8" id="features-grid">
          {features.map((feature, idx) => {
            const IconComponent = feature.icon;
            return (
              <motion.div
                key={feature.id}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.4, delay: idx * 0.05 }}
                className="group relative p-6 bg-white rounded-xl border border-gray-100 hover:border-primary-blue/10 hover:shadow-lg transition-all duration-300"
                id={`feature-card-${feature.id}`}
              >
                {/* Decorative border accent */}
                <div className="absolute top-0 left-0 w-0 h-1 bg-primary-blue rounded-t-xl group-hover:w-full transition-all duration-300" />
                
                <div className="flex items-start gap-4">
                  {/* Icon */}
                  <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-primary-blue/5 text-primary-blue flex items-center justify-center group-hover:bg-primary-blue/10 transition-colors duration-300">
                    <IconComponent className="w-5 h-5 stroke-[2]" />
                  </div>

                  {/* Body */}
                  <div className="space-y-2">
                    <h3 className="text-lg font-bold text-brand-text-dark group-hover:text-primary-blue transition-colors duration-200">
                      {feature.title}
                    </h3>
                    <p className="text-brand-text-body text-sm leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Format Compatibility strip */}
        <div className="mt-16 p-8 bg-brand-bg-light rounded-2xl border border-gray-100 flex flex-col md:flex-row items-center justify-between gap-6" id="features-format-strip">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-white rounded-xl shadow-sm flex items-center justify-center text-primary-blue flex-shrink-0">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-bold text-brand-text-dark text-base">Perfect File Output Assured</h4>
              <p className="text-xs text-brand-text-body">Our vector files are print-ready and fully editable.</p>
            </div>
          </div>

          <div className="flex flex-wrap gap-3 justify-center">
            {["AI", "EPS", "SVG", "PDF", "DXF", "CDR"].map((fmt) => (
              <span
                key={fmt}
                className="px-3.5 py-1.5 bg-white text-brand-text-dark text-xs font-extrabold rounded-lg border border-gray-200 shadow-xs tracking-wider"
              >
                .{fmt}
              </span>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
