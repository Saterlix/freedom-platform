// ============================================
// FreeDom — Theme Manager
// ============================================

const THEME_KEY = 'freedom_theme';

/**
 * Initialize theme from localStorage or default to 'light'.
 */
export function initTheme() {
  const saved = localStorage.getItem(THEME_KEY) || 'light';
  applyTheme(saved);
}

/**
 * Toggle between light and dark themes.
 */
export function toggleTheme() {
  const current = document.documentElement.getAttribute('data-theme') || 'light';
  const next = current === 'light' ? 'dark' : 'light';
  applyTheme(next);
  localStorage.setItem(THEME_KEY, next);
}

/**
 * Apply a specific theme.
 */
function applyTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme);
  const btn = document.getElementById('themeToggle');
  if (btn) {
    btn.textContent = theme === 'dark' ? '☀️' : '🌙';
  }
}

/**
 * Get current theme.
 */
export function getTheme() {
  return document.documentElement.getAttribute('data-theme') || 'light';
}
