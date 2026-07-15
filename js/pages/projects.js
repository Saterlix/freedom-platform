// ============================================
// FreeDom — Projects Page
// ============================================

import { Storage } from '../storage.js';
import { Auth } from '../auth.js';
import { setPageTitle } from '../components/header.js';
import { timeAgo, renderStars, renderAvatar, formatCurrency, truncate, CATEGORIES, debounce } from '../utils/helpers.js';
import { t } from '../utils/i18n.js';

const getProjectClientId = (project) => project.client_id || project.clientId;
const getProjectFreelancerId = (project) => project.assigned_to || project.freelancerId || project.freelancer_id;
const getProjectCreatedAt = (project) => project.created_at || project.createdAt || new Date().toISOString();
const getProjectBudget = (project) => (project.budget ?? 0);
const getProposalProjectId = (proposal) => proposal.project_id || proposal.projectId;

/**
 * Render the Projects listing page.
 * @param {HTMLElement} container
 * @param {Object} params
 */
export function renderProjects(container, params) {
  setPageTitle(t('Projects'));
  const user = Auth.getCurrentUser();
  const isClient = true; // Everyone can be a client and post projects

  container.innerHTML = `
    <div class="page-header">
      <div class="page-header-left">
        <h1>${t('Browse Projects')}</h1>
        <p>${t('Find the perfect project for your skills')}</p>
      </div>
      ${isClient ? `<a href="#/create-project" class="btn btn-primary">${t('+ Post Project')}</a>` : ''}
    </div>

    <div class="filter-bar" style="display: flex; flex-wrap: wrap; gap: 0.75rem; align-items: center; margin-bottom: 1.5rem; background: var(--color-surface); padding: 1rem; border-radius: var(--radius-md); border: 1px solid var(--color-border);">
      <div style="display: flex; align-items: center; gap: 0.5rem;">
        <span class="filter-label">${t('Category:')}</span>
        <select id="filterCategory" class="select" style="min-width: 150px; padding: 0.375rem 0.75rem;">
          <option value="">${t('All Categories')}</option>
          ${CATEGORIES.map(c => `<option value="${c}">${t(c)}</option>`).join('')}
        </select>
      </div>
      
      <div style="display: flex; align-items: center; gap: 0.5rem;">
        <span class="filter-label">${t('Budget (UZS):')}</span>
        <input type="number" id="filterBudgetMin" class="input" placeholder="${t('Min UZS')}" style="max-width: 120px; padding: 0.375rem 0.75rem;" min="0">
        <span>-</span>
        <input type="number" id="filterBudgetMax" class="input" placeholder="${t('Max UZS')}" style="max-width: 120px; padding: 0.375rem 0.75rem;" min="0">
      </div>

      <div style="flex: 1; min-width: 200px;">
        <input type="text" id="filterSearch" class="input" placeholder="${t('Search projects...')}" style="width: 100%; padding: 0.375rem 0.75rem;">
      </div>

      <div style="display: flex; align-items: center; gap: 0.5rem;">
        <span class="filter-label">${t('Sort:')}</span>
        <select id="filterSort" class="select" style="min-width: 150px; padding: 0.375rem 0.75rem;">
          <option value="newest">${t('Newest First')}</option>
          <option value="budget-high">${t('Budget: High to Low')}</option>
          <option value="budget-low">${t('Budget: Low to High')}</option>
          <option value="proposals">${t('Most Proposals')}</option>
        </select>
      </div>
    </div>

    <div class="projects-grid" id="projectsGrid" style="display: grid; grid-template-columns: repeat(auto-fill, minmax(320px, 1fr)); gap: 1.25rem;">
      <!-- Rendered by JS -->
    </div>
  `;

  // Initial render
  renderProjectsList(container);

  // Filter handlers
  const filterInputs = ['filterCategory', 'filterBudgetMin', 'filterBudgetMax', 'filterSort'];
  filterInputs.forEach(id => {
    const el = container.querySelector(`#${id}`);
    if (el) el.addEventListener('change', () => renderProjectsList(container));
  });

  const searchInput = container.querySelector('#filterSearch');
  if (searchInput) {
    searchInput.addEventListener('input', debounce(() => renderProjectsList(container), 250));
  }
}

function renderProjectsList(container) {
  const grid = container.querySelector('#projectsGrid');
  if (!grid) return;

  const category = container.querySelector('#filterCategory')?.value || '';
  const budgetMin = parseFloat(container.querySelector('#filterBudgetMin')?.value) || 0;
  const budgetMax = parseFloat(container.querySelector('#filterBudgetMax')?.value) || Infinity;
  const search = container.querySelector('#filterSearch')?.value?.toLowerCase() || '';
  const sort = container.querySelector('#filterSort')?.value || 'newest';

  let projects = Storage.getAll('projects') || [];
  const proposals = Storage.getAll('proposals') || [];
  const users = Storage.getAll('users') || [];

  // Filters
  if (category) projects = projects.filter(p => p.category === category);
  if (budgetMin > 0) projects = projects.filter(p => (getProjectBudget(p) * 0.85) >= budgetMin);
  if (budgetMax < Infinity) projects = projects.filter(p => (getProjectBudget(p) * 0.85) <= budgetMax);
  if (search) {
    projects = projects.filter(p =>
      p.title.toLowerCase().includes(search) ||
      (p.description || '').toLowerCase().includes(search) ||
      (p.skills || []).some(s => s.toLowerCase().includes(search))
    );
  }

  // Count proposals for each project
  const proposalCounts = {};
  proposals.forEach(pr => {
    const pId = getProposalProjectId(pr);
    proposalCounts[pId] = (proposalCounts[pId] || 0) + 1;
  });

  // Sort
  switch (sort) {
    case 'budget-high':
      projects.sort((a, b) => (getProjectBudget(b) * 0.85) - (getProjectBudget(a) * 0.85));
      break;
    case 'budget-low':
      projects.sort((a, b) => (getProjectBudget(a) * 0.85) - (getProjectBudget(b) * 0.85));
      break;
    case 'proposals':
      projects.sort((a, b) => (proposalCounts[b.id] || 0) - (proposalCounts[a.id] || 0));
      break;
    case 'newest':
    default:
      projects.sort((a, b) => new Date(getProjectCreatedAt(b)) - new Date(getProjectCreatedAt(a)));
  }

  if (projects.length === 0) {
    grid.innerHTML = `
      <div class="empty-state" style="grid-column: 1 / -1; padding: 3rem; text-align: center;">
        <div class="empty-state-icon" style="font-size: 3rem; margin-bottom: 1rem;">📋</div>
        <h3>${t('No projects found')}</h3>
        <p>${t('Try adjusting your filters or check back later')}</p>
      </div>
    `;
    return;
  }

  grid.innerHTML = projects.map(project => {
    const client = users.find(u => u.id === getProjectClientId(project));
    const count = proposalCounts[project.id] || 0;
    const statusBadge = project.status === 'in_progress' ? `<span class="badge badge-success">${t('In Progress')}</span>` :
                         project.status === 'completed' ? `<span class="badge badge-primary" style="opacity:0.7;">${t('Completed')}</span>` : '';

    const displayBudget = getProjectBudget(project) * 0.85;

    return `
      <div class="project-card" data-id="${project.id}" style="cursor: pointer; display: flex; flex-direction: column; justify-content: space-between; height: 100%;">
        <div>
          <div class="project-card-header" style="display: flex; justify-content: space-between; align-items: flex-start; gap: 0.5rem; margin-bottom: 0.5rem;">
            <div class="project-card-title" style="font-weight: 700; font-size: 1.1rem; color: var(--color-text);">${project.title}</div>
            <div class="project-card-budget" style="font-weight: 700; color: var(--color-primary); white-space: nowrap;">${formatCurrency(displayBudget)}</div>
          </div>
          <div class="project-card-description" style="font-size: 0.875rem; color: var(--color-text-secondary); margin-bottom: 1rem; line-height: 1.4;">${truncate(project.description, 120)}</div>
        </div>
        <div>
          <div class="project-card-meta" style="display: flex; flex-wrap: wrap; gap: 0.375rem; margin-bottom: 1rem; align-items: center;">
            <span class="category-badge">${t(project.category)}</span>
            ${statusBadge}
            ${(project.skills || []).slice(0, 3).map(s => `<span class="skill-tag">${s}</span>`).join('')}
          </div>
          ${project.deadline ? `<div style="font-size:0.75rem;color:var(--color-text-muted);margin-bottom:0.75rem;">${t('📅 Deadline: ')}${new Date(project.deadline).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</div>` : ''}
          <div class="project-card-footer" style="display: flex; justify-content: space-between; align-items: center; border-top: 1px solid var(--color-border); padding-top: 0.75rem; font-size: 0.75rem;">
            <div class="project-card-client" style="display: flex; align-items: center; gap: 0.375rem;">
              ${client ? renderAvatar(client, 'xs') : ''}
              <span class="project-card-client-name" style="color: var(--color-text-secondary);">${client ? client.name : 'Unknown'}</span>
            </div>
            <div class="project-card-stats" style="color: var(--color-text-muted); display: flex; flex-direction: column; align-items: flex-end; gap: 0.25rem;">
              <span>📝 ${count} ${t('proposals')}</span>
              <span class="project-card-time">${timeAgo(getProjectCreatedAt(project))}</span>
            </div>
          </div>
        </div>
      </div>
    `;
  }).join('');

  // Card click handlers
  grid.querySelectorAll('.project-card[data-id]').forEach(card => {
    card.addEventListener('click', () => {
      window.location.hash = `#/project/${card.dataset.id}`;
    });
  });
}
