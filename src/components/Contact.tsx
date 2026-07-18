import React, { useState } from "react";
import { Mail, Clock, CheckCircle2, ArrowRight, Copy, Check, FileText } from "lucide-react";
import { motion } from "motion/react";

interface ContactProps {
  prefilledService?: string;
  prefilledPlan?: string;
}

export default function Contact({ prefilledService, prefilledPlan }: ContactProps) {
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText("info@vectortracelab.com");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const getMailtoLink = () => {
    const subject = "Vector Tracing Quote Request";
    let body = "Hi Vector Trace Lab Team,\n\nI would like to request a vector tracing quote. Please find my attached files.\n\n";
    
    if (prefilledService) {
      body += `Service Requested: ${prefilledService}\n`;
    }
    if (prefilledPlan) {
      body += `Plan/Tier Selected: ${prefilledPlan}\n`;
    }
    
    body += "\nDesired Deliverable Formats (e.g. AI, EPS, SVG, PDF):\n- \n\nAdditional Instructions / Deadline:\n- \n\nBest regards,\n[Your Name]";
    
    return `mailto:info@vectortracelab.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  return (
    <section
      id="contact"
      className="py-20 md:py-28 bg-brand-bg-light"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch" id="contact-panel-wrapper">
          
          {/* Contact info column */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-8 p-8 bg-white rounded-2xl border border-gray-100 shadow-sm" id="contact-info-col">
            <div className="space-y-6">
              <span className="text-primary-blue text-xs font-bold uppercase tracking-widest bg-primary-blue/10 px-3 py-1 rounded-full inline-block">
                Contact Us
              </span>
              <h2 className="text-3xl md:text-4xl font-extrabold text-brand-text-dark tracking-tight leading-tight">
                Ready to Start Your Vector Project?
              </h2>
              <p className="text-brand-text-body text-sm sm:text-base leading-relaxed">
                Send your low-resolution artwork or pencil sketch details today. Our senior digital design leads will inspect your file and send an exact, flat-rate quote within minutes.
              </p>

              {/* Info grid */}
              <div className="space-y-4 pt-4">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-primary-blue/5 text-primary-blue flex items-center justify-center flex-shrink-0">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-extrabold text-brand-text-dark text-sm">Direct Support Email</h4>
                    <p className="text-xs sm:text-sm text-primary-blue hover:underline">
                      <a href="mailto:info@vectortracelab.com">info@vectortracelab.com</a>
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-primary-blue/5 text-primary-blue flex items-center justify-center flex-shrink-0">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-extrabold text-brand-text-dark text-sm">Average Quote Response Time</h4>
                    <p className="text-xs sm:text-sm text-brand-text-body">10-20 Minutes (Mon - Fri US Timings).</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-primary-blue/5 text-primary-blue flex items-center justify-center flex-shrink-0">
                    <CheckCircle2 className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-extrabold text-brand-text-dark text-sm">Printers & Apparel Agencies</h4>
                    <p className="text-xs sm:text-sm text-brand-text-body">Wholesale flat rates and custom invoicing available.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Quality Checklist */}
            <div className="bg-brand-bg-light p-6 rounded-xl border border-gray-100 space-y-3">
              <h4 className="font-bold text-brand-text-dark text-sm">Vector Lab File Standards</h4>
              <ul className="space-y-2 text-xs text-brand-text-body">
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary-blue" />
                  No automated algorithmic traces.
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary-blue" />
                  Correct closed shapes for trouble-free plotting.
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary-blue" />
                  Layer grouped colors ready for screen separation.
                </li>
              </ul>
            </div>

          </div>

          {/* New Simplified Contact / Email Quote Card column */}
          <div className="lg:col-span-7 bg-white p-8 md:p-10 rounded-2xl border border-gray-100 shadow-sm relative flex flex-col justify-center" id="contact-email-card-col">
            
            <div className="space-y-6 max-w-xl mx-auto w-full">
              <div>
                <span className="text-xs font-bold text-primary-blue uppercase tracking-widest bg-primary-blue/5 px-2.5 py-1 rounded-md inline-block mb-3">
                  Direct Quote Request
                </span>
                <h3 className="text-2xl font-extrabold text-brand-text-dark tracking-tight">
                  Get a Free Quote via Email
                </h3>
                <p className="text-sm text-brand-text-body mt-2 leading-relaxed">
                  To ensure 100% successful delivery of heavy attachments with zero web transmission errors, please email your source files directly to our vectorization team.
                </p>
              </div>

              {/* Dynamic selection badge */}
              {(prefilledService || prefilledPlan) && (
                <div className="bg-primary-blue/5 border border-primary-blue/10 p-4 rounded-xl text-xs text-primary-blue font-semibold space-y-1">
                  <p className="font-bold text-[10px] uppercase tracking-wider text-primary-blue/70">Selected Interest:</p>
                  <p className="text-brand-text-dark">
                    {prefilledService ? `Service: "${prefilledService}"` : ""}
                    {prefilledService && prefilledPlan ? " | " : ""}
                    {prefilledPlan ? `Tier Preference: "${prefilledPlan}"` : ""}
                  </p>
                </div>
              )}

              {/* Action Buttons */}
              <div className="space-y-3 pt-2">
                <a
                  href={getMailtoLink()}
                  className="w-full bg-primary-blue hover:bg-primary-blue/90 text-white font-bold py-4 px-6 rounded-xl shadow-lg shadow-primary-blue/20 hover:shadow-xl transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer text-center"
                  id="btn-mailto-contact"
                >
                  <Mail className="w-5 h-5" />
                  Email Your Files Now
                  <ArrowRight className="w-4 h-4" />
                </a>

                <button
                  onClick={handleCopyEmail}
                  type="button"
                  className="w-full bg-gray-50 hover:bg-gray-100 text-brand-text-dark font-semibold py-3.5 px-6 rounded-xl border border-gray-200 transition-all flex items-center justify-center gap-2 cursor-pointer"
                  id="btn-copy-email"
                >
                  {copied ? (
                    <>
                      <Check className="w-4 h-4 text-green-500" />
                      Email Copied!
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4 text-gray-500" />
                      Copy Email Address (info@vectortracelab.com)
                    </>
                  )}
                </button>
              </div>

              {/* Instructions list */}
              <div className="bg-brand-bg-light p-5 rounded-xl border border-gray-100 space-y-3">
                <h4 className="font-bold text-brand-text-dark text-xs uppercase tracking-wider flex items-center gap-1.5">
                  <FileText className="w-4 h-4 text-primary-blue" />
                  What to include in your email:
                </h4>
                <ul className="space-y-2 text-xs text-brand-text-body pl-5 list-disc leading-relaxed">
                  <li>
                    Attach your raster images or sketches (accepts JPG, PNG, GIF, BMP, TIFF, PSD, PDF).
                  </li>
                  <li>
                    Mention your required output file formats (e.g., Adobe Illustrator AI, EPS, SVG, High-Res Print PDF).
                  </li>
                  <li>
                    Add any custom changes or requests (e.g., change colors, modify typography, clean up specific curves).
                  </li>
                </ul>
              </div>

              <p className="text-[11px] text-gray-400 text-center leading-relaxed">
                Usually reply in 10-20 minutes with flat-rate quotes and payment links. No upfront registration required.
              </p>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
