const ADMIN_AUTH_KEY = "vector_lab_admin_auth_session";
const ADMIN_PASSWORD_KEY = "vector_lab_admin_password_hash";
const DEFAULT_PASSWORD = "vectorlab2026"; // Default initial master passcode

/**
 * Checks if the current admin session is valid
 */
export function isAdminAuthenticated(): boolean {
  try {
    const session = localStorage.getItem(ADMIN_AUTH_KEY) || sessionStorage.getItem(ADMIN_AUTH_KEY);
    if (!session) return false;
    const parsed = JSON.parse(session);
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
 * Authenticate using master passcode
 */
export function loginAdmin(password: string, rememberMe = true): { success: boolean; error?: string } {
  const currentPassword = localStorage.getItem(ADMIN_PASSWORD_KEY) || DEFAULT_PASSWORD;
  
  if (password.trim() === currentPassword.trim()) {
    const sessionData = {
      isAuthenticated: true,
      timestamp: Date.now(),
      user: "Vector Lab Administrator",
    };
    if (rememberMe) {
      localStorage.setItem(ADMIN_AUTH_KEY, JSON.stringify(sessionData));
    } else {
      sessionStorage.setItem(ADMIN_AUTH_KEY, JSON.stringify(sessionData));
    }
    return { success: true };
  }
  return { success: false, error: "Invalid admin passcode. Please try again." };
}

/**
 * Log out admin
 */
export function logoutAdmin(): void {
  localStorage.removeItem(ADMIN_AUTH_KEY);
  sessionStorage.removeItem(ADMIN_AUTH_KEY);
}

/**
 * Change the admin master password
 */
export function changeAdminPassword(oldPass: string, newPass: string): { success: boolean; error?: string } {
  const currentPassword = localStorage.getItem(ADMIN_PASSWORD_KEY) || DEFAULT_PASSWORD;
  if (oldPass.trim() !== currentPassword.trim()) {
    return { success: false, error: "Current passcode is incorrect." };
  }
  if (!newPass || newPass.trim().length < 6) {
    return { success: false, error: "New passcode must be at least 6 characters long." };
  }
  localStorage.setItem(ADMIN_PASSWORD_KEY, newPass.trim());
  return { success: true };
}
