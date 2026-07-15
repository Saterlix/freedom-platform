// ============================================
// FreeDom — Shared Helper Utilities
// ============================================

import { Auth } from '../auth.js';

/**
 * Time ago string from a date string or timestamp.
 * @param {string|number|Date} dateInput
 * @returns {string}
 */
export function timeAgo(dateInput) {
  const date = new Date(dateInput);
  const now = new Date();
  const diffMs = now - date;
  const diffSec = Math.floor(diffMs / 1000);
  const diffMin = Math.floor(diffSec / 60);
  const diffHour = Math.floor(diffMin / 60);
  const diffDay = Math.floor(diffHour / 24);
  const diffWeek = Math.floor(diffDay / 7);
  const diffMonth = Math.floor(diffDay / 30);

  if (diffSec < 60) return 'Just now';
  if (diffMin < 60) return `${diffMin}m ago`;
  if (diffHour < 24) return `${diffHour}h ago`;
  if (diffDay < 7) return `${diffDay}d ago`;
  if (diffWeek < 5) return `${diffWeek}w ago`;
  return `${diffMonth}mo ago`;
}

/**
 * Render star rating HTML.
 * @param {number} rating - Rating out of 5
 * @returns {string}
 */
export function renderStars(rating) {
  const full = Math.floor(rating);
  const half = rating % 1 >= 0.5 ? 1 : 0;
  const empty = 5 - full - half;
  return `<span class="stars">${'★'.repeat(full)}${half ? '½' : ''}${'☆'.repeat(empty)}</span>`;
}

/**
 * Render an avatar HTML element.
 * @param {Object} user
 * @param {'xs'|'sm'|'md'|'lg'|'xl'} size
 * @returns {string}
 */
export function renderAvatar(user, size = 'md') {
  if (!user) return `<div class="avatar avatar-${size}" style="background: #666;">?</div>`;
  const initials = Auth.getInitials(user.name || 'Unknown');
  const color = user.avatarColor || '#8b5cf6';
  return `<div class="avatar avatar-${size}" style="background-color: ${color}; color: #fff; display: flex; align-items: center; justify-content: center; font-weight: 700;">${initials}</div>`;
}

/**
 * Get a category CSS class name.
 * @param {string} category
 * @returns {string}
 */
export function getCategoryClass(category) {
  const map = {
    'Development': 'cat-development',
    'Design': 'cat-design',
    'Marketing': 'cat-marketing',
    'Writing': 'cat-writing',
    'Video & Animation': 'cat-video',
    'Music & Audio': 'cat-music',
    'Business': 'cat-business',
    'AI & Machine Learning': 'cat-ai',
  };
  return map[category] || 'cat-development';
}

/**
 * Get a category emoji icon.
 * @param {string} category
 * @returns {string}
 */
export function getCategoryIcon(category) {
  const map = {
    'Development': '💻',
    'Design': '🎨',
    'Marketing': '📈',
    'Writing': '✍️',
    'Video & Animation': '🎬',
    'Music & Audio': '🎵',
    'Business': '💼',
    'AI & Machine Learning': '🤖',
  };
  return map[category] || '📁';
}

/**
 * Format a currency amount.
 * @param {number} amount
 * @returns {string}
 */
export function formatCurrency(amount) {
  return `${Number(amount).toLocaleString('ru-RU')} UZS`;
}

/**
 * Truncate a string to maxLength.
 * @param {string} str
 * @param {number} maxLength
 * @returns {string}
 */
export function truncate(str, maxLength = 100) {
  if (!str) return '';
  if (str.length <= maxLength) return str;
  return str.substring(0, maxLength).trim() + '…';
}

/**
 * Format a date string to a readable format.
 * @param {string|Date} dateInput
 * @returns {string}
 */
export function formatDate(dateInput) {
  const d = new Date(dateInput);
  return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
}

/**
 * Generate a unique ID.
 * @returns {string}
 */
export function generateId() {
  return Date.now().toString(36) + Math.random().toString(36).substr(2, 9);
}

/**
 * All categories list.
 */
export const CATEGORIES = [
  'Development',
  'Design',
  'Marketing',
  'Writing',
  'Video & Animation',
  'Music & Audio',
  'Business',
  'AI & Machine Learning'
];

/**
 * Debounce utility.
 * @param {Function} fn
 * @param {number} delay
 * @returns {Function}
 */
export function debounce(fn, delay = 300) {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), delay);
  };
}
