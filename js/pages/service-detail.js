import { Storage } from '../storage.js';
import { formatCurrency, renderStars, renderAvatar } from '../utils/helpers.js';
import { showToast } from '../components/notifications.js';
import { t } from '../utils/i18n.js';
import { setPageTitle } from '../components/header.js';

export function renderServiceDetail(container, params) {
  setPageTitle(t('Service Details'));

  const service = Storage.getById('services', params.id);
  if (!service) {
    container.innerHTML = `<div class="empty-state">${t('Service not found.')}</div>`;
    return;
  }
  const freelancer = Storage.getById('users', service.freelancer_id);
  container.innerHTML = `
    <a href="#/services" class="btn btn-ghost" style="margin-bottom: var(--space-md);">${t('← Back to Services')}</a>
    <div class="grid" style="grid-template-columns: 2fr 1fr; gap: var(--space-xl);">
      <div class="main-col">
        <h1 class="text-3xl font-bold" style="margin-bottom: var(--space-md);">${service.title}</h1>
        <div style="display: flex; align-items: center; gap: var(--space-sm); margin-bottom: var(--space-lg);">
          <span class="badge badge-primary">${t(service.category)}</span>
          <span class="text-secondary">•</span>
          <span>${renderStars(service.rating || 0)} (${service.orders_count || 0} ${t('orders')})</span>
        </div>
        <div style="height: 300px; background: linear-gradient(135deg, var(--color-primary-light), var(--color-secondary-light)); border-radius: var(--radius-lg); margin-bottom: var(--space-xl);"></div>
        <h2 class="text-xl font-bold" style="margin-bottom: var(--space-md);">${t('About This Service')}</h2>
        <div class="text-body" style="white-space: pre-line; line-height: 1.6; margin-bottom: var(--space-xl);">
          ${service.description}
        </div>
      </div>
      <div class="side-col">
        <div class="card" style="position: sticky; top: var(--space-xl);">
          <div class="text-2xl font-bold text-primary" style="margin-bottom: var(--space-sm);">${formatCurrency(service.price)}</div>
          <p class="text-secondary" style="margin-bottom: var(--space-lg);">${t('Delivery in')} ${service.delivery_days} ${t('days')}</p>
          <button id="orderBtn" class="btn btn-primary" style="width: 100%; margin-bottom: var(--space-lg);">${t('Order Now')}</button>
          <div class="divider" style="margin: var(--space-lg) 0;"></div>
          <div style="text-align: center;">
            <div style="display: flex; justify-content: center; margin-bottom: var(--space-sm);">
              ${renderAvatar(freelancer, 'lg')}
            </div>
            <h3 class="text-lg font-bold"><a href="#/profile/${freelancer?.id}" style="color: inherit; text-decoration: none;">${freelancer?.name}</a></h3>
            <p class="text-sm text-secondary" style="margin-bottom: var(--space-md);">${freelancer?.title || t('Freelancer')}</p>
            <a href="#/messages?to=${freelancer?.id}" class="btn btn-outline btn-sm">${t('Contact Me')}</a>
          </div>
        </div>
      </div>
    </div>
  `;
  container.querySelector('#orderBtn').addEventListener('click', () => {
    showToast(t('Order placed successfully! (Simulation)'), 'success');
  });
}
