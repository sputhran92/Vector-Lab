import React, { useState } from "react";
import { Search, Calendar, Clock, User, ArrowRight, X, BookOpen, ChevronRight, Share2, Sparkles, SlidersHorizontal } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface BlogPost {
  id: string;
  title: string;
  summary: string;
  category: "Branding" | "Apparel" | "Fabrication" | "Vector Basics";
  author: string;
  date: string;
  readTime: string;
  content: string[];
  imageGradient: string;
}

export default function Blogs() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [activeBlog, setActiveBlog] = useState<BlogPost | null>(null);

  const blogs: BlogPost[] = [
    {
      id: "manual-vs-auto",
      title: "The Ultimate Guide to Manual Vector Tracing vs. Auto-Tracing",
      summary: "Explore why manual anchor-point recreation beats machine-generated Image Trace algorithms every single time for production-ready designs.",
      category: "Vector Basics",
      author: "Marcus Chen (Senior Vector Designer)",
      date: "July 12, 2026",
      readTime: "6 min read",
      imageGradient: "from-blue-500 to-indigo-600",
      content: [
        "In the digital design workspace, the allure of 'one-click' auto-tracing software is undeniable. Tools like Adobe Illustrator's Image Trace promise to instantly convert fuzzy pixel grids into pristine vector artwork. But for professional fabricators, apparel printers, and brand managers, auto-tracing is a critical pitfall.",
        "Auto-trace engines work by executing color-contrast boundary detection algorithms. They cannot understand the underlying design intent. A circle becomes a bumpy polygon; a sharp sans-serif font letter gets rounded into blobby corners; and complex intersections get fused into messy, uneditable nodes.",
        "Manual tracing, on the other hand, is a master-level craft. A professional designer inspects the original asset, selects the Pen Tool, and manually drafts bezier anchor points. This human-led approach ensures that curves are perfectly tangential, symmetrical shapes are mathematically balanced, and the anchor point count is minimized. Fewer anchor points translate to cleaner cuts on vinyl plotters and seamless stitching on embroidery runs.",
        "When consistency, scalability, and technical perfection matter, manual tracing is the only standard that guarantees production-ready assets."
      ]
    },
    {
      id: "screen-printing-prep",
      title: "Prepping Graphics for Screen Printing and Direct-to-Garment",
      summary: "Learn essential tips on color separations, solid color fills, and why flat vectors are a screen printer's best friend.",
      category: "Apparel",
      author: "Sarah Jenkins (Apparel Lead)",
      date: "June 28, 2026",
      readTime: "5 min read",
      imageGradient: "from-rose-500 to-orange-500",
      content: [
        "Screen printing is a physical chemistry process. Each color in your design requires its own custom mesh screen, exposing light-sensitive emulsion to solid, opaque film positives. Therefore, the artwork must be structured perfectly for color isolation.",
        "Raster images with gradients or anti-aliased soft edges create 'halftones' that are difficult to isolate cleanly without expensive color-separation programs. Vectors solve this naturally by defining flat, absolute boundaries for each colored region.",
        "When preparing vector artwork for apparel, always use standard Pantone Solid Coated colors. This allows physical ink mixing to precisely match the digital intent. Additionally, ensure all overlapping shapes are 'knocked out' or 'merged' so ink layers don't stack excessively, leading to thick, heavy 'hand-feel' prints that crack after three washes.",
        "By delivering clean, single-layer hand-traced vectors with absolute paths, apparel shops can directly import the file and burn screens in minutes."
      ]
    },
    {
      id: "recreating-lost-logo",
      title: "How to Recreate a Lost Logo from a Low-Res Screenshot",
      summary: "A behind-the-scenes walkthrough of restoring historic brand files using geometry, custom typography tracing, and path math.",
      category: "Branding",
      author: "David Vance (Brand Architect)",
      date: "June 15, 2026",
      readTime: "8 min read",
      imageGradient: "from-emerald-500 to-teal-600",
      content: [
        "It happens to the best of companies: years pass, marketing agencies change, and suddenly the original vector logo files are nowhere to be found. All that remains is a blurry 200px wide JPEG on a historical website header or a scan of an old business card.",
        "Recreating a brand's visual identity from low-resolution pixels is equal parts forensic science and fine art. The first step is identifying the core geometric system. We analyze the logo's structure to determine if it is based on golden ratio proportions, nested circles, or a strict grid alignment.",
        "Next comes typography reconstruction. Since font files evolve, matching legacy text requires manual curve drawing. We outline each letter stem, terminal, and counter individually rather than looking for a close system font alternative.",
        "The final result is more than just a vector copy; it is a brand restoration that honors the original creator's blueprint with modern technical compliance."
      ]
    },
    {
      id: "laser-cutting-cnc",
      title: "Designing for Laser Cutting, CNC Routing, and Metal Engraving",
      summary: "Why vector lines, closed physical paths, and exact coordinate boundaries are non-negotiable for manufacturing fabrication.",
      category: "Fabrication",
      author: "Viktor Kovalenko (Industrial Fabrication Specialist)",
      date: "May 30, 2026",
      readTime: "7 min read",
      imageGradient: "from-indigo-500 to-purple-600",
      content: [
        "Unlike computer monitors that display color pixels, laser cutters, waterjets, and CNC routing machines navigate physical space. They interpret vector lines as exact travel paths for a laser head, cutter blade, or plasma torch.",
        "If a vector file contains overlapping lines or unjoined 'open' coordinates, the CNC laser will double-cut the same area, burning or warping the material. If paths are not fully closed, the cut-out shape will fail to separate from the main sheet.",
        "When we prepare files for fabrication, we double-check the wireframe using zero-stroke modes. We delete double lines, merge overlapping nodes, and ensure all curves are smooth, continuous bezier splines. This reduces physical cutting friction, avoids burning, and produces ultra-smooth product edges.",
        "Ensuring correct vector compliance saves hours of machine calibration and prevents wasting expensive sheet metals, woods, or acrylics."
      ]
    },
    {
      id: "pantone-matching",
      title: "The Role of Pantone Color Matching in Brand Preservation",
      summary: "Understand how to maintain strict brand color integrity across both digital screens and physical print using vector swatches.",
      category: "Branding",
      author: "David Vance (Brand Architect)",
      date: "May 14, 2026",
      readTime: "5 min read",
      imageGradient: "from-amber-500 to-pink-500",
      content: [
        "Have you ever noticed how a brand's blue looks electric on a mobile screen, but dull and purple on a printed brochure? This is the core challenge of RGB (light-based) versus CMYK (pigment-based) color spaces.",
        "To bridge this gap, the Pantone Matching System (PMS) provides a universal color standard. By encoding vectors with specific Pantone swatches, you guarantee that whether the file is sent to a digital banner printer in Seattle or an offset packaging press in Tokyo, the output color will remain identical.",
        "In our vector tracing pipeline, we cross-reference raw raster RGB values with the physical Pantone Solid Coated bridge formula. This ensures that your brand guidelines are built into the source file metadata.",
        "Preserving your brand's unique color signature creates subconscious trust and immediate recognition among consumers."
      ]
    },
    {
      id: "bezier-curves-mastery",
      title: "Understanding Bezier Curves and Anchor Point Placement",
      summary: "Expert tips and guidelines for achieving perfect curves using the absolute minimum number of vector anchor points.",
      category: "Vector Basics",
      author: "Marcus Chen (Senior Vector Designer)",
      date: "April 29, 2026",
      readTime: "6 min read",
      imageGradient: "from-cyan-500 to-blue-600",
      content: [
        "The defining signature of a novice vector designer is an abundance of anchor points. Placing an anchor point every few pixels results in jagged, bumpy curves that look amateurish and print poorly.",
        "The secret to vector mastery lies in the 'Rule of Extremas'. Anchor points should only be placed at the outermost horizontal and vertical points of a curve. The curve itself should be shaped entirely by pulling the bezier handles out at 0, 90, 180, or 270-degree angles.",
        "This coordinate alignment guarantees mathematically flawless transitions and simplifies future file edits. If you ever need to change a logo's proportions, adjusting four anchors is far easier than fighting forty.",
        "By focusing on geometric restraint, we deliver vector assets that are extremely lightweight, infinitely scalable, and simple for any developer or printer to adjust."
      ]
    },
    {
      id: "file-formats-explained",
      title: "Best Vector File Formats Explained: AI, EPS, SVG, and PDF",
      summary: "Demystifying file extensions so you know exactly which scale-free vector format is required for web, print, or fabrication.",
      category: "Vector Basics",
      author: "Sarah Jenkins (Apparel Lead)",
      date: "April 10, 2026",
      readTime: "4 min read",
      imageGradient: "from-violet-500 to-fuchsia-600",
      content: [
        "You've received your final vector tracing delivery bundle, and it contains five different file extensions: .ai, .eps, .svg, .pdf, and .png. Which one do you actually use for your next campaign?",
        "**AI (Adobe Illustrator)**: The ultimate native working project file. Keep this safe! It retains all layer groups, swatches, transparency states, and editing history.",
        "**EPS (Encapsulated PostScript)**: The standard universal format for professional commercial printing. If you are sending graphics to an external print house for banners or billboards, this is their favorite format.",
        "**SVG (Scalable Vector Graphics)**: The vector format built specifically for the web. SVGs are written in XML code, meaning they are incredibly tiny files, load instantly, and remain razor-sharp on high-resolution Retina screens.",
        "**PDF (Portable Document Format)**: The perfect file for cross-platform sharing. Anyone can open it on their phone or laptop, yet it still holds vector path data inside for immediate high-quality print.",
        "Having the full arsenal of formats ensures your business is fully equipped for any creative production workflow."
      ]
    },
    {
      id: "large-format-signage",
      title: "Scalable Signage: Prepping Large-Format Banner Vectors",
      summary: "How to ensure vehicle wraps, billboards, and trade show displays stay perfectly crisp, lightweight, and render without crashing printing rigs.",
      category: "Fabrication",
      author: "Viktor Kovalenko (Industrial Fabrication Specialist)",
      date: "March 24, 2026",
      readTime: "7 min read",
      imageGradient: "from-teal-500 to-emerald-600",
      content: [
        "Designing a billboard is visually different from designing a business card, but technically they share one rule: if the source image is raster-based, scaling it up to 40 feet wide will result in massive, ugly pixelated blocks.",
        "A 300 DPI image at billboard scale would result in a file size of over 15 Gigabytes, which would crash most standard design computers and printer rigs. A vector file of the exact same billboard, however, is often less than 2 Megabytes.",
        "Vectors represent shapes as mathematical equations (coordinates, curves, fills), not grids of colored pixels. You can scale a 2-inch vector logo to the size of a mountain, and it will render in milliseconds with zero pixel degradation.",
        "When we prepare large-format banners, we also ensure correct boundary bleeds and crop marks are integrated into the vector output, guaranteeing a stress-free install."
      ]
    },
    {
      id: "sketch-to-vector-pipeline",
      title: "Sketch-to-Vector: Digitizing Hand-Drawn Notebook Illustrations",
      summary: "A step-by-step look at how raw pencil sketches on paper are transformed into clean, balanced digital vectors.",
      category: "Apparel",
      author: "Marcus Chen (Senior Vector Designer)",
      date: "March 05, 2026",
      readTime: "5 min read",
      imageGradient: "from-sky-500 to-indigo-500",
      content: [
        "Many of the greatest logos and illustrations start on a humble napkin or lined notebook page. But a raw pencil sketch cannot be directly printed on products or integrated into web applications.",
        "Our digitization pipeline begins by importing the high-resolution photo or scan of the sketch. We reduce its opacity to create a 'template layer'. Our senior designers then analyze the sketch to identify the structural lines that should be perfectly straight, and the curves that require mathematical symmetry.",
        "We don't simply trace over the pencil lines—pencil lines are often shaky or uneven. We re-engineer the illustration using clean geometric primitives (perfect circles, arcs, polygons) to bring professional polish to the raw idea.",
        "This hybrid approach preserves the unique human soul of your hand-drawn concept while elevating it into a clean, modern digital asset."
      ]
    },
    {
      id: "embroidery-digitization",
      title: "Why Embroidery Digitization Requires Clean Hand-Traced Vectors",
      summary: "How jagged automatic tracing lines destroy embroidery stitching layouts and ruin expensive sewing machinery.",
      category: "Fabrication",
      author: "Sarah Jenkins (Apparel Lead)",
      date: "February 18, 2026",
      readTime: "6 min read",
      imageGradient: "from-orange-500 to-rose-600",
      content: [
        "Embroidery machines are highly specialized robots that stitch patterns using physical threads. To program these machines, designers use 'digitization software' that converts graphic shapes into stitch directions, densities, and thread sequences.",
        "If you feed an auto-traced graphic into embroidery software, the messy zigzag lines and stray anchor points create chaotic stitch paths. The sewing needle will bunch up in the same spot, breaking the thread, warping the fabric, or even snapping the machine's needle.",
        "By contrast, hand-drawn vector paths feature clean, logical directions. The software can easily calculate satin stitches, fill stitches, and running borders because the vector's coordinates are clean and deliberate.",
        "A perfect physical embroidered patch or polo shirt logo is only as good as the underlying vector lines that guide the machine's needle."
      ]
    }
  ];

  // Filtering & Search logic
  const filteredBlogs = blogs.filter((blog) => {
    const matchesSearch =
      blog.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      blog.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
      blog.author.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCategory =
      selectedCategory === "All" || blog.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  const categories = ["All", "Branding", "Apparel", "Fabrication", "Vector Basics"];

  return (
    <section className="py-12 md:py-16 bg-white min-h-[75vh]" id="blogs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Page Title Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-4" id="blogs-page-header">
          <span className="text-primary-blue text-xs font-bold uppercase tracking-widest bg-primary-blue/10 px-3 py-1 rounded-full inline-flex items-center gap-1.5">
            <BookOpen className="w-3.5 h-3.5" />
            Knowledge Base & Insights
          </span>
          <h2 className="text-3xl md:text-4xl font-extrabold text-brand-text-dark tracking-tight">
            Vector Design & Printing Blogs
          </h2>
          <p className="text-brand-text-body text-base md:text-lg">
            Stay ahead with the latest industry guides, technical workflows, print preparation checklists, and brand preservation advice written by our senior design team.
          </p>
        </div>

        {/* Search and Filters panel */}
        <div className="bg-brand-bg-light p-5 rounded-2xl border border-gray-100 mb-10 flex flex-col md:flex-row items-center justify-between gap-4" id="blogs-filter-bar">
          {/* Live Search */}
          <div className="relative w-full md:max-w-md">
            <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none text-gray-400">
              <Search className="w-5 h-5" />
            </span>
            <input
              type="text"
              placeholder="Search guides, authors, keywords..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white text-brand-text-dark pl-11 pr-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-primary-blue focus:ring-2 focus:ring-primary-blue/10 text-sm transition-all shadow-xs"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-gray-600"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Categories select */}
          <div className="flex flex-wrap items-center justify-center gap-2" id="blog-category-pills">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  selectedCategory === cat
                    ? "bg-primary-blue text-white shadow-xs scale-105"
                    : "bg-white text-gray-600 hover:bg-gray-100 border border-gray-200"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Blogs grid */}
        {filteredBlogs.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8" id="blogs-grid">
            {filteredBlogs.map((blog, idx) => (
              <motion.article
                key={blog.id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, delay: idx * 0.04 }}
                className="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-xs hover:shadow-md transition-all duration-300 flex flex-col justify-between h-full group"
                id={`blog-card-${blog.id}`}
              >
                <div>
                  {/* Card Header Gradient cover */}
                  <div className={`h-40 bg-gradient-to-br ${blog.imageGradient} p-6 flex flex-col justify-between relative overflow-hidden`}>
                    <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -mr-8 -mt-8 blur-xl" />
                    
                    <span className="self-start text-[10px] font-extrabold uppercase tracking-widest bg-white/20 backdrop-blur-md text-white px-2.5 py-1 rounded-full">
                      {blog.category}
                    </span>

                    <div className="flex items-center gap-3 text-white/95 text-xs">
                      <div className="flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5" />
                        <span>{blog.date}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5" />
                        <span>{blog.readTime}</span>
                      </div>
                    </div>
                  </div>

                  {/* Card Body content */}
                  <div className="p-6 space-y-3">
                    <h3 className="text-lg font-extrabold text-brand-text-dark group-hover:text-primary-blue transition-colors line-clamp-2 leading-snug">
                      {blog.title}
                    </h3>
                    <p className="text-brand-text-body text-xs sm:text-sm line-clamp-3 leading-relaxed">
                      {blog.summary}
                    </p>
                  </div>
                </div>

                {/* Card Footer author info & CTA */}
                <div className="px-6 pb-6 pt-4 border-t border-gray-50 flex items-center justify-between mt-auto">
                  <div className="flex items-center gap-1.5 text-xs text-brand-text-body">
                    <User className="w-3.5 h-3.5 text-primary-blue" />
                    <span className="truncate max-w-[120px] font-medium">{blog.author.split(" (")[0]}</span>
                  </div>

                  <button
                    onClick={() => setActiveBlog(blog)}
                    className="text-xs font-extrabold text-primary-blue hover:text-accent-blue transition-colors flex items-center gap-1 cursor-pointer"
                  >
                    Read Guide
                    <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
                  </button>
                </div>
              </motion.article>
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-brand-bg-light rounded-2xl border border-dashed border-gray-200" id="blogs-empty-state">
            <BookOpen className="w-12 h-12 text-gray-300 mx-auto mb-3" />
            <h4 className="font-bold text-brand-text-dark text-base">No guides match your filter</h4>
            <p className="text-xs text-brand-text-body max-w-sm mx-auto mt-1">
              Try adjusting your keyword query or select a different design and vector category pill above.
            </p>
            <button
              onClick={() => { setSearchQuery(""); setSelectedCategory("All"); }}
              className="mt-4 text-xs font-bold bg-primary-blue text-white px-4 py-2 rounded-xl hover:bg-primary-blue/90 transition-all cursor-pointer"
            >
              Reset Filters
            </button>
          </div>
        )}

        {/* Detailed Modal Overlay for Active Blog Reader */}
        <AnimatePresence>
          {activeBlog && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/60 backdrop-blur-xs z-[150] flex items-center justify-center p-4"
              onClick={() => setActiveBlog(null)}
              id="blog-modal-backdrop"
            >
              <motion.div
                initial={{ scale: 0.95, y: 15 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.95, y: 15 }}
                transition={{ type: "spring", duration: 0.4 }}
                className="bg-white w-full max-w-3xl rounded-2xl shadow-2xl max-h-[85vh] overflow-y-auto"
                onClick={(e) => e.stopPropagation()}
                id="blog-reader-modal"
              >
                {/* Modal Cover Image */}
                <div className={`h-48 md:h-56 bg-gradient-to-br ${activeBlog.imageGradient} p-8 flex flex-col justify-between relative`}>
                  <button
                    onClick={() => setActiveBlog(null)}
                    className="absolute top-4 right-4 bg-white/20 hover:bg-white/30 text-white p-2 rounded-xl transition-all border border-white/10 cursor-pointer"
                    aria-label="Close reader"
                  >
                    <X className="w-5 h-5" />
                  </button>

                  <span className="self-start text-xs font-extrabold uppercase tracking-widest bg-white/25 text-white px-3 py-1 rounded-full">
                    {activeBlog.category}
                  </span>

                  <div>
                    <h3 className="text-xl md:text-2xl font-black text-white leading-tight pr-8">
                      {activeBlog.title}
                    </h3>
                  </div>
                </div>

                {/* Modal Metadata Line */}
                <div className="px-6 py-4 bg-brand-bg-light border-b border-gray-100 flex flex-wrap items-center gap-y-2 gap-x-6 text-xs text-brand-text-body">
                  <span className="flex items-center gap-1.5 font-bold text-brand-text-dark">
                    <User className="w-4 h-4 text-primary-blue" />
                    {activeBlog.author}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Calendar className="w-4 h-4 text-primary-blue" />
                    {activeBlog.date}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Clock className="w-4 h-4 text-primary-blue" />
                    {activeBlog.readTime}
                  </span>
                </div>

                {/* Modal Body content */}
                <div className="p-6 md:p-8 space-y-5 text-sm sm:text-base text-brand-text-body leading-relaxed">
                  {activeBlog.content.map((paragraph, index) => (
                    <p key={index} className="text-brand-text-body">
                      {paragraph}
                    </p>
                  ))}
                </div>

                {/* Modal Footer actions */}
                <div className="p-6 border-t border-gray-100 bg-gray-50 flex items-center justify-between rounded-b-2xl">
                  <div className="flex items-center gap-2 text-xs text-gray-400">
                    <Sparkles className="w-4 h-4 text-primary-blue" />
                    <span>Meticulously verified vector resource</span>
                  </div>
                  <button
                    onClick={() => setActiveBlog(null)}
                    className="bg-primary-blue hover:bg-primary-blue/90 text-white font-extrabold text-xs py-2 px-5 rounded-lg transition-all cursor-pointer"
                  >
                    Close Reader
                  </button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </section>
  );
}
