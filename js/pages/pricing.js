import { Auth } from '../auth.js';
import { showToast } from '../components/notifications.js';
import { t } from '../utils/i18n.js';
import { setPageTitle } from '../components/header.js';

export function renderPricing(container, params) {
  setPageTitle(t('Pricing & Plans'));

  const user = Auth.getCurrentUser();
  container.innerHTML = `
    <div style="text-align: center; margin-bottom: var(--space-2xl);">
      <h1 class="text-3xl font-bold" style="margin-bottom: var(--space-sm);">${t('Upgrade Your Experience')}</h1>
      <p class="text-secondary text-lg">${t('Choose the plan that fits your ambition.')}</p>
    </div>
    <div class="grid" style="grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: var(--space-lg); max-width: 1000px; margin: 0 auto;">
      <div class="card" style="display: flex; flex-direction: column;">
        <h3 class="text-xl font-bold" style="margin-bottom: var(--space-xs);">${t('Free')}</h3>
        <div class="text-3xl font-bold text-primary" style="margin-bottom: var(--space-md);">$0<span class="text-sm text-secondary font-normal">/${t('mo')}</span></div>
        <ul style="list-style: none; padding: 0; margin: 0 0 var(--space-xl) 0; flex: 1;">
          <li style="margin-bottom: var(--space-sm);">✓ ${t('Basic profile')}</li>
          <li style="margin-bottom: var(--space-sm);">✓ ${t('3 proposals per day')}</li>
          <li style="margin-bottom: var(--space-sm);">✓ ${t('1 active service listing')}</li>
          <li style="margin-bottom: var(--space-sm); color: var(--color-text-secondary);">✗ ${t('Priority search ranking')}</li>
          <li style="margin-bottom: var(--space-sm); color: var(--color-text-secondary);">✗ ${t('Analytics dashboard')}</li>
        </ul>
        <button class="btn btn-outline" disabled>${t('Current Plan')}</button>
      </div>
      <div class="card" style="display: flex; flex-direction: column; border: 2px solid var(--color-primary); transform: scale(1.05); z-index: 1;">
        <div class="badge badge-pro" style="position: absolute; top: -12px; right: 20px;">${t('Most Popular')}</div>
        <h3 class="text-xl font-bold" style="margin-bottom: var(--space-xs);">${t('Pro')}</h3>
        <div class="text-3xl font-bold text-primary" style="margin-bottom: var(--space-md);">$15<span class="text-sm text-secondary font-normal">/${t('mo')}</span></div>
        <ul style="list-style: none; padding: 0; margin: 0 0 var(--space-xl) 0; flex: 1;">
          <li style="margin-bottom: var(--space-sm);">✓ ${t('Unlimited proposals')}</li>
          <li style="margin-bottom: var(--space-sm);">✓ ${t('PRO badge on profile')}</li>
          <li style="margin-bottom: var(--space-sm);">✓ ${t('10 active service listings')}</li>
          <li style="margin-bottom: var(--space-sm);">✓ ${t('Priority search ranking')}</li>
          <li style="margin-bottom: var(--space-sm);">✓ ${t('Analytics dashboard')}</li>
        </ul>
        <button class="btn btn-primary upgrade-btn" data-plan="pro">${t('Upgrade to Pro')}</button>
      </div>
      <div class="card" style="display: flex; flex-direction: column;">
        <h3 class="text-xl font-bold" style="margin-bottom: var(--space-xs);">${t('Business')}</h3>
        <div class="text-3xl font-bold text-primary" style="margin-bottom: var(--space-md);">$25<span class="text-sm text-secondary font-normal">/${t('mo')}</span></div>
        <ul style="list-style: none; padding: 0; margin: 0 0 var(--space-xl) 0; flex: 1;">
          <li style="margin-bottom: var(--space-sm);">✓ ${t('All Pro features')}</li>
          <li style="margin-bottom: var(--space-sm);">✓ ${t('Access to TOP freelancers')}</li>
          <li style="margin-bottom: var(--space-sm);">✓ ${t('Dedicated account manager')}</li>
          <li style="margin-bottom: var(--space-sm);">✓ ${t('Quality guarantee')}</li>
          <li style="margin-bottom: var(--space-sm);">✓ ${t('24/7 Priority support')}</li>
        </ul>
        <button class="btn btn-outline upgrade-btn" data-plan="business">${t('Go Business')}</button>
      </div>
    </div>
  `;

  container.querySelectorAll('.upgrade-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const plan = e.target.dataset.plan;
      Auth.updateProfile({ plan });
      showToast(t('Successfully upgraded to') + ` ${plan.toUpperCase()}!`, 'success');
      window.location.hash = '#/dashboard';
      setTimeout(() => window.location.reload(), 1500);
    });
  });
}
