import { Storage } from '../storage.js';
import { Auth } from '../auth.js';
import { showToast } from '../components/notifications.js';
import { CATEGORIES } from '../utils/helpers.js';
import { t } from '../utils/i18n.js';
import { setPageTitle } from '../components/header.js';

export function renderCreateService(container, params) {
  setPageTitle(t('Create a Service'));

  container.innerHTML = `
    <div class="page-header" style="max-width: 800px; margin: 0 auto; margin-bottom: var(--space-xl);">
      <h1 class="text-2xl font-bold">${t('Create a Service')}</h1>
      <p class="text-secondary">${t('Package your skills into a clear service offering.')}</p>
    </div>
    <div class="card" style="max-width: 800px; margin: 0 auto;">
      <form id="createServiceForm">
        <div style="margin-bottom: var(--space-md);">
          <label class="text-sm font-bold" style="display: block; margin-bottom: var(--space-xs);">${t('Service Title')}</label>
          <input type="text" id="sTitle" class="input" style="width: 100%;" required placeholder="${t('I will do...')}">
        </div>
        <div style="margin-bottom: var(--space-md);">
          <label class="text-sm font-bold" style="display: block; margin-bottom: var(--space-xs);">${t('Category')}</label>
          <select id="sCategory" class="select" style="width: 100%;" required>
            ${CATEGORIES.map(c => `<option value="${c}">${t(c)}</option>`).join('')}
          </select>
        </div>
        <div style="margin-bottom: var(--space-md);">
          <label class="text-sm font-bold" style="display: block; margin-bottom: var(--space-xs);">${t('Description')}</label>
          <textarea id="sDesc" class="textarea" style="width: 100%; min-height: 150px;" required placeholder="${t('Describe what is included in this service...')}"></textarea>
        </div>
        <div class="grid" style="grid-template-columns: 1fr 1fr; gap: var(--space-md); margin-bottom: var(--space-xl);">
          <div>
            <label class="text-sm font-bold" style="display: block; margin-bottom: var(--space-xs);">${t('Price (UZS)')}</label>
            <input type="number" id="sPrice" class="input" style="width: 100%;" required min="1000">
          </div>
          <div>
            <label class="text-sm font-bold" style="display: block; margin-bottom: var(--space-xs);">${t('Delivery Time (Days)')}</label>
            <input type="number" id="sDays" class="input" style="width: 100%;" required min="1">
          </div>
        </div>
        <button type="submit" class="btn btn-primary" style="width: 100%;">${t('Create Service')}</button>
      </form>
    </div>
  `;

  container.querySelector('#createServiceForm').addEventListener('submit', (e) => {
    e.preventDefault();
    const currentUser = Auth.getCurrentUser();
    Storage.create('services', {
      freelancer_id: currentUser.id,
      title: document.getElementById('sTitle').value,
      category: document.getElementById('sCategory').value,
      description: document.getElementById('sDesc').value,
      price: Number(document.getElementById('sPrice').value),
      delivery_days: Number(document.getElementById('sDays').value),
      status: 'active',
      rating: 0,
      orders_count: 0
    });
    showToast(t('Service created successfully!'), 'success');
    window.location.hash = '#/services';
  });
}
