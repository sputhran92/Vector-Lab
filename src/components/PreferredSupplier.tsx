import { ShieldCheck, Award } from "lucide-react";
import { motion } from "motion/react";
import React, { useState } from "react";

export default function PreferredSupplier() {
  const [img1Error, setImg1Error] = useState(false);
  const [img2Error, setImg2Error] = useState(false);

  const img1Primary = "https://lh3.googleusercontent.com/d/1ARGtR6A5pXzPFuGlrxns0haynt5bGbcE";
  const img1Fallback = "https://drive.google.com/uc?export=view&id=1ARGtR6A5pXzPFuGlrxns0haynt5bGbcE";

  const img2Primary = "https://lh3.googleusercontent.com/d/1AHdEGgjg37xPgZxRdVDtCGEmWifsikZB";
  const img2Fallback = "https://drive.google.com/uc?export=view&id=1AHdEGgjg37xPgZxRdVDtCGEmWifsikZB";

  return (
    <section
      id="preferred-supplier"
      className="py-12 md:py-16 bg-gradient-to-b from-gray-50 to-white border-y border-gray-100"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-3xl mx-auto space-y-4"
        >
          <div className="inline-flex items-center gap-2 bg-primary-blue/10 text-primary-blue text-xs font-extrabold uppercase tracking-widest px-3.5 py-1.5 rounded-full">
            <Award className="w-4 h-4 text-primary-blue" />
            <span>Trusted Industry Partner</span>
          </div>

          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-brand-text-dark tracking-tight leading-tight">
            Official Preferred Supplier for Universal Unilink and WePromo
          </h2>

          <p className="text-brand-text-body text-sm sm:text-base leading-relaxed">
            Proudly providing top-tier vector tracing and artwork conversion services trusted by promotional product distributors, screen printers, and embroiderers nationwide.
          </p>
        </motion.div>

        {/* Partner Logos Showcase */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 max-w-4xl mx-auto"
        >
          {/* Universal Unilink Card */}
          <div className="bg-white p-6 sm:p-8 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col items-center justify-center text-center group">
            <div className="h-36 sm:h-44 w-full flex items-center justify-center p-3 mb-4 bg-gray-50/50 rounded-xl border border-gray-100/80 group-hover:bg-white transition-colors">
              <img
                src={img1Error ? img1Fallback : img1Primary}
                onError={() => {
                  if (!img1Error) setImg1Error(true);
                }}
                alt="Universal Unilink Official Preferred Supplier"
                className="max-h-full max-w-full object-contain filter drop-shadow-sm group-hover:scale-105 transition-transform duration-300"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="flex items-center gap-2 text-xs sm:text-sm font-bold text-primary-blue uppercase tracking-wider">
              <ShieldCheck className="w-4.5 h-4.5" />
              <span>Universal Unilink Preferred Supplier</span>
            </div>
          </div>

          {/* WePromo Card */}
          <div className="bg-white p-6 sm:p-8 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col items-center justify-center text-center group">
            <div className="h-36 sm:h-44 w-full flex items-center justify-center p-3 mb-4 bg-gray-50/50 rounded-xl border border-gray-100/80 group-hover:bg-white transition-colors">
              <img
                src={img2Error ? img2Fallback : img2Primary}
                onError={() => {
                  if (!img2Error) setImg2Error(true);
                }}
                alt="WePromo Official Preferred Supplier"
                className="max-h-full max-w-full object-contain filter drop-shadow-sm group-hover:scale-105 transition-transform duration-300"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="flex items-center gap-2 text-xs sm:text-sm font-bold text-primary-blue uppercase tracking-wider">
              <ShieldCheck className="w-4.5 h-4.5" />
              <span>WePromo Preferred Supplier</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
