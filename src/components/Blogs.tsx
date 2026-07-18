import React, { useState, useEffect } from "react";
import { 
  Search, 
  Calendar, 
  Clock, 
  User, 
  ArrowRight, 
  ArrowLeft, 
  X, 
  BookOpen, 
  Share2, 
  Sparkles, 
  Mail, 
  CheckCircle2, 
  Bookmark, 
  ThumbsUp, 
  MessageSquare,
  Compass,
  FileText
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

import { BlogPost, blogs } from "../data/blogsData";

export default function Blogs() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [activeBlog, setActiveBlog] = useState<BlogPost | null>(null);
  const [emailInput, setEmailInput] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [likedPosts, setLikedPosts] = useState<Record<string, boolean>>({});
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Automatically scroll to top when changing active blog
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [activeBlog]);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (emailInput.trim()) {
      setIsSubscribed(true);
      setTimeout(() => {
        setEmailInput("");
      }, 3000);
    }
  };

  const handleLike = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setLikedPosts(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const copyToClipboard = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const url = `${window.location.origin}/blogs/${id}`;
    navigator.clipboard.writeText(url).then(() => {
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 2000);
    });
  };

  // Filtering & Search logic
  const filteredBlogs = blogs.filter((blog) => {
    const matchesSearch =
      blog.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      blog.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
      blog.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
      blog.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesCategory =
      selectedCategory === "All" || blog.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  const categories = ["All", "Branding", "Apparel", "Fabrication", "Vector Basics"];
  
  // Featured Blog post is always the manual-vs-auto guide
  const featuredBlog = blogs.find(b => b.id === "manual-vs-auto") || blogs[0];
  const gridBlogs = filteredBlogs.filter(b => b.id !== (activeBlog ? "" : featuredBlog.id));

  // Render Category-Specific SVG Decorative Illustration to feel like an actual high-end trace lab
  const renderCardIllustration = (category: string) => {
    switch (category) {
      case "Vector Basics":
        return (
          <svg className="w-full h-full opacity-20 absolute inset-0 text-white" viewBox="0 0 200 100" fill="none" stroke="currentColor" strokeWidth="1">
            <path d="M20,50 C60,20 140,80 180,50" />
            <circle cx="20" cy="50" r="3.5" fill="currentColor" />
            <circle cx="180" cy="50" r="3.5" fill="currentColor" />
            <circle cx="75" cy="40" r="2.5" fill="currentColor" />
            <line x1="75" y1="40" x2="60" y2="20" strokeDasharray="2" />
            <rect x="57" y="17" width="6" height="6" fill="currentColor" />
            <line x1="125" y1="60" x2="140" y2="80" strokeDasharray="2" />
            <rect x="137" y="77" width="6" height="6" fill="currentColor" />
            <circle cx="125" cy="60" r="2.5" fill="currentColor" />
          </svg>
        );
      case "Apparel":
        return (
          <svg className="w-full h-full opacity-20 absolute inset-0 text-white" viewBox="0 0 200 100" fill="none" stroke="currentColor" strokeWidth="1">
            <path d="M40,25 L65,25 L75,35 L90,15 L110,15 L125,35 L135,25 L160,25 L165,55 L145,55 L145,85 L55,85 L55,55 L35,55 Z" />
            <circle cx="100" cy="50" r="15" strokeDasharray="2" />
            <path d="M90,50 L110,50" />
            <path d="M100,40 L100,60" />
          </svg>
        );
      case "Branding":
        return (
          <svg className="w-full h-full opacity-20 absolute inset-0 text-white" viewBox="0 0 200 100" fill="none" stroke="currentColor" strokeWidth="1">
            <rect x="60" y="20" width="80" height="60" rx="4" />
            <circle cx="100" cy="50" r="18" />
            <polygon points="100,38 111,58 89,58" />
            <line x1="40" y1="50" x2="60" y2="50" />
            <line x1="140" y1="50" x2="160" y2="50" />
          </svg>
        );
      case "Fabrication":
        return (
          <svg className="w-full h-full opacity-20 absolute inset-0 text-white" viewBox="0 0 200 100" fill="none" stroke="currentColor" strokeWidth="0.75">
            <grid width="10" height="10" />
            <line x1="10" y1="10" x2="190" y2="90" strokeDasharray="4" />
            <circle cx="100" cy="50" r="30" />
            <path d="M85,35 L115,65 M115,35 L85,65" />
            <rect x="25" y="15" width="150" height="70" strokeDasharray="3 3" />
          </svg>
        );
      default:
        return null;
    }
  };

  return (
    <section className="py-12 md:py-20 bg-gray-50 min-h-[85vh] transition-all duration-500" id="blogs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <AnimatePresence mode="wait">
          {!activeBlog ? (
            /* ========================================================================= */
            /* 1. MAIN BLOG INDEX VIEW                                                   */
            /* ========================================================================= */
            <motion.div
              key="blog-list"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="space-y-12"
            >
              {/* Header Title block */}
              <div className="text-center max-w-3xl mx-auto space-y-4 mb-10">
                <span className="text-primary-blue text-xs font-bold uppercase tracking-widest bg-primary-blue/10 px-4.5 py-1.5 rounded-full inline-flex items-center gap-2 shadow-xs">
                  <Sparkles className="w-3.5 h-3.5 animate-pulse text-primary-blue" />
                  Vector Design Journal & Guides
                </span>
                <h1 className="text-3xl md:text-5xl font-extrabold text-brand-text-dark tracking-tight leading-tight">
                  Insights from the <span className="text-primary-blue">Trace Lab</span>
                </h1>
                <p className="text-gray-500 text-sm md:text-base max-w-2xl mx-auto leading-relaxed">
                  Discover production-ready print checklists, vectorization design standards, typography restoration files, and professional industry guides.
                </p>
              </div>

              {/* Featured Post Card (Highly prominent, split layout) */}
              {selectedCategory === "All" && !searchQuery && featuredBlog && (
                <div className="bg-white rounded-3xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-500 group" id="featured-post-card">
                  <div className="grid grid-cols-1 lg:grid-cols-12">
                    {/* Left Column: Cover Pattern */}
                    <div className="lg:col-span-5 bg-slate-900 relative min-h-[250px] lg:min-h-[380px] flex items-center justify-center p-8 overflow-hidden">
                      <img 
                        src={featuredBlog.heroImage} 
                        alt={featuredBlog.title} 
                        className="absolute inset-0 w-full h-full object-cover z-0 group-hover:scale-105 transition-transform duration-700 opacity-60"
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute inset-0 bg-gradient-to-tr from-slate-950 via-slate-900/50 to-slate-950/25 z-0" />
                      
                      {/* Interactive Abstract bezier lines behind */}
                      <svg className="absolute inset-0 w-full h-full opacity-35 text-primary-blue z-0" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="0.5">
                        <path d="M0,50 C30,20 70,80 100,50" />
                        <path d="M0,30 C40,90 60,10 100,70" strokeDasharray="3" />
                        <circle cx="50" cy="50" r="2" fill="currentColor" />
                      </svg>

                      {/* Content badge and title inside graphic */}
                      <div className="relative z-10 text-center space-y-4">
                        <span className="bg-primary-blue/30 backdrop-blur-md text-white border border-white/20 text-[10px] font-bold uppercase tracking-widest px-3.5 py-1 rounded-full shadow-md">
                          Featured Blueprint
                        </span>
                        <div className="w-16 h-16 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 mx-auto flex items-center justify-center text-white shadow-lg">
                          <Compass className="w-8 h-8 text-primary-blue animate-spin-slow" />
                        </div>
                        <p className="text-white/80 text-[11px] font-mono tracking-wider">VECTOR TRACE LAB RESEARCH</p>
                      </div>
                    </div>

                    {/* Right Column: Editorial Details */}
                    <div className="lg:col-span-7 p-8 md:p-12 flex flex-col justify-between space-y-6">
                      <div className="space-y-4">
                        <div className="flex items-center gap-3 text-xs text-gray-400">
                          <span className="text-primary-blue font-bold uppercase tracking-wider">{featuredBlog.category}</span>
                          <span>•</span>
                          <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5" />{featuredBlog.date}</span>
                          <span>•</span>
                          <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" />{featuredBlog.readTime}</span>
                        </div>

                        <h2 className="text-2xl md:text-3xl font-black text-brand-text-dark leading-tight group-hover:text-primary-blue transition-colors">
                          {featuredBlog.title}
                        </h2>

                        <p className="text-gray-500 text-sm md:text-base leading-relaxed">
                          {featuredBlog.summary}
                        </p>

                        <div className="flex flex-wrap gap-1.5 pt-2">
                          {featuredBlog.tags.map(tag => (
                            <span key={tag} className="text-[11px] bg-gray-100 text-gray-600 px-2.5 py-1 rounded-md font-medium">
                              #{tag}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Footer author info & CTA */}
                      <div className="pt-6 border-t border-gray-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                        <div className="flex items-center gap-3">
                          <img 
                            src={featuredBlog.authorAvatar} 
                            alt={featuredBlog.author} 
                            className="w-10 h-10 rounded-full object-cover border-2 border-primary-blue/20" 
                          />
                          <div>
                            <p className="text-sm font-bold text-brand-text-dark">{featuredBlog.author}</p>
                            <p className="text-[11px] text-gray-400">{featuredBlog.authorTitle}</p>
                          </div>
                        </div>

                        <button
                          onClick={() => setActiveBlog(featuredBlog)}
                          className="bg-brand-text-dark hover:bg-primary-blue text-white hover:shadow-lg hover:shadow-primary-blue/20 transition-all duration-300 px-6 py-3 rounded-xl text-xs font-bold inline-flex items-center gap-2 self-start sm:self-auto cursor-pointer"
                        >
                          Read Featured Article
                          <ArrowRight className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Filters and Search Container */}
              <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-xs flex flex-col md:flex-row gap-6 items-center justify-between" id="blog-toolbar">
                {/* Search Bar */}
                <div className="relative w-full md:max-w-md">
                  <span className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none text-gray-400">
                    <Search className="w-5 h-5" />
                  </span>
                  <input
                    type="text"
                    placeholder="Search guides, vector workflows, keywords..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full bg-gray-50 text-brand-text-dark pl-12 pr-4 py-3 rounded-xl border border-gray-100 focus:outline-none focus:border-primary-blue focus:ring-4 focus:ring-primary-blue/5 text-sm transition-all placeholder:text-gray-400"
                  />
                  {searchQuery && (
                    <button
                      onClick={() => setSearchQuery("")}
                      className="absolute inset-y-0 right-0 flex items-center pr-3.5 text-gray-400 hover:text-gray-600"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  )}
                </div>

                {/* Categories Tab Navigation */}
                <div className="flex flex-wrap items-center justify-center gap-1.5" id="blog-category-nav">
                  {categories.map((cat) => (
                    <button
                      key={cat}
                      onClick={() => setSelectedCategory(cat)}
                      className={`px-4.5 py-2.5 rounded-xl text-xs font-bold transition-all duration-300 cursor-pointer ${
                        selectedCategory === cat
                          ? "bg-primary-blue text-white shadow-md shadow-primary-blue/15 scale-105"
                          : "bg-gray-50 text-gray-600 hover:bg-gray-100 border border-transparent hover:border-gray-200"
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>

              {/* Grid of Articles */}
              {filteredBlogs.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8" id="blogs-index-grid">
                  {/* If searching or filtering category, show all including featured, otherwise filter out featured */}
                  {(selectedCategory !== "All" || searchQuery ? filteredBlogs : gridBlogs).map((blog, idx) => (
                    <motion.article
                      key={blog.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: idx * 0.05 }}
                      onClick={() => setActiveBlog(blog)}
                      className="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-xs hover:shadow-lg hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between h-full cursor-pointer group"
                      id={`blog-card-${blog.id}`}
                    >
                      <div>
                        {/* Interactive Hero Image Header */}
                        <div className="h-48 relative overflow-hidden p-6 flex flex-col justify-between">
                          <img 
                            src={blog.heroImage} 
                            alt={blog.title} 
                            className="absolute inset-0 w-full h-full object-cover z-0 group-hover:scale-105 transition-transform duration-500"
                            referrerPolicy="no-referrer"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-900/30 to-slate-950/40 z-0" />
                          
                          {/* Beautiful thematic svg pattern overlay */}
                          <div className="absolute inset-0 z-0 opacity-20">
                            {renderCardIllustration(blog.category)}
                          </div>

                          <div className="relative z-10 flex items-center justify-between">
                            <span className="text-[10px] font-extrabold uppercase tracking-widest bg-white/20 backdrop-blur-md text-white border border-white/10 px-2.5 py-1 rounded-full">
                              {blog.category}
                            </span>
                            <div className="flex items-center gap-1.5">
                              <button 
                                onClick={(e) => handleLike(blog.id, e)}
                                className="w-8 h-8 rounded-lg bg-white/15 backdrop-blur-md border border-white/10 text-white flex items-center justify-center hover:bg-white/25 transition-all"
                                title="Like guide"
                              >
                                <ThumbsUp className={`w-3.5 h-3.5 ${likedPosts[blog.id] ? "fill-white text-white" : ""}`} />
                              </button>
                              <button 
                                onClick={(e) => copyToClipboard(blog.id, e)}
                                className="w-8 h-8 rounded-lg bg-white/15 backdrop-blur-md border border-white/10 text-white flex items-center justify-center hover:bg-white/25 transition-all relative"
                                title="Copy post link"
                              >
                                {copiedId === blog.id ? (
                                  <span className="absolute -top-8 left-1/2 -translate-x-1/2 bg-slate-900 text-white text-[10px] px-2 py-0.5 rounded shadow-md whitespace-nowrap">Copied!</span>
                                ) : null}
                                <Share2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </div>

                          <div className="relative z-10 flex items-center gap-3 text-white/95 text-xs">
                            <div className="flex items-center gap-1">
                              <Calendar className="w-3.5 h-3.5 text-white/80" />
                              <span>{blog.date}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Clock className="w-3.5 h-3.5 text-white/80" />
                              <span>{blog.readTime}</span>
                            </div>
                          </div>
                        </div>

                        {/* Article Text */}
                        <div className="p-6 space-y-3">
                          <h3 className="text-lg font-bold text-brand-text-dark group-hover:text-primary-blue transition-colors line-clamp-2 leading-snug">
                            {blog.title}
                          </h3>
                          <p className="text-gray-500 text-xs sm:text-sm line-clamp-3 leading-relaxed">
                            {blog.summary}
                          </p>
                        </div>
                      </div>

                      {/* Card Footer */}
                      <div className="px-6 pb-6 pt-4 border-t border-gray-50 flex items-center justify-between mt-auto">
                        <div className="flex items-center gap-2">
                          <img 
                            src={blog.authorAvatar} 
                            alt={blog.author} 
                            className="w-7 h-7 rounded-full object-cover border border-gray-200" 
                          />
                          <span className="text-xs text-gray-500 font-medium truncate max-w-[120px]">{blog.author}</span>
                        </div>

                        <span className="text-xs font-bold text-primary-blue group-hover:text-accent-blue transition-colors flex items-center gap-1.5">
                          Read Guide
                          <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                        </span>
                      </div>
                    </motion.article>
                  ))}
                </div>
              ) : (
                /* Empty Search State */
                <div className="text-center py-20 bg-white rounded-2xl border border-dashed border-gray-200 shadow-xs" id="blogs-empty-state">
                  <FileText className="w-14 h-14 text-gray-300 mx-auto mb-4" />
                  <h4 className="font-extrabold text-brand-text-dark text-lg">No blueprints found</h4>
                  <p className="text-sm text-gray-400 max-w-sm mx-auto mt-2">
                    We couldn't find any guides matching "{searchQuery}". Please try adjusting your search terms or choosing a category pill above.
                  </p>
                  <button
                    onClick={() => { setSearchQuery(""); setSelectedCategory("All"); }}
                    className="mt-6 text-xs font-bold bg-primary-blue text-white px-5 py-2.5 rounded-xl hover:bg-primary-blue/90 transition-all cursor-pointer shadow-xs"
                  >
                    Reset Filters
                  </button>
                </div>
              )}

              {/* Premium News Letter Section */}
              <div className="bg-brand-text-dark text-white rounded-3xl p-8 md:p-12 relative overflow-hidden shadow-xl" id="blog-newsletter">
                <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-brand-text-dark to-primary-blue/10 z-0" />
                
                {/* Decorative absolute element */}
                <div className="absolute -top-24 -right-24 w-64 h-64 bg-primary-blue/10 rounded-full blur-3xl z-0" />

                <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                  <div className="lg:col-span-7 space-y-4">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-primary-blue bg-primary-blue/20 border border-primary-blue/30 px-3 py-1 rounded-full inline-block">
                      Vector Weekly Newsletter
                    </span>
                    <h2 className="text-2xl md:text-3.5xl font-black tracking-tight leading-tight">
                      Get the technical print checklists, vector guides directly in your inbox.
                    </h2>
                    <p className="text-gray-400 text-sm md:text-base max-w-xl leading-relaxed">
                      Zero spam. Just masterclass advice from industry-leading vector trace experts on how to make your brand assets flawlessly scale-free.
                    </p>
                  </div>

                  <div className="lg:col-span-5">
                    <AnimatePresence mode="wait">
                      {!isSubscribed ? (
                        <motion.form 
                          key="newsletter-form"
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          onSubmit={handleSubscribe} 
                          className="flex flex-col sm:flex-row gap-2.5"
                        >
                          <input
                            type="email"
                            required
                            placeholder="Enter your work email..."
                            value={emailInput}
                            onChange={(e) => setEmailInput(e.target.value)}
                            className="flex-grow bg-white/10 text-white placeholder:text-gray-400 border border-white/15 px-4.5 py-3.5 rounded-xl text-sm focus:outline-none focus:border-primary-blue focus:ring-4 focus:ring-primary-blue/15 transition-all"
                          />
                          <button
                            type="submit"
                            className="bg-primary-blue hover:bg-accent-blue text-white font-extrabold text-sm px-6 py-3.5 rounded-xl shadow-lg shadow-primary-blue/15 hover:shadow-primary-blue/25 transition-all whitespace-nowrap cursor-pointer"
                          >
                            Join Free
                          </button>
                        </motion.form>
                      ) : (
                        <motion.div 
                          key="newsletter-success"
                          initial={{ opacity: 0, scale: 0.9 }}
                          animate={{ opacity: 1, scale: 1 }}
                          className="bg-primary-blue/15 border border-primary-blue/30 p-6 rounded-2xl flex items-start gap-4"
                        >
                          <CheckCircle2 className="w-6 h-6 text-primary-blue shrink-0 mt-0.5" />
                          <div>
                            <h4 className="font-bold text-white text-base">You're in the Loop!</h4>
                            <p className="text-xs text-gray-300 mt-1 leading-relaxed">
                              Welcome to the Vector weekly insights. Keep an eye on your inbox for our curated templates and technical print rules.
                            </p>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>
              </div>

            </motion.div>
          ) : (
            /* ========================================================================= */
            /* 2. DEDICATED FULL-PAGE ARTICLE READING VIEW                               */
            /* ========================================================================= */
            <motion.div
              key="blog-article-reader"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 30 }}
              transition={{ duration: 0.4 }}
              className="space-y-10"
              id="full-article-view"
            >
              {/* Floating Action Header Bar */}
              <div className="flex items-center justify-between pb-4 border-b border-gray-200">
                <button
                  onClick={() => setActiveBlog(null)}
                  className="flex items-center gap-2 text-xs font-bold text-gray-600 hover:text-primary-blue bg-white px-4 py-2.5 rounded-xl border border-gray-100 hover:border-primary-blue/30 shadow-xs hover:shadow-sm transition-all cursor-pointer"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Back to Insights
                </button>

                <div className="flex items-center gap-2">
                  <button
                    onClick={(e) => handleLike(activeBlog.id, e)}
                    className="flex items-center gap-1.5 text-xs font-bold bg-white px-4 py-2.5 rounded-xl border border-gray-100 hover:border-rose-500/30 text-gray-600 hover:text-rose-500 shadow-xs transition-all cursor-pointer"
                  >
                    <ThumbsUp className={`w-4 h-4 ${likedPosts[activeBlog.id] ? "fill-rose-500 text-rose-500" : ""}`} />
                    <span>{likedPosts[activeBlog.id] ? "Liked" : "Helpful"}</span>
                  </button>
                  <button
                    onClick={(e) => copyToClipboard(activeBlog.id, e)}
                    className="flex items-center gap-1.5 text-xs font-bold bg-white px-4 py-2.5 rounded-xl border border-gray-100 hover:border-primary-blue/30 text-gray-600 hover:text-primary-blue shadow-xs transition-all relative cursor-pointer"
                  >
                    {copiedId === activeBlog.id ? (
                      <span className="absolute -top-9 left-1/2 -translate-x-1/2 bg-slate-900 text-white text-[10px] px-2.5 py-1 rounded shadow-md">Copied Link!</span>
                    ) : null}
                    <Share2 className="w-4 h-4" />
                    <span>Share Link</span>
                  </button>
                </div>
              </div>

              {/* Article Main Layout Container */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
                
                {/* Left Side: Article Body content (Col span 8) */}
                <article className="lg:col-span-8 bg-white rounded-3xl border border-gray-100 shadow-xs p-6 md:p-10 space-y-8">
                  {/* Article metadata category & tags */}
                  <div className="space-y-4">
                    <span className="text-[10px] font-extrabold uppercase tracking-widest bg-primary-blue/10 text-primary-blue px-3 py-1.5 rounded-full inline-block">
                      {activeBlog.category}
                    </span>

                    <h1 className="text-2.5xl md:text-4xl font-black text-brand-text-dark tracking-tight leading-tight">
                      {activeBlog.title}
                    </h1>

                    <div className="flex flex-wrap items-center gap-x-6 gap-y-3 text-xs text-gray-400 pt-1">
                      <div className="flex items-center gap-2">
                        <img 
                          src={activeBlog.authorAvatar} 
                          alt={activeBlog.author} 
                          className="w-8 h-8 rounded-full object-cover border border-gray-200" 
                        />
                        <div className="leading-tight">
                          <p className="font-bold text-brand-text-dark">{activeBlog.author}</p>
                          <p className="text-[10px] text-gray-400">{activeBlog.authorTitle}</p>
                        </div>
                      </div>
                      <span className="hidden sm:inline">•</span>
                      <span className="flex items-center gap-1"><Calendar className="w-4 h-4" />{activeBlog.date}</span>
                      <span className="hidden sm:inline">•</span>
                      <span className="flex items-center gap-1"><Clock className="w-4 h-4" />{activeBlog.readTime}</span>
                    </div>
                  </div>

                  {/* Beautiful Unsplash Hero Image for active post */}
                  <div className="h-48 md:h-80 rounded-2xl relative overflow-hidden shadow-sm">
                    <img 
                      src={activeBlog.heroImage} 
                      alt={activeBlog.title} 
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                  </div>

                  {/* Rich Formatted Article content (Editorial style) */}
                  <div className="space-y-6 text-gray-600 text-sm sm:text-base leading-relaxed font-serif">
                    {/* Introductory Lead Summary Paragraph */}
                    <p className="text-lg sm:text-xl font-medium text-brand-text-dark/90 border-l-4 border-primary-blue pl-4 py-1 italic leading-relaxed font-sans">
                      {activeBlog.summary}
                    </p>

                    {activeBlog.content.map((para, i) => {
                      // Check if paragraph contains bold bullet points inside double stars
                      if (para.includes("**")) {
                        const parts = para.split("\n");
                        return (
                          <div key={i} className="space-y-4 font-sans pt-2">
                            {parts.map((p, idx) => {
                              if (p.startsWith("**")) {
                                const cleanKey = p.substring(2, p.indexOf("**:"));
                                const cleanText = p.substring(p.indexOf("**:") + 3);
                                return (
                                  <p key={idx} className="text-gray-700">
                                    <strong className="text-brand-text-dark font-extrabold">{cleanKey}:</strong>{cleanText}
                                  </p>
                                );
                              }
                              return <p key={idx}>{p}</p>;
                            })}
                          </div>
                        );
                      }
                      
                      // Render standard paragraphs with elegant, natural font styling
                      return (
                        <p key={i} className="text-gray-700 leading-relaxed">
                          {para}
                        </p>
                      );
                    })}

                    {/* Styled Editorial Blockquote */}
                    <div className="bg-gray-50 border-l-4 border-primary-blue p-6 rounded-r-xl italic font-sans text-brand-text-dark text-sm sm:text-base leading-relaxed">
                      "At Vector Trace Lab, our primary benchmark is zero-distortion vector recreation. Machines operate purely on contrast levels, but humans understand visual harmony. That is the fundamental divider between auto-trace and true manual craft."
                    </div>
                  </div>

                  {/* Article footer author details and sign off */}
                  <div className="pt-8 border-t border-gray-100 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
                    <div className="flex items-center gap-4">
                      <img 
                        src={activeBlog.authorAvatar} 
                        alt={activeBlog.author} 
                        className="w-12 h-12 rounded-full object-cover border-2 border-primary-blue/20" 
                      />
                      <div>
                        <h4 className="font-bold text-brand-text-dark">{activeBlog.author}</h4>
                        <p className="text-xs text-gray-400">{activeBlog.authorTitle} at Vector Lab</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      {activeBlog.tags.map(tag => (
                        <span key={tag} className="text-[11px] font-bold bg-gray-100 text-gray-500 px-3 py-1.5 rounded-lg">
                          #{tag}
                        </span>
                      ))}
                    </div>
                  </div>

                </article>

                {/* Right Side: Sidebar Navigation/Content Cards (Col span 4) */}
                <div className="lg:col-span-4 space-y-8">
                  
                  {/* Related Posts Card */}
                  <div className="bg-white rounded-3xl border border-gray-100 p-6 shadow-xs space-y-4">
                    <h3 className="text-base font-bold text-brand-text-dark flex items-center gap-2 pb-2 border-b border-gray-100">
                      <Compass className="w-5 h-5 text-primary-blue" />
                      Related Blueprints
                    </h3>
                    <div className="space-y-4">
                      {blogs
                        .filter(b => b.id !== activeBlog.id)
                        .slice(0, 3)
                        .map(rel => (
                          <div 
                            key={rel.id}
                            onClick={() => setActiveBlog(rel)}
                            className="group flex gap-3 cursor-pointer items-start hover:bg-gray-50 p-2 rounded-xl transition-all duration-300"
                          >
                            <div className={`w-14 h-14 bg-gradient-to-br ${rel.imageGradient} rounded-lg shrink-0 relative overflow-hidden flex items-center justify-center text-white`}>
                              <div className="absolute inset-0 opacity-15">
                                {renderCardIllustration(rel.category)}
                              </div>
                              <span className="text-[9px] font-mono font-bold uppercase">LAB</span>
                            </div>
                            <div className="space-y-1">
                              <h4 className="text-xs sm:text-sm font-bold text-brand-text-dark group-hover:text-primary-blue transition-colors line-clamp-2 leading-snug">
                                {rel.title}
                              </h4>
                              <p className="text-[10px] text-gray-400 font-medium">
                                {rel.category} • {rel.readTime}
                              </p>
                            </div>
                          </div>
                        ))}
                    </div>
                  </div>

                  {/* Sidebar Newsletter box */}
                  <div className="bg-slate-900 text-white rounded-3xl p-6 shadow-xs space-y-4 relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-slate-900 to-indigo-950 z-0" />
                    
                    <div className="relative z-10 space-y-4">
                      <div className="w-10 h-10 rounded-xl bg-primary-blue/20 flex items-center justify-center text-primary-blue">
                        <Mail className="w-5 h-5" />
                      </div>
                      <h3 className="text-lg font-bold">Vector Lab Insider</h3>
                      <p className="text-xs text-gray-400 leading-relaxed">
                        Join 4,200+ design leads and manufacturers receiving weekly insights, templates, and high-performance raster-to-vector workflows.
                      </p>

                      <AnimatePresence mode="wait">
                        {!isSubscribed ? (
                          <form onSubmit={handleSubscribe} className="space-y-2">
                            <input
                              type="email"
                              required
                              placeholder="Your email address..."
                              value={emailInput}
                              onChange={(e) => setEmailInput(e.target.value)}
                              className="w-full bg-white/10 text-white placeholder:text-gray-500 border border-white/10 px-3.5 py-2.5 rounded-xl text-xs focus:outline-none focus:border-primary-blue focus:ring-2 focus:ring-primary-blue/10 transition-all"
                            />
                            <button
                              type="submit"
                              className="w-full bg-primary-blue hover:bg-accent-blue text-white font-extrabold text-xs py-2.5 rounded-xl transition-all cursor-pointer shadow-md shadow-primary-blue/10"
                            >
                              Subscribe Free
                            </button>
                          </form>
                        ) : (
                          <div className="bg-primary-blue/20 border border-primary-blue/30 p-4 rounded-xl text-xs flex items-start gap-2 text-white">
                            <CheckCircle2 className="w-4 h-4 text-primary-blue shrink-0 mt-0.5" />
                            <div>
                              <p className="font-bold">Subscribed Successfully!</p>
                              <p className="text-[10px] text-gray-300 mt-0.5">Welcome aboard.</p>
                            </div>
                          </div>
                        )}
                      </AnimatePresence>
                    </div>
                  </div>

                  {/* Custom Tracing Guarantee */}
                  <div className="bg-white rounded-3xl border border-gray-100 p-6 shadow-xs text-center space-y-3">
                    <div className="w-12 h-12 bg-primary-blue/10 text-primary-blue rounded-full mx-auto flex items-center justify-center">
                      <Sparkles className="w-6 h-6 text-primary-blue" />
                    </div>
                    <h3 className="text-sm font-bold text-brand-text-dark">Need Vector Assistance?</h3>
                    <p className="text-xs text-gray-500 leading-relaxed max-w-xs mx-auto">
                      Have a fuzzy image, low-res artwork, or blueprint sketches? Get manual clean-ups from our experts with 100% precision.
                    </p>
                    <button
                      onClick={() => {
                        setActiveBlog(null);
                        const el = document.getElementById("contact");
                        if (el) el.scrollIntoView({ behavior: "smooth" });
                      }}
                      className="text-xs font-extrabold text-primary-blue hover:text-accent-blue transition-colors flex items-center justify-center gap-1 mx-auto cursor-pointer"
                    >
                      Request Free Quote
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>

                </div>

              </div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </section>
  );
}
