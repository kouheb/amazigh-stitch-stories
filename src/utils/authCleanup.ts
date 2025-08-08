// Utility to fully clear Supabase auth state to avoid limbo/logout issues
export const cleanupAuthState = () => {
  try {
    // Remove standard auth token key used by older versions
    localStorage.removeItem('supabase.auth.token');

    // Remove all Supabase auth keys from localStorage
    Object.keys(localStorage).forEach((key) => {
      if (key.startsWith('supabase.auth.') || key.includes('sb-')) {
        localStorage.removeItem(key);
      }
    });

    // Remove any sessionStorage keys as well
    Object.keys(sessionStorage || {}).forEach((key) => {
      if (key.startsWith('supabase.auth.') || key.includes('sb-')) {
        sessionStorage.removeItem(key);
      }
    });
  } catch (err) {
    // Ignore cleanup errors
    console.warn('Auth cleanup warning:', err);
  }
};
