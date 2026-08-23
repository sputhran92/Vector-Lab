import { BlogPost } from "../types";
import { blogs as defaultBlogs } from "../data/blogsData";
import mammoth from "mammoth";

const STORAGE_KEY = "vector_lab_custom_blogs_v2";
const LEGACY_STORAGE_KEY = "vector_lab_custom_blogs_v1";
const EVENT_NAME = "vector_lab_blogs_changed";

let cachedBlogs: BlogPost[] = [];

/**
 * Initialize cache from local storage or defaults
 */
function initCachedBlogs(): BlogPost[] {
  if (cachedBlogs.length > 0) return cachedBlogs;

  try {
    // Check current versioned storage
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed: BlogPost[] = JSON.parse(raw);
      if (Array.isArray(parsed) && parsed.length > 0) {
        cachedBlogs = parsed;
        return parsed;
      }
    }

    // Check legacy storage and migrate if valid
    const legacyRaw = localStorage.getItem(LEGACY_STORAGE_KEY);
    if (legacyRaw) {
      try {
        const legacyParsed: BlogPost[] = JSON.parse(legacyRaw);
        if (Array.isArray(legacyParsed) && legacyParsed.length > 0) {
          // If defaultBlogs had edits, prefer defaultBlogs for seeded posts and keep custom ones
          const customPosts = legacyParsed.filter(
            lp => !defaultBlogs.some(db => db.id.toLowerCase() === lp.id.toLowerCase())
          );
          const merged = [...defaultBlogs, ...customPosts];
          cachedBlogs = merged;
          localStorage.setItem(STORAGE_KEY, JSON.stringify(merged));
          localStorage.removeItem(LEGACY_STORAGE_KEY);
          return merged;
        }
      } catch {}
    }

    // Default to seeded dataset
    cachedBlogs = [...defaultBlogs];
    localStorage.setItem(STORAGE_KEY, JSON.stringify(defaultBlogs));
    return defaultBlogs;
  } catch {
    cachedBlogs = [...defaultBlogs];
    return defaultBlogs;
  }
}

/**
 * Synchronize blogs from server API and update local cache
 */
export async function syncBlogsFromServer(): Promise<BlogPost[]> {
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 3000);

    const res = await fetch("/api/blogs?all=true", { signal: controller.signal });
    clearTimeout(timeoutId);

    if (res.ok) {
      const serverBlogs: BlogPost[] = await res.json();
      if (Array.isArray(serverBlogs) && serverBlogs.length > 0) {
        cachedBlogs = serverBlogs;
        try {
          localStorage.setItem(STORAGE_KEY, JSON.stringify(serverBlogs));
        } catch {}
        if (typeof window !== "undefined") {
          window.dispatchEvent(new CustomEvent(EVENT_NAME, { detail: serverBlogs }));
        }
        return serverBlogs;
      }
    }
  } catch (err) {
    // Fallback to local
  }
  return getAllBlogs(true);
}

// Auto-run initial background sync on script load in browser
if (typeof window !== "undefined") {
  initCachedBlogs();
  setTimeout(() => {
    syncBlogsFromServer();
  }, 100);
}

/**
 * Initialize and get all blogs from cache/localStorage or default dataset
 */
export function getAllBlogs(includeDrafts = false): BlogPost[] {
  const blogs = initCachedBlogs();
  return blogs.filter(b => includeDrafts || b.status !== "draft");
}

/**
 * Retrieve single blog post by slug ID
 */
export function getBlogById(id: string, includeDrafts = true): BlogPost | undefined {
  const all = getAllBlogs(includeDrafts);
  return all.find(b => b.id.toLowerCase() === id.toLowerCase());
}

/**
 * Save or update a blog post
 */
export async function saveBlogAsync(blog: BlogPost): Promise<{ success: boolean; error?: string }> {
  try {
    const enrichedBlog: BlogPost = {
      ...blog,
      updatedAt: new Date().toISOString(),
      createdAt: blog.createdAt || new Date().toISOString(),
      status: blog.status || "published",
      readTime: blog.readTime || calculateReadTime(blog.content),
    };

    // Update in-memory & local cache immediately
    const all = [...initCachedBlogs()];
    const existingIndex = all.findIndex(b => b.id.toLowerCase() === blog.id.toLowerCase());
    if (existingIndex >= 0) {
      all[existingIndex] = enrichedBlog;
    } else {
      all.unshift(enrichedBlog);
    }
    cachedBlogs = all;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(all));
    } catch {}

    if (typeof window !== "undefined") {
      window.dispatchEvent(new CustomEvent(EVENT_NAME, { detail: enrichedBlog }));
    }

    // Persist to server in background
    fetch("/api/blogs", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(enrichedBlog),
    }).catch(() => {});

    return { success: true };
  } catch (err: any) {
    console.error("Failed to save blog:", err);
    return { success: false, error: err.message || "Failed to save blog post" };
  }
}

/**
 * Synchronous save for immediate handler compatibility
 */
export function saveBlog(blog: BlogPost): { success: boolean; error?: string } {
  saveBlogAsync(blog);
  return { success: true };
}

/**
 * Delete a blog post
 */
export async function deleteBlogAsync(id: string): Promise<boolean> {
  try {
    const all = initCachedBlogs().filter(b => b.id.toLowerCase() !== id.toLowerCase());
    cachedBlogs = all;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(all));
    } catch {}

    if (typeof window !== "undefined") {
      window.dispatchEvent(new CustomEvent(EVENT_NAME));
    }

    fetch(`/api/blogs/${encodeURIComponent(id)}`, { method: "DELETE" }).catch(() => {});
    return true;
  } catch (err) {
    console.error("Failed to delete blog:", err);
    return false;
  }
}

export function deleteBlog(id: string): boolean {
  deleteBlogAsync(id);
  return true;
}

/**
 * Duplicate a blog post as draft
 */
export function duplicateBlog(id: string): BlogPost | null {
  const target = getBlogById(id, true);
  if (!target) return null;

  const newId = `${target.id}-copy-${Date.now().toString().slice(-4)}`;
  const duplicate: BlogPost = {
    ...target,
    id: newId,
    title: `${target.title} (Copy)`,
    status: "draft",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  saveBlog(duplicate);
  return duplicate;
}

/**
 * Reset back to initial curated blog dataset
 */
export async function resetBlogsToDefault(): Promise<void> {
  cachedBlogs = [...defaultBlogs];
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(defaultBlogs));
    localStorage.removeItem(LEGACY_STORAGE_KEY);
  } catch {}

  if (typeof window !== "undefined") {
    window.dispatchEvent(new CustomEvent(EVENT_NAME));
  }

  try {
    await fetch("/api/blogs/reset", { method: "POST" });
  } catch {}
}

/**
 * Export all blogs as JSON file
 */
export function exportBlogsJSON(): void {
  const all = getAllBlogs(true);
  const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(all, null, 2));
  const downloadAnchor = document.createElement("a");
  downloadAnchor.setAttribute("href", dataStr);
  downloadAnchor.setAttribute("download", `vector-lab-blogs-backup-${new Date().toISOString().slice(0, 10)}.json`);
  document.body.appendChild(downloadAnchor);
  downloadAnchor.click();
  downloadAnchor.remove();
}

/**
 * Import blogs from JSON file string
 */
export async function importBlogsJSON(jsonString: string): Promise<{ success: boolean; count: number; error?: string }> {
  try {
    const parsed = JSON.parse(jsonString);
    if (!Array.isArray(parsed)) {
      return { success: false, count: 0, error: "Uploaded file is not a valid blogs array JSON." };
    }

    cachedBlogs = parsed;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(parsed));
    } catch {}

    if (typeof window !== "undefined") {
      window.dispatchEvent(new CustomEvent(EVENT_NAME));
    }

    fetch("/api/blogs/import", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ blogs: parsed }),
    }).catch(() => {});

    return { success: true, count: parsed.length };
  } catch (err: any) {
    return { success: false, count: 0, error: err.message || "Failed to parse JSON" };
  }
}

/**
 * Word count & reading time calculator
 */
export function calculateReadTime(content: string[]): string {
  const totalWords = content.reduce((acc, p) => acc + p.split(/\s+/).filter(Boolean).length, 0);
  const minutes = Math.max(1, Math.ceil(totalWords / 200));
  return `${minutes} min read`;
}

/**
 * Helper to slugify a title into a URL-friendly string
 */
export function slugify(text: string): string {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-") // Replace spaces with -
    .replace(/[^\w-]+/g, "") // Remove all non-word chars
    .replace(/--+/g, "-") // Replace multiple - with single -
    .replace(/^-+/, "") // Trim - from start of text
    .replace(/-+$/, ""); // Trim - from end of text
}

/**
 * Parse an uploaded .docx File using mammoth into structured blog paragraphs & headings
 */
export async function parseDocxFile(file: File): Promise<{
  title?: string;
  author?: string;
  paragraphs: string[];
  rawText: string;
}> {
  const arrayBuffer = await file.arrayBuffer();
  
  // Use mammoth to extract raw text and html
  const result = await mammoth.convertToHtml({ arrayBuffer });
  const html = result.value;

  // Create temporary element to parse semantic DOM
  const tempDiv = document.createElement("div");
  tempDiv.innerHTML = html;

  const paragraphs: string[] = [];
  let detectedTitle = "";
  let detectedAuthor = "";

  // Process child elements
  Array.from(tempDiv.children).forEach((el, index) => {
    const tagName = el.tagName.toLowerCase();
    const text = el.textContent?.trim() || "";

    if (!text) return;

    // Check for author line (e.g. "By Shailesh, Vector Lab | August 22, 2026")
    if (text.toLowerCase().startsWith("by ") && index < 4) {
      detectedAuthor = text.replace(/^by\s+/i, "").split(/[,|]/)[0].trim();
    }

    if (tagName === "h1" || (tagName === "h2" && index === 0 && !detectedTitle)) {
      if (!detectedTitle) detectedTitle = text;
      paragraphs.push(`## ${text}`);
    } else if (tagName === "h2") {
      paragraphs.push(`## ${text}`);
    } else if (tagName === "h3" || tagName === "h4") {
      paragraphs.push(`### ${text}`);
    } else if (tagName === "ul" || tagName === "ol") {
      const items = Array.from(el.querySelectorAll("li")).map((li) => `● ${li.textContent?.trim()}`);
      if (items.length > 0) {
        paragraphs.push(items.join("\n"));
      }
    } else if (tagName === "table") {
      // Convert HTML table into markdown table
      const rows = Array.from(el.querySelectorAll("tr"));
      if (rows.length > 0) {
        const tableLines: string[] = [];
        rows.forEach((r, rIdx) => {
          const cells = Array.from(r.querySelectorAll("th, td")).map((c) => c.textContent?.trim() || "");
          tableLines.push(`| ${cells.join(" | ")} |`);
          if (rIdx === 0) {
            tableLines.push(`| ${cells.map(() => "---").join(" | ")} |`);
          }
        });
        paragraphs.push(tableLines.join("\n"));
      }
    } else {
      // Normal paragraph
      if (!detectedTitle && index === 0 && text.length < 120) {
        detectedTitle = text;
      }
      paragraphs.push(text);
    }
  });

  // If HTML extraction yielded very few items, fallback to raw text lines
  if (paragraphs.length === 0) {
    const rawResult = await mammoth.extractRawText({ arrayBuffer });
    const lines = rawResult.value.split(/\n\n+/).map((l) => l.trim()).filter(Boolean);
    return {
      title: lines[0] || file.name.replace(/\.[^/.]+$/, ""),
      paragraphs: lines,
      rawText: rawResult.value,
    };
  }

  return {
    title: detectedTitle || file.name.replace(/\.[^/.]+$/, ""),
    author: detectedAuthor,
    paragraphs,
    rawText: tempDiv.innerText || "",
  };
}
