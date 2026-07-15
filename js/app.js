import { Storage } from './storage.js';
import { Auth } from './auth.js';
import { Router } from './router.js';
import { seedData, shouldSeed } from './data/seed.js';
import { renderDashboard } from './pages/dashboard.js';
import { renderProjects } from './pages/projects.js';
import { renderProjectDetail } from './pages/project-detail.js';
import { renderServices } from './pages/services.js';
import { renderServiceDetail } from './pages/service-detail.js';
import { renderCreateProject } from './pages/create-project.js';
import { renderCreateService } from './pages/create-service.js';
import { renderProfile } from './pages/profile.js';
import { renderMessages } from './pages/messages.js';
import { renderSettings } from './pages/settings.js';
import { renderPricing } from './pages/pricing.js';
import { renderSidebar, updateActiveNav } from './components/sidebar.js';
import { updateTopBar } from './components/header.js';
import { initTheme, toggleTheme } from './components/theme.js';
import { t } from './utils/i18n.js';

document.addEventListener('DOMContentLoaded', () => {
  // 1. Seed data if necessary
  if (shouldSeed()) {
    seedData();
  }

  // 2. Auth check
  if (!Auth.isLoggedIn()) {
    window.location.href = 'index.html';
    return;
  }

  const currentUser = Auth.getCurrentUser();

  // 3. Init Theme
  initTheme();

  // 4. Render Sidebar & Topbar
  const sidebarNav = document.getElementById('sidebarNav');
  const sidebarFooter = document.getElementById('sidebarFooter');
  
  if (sidebarNav && sidebarFooter) {
    renderSidebar(currentUser, window.location.hash.slice(1));
  }
  updateTopBar(currentUser);

  // Theme Toggle listener
  const themeToggle = document.getElementById('themeToggle');
  if (themeToggle) {
    themeToggle.addEventListener('click', toggleTheme);
  }

  // Language Toggle listener
  const langToggle = document.getElementById('langToggle');
  if (langToggle) {
    const currentLang = localStorage.getItem('freedom_language') || (navigator.language.startsWith('ru') ? 'ru' : 'en');
    langToggle.textContent = currentLang.toUpperCase();
    langToggle.addEventListener('click', () => {
      const nextLang = (localStorage.getItem('freedom_language') || 'en') === 'en' ? 'ru' : 'en';
      localStorage.setItem('freedom_language', nextLang);
      langToggle.textContent = nextLang.toUpperCase();
      window.location.reload();
    });
  }

  // Mobile menu toggle
  const hamburgerBtn = document.getElementById('hamburgerBtn');
  const sidebar = document.getElementById('sidebar');
  const overlay = document.getElementById('sidebarOverlay');
  if (hamburgerBtn && sidebar && overlay) {
    hamburgerBtn.addEventListener('click', () => {
      sidebar.classList.toggle('active');
      overlay.classList.toggle('active');
    });
    overlay.addEventListener('click', () => {
      sidebar.classList.remove('active');
      overlay.classList.remove('active');
    });
  }

  // 5. Setup Router
  const router = new Router();
  const pageContent = document.getElementById('pageContent');

  router
    .before((path) => {
      updateActiveNav(path);
      // Close mobile menu on navigate
      if (sidebar && overlay) {
        sidebar.classList.remove('active');
        overlay.classList.remove('active');
      }
    })
    .on('/dashboard', (params) => {
      renderDashboard(pageContent, params);
    })
    .on('/projects', (params) => {
      renderProjects(pageContent, params);
    })
    .on('/project/:id', (params) => {
      renderProjectDetail(pageContent, params);
    })
    .on('/services', (params) => {
      renderServices(pageContent, params);
    })
    .on('/service/:id', (params) => {
      renderServiceDetail(pageContent, params);
    })
    .on('/create-project', (params) => {
      renderCreateProject(pageContent, params);
    })
    .on('/create-service', (params) => {
      renderCreateService(pageContent, params);
    })
    .on('/profile/:id', (params) => {
      renderProfile(pageContent, params);
    })
    .on('/messages', (params) => {
      renderMessages(pageContent, params);
    })
    .on('/settings', (params) => {
      renderSettings(pageContent, params);
    })
    .on('/pricing', (params) => {
      renderPricing(pageContent, params);
    })
    .on('/logout', () => {
      Auth.logout();
      window.location.href = 'index.html';
    });

  // Start router
  router.init();
});
