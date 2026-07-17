// ============================================
// FreeDom — Modal Component
// ============================================

/**
 * Show a modal dialog.
 * @param {Object} options
 * @param {string} options.title
 * @param {string} options.content - HTML content for the modal body
 * @param {Function} [options.onConfirm]
 * @param {Function} [options.onCancel]
 * @param {string} [options.confirmText='Confirm']
 * @param {string} [options.cancelText='Cancel']
 * @param {boolean} [options.danger=false]
 */
export function showModal({
  title,
  content,
  onConfirm,
  onCancel,
  confirmText = 'Confirm',
  cancelText = 'Cancel',
  danger = false
}) {
  const container = document.getElementById('modalContainer');
  if (!container) return;

  container.innerHTML = `
    <div class="modal-overlay" id="modalOverlay">
      <div class="modal-dialog">
        <div class="modal-header">
          <h3 class="modal-title">${title}</h3>
          <button class="modal-close-btn" id="modalCloseBtn" aria-label="Close">×</button>
        </div>
        <div class="modal-body">${content}</div>
        <div class="modal-footer">
          <button class="btn btn-ghost" id="modalCancelBtn">${cancelText}</button>
          <button class="btn ${danger ? 'btn-danger' : 'btn-primary'}" id="modalConfirmBtn">${confirmText}</button>
        </div>
      </div>
    </div>
  `;

  const overlay = document.getElementById('modalOverlay');
  const closeBtn = document.getElementById('modalCloseBtn');
  const cancelBtn = document.getElementById('modalCancelBtn');
  const confirmBtn = document.getElementById('modalConfirmBtn');

  requestAnimationFrame(() => {
    overlay.classList.add('modal-visible');
  });

  function handleClose() {
    if (onCancel) onCancel();
    closeModal();
  }

  function handleConfirm() {
    if (onConfirm) onConfirm();
    closeModal();
  }

  closeBtn.addEventListener('click', handleClose);
  cancelBtn.addEventListener('click', handleClose);
  confirmBtn.addEventListener('click', handleConfirm);
  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) handleClose();
  });
}

/**
 * Close the currently open modal.
 */
export function closeModal() {
  const container = document.getElementById('modalContainer');
  if (!container) return;

  const overlay = container.querySelector('.modal-overlay');
  if (overlay) {
    overlay.classList.remove('modal-visible');
    overlay.classList.add('modal-hiding');
    setTimeout(() => {
      container.innerHTML = '';
    }, 300);
  } else {
    container.innerHTML = '';
  }
}
