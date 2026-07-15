// ============================================
// FreeDom — Project Detail Page
// ============================================

import { Storage } from '../storage.js';
import { Auth } from '../auth.js';
import { setPageTitle } from '../components/header.js';
import { showToast } from '../components/notifications.js';
import { timeAgo, renderStars, renderAvatar, formatCurrency, formatDate, generateId } from '../utils/helpers.js';
import { t } from '../utils/i18n.js';

const getProjectClientId = (project) => project.client_id || project.clientId;
const getProjectFreelancerId = (project) => project.assigned_to || project.freelancerId || project.freelancer_id;
const getProjectCreatedAt = (project) => project.created_at || project.createdAt || new Date().toISOString();
const getProjectBudget = (project) => (project.budget ?? 0);
const getProposalProjectId = (proposal) => proposal.project_id || proposal.projectId;
const getProposalFreelancerId = (proposal) => proposal.freelancer_id || proposal.freelancerId;
const getProposalPrice = (proposal) => proposal.price || proposal.bid_amount;
const getProposalDeliveryDays = (proposal) => proposal.deliveryDays || proposal.delivery_days;
const getProposalCreatedAt = (proposal) => proposal.created_at || proposal.createdAt || new Date().toISOString();
const getProposalCoverLetter = (proposal) => proposal.cover_letter || proposal.coverLetter || '';

/**
 * Render the project detail page.
 * @param {HTMLElement} container
 * @param {Object} params - { id }
 */
export function renderProjectDetail(container, params) {
  const project = Storage.getById('projects', params.id);
  if (!project) {
    container.innerHTML = `
      <div class="empty-state" style="padding: 3rem; text-align: center;">
        <div class="empty-state-icon" style="font-size: 3rem; margin-bottom: 1rem;">❌</div>
        <h3>${t('Project Not Found')}</h3>
        <p>${t("This project may have been removed or doesn't exist.")}</p>
        <a href="#/projects" class="btn btn-primary">${t('Browse Projects')}</a>
      </div>
    `;
    return;
  }

  setPageTitle(t('Project Details'));

  const user = Auth.getCurrentUser();
  const users = Storage.getAll('users') || [];
  const clientId = getProjectClientId(project);
  const freelancerId = getProjectFreelancerId(project);
  
  const client = users.find(u => u.id === clientId);
  const isOwner = user && user.id === clientId;
  const isFreelancer = true; // Everyone is a freelancer in the closed ecosystem
  
  const proposals = (Storage.getAll('proposals') || []).filter(p => getProposalProjectId(p) === project.id);
  const assignedFreelancer = freelancerId ? users.find(u => u.id === freelancerId) : null;

  // Check if user already submitted a proposal
  const existingProposal = proposals.find(p => getProposalFreelancerId(p) === user?.id);
  
  const displayBudget = getProjectBudget(project) * 0.85;

  container.innerHTML = `
    <div class="detail-page" style="max-width: 1200px; margin: 0 auto; padding: 1.5rem;">
      <button class="back-btn" id="backBtn" style="margin-bottom: 1.5rem; background: none; border: none; color: var(--color-primary); cursor: pointer; font-weight: 600; font-size: 0.9375rem;">${t('← Back to Projects')}</button>

      <div class="detail-header" style="margin-bottom: 2rem;">
        <h1 class="detail-title" style="font-size: 2rem; font-weight: 800; color: var(--color-text); margin-bottom: 0.75rem;">${project.title}</h1>
        <div class="detail-meta" style="display: flex; flex-wrap: wrap; gap: 0.75rem; font-size: 0.875rem; align-items: center;">
          <span class="category-badge">${t(project.category)}</span>
          <span class="detail-meta-item" style="color: var(--color-primary); font-weight: 700;">💰 ${formatCurrency(displayBudget)}</span>
          ${project.deadline ? `<span class="detail-meta-item">📅 ${formatDate(project.deadline)}</span>` : ''}
          <span class="detail-meta-item" style="text-transform:capitalize;">📊 ${t(project.status.replace('_', ' '))}</span>
          <span class="detail-meta-item">📝 ${proposals.length} ${t('proposals')}</span>
        </div>
      </div>

      <div class="detail-body" style="display: grid; grid-template-columns: 2fr 1fr; gap: 2rem;">
        <div class="detail-content" style="display: flex; flex-direction: column; gap: 1.5rem;">
          <div class="card" style="padding: 1.5rem;">
            <h2 class="form-section-title" style="font-size: 1.25rem; font-weight: 700; color: var(--color-text); margin-bottom: 1rem; border-bottom: 1px solid var(--color-border); padding-bottom: 0.5rem;">${t('Description')}</h2>
            <div class="detail-description" style="line-height: 1.6; color: var(--color-text); font-size: 0.9375rem; margin-bottom: 1.5rem;">${(project.description || '').replace(/\n/g, '<br>')}</div>

            ${(project.skills || []).length > 0 ? `
              <h3 class="form-section-title" style="font-size: 1rem; font-weight: 700; color: var(--color-text); margin-bottom: 0.75rem;">${t('Required Skills')}</h3>
              <div class="profile-skills" style="display: flex; flex-wrap: wrap; gap: 0.5rem;">
                ${project.skills.map(s => `<span class="skill-tag">${s}</span>`).join('')}
              </div>
            ` : ''}
          </div>

          ${project.status === 'in_progress' && assignedFreelancer ? `
            <div class="card" style="padding: 1.5rem;">
              <h2 class="form-section-title" style="font-size: 1.25rem; font-weight: 700; color: var(--color-text); margin-bottom: 1rem; border-bottom: 1px solid var(--color-border); padding-bottom: 0.5rem;">${t('Assigned Freelancer')}</h2>
              <div class="client-card" style="display: flex; align-items: center; gap: 1rem; padding: 0.75rem; background: var(--color-bg-alt); border-radius: var(--radius-md);">
                ${renderAvatar(assignedFreelancer, 'md')}
                <div class="client-card-info" style="overflow: hidden;">
                  <div class="client-card-name" style="font-weight: 700; color: var(--color-text);">${assignedFreelancer.name}</div>
                  <div class="client-card-meta" style="font-size: 0.75rem; color: var(--color-text-secondary); display: flex; align-items: center; gap: 0.5rem;">
                    <span>${t(assignedFreelancer.title || 'Freelancer')}</span>
                    <span>•</span>
                    <span>${renderStars(assignedFreelancer.rating || 4.5)}</span>
                  </div>
                </div>
              </div>
              ${isOwner ? `<button class="btn btn-primary" id="markCompleteBtn" style="margin-top:1rem; width:100%;">${t('Mark Complete')}</button>` : ''}
            </div>
          ` : ''}

          ${isFreelancer && !isOwner && project.status === 'open' && !existingProposal ? `
            <div class="card" style="padding: 1.5rem;" id="proposalForm">
              <h2 class="form-section-title" style="font-size: 1.25rem; font-weight: 700; color: var(--color-text); margin-bottom: 1rem; border-bottom: 1px solid var(--color-border); padding-bottom: 0.5rem;">${t('Submit Your Proposal')}</h2>
              <div class="form-group" style="margin-bottom: 1rem;">
                <label style="display:block; margin-bottom:0.5rem; font-weight:600; font-size:0.875rem;">${t('Cover Letter')}</label>
                <textarea id="proposalCover" class="textarea" placeholder="${t("Tell the client why you're the best fit for this project...")}" rows="5" style="width:100%; padding:0.5rem;"></textarea>
              </div>
              <div class="form-row" style="display:grid; grid-template-columns:1fr 1fr; gap:1rem; margin-bottom:1.5rem;">
                <div class="form-group">
                  <label style="display:block; margin-bottom:0.5rem; font-weight:600; font-size:0.875rem;">${t('Proposed Bid (UZS)')}</label>
                  <input type="number" id="proposalPrice" class="input" placeholder="e.g. 15000000" min="10000" style="width:100%; padding:0.5rem;">
                </div>
                <div class="form-group">
                  <label style="display:block; margin-bottom:0.5rem; font-weight:600; font-size:0.875rem;">${t('Delivery (days)')}</label>
                  <input type="number" id="proposalDays" class="input" placeholder="e.g., 14" min="1" style="width:100%; padding:0.5rem;">
                </div>
              </div>
              <button class="btn btn-primary" id="submitProposalBtn" style="width:100%; padding:0.75rem;">${t('Submit Proposal')}</button>
            </div>
          ` : ''}

          ${existingProposal ? `
            <div class="card" style="padding: 1.5rem;">
              <h2 class="form-section-title" style="font-size: 1.25rem; font-weight: 700; color: var(--color-text); margin-bottom: 1rem; border-bottom: 1px solid var(--color-border); padding-bottom: 0.5rem;">${t('✅ Your Proposal')}</h2>
              <p style="font-size:0.875rem;color:var(--color-text-secondary); margin-bottom:1rem;">${t('You have already submitted a proposal for this project.')}</p>
              <div class="detail-info-row" style="display:flex; justify-content:space-between; padding:0.5rem 0; border-bottom:1px solid var(--color-border-light);">
                <span class="detail-info-label" style="color:var(--color-text-secondary);">${t('Your Bid')}</span>
                <span class="detail-info-value" style="font-weight:700; color:var(--color-primary);">${formatCurrency(getProposalPrice(existingProposal))}</span>
              </div>
              <div class="detail-info-row" style="display:flex; justify-content:space-between; padding:0.5rem 0; border-bottom:1px solid var(--color-border-light);">
                <span class="detail-info-label" style="color:var(--color-text-secondary);">${t('Delivery')}</span>
                <span class="detail-info-value" style="font-weight:700; color:var(--color-text);">${getProposalDeliveryDays(existingProposal)} ${t('Delivery (days)').toLowerCase()}</span>
              </div>
            </div>
          ` : ''}

          ${project.status === 'in_progress' && freelancerId === user?.id ? `
            <div class="card" style="padding: 1.5rem; border: 1px solid var(--color-primary-light); background: linear-gradient(145deg, var(--color-surface), var(--color-bg-alt));">
              <h2 class="form-section-title" style="color: var(--color-primary); display: flex; align-items: center; justify-content: space-between; font-size: 1.25rem; font-weight: 700; margin-bottom:1rem; border-bottom:1px solid var(--color-border-light); padding-bottom:0.5rem;">
                <span>${t('🖥️ My Server (Sandbox)')}</span>
                <span class="badge badge-success">Online</span>
              </h2>
              <p style="font-size:0.875rem;color:var(--color-text-secondary); margin-bottom: 1rem;">${t('Your dedicated isolated environment for this project.')}</p>
              
              <div class="detail-info-row" style="display:flex; justify-content:space-between; background: var(--color-bg); padding: 0.5rem; border-radius: var(--radius-sm); margin-bottom: 0.5rem;">
                <span class="detail-info-label" style="font-family: var(--font-mono); font-size: 0.8125rem;">${t('IP Address')}</span>
                <span class="detail-info-value" style="font-family: var(--font-mono); font-weight: bold; font-size: 0.8125rem;">10.45.12.${20 + (project.id.charCodeAt(0) % 200)}</span>
              </div>
              <div class="detail-info-row" style="display:flex; justify-content:space-between; background: var(--color-bg); padding: 0.5rem; border-radius: var(--radius-sm); margin-bottom: 1rem;">
                <span class="detail-info-label" style="font-family: var(--font-mono); font-size: 0.8125rem;">${t('Port')}</span>
                <span class="detail-info-value" style="font-family: var(--font-mono); font-weight: bold; font-size: 0.8125rem;">220${project.id.substring(project.id.length - 2)}</span>
              </div>
              <div style="margin-top: 1rem; display: flex; gap: 0.5rem;">
                <button class="btn btn-ghost btn-sm" id="genSshKeyBtn">${t('🔑 Generate SSH Key')}</button>
              </div>
            </div>

            <div class="card" style="padding: 1.5rem;">
              <h2 class="form-section-title" style="font-size: 1.25rem; font-weight: 700; color: var(--color-text); margin-bottom: 1rem; border-bottom: 1px solid var(--color-border); padding-bottom: 0.5rem;">${t('💸 Advance Payment')}</h2>
              <p style="font-size:0.875rem;color:var(--text-secondary); margin-bottom: 1.25rem;">${t('Get an advance of 100,000 UZS upon starting work in the Sandbox.')}</p>
              <button class="btn btn-primary" id="requestAdvanceBtn" style="width: 100%; padding:0.75rem;">${t('Request Advance 100,000 UZS')}</button>
            </div>
          ` : ''}

          ${isOwner && proposals.length > 0 ? `
            <div class="card" style="padding: 1.5rem;">
              <h2 class="form-section-title" style="font-size: 1.25rem; font-weight: 700; color: var(--color-text); margin-bottom: 1rem; border-bottom: 1px solid var(--color-border); padding-bottom: 0.5rem;">${t('Proposals (')}${proposals.length})</h2>
              <div id="proposalsList" style="display: flex; flex-direction: column; gap: 1rem;">
                ${proposals.map(pr => {
                  const fl = users.find(u => u.id === getProposalFreelancerId(pr));
                  const prPrice = getProposalPrice(pr);
                  const prDays = getProposalDeliveryDays(pr);
                  const prLetter = getProposalCoverLetter(pr);
                  const prTime = getProposalCreatedAt(pr);
                  return `
                    <div class="proposal-card" style="border: 1px solid var(--color-border); padding: 1rem; border-radius: var(--radius-md); background: var(--color-surface-hover);">
                      <div class="proposal-header" style="display:flex; justify-content:space-between; align-items:center; margin-bottom:0.75rem;">
                        <div style="display:flex; align-items:center; gap:0.5rem;">
                          ${fl ? renderAvatar(fl, 'sm') : ''}
                          <div>
                            <div style="font-weight:700; color:var(--color-text);">${fl ? fl.name : 'Unknown'}</div>
                            <div style="display:flex;align-items:center;gap:0.375rem; font-size:0.75rem;">${renderStars(fl?.rating || 4.5)} <span style="color:var(--color-text-muted);">(${fl?.rating || '4.5'})</span></div>
                          </div>
                        </div>
                        <div style="font-weight:700; color:var(--color-primary);">${formatCurrency(prPrice)}</div>
                      </div>
                      <div style="font-size:0.875rem; color:var(--color-text-secondary); margin-bottom:0.75rem; line-height:1.4;">${prLetter}</div>
                      <div style="display:flex; gap:1rem; font-size:0.75rem; color:var(--color-text-muted); margin-bottom:0.75rem;">
                        <span>📅 ${prDays} ${t('Delivery (days)').toLowerCase()}</span>
                        <span>⏰ Submitted ${timeAgo(prTime)}</span>
                      </div>
                      ${project.status === 'open' ? `
                        <div style="display:flex; gap:0.5rem;">
                          <button class="btn btn-primary btn-sm accept-proposal-btn" data-proposal-id="${pr.id}" data-freelancer-id="${getProposalFreelancerId(pr)}">${t('Accept')}</button>
                          <button class="btn btn-ghost btn-sm reject-proposal-btn" data-proposal-id="${pr.id}">${t('Reject')}</button>
                        </div>
                      ` : ''}
                    </div>
                  `;
                }).join('')}
              </div>
            </div>
          ` : ''}
        </div>

        <div class="detail-sidebar" style="display: flex; flex-direction: column; gap: 1.5rem;">
          ${client ? `
            <div class="card" style="padding: 1.25rem;">
              <h3 style="font-size: 1.1rem; font-weight: 700; margin-bottom: 1rem; color: var(--color-text);">${t('About the Client')}</h3>
              <div style="display:flex;align-items:center;gap:0.75rem;margin-bottom:1rem;cursor:pointer;" onclick="window.location.hash='#/profile/${client.id}'">
                ${renderAvatar(client, 'md')}
                <div style="overflow: hidden;">
                  <div style="font-weight:700;color:var(--color-text); text-overflow:ellipsis; overflow:hidden; white-space:nowrap;">${client.name}</div>
                  <div style="font-size:0.75rem;color:var(--color-text-muted); text-overflow:ellipsis; overflow:hidden; white-space:nowrap;">${client.location || 'Location N/A'}</div>
                </div>
              </div>
              <div class="detail-info-row" style="display:flex; justify-content:space-between; font-size:0.8125rem; padding:0.375rem 0; border-bottom:1px solid var(--color-border-light);">
                <span style="color:var(--color-text-secondary);">${t('Rating')}</span>
                <span style="font-weight:600; color:var(--color-text);">${renderStars(client.rating || 4.5)} ${client.rating || '4.5'}</span>
              </div>
              <div class="detail-info-row" style="display:flex; justify-content:space-between; font-size:0.8125rem; padding:0.375rem 0;">
                <span style="color:var(--color-text-secondary);">${t('Member Since')}</span>
                <span style="font-weight:600; color:var(--color-text);">${formatDate(client.created_at || client.createdAt || new Date())}</span>
              </div>
            </div>
          ` : ''}

          <div class="card" style="padding: 1.25rem;">
            <h3 style="font-size: 1.1rem; font-weight: 700; margin-bottom: 1rem; color: var(--color-text);">${t('Project Details')}</h3>
            <div class="detail-info-row" style="display:flex; justify-content:space-between; font-size:0.8125rem; padding:0.375rem 0; border-bottom:1px solid var(--color-border-light);">
              <span style="color:var(--color-text-secondary);">${t('Budget')}</span>
              <span style="font-weight:600; color:var(--color-primary);">${formatCurrency(displayBudget)}</span>
            </div>
            <div class="detail-info-row" style="display:flex; justify-content:space-between; font-size:0.8125rem; padding:0.375rem 0; border-bottom:1px solid var(--color-border-light);">
              <span style="color:var(--color-text-secondary);">${t('Category')}</span>
              <span style="font-weight:600; color:var(--color-text);">${t(project.category)}</span>
            </div>
            ${project.deadline ? `
              <div class="detail-info-row" style="display:flex; justify-content:space-between; font-size:0.8125rem; padding:0.375rem 0; border-bottom:1px solid var(--color-border-light);">
                <span style="color:var(--color-text-secondary);">${t('Deadline')}</span>
                <span style="font-weight:600; color:var(--color-text);">${formatDate(project.deadline)}</span>
              </div>
            ` : ''}
            <div class="detail-info-row" style="display:flex; justify-content:space-between; font-size:0.8125rem; padding:0.375rem 0; border-bottom:1px solid var(--color-border-light);">
              <span style="color:var(--color-text-secondary);">${t('Status')}</span>
              <span style="font-weight:600; color:var(--color-text); text-transform:capitalize;">${t(project.status.replace('_', ' '))}</span>
            </div>
            <div class="detail-info-row" style="display:flex; justify-content:space-between; font-size:0.8125rem; padding:0.375rem 0;">
              <span style="color:var(--color-text-secondary);">${t('Posted')}</span>
              <span style="font-weight:600; color:var(--color-text);">${timeAgo(getProjectCreatedAt(project))}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;

  // Event listeners
  container.querySelector('#backBtn')?.addEventListener('click', () => {
    window.location.hash = '#/projects';
  });

  // SSH Key Gen event listener
  container.querySelector('#genSshKeyBtn')?.addEventListener('click', () => {
    alert(t('SSH Key generated and downloaded.'));
  });

  // Advance event listener
  container.querySelector('#requestAdvanceBtn')?.addEventListener('click', () => {
    alert(t('Checking files in container...\n\n✅ Files found! Advance of 100,000 UZS has been sent to your account.'));
    const btn = container.querySelector('#requestAdvanceBtn');
    if (btn) {
      btn.disabled = true;
      btn.innerText = t('Advance received');
    }
  });

  // Submit proposal
  container.querySelector('#submitProposalBtn')?.addEventListener('click', () => {
    const cover = container.querySelector('#proposalCover')?.value?.trim();
    const price = parseFloat(container.querySelector('#proposalPrice')?.value);
    const days = parseInt(container.querySelector('#proposalDays')?.value);

    if (!cover) { showToast(t('Please write a cover letter'), 'warning'); return; }
    if (!price || price <= 0) { showToast(t('Please enter a valid price'), 'warning'); return; }
    if (!days || days <= 0) { showToast(t('Please enter delivery days'), 'warning'); return; }

    Storage.create('proposals', {
      id: generateId(),
      project_id: project.id,
      freelancer_id: user.id,
      cover_letter: cover,
      bid_amount: price,
      delivery_days: days,
      status: 'pending',
      created_at: new Date().toISOString()
    });

    showToast(t('Proposal submitted successfully!'), 'success');
    renderProjectDetail(container, params); // Re-render
  });

  // Accept proposal
  container.querySelectorAll('.accept-proposal-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const proposalId = btn.dataset.proposalId;
      const fId = btn.dataset.freelancerId;

      Storage.update('proposals', proposalId, { status: 'accepted' });
      Storage.update('projects', project.id, { status: 'in_progress', assigned_to: fId, freelancerId: fId });

      // Reject other proposals
      proposals.forEach(pr => {
        if (pr.id !== proposalId) {
          Storage.update('proposals', pr.id, { status: 'rejected' });
        }
      });

      showToast(t('Proposal accepted! Project is now in progress.'), 'success');
      renderProjectDetail(container, params);
    });
  });

  // Reject proposal
  container.querySelectorAll('.reject-proposal-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      Storage.update('proposals', btn.dataset.proposalId, { status: 'rejected' });
      showToast(t('Proposal rejected'), 'info');
      renderProjectDetail(container, params);
    });
  });

  // Mark complete
  container.querySelector('#markCompleteBtn')?.addEventListener('click', () => {
    Storage.update('projects', project.id, { status: 'completed', completedAt: new Date().toISOString() });
    showToast(t('Project marked as completed! 🎉'), 'success');
    renderProjectDetail(container, params);
  });
}
