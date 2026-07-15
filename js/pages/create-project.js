import { Storage } from '../storage.js';
import { Auth } from '../auth.js';
import { showToast } from '../components/notifications.js';
import { setPageTitle } from '../components/header.js';
import { CATEGORIES } from '../utils/helpers.js';
import { t } from '../utils/i18n.js';

export function renderCreateProject(container, params) {
  setPageTitle(t('Post a New Project'));
  container.innerHTML = `
    <div class="page-header" style="max-width: 800px; margin: 0 auto; margin-bottom: var(--space-xl);">
      <h1 class="text-2xl font-bold">${t('Post a New Project')}</h1>
      <p class="text-secondary">${t('Describe what you need and get proposals from top talent.')}</p>
    </div>
    
    <div class="card" style="max-width: 800px; margin: 0 auto; padding: 2rem; border-radius: var(--radius-md); background: var(--color-surface); border: 1px solid var(--color-border);">
      <form id="createProjectForm">
        <div style="margin-bottom: var(--space-md);">
          <label class="text-sm font-bold" style="display: block; margin-bottom: var(--space-xs); color: var(--color-text);">${t('Project Title')}</label>
          <input type="text" id="pTitle" class="input" style="width: 100%; padding: 0.5rem;" required placeholder="${t('e.g. Build an e-commerce website')}">
        </div>
        
        <div style="margin-bottom: var(--space-md);">
          <label class="text-sm font-bold" style="display: block; margin-bottom: var(--space-xs); color: var(--color-text);">${t('Category')}</label>
          <select id="pCategory" class="select" style="width: 100%; padding: 0.5rem;" required>
            ${CATEGORIES.map(c => `<option value="${c}">${t(c)}</option>`).join('')}
          </select>
        </div>
        
        <div style="margin-bottom: var(--space-md);">
          <label class="text-sm font-bold" style="display: block; margin-bottom: var(--space-xs); color: var(--color-text);">${t('Description')}</label>
          <textarea id="pDesc" class="textarea" style="width: 100%; min-height: 150px; padding: 0.5rem;" required placeholder="${t('Describe what is included in this service...')}"></textarea>
        </div>
        
        <div style="margin-bottom: var(--space-md);">
          <label class="text-sm font-bold" style="display: block; margin-bottom: var(--space-xs); color: var(--color-text);">${t('Project Budget (UZS)')}</label>
          <input type="number" id="pBudget" class="input" style="width: 100%; padding: 0.5rem;" placeholder="e.g. 50000000" required min="100000">
          <small style="color: var(--color-text-secondary); display: block; margin-top: 0.25rem;">${t('Note: Freelancers will see this minus our 15% platform commission.')}</small>
        </div>
        
        <div style="margin-bottom: var(--space-xl);">
          <label class="text-sm font-bold" style="display: block; margin-bottom: var(--space-xs); color: var(--color-text);">${t('Skills Required (comma separated)')}</label>
          <input type="text" id="pSkills" class="input" style="width: 100%; padding: 0.5rem;" placeholder="${t('React, Node.js, Design')}">
        </div>
        
        <button type="submit" class="btn btn-primary" style="width: 100%; padding: 0.75rem;">${t('Post Project')}</button>
      </form>
    </div>
  `;

  container.querySelector('#createProjectForm').addEventListener('submit', (e) => {
    e.preventDefault();
    const currentUser = Auth.getCurrentUser();
    
    const title = document.getElementById('pTitle').value.trim();
    const category = document.getElementById('pCategory').value;
    const description = document.getElementById('pDesc').value.trim();
    const budget = Number(document.getElementById('pBudget').value);
    const skills = document.getElementById('pSkills').value
      .split(',')
      .map(s => s.trim())
      .filter(Boolean);

    if (!title || !category || !description || isNaN(budget) || budget <= 0) {
      showToast(t('Please fill out all required fields correctly.'), 'error');
      return;
    }
    
    Storage.create('projects', {
      client_id: currentUser.id,
      title,
      category,
      description,
      budget,
      skills,
      status: 'open',
      created_at: new Date().toISOString()
    });
    
    showToast(t('Project posted successfully!'), 'success');
    window.location.hash = '#/projects';
  });
}
