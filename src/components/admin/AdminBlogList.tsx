import React, { useState, useEffect } from "react";
import {
  Search,
  Filter,
  Plus,
  Edit,
  Trash2,
  Copy,
  Check,
  ExternalLink,
  FileText,
  AlertTriangle,
  Sparkles,
  Layers,
  ArrowUpDown
} from "lucide-react";
import { BlogPost } from "../../types";
import { AdminTab } from "./AdminLayout";
import { getAllBlogs, deleteBlog, duplicateBlog, syncBlogsFromServer } from "../../services/blogService";

interface AdminBlogListProps {
  onNavigate: (tab: AdminTab, blogId?: string) => void;
}

export default function AdminBlogList({ onNavigate }: AdminBlogListProps) {
  const [blogs, setBlogs] = useState<BlogPost[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);
  const [toastMessage, setToastMessage] = useState("");

  const refreshBlogs = () => {
    setBlogs(getAllBlogs(true));
  };

  useEffect(() => {
    refreshBlogs();
    syncBlogsFromServer().then((latest) => {
      if (latest && latest.length > 0) {
        setBlogs(latest);
      }
    });
    window.addEventListener("vector_lab_blogs_changed", refreshBlogs);
    return () => window.removeEventListener("vector_lab_blogs_changed", refreshBlogs);
  }, []);

  const categories = ["All", ...Array.from(new Set(blogs.map((b) => b.category || "General")))];

  const filteredBlogs = blogs.filter((blog) => {
    const matchesSearch =
      blog.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      blog.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      blog.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (blog.tags || []).some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesCategory = categoryFilter === "All" || blog.category === categoryFilter;
    const matchesStatus =
      statusFilter === "All" ||
      (statusFilter === "Published" && blog.status !== "draft") ||
      (statusFilter === "Draft" && blog.status === "draft");

    return matchesSearch && matchesCategory && matchesStatus;
  });

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(""), 3000);
  };

  const handleCopyUrl = (id: string) => {
    const url = `${window.location.origin}/blogs/${id}`;
    navigator.clipboard.writeText(url).then(() => {
      setCopiedId(id);
      showToast("Blog URL copied to clipboard!");
      setTimeout(() => setCopiedId(null), 2000);
    });
  };

  const handleDuplicate = (id: string) => {
    const dup = duplicateBlog(id);
    if (dup) {
      showToast(`Duplicated post as "${dup.title}"`);
    }
  };

  const handleDelete = (id: string) => {
    deleteBlog(id);
    setDeleteConfirmId(null);
    showToast("Post deleted successfully.");
  };

  return (
    <div className="space-y-6">
      {/* Toast Alert */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-slate-800 text-white px-5 py-3 rounded-2xl shadow-2xl border border-slate-700 flex items-center gap-3 text-xs font-bold animate-in fade-in slide-in-from-bottom-5">
          <Sparkles className="w-4 h-4 text-emerald-400" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
            All Blog Posts
          </h1>
          <p className="text-slate-400 text-sm mt-1">
            Manage your articles, direct URLs, SEO metadata, and draft schedules.
          </p>
        </div>

        <button
          onClick={() => onNavigate("new")}
          className="px-4 py-2.5 rounded-xl bg-primary-blue hover:bg-blue-600 text-white text-xs font-bold inline-flex items-center gap-2 shadow-lg shadow-primary-blue/20 transition-all cursor-pointer self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>New Article</span>
        </button>
      </div>

      {/* Search & Filter Toolbar */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 flex flex-col md:flex-row gap-4 items-center justify-between">
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search articles by title, slug, tag..."
            className="w-full pl-10 pr-4 py-2 bg-slate-800 border border-slate-700 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-primary-blue"
          />
        </div>

        <div className="flex flex-wrap items-center gap-2.5 w-full md:w-auto">
          {/* Category dropdown */}
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="px-3 py-2 bg-slate-800 border border-slate-700 rounded-xl text-xs text-slate-300 font-medium focus:outline-none focus:ring-2 focus:ring-primary-blue"
          >
            {categories.map((c) => (
              <option key={c} value={c}>
                Category: {c}
              </option>
            ))}
          </select>

          {/* Status filter buttons */}
          <div className="flex items-center bg-slate-800 rounded-xl p-1 border border-slate-700 text-xs">
            {["All", "Published", "Draft"].map((st) => (
              <button
                key={st}
                onClick={() => setStatusFilter(st)}
                className={`px-3 py-1 rounded-lg font-bold transition-all cursor-pointer ${
                  statusFilter === st
                    ? "bg-primary-blue text-white shadow-sm"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                {st}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Blog Posts Table */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-300">
            <thead className="bg-slate-950/60 text-slate-400 uppercase tracking-wider font-bold text-[10px] border-b border-slate-800">
              <tr>
                <th className="px-6 py-4">Title &amp; URL Slug</th>
                <th className="px-6 py-4">Category</th>
                <th className="px-6 py-4">Author</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4">Date</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 font-medium">
              {filteredBlogs.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center text-slate-500">
                    <FileText className="w-8 h-8 mx-auto mb-2 opacity-40" />
                    <p className="text-sm font-semibold text-slate-400">No blog posts found</p>
                    <p className="text-xs text-slate-500 mt-0.5">
                      Try adjusting your search criteria or create a new blog post.
                    </p>
                  </td>
                </tr>
              ) : (
                filteredBlogs.map((blog) => (
                  <tr key={blog.id} className="hover:bg-slate-800/40 transition-colors">
                    <td className="px-6 py-4">
                      <div className="max-w-md">
                        <div className="font-bold text-white text-sm line-clamp-1">
                          {blog.title}
                        </div>
                        <div className="text-primary-blue text-[11px] font-mono mt-0.5 flex items-center gap-1.5">
                          <span>/blogs/{blog.id}</span>
                          <button
                            onClick={() => handleCopyUrl(blog.id)}
                            className="text-slate-500 hover:text-slate-300 p-0.5"
                            title="Copy Link"
                          >
                            {copiedId === blog.id ? (
                              <Check className="w-3 h-3 text-emerald-400" />
                            ) : (
                              <Copy className="w-3 h-3" />
                            )}
                          </button>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="px-2.5 py-1 rounded-md bg-slate-800 text-slate-300 font-semibold text-[11px]">
                        {blog.category}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-slate-300 text-xs">
                      {blog.author || "Vector Lab"}
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
                        <a
                          href={`/blogs/${blog.id}`}
                          target="_blank"
                          rel="noreferrer"
                          className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors cursor-pointer"
                          title="View Live Article"
                        >
                          <ExternalLink className="w-3.5 h-3.5 text-primary-blue" />
                        </a>

                        <button
                          onClick={() => handleDuplicate(blog.id)}
                          className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors cursor-pointer"
                          title="Duplicate Post as Draft"
                        >
                          <Copy className="w-3.5 h-3.5" />
                        </button>

                        <button
                          onClick={() => onNavigate("edit", blog.id)}
                          className="p-2 rounded-lg bg-primary-blue/10 hover:bg-primary-blue text-primary-blue hover:text-white transition-colors cursor-pointer"
                          title="Edit Post & SEO"
                        >
                          <Edit className="w-3.5 h-3.5" />
                        </button>

                        <button
                          onClick={() => setDeleteConfirmId(blog.id)}
                          className="p-2 rounded-lg bg-rose-500/10 hover:bg-rose-500 text-rose-400 hover:text-white transition-colors cursor-pointer"
                          title="Delete Post"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {deleteConfirmId && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-rose-500/10 text-rose-400 flex items-center justify-center">
              <AlertTriangle className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-lg font-black text-white">Delete this blog post?</h3>
              <p className="text-xs text-slate-400 mt-1">
                Are you sure you want to delete <code className="text-rose-300 font-mono">/blogs/{deleteConfirmId}</code>? This action cannot be undone.
              </p>
            </div>
            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                onClick={() => setDeleteConfirmId(null)}
                className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-bold cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={() => handleDelete(deleteConfirmId)}
                className="px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-500 text-white text-xs font-bold cursor-pointer"
              >
                Yes, Delete Permanently
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
