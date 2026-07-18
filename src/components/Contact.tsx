import React, { useState, useRef, useEffect } from "react";
import { Mail, Clock, Send, ShieldAlert, FileText, CheckCircle2, UploadCloud, X, HelpCircle, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface ContactProps {
  prefilledService?: string;
  prefilledPlan?: string;
}

export default function Contact({ prefilledService, prefilledPlan }: ContactProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [projectType, setProjectType] = useState("Logo Tracing & Recreation");
  const [message, setMessage] = useState("");
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const [isDragActive, setIsDragActive] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Sync pre-filled selections from other components
  useEffect(() => {
    if (prefilledService) {
      setProjectType(prefilledService);
    }
  }, [prefilledService]);

  useEffect(() => {
    if (prefilledPlan) {
      setMessage((prev) => {
        const planText = `Hi, I am interested in ordering the "${prefilledPlan}" tier. `;
        if (prev.includes("tier.")) return prev;
        return planText + prev;
      });
    }
  }, [prefilledPlan]);

  const serviceOptions = [
    "Logo Tracing & Recreation",
    "Sketch-to-Vector Conversion",
    "Banner & Signage Vectorization",
    "T-Shirt & Apparel Artwork",
    "Map & Technical Drawing Vectorization",
    "Image Vectorization",
  ];

  // Drag and drop handlers
  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setIsDragActive(true);
    } else if (e.type === "dragleave") {
      setIsDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const filesArray = Array.from(e.dataTransfer.files);
      setUploadedFiles((prev) => [...prev, ...filesArray]);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const filesArray = Array.from(e.target.files);
      setUploadedFiles((prev) => [...prev, ...filesArray]);
    }
  };

  const removeFile = (indexToRemove: number) => {
    setUploadedFiles((prev) => prev.filter((_, idx) => idx !== indexToRemove));
  };

  const handleBoxClick = () => {
    fileInputRef.current?.click();
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + " " + sizes[i];
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email) return;

    setIsSubmitting(true);

    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("email", email);
      formData.append("message", message);
      formData.append("projectType", projectType);
      uploadedFiles.forEach((file) => {
        formData.append("files", file);
      });

      const response = await fetch("/api/contact", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Failed to send email");
      }
      
      setSubmitSuccess(true);
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("Failed to send message. Please try again or email us directly.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetForm = () => {
    setName("");
    setEmail("");
    setProjectType("Logo Tracing & Recreation");
    setMessage("");
    setUploadedFiles([]);
    setSubmitSuccess(false);
  };

  return (
    <section
      id="contact"
      className="py-20 md:py-28 bg-brand-bg-light"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch" id="contact-panel-wrapper">
          
          {/* Contact info column (Right in visual weight, let's put on left for perfect layout or right side) */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-8 p-8 bg-white rounded-2xl border border-gray-100 shadow-sm" id="contact-info-col">
            <div className="space-y-6">
              <span className="text-primary-blue text-xs font-bold uppercase tracking-widest bg-primary-blue/10 px-3 py-1 rounded-full inline-block">
                Get In Touch
              </span>
              <h2 className="text-3xl md:text-4xl font-extrabold text-brand-text-dark tracking-tight leading-tight">
                Ready to Start Your Vector Project?
              </h2>
              <p className="text-brand-text-body text-sm sm:text-base leading-relaxed">
                Submit your low-resolution artwork or pencil sketch details today. Our senior digital design leads will inspect your file and send an exact, flat-rate quote within minutes.
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

          {/* Contact form column */}
          <div className="lg:col-span-7 bg-white p-8 md:p-10 rounded-2xl border border-gray-100 shadow-sm relative flex flex-col justify-center" id="contact-form-col">
            
            <AnimatePresence mode="wait">
              {!submitSuccess ? (
                <motion.form
                  key="contact-form"
                  initial={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onSubmit={handleSubmit}
                  className="space-y-6"
                >
                  {/* Alert notification for prefilled triggers */}
                  {(prefilledService || prefilledPlan) && (
                    <div className="bg-primary-blue/5 border border-primary-blue/20 p-3.5 rounded-xl text-xs text-primary-blue font-semibold flex items-center gap-2">
                      <ShieldAlert className="w-4 h-4 flex-shrink-0" />
                      <span>
                        Preselected: {prefilledService ? `"${prefilledService}" service` : ""}{" "}
                        {prefilledPlan ? `with "${prefilledPlan}" layout preferences` : ""}.
                      </span>
                    </div>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {/* Name input */}
                    <div className="space-y-1.5">
                      <label htmlFor="input-name" className="text-xs font-bold text-brand-text-dark uppercase tracking-wider">
                        Full Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        id="input-name"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="John Doe"
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-primary-blue focus:ring-1 focus:ring-primary-blue/10 text-sm transition-all text-brand-text-dark"
                      />
                    </div>

                    {/* Email input */}
                    <div className="space-y-1.5">
                      <label htmlFor="input-email" className="text-xs font-bold text-brand-text-dark uppercase tracking-wider">
                        Email Address <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="email"
                        id="input-email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="john@example.com"
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-primary-blue focus:ring-1 focus:ring-primary-blue/10 text-sm transition-all text-brand-text-dark"
                      />
                    </div>
                  </div>

                  {/* Project Type Dropdown */}
                  <div className="space-y-1.5">
                    <label htmlFor="input-project-type" className="text-xs font-bold text-brand-text-dark uppercase tracking-wider">
                      Vector Service Type
                    </label>
                    <select
                      id="input-project-type"
                      value={projectType}
                      onChange={(e) => setProjectType(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white focus:outline-none focus:border-primary-blue focus:ring-1 focus:ring-primary-blue/10 text-sm transition-all text-brand-text-dark cursor-pointer"
                    >
                      {serviceOptions.map((opt) => (
                        <option key={opt} value={opt}>
                          {opt}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Drag and Drop File Upload Container */}
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-brand-text-dark uppercase tracking-wider">
                      Upload Raster / Sketch Files <span className="text-gray-400 font-normal">(Optional)</span>
                    </label>
                    
                    <div
                      onDragEnter={handleDrag}
                      onDragOver={handleDrag}
                      onDragLeave={handleDrag}
                      onDrop={handleDrop}
                      onClick={handleBoxClick}
                      className={`border-2 border-dashed rounded-xl p-6 flex flex-col items-center justify-center text-center cursor-pointer transition-all duration-200 ${
                        isDragActive
                          ? "border-primary-blue bg-primary-blue/5"
                          : "border-gray-200 hover:border-primary-blue/30 hover:bg-brand-bg-light"
                      }`}
                      id="drag-drop-upload-area"
                    >
                      <input
                        type="file"
                        ref={fileInputRef}
                        multiple
                        onChange={handleFileChange}
                        className="hidden"
                        accept="image/*,.pdf,.psd"
                      />

                      <UploadCloud className="w-10 h-10 text-primary-blue/70 mb-3" />
                      <p className="text-sm font-bold text-brand-text-dark">
                        Drag & Drop files here or <span className="text-primary-blue hover:underline">Browse</span>
                      </p>
                      <p className="text-[10px] text-brand-text-body mt-1">
                        Accepts JPG, PNG, GIF, BMP, TIFF, PSD, PDF (Max 25MB total)
                      </p>
                    </div>

                    {/* Uploaded Files List */}
                    {uploadedFiles.length > 0 && (
                      <div className="bg-gray-50 p-3 rounded-xl border border-gray-100 space-y-2 mt-2">
                        <p className="text-[10px] font-bold text-brand-text-dark uppercase tracking-wider">
                          Selected Files ({uploadedFiles.length}):
                        </p>
                        <div className="space-y-1.5 max-h-32 overflow-y-auto">
                          {uploadedFiles.map((file, idx) => (
                            <div key={idx} className="flex items-center justify-between bg-white px-3 py-1.5 rounded-lg border border-gray-100 text-xs">
                              <div className="flex items-center gap-2 overflow-hidden mr-2">
                                <FileText className="w-3.5 h-3.5 text-primary-blue flex-shrink-0" />
                                <span className="font-medium text-brand-text-dark truncate">
                                  {file.name}
                                </span>
                                <span className="text-[10px] text-gray-400">
                                  ({formatFileSize(file.size)})
                                </span>
                              </div>
                              <button
                                type="button"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  removeFile(idx);
                                }}
                                className="text-gray-400 hover:text-red-500 p-0.5 rounded transition-colors cursor-pointer"
                              >
                                <X className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Message Input */}
                  <div className="space-y-1.5">
                    <label htmlFor="input-message" className="text-xs font-bold text-brand-text-dark uppercase tracking-wider">
                      Project Notes / Special Instructions
                    </label>
                    <textarea
                      id="input-message"
                      rows={4}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Please trace with extreme detail. I need clean nodes on the inner ring, and color files prepared for direct-to-garment shirt printing..."
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-primary-blue focus:ring-1 focus:ring-primary-blue/10 text-sm transition-all text-brand-text-dark resize-y"
                    />
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-primary-blue hover:bg-primary-blue/90 text-white font-bold py-4 rounded-xl shadow-lg shadow-primary-blue/25 hover:shadow-xl hover:shadow-primary-blue/20 transition-all flex items-center justify-center gap-2 disabled:bg-gray-400 disabled:shadow-none cursor-pointer"
                    id="btn-contact-submit"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        Analyzing File Coordinates...
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        Submit Request for Free Quote
                      </>
                    )}
                  </button>

                </motion.form>
              ) : (
                <motion.div
                  key="success-container"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="text-center py-10 px-4 space-y-6 flex flex-col items-center"
                  id="contact-success-panel"
                >
                  <div className="w-16 h-16 rounded-full bg-green-50 text-green-500 border border-green-200 flex items-center justify-center shadow-sm">
                    <CheckCircle2 className="w-8 h-8 stroke-[2.5]" />
                  </div>

                  <div className="space-y-2">
                    <h3 className="text-2xl font-extrabold text-brand-text-dark">
                      Quote Request Received!
                    </h3>
                    <p className="text-brand-text-body text-sm max-w-md mx-auto">
                      Thank you, <strong className="text-brand-text-dark">{name}</strong>. We have successfully registered your ticket for <strong className="text-primary-blue">{projectType}</strong>.
                    </p>
                  </div>

                  {/* Summary card */}
                  <div className="bg-brand-bg-light p-5 rounded-2xl border border-gray-100 max-w-md w-full text-left space-y-3 text-xs">
                    <div className="flex justify-between">
                      <span className="text-gray-400 font-bold uppercase">Customer Email:</span>
                      <span className="text-brand-text-dark font-medium">{email}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400 font-bold uppercase">Ticket Category:</span>
                      <span className="text-brand-text-dark font-medium">{projectType}</span>
                    </div>
                    {uploadedFiles.length > 0 && (
                      <div className="flex justify-between">
                        <span className="text-gray-400 font-bold uppercase">Attached Assets:</span>
                        <span className="text-brand-text-dark font-medium">
                          {uploadedFiles.map((f) => f.name).join(", ")}
                        </span>
                      </div>
                    )}
                    <hr className="border-gray-200" />
                    <p className="text-center font-semibold text-primary-blue text-[11px] flex items-center justify-center gap-1.5">
                      <Clock className="w-3.5 h-3.5" />
                      Senior lead designer will contact you within 15 minutes.
                    </p>
                  </div>

                  <button
                    onClick={resetForm}
                    className="bg-primary-blue hover:bg-primary-blue/90 text-white font-bold text-sm py-3 px-6 rounded-xl transition-all shadow cursor-pointer"
                  >
                    Submit Another File
                  </button>
                </motion.div>
              )}
            </AnimatePresence>

          </div>

        </div>

      </div>
    </section>
  );
}
