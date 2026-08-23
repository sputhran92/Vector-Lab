import React, { useState, useEffect } from "react";
import {
  FileText,
  Plus,
  FileUp,
  Search,
  ArrowRight,
  ExternalLink,
  Eye,
  CheckCircle2,
  Clock,
  Sparkles,
  Layers,
  Copy,
  Check,
  UploadCloud,
  Edit3
} from "lucide-react";
import { BlogPost } from "../../types";
import { AdminTab } from "./AdminLayout";
import { getAllBlogs, parseDocxFile } from "../../services/blogService";

interface AdminDashboardProps {
  onNavigate: (tab: AdminTab, blogId?: string) => void;
  onDocxLoaded: (data: { title: string; author?: string; paragraphs: string[] }) => void;
}

export default function AdminDashboard({ onNavigate, onDocxLoaded }: AdminDashboardProps) {
  const [blogs, setBlogs] = useState<BlogPost[]>([]);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isParsingDoc, setIsParsingDoc] = useState(false);
  const [docError, setDocError] = useState("");

  const refreshData = () => {
    setBlogs(getAllBlogs(true));
  };

  useEffect(() => {
    refreshData();
    window.addEventListener("vector_lab_blogs_changed", refreshData);
    return () => window.removeEventListener("vector_lab_blogs_changed", refreshData);
  }, []);

  const publishedCount = blogs.filter(b => b.status !== "draft").length;
  const draftCount = blogs.filter(b => b.status === "draft").length;
  const totalWords = blogs.reduce((acc, b) => {
    return acc + (b.content || []).reduce((sum, p) => sum + p.split(/\s+/).filter(Boolean).length, 0);
  }, 0);

  const copyShareUrl = (id: string) => {
    const url = `${window.location.origin}/blogs/${id}`;
    navigator.clipboard.writeText(url).then(() => {
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 2000);
    });
  };

  const handleFileProcess = async (file: File) => {
    if (!file.name.toLowerCase().endsWith(".docx")) {
      setDocError("Please upload a valid .docx Word document.");
      return;
    }
    setDocError("");
    setIsParsingDoc(true);
    try {
      const parsed = await parseDocxFile(file);
      onDocxLoaded({
        title: parsed.title || "",
        author: parsed.author || "Shailesh",
        paragraphs: parsed.paragraphs,
      });
      onNavigate("new");
    } catch (err: any) {
      setDocError("Failed to parse Word document. " + err.message);
    } finally {
      setIsParsingDoc(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileProcess(e.dataTransfer.files[0]);
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
            Publishing Dashboard
          </h1>
          <p className="text-slate-400 text-sm mt-1">
            Manage vector design journals, tutorials, SEO metadata, and DOCX document uploads.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => onNavigate("import")}
            className="px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 hover:border-slate-700 text-slate-300 hover:text-white text-xs font-bold inline-flex items-center gap-2 transition-all cursor-pointer"
          >
            <FileUp className="w-4 h-4 text-emerald-400" />
            <span>Import DOCX</span>
          </button>
          <button
            onClick={() => onNavigate("new")}
            className="px-4 py-2.5 rounded-xl bg-primary-blue hover:bg-blue-600 text-white text-xs font-bold inline-flex items-center gap-2 shadow-lg shadow-primary-blue/20 transition-all cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Create Article</span>
          </button>
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-slate-900 border border-slate-800/80 rounded-2xl p-5 shadow-sm">
          <div className="flex items-center justify-between text-slate-400 text-xs font-bold uppercase tracking-wider mb-2">
            <span>Total Articles</span>
            <FileText className="w-4 h-4 text-primary-blue" />
          </div>
          <div className="text-2xl sm:text-3xl font-black text-white">
            {blogs.length}
          </div>
          <div className="text-xs text-slate-400 mt-1">
            All stored blog posts
          </div>
        </div>

        <div className="bg-slate-900 border border-slate-800/80 rounded-2xl p-5 shadow-sm">
          <div className="flex items-center justify-between text-slate-400 text-xs font-bold uppercase tracking-wider mb-2">
            <span>Published Live</span>
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="text-2xl sm:text-3xl font-black text-emerald-400">
            {publishedCount}
          </div>
          <div className="text-xs text-slate-400 mt-1">
            Live on `/blogs` &amp; search engines
          </div>
        </div>

        <div className="bg-slate-900 border border-slate-800/80 rounded-2xl p-5 shadow-sm">
          <div className="flex items-center justify-between text-slate-400 text-xs font-bold uppercase tracking-wider mb-2">
            <span>Drafts</span>
            <Clock className="w-4 h-4 text-amber-400" />
          </div>
          <div className="text-2xl sm:text-3xl font-black text-amber-400">
            {draftCount}
          </div>
          <div className="text-xs text-slate-400 mt-1">
            Work in progress
          </div>
        </div>

        <div className="bg-slate-900 border border-slate-800/80 rounded-2xl p-5 shadow-sm">
          <div className="flex items-center justify-between text-slate-400 text-xs font-bold uppercase tracking-wider mb-2">
            <span>Content Volume</span>
            <Sparkles className="w-4 h-4 text-indigo-400" />
          </div>
          <div className="text-2xl sm:text-3xl font-black text-white">
            {totalWords.toLocaleString()} <span className="text-xs font-normal text-slate-400">words</span>
          </div>
          <div className="text-xs text-slate-400 mt-1">
            Across all publications
          </div>
        </div>
      </div>

      {/* Instant DOCX File Importer Dropzone */}
      <div
        onDragOver={(e) => {
          e.preventDefault();
          setIsDragging(true);
        }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={handleDrop}
        className={`relative overflow-hidden rounded-3xl border-2 border-dashed p-8 text-center transition-all ${
          isDragging
            ? "border-primary-blue bg-primary-blue/10 scale-[1.01]"
            : "border-slate-800 bg-slate-900/60 hover:border-slate-700"
        }`}
      >
        <div className="max-w-md mx-auto space-y-3">
          <div className="w-14 h-14 rounded-2xl bg-slate-800 text-primary-blue mx-auto flex items-center justify-center shadow-inner">
            <UploadCloud className="w-7 h-7" />
          </div>
          <h3 className="text-lg font-black text-white">
            Quick DOCX Blog Importer
          </h3>
          <p className="text-xs text-slate-400 leading-relaxed">
            Drag and drop any Microsoft Word document (<code className="text-primary-blue font-mono">.docx</code>) here. It will automatically extract your title, headings, formatted paragraphs, bullet points, and tables straight into the editor!
          </p>

          {docError && (
            <p className="text-xs text-rose-400 font-semibold">{docError}</p>
          )}

          <div className="pt-2">
            <label className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold cursor-pointer transition-all border border-slate-700 shadow-sm">
              <FileUp className="w-4 h-4 text-emerald-400" />
              <span>{isParsingDoc ? "Parsing Document..." : "Select .DOCX File from Device"}</span>
              <input
                type="file"
                accept=".docx,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                className="hidden"
                disabled={isParsingDoc}
                onChange={(e) => {
                  if (e.target.files && e.target.files[0]) {
                    handleFileProcess(e.target.files[0]);
                  }
                }}
              />
            </label>
          </div>
        </div>
      </div>

      {/* Recent Blog Posts Table */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden shadow-xl">
        <div className="p-6 border-b border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-lg font-black text-white tracking-tight">
              Recent Publications
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">
              Instant access to edit, duplicate, or share direct URLs
            </p>
          </div>

          <button
            onClick={() => onNavigate("blogs")}
            className="text-xs font-bold text-primary-blue hover:text-blue-400 inline-flex items-center gap-1.5 cursor-pointer"
          >
            <span>View All ({blogs.length})</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-300">
            <thead className="bg-slate-950/60 text-slate-400 uppercase tracking-wider font-bold text-[10px] border-b border-slate-800">
              <tr>
                <th className="px-6 py-3.5">Article</th>
                <th className="px-6 py-3.5">Category</th>
                <th className="px-6 py-3.5">Status</th>
                <th className="px-6 py-3.5">Date</th>
                <th className="px-6 py-3.5 text-right">Quick Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 font-medium">
              {blogs.slice(0, 5).map((blog) => (
                <tr key={blog.id} className="hover:bg-slate-800/40 transition-colors">
                  <td className="px-6 py-4">
                    <div className="max-w-md">
                      <div className="font-bold text-white text-sm line-clamp-1">
                        {blog.title}
                      </div>
                      <div className="text-slate-400 text-[11px] font-mono mt-0.5">
                        /blogs/{blog.id}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="px-2.5 py-1 rounded-md bg-slate-800 text-slate-300 font-semibold text-[11px]">
                      {blog.category}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    {blog.status === "draft" ? (
                      <span className="px-2.5 py-1 rounded-md bg-amber-500/10 text-amber-400 border border-amber-500/30 text-[11px] font-bold">
                        Draft
                      </span>
                    ) : (
                      <span className="px-2.5 py-1 rounded-md bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 text-[11px] font-bold">
                        Published
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-4 text-slate-400 text-[11px]">
                    {blog.date}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="inline-flex items-center gap-1.5">
                      <button
                        onClick={() => copyShareUrl(blog.id)}
                        className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors cursor-pointer"
                        title="Copy Shareable Link"
                      >
                        {copiedId === blog.id ? (
                          <Check className="w-3.5 h-3.5 text-emerald-400" />
                        ) : (
                          <Copy className="w-3.5 h-3.5" />
                        )}
                      </button>

                      <a
                        href={`/blogs/${blog.id}`}
                        target="_blank"
                        rel="noreferrer"
                        className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors cursor-pointer inline-flex items-center"
                        title="Open Live Public View"
                      >
                        <ExternalLink className="w-3.5 h-3.5 text-primary-blue" />
                      </a>

                      <button
                        onClick={() => onNavigate("edit", blog.id)}
                        className="px-3 py-1.5 rounded-lg bg-primary-blue/10 hover:bg-primary-blue text-primary-blue hover:text-white text-xs font-bold transition-all cursor-pointer inline-flex items-center gap-1"
                      >
                        <Edit3 className="w-3.5 h-3.5" />
                        <span>Edit</span>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
