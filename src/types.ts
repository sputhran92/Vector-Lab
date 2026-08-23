export interface SEOSettings {
  metaTitle?: string;
  metaDescription?: string;
  focusKeywords?: string[];
  canonicalUrl?: string;
  ogImage?: string;
  noIndex?: boolean;
}

export interface BlogPost {
  id: string; // url slug (e.g. manual-vs-auto)
  title: string;
  summary: string;
  category: string;
  author: string;
  authorTitle: string;
  authorAvatar: string;
  date: string;
  readTime: string;
  content: string[];
  imageGradient: string;
  tags: string[];
  heroImage: string;
  status?: "published" | "draft";
  seo?: SEOSettings;
  createdAt?: string;
  updatedAt?: string;
}

export interface AdminUser {
  isAuthenticated: boolean;
  username: string;
  role: "admin" | "editor";
  loginTime?: string;
}
