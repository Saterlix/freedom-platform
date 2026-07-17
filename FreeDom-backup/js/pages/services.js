import { Storage } from '../storage.js';
import { formatCurrency, renderStars, renderAvatar } from '../utils/helpers.js';
import { t } from '../utils/i18n.js';
import { setPageTitle } from '../components/header.js';

export function renderServices(container, params) {
  setPageTitle(t('Explore Services'));

  const services = Storage.getAll('services');
  let servicesHtml = `<div class="empty-state">${t('No services found.')}</div>`;
  if (services.length > 0) {
    servicesHtml = `<div class="grid" style="grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: var(--space-md); margin-top: var(--space-lg);">
      ${services.map(s => {
        const user = Storage.getById('users', s.freelancer_id);
        const catColor = `hsl(${Math.random() * 360}, 70%, 60%)`;
        return `
          <a href="#/service/${s.id}" class="card card-hover service-card" style="text-decoration: none; color: inherit; display: flex; flex-direction: column;">
            <div style="height: 140px; background: linear-gradient(135deg, ${catColor}, var(--color-primary)); border-radius: var(--radius-md) var(--radius-md) 0 0; margin: calc(var(--space-md) * -1) calc(var(--space-md) * -1) var(--space-md) calc(var(--space-md) * -1);"></div>
            <h3 class="text-md font-bold truncate" style="margin-bottom: var(--space-xs);">${s.title}</h3>
            <p class="text-sm text-secondary truncate" style="margin-bottom: var(--space-md);">${t(s.category)}</p>
            <div style="display: flex; justify-content: space-between; align-items: center; margin-top: auto; padding-top: var(--space-md); border-top: 1px solid var(--color-border);">
              <div style="display: flex; align-items: center; gap: var(--space-xs);">
                ${renderAvatar(user, 'sm')}
                <span class="text-sm font-medium truncate" style="max-width: 80px;">${user?.name || t('Unknown')}</span>
              </div>
              <div class="text-right">
                <div class="font-bold text-primary">${formatCurrency(s.price)}</div>
                <div class="text-xs text-secondary">${renderStars(s.rating || 0)}</div>
              </div>
            </div>
          </a>
        `;
      }).join('')}
    </div>`;
  }
  container.innerHTML = `
    <div class="page-header" style="display: flex; justify-content: space-between; align-items: center; margin-bottom: var(--space-xl);">
      <div>
        <h1 class="text-2xl font-bold">${t('Explore Services')}</h1>
        <p class="text-secondary">${t('Find the right freelance service, right away')}</p>
      </div>
      <a href="#/create-service" class="btn btn-primary">${t('+ Create Service')}</a>
    </div>
    ${servicesHtml}
  `;
}
