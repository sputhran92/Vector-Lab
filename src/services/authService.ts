const ADMIN_AUTH_KEY = "vector_lab_admin_auth_session";

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
 * Authenticate against the server with the master passcode (synchronized across all browsers!)
 */
export async function loginAdminAsync(
  password: string,
  rememberMe = true
): Promise<{ success: boolean; error?: string }> {
  try {
    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password: password.trim() }),
    });

    const data = await res.json();
    if (res.ok && data.success) {
      const sessionData: AdminSession = {
        isAuthenticated: true,
        token: data.token,
        timestamp: Date.now(),
        user: data.user?.name || "Vector Lab Administrator",
      };

      if (rememberMe) {
        localStorage.setItem(ADMIN_AUTH_KEY, JSON.stringify(sessionData));
      } else {
        sessionStorage.setItem(ADMIN_AUTH_KEY, JSON.stringify(sessionData));
      }
      return { success: true };
    }

    return {
      success: false,
      error: data.error || "Invalid admin passcode.",
    };
  } catch (err: any) {
    console.error("Login API network error:", err);
    return { success: false, error: "Network error connecting to authentication server." };
  }
}

/**
 * Synchronous login for fallback
 */
export function loginAdmin(password: string, rememberMe = true): { success: boolean; error?: string } {
  loginAdminAsync(password, rememberMe);
  return { success: true };
}

/**
 * Change master passcode on the server globally (affects all devices & browsers immediately)
 */
export async function changeAdminPasswordAsync(
  oldPass: string,
  newPass: string
): Promise<{ success: boolean; error?: string }> {
  try {
    const res = await fetch("/api/auth/change-password", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        oldPassword: oldPass.trim(),
        newPassword: newPass.trim(),
      }),
    });

    const data = await res.json();
    if (res.ok && data.success) {
      // Update current session token
      if (data.token) {
        const session = localStorage.getItem(ADMIN_AUTH_KEY) || sessionStorage.getItem(ADMIN_AUTH_KEY);
        if (session) {
          const parsed = JSON.parse(session);
          parsed.token = data.token;
          if (localStorage.getItem(ADMIN_AUTH_KEY)) {
            localStorage.setItem(ADMIN_AUTH_KEY, JSON.stringify(parsed));
          } else {
            sessionStorage.setItem(ADMIN_AUTH_KEY, JSON.stringify(parsed));
          }
        }
      }
      return { success: true };
    }

    return { success: false, error: data.error || "Failed to update passcode." };
  } catch (err: any) {
    return { success: false, error: err.message || "Failed to update passcode on server." };
  }
}

export function changeAdminPassword(oldPass: string, newPass: string): { success: boolean; error?: string } {
  changeAdminPasswordAsync(oldPass, newPass);
  return { success: true };
}

/**
 * Log out admin
 */
export function logoutAdmin(): void {
  localStorage.removeItem(ADMIN_AUTH_KEY);
  sessionStorage.removeItem(ADMIN_AUTH_KEY);
}
