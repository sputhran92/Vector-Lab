import { Check, Flame, ShieldCheck, HelpCircle } from "lucide-react";
import { motion } from "motion/react";

interface PricingProps {
  onPlanSelect: (planName: string) => void;
}

export default function Pricing({ onPlanSelect }: PricingProps) {
  const tiers = [
    {
      id: "plan-basic",
      name: "Basic Vector Tracing",
      price: "$20",
      period: "per image",
      turnaround: "Delivered in 24 Hours",
      description: "Perfect for simple geometric shapes, flat-color logos, clean modern fonts, or basic icons.",
      features: [
        "100% Hand-traced pathways",
        "Includes AI, EPS, SVG, and PDF formats",
        "High-res transparent PNG (300 DPI)",
        "3 Rounds of precise revisions",
        "Standard RGB color format",
      ],
      popular: false,
      cta: "Select Basic Plan",
    },
    {
      id: "plan-standard",
      name: "Standard Graphic Vector",
      price: "$30",
      period: "per image",
      turnaround: "Delivered in 12-24 Hours",
      description: "Ideal for detailed corporate logos, multi-color cartoon characters, complex mascot emblems, or custom typography.",
      features: [
        "Everything in Basic plan",
        "Detailed hand-tracing on complex curves",
        "Unlimited free revisions & adjustments",
        "CMYK (Print-ready) + RGB (Web-ready)",
        "Pantone color matching (on request)",
        "Organized, neat layer groupings",
      ],
      popular: true,
      cta: "Select Standard Plan",
    },
    {
      id: "plan-premium",
      name: "Premium / Technical Drawing",
      price: "$45",
      period: "per image",
      turnaround: "Delivered in 24-48 Hours",
      description: "Best for highly detailed pencil sketches, faded blueprints, historical maps, or complex mechanical diagrams.",
      features: [
        "Everything in Standard plan",
        "Extreme high-density line detailing",
        "Topographic elevation curve tracing",
        "CAD-compatible output formats (DXF/DWG)",
        "Dedicated senior Illustrator lead",
        "Priority 24/7 client ticket support",
      ],
      popular: false,
      cta: "Select Premium Plan",
    },
  ];

  return (
    <section
      id="pricing"
      className="py-20 md:py-28 bg-brand-bg-light"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4" id="pricing-header">
          <span className="text-primary-blue text-xs font-bold uppercase tracking-widest bg-primary-blue/10 px-3 py-1 rounded-full">
            Transparent Pricing
          </span>
          <h2 className="text-3xl md:text-4xl font-extrabold text-brand-text-dark tracking-tight">
            Simple, Flat-Rate Pricing Plans
          </h2>
          <p className="text-brand-text-body text-base md:text-lg leading-relaxed">
            No subscriptions or surprise fees. Select the complexity level that matches your artwork. Not sure which plan fits? Contact us for a free estimate.
          </p>
        </div>

        {/* Pricing Tiers Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch max-w-6xl mx-auto" id="pricing-grid">
          {tiers.map((tier, idx) => (
            <motion.div
              key={tier.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.4, delay: idx * 0.1 }}
              className={`bg-white rounded-2xl p-8 border flex flex-col justify-between relative transition-all duration-300 ${
                tier.popular
                  ? "border-2 border-primary-blue shadow-xl lg:scale-[1.03] z-10"
                  : "border-gray-100 shadow-sm hover:shadow-md"
              }`}
              id={`pricing-tier-${tier.id}`}
            >
              {/* Popular Badge */}
              {tier.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-primary-blue text-white text-xs font-black uppercase py-1.5 px-4 rounded-full tracking-widest shadow-md flex items-center gap-1">
                  <Flame className="w-3.5 h-3.5 fill-white stroke-none" />
                  Most Popular
                </div>
              )}

              {/* Tier Header Info */}
              <div className="space-y-4">
                <div className="space-y-1">
                  <h3 className="text-lg font-extrabold text-brand-text-dark">
                    {tier.name}
                  </h3>
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs font-semibold text-primary-blue bg-primary-blue/5 px-2.5 py-1 rounded-md">
                      {tier.turnaround}
                    </span>
                  </div>
                </div>

                <div className="flex items-baseline gap-1.5 pt-2">
                  <span className="text-4xl md:text-5xl font-extrabold text-brand-text-dark">
                    {tier.price}
                  </span>
                  <span className="text-xs text-brand-text-body font-medium">
                    / {tier.period}
                  </span>
                </div>

                <p className="text-xs sm:text-sm text-brand-text-body leading-relaxed pt-2">
                  {tier.description}
                </p>

                <hr className="border-gray-100 my-6" />

                {/* Bullet List */}
                <ul className="space-y-3">
                  {tier.features.map((feature, fIdx) => (
                    <li key={fIdx} className="flex items-start gap-3 text-sm text-brand-text-body">
                      <div className={`mt-0.5 p-0.5 rounded-full flex-shrink-0 ${
                        tier.popular ? "bg-primary-blue/10 text-primary-blue" : "bg-gray-100 text-gray-500"
                      }`}>
                        <Check className="w-3.5 h-3.5 stroke-[2.5]" />
                      </div>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Pricing CTA button */}
              <div className="pt-8">
                <button
                  onClick={() => onPlanSelect(tier.name)}
                  className={`w-full py-3.5 px-4 rounded-xl font-bold text-sm shadow-sm transition-all duration-200 cursor-pointer ${
                    tier.popular
                      ? "bg-primary-blue hover:bg-primary-blue/90 text-white hover:shadow-md hover:shadow-primary-blue/10"
                      : "bg-brand-bg-light hover:bg-gray-100 text-brand-text-dark border border-gray-200"
                  }`}
                >
                  {tier.cta}
                </button>
              </div>

            </motion.div>
          ))}
        </div>

        {/* Corporate / Enterprise Banner */}
        <div className="mt-16 bg-white p-8 rounded-2xl border border-gray-100 shadow-sm max-w-4xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6" id="pricing-custom-panel">
          <div className="space-y-1.5 text-center md:text-left">
            <h4 className="font-extrabold text-brand-text-dark text-lg flex items-center justify-center md:justify-start gap-2">
              <ShieldCheck className="text-primary-blue w-5 h-5" />
              Need Bulk Vectorization or White-Label Partnership?
            </h4>
            <p className="text-xs sm:text-sm text-brand-text-body max-w-xl">
              We provide wholesale vector tracing services for print shops, embroidery agencies, and marketing departments. Enjoy customized invoice billing and dedicated designers.
            </p>
          </div>

          <a
            href="#contact"
            onClick={(e) => {
              e.preventDefault();
              onPlanSelect("Enterprise Bulk Work");
            }}
            className="whitespace-nowrap bg-brand-bg-light hover:bg-gray-100 text-primary-blue font-bold text-sm py-3 px-6 rounded-xl border border-primary-blue/20 transition-all cursor-pointer"
          >
            Contact Enterprise Team
          </a>
        </div>

      </div>
    </section>
  );
}
