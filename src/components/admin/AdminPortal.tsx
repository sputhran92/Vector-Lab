import React, { useState, useEffect } from "react";
import { isAdminAuthenticated } from "../../services/authService";
import AdminLogin from "./AdminLogin";
import AdminLayout, { AdminTab } from "./AdminLayout";
import AdminDashboard from "./AdminDashboard";
import AdminBlogList from "./AdminBlogList";
import AdminBlogEditor from "./AdminBlogEditor";
import AdminDocxImporter from "./AdminDocxImporter";
import AdminSeoCenter from "./AdminSeoCenter";
import AdminSettings from "./AdminSettings";

export default function AdminPortal() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentTab, setCurrentTab] = useState<AdminTab>("dashboard");
  const [editingBlogId, setEditingBlogId] = useState<string | undefined>(undefined);
  const [docxPrefill, setDocxPrefill] = useState<{
    title: string;
    author?: string;
    paragraphs: string[];
  } | null>(null);

  useEffect(() => {
    setIsAuthenticated(isAdminAuthenticated());
  }, []);

  const handleNavigate = (tab: AdminTab, blogId?: string) => {
    setEditingBlogId(blogId);
    setCurrentTab(tab);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDocxLoaded = (data: { title: string; author?: string; paragraphs: string[] }) => {
    setDocxPrefill(data);
    setEditingBlogId(undefined);
    setCurrentTab("new");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (!isAuthenticated) {
    return <AdminLogin onLoginSuccess={() => setIsAuthenticated(true)} />;
  }

  return (
    <AdminLayout
      currentTab={currentTab}
      onTabChange={(tab, blogId) => handleNavigate(tab, blogId)}
      onLogout={() => setIsAuthenticated(false)}
    >
      {currentTab === "dashboard" && (
        <AdminDashboard
          onNavigate={handleNavigate}
          onDocxLoaded={handleDocxLoaded}
        />
      )}

      {currentTab === "blogs" && (
        <AdminBlogList onNavigate={handleNavigate} />
      )}

      {(currentTab === "new" || currentTab === "edit") && (
        <AdminBlogEditor
          key={editingBlogId || "new-post"}
          blogId={currentTab === "edit" ? editingBlogId : undefined}
          initialDocxData={currentTab === "new" ? docxPrefill : null}
          onNavigate={handleNavigate}
        />
      )}

      {currentTab === "import" && (
        <AdminDocxImporter
          onSendToEditor={handleDocxLoaded}
          onNavigate={handleNavigate}
        />
      )}

      {currentTab === "seo" && (
        <AdminSeoCenter onNavigate={handleNavigate} />
      )}

      {currentTab === "settings" && (
        <AdminSettings />
      )}
    </AdminLayout>
  );
}
