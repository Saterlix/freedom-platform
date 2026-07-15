// ============================================
// FreeDom — Dashboard Page (Full i18n + Dynamic Activity)
// ============================================

import { Storage } from '../storage.js';
import { Auth } from '../auth.js';
import { setPageTitle } from '../components/header.js';
import { timeAgo, renderStars, renderAvatar, formatCurrency, truncate } from '../utils/helpers.js';
import { t } from '../utils/i18n.js';
import { showToast } from '../components/notifications.js';

const getProjectClientId = (project) => project.client_id || project.clientId;
const getProjectFreelancerId = (project) => project.assigned_to || project.freelancerId || project.freelancer_id;
const getProjectCreatedAt = (project) => project.created_at || project.createdAt || new Date().toISOString();
const getProjectBudget = (project) => (project.budget ?? 0) * 0.85;
const getProposalProjectId = (proposal) => proposal.project_id || proposal.projectId;
const getProposalFreelancerId = (proposal) => proposal.freelancer_id || proposal.freelancerId;
const getReviewTargetId = (review) => review.target_user_id || review.targetUserId;

/**
 * Render the dashboard page.
 * @param {HTMLElement} container
 * @param {Object} params
 */
export function renderDashboard(container, params) {
  setPageTitle(t('Dashboard'));
  const user = Auth.getCurrentUser();
  if (!user) return;

  const isFreelancer = true; // Everyone is a freelancer
  const isClient = true; // Everyone is also a client

  // Gather stats
  const allProjects = Storage.getAll('projects') || [];
  const myProjects = allProjects.filter(p => getProjectClientId(p) === user.id);
  const assignedProjects = allProjects.filter(p => getProjectFreelancerId(p) === user.id);
  
  const completedProjects = isClient
    ? myProjects.filter(p => p.status === 'completed')
    : assignedProjects.filter(p => p.status === 'completed');
  
  const activeProjects = isClient
    ? myProjects.filter(p => p.status === 'open' || p.status === 'in_progress')
    : assignedProjects.filter(p => p.status === 'in_progress');

  const allReviews = Storage.getAll('reviews') || [];
  const myReviews = allReviews.filter(r => getReviewTargetId(r) === user.id);
  const avgRating = myReviews.length > 0
    ? (myReviews.reduce((sum, r) => sum + r.rating, 0) / myReviews.length).toFixed(1)
    : '5.0';

  // Money earned as freelancer + spent as client
  const totalEarned = assignedProjects.filter(p => p.status === 'completed').reduce((sum, p) => sum + getProjectBudget(p), 0);
  const totalSpent = myProjects.filter(p => p.status === 'completed').reduce((sum, p) => sum + getProjectBudget(p), 0);
  const totalMoney = totalEarned + totalSpent;

  const statsHTML = `
    <div class="stats-grid">
      <div class="stat-widget" style="background: linear-gradient(135deg, rgba(108,92,231,0.12), rgba(162,155,254,0.06)); border-color: rgba(108,92,231,0.2);">
        <div class="stat-widget-header">
          <div class="stat-widget-icon" style="background: linear-gradient(135deg, #6C5CE7, #A29BFE); color: #fff; border-radius: var(--radius-md);">💰</div>
          ${totalEarned > 0 ? '<span class="stat-trend up">✓</span>' : ''}
        </div>
        <div class="stat-widget-value">${formatCurrency(totalEarned)}</div>
        <div class="stat-widget-label">${t('Total Earnings')}</div>
      </div>
      <div class="stat-widget" style="display: flex; flex-direction: column; justify-content: space-between; min-height: 140px; background: linear-gradient(135deg, rgba(0,184,148,0.12), rgba(85,239,196,0.06)); border-color: rgba(0,184,148,0.2);">
        <div style="flex: 1;">
          <div class="stat-widget-header">
            <div class="stat-widget-icon" style="background: linear-gradient(135deg, #00B894, #55EFC4); color: #fff; border-radius: var(--radius-md);">💳</div>
          </div>
          <div class="stat-widget-value" id="userBalanceValue">${formatCurrency(user.balance || 0)}</div>
          <div class="stat-widget-label">${t('Available Balance')}</div>
        </div>
        <button class="btn btn-primary btn-sm" id="withdrawBtn" style="margin-top: 0.75rem; width: 100%; font-size: 0.8125rem; padding: 0.375rem; border-radius: var(--radius-md);">
          💸 ${t('Withdraw')}
        </button>
      </div>
      <div class="stat-widget" style="background: linear-gradient(135deg, rgba(253,203,110,0.12), rgba(255,234,167,0.05)); border-color: rgba(253,203,110,0.25);">
        <div class="stat-widget-header">
          <div class="stat-widget-icon" style="background: linear-gradient(135deg, #FDCB6E, #f9ca24); color: #fff; border-radius: var(--radius-md);">📋</div>
        </div>
        <div class="stat-widget-value">${activeProjects.length}</div>
        <div class="stat-widget-label">${t('Active Projects')}</div>
      </div>
      <div class="stat-widget" style="background: linear-gradient(135deg, rgba(0,184,148,0.10), rgba(85,239,196,0.04)); border-color: rgba(0,184,148,0.2);">
        <div class="stat-widget-header">
          <div class="stat-widget-icon" style="background: linear-gradient(135deg, #00B894, #55EFC4); color: #fff; border-radius: var(--radius-md);">✅</div>
        </div>
        <div class="stat-widget-value">${completedProjects.length}</div>
        <div class="stat-widget-label">${t('Completed Projects')}</div>
      </div>
      <div class="stat-widget" style="background: linear-gradient(135deg, rgba(253,203,110,0.12), rgba(255,234,167,0.05)); border-color: rgba(253,203,110,0.25);">
        <div class="stat-widget-header">
          <div class="stat-widget-icon" style="background: linear-gradient(135deg, #FDCB6E, #f9ca24); color: #fff; border-radius: var(--radius-md);">⭐</div>
        </div>
        <div class="stat-widget-value">${avgRating}</div>
        <div class="stat-widget-label">${t('Average Rating')}</div>
      </div>
    </div>
  `;

  let sectionsHTML = '';

  // Quick Actions
  sectionsHTML += `
    <div class="section-header" style="margin-top: 2rem;">
      <h2>⚡ ${t('Quick Actions')}</h2>
    </div>
    <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(150px, 1fr)); gap: 0.75rem; margin-bottom: 2rem;">
      <a href="#/projects" style="text-decoration: none;">
        <div class="stat-widget" style="padding: 1rem; cursor: pointer; text-align: center;">
          <div style="font-size: 1.75rem; margin-bottom: 0.375rem;">🔍</div>
          <div style="font-weight: 700; font-size: 0.8125rem;">${t('Find Work')}</div>
        </div>
      </a>
      <a href="#/create-project" style="text-decoration: none;">
        <div class="stat-widget" style="padding: 1rem; cursor: pointer; text-align: center; background: linear-gradient(135deg, rgba(108,92,231,0.1), rgba(162,155,254,0.04));">
          <div style="font-size: 1.75rem; margin-bottom: 0.375rem;">📢</div>
          <div style="font-weight: 700; font-size: 0.8125rem;">${t('Post Project')}</div>
        </div>
      </a>
      <a href="#/create-service" style="text-decoration: none;">
        <div class="stat-widget" style="padding: 1rem; cursor: pointer; text-align: center;">
          <div style="font-size: 1.75rem; margin-bottom: 0.375rem;">🛍️</div>
          <div style="font-weight: 700; font-size: 0.8125rem;">${t('New Service')}</div>
        </div>
      </a>
      <a href="#/messages" style="text-decoration: none;">
        <div class="stat-widget" style="padding: 1rem; cursor: pointer; text-align: center;">
          <div style="font-size: 1.75rem; margin-bottom: 0.375rem;">💬</div>
          <div style="font-weight: 700; font-size: 0.8125rem;">${t('Messages')}</div>
        </div>
      </a>
      <a href="#/services" style="text-decoration: none;">
        <div class="stat-widget" style="padding: 1rem; cursor: pointer; text-align: center;">
          <div style="font-size: 1.75rem; margin-bottom: 0.375rem;">🏪</div>
          <div style="font-weight: 700; font-size: 0.8125rem;">${t('Marketplace')}</div>
        </div>
      </a>
      <a href="#/settings" style="text-decoration: none;">
        <div class="stat-widget" style="padding: 1rem; cursor: pointer; text-align: center;">
          <div style="font-size: 1.75rem; margin-bottom: 0.375rem;">⚙️</div>
          <div style="font-weight: 700; font-size: 0.8125rem;">${t('Settings')}</div>
        </div>
      </a>
    </div>
  `;

  // My active (assigned) projects as freelancer
  const myActive = assignedProjects.filter(p => p.status === 'in_progress');
  if (myActive.length > 0) {
    sectionsHTML += `
      <div class="section-header" style="margin-top: 2rem;">
        <h2>🔧 ${t('My Active Projects')}</h2>
        <a href="#/projects" class="view-all" style="color: var(--color-primary); text-decoration: none;">${t('View All →')}</a>
      </div>
      <div class="projects-grid" style="margin-bottom: 2rem; display: grid; grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); gap: 1rem;">
        ${myActive.map(p => renderProjectCard(p)).join('')}
      </div>
    `;
  }

  // My posted projects as client (anyone can post)
  if (myProjects.length > 0) {
    const proposals = Storage.getAll('proposals') || [];
    sectionsHTML += `
      <div class="section-header" style="margin-top: 2rem;">
        <h2>📢 ${t('My Posted Projects')}</h2>
        <a href="#/projects" class="view-all" style="color: var(--color-primary); text-decoration: none;">${t('View All →')}</a>
      </div>
      <div class="projects-grid" style="margin-bottom: 2rem; display: grid; grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); gap: 1rem;">
        ${myProjects.slice(0, 4).map(p => {
          const count = proposals.filter(pr => getProposalProjectId(pr) === p.id).length;
          return renderProjectCard(p, count);
        }).join('')}
      </div>
    `;
  }

  // Open projects feed (freelancer perspective)
  const openProjects = allProjects
    .filter(p => p.status === 'open' && getProjectClientId(p) !== user.id)
    .sort((a, b) => new Date(getProjectCreatedAt(b)) - new Date(getProjectCreatedAt(a)))
    .slice(0, 6);

  // Onboarding for new users who haven't done anything
  if (myActive.length === 0 && myProjects.length === 0) {
    sectionsHTML += `
      <div class="section-header" style="margin-top: 2rem;">
        <h2>🚀 ${t('Get Started')}</h2>
      </div>
      <div class="card" style="margin-bottom: 2rem; background: linear-gradient(135deg, rgba(108,92,231,0.08), rgba(0,184,148,0.06)); border: 1px solid rgba(108,92,231,0.15); padding: 1.75rem; border-radius: var(--radius-lg);">
        <p style="margin-bottom: 1.25rem; color: var(--color-text-secondary); font-size: 0.9375rem;">${t('Follow these steps to start earning:')}</p>
        <ol style="padding-left: 1.5rem; margin-bottom: 1.75rem; line-height: 2; color: var(--color-text);">
          <li>⚙️ <strong>${t('Set up your profile & skills')}</strong> → <a href="#/settings" style="color: var(--color-primary);">${t('Settings')}</a></li>
          <li>🔍 <strong>${t('Browse and bid on projects')}</strong> → <a href="#/projects" style="color: var(--color-primary);">${t('Projects')}</a></li>
          <li>📢 <strong>${t('Or post your own project')}</strong> → <a href="#/create-project" style="color: var(--color-primary);">${t('Post Project')}</a></li>
        </ol>
        <div style="display: flex; gap: 0.75rem; flex-wrap: wrap;">
          <a href="#/projects" class="btn btn-primary" style="text-decoration: none;">🔍 ${t('Browse Projects')}</a>
          <a href="#/settings" class="btn btn-outline" style="text-decoration: none;">⚙️ ${t('Set Up Profile')}</a>
        </div>
      </div>
    `;
  }

  sectionsHTML += `
    <div class="section-header" style="margin-top: 2rem;">
      <h2>💡 ${t('Recommended Projects')}</h2>
      <a href="#/projects" class="view-all" style="color: var(--color-primary); text-decoration: none;">${t('View All →')}</a>
    </div>
    <div class="projects-grid" style="margin-bottom: 2rem; display: grid; grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); gap: 1rem;">
      ${openProjects.length > 0 ? openProjects.map(p => renderProjectCard(p)).join('') : `<div class="empty-state" style="grid-column: 1/-1;"><div class="empty-state-icon">📋</div><h3>${t('No projects yet')}</h3><p>${t('Check back later for new opportunities')}</p></div>`}
    </div>
  `;

  // Top users
  const allUsers = Storage.getAll('users') || [];
  const otherUsers = allUsers.filter(u => u.id !== user.id).slice(0, 4);
  if (otherUsers.length > 0) {
    sectionsHTML += `
      <div class="section-header" style="margin-top: 2rem;">
        <h2>👥 ${t('Top Freelancers')}</h2>
      </div>
      <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(220px, 1fr)); gap: 1rem; margin-bottom: 2rem;">
        ${otherUsers.map(f => `
          <div class="stat-widget" style="cursor: pointer; padding: 1rem;" onclick="window.location.hash='#/profile/${f.id}'">
            <div style="display: flex; align-items: center; gap: 0.75rem; margin-bottom: 0.5rem;">
              ${renderAvatar(f, 'sm')}
              <div style="overflow: hidden;">
                <div style="font-weight: 700; font-size: 0.9375rem; color: var(--color-text); text-overflow: ellipsis; overflow: hidden; white-space: nowrap;">${f.name}</div>
                <div style="font-size: 0.75rem; color: var(--color-primary);">@${f.username || ''}</div>
              </div>
            </div>
            <div style="font-size: 0.75rem; color: var(--color-text-secondary);">${t(f.title || 'Freelancer')}</div>
          </div>
        `).join('')}
      </div>
    `;
  }

  // Recent activity
  sectionsHTML += `
    <div class="section-header" style="margin-top: 2rem;">
      <h2>📊 ${t('Recent Activity')}</h2>
    </div>
    <div class="card" style="margin-bottom: 2rem; padding: 1.5rem; border-radius: var(--radius-md);">
      <div class="activity-feed">
        ${renderActivityFeed(user, allProjects)}
      </div>
    </div>
  `;

  container.innerHTML = `
    <div class="welcome-section" style="background: linear-gradient(135deg, rgba(108,92,231,0.1) 0%, rgba(0,184,148,0.07) 50%, rgba(253,203,110,0.07) 100%); border: 1px solid rgba(108,92,231,0.15); border-radius: var(--radius-xl); padding: 1.75rem 2rem; margin-bottom: 1.5rem; position: relative; overflow: hidden;">
      <div style="position: absolute; top: -40px; right: -40px; width: 180px; height: 180px; background: radial-gradient(circle, rgba(108,92,231,0.12), transparent); border-radius: 50%; pointer-events: none;"></div>
      <div style="display: flex; align-items: center; gap: 1rem; flex-wrap: wrap;">
        <div style="flex: 1;">
          <h1 style="font-size: 1.75rem; font-weight: 800; color: var(--color-text); margin-bottom: 0.25rem;">${t('Welcome back, ')}<span style="background: linear-gradient(135deg, #6C5CE7, #00B894); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;">${user.name.split(' ')[0]}</span> 👋</h1>
          <p style="color: var(--color-text-secondary); margin: 0; font-size: 0.9375rem;">@${user.username || ''} &nbsp;•&nbsp; ${t("Here's your workspace today.")}</p>
        </div>
        <a href="#/profile/${user.id}" class="btn btn-outline" style="text-decoration: none; white-space: nowrap; flex-shrink: 0;">👤 ${t('My Profile')}</a>
      </div>
    </div>
    ${statsHTML}
    ${sectionsHTML}
  `;

  // Attach click handlers for project cards
  container.querySelectorAll('.project-card[data-id]').forEach(card => {
    card.addEventListener('click', () => {
      window.location.hash = `#/project/${card.dataset.id}`;
    });
  });

  const withdrawBtn = container.querySelector('#withdrawBtn');
  if (withdrawBtn) {
    withdrawBtn.addEventListener('click', () => {
      openWithdrawalModal(user);
    });
  }
}

function renderProjectCard(project, proposalCount) {
  const users = Storage.getAll('users') || [];
  const client = users.find(u => u.id === getProjectClientId(project));
  const proposals = Storage.getAll('proposals') || [];
  const count = proposalCount !== undefined ? proposalCount : proposals.filter(p => getProposalProjectId(p) === project.id).length;
  const budget = getProjectBudget(project);

  return `
    <div class="project-card" data-id="${project.id}" style="cursor: pointer; display: flex; flex-direction: column; justify-content: space-between; height: 100%;">
      <div>
        <div class="project-card-header" style="display: flex; justify-content: space-between; align-items: flex-start; gap: 0.5rem; margin-bottom: 0.5rem;">
          <div class="project-card-title" style="font-weight: 700; font-size: 1.1rem; color: var(--color-text);">${project.title}</div>
          <div class="project-card-budget" style="font-weight: 700; color: var(--color-primary); white-space: nowrap;">${formatCurrency(budget)}</div>
        </div>
        <div class="project-card-description" style="font-size: 0.875rem; color: var(--color-text-secondary); margin-bottom: 1rem; line-height: 1.4;">${truncate(project.description, 120)}</div>
      </div>
      <div>
        <div class="project-card-meta" style="display: flex; flex-wrap: wrap; gap: 0.375rem; margin-bottom: 1rem;">
          <span class="category-badge">${t(project.category)}</span>
          ${(project.skills || []).slice(0, 3).map(s => `<span class="skill-tag">${s}</span>`).join('')}
        </div>
        <div class="project-card-footer" style="display: flex; justify-content: space-between; align-items: center; border-top: 1px solid var(--color-border); padding-top: 0.75rem; font-size: 0.75rem;">
          <div class="project-card-client" style="display: flex; align-items: center; gap: 0.375rem;">
            ${client ? renderAvatar(client, 'xs') : ''}
            <span class="project-card-client-name" style="color: var(--color-text-secondary);">${client ? client.name : t('Unknown')}</span>
          </div>
          <div class="project-card-stats" style="color: var(--color-text-muted); display: flex; flex-direction: column; align-items: flex-end; gap: 0.25rem;">
            <span>📝 ${count} ${t('proposals')}</span>
            <span class="project-card-time">${timeAgo(getProjectCreatedAt(project))}</span>
          </div>
        </div>
      </div>
    </div>
  `;
}

/**
 * Build a DYNAMIC activity feed from real stored data.
 * Pulls from proposals, projects, and messages to create a timeline.
 */
function renderActivityFeed(user, allProjects) {
  const activities = [];
  const allProposals = Storage.getAll('proposals') || [];
  const allMessages = Storage.getAll('messages') || [];
  const allUsers = Storage.getAll('users') || [];

  const findUser = (id) => allUsers.find(u => u.id === id);
  const findProject = (id) => allProjects.find(p => p.id === id);

  // 1. Login activity (always show)
  activities.push({
    icon: '📊',
    text: `<strong>${user.name}</strong> — ${t('You logged into the dashboard')}`,
    time: new Date().toISOString(),
    sort: Date.now()
  });

  // 2. My submitted proposals
  const myProposals = allProposals.filter(p => getProposalFreelancerId(p) === user.id);
  myProposals.forEach(pr => {
    const project = findProject(getProposalProjectId(pr));
    if (!project) return;
    const prTime = pr.created_at || pr.createdAt || new Date().toISOString();

    if (pr.status === 'accepted') {
      activities.push({
        icon: '🎉',
        text: `${t('Your proposal was accepted on')} <strong>${project.title}</strong>`,
        time: prTime,
        sort: new Date(prTime).getTime()
      });
    } else if (pr.status === 'rejected') {
      activities.push({
        icon: '❌',
        text: `${t('Your proposal was rejected on')} <strong>${project.title}</strong>`,
        time: prTime,
        sort: new Date(prTime).getTime()
      });
    } else {
      activities.push({
        icon: '📝',
        text: `${t('You submitted a proposal on')} <strong>${project.title}</strong>`,
        time: prTime,
        sort: new Date(prTime).getTime()
      });
    }
  });

  // 3. Proposals received (if user is client / project owner)
  const myOwnedProjects = allProjects.filter(p => getProjectClientId(p) === user.id);
  myOwnedProjects.forEach(project => {
    const projectProposals = allProposals.filter(p => getProposalProjectId(p) === project.id);
    projectProposals.forEach(pr => {
      const fl = findUser(getProposalFreelancerId(pr));
      const prTime = pr.created_at || pr.createdAt || new Date().toISOString();
      activities.push({
        icon: '📬',
        text: `${t('New proposal received on')} <strong>${project.title}</strong>${fl ? ` — ${fl.name}` : ''}`,
        time: prTime,
        sort: new Date(prTime).getTime()
      });
    });
  });

  // 4. Completed projects
  const completedProjects = allProjects.filter(
    p => p.status === 'completed' && (getProjectClientId(p) === user.id || getProjectFreelancerId(p) === user.id)
  );
  completedProjects.forEach(project => {
    const completedTime = project.completedAt || project.updated_at || getProjectCreatedAt(project);
    activities.push({
      icon: '✅',
      text: `${t('Project completed:')} <strong>${project.title}</strong>`,
      time: completedTime,
      sort: new Date(completedTime).getTime()
    });
  });

  // 5. Recent messages sent by user
  const myMessages = allMessages
    .filter(m => m.sender_id === user.id)
    .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
    .slice(0, 3);

  myMessages.forEach(msg => {
    const other = findUser(msg.receiver_id);
    activities.push({
      icon: '💬',
      text: `${t('You sent a message to')} <strong>${other ? other.name : t('Unknown')}</strong>`,
      time: msg.created_at,
      sort: new Date(msg.created_at).getTime()
    });
  });

  // 6. Withdrawals
  const allWithdrawals = Storage.getAll('withdrawals') || [];
  const myWithdrawals = allWithdrawals.filter(w => w.user_id === user.id);
  myWithdrawals.forEach(w => {
    activities.push({
      icon: '💸',
      text: `${t('Withdrawal of')} <strong>${formatCurrency(w.amount)}</strong> ${t('via card')} ****${w.card.slice(-4)}`,
      time: w.created_at,
      sort: new Date(w.created_at).getTime()
    });
  });

  // Sort by time descending, limit to 8
  activities.sort((a, b) => b.sort - a.sort);
  const limited = activities.slice(0, 8);

  if (limited.length === 0) {
    return `
      <div style="text-align: center; padding: 2rem; color: var(--color-text-secondary);">
        <div style="font-size: 2rem; margin-bottom: 0.75rem;">📋</div>
        <p>${t('No activity yet')}</p>
        <p style="font-size: 0.8125rem;">${t('Start by browsing projects or submitting proposals.')}</p>
      </div>
    `;
  }

  return limited.map(a => `
    <div class="activity-item" style="display: flex; align-items: center; gap: 0.75rem; padding: 0.5rem 0; border-bottom: 1px solid var(--color-border-light);">
      <div class="activity-icon" style="font-size: 1.25rem;">${a.icon}</div>
      <div style="flex: 1;">
        <div class="activity-text" style="font-size: 0.875rem; color: var(--color-text);">${a.text}</div>
        <div class="activity-time" style="font-size: 0.75rem; color: var(--color-text-muted);">${timeAgo(a.time)}</div>
      </div>
    </div>
  `).join('');
}

function openWithdrawalModal(user) {
  // Create modal markup
  const modalOverlay = document.createElement('div');
  modalOverlay.className = 'modal-overlay active';
  modalOverlay.id = 'withdrawalModal';
  
  modalOverlay.innerHTML = `
    <div class="modal" role="dialog" aria-labelledby="withdrawTitle" style="max-width: 440px;">
      <div class="modal-header">
        <h2 class="modal-title" id="withdrawTitle">${t('Withdraw Funds')}</h2>
        <button class="modal-close" id="closeWithdrawModalBtn" aria-label="Close modal">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
        </button>
      </div>
      <form id="withdrawalForm" style="display: flex; flex-direction: column; gap: var(--space-md);">
        <div style="font-size: 0.875rem; color: var(--color-text-secondary); background: var(--color-bg-alt); padding: 0.75rem; border-radius: var(--radius-md); border: 1px dashed var(--color-border); display: flex; justify-content: space-between;">
          <span>${t('Available Balance')}:</span>
          <strong style="color: var(--color-primary);">${formatCurrency(user.balance || 0)}</strong>
        </div>
        
        <div class="form-group">
          <label class="form-label" for="withdrawAmount" style="font-weight: 600; font-size: 0.875rem; display: block; margin-bottom: 0.25rem;">${t('Withdrawal Amount (UZS)')}</label>
          <input type="number" class="input" id="withdrawAmount" placeholder="e.g. 50000" required min="1000" style="width: 100%;">
        </div>
        
        <div class="form-group">
          <label class="form-label" for="withdrawCard" style="font-weight: 600; font-size: 0.875rem; display: block; margin-bottom: 0.25rem;">${t('Card or Wallet Number')}</label>
          <input type="text" class="input" id="withdrawCard" placeholder="8600 **** **** ****" required style="width: 100%;">
        </div>

        <div style="border-top: 1px solid var(--color-border); margin: 0.5rem 0; padding-top: 1rem;">
          <h4 style="font-weight: 700; font-size: 0.9375rem; margin-bottom: 0.25rem; display: flex; align-items: center; gap: 0.375rem; color: var(--color-text);">
            🔒 ${t('Confirm Identity')}
          </h4>
          <p style="font-size: 0.75rem; color: var(--color-text-secondary); margin-bottom: 0.75rem;">
            ${t('Enter your account password to authorize')}
          </p>
          <div class="form-group">
            <label class="form-label" for="withdrawPassword" style="font-weight: 600; font-size: 0.875rem; display: block; margin-bottom: 0.25rem;">${t('Account Password')}</label>
            <input type="password" class="input" id="withdrawPassword" placeholder="••••••••" required style="width: 100%;">
          </div>
        </div>
        
        <div class="modal-footer" style="margin-top: 0.5rem; display: flex; justify-content: flex-end; gap: 0.75rem;">
          <button type="button" class="btn btn-outline" id="cancelWithdrawBtn">${t('Cancel')}</button>
          <button type="submit" class="btn btn-primary" id="confirmWithdrawBtn">${t('Confirm & Withdraw')}</button>
        </div>
      </form>
    </div>
  `;

  document.body.appendChild(modalOverlay);

  // Close functionality
  const closeModal = () => {
    modalOverlay.classList.remove('active');
    setTimeout(() => modalOverlay.remove(), 200);
  };

  modalOverlay.querySelector('#closeWithdrawModalBtn').addEventListener('click', closeModal);
  modalOverlay.querySelector('#cancelWithdrawBtn').addEventListener('click', closeModal);
  modalOverlay.addEventListener('click', (e) => {
    if (e.target === modalOverlay) closeModal();
  });

  // Form submit
  const form = modalOverlay.querySelector('#withdrawalForm');
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const amount = Number(form.querySelector('#withdrawAmount').value);
    const card = form.querySelector('#withdrawCard').value.trim();
    const password = form.querySelector('#withdrawPassword').value;

    // Validation
    if (isNaN(amount) || amount <= 0) {
      alert(t('Please enter a valid amount'));
      return;
    }
    if (amount > (user.balance || 0)) {
      alert(t('Insufficient balance'));
      return;
    }
    if (!card) {
      alert(t('Please enter card or wallet number'));
      return;
    }

    // Verify Password
    if (Auth.hashPassword(password) !== user.password_hash) {
      alert(t('Incorrect password'));
      return;
    }

    // Process Withdrawal
    const newBalance = (user.balance || 0) - amount;
    Storage.update('users', user.id, { balance: newBalance });
    
    // Add real activity of withdrawal
    Storage.create('withdrawals', {
      user_id: user.id,
      amount: amount,
      card: card
    });

    showToast(t('Withdrawal successful'), 'success');

    closeModal();
    
    // Reload dashboard to show changes in header & stats & activity list
    setTimeout(() => {
      window.location.reload();
    }, 1000);
  });
}
