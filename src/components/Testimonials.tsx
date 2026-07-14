import { useState } from "react";
import { Star, ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

export default function Testimonials() {
  const [activeIndex, setActiveIndex] = useState(0);

  const testimonials = [
    {
      id: "test-1",
      name: "Sarah Jenkins",
      role: "Creative Director",
      company: "Prestige Printing Co.",
      stars: 5,
      quote: "Vector Lab is an absolute lifesaver for our commercial printing business. Clients constantly bring us tiny, pixelated JPG logo files that are completely unprintable. We send them over to Vector Lab and receive immaculate, razor-sharp vector paths back in just a few hours. Our production speeds have doubled!",
      initials: "SJ",
      bgColor: "from-blue-500 to-indigo-600"
    },
    {
      id: "test-2",
      name: "Marcus Vance",
      role: "Founder",
      company: "Apex Apparel Group",
      stars: 5,
      quote: "Our apparel screen-printing shop requires high-precision path counts and solid geometric shapes. Vector Lab handles our raw, hand-drawn pencil sketches and outputs flawless vector line art with grouped, flat-color layers that are immediately ready for mesh separations. Exceptional work every single time.",
      initials: "MV",
      bgColor: "from-cyan-500 to-blue-600"
    },
    {
      id: "test-3",
      name: "Elena Rostova",
      role: "Senior Illustrator",
      company: "Atlas Publishing House",
      stars: 5,
      quote: "We needed high-density topographical lines traced from hand-sketched park maps. The coordinate precision work done by the senior designers at Vector Lab was absolutely remarkable. Every bezier curve was clean, and overlapping geographic shapes were perfectly enclosed. True manual craftsmanship.",
      initials: "ER",
      bgColor: "from-blue-600 to-sky-500"
    },
    {
      id: "test-4",
      name: "David Kim",
      role: "Marketing Manager",
      company: "Shift Tech Corp",
      stars: 5,
      quote: "Fast, exact, and incredibly cost-effective. We unfortunately lost our primary corporate identity assets in an IT server migration. Vector Lab reconstructed our full branding hierarchy, color palettes, and secondary iconography based only on old, compressed website screenshots.",
      initials: "DK",
      bgColor: "from-indigo-500 to-sky-600"
    }
  ];

  const handlePrev = () => {
    setActiveIndex((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
  };

  return (
    <section
      id="testimonials"
      className="py-20 md:py-28 bg-white overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4" id="testimonials-header">
          <span className="text-primary-blue text-xs font-bold uppercase tracking-widest bg-primary-blue/10 px-3 py-1 rounded-full">
            Client Success
          </span>
          <h2 className="text-3xl md:text-4xl font-extrabold text-brand-text-dark tracking-tight">
            Trusted by Designers & Print Shops
          </h2>
          <p className="text-brand-text-body text-base md:text-lg leading-relaxed">
            Read stories of how print agencies, apparel brands, and creative teams rely on Vector Lab to handle high-volume vector tracing requirements with perfection.
          </p>
        </div>

        {/* Carousel & Grid Combination layout */}
        <div className="relative max-w-4xl mx-auto" id="testimonials-carousel-wrapper">
          
          {/* Main Slide container */}
          <div className="bg-brand-bg-light rounded-2xl border border-gray-100 p-8 md:p-12 shadow-sm relative">
            
            {/* Quote Icon watermark */}
            <div className="absolute right-8 top-8 text-primary-blue/5">
              <Quote className="w-24 h-24 stroke-[1.5]" />
            </div>

            <div className="relative z-10 space-y-6">
              
              {/* Star Rating */}
              <div className="flex gap-1">
                {[...Array(testimonials[activeIndex].stars)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-amber-400 stroke-amber-400" />
                ))}
              </div>

              {/* Quote text */}
              <blockquote className="text-lg md:text-xl text-brand-text-dark font-medium leading-relaxed italic">
                "{testimonials[activeIndex].quote}"
              </blockquote>

              <hr className="border-gray-200" />

              {/* Author Info */}
              <div className="flex items-center gap-4">
                {/* Simulated Avatar using Initials & Gradient */}
                <div className={`w-12 h-12 rounded-full bg-gradient-to-tr ${testimonials[activeIndex].bgColor} text-white flex items-center justify-center font-bold text-sm shadow-inner`}>
                  {testimonials[activeIndex].initials}
                </div>
                <div>
                  <h4 className="font-extrabold text-brand-text-dark text-base">
                    {testimonials[activeIndex].name}
                  </h4>
                  <p className="text-xs text-brand-text-body">
                    {testimonials[activeIndex].role}, <strong className="text-primary-blue">{testimonials[activeIndex].company}</strong>
                  </p>
                </div>
              </div>

            </div>

          </div>

          {/* Controls */}
          <div className="flex justify-between items-center mt-8 px-2" id="carousel-controls">
            {/* Dots */}
            <div className="flex gap-2">
              {testimonials.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveIndex(idx)}
                  className={`h-2.5 rounded-full transition-all duration-300 cursor-pointer ${
                    activeIndex === idx ? "w-8 bg-primary-blue" : "w-2.5 bg-gray-200 hover:bg-gray-300"
                  }`}
                  aria-label={`Go to slide ${idx + 1}`}
                />
              ))}
            </div>

            {/* Navigation buttons */}
            <div className="flex gap-3">
              <button
                onClick={handlePrev}
                className="w-10 h-10 rounded-xl border border-gray-200 bg-white hover:bg-brand-bg-light text-brand-text-dark flex items-center justify-center hover:border-primary-blue/30 transition-all cursor-pointer shadow-sm"
                aria-label="Previous Testimonial"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={handleNext}
                className="w-10 h-10 rounded-xl border border-gray-200 bg-white hover:bg-brand-bg-light text-brand-text-dark flex items-center justify-center hover:border-primary-blue/30 transition-all cursor-pointer shadow-sm"
                aria-label="Next Testimonial"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
