const ADMIN_AUTH_KEY = "vector_lab_admin_auth_session";
const ADMIN_PASSWORD_KEY = "vector_lab_admin_password_hash";
const DEFAULT_PASSWORD = "vectorlab2026";

export interface AdminSession {
  isAuthenticated: boolean;
  token?: string;
  timestamp: number;
  user?: string;
}

/**
 * Checks if the current admin session is valid locally
 */
export function isAdminAuthenticated(): boolean {
  try {
    const session = localStorage.getItem(ADMIN_AUTH_KEY) || sessionStorage.getItem(ADMIN_AUTH_KEY);
    if (!session) return false;
    const parsed: AdminSession = JSON.parse(session);
    // Session valid for 7 days
    const maxAge = 7 * 24 * 60 * 60 * 1000;
    if (Date.now() - parsed.timestamp > maxAge) {
      logoutAdmin();
      return false;
    }
    return parsed.isAuthenticated === true;
  } catch {
    return false;
  }
}

/**
 * Get current session token for API authorization
 */
export function getAdminToken(): string | null {
  try {
    const session = localStorage.getItem(ADMIN_AUTH_KEY) || sessionStorage.getItem(ADMIN_AUTH_KEY);
    if (!session) return null;
    const parsed: AdminSession = JSON.parse(session);
    return parsed.token || null;
  } catch {
    return null;
  }
}

/**
 * Helper to store session
 */
function setStoredSession(token: string, rememberMe = true) {
  const sessionData: AdminSession = {
    isAuthenticated: true,
    token,
    timestamp: Date.now(),
    user: "Vector Lab Administrator",
  };
  if (rememberMe) {
    localStorage.setItem(ADMIN_AUTH_KEY, JSON.stringify(sessionData));
  } else {
    sessionStorage.setItem(ADMIN_AUTH_KEY, JSON.stringify(sessionData));
  }
}

/**
 * Get the currently configured passcode (from localStorage or default)
 */
export function getCurrentPasscode(): string {
  try {
    return localStorage.getItem(ADMIN_PASSWORD_KEY) || DEFAULT_PASSWORD;
  } catch {
    return DEFAULT_PASSWORD;
  }
}

/**
 * Authenticate with the master passcode (attempts server sync, falls back seamlessly to client storage)
 */
export async function loginAdminAsync(
  password: string,
  rememberMe = true
): Promise<{ success: boolean; error?: string }> {
  const trimmed = password.trim();

  // Try server API first
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 3500);

    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password: trimmed }),
      signal: controller.signal,
    });
    clearTimeout(timeoutId);

    const data = await res.json();
    if (res.ok && data.success) {
      setStoredSession(data.token || "admin_session_token", rememberMe);
      return { success: true };
    } else if (res.status === 401) {
      // Check if user changed it locally on this device
      const localPass = getCurrentPasscode();
      if (trimmed === localPass) {
        setStoredSession("local_admin_session_token", rememberMe);
        return { success: true };
      }
      return { success: false, error: data.error || "Invalid admin passcode. Please try again." };
    }
  } catch {
    // Network or server unreachable: Seamless client-side verification
    console.info("Using local authentication fallback.");
  }

  // Local fallback validation
  const localPass = getCurrentPasscode();
  if (trimmed === localPass) {
    setStoredSession("local_admin_session_token", rememberMe);
    return { success: true };
  }

  return { success: false, error: "Invalid admin passcode. Please try again." };
}

/**
 * Synchronous login for fallback
 */
export function loginAdmin(password: string, rememberMe = true): { success: boolean; error?: string } {
  const trimmed = password.trim();
  const localPass = getCurrentPasscode();
  if (trimmed === localPass) {
    setStoredSession("local_admin_session_token", rememberMe);
    return { success: true };
  }
  return { success: false, error: "Invalid admin passcode. Please try again." };
}

/**
 * Change master passcode globally on the server and update local storage immediately
 */
export async function changeAdminPasswordAsync(
  oldPass: string,
  newPass: string
): Promise<{ success: boolean; error?: string }> {
  const currentLocal = getCurrentPasscode();
  const oldTrimmed = oldPass.trim();
  const newTrimmed = newPass.trim();

  if (!newTrimmed || newTrimmed.length < 6) {
    return { success: false, error: "New passcode must be at least 6 characters long." };
  }

  // Attempt server update
  let serverUpdated = false;
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 3500);

    const res = await fetch("/api/auth/change-password", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        oldPassword: oldTrimmed,
        newPassword: newTrimmed,
      }),
      signal: controller.signal,
    });
    clearTimeout(timeoutId);

    const data = await res.json();
    if (res.ok && data.success) {
      serverUpdated = true;
    } else if (res.status === 400 && data.error && !data.error.includes("Current passcode")) {
      return { success: false, error: data.error };
    }
  } catch {
    console.info("Server change-password endpoint unreachable, updating local storage.");
  }

  // If server didn't succeed because of mismatched old password, verify against local
  if (!serverUpdated && oldTrimmed !== currentLocal) {
    return { success: false, error: "Current passcode is incorrect." };
  }

  // Update local storage
  try {
    localStorage.setItem(ADMIN_PASSWORD_KEY, newTrimmed);
  } catch (err) {
    console.error("Failed to write to localStorage:", err);
  }

  return { success: true };
}

export function changeAdminPassword(oldPass: string, newPass: string): { success: boolean; error?: string } {
  const currentLocal = getCurrentPasscode();
  const oldTrimmed = oldPass.trim();
  const newTrimmed = newPass.trim();

  if (oldTrimmed !== currentLocal) {
    return { success: false, error: "Current passcode is incorrect." };
  }

  if (!newTrimmed || newTrimmed.length < 6) {
    return { success: false, error: "New passcode must be at least 6 characters long." };
  }

  try {
    localStorage.setItem(ADMIN_PASSWORD_KEY, newTrimmed);
    // Fire and forget server update
    fetch("/api/auth/change-password", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ oldPassword: oldTrimmed, newPassword: newTrimmed }),
    }).catch(() => {});
  } catch (err) {
    console.error("Failed to write to localStorage:", err);
  }

  return { success: true };
}

/**
 * Log out admin
 */
export function logoutAdmin(): void {
  localStorage.removeItem(ADMIN_AUTH_KEY);
  sessionStorage.removeItem(ADMIN_AUTH_KEY);
}
