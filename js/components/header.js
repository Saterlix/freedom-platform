// ============================================
// FreeDom — Top Bar / Header Component
// ============================================

import { Auth } from '../auth.js';
import { Storage } from '../storage.js';
import { renderAvatar } from '../utils/helpers.js';
import { t } from '../utils/i18n.js';

/**
 * Update the top bar with current user info.
 * @param {Object} user
 */
export function updateTopBar(user) {
  if (!user) return;

  // Avatar
  const avatarEl = document.getElementById('topBarAvatar');
  if (avatarEl) {
    const initials = Auth.getInitials(user.name);
    avatarEl.style.backgroundColor = user.avatarColor || user.avatar_color || '#8b5cf6';
    avatarEl.textContent = initials;
    avatarEl.style.color = '#fff';
    avatarEl.style.display = 'flex';
    avatarEl.style.alignItems = 'center';
    avatarEl.style.justifyContent = 'center';
    avatarEl.style.fontWeight = '700';
    avatarEl.style.fontSize = '0.75rem';
  }

  // Dropdown Menu setup
  const userMenu = document.getElementById('userMenu');
  if (userMenu && !document.getElementById('topBarDropdown')) {
    const dropdown = document.createElement('div');
    dropdown.className = 'user-dropdown';
    dropdown.id = 'topBarDropdown';
    dropdown.innerHTML = `
      <a href="#/profile/${user.id}" class="user-dropdown-item">👤 ${t('My Profile')}</a>
      <a href="#/settings" class="user-dropdown-item">⚙️ ${t('Settings')}</a>
      <div class="nav-divider" style="margin: 0.25rem 0; height: 1px; background: var(--color-border);"></div>
      <button class="user-dropdown-item" id="topBarLogoutBtn" style="font-family: inherit;">🚪 ${t('Log Out')}</button>
    `;
    userMenu.appendChild(dropdown);

    // Click handler for toggle
    userMenu.addEventListener('click', (e) => {
      e.stopPropagation();
      dropdown.classList.toggle('show');
    });

    // Close when clicking outside
    document.addEventListener('click', () => {
      dropdown.classList.remove('show');
    });

    // Logout action
    const logoutBtn = document.getElementById('topBarLogoutBtn');
    if (logoutBtn) {
      logoutBtn.addEventListener('click', (e) => {
        e.preventDefault();
        Auth.logout();
        window.location.href = 'index.html';
      });
    }
  }

  // Search placeholder i18n
  const searchInput = document.getElementById('globalSearch');
  if (searchInput) {
    searchInput.placeholder = t('Search...');
  }

  // Notifications badge
  updateNotificationBadge();
}

/**
 * Update the notification badge count based on REAL data.
 */
export function updateNotificationBadge() {
  const badge = document.getElementById('notifBadge');
  if (!badge) return;

  const user = Auth.getCurrentUser();
  if (!user) { badge.classList.add('hidden'); return; }

  let count = 0;

  // Count unread messages received by user
  const allMessages = Storage.getAll('messages') || [];
  count += allMessages.filter(m => m.receiver_id === user.id && !m.read).length;

  // Count pending proposals on user's projects (if admin/client)
  if (user.email === 'admin@novauz.tech') {
    const allProjects = Storage.getAll('projects') || [];
    const myProjectIds = allProjects.filter(p => (p.client_id || p.clientId) === user.id).map(p => p.id);
    const allProposals = Storage.getAll('proposals') || [];
    count += allProposals.filter(pr => {
      const pid = pr.project_id || pr.projectId;
      return myProjectIds.includes(pid) && pr.status === 'pending';
    }).length;
  }

  // Count accepted proposals for current user (good news!)
  const allProposals = Storage.getAll('proposals') || [];
  const acceptedRecently = allProposals.filter(pr => {
    const fid = pr.freelancer_id || pr.freelancerId;
    return fid === user.id && pr.status === 'accepted';
  });
  count += acceptedRecently.length;

  if (count > 0) {
    badge.textContent = count > 9 ? '9+' : count;
    badge.classList.remove('hidden');
  } else {
    badge.classList.add('hidden');
  }
}

/**
 * Set the page title in the top bar.
 * @param {string} title
 */
export function setPageTitle(title) {
  const el = document.getElementById('pageTitle');
  if (el) el.textContent = title;
  document.title = `FreeDom — ${title}`;
}
