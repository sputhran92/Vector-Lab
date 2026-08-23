import React, { useState, useEffect } from "react";
import {
  Search,
  CheckCircle,
  AlertTriangle,
  Globe,
  Share2,
  ExternalLink,
  Edit,
  Sparkles,
  BarChart3,
  FileCheck
} from "lucide-react";
import { BlogPost } from "../../types";
import { AdminTab } from "./AdminLayout";
import { getAllBlogs } from "../../services/blogService";

interface AdminSeoCenterProps {
  onNavigate: (tab: AdminTab, blogId?: string) => void;
}

export default function AdminSeoCenter({ onNavigate }: AdminSeoCenterProps) {
  const [blogs, setBlogs] = useState<BlogPost[]>([]);
  const [selectedBlogId, setSelectedBlogId] = useState<string>("");

  useEffect(() => {
    const all = getAllBlogs(true);
    setBlogs(all);
    if (all.length > 0) {
      setSelectedBlogId(all[0].id);
    }
  }, []);

  const selectedBlog = blogs.find((b) => b.id === selectedBlogId) || blogs[0];

  const getSeoHealth = (blog: BlogPost) => {
    let score = 100;
    const issues: string[] = [];

    const titleLength = (blog.seo?.metaTitle || blog.title || "").length;
    if (titleLength < 30) {
      score -= 20;
      issues.push("Meta title is too short (<30 chars)");
    } else if (titleLength > 65) {
      score -= 10;
      issues.push("Meta title may be truncated by Google (>65 chars)");
    }

    const descLength = (blog.seo?.metaDescription || blog.summary || "").length;
    if (descLength < 60) {
      score -= 25;
      issues.push("Meta description is too short (<60 chars)");
    } else if (descLength > 165) {
      score -= 10;
      issues.push("Meta description exceeds standard search snippet limit (>165 chars)");
    }

    if (!blog.heroImage && !blog.seo?.ogImage) {
      score -= 15;
      issues.push("Missing Open Graph social preview image");
    }

    if (!blog.tags || blog.tags.length === 0) {
      score -= 10;
      issues.push("No search tags or focus keywords defined");
    }

    return { score: Math.max(0, score), issues };
  };

  const origin = typeof window !== "undefined" ? window.location.origin : "https://vectortracelab.com";

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
          SEO &amp; SERP Command Center
        </h1>
        <p className="text-slate-400 text-sm mt-1">
          Audit Google Search snippets, Open Graph social share cards, keyword density, and schema metadata.
        </p>
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-sm">
          <div className="flex items-center justify-between text-slate-400 text-xs font-bold uppercase tracking-wider mb-2">
            <span>Indexed Articles</span>
            <Globe className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="text-3xl font-black text-white">
            {blogs.filter((b) => !b.seo?.noIndex && b.status !== "draft").length}
          </div>
          <p className="text-xs text-slate-400 mt-1">Ready for search engine crawling</p>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-sm">
          <div className="flex items-center justify-between text-slate-400 text-xs font-bold uppercase tracking-wider mb-2">
            <span>Average Health Score</span>
            <Sparkles className="w-4 h-4 text-primary-blue" />
          </div>
          <div className="text-3xl font-black text-emerald-400">
            {blogs.length > 0
              ? Math.round(
                  blogs.reduce((acc, b) => acc + getSeoHealth(b).score, 0) / blogs.length
                )
              : 100}
            %
          </div>
          <p className="text-xs text-slate-400 mt-1">Across all published articles</p>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-sm">
          <div className="flex items-center justify-between text-slate-400 text-xs font-bold uppercase tracking-wider mb-2">
            <span>Rich Schema.org</span>
            <FileCheck className="w-4 h-4 text-indigo-400" />
          </div>
          <div className="text-3xl font-black text-white">JSON-LD</div>
          <p className="text-xs text-slate-400 mt-1">Article structured data enabled</p>
        </div>
      </div>

      {/* SEO Audit & Inspector */}
      {selectedBlog && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Post Selection Sidebar */}
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-5 space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-300">
              Select Post to Audit
            </h3>
            <div className="space-y-1 max-h-[500px] overflow-y-auto pr-1">
              {blogs.map((b) => {
                const health = getSeoHealth(b);
                const isSel = b.id === selectedBlog.id;
                return (
                  <button
                    key={b.id}
                    onClick={() => setSelectedBlogId(b.id)}
                    className={`w-full text-left p-3 rounded-xl transition-all cursor-pointer ${
                      isSel
                        ? "bg-primary-blue text-white shadow-md"
                        : "text-slate-300 hover:bg-slate-800/80"
                    }`}
                  >
                    <div className="font-bold text-xs line-clamp-1">{b.title}</div>
                    <div className="flex items-center justify-between mt-1 text-[10px]">
                      <span className={isSel ? "text-blue-100" : "text-slate-500 font-mono"}>
                        /blogs/{b.id}
                      </span>
                      <span
                        className={`font-bold px-1.5 py-0.5 rounded ${
                          health.score >= 80
                            ? isSel
                              ? "bg-white/20 text-white"
                              : "bg-emerald-500/10 text-emerald-400"
                            : isSel
                            ? "bg-amber-400 text-slate-900"
                            : "bg-amber-500/10 text-amber-400"
                        }`}
                      >
                        {health.score}% SEO
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Audit & SERP Simulator Display */}
          <div className="lg:col-span-2 space-y-6">
            {/* Audit Card */}
            <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-sm space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                <div>
                  <h3 className="text-base font-black text-white">{selectedBlog.title}</h3>
                  <p className="text-xs text-primary-blue font-mono mt-0.5">
                    {origin}/blogs/{selectedBlog.id}
                  </p>
                </div>
                <button
                  onClick={() => onNavigate("edit", selectedBlog.id)}
                  className="px-3.5 py-1.5 rounded-xl bg-primary-blue hover:bg-blue-600 text-white text-xs font-bold inline-flex items-center gap-1.5 shadow-sm transition-all cursor-pointer"
                >
                  <Edit className="w-3.5 h-3.5" />
                  <span>Edit SEO</span>
                </button>
              </div>

              {/* SEO Health check results */}
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300 mb-2">
                  Automated Audit Checklist
                </h4>
                {getSeoHealth(selectedBlog).issues.length === 0 ? (
                  <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-bold flex items-center gap-2">
                    <CheckCircle className="w-4 h-4" />
                    <span>All SEO criteria optimized perfectly for search engine ranking!</span>
                  </div>
                ) : (
                  <div className="space-y-2">
                    {getSeoHealth(selectedBlog).issues.map((issue, idx) => (
                      <div
                        key={idx}
                        className="p-2.5 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-300 text-xs font-medium flex items-center gap-2"
                      >
                        <AlertTriangle className="w-3.5 h-3.5 shrink-0 text-amber-400" />
                        <span>{issue}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* SERP Search Preview */}
              <div className="pt-2">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300 mb-2 flex items-center gap-1.5">
                  <Globe className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Google Search SERP Simulation</span>
                </h4>
                <div className="p-5 rounded-2xl bg-white text-slate-900 font-sans shadow-sm border border-gray-200">
                  <div className="flex items-center gap-2 text-xs text-gray-700 mb-1">
                    <div className="w-5 h-5 rounded-full bg-blue-600 text-white flex items-center justify-center text-[10px] font-bold">
                      VL
                    </div>
                    <div className="flex flex-col leading-tight">
                      <span className="font-semibold text-gray-900 text-xs">Vector Lab</span>
                      <span className="text-[11px] text-gray-500 font-mono">
                        {origin}/blogs/{selectedBlog.id}
                      </span>
                    </div>
                  </div>

                  <h4 className="text-base font-medium text-blue-800 hover:underline cursor-pointer leading-snug">
                    {selectedBlog.seo?.metaTitle || selectedBlog.title} | Vector Lab
                  </h4>

                  <p className="text-xs text-gray-600 mt-1 leading-relaxed line-clamp-2">
                    <span className="text-gray-400 mr-1">{selectedBlog.date} —</span>
                    {selectedBlog.seo?.metaDescription || selectedBlog.summary}
                  </p>
                </div>
              </div>

              {/* Social Share Preview */}
              <div className="pt-2">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300 mb-2 flex items-center gap-1.5">
                  <Share2 className="w-3.5 h-3.5 text-primary-blue" />
                  <span>Social Media Card Preview</span>
                </h4>
                <div className="rounded-2xl overflow-hidden bg-slate-950 border border-slate-800">
                  <div className="aspect-video w-full bg-slate-900 relative">
                    <img
                      src={selectedBlog.seo?.ogImage || selectedBlog.heroImage}
                      alt="OG Card"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-4 space-y-1">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-primary-blue font-mono">
                      vectortracelab.com
                    </span>
                    <h4 className="text-sm font-bold text-white line-clamp-1">
                      {selectedBlog.seo?.metaTitle || selectedBlog.title}
                    </h4>
                    <p className="text-xs text-slate-400 line-clamp-2">
                      {selectedBlog.seo?.metaDescription || selectedBlog.summary}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
