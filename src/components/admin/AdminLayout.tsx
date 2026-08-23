import React, { useState } from "react";
import {
  LayoutDashboard,
  FileText,
  PlusCircle,
  FileUp,
  Search,
  Settings,
  ExternalLink,
  LogOut,
  Menu,
  X,
  Sparkles,
  Layers,
  ChevronRight
} from "lucide-react";
import { logoutAdmin } from "../../services/authService";

export type AdminTab = "dashboard" | "blogs" | "new" | "edit" | "import" | "seo" | "settings";

interface AdminLayoutProps {
  currentTab: AdminTab;
  onTabChange: (tab: AdminTab, editBlogId?: string) => void;
  onLogout: () => void;
  children: React.ReactNode;
}

export default function AdminLayout({
  currentTab,
  onTabChange,
  onLogout,
  children
}: AdminLayoutProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems: { id: AdminTab; label: string; icon: React.ElementType; badge?: string }[] = [
    { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
    { id: "blogs", label: "All Blog Posts", icon: FileText },
    { id: "new", label: "Create New Post", icon: PlusCircle },
    { id: "import", label: "DOCX Importer", icon: FileUp, badge: "New" },
    { id: "seo", label: "SEO & SERP Center", icon: Search },
    { id: "settings", label: "Settings & Backups", icon: Settings },
  ];

  const handleNavClick = (tab: AdminTab) => {
    onTabChange(tab);
    setMobileMenuOpen(false);
  };

  const handleLogoutClick = () => {
    logoutAdmin();
    onLogout();
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col md:flex-row font-sans">
      {/* Mobile Top Header */}
      <div className="md:hidden bg-slate-900 border-b border-slate-800 px-4 py-3.5 flex items-center justify-between sticky top-0 z-40">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-primary-blue to-indigo-600 flex items-center justify-center text-white font-black text-sm shadow-md">
            VL
          </div>
          <div>
            <span className="font-extrabold text-sm text-white block leading-none">Vector Lab</span>
            <span className="text-[10px] text-slate-400 font-medium">Admin Studio</span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <a
            href="/blogs"
            target="_blank"
            rel="noreferrer"
            className="p-2 rounded-lg bg-slate-800 text-slate-300 hover:text-white text-xs inline-flex items-center"
            title="View Live Blogs"
          >
            <ExternalLink className="w-4 h-4" />
          </a>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-lg bg-slate-800 text-slate-300 hover:text-white"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Sidebar for Desktop / Mobile Slide-out */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-72 bg-slate-900 border-r border-slate-800 flex flex-col justify-between transition-transform duration-300 md:static md:translate-x-0 ${
          mobileMenuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Brand Top */}
        <div className="p-6 border-b border-slate-800/80">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-primary-blue via-blue-500 to-indigo-600 flex items-center justify-center text-white font-black shadow-lg shadow-primary-blue/20">
                VL
              </div>
              <div>
                <h2 className="font-black text-base text-white tracking-tight leading-snug">
                  Vector Lab
                </h2>
                <div className="flex items-center gap-1.5 mt-0.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="text-xs text-slate-400 font-medium">Admin CMS</span>
                </div>
              </div>
            </div>

            {/* Mobile close button */}
            <button
              onClick={() => setMobileMenuOpen(false)}
              className="md:hidden text-slate-400 hover:text-white p-1"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Navigation Items */}
        <div className="flex-1 px-4 py-6 space-y-1.5 overflow-y-auto">
          <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400 px-3 mb-2">
            Content &amp; Publishing
          </div>

          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`w-full flex items-center justify-between px-3.5 py-3 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                  isActive
                    ? "bg-primary-blue text-white shadow-lg shadow-primary-blue/20"
                    : "text-slate-400 hover:bg-slate-800/80 hover:text-slate-200"
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon className={`w-4 h-4 ${isActive ? "text-white" : "text-slate-400"}`} />
                  <span>{item.label}</span>
                </div>
                {item.badge && (
                  <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                    {item.badge}
                  </span>
                )}
                {isActive && !item.badge && (
                  <ChevronRight className="w-4 h-4 text-white/70" />
                )}
              </button>
            );
          })}
        </div>

        {/* Bottom Actions / User Section */}
        <div className="p-4 border-t border-slate-800/80 space-y-2">
          <a
            href="/blogs"
            target="_blank"
            rel="noreferrer"
            className="w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold text-slate-300 hover:bg-slate-800 transition-colors"
          >
            <div className="flex items-center gap-2.5">
              <ExternalLink className="w-4 h-4 text-primary-blue" />
              <span>Live Public Blogs</span>
            </div>
            <span className="text-[10px] text-slate-400">Opens tab ↗</span>
          </a>

          <button
            onClick={handleLogoutClick}
            className="w-full flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl text-xs font-semibold text-rose-400 hover:bg-rose-500/10 hover:text-rose-300 transition-colors cursor-pointer"
          >
            <LogOut className="w-4 h-4" />
            <span>Lock &amp; Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 min-w-0 bg-slate-950 p-4 sm:p-6 md:p-8 lg:p-10 overflow-y-auto">
        <div className="max-w-6xl mx-auto">
          {children}
        </div>
      </main>
    </div>
  );
}
