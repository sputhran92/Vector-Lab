import React, { useState } from "react";
import {
  FileUp,
  UploadCloud,
  CheckCircle2,
  FileText,
  Sparkles,
  ArrowRight,
  Send,
  AlertCircle,
  Eye
} from "lucide-react";
import { parseDocxFile, saveBlog, slugify, calculateReadTime } from "../../services/blogService";
import { BlogPost } from "../../types";
import { AdminTab } from "./AdminLayout";

interface AdminDocxImporterProps {
  onSendToEditor: (data: { title: string; author?: string; paragraphs: string[] }) => void;
  onNavigate: (tab: AdminTab, blogId?: string) => void;
}

export default function AdminDocxImporter({
  onSendToEditor,
  onNavigate
}: AdminDocxImporterProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [parsing, setParsing] = useState(false);
  const [error, setError] = useState("");
  const [parsedData, setParsedData] = useState<{
    title: string;
    author: string;
    paragraphs: string[];
    rawText: string;
    fileName: string;
  } | null>(null);
  const [publishing, setPublishing] = useState(false);
  const [publishSuccess, setPublishSuccess] = useState(false);

  const processFile = async (file: File) => {
    if (!file.name.toLowerCase().endsWith(".docx")) {
      setError("Please upload a valid Microsoft Word .docx document.");
      return;
    }

    setError("");
    setParsing(true);
    setParsedData(null);
    setPublishSuccess(false);

    try {
      const res = await parseDocxFile(file);
      setParsedData({
        title: res.title || file.name.replace(/\.[^/.]+$/, ""),
        author: res.author || "Shailesh",
        paragraphs: res.paragraphs,
        rawText: res.rawText,
        fileName: file.name,
      });
    } catch (err: any) {
      setError("Failed to parse Word document: " + (err.message || "Unknown error"));
    } finally {
      setParsing(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      processFile(e.dataTransfer.files[0]);
    }
  };

  const handlePublishDirectly = () => {
    if (!parsedData) return;
    setPublishing(true);

    const slug = slugify(parsedData.title);
    const summary =
      parsedData.paragraphs[0]?.replace(/^#+\s*/, "").slice(0, 180) ||
      "Comprehensive vector design tutorial by Vector Lab.";

    const newBlog: BlogPost = {
      id: slug,
      title: parsedData.title,
      summary: summary,
      category: "Vector Basics",
      author: parsedData.author || "Shailesh",
      authorTitle: "Founder & Lead Vector Specialist",
      authorAvatar:
        "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80",
      date: new Date().toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
      }),
      readTime: calculateReadTime(parsedData.paragraphs),
      content: parsedData.paragraphs,
      imageGradient: "from-blue-600 to-indigo-700",
      tags: ["Vector", "Production", "DOCX Import"],
      heroImage:
        "https://images.unsplash.com/photo-1626785774573-4b799315345d?auto=format&fit=crop&w=1200&q=80",
      status: "published",
      seo: {
        metaTitle: parsedData.title,
        metaDescription: summary,
        focusKeywords: ["vector graphics", "print production"],
      },
    };

    saveBlog(newBlog);
    setPublishing(false);
    setPublishSuccess(true);
  };

  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      <div>
        <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
          DOCX Document Importer
        </h1>
        <p className="text-slate-400 text-sm mt-1">
          Upload any Microsoft Word document (<code className="text-primary-blue font-mono">.docx</code>) and Vector Lab will automatically extract headings, structured paragraphs, lists, and comparison tables.
        </p>
      </div>

      {/* Upload Dropzone */}
      <div
        onDragOver={(e) => {
          e.preventDefault();
          setIsDragging(true);
        }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={handleDrop}
        className={`relative overflow-hidden rounded-3xl border-2 border-dashed p-10 text-center transition-all ${
          isDragging
            ? "border-primary-blue bg-primary-blue/10 scale-[1.01]"
            : "border-slate-800 bg-slate-900/80 hover:border-slate-700"
        }`}
      >
        <div className="max-w-md mx-auto space-y-4">
          <div className="w-16 h-16 rounded-2xl bg-slate-800 text-primary-blue mx-auto flex items-center justify-center shadow-lg">
            <UploadCloud className="w-8 h-8" />
          </div>

          <h3 className="text-lg font-black text-white">
            Drag and Drop your Word Document
          </h3>

          <p className="text-xs text-slate-400 leading-relaxed">
            Upload your article in <code className="text-primary-blue font-mono font-bold">.docx</code> format. Headings, bold text, bullet points, and pricing tables are preserved automatically.
          </p>

          {error && (
            <div className="p-3 bg-rose-500/10 border border-rose-500/30 rounded-xl text-rose-400 text-xs font-semibold flex items-center justify-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <div className="pt-2">
            <label className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-primary-blue hover:bg-blue-600 text-white text-xs font-bold cursor-pointer transition-all shadow-lg shadow-primary-blue/20">
              <FileUp className="w-4 h-4" />
              <span>{parsing ? "Parsing Document..." : "Choose .docx File"}</span>
              <input
                type="file"
                accept=".docx,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                className="hidden"
                disabled={parsing}
                onChange={(e) => {
                  if (e.target.files && e.target.files[0]) {
                    processFile(e.target.files[0]);
                  }
                }}
              />
            </label>
          </div>
        </div>
      </div>

      {/* Parse Result Preview */}
      {parsedData && (
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6 shadow-xl">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 text-xs font-bold mb-2">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Document Parsed Successfully</span>
              </div>
              <h2 className="text-xl font-black text-white tracking-tight">
                {parsedData.title}
              </h2>
              <p className="text-xs text-slate-400 mt-1">
                Source File: <span className="font-mono text-slate-300">{parsedData.fileName}</span> • {parsedData.paragraphs.length} blocks extracted • Author: {parsedData.author}
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <button
                onClick={() => {
                  onSendToEditor({
                    title: parsedData.title,
                    author: parsedData.author,
                    paragraphs: parsedData.paragraphs,
                  });
                  onNavigate("new");
                }}
                className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold inline-flex items-center gap-2 border border-slate-700 transition-all cursor-pointer"
              >
                <span>Open in Full Editor &amp; SEO</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={handlePublishDirectly}
                disabled={publishing}
                className="px-5 py-2.5 rounded-xl bg-primary-blue hover:bg-blue-600 text-white text-xs font-bold inline-flex items-center gap-2 shadow-lg shadow-primary-blue/20 transition-all cursor-pointer disabled:opacity-50"
              >
                {publishing ? (
                  <span>Publishing...</span>
                ) : publishSuccess ? (
                  <>
                    <CheckCircle2 className="w-4 h-4 text-emerald-300" />
                    <span>Published to /blogs/{slugify(parsedData.title)}!</span>
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    <span>Publish Directly</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Quick Preview of Parsed Paragraphs */}
          <div className="space-y-4 max-h-96 overflow-y-auto pr-2 bg-slate-950 p-6 rounded-2xl border border-slate-800">
            {parsedData.paragraphs.slice(0, 10).map((p, i) => (
              <div key={i} className="text-xs text-slate-300 font-mono leading-relaxed pb-2 border-b border-slate-900">
                {p}
              </div>
            ))}
            {parsedData.paragraphs.length > 10 && (
              <div className="text-center text-xs text-slate-500 pt-2">
                + {parsedData.paragraphs.length - 10} more paragraphs extracted
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
