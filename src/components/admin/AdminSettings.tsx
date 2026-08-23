import React, { useState } from "react";
import {
  KeyRound,
  Download,
  Upload,
  RefreshCcw,
  Check,
  AlertTriangle,
  FileJson
} from "lucide-react";
import { changeAdminPasswordAsync } from "../../services/authService";
import {
  exportBlogsJSON,
  importBlogsJSON,
  resetBlogsToDefault
} from "../../services/blogService";

export default function AdminSettings() {
  // Password change state
  const [oldPass, setOldPass] = useState("");
  const [newPass, setNewPass] = useState("");
  const [confirmPass, setConfirmPass] = useState("");
  const [passError, setPassError] = useState("");
  const [passSuccess, setPassSuccess] = useState(false);
  const [passLoading, setPassLoading] = useState(false);

  // Backup & Restore state
  const [importStatus, setImportStatus] = useState<string | null>(null);
  const [importError, setImportError] = useState<string | null>(null);
  const [showResetConfirm, setShowResetConfirm] = useState(false);

  const handlePasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setPassError("");
    setPassSuccess(false);

    if (newPass !== confirmPass) {
      setPassError("New passcode and confirmation do not match.");
      return;
    }

    setPassLoading(true);
    try {
      const res = await changeAdminPasswordAsync(oldPass, newPass);
      if (res.success) {
        setPassSuccess(true);
        setOldPass("");
        setNewPass("");
        setConfirmPass("");
        setTimeout(() => setPassSuccess(false), 4000);
      } else {
        setPassError(res.error || "Failed to update passcode.");
      }
    } catch {
      setPassError("Failed to update passcode. Please try again.");
    } finally {
      setPassLoading(false);
    }
  };

  const handleFileImport = (e: React.ChangeEvent<HTMLInputElement>) => {
    setImportStatus(null);
    setImportError(null);

    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = async (event) => {
      const content = event.target?.result as string;
      const res = await importBlogsJSON(content);
      if (res.success) {
        setImportStatus(`Successfully restored ${res.count} blog posts from backup!`);
      } else {
        setImportError(res.error || "Invalid backup JSON file.");
      }
    };
    reader.readAsText(file);
  };

  const handleReset = async () => {
    await resetBlogsToDefault();
    setShowResetConfirm(false);
    setImportStatus("All blogs have been reset to factory default state.");
  };

  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      <div>
        <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
          Admin Settings &amp; Data Control
        </h1>
        <p className="text-slate-400 text-sm mt-1">
          Manage private security passcodes, JSON database backups, and blog restorations.
        </p>
      </div>

      {/* Security Passcode Section */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-sm space-y-6">
        <div className="flex items-center gap-3 pb-4 border-b border-slate-800">
          <div className="w-10 h-10 rounded-xl bg-primary-blue/10 text-primary-blue flex items-center justify-center">
            <KeyRound className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-base font-black text-white">Change Admin Master Passcode</h2>
            <p className="text-xs text-slate-400">
              Update the passcode used to unlock this private administration area.
            </p>
          </div>
        </div>

        <form onSubmit={handlePasswordSubmit} className="space-y-4 max-w-md">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5">
              Current Passcode
            </label>
            <input
              type="password"
              value={oldPass}
              onChange={(e) => setOldPass(e.target.value)}
              placeholder="Enter current passcode"
              required
              className="w-full px-4 py-2.5 bg-slate-800 border border-slate-700 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-primary-blue"
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5">
              New Passcode
            </label>
            <input
              type="password"
              value={newPass}
              onChange={(e) => setNewPass(e.target.value)}
              placeholder="Minimum 6 characters"
              required
              className="w-full px-4 py-2.5 bg-slate-800 border border-slate-700 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-primary-blue"
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5">
              Confirm New Passcode
            </label>
            <input
              type="password"
              value={confirmPass}
              onChange={(e) => setConfirmPass(e.target.value)}
              placeholder="Confirm new passcode"
              required
              className="w-full px-4 py-2.5 bg-slate-800 border border-slate-700 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-primary-blue"
            />
          </div>

          {passError && (
            <div className="p-3 bg-rose-500/10 border border-rose-500/30 rounded-xl text-rose-400 text-xs font-semibold">
              {passError}
            </div>
          )}

          {passSuccess && (
            <div className="p-3 bg-emerald-500/10 border border-emerald-500/30 rounded-xl text-emerald-400 text-xs font-bold flex items-center gap-2">
              <Check className="w-4 h-4" />
              <span>Passcode updated successfully!</span>
            </div>
          )}

          <button
            type="submit"
            disabled={passLoading}
            className="px-5 py-2.5 rounded-xl bg-primary-blue hover:bg-blue-600 disabled:opacity-50 text-white text-xs font-bold transition-all shadow-lg shadow-primary-blue/20 cursor-pointer disabled:cursor-not-allowed"
          >
            {passLoading ? "Updating..." : "Update Passcode"}
          </button>
        </form>
      </div>

      {/* Backup & Restore Section */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-sm space-y-6">
        <div className="flex items-center gap-3 pb-4 border-b border-slate-800">
          <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center">
            <FileJson className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-base font-black text-white">Database Backup &amp; Restore</h2>
            <p className="text-xs text-slate-400">
              Download your entire blog catalog or restore previous backups in one click.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <Download className="w-4 h-4 text-primary-blue" />
              <span>Export Blog Data (.JSON)</span>
            </h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Downloads a full copy of all published and draft articles, including SEO metadata and formatted paragraphs.
            </p>
            <button
              onClick={exportBlogsJSON}
              className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold inline-flex items-center gap-2 border border-slate-700 transition-all cursor-pointer"
            >
              <Download className="w-4 h-4" />
              <span>Download JSON Backup</span>
            </button>
          </div>

          <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <Upload className="w-4 h-4 text-emerald-400" />
              <span>Restore from Backup (.JSON)</span>
            </h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Upload a previously exported JSON backup file to restore or synchronize your blog posts.
            </p>
            <label className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold border border-slate-700 transition-all cursor-pointer">
              <Upload className="w-4 h-4" />
              <span>Select JSON File</span>
              <input
                type="file"
                accept=".json,application/json"
                className="hidden"
                onChange={handleFileImport}
              />
            </label>
          </div>
        </div>

        {importStatus && (
          <div className="p-3 bg-emerald-500/10 border border-emerald-500/30 rounded-xl text-emerald-400 text-xs font-bold flex items-center gap-2">
            <Check className="w-4 h-4" />
            <span>{importStatus}</span>
          </div>
        )}

        {importError && (
          <div className="p-3 bg-rose-500/10 border border-rose-500/30 rounded-xl text-rose-400 text-xs font-semibold">
            {importError}
          </div>
        )}
      </div>

      {/* Danger Zone: Factory Reset */}
      <div className="bg-slate-900 border border-rose-900/40 rounded-3xl p-6 sm:p-8 shadow-sm space-y-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-rose-500/10 text-rose-400 flex items-center justify-center">
            <AlertTriangle className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-base font-black text-white">Reset to Default Articles</h2>
            <p className="text-xs text-slate-400">
              Restore the original Vector Lab article catalog. Custom articles will be replaced.
            </p>
          </div>
        </div>

        {showResetConfirm ? (
          <div className="p-4 rounded-2xl bg-rose-950/40 border border-rose-800 space-y-3">
            <p className="text-xs text-rose-300 font-bold">
              Are you sure? This will reset all blog data to the default curated state.
            </p>
            <div className="flex items-center gap-3">
              <button
                onClick={() => setShowResetConfirm(false)}
                className="px-3.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-bold cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={handleReset}
                className="px-3.5 py-1.5 rounded-lg bg-rose-600 hover:bg-rose-500 text-white text-xs font-bold cursor-pointer"
              >
                Yes, Reset Everything
              </button>
            </div>
          </div>
        ) : (
          <button
            onClick={() => setShowResetConfirm(true)}
            className="px-4 py-2 rounded-xl bg-rose-500/10 hover:bg-rose-500 text-rose-400 hover:text-white text-xs font-bold border border-rose-500/30 transition-all cursor-pointer inline-flex items-center gap-2"
          >
            <RefreshCcw className="w-4 h-4" />
            <span>Reset Blog Database to Factory Defaults</span>
          </button>
        )}
      </div>
    </div>
  );
}
