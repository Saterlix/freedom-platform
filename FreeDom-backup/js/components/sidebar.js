// ============================================
// FreeDom — Sidebar Component
// ============================================

import { Auth } from '../auth.js';
import { t } from '../utils/i18n.js';

/**
 * Render the sidebar navigation based on user role and plan.
 * @param {Object} user
 * @param {string} currentRoute
 */
export function renderSidebar(user, currentRoute) {
  const nav = document.getElementById('sidebarNav');
  const footer = document.getElementById('sidebarFooter');
  if (!nav || !footer) return;

  const role = user.role || 'freelancer';
  const plan = user.plan || 'free';

  const navItems = buildNavItems(role, plan);

  nav.innerHTML = `
    <div class="nav-section-label">${t('Main')}</div>
    ${navItems.main.map(item => renderNavItem(item, currentRoute)).join('')}
    <div class="nav-divider"></div>
    <div class="nav-section-label">${t('Create')}</div>
    ${navItems.create.map(item => renderNavItem(item, currentRoute)).join('')}
    <div class="nav-divider"></div>
    <div class="nav-section-label">${t('Account')}</div>
    ${navItems.account.map(item => renderNavItem(item, currentRoute)).join('')}
  `;

  // Footer user info
  const initials = Auth.getInitials(user.name);
  const planClass = plan === 'pro' ? 'plan-badge-pro' : plan === 'business' ? 'plan-badge-business' : 'plan-badge-free';
  const planLabel = plan === 'pro' ? '💎 PRO' : plan === 'business' ? '🏢 BUSINESS' : '🆓 Free';

  footer.innerHTML = `
    <div class="sidebar-user">
      <div class="avatar avatar-sm" style="background-color: ${user.avatarColor || user.avatar_color || '#8b5cf6'}; color: #fff; display: flex; align-items: center; justify-content: center; font-weight: 700; font-size: 0.75rem;">
        ${initials}
      </div>
      <div class="sidebar-user-info" style="overflow: hidden;">
        <div class="sidebar-user-name" style="text-overflow: ellipsis; overflow: hidden; white-space: nowrap;">${user.name}</div>
        <div style="font-size: 0.6875rem; color: rgba(255, 255, 255, 0.4); margin-bottom: 0.125rem; text-overflow: ellipsis; overflow: hidden; white-space: nowrap;">@${user.username || ''}</div>
        <div class="sidebar-user-plan ${planClass}">${planLabel}</div>
      </div>
    </div>
    ${plan === 'free' ? `<button class="sidebar-upgrade-btn" id="sidebarUpgradeBtn">${t('Upgrade to PRO')}</button>` : ''}
  `;

  // Attach nav click handlers
  nav.querySelectorAll('.nav-item[data-route]').forEach(el => {
    el.addEventListener('click', (e) => {
      e.preventDefault();
      const route = el.dataset.route;
      window.location.hash = `#${route}`;
      closeMobileSidebar();
    });
  });

  // Logout handler
  const logoutBtn = nav.querySelector('.nav-item[data-action="logout"]');
  if (logoutBtn) {
    logoutBtn.addEventListener('click', (e) => {
      e.preventDefault();
      Auth.logout();
      window.location.href = 'index.html';
    });
  }

  // Upgrade button handler
  const upgradeBtn = document.getElementById('sidebarUpgradeBtn');
  if (upgradeBtn) {
    upgradeBtn.addEventListener('click', () => {
      window.location.hash = '#/pricing';
      closeMobileSidebar();
    });
  }
}

/**
 * Update the active navigation item.
 * @param {string} route
 */
export function updateActiveNav(route) {
  const nav = document.getElementById('sidebarNav');
  if (!nav) return;

  nav.querySelectorAll('.nav-item').forEach(el => {
    el.classList.remove('active');
    const itemRoute = el.dataset.route;
    if (itemRoute && route.startsWith(itemRoute)) {
      el.classList.add('active');
    }
  });

  // Special case: exact match first, then prefix match
  const exact = nav.querySelector(`.nav-item[data-route="${route}"]`);
  if (exact) {
    nav.querySelectorAll('.nav-item').forEach(el => el.classList.remove('active'));
    exact.classList.add('active');
  }
}

function buildNavItems(role, plan) {
  const main = [
    { icon: '📊', text: t('Dashboard'), route: '/dashboard' },
    { icon: '📋', text: t('Projects'), route: '/projects' },
    { icon: '🛒', text: t('Services'), route: '/services' },
  ];

  const create = [];
  // All users can post projects (everyone is a client too)
  create.push({ icon: '➕', text: t('New Project'), route: '/create-project' });
  if (true) { // All users are freelancers and can post services
    create.push({ icon: '🛍️', text: t('New Service'), route: '/create-service' });
  }

  const account = [
    { icon: '💬', text: t('Messages'), route: '/messages' },
    { icon: '👤', text: t('My Profile'), route: `/profile/${Auth.getCurrentUser()?.id || ''}` },
  ];

  if (plan === 'free') {
    account.push({ icon: '💎', text: t('Upgrade'), route: '/pricing' });
  }

  account.push({ icon: '⚙️', text: t('Settings'), route: '/settings' });
  account.push({ icon: '🚪', text: t('Log Out'), action: 'logout' });

  return { main, create, account };
}

function renderNavItem(item, currentRoute) {
  const isActive = currentRoute && currentRoute.startsWith(item.route);

  if (item.action) {
    return `
      <a class="nav-item" data-action="${item.action}" href="#">
        <span class="nav-item-icon">${item.icon}</span>
        <span class="nav-item-text">${item.text}</span>
      </a>
    `;
  }

  return `
    <a class="nav-item ${isActive ? 'active' : ''}" data-route="${item.route}" href="#${item.route}">
      <span class="nav-item-icon">${item.icon}</span>
      <span class="nav-item-text">${item.text}</span>
    </a>
  `;
}

function closeMobileSidebar() {
  const sidebar = document.getElementById('sidebar');
  const overlay = document.getElementById('sidebarOverlay');
  if (sidebar) sidebar.classList.remove('open');
  if (overlay) overlay.classList.remove('visible');
}
