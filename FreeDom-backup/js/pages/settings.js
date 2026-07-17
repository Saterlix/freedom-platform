// ============================================
// FreeDom — Settings Page (Full i18n + Skills + Telegram)
// ============================================

import { Auth } from '../auth.js';
import { Storage } from '../storage.js';
import { showToast } from '../components/notifications.js';
import { setPageTitle } from '../components/header.js';
import { CATEGORIES } from '../utils/helpers.js';
import { t } from '../utils/i18n.js';

const ALL_SKILLS = [
  'JavaScript', 'TypeScript', 'React', 'Vue.js', 'Angular', 'Node.js', 'Python',
  'Django', 'FastAPI', 'PHP', 'Laravel', 'Java', 'C#', '.NET', 'Go', 'Rust',
  'Swift', 'Kotlin', 'Flutter', 'React Native',
  'HTML', 'CSS', 'Sass', 'Tailwind CSS',
  'PostgreSQL', 'MySQL', 'MongoDB', 'Redis', 'Firebase',
  'Docker', 'Kubernetes', 'AWS', 'GCP', 'Azure', 'CI/CD', 'Linux',
  'Figma', 'Adobe XD', 'Photoshop', 'Illustrator', 'After Effects',
  'UI Design', 'UX Design', 'Branding', 'Motion Graphics', 'Prototyping',
  'SEO', 'Google Ads', 'Facebook Ads', 'Content Marketing', 'Social Media',
  'Copywriting', 'Technical Writing', 'Blog Writing', 'Translation',
  'Video Editing', 'Animation', '3D Modeling', 'Machine Learning', 'Data Science',
  'Blockchain', 'Solidity', 'Smart Contracts'
];

export function renderSettings(container, params) {
  setPageTitle(t('Settings'));
  const user = Auth.getCurrentUser();
  const userSkills = user.skills || [];
  const userTelegram = user.telegram || '';

  container.innerHTML = `
    <div class="page-header" style="margin-bottom: var(--space-xl);">
      <h1 class="text-2xl font-bold">${t('Settings')}</h1>
    </div>

    <div style="max-width: 800px; display: flex; flex-direction: column; gap: 1.5rem;">

      <!-- Profile Info -->
      <div class="card">
        <form id="settingsForm">
          <h3 class="text-xl font-bold" style="margin-bottom: var(--space-md);">${t('Profile Information')}</h3>

          <div class="grid" style="grid-template-columns: 1fr 1fr; gap: var(--space-md); margin-bottom: var(--space-md);">
            <div>
              <label class="text-sm font-bold" style="display: block; margin-bottom: var(--space-xs);">${t('Full Name')}</label>
              <input type="text" id="sName" class="input" style="width: 100%;" value="${user.name}" required>
            </div>
            <div>
              <label class="text-sm font-bold" style="display: block; margin-bottom: var(--space-xs);">${t('Username')}</label>
              <div style="position: relative;">
                <span style="position: absolute; left: 0.75rem; top: 50%; transform: translateY(-50%); color: var(--color-text-secondary); font-weight: 600;">@</span>
                <input type="text" id="sUsername" class="input" style="width: 100%; padding-left: 1.75rem;" value="${user.username || ''}" required pattern="^[a-zA-Z0-9_]+$" title="${t('Only letters, numbers, and underscores allowed')}">
              </div>
            </div>
          </div>

          <div class="grid" style="grid-template-columns: 1fr 1fr; gap: var(--space-md); margin-bottom: var(--space-md);">
            <div>
              <label class="text-sm font-bold" style="display: block; margin-bottom: var(--space-xs);">${t('Professional Title')}</label>
              <input type="text" id="sTitle" class="input" style="width: 100%;" value="${user.title || ''}" placeholder="${t('e.g. Senior Frontend Developer')}">
            </div>
            <div>
              <label class="text-sm font-bold" style="display: block; margin-bottom: var(--space-xs);">${t('Location')}</label>
              <input type="text" id="sLoc" class="input" style="width: 100%;" value="${user.location || ''}">
            </div>
          </div>

          <div style="margin-bottom: var(--space-md);">
            <label class="text-sm font-bold" style="display: block; margin-bottom: var(--space-xs);">${t('Bio')}</label>
            <textarea id="sBio" class="textarea" style="width: 100%; min-height: 100px;">${user.bio || ''}</textarea>
          </div>

          <div style="margin-bottom: var(--space-md); max-width: 50%;">
            <label class="text-sm font-bold" style="display: block; margin-bottom: var(--space-xs);">${t('Hourly Rate (UZS)')}</label>
            <input type="number" id="sRate" class="input" style="width: 100%;" value="${user.hourly_rate || 0}" min="0">
          </div>

          <button type="submit" class="btn btn-primary">${t('Save Changes')}</button>
        </form>
      </div>

      <!-- Skills -->
      <div class="card">
        <h3 class="text-xl font-bold" style="margin-bottom: var(--space-xs);">${t('Your Skills')}</h3>
        <p class="text-sm text-secondary" style="margin-bottom: var(--space-md);">${t('Select the skills you have:')}</p>

        <div id="skillsGrid" style="display: flex; flex-wrap: wrap; gap: 0.5rem; margin-bottom: var(--space-lg);">
          ${ALL_SKILLS.map(skill => {
            const isSelected = userSkills.includes(skill);
            return `
              <button type="button" class="skill-toggle-btn ${isSelected ? 'active' : ''}" data-skill="${skill}"
                style="padding: 0.375rem 0.75rem; border-radius: var(--radius-full); border: 1px solid ${isSelected ? 'var(--color-primary)' : 'var(--color-border)'}; background: ${isSelected ? 'var(--color-primary)' : 'transparent'}; color: ${isSelected ? '#fff' : 'var(--color-text)'}; cursor: pointer; font-size: 0.8125rem; font-weight: 500; transition: all 0.2s ease;">
                ${skill}
              </button>
            `;
          }).join('')}
        </div>

        <button type="button" class="btn btn-primary" id="saveSkillsBtn">${t('Save Changes')}</button>
      </div>

      <!-- Telegram Notifications -->
      <div class="card">
        <h3 class="text-xl font-bold" style="margin-bottom: var(--space-xs);">${t('Notifications')}</h3>
        <p class="text-sm text-secondary" style="margin-bottom: var(--space-md);">${t('Connect Telegram to receive instant notifications about new projects and proposals.')}</p>

        <div style="margin-bottom: var(--space-md);">
          <label class="text-sm font-bold" style="display: block; margin-bottom: var(--space-xs);">${t('Telegram Username')}</label>
          <input type="text" id="sTelegram" class="input" style="width: 100%; max-width: 400px;" value="${userTelegram}" placeholder="${t('@username')}">
        </div>

        <button type="button" class="btn btn-primary" id="saveTelegramBtn">${t('Save Changes')}</button>
      </div>

      <!-- Danger Zone -->
      <div class="card" style="border: 1px solid var(--color-error); background: var(--color-error-light);">
        <h3 class="text-xl font-bold" style="margin-bottom: var(--space-xs); color: var(--color-error);">${t('Danger Zone')}</h3>
        <p class="text-sm text-secondary" style="margin-bottom: var(--space-md);">${t('Once you delete your account, there is no going back.')}</p>
        <button type="button" class="btn btn-danger" id="deleteAccountBtn">${t('Delete Account')}</button>
      </div>
    </div>
  `;

  // ── Profile form submit ──
  container.querySelector('#settingsForm').addEventListener('submit', (e) => {
    e.preventDefault();
    const newUsername = document.getElementById('sUsername').value.trim().replace(/^@/, '').toLowerCase();

    // Validate uniqueness
    if (newUsername !== user.username) {
      const existing = Storage.find('users', u => u.username === newUsername && u.id !== user.id);
      if (existing.length > 0) {
        showToast(t('Username already taken'), 'error');
        return;
      }
    }

    Auth.updateProfile({
      name: document.getElementById('sName').value.trim(),
      username: newUsername,
      title: document.getElementById('sTitle').value.trim(),
      bio: document.getElementById('sBio').value.trim(),
      location: document.getElementById('sLoc').value.trim(),
      hourly_rate: Number(document.getElementById('sRate').value)
    });
    showToast(t('Settings saved successfully'), 'success');
  });

  // ── Skills toggle ──
  const skillsGrid = container.querySelector('#skillsGrid');
  skillsGrid.addEventListener('click', (e) => {
    const btn = e.target.closest('.skill-toggle-btn');
    if (!btn) return;

    btn.classList.toggle('active');
    const isActive = btn.classList.contains('active');
    btn.style.background = isActive ? 'var(--color-primary)' : 'transparent';
    btn.style.color = isActive ? '#fff' : 'var(--color-text)';
    btn.style.borderColor = isActive ? 'var(--color-primary)' : 'var(--color-border)';
  });

  container.querySelector('#saveSkillsBtn').addEventListener('click', () => {
    const selected = [];
    skillsGrid.querySelectorAll('.skill-toggle-btn.active').forEach(btn => {
      selected.push(btn.dataset.skill);
    });
    Auth.updateProfile({ skills: selected });
    showToast(t('Settings saved successfully'), 'success');
  });

  // ── Telegram save ──
  container.querySelector('#saveTelegramBtn').addEventListener('click', () => {
    const telegram = document.getElementById('sTelegram').value.trim();
    Auth.updateProfile({ telegram });
    showToast(t('Settings saved successfully'), 'success');
  });

  // ── Delete account ──
  container.querySelector('#deleteAccountBtn').addEventListener('click', () => {
    if (confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
      Auth.logout();
      window.location.href = 'index.html';
    }
  });
}
