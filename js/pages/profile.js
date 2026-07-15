// ============================================
// FreeDom — Profile Page (Full i18n + Real Data)
// ============================================

import { Storage } from '../storage.js';
import { Auth } from '../auth.js';
import { setPageTitle } from '../components/header.js';
import { renderAvatar, renderStars, formatCurrency, timeAgo } from '../utils/helpers.js';
import { t } from '../utils/i18n.js';

export function renderProfile(container, params) {
  setPageTitle(t('Profile'));
  const userId = params.id;
  const user = Storage.getById('users', userId);
  
  if (!user) {
    container.innerHTML = `<div class="empty-state" style="padding: 3rem; text-align: center;">
      <div class="empty-state-icon" style="font-size: 3rem; margin-bottom: 1rem;">❌</div>
      <h3>User not found.</h3>
    </div>`;
    return;
  }

  const currentUser = Auth.getCurrentUser();
  const isOwnProfile = currentUser?.id === userId;

  // Get user's completed projects
  const allProjects = Storage.getAll('projects') || [];
  const completedCount = allProjects.filter(p =>
    (p.assigned_to === userId || p.freelancerId === userId || p.freelancer_id === userId) && p.status === 'completed'
  ).length;

  // Get user's active services
  const allServices = Storage.getAll('services') || [];
  const userServices = allServices.filter(s => s.freelancer_id === userId);

  // Get user's reviews
  const allReviews = Storage.getAll('reviews') || [];
  const userReviews = allReviews.filter(r => (r.target_user_id || r.targetUserId) === userId);

  const displayRate = user.hourly_rate || 0;
  
  container.innerHTML = `
    <div style="height: 200px; background: linear-gradient(135deg, var(--color-primary-dark), var(--color-primary-light)); border-radius: var(--radius-lg) var(--radius-lg) 0 0; margin: calc(var(--space-md) * -1) calc(var(--space-md) * -1) 0 calc(var(--space-md) * -1);"></div>
    
    <div class="card" style="border-radius: 0 0 var(--radius-lg) var(--radius-lg); margin-top: 0; position: relative; padding-top: 60px;">
      <div style="position: absolute; top: -50px; left: var(--space-xl); border: 4px solid var(--color-surface); border-radius: 50%;">
        ${renderAvatar(user, 'xl')}
      </div>
      
      <div style="display: flex; justify-content: space-between; align-items: flex-start; flex-wrap: wrap; gap: 1rem;">
        <div>
          <h1 class="text-3xl font-bold" style="display: flex; align-items: center; gap: var(--space-sm);">
            ${user.name}
            ${user.plan === 'pro' ? '<span class="badge badge-pro">PRO</span>' : ''}
            ${user.plan === 'business' ? '<span class="badge badge-primary">BUSINESS</span>' : ''}
          </h1>
          <div style="font-size: 0.9375rem; color: var(--color-primary); font-weight: 600; margin-bottom: 0.25rem;">@${user.username || ''}</div>
          <p class="text-lg text-secondary" style="margin-bottom: var(--space-sm);">${user.title || t('Freelancer')}</p>
          <div style="display: flex; flex-wrap: wrap; gap: var(--space-md); color: var(--color-text-secondary); margin-bottom: var(--space-md); font-size: 0.875rem;">
            <span>📍 ${user.location || t('Anywhere')}</span>
            <span>⭐ ${renderStars(user.rating || 0)} (${userReviews.length || user.reviews_count || 0})</span>
            <span>💰 ${formatCurrency(displayRate)}${t('/hr')}</span>
            <span>✅ ${completedCount || user.completed_projects || 0} ${t('Completed projects')}</span>
          </div>
        </div>
        
        <div>
          ${isOwnProfile 
            ? `<a href="#/settings" class="btn btn-outline">${t('Edit Profile')}</a>` 
            : `<a href="#/messages?to=${user.id}" class="btn btn-primary">${t('Message')}</a>`
          }
        </div>
      </div>
      
      <div class="divider" style="margin: var(--space-lg) 0;"></div>
      
      <h3 class="text-xl font-bold" style="margin-bottom: var(--space-md);">${t('About')}</h3>
      <p class="text-body" style="white-space: pre-line; margin-bottom: var(--space-lg); line-height: 1.6;">${user.bio || t('No bio provided.')}</p>
      
      <h3 class="text-xl font-bold" style="margin-bottom: var(--space-md);">${t('Skills')}</h3>
      <div style="display: flex; gap: var(--space-xs); flex-wrap: wrap; margin-bottom: var(--space-lg);">
        ${(user.skills || []).length > 0 
          ? user.skills.map(skill => `<span class="skill-tag">${skill}</span>`).join('')
          : `<span class="text-secondary">${t('No skills listed.')}</span>`
        }
      </div>

      ${userServices.length > 0 ? `
        <h3 class="text-xl font-bold" style="margin-bottom: var(--space-md);">${t('Active Services')}</h3>
        <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(260px, 1fr)); gap: 1rem; margin-bottom: var(--space-lg);">
          ${userServices.map(s => `
            <a href="#/service/${s.id}" class="card card-hover" style="text-decoration: none; color: inherit; padding: 1rem;">
              <h4 class="font-bold truncate" style="margin-bottom: 0.25rem;">${s.title}</h4>
              <div class="text-sm text-secondary" style="margin-bottom: 0.5rem;">${t(s.category)}</div>
              <div style="display: flex; justify-content: space-between; align-items: center;">
                <span class="font-bold text-primary">${formatCurrency(s.price)}</span>
                <span class="text-xs text-secondary">${s.delivery_days} ${t('days')}</span>
              </div>
            </a>
          `).join('')}
        </div>
      ` : ''}
    </div>
  `;
}
