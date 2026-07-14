import { useState } from "react";
import { ChevronDown, HelpCircle } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface FAQItem {
  question: string;
  answer: string;
}

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs: FAQItem[] = [
    {
      question: "What raster file formats can I submit for vector tracing?",
      answer: "We accept nearly all common image formats, including JPG, JPEG, PNG, GIF, BMP, TIFF, WebP, and PSD. You can also upload PDF documents, scanned notebook sketches, smartphone photos, and screenshots of designs. Our design team will inspect any clear file.",
    },
    {
      question: "What final vector formats will I receive in the package?",
      answer: "You will receive a zip folder containing complete industry-standard source files: Adobe Illustrator (AI CC), EPS (Vector print legacy format), SVG (Scalable Vector Graphics for web), and a print-ready High-Res PDF. We also bundle a high-resolution 300 DPI transparent background PNG file for immediate web or slide presentation use.",
    },
    {
      question: "How long does the vectorization process take?",
      answer: "Our standard turnaround time is 12 to 24 hours. Most simple geometric shapes and basic logos are delivered in under 12 hours. If you have an extremely urgent print or fabrication deadline, we offer express 6-hour delivery on request for a small premium fee.",
    },
    {
      question: "Do you use automatic tracing software or conversion programs?",
      answer: "Absolutely not. Auto-tracing programs (like Illustrator's Image Trace) create thousands of messy, unnecessary anchor points, wavy outlines, and distorted shapes that are impossible to edit and fail on vinyl cutters or embroidery machines. Every design at Vector Lab is meticulously hand-drawn from scratch, anchor by anchor and curve by curve.",
    },
    {
      question: "What is your revision policy if I need changes?",
      answer: "We offer 100% unlimited free revisions on all standard and premium plans! If you need to adjust line weights, shift custom colors, scale individual elements, or align anchor paths, we will make adjustments until the vector files are exactly to your liking.",
    },
    {
      question: "How is the pricing calculated for custom graphics?",
      answer: "Our pricing is flat-rate and based entirely on the visual complexity of the image, not the size. Simple shapes, basic texts, and single-color logos are $19. Multi-color cartoon characters, detailed mascots, and sports emblem vectors are $39. Highly intricate technical drawings, blueprints, or faded historical maps are $79.",
    },
    {
      question: "How will my completed files be delivered?",
      answer: "Once the design tracing is complete, we will email you a secure link to preview a high-resolution raster proof. After your approval, you will immediately receive a secure download link containing the zipped bundle with all final vector source files (.ai, .eps, .svg, .pdf, .png).",
    },
  ];

  const handleToggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section
      id="faq"
      className="py-20 md:py-28 bg-white"
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center mb-16 space-y-4" id="faq-header">
          <span className="text-primary-blue text-xs font-bold uppercase tracking-widest bg-primary-blue/10 px-3 py-1 rounded-full">
            Knowledge Base
          </span>
          <h2 className="text-3xl md:text-4xl font-extrabold text-brand-text-dark tracking-tight">
            Frequently Asked Questions
          </h2>
          <p className="text-brand-text-body text-base md:text-lg max-w-2xl mx-auto">
            Got questions about file formats, path drawing, turnaround, or pricing? Find clear, direct answers from our senior design staff.
          </p>
        </div>

        {/* Accordion List */}
        <div className="space-y-4" id="faq-accordion-list">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={index}
                className={`border rounded-2xl overflow-hidden transition-all duration-300 ${
                  isOpen
                    ? "border-primary-blue bg-brand-bg-light shadow-sm"
                    : "border-gray-100 hover:border-gray-200 bg-white"
                }`}
                id={`faq-item-${index}`}
              >
                {/* Accordion Toggle Header */}
                <button
                  onClick={() => handleToggle(index)}
                  className="w-full flex items-center justify-between p-5 md:p-6 text-left focus:outline-none transition-colors duration-200 cursor-pointer"
                  aria-expanded={isOpen}
                  id={`faq-btn-${index}`}
                >
                  <span className="font-extrabold text-brand-text-dark text-sm sm:text-base pr-4 hover:text-primary-blue transition-colors">
                    {faq.question}
                  </span>
                  <div className={`p-1.5 rounded-lg transition-all ${
                    isOpen ? "bg-primary-blue text-white rotate-180" : "bg-gray-50 text-gray-400"
                  }`}>
                    <ChevronDown className="w-4 h-4 stroke-[2.5]" />
                  </div>
                </button>

                {/* Accordion Content Panel */}
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25, ease: "easeInOut" }}
                    >
                      <div className="px-5 pb-6 md:px-6 md:pb-6 text-xs sm:text-sm text-brand-text-body leading-relaxed border-t border-gray-100/50 pt-4">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

        {/* Still have questions banner */}
        <div className="mt-12 p-6 bg-brand-bg-light rounded-2xl border border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left" id="faq-still-help">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-white rounded-lg shadow-sm flex items-center justify-center text-primary-blue flex-shrink-0 hidden sm:flex">
              <HelpCircle className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-bold text-brand-text-dark text-sm">Still have a specific question?</h4>
              <p className="text-xs text-brand-text-body">Our team is always online to assist with complicated vectors.</p>
            </div>
          </div>
          <a
            href="#contact"
            className="whitespace-nowrap bg-primary-blue hover:bg-primary-blue/90 text-white font-bold text-xs py-2.5 px-5 rounded-lg shadow-sm transition-all cursor-pointer"
          >
            Ask a Designer
          </a>
        </div>

      </div>
    </section>
  );
}
