import React, { useState, useEffect } from "react";
import {
  Save,
  ArrowLeft,
  Eye,
  FileText,
  Search,
  Sparkles,
  Image as ImageIcon,
  Calendar,
  User,
  Tag,
  Share2,
  FileUp,
  Table as TableIcon,
  Quote,
  Check,
  Globe,
  ExternalLink,
  Code,
  AlertCircle
} from "lucide-react";
import { BlogPost, SEOSettings } from "../../types";
import { AdminTab } from "./AdminLayout";
import {
  saveBlog,
  getBlogById,
  slugify,
  calculateReadTime,
  parseDocxFile
} from "../../services/blogService";

export interface AdminBlogEditorProps {
  key?: React.Key;
  blogId?: string; // If editing existing
  initialDocxData?: { title: string; author?: string; paragraphs: string[] } | null;
  onNavigate: (tab: AdminTab, blogId?: string) => void;
}

export default function AdminBlogEditor({
  blogId,
  initialDocxData,
  onNavigate
}: AdminBlogEditorProps) {
  const [activeTab, setActiveTab] = useState<"content" | "seo" | "preview">("content");
  const [isNew, setIsNew] = useState(!blogId);

  // Form State
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [isSlugManual, setIsSlugManual] = useState(false);
  const [summary, setSummary] = useState("");
  const [category, setCategory] = useState("Vector Basics");
  const [customCategory, setCustomCategory] = useState("");
  const [author, setAuthor] = useState("Shailesh");
  const [authorTitle, setAuthorTitle] = useState("Founder & Lead Vector Specialist");
  const [authorAvatar, setAuthorAvatar] = useState(
    "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80"
  );
  const [date, setDate] = useState(
    new Date().toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })
  );
  const [readTime, setReadTime] = useState("5 min read");
  const [tagsInput, setTagsInput] = useState("Vector, Design, Print");
  const [heroImage, setHeroImage] = useState(
    "https://images.unsplash.com/photo-1626785774573-4b799315345d?auto=format&fit=crop&w=1200&q=80"
  );
  const [imageGradient, setImageGradient] = useState("from-blue-600 to-indigo-700");
  const [status, setStatus] = useState<"published" | "draft">("published");

  // Content string (one string with double line-breaks or array)
  const [rawContent, setRawContent] = useState("");

  // SEO State
  const [metaTitle, setMetaTitle] = useState("");
  const [metaDescription, setMetaDescription] = useState("");
  const [focusKeywords, setFocusKeywords] = useState("vector graphics, promotional products, logo trace");
  const [canonicalUrl, setCanonicalUrl] = useState("");
  const [ogImage, setOgImage] = useState("");
  const [noIndex, setNoIndex] = useState(false);

  // Status & Feedback
  const [saving, setSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [saveError, setSaveError] = useState("");
  const [isParsingDoc, setIsParsingDoc] = useState(false);

  // Load existing or initial DOCX
  useEffect(() => {
    if (blogId) {
      const existing = getBlogById(blogId, true);
      if (existing) {
        setIsNew(false);
        setTitle(existing.title || "");
        setSlug(existing.id || "");
        setIsSlugManual(true);
        setSummary(existing.summary || "");
        setCategory(existing.category || "Vector Basics");
        setAuthor(existing.author || "Shailesh");
        setAuthorTitle(existing.authorTitle || "Founder & Lead Vector Specialist");
        setAuthorAvatar(existing.authorAvatar || "");
        setDate(existing.date || "");
        setReadTime(existing.readTime || "");
        setTagsInput((existing.tags || []).join(", "));
        setHeroImage(existing.heroImage || "");
        setImageGradient(existing.imageGradient || "from-blue-600 to-indigo-700");
        setStatus(existing.status || "published");
        setRawContent((existing.content || []).join("\n\n"));

        // SEO
        if (existing.seo) {
          setMetaTitle(existing.seo.metaTitle || "");
          setMetaDescription(existing.seo.metaDescription || "");
          setFocusKeywords((existing.seo.focusKeywords || []).join(", "));
          setCanonicalUrl(existing.seo.canonicalUrl || "");
          setOgImage(existing.seo.ogImage || "");
          setNoIndex(existing.seo.noIndex || false);
        } else {
          setMetaTitle(existing.title || "");
          setMetaDescription(existing.summary || "");
        }
      }
    } else if (initialDocxData) {
      // Prefill from DOCX upload
      setIsNew(true);
      setTitle(initialDocxData.title || "New Blog Post");
      setSlug(slugify(initialDocxData.title || "new-blog-post"));
      if (initialDocxData.author) setAuthor(initialDocxData.author);
      const contentText = initialDocxData.paragraphs.join("\n\n");
      setRawContent(contentText);
      setSummary(
        initialDocxData.paragraphs[0]?.slice(0, 160) || "Comprehensive guide by Vector Lab."
      );
      setMetaTitle(initialDocxData.title || "");
      setMetaDescription(initialDocxData.paragraphs[0]?.slice(0, 160) || "");
    }
  }, [blogId, initialDocxData]);

  // Auto-generate slug when title changes (unless user manually entered slug)
  const handleTitleChange = (val: string) => {
    setTitle(val);
    if (!isSlugManual && isNew) {
      setSlug(slugify(val));
    }
    if (!metaTitle) {
      setMetaTitle(val);
    }
  };

  const handleSummaryChange = (val: string) => {
    setSummary(val);
    if (!metaDescription) {
      setMetaDescription(val.slice(0, 160));
    }
  };

  // Convert rawContent into string[] paragraphs
  const getParagraphsArray = (): string[] => {
    return rawContent
      .split(/\n\n+/)
      .map((p) => p.trim())
      .filter(Boolean);
  };

  // Insert formatting snippets into cursor
  const insertFormatting = (prefix: string, suffix = "") => {
    setRawContent((prev) => `${prev}\n\n${prefix}${suffix}`);
  };

  const handleDocxUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || !e.target.files[0]) return;
    const file = e.target.files[0];
    setIsParsingDoc(true);
    try {
      const parsed = await parseDocxFile(file);
      if (parsed.title) {
        setTitle(parsed.title);
        if (!isSlugManual) setSlug(slugify(parsed.title));
        setMetaTitle(parsed.title);
      }
      if (parsed.author) setAuthor(parsed.author);
      const joined = parsed.paragraphs.join("\n\n");
      setRawContent(joined);
      if (parsed.paragraphs[0]) {
        const firstClean = parsed.paragraphs[0].replace(/^#+\s*/, "");
        setSummary(firstClean.slice(0, 180));
        setMetaDescription(firstClean.slice(0, 160));
      }
    } catch (err: any) {
      setSaveError("Failed to parse Word document: " + err.message);
    } finally {
      setIsParsingDoc(false);
    }
  };

  const handleSave = () => {
    setSaveError("");
    if (!title.trim()) {
      setSaveError("Please enter a blog title.");
      return;
    }
    if (!slug.trim()) {
      setSaveError("Please enter a valid URL slug.");
      return;
    }

    const paragraphs = getParagraphsArray();
    if (paragraphs.length === 0) {
      setSaveError("Please provide article content before saving.");
      return;
    }

    setSaving(true);

    const calculatedRead = calculateReadTime(paragraphs);
    const tags = tagsInput
      .split(",")
      .map((t) => t.trim())
      .filter(Boolean);

    const finalCategory = category === "Custom" ? customCategory.trim() || "General" : category;

    const seoData: SEOSettings = {
      metaTitle: metaTitle.trim() || title,
      metaDescription: metaDescription.trim() || summary,
      focusKeywords: focusKeywords
        .split(",")
        .map((k) => k.trim())
        .filter(Boolean),
      canonicalUrl: canonicalUrl.trim() || `${window.location.origin}/blogs/${slug}`,
      ogImage: ogImage.trim() || heroImage,
      noIndex: noIndex,
    };

    const newBlogPost: BlogPost = {
      id: slugify(slug),
      title: title.trim(),
      summary: summary.trim(),
      category: finalCategory,
      author: author.trim(),
      authorTitle: authorTitle.trim(),
      authorAvatar: authorAvatar.trim(),
      date: date.trim(),
      readTime: calculatedRead,
      content: paragraphs,
      imageGradient: imageGradient,
      tags: tags.length > 0 ? tags : ["Vector", "Design"],
      heroImage: heroImage.trim(),
      status: status,
      seo: seoData,
    };

    const res = saveBlog(newBlogPost);
    setSaving(false);

    if (res.success) {
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 3000);
      setIsNew(false);
    } else {
      setSaveError(res.error || "Failed to save blog post.");
    }
  };

  // SEO preview computations
  const finalMetaTitle = metaTitle || title || "Untitled Article";
  const finalMetaDescription =
    metaDescription || summary || "Explore industry vectorization guides and production insights by Vector Lab.";
  const origin = typeof window !== "undefined" ? window.location.origin : "https://vectortracelab.com";
  const finalCanonical = canonicalUrl || `${origin}/blogs/${slug || "article-slug"}`;

  return (
    <div className="space-y-6">
      {/* Top Bar Navigation & Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-slate-800">
        <div className="flex items-center gap-3">
          <button
            onClick={() => onNavigate("blogs")}
            className="p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 hover:text-white transition-colors cursor-pointer"
            title="Back to All Blogs"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>
          <div>
            <h1 className="text-xl sm:text-2xl font-black text-white tracking-tight">
              {isNew ? "Create New Blog Post" : "Edit Blog Post & SEO"}
            </h1>
            <div className="flex items-center gap-2 text-xs text-slate-400 font-mono mt-0.5">
              <span>URL:</span>
              <span className="text-primary-blue">/blogs/{slug || "slug-preview"}</span>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          {/* Tab Switcher */}
          <div className="flex items-center bg-slate-900 border border-slate-800 rounded-xl p-1 text-xs">
            <button
              onClick={() => setActiveTab("content")}
              className={`px-3 py-1.5 rounded-lg font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                activeTab === "content"
                  ? "bg-primary-blue text-white shadow-sm"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              <FileText className="w-3.5 h-3.5" />
              <span>Content</span>
            </button>
            <button
              onClick={() => setActiveTab("seo")}
              className={`px-3 py-1.5 rounded-lg font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                activeTab === "seo"
                  ? "bg-primary-blue text-white shadow-sm"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              <Search className="w-3.5 h-3.5" />
              <span>SEO Settings</span>
            </button>
            <button
              onClick={() => setActiveTab("preview")}
              className={`px-3 py-1.5 rounded-lg font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                activeTab === "preview"
                  ? "bg-primary-blue text-white shadow-sm"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              <Eye className="w-3.5 h-3.5" />
              <span>Live Preview</span>
            </button>
          </div>

          {/* Status select */}
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value as "published" | "draft")}
            className="px-3 py-2 bg-slate-900 border border-slate-800 rounded-xl text-xs font-bold text-slate-200 focus:outline-none focus:ring-2 focus:ring-primary-blue"
          >
            <option value="published">Status: Published</option>
            <option value="draft">Status: Draft</option>
          </select>

          {/* Save Button */}
          <button
            onClick={handleSave}
            disabled={saving}
            className="px-5 py-2 rounded-xl bg-primary-blue hover:bg-blue-600 text-white text-xs font-bold inline-flex items-center gap-2 shadow-lg shadow-primary-blue/20 transition-all cursor-pointer disabled:opacity-50"
          >
            {saving ? (
              <span>Saving...</span>
            ) : saveSuccess ? (
              <>
                <Check className="w-4 h-4 text-emerald-300" />
                <span>Saved Live!</span>
              </>
            ) : (
              <>
                <Save className="w-4 h-4" />
                <span>Publish Post</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Error alert */}
      {saveError && (
        <div className="p-4 bg-rose-500/10 border border-rose-500/30 rounded-2xl text-rose-400 text-xs font-semibold flex items-center gap-2">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{saveError}</span>
        </div>
      )}

      {/* TAB 1: MAIN CONTENT & DETAILS */}
      {activeTab === "content" && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left / Main Editor Column */}
          <div className="lg:col-span-2 space-y-6">
            {/* Title & Slug */}
            <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-sm space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5">
                  Article Title *
                </label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => handleTitleChange(e.target.value)}
                  placeholder="e.g. What Every Promotional Product Distributor Needs to Know About Vector Art"
                  className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-xl text-white font-bold text-base sm:text-lg placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-primary-blue"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label className="text-xs font-bold uppercase tracking-wider text-slate-300">
                      URL Slug *
                    </label>
                    <button
                      type="button"
                      onClick={() => setIsSlugManual(!isSlugManual)}
                      className="text-[10px] text-primary-blue hover:underline cursor-pointer"
                    >
                      {isSlugManual ? "Auto-generate" : "Custom edit"}
                    </button>
                  </div>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 text-xs font-mono">
                      /blogs/
                    </span>
                    <input
                      type="text"
                      value={slug}
                      onChange={(e) => {
                        setIsSlugManual(true);
                        setSlug(slugify(e.target.value));
                      }}
                      placeholder="custom-slug"
                      className="w-full pl-18 pr-4 py-2.5 bg-slate-800 border border-slate-700 rounded-xl text-xs text-white font-mono placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-primary-blue"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5">
                    Category *
                  </label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full px-3 py-2.5 bg-slate-800 border border-slate-700 rounded-xl text-xs text-slate-200 font-semibold focus:outline-none focus:ring-2 focus:ring-primary-blue"
                  >
                    <option value="Vector Basics">Vector Basics</option>
                    <option value="Branding">Branding</option>
                    <option value="Apparel">Apparel</option>
                    <option value="Fabrication">Fabrication</option>
                    <option value="Custom">+ Add Custom Category</option>
                  </select>
                  {category === "Custom" && (
                    <input
                      type="text"
                      value={customCategory}
                      onChange={(e) => setCustomCategory(e.target.value)}
                      placeholder="Type custom category name..."
                      className="w-full mt-2 px-3 py-2 bg-slate-800 border border-slate-700 rounded-xl text-xs text-white focus:outline-none focus:ring-2 focus:ring-primary-blue"
                    />
                  )}
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5">
                  Short Excerpt / Summary
                </label>
                <textarea
                  rows={2}
                  value={summary}
                  onChange={(e) => handleSummaryChange(e.target.value)}
                  placeholder="A concise 1-2 sentence overview shown on blog cards and search results..."
                  className="w-full px-4 py-2.5 bg-slate-800 border border-slate-700 rounded-xl text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-primary-blue"
                />
              </div>
            </div>

            {/* Markdown / Paragraphs Content Builder */}
            <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-sm space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-800">
                <div>
                  <h3 className="text-sm font-black text-white uppercase tracking-wider">
                    Article Body Content
                  </h3>
                  <p className="text-xs text-slate-400 mt-0.5">
                    Use double line-breaks to separate paragraphs. Supports headings (<code className="text-primary-blue font-mono">###</code>), bullets (<code className="text-primary-blue font-mono">●</code>), bold key-values (<code className="text-primary-blue font-mono">**Key**: Value</code>), and markdown tables.
                  </p>
                </div>

                {/* Upload DOCX directly into body */}
                <label className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs text-emerald-400 font-bold border border-slate-700 cursor-pointer transition-all">
                  <FileUp className="w-3.5 h-3.5" />
                  <span>{isParsingDoc ? "Importing..." : "Import .DOCX"}</span>
                  <input
                    type="file"
                    accept=".docx"
                    className="hidden"
                    disabled={isParsingDoc}
                    onChange={handleDocxUpload}
                  />
                </label>
              </div>

              {/* Formatting Toolbar */}
              <div className="flex flex-wrap items-center gap-2 p-2 bg-slate-800/80 rounded-xl border border-slate-700 text-xs">
                <button
                  type="button"
                  onClick={() => insertFormatting("## Main Section Heading")}
                  className="px-2.5 py-1 rounded bg-slate-700 hover:bg-slate-600 text-white font-bold cursor-pointer"
                  title="Insert H2 Heading"
                >
                  H2
                </button>
                <button
                  type="button"
                  onClick={() => insertFormatting("### Sub-section Title")}
                  className="px-2.5 py-1 rounded bg-slate-700 hover:bg-slate-600 text-white font-bold cursor-pointer"
                  title="Insert H3 Subheading"
                >
                  H3
                </button>
                <button
                  type="button"
                  onClick={() => insertFormatting("**Bold Statement**: Detailed explanation goes here.")}
                  className="px-2.5 py-1 rounded bg-slate-700 hover:bg-slate-600 text-white font-bold cursor-pointer"
                  title="Insert Bold Key-Value"
                >
                  **Key**: Value
                </button>
                <button
                  type="button"
                  onClick={() => insertFormatting("● Key point or checklist item 1\n● Key point or checklist item 2\n● Key point or checklist item 3")}
                  className="px-2.5 py-1 rounded bg-slate-700 hover:bg-slate-600 text-white font-bold cursor-pointer flex items-center gap-1"
                  title="Insert Bullet List"
                >
                  <span>● Bullets</span>
                </button>
                <button
                  type="button"
                  onClick={() => insertFormatting("| Format | Type | Best For | Avoid For |\n|---|---|---|---|\n| EPS | Vector | Screen printing | Web browsers |\n| PNG | Raster | DTF (high-res) | Large signage |")}
                  className="px-2.5 py-1 rounded bg-slate-700 hover:bg-slate-600 text-white font-bold cursor-pointer flex items-center gap-1"
                  title="Insert Comparison Table"
                >
                  <TableIcon className="w-3.5 h-3.5" />
                  <span>Table</span>
                </button>
                <button
                  type="button"
                  onClick={() => insertFormatting("### Need a logo converted to a print-ready vector file?\nVector Lab specializes in hand-tracing logos for promotional product distributors. WEPROMO members get flat-rate pricing at $15 per logo, regardless of complexity. Fast turnaround, unlimited revisions, and all the file formats your suppliers need.\n\nEmail us info@vectortracelab.com or visit vectortracelab.com to get started.")}
                  className="px-2.5 py-1 rounded bg-primary-blue/20 hover:bg-primary-blue/30 text-primary-blue font-bold cursor-pointer flex items-center gap-1"
                  title="Insert Vector Lab $15 WEPROMO Callout"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>$15 Promo Box</span>
                </button>
              </div>

              <textarea
                rows={18}
                value={rawContent}
                onChange={(e) => setRawContent(e.target.value)}
                placeholder="Write or paste your blog text here..."
                className="w-full p-4 bg-slate-950 border border-slate-800 rounded-2xl text-xs sm:text-sm text-slate-200 font-mono leading-relaxed placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-primary-blue resize-y"
              />

              <div className="flex items-center justify-between text-xs text-slate-400">
                <span>{getParagraphsArray().length} paragraphs detected</span>
                <span>{calculateReadTime(getParagraphsArray())}</span>
              </div>
            </div>
          </div>

          {/* Right Column: Metadata & Author Sidebar */}
          <div className="space-y-6">
            {/* Author Card */}
            <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-sm space-y-4">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center gap-2">
                <User className="w-4 h-4 text-primary-blue" />
                <span>Author Information</span>
              </h3>

              <div>
                <label className="block text-[11px] font-bold text-slate-400 mb-1">
                  Author Name
                </label>
                <input
                  type="text"
                  value={author}
                  onChange={(e) => setAuthor(e.target.value)}
                  placeholder="e.g. Shailesh"
                  className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-xl text-xs text-white focus:outline-none focus:ring-2 focus:ring-primary-blue"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-400 mb-1">
                  Author Title / Bio Line
                </label>
                <input
                  type="text"
                  value={authorTitle}
                  onChange={(e) => setAuthorTitle(e.target.value)}
                  placeholder="e.g. Founder & Lead Vector Specialist"
                  className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-xl text-xs text-white focus:outline-none focus:ring-2 focus:ring-primary-blue"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-400 mb-1">
                  Author Avatar URL
                </label>
                <input
                  type="text"
                  value={authorAvatar}
                  onChange={(e) => setAuthorAvatar(e.target.value)}
                  placeholder="https://..."
                  className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-xl text-xs text-white focus:outline-none focus:ring-2 focus:ring-primary-blue"
                />
              </div>
            </div>

            {/* Publishing Date & Tags */}
            <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-sm space-y-4">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center gap-2">
                <Calendar className="w-4 h-4 text-primary-blue" />
                <span>Publishing Metadata</span>
              </h3>

              <div>
                <label className="block text-[11px] font-bold text-slate-400 mb-1">
                  Publish Date Display
                </label>
                <input
                  type="text"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  placeholder="e.g. August 22, 2026"
                  className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-xl text-xs text-white focus:outline-none focus:ring-2 focus:ring-primary-blue"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-400 mb-1">
                  Tags (comma separated)
                </label>
                <input
                  type="text"
                  value={tagsInput}
                  onChange={(e) => setTagsInput(e.target.value)}
                  placeholder="e.g. Distributors, Vector vs Raster, EPS"
                  className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-xl text-xs text-white focus:outline-none focus:ring-2 focus:ring-primary-blue"
                />
              </div>
            </div>

            {/* Hero Cover Image */}
            <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-sm space-y-4">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center gap-2">
                <ImageIcon className="w-4 h-4 text-primary-blue" />
                <span>Cover &amp; Hero Image</span>
              </h3>

              <div>
                <label className="block text-[11px] font-bold text-slate-400 mb-1">
                  Hero Image URL
                </label>
                <input
                  type="text"
                  value={heroImage}
                  onChange={(e) => setHeroImage(e.target.value)}
                  placeholder="https://images.unsplash.com/..."
                  className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-xl text-xs text-white focus:outline-none focus:ring-2 focus:ring-primary-blue"
                />
              </div>

              {heroImage && (
                <div className="rounded-2xl overflow-hidden border border-slate-700 aspect-video bg-slate-950">
                  <img
                    src={heroImage}
                    alt="Hero Preview"
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src =
                        "https://images.unsplash.com/photo-1626785774573-4b799315345d?auto=format&fit=crop&w=800&q=80";
                    }}
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: ADVANCED SEO & SOCIAL SHARE SUITE */}
      {activeTab === "seo" && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* SEO Input Settings */}
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-sm space-y-5">
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-300">
                  Search Engine Meta Title
                </label>
                <span
                  className={`text-[10px] font-mono ${
                    finalMetaTitle.length > 60 ? "text-amber-400" : "text-emerald-400"
                  }`}
                >
                  {finalMetaTitle.length} / 60 characters
                </span>
              </div>
              <input
                type="text"
                value={metaTitle}
                onChange={(e) => setMetaTitle(e.target.value)}
                placeholder="Google SERP Title..."
                className="w-full px-4 py-2.5 bg-slate-800 border border-slate-700 rounded-xl text-xs text-white font-medium focus:outline-none focus:ring-2 focus:ring-primary-blue"
              />
              <p className="text-[11px] text-slate-400 mt-1">
                Recommended 50–60 characters. Appears as the clickable headline on Google.
              </p>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-300">
                  Search Engine Meta Description
                </label>
                <span
                  className={`text-[10px] font-mono ${
                    finalMetaDescription.length > 160 ? "text-amber-400" : "text-emerald-400"
                  }`}
                >
                  {finalMetaDescription.length} / 160 characters
                </span>
              </div>
              <textarea
                rows={3}
                value={metaDescription}
                onChange={(e) => setMetaDescription(e.target.value)}
                placeholder="Brief search snippet description..."
                className="w-full px-4 py-2.5 bg-slate-800 border border-slate-700 rounded-xl text-xs text-white font-medium focus:outline-none focus:ring-2 focus:ring-primary-blue"
              />
              <p className="text-[11px] text-slate-400 mt-1">
                Recommended 140–160 characters. Summarizes content for search engines and social cards.
              </p>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5">
                Target Focus Keywords (comma-separated)
              </label>
              <input
                type="text"
                value={focusKeywords}
                onChange={(e) => setFocusKeywords(e.target.value)}
                placeholder="e.g. vector tracing, eps file, logo formats"
                className="w-full px-4 py-2.5 bg-slate-800 border border-slate-700 rounded-xl text-xs text-white focus:outline-none focus:ring-2 focus:ring-primary-blue"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5">
                Canonical URL
              </label>
              <input
                type="text"
                value={canonicalUrl}
                onChange={(e) => setCanonicalUrl(e.target.value)}
                placeholder={finalCanonical}
                className="w-full px-4 py-2.5 bg-slate-800 border border-slate-700 rounded-xl text-xs text-white font-mono focus:outline-none focus:ring-2 focus:ring-primary-blue"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5">
                Custom Open Graph / Social Image URL (Optional)
              </label>
              <input
                type="text"
                value={ogImage}
                onChange={(e) => setOgImage(e.target.value)}
                placeholder={heroImage}
                className="w-full px-4 py-2.5 bg-slate-800 border border-slate-700 rounded-xl text-xs text-white focus:outline-none focus:ring-2 focus:ring-primary-blue"
              />
            </div>

            <div className="pt-2 border-t border-slate-800 flex items-center justify-between">
              <div>
                <span className="text-xs font-bold text-slate-300 block">Robots Indexing</span>
                <span className="text-[11px] text-slate-400">Allow search engine spiders to index this article</span>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={!noIndex}
                  onChange={(e) => setNoIndex(!e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-slate-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-blue"></div>
              </label>
            </div>
          </div>

          {/* Live SERP & Social Card Preview */}
          <div className="space-y-6">
            {/* Google Search Snippet Simulation */}
            <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-sm space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center gap-2">
                  <Globe className="w-4 h-4 text-emerald-400" />
                  <span>Google Search SERP Preview</span>
                </h3>
                <span className="text-[10px] text-slate-400 font-mono">Mobile &amp; Desktop</span>
              </div>

              {/* Realistic Google Search Card */}
              <div className="p-4 rounded-2xl bg-white text-slate-900 font-sans shadow-sm border border-gray-200">
                <div className="flex items-center gap-2 text-xs text-gray-700 mb-1">
                  <div className="w-5 h-5 rounded-full bg-blue-600 text-white flex items-center justify-center text-[10px] font-bold">
                    VL
                  </div>
                  <div className="flex flex-col leading-tight">
                    <span className="font-semibold text-gray-900 text-xs">Vector Lab</span>
                    <span className="text-[11px] text-gray-500 font-mono">{finalCanonical}</span>
                  </div>
                </div>

                <h4 className="text-base sm:text-lg font-medium text-blue-800 hover:underline cursor-pointer leading-snug">
                  {finalMetaTitle} | Vector Lab
                </h4>

                <p className="text-xs sm:text-sm text-gray-600 mt-1 leading-relaxed line-clamp-2">
                  <span className="text-gray-400 mr-1">{date} —</span>
                  {finalMetaDescription}
                </p>
              </div>
            </div>

            {/* Social Share (OpenGraph / Twitter) Card Preview */}
            <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-sm space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center gap-2">
                  <Share2 className="w-4 h-4 text-primary-blue" />
                  <span>Social Share Preview (LinkedIn / Twitter)</span>
                </h3>
                <span className="text-[10px] text-slate-400 font-mono">1200 x 630</span>
              </div>

              <div className="rounded-2xl overflow-hidden bg-slate-950 border border-slate-800 shadow-md">
                <div className="aspect-video w-full bg-slate-900 relative overflow-hidden">
                  <img
                    src={ogImage || heroImage}
                    alt="Social Card"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
                </div>
                <div className="p-4 space-y-1">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-primary-blue font-mono">
                    vectortracelab.com
                  </span>
                  <h4 className="text-sm font-bold text-white line-clamp-1">
                    {finalMetaTitle}
                  </h4>
                  <p className="text-xs text-slate-400 line-clamp-2">
                    {finalMetaDescription}
                  </p>
                </div>
              </div>
            </div>

            {/* Structured Schema.org Article JSON-LD preview */}
            <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-sm space-y-2">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-300">
                <Code className="w-4 h-4 text-indigo-400" />
                <span>Generated Schema.org (JSON-LD)</span>
              </div>
              <pre className="p-3 rounded-xl bg-slate-950 text-[10px] text-emerald-400 font-mono overflow-x-auto border border-slate-800">
{JSON.stringify(
  {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": finalMetaTitle,
    "description": finalMetaDescription,
    "image": ogImage || heroImage,
    "author": {
      "@type": "Person",
      "name": author || "Shailesh",
    },
    "publisher": {
      "@type": "Organization",
      "name": "Vector Lab",
      "logo": {
        "@type": "ImageObject",
        "url": `${origin}/favicon.ico`,
      },
    },
    "datePublished": date,
    "mainEntityOfPage": finalCanonical,
  },
  null,
  2
)}
              </pre>
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: LIVE ARTICLE PREVIEW */}
      {activeTab === "preview" && (
        <div className="bg-white text-slate-900 rounded-3xl p-6 sm:p-10 shadow-2xl border border-gray-200 space-y-8 font-sans">
          {/* Article Header */}
          <div className="space-y-4 border-b border-gray-100 pb-8">
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 rounded-full bg-blue-50 text-primary-blue text-xs font-black uppercase tracking-wider border border-blue-100">
                {category === "Custom" ? customCategory || "General" : category}
              </span>
              <span className="text-xs text-gray-400 font-medium">{readTime || "5 min read"}</span>
            </div>

            <h1 className="text-2xl sm:text-4xl font-black text-brand-text-dark tracking-tight leading-tight">
              {title || "Untitled Blog Post"}
            </h1>

            <div className="flex items-center gap-3 pt-2">
              {authorAvatar ? (
                <img
                  src={authorAvatar}
                  alt={author}
                  className="w-10 h-10 rounded-full object-cover border border-gray-200"
                />
              ) : (
                <div className="w-10 h-10 rounded-full bg-primary-blue text-white font-bold flex items-center justify-center">
                  {author.charAt(0)}
                </div>
              )}
              <div>
                <div className="font-bold text-sm text-brand-text-dark">{author || "Shailesh"}</div>
                <div className="text-xs text-gray-500">
                  {authorTitle || "Vector Specialist"} • {date}
                </div>
              </div>
            </div>
          </div>

          {/* Hero Image */}
          {heroImage && (
            <div className="rounded-2xl overflow-hidden aspect-video bg-gray-100">
              <img src={heroImage} alt={title} className="w-full h-full object-cover" />
            </div>
          )}

          {/* Rendered Paragraphs */}
          <div className="space-y-6 text-gray-700 leading-relaxed text-sm sm:text-base">
            {getParagraphsArray().map((para, i) => {
              if (para.startsWith("## ")) {
                return (
                  <h2 key={i} className="text-2xl font-black text-brand-text-dark pt-4">
                    {para.replace("## ", "")}
                  </h2>
                );
              }
              if (para.startsWith("### ")) {
                return (
                  <h3 key={i} className="text-xl font-black text-brand-text-dark pt-3">
                    {para.replace("### ", "")}
                  </h3>
                );
              }
              if (para.includes("\n") || para.includes("●") || para.includes("**")) {
                const lines = para.split("\n");
                return (
                  <div key={i} className="space-y-2">
                    {lines.map((line, idx) => {
                      if (line.startsWith("●") || line.startsWith("•")) {
                        return (
                          <div key={idx} className="flex items-start gap-2 pl-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-primary-blue mt-2 shrink-0" />
                            <span>{line.replace(/^[●•]\s*/, "")}</span>
                          </div>
                        );
                      }
                      return <p key={idx}>{line}</p>;
                    })}
                  </div>
                );
              }
              return <p key={i}>{para}</p>;
            })}
          </div>
        </div>
      )}
    </div>
  );
}
