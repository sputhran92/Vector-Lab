import { BlogPost } from "../types";
import { blogs as defaultBlogs } from "../data/blogsData";
import mammoth from "mammoth";

const STORAGE_KEY = "vector_lab_custom_blogs_v1";
const EVENT_NAME = "vector_lab_blogs_changed";

/**
 * Initialize and get all blogs from localStorage or default dataset
 */
export function getAllBlogs(includeDrafts = false): BlogPost[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      // Seed initial defaults
      localStorage.setItem(STORAGE_KEY, JSON.stringify(defaultBlogs));
      return defaultBlogs.filter(b => includeDrafts || b.status !== "draft");
    }
    const parsed: BlogPost[] = JSON.parse(raw);
    return parsed.filter(b => includeDrafts || b.status !== "draft");
  } catch (err) {
    console.error("Error reading blogs from localStorage:", err);
    return defaultBlogs;
  }
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
export function saveBlog(blog: BlogPost): { success: boolean; error?: string } {
  try {
    const all = getAllBlogs(true);
    const existingIndex = all.findIndex(b => b.id.toLowerCase() === blog.id.toLowerCase());

    const enrichedBlog: BlogPost = {
      ...blog,
      updatedAt: new Date().toISOString(),
      createdAt: blog.createdAt || new Date().toISOString(),
      status: blog.status || "published",
      readTime: blog.readTime || calculateReadTime(blog.content),
    };

    if (existingIndex >= 0) {
      all[existingIndex] = enrichedBlog;
    } else {
      // Prepend newly created blog to top
      all.unshift(enrichedBlog);
    }

    localStorage.setItem(STORAGE_KEY, JSON.stringify(all));
    window.dispatchEvent(new CustomEvent(EVENT_NAME, { detail: enrichedBlog }));
    return { success: true };
  } catch (err: any) {
    console.error("Failed to save blog:", err);
    return { success: false, error: err.message || "Failed to save blog post" };
  }
}

/**
 * Delete a blog post
 */
export function deleteBlog(id: string): boolean {
  try {
    const all = getAllBlogs(true);
    const filtered = all.filter(b => b.id.toLowerCase() !== id.toLowerCase());
    localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
    window.dispatchEvent(new CustomEvent(EVENT_NAME));
    return true;
  } catch (err) {
    console.error("Failed to delete blog:", err);
    return false;
  }
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
export function resetBlogsToDefault(): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(defaultBlogs));
  window.dispatchEvent(new CustomEvent(EVENT_NAME));
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
export function importBlogsJSON(jsonString: string): { success: boolean; count: number; error?: string } {
  try {
    const parsed = JSON.parse(jsonString);
    if (!Array.isArray(parsed)) {
      return { success: false, count: 0, error: "Uploaded file is not a valid blogs array JSON." };
    }
    localStorage.setItem(STORAGE_KEY, JSON.stringify(parsed));
    window.dispatchEvent(new CustomEvent(EVENT_NAME));
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
 * Parse a uploaded .docx File using mammoth into structured blog paragraphs & headings
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
      const items = Array.from(el.querySelectorAll("li")).map(li => `● ${li.textContent?.trim()}`);
      if (items.length > 0) {
        paragraphs.push(items.join("\n"));
      }
    } else if (tagName === "table") {
      // Convert HTML table into markdown table
      const rows = Array.from(el.querySelectorAll("tr"));
      if (rows.length > 0) {
        const tableLines: string[] = [];
        rows.forEach((r, rIdx) => {
          const cells = Array.from(r.querySelectorAll("th, td")).map(c => c.textContent?.trim() || "");
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
    const lines = rawResult.value.split(/\n\n+/).map(l => l.trim()).filter(Boolean);
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
