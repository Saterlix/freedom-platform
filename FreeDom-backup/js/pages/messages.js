import { Storage } from '../storage.js';
import { Auth } from '../auth.js';
import { renderAvatar, timeAgo } from '../utils/helpers.js';
import { t } from '../utils/i18n.js';
import { setPageTitle } from '../components/header.js';

export function renderMessages(container, params) {
  setPageTitle(t('Messages'));
  const currentUser = Auth.getCurrentUser();
  const allMessages = Storage.getAll('messages');

  const conversationsMap = {};
  allMessages.forEach(msg => {
    if (msg.sender_id === currentUser.id || msg.receiver_id === currentUser.id) {
      const otherId = msg.sender_id === currentUser.id ? msg.receiver_id : msg.sender_id;
      if (!conversationsMap[otherId] || new Date(msg.created_at) > new Date(conversationsMap[otherId].created_at)) {
        conversationsMap[otherId] = msg;
      }
    }
  });

  const conversations = Object.values(conversationsMap).sort((a, b) => new Date(b.created_at) - new Date(a.created_at));

  const activeChatId = params.to || (conversations.length > 0 ? (conversations[0].sender_id === currentUser.id ? conversations[0].receiver_id : conversations[0].sender_id) : null);

  let chatMessages = [];
  let otherUser = null;

  if (activeChatId) {
    otherUser = Storage.getById('users', activeChatId);
    chatMessages = allMessages.filter(msg =>
      (msg.sender_id === currentUser.id && msg.receiver_id === activeChatId) ||
      (msg.receiver_id === currentUser.id && msg.sender_id === activeChatId)
    ).sort((a, b) => new Date(a.created_at) - new Date(b.created_at));
  }

  container.innerHTML = `
    <div class="card" style="padding: 0; display: grid; grid-template-columns: 300px 1fr; height: calc(100vh - 120px); overflow: hidden;">
      <div style="border-right: 1px solid var(--color-border); display: flex; flex-direction: column;">
        <div style="padding: var(--space-md); border-bottom: 1px solid var(--color-border);">
          <input type="text" class="input" placeholder="${t('Search messages...')}" style="width: 100%;">
        </div>
        <div style="overflow-y: auto; flex: 1;">
          ${conversations.length === 0 ? `<div style="padding: var(--space-md); text-align: center; color: var(--color-text-secondary);">${t('No messages yet')}</div>` : ''}
          ${conversations.map(msg => {
            const other = Storage.getById('users', msg.sender_id === currentUser.id ? msg.receiver_id : msg.sender_id);
            const isActive = other.id === activeChatId;
            return `
              <a href="#/messages?to=${other.id}" style="display: flex; gap: var(--space-sm); padding: var(--space-md); border-bottom: 1px solid var(--color-border); text-decoration: none; color: inherit; background: ${isActive ? 'var(--color-bg-alt)' : 'transparent'};">
                ${renderAvatar(other, 'md')}
                <div style="flex: 1; min-width: 0;">
                  <div style="display: flex; justify-content: space-between; align-items: baseline;">
                    <div class="font-bold truncate">${other.name}</div>
                    <div class="text-xs text-secondary">${timeAgo(msg.created_at)}</div>
                  </div>
                  <div class="text-sm text-secondary truncate">${msg.text}</div>
                </div>
              </a>
            `;
          }).join('')}
        </div>
      </div>
      <div style="display: flex; flex-direction: column; background: var(--color-bg);">
        ${activeChatId && otherUser ? `
          <div style="padding: var(--space-md); border-bottom: 1px solid var(--color-border); background: var(--color-surface); display: flex; align-items: center; gap: var(--space-md);">
            ${renderAvatar(otherUser, 'sm')}
            <div>
              <div class="font-bold"><a href="#/profile/${otherUser.id}" style="text-decoration: none; color: inherit;">${otherUser.name}</a></div>
              <div class="text-xs text-secondary">${t('Online')}</div>
            </div>
          </div>
          <div id="chatMessagesArea" style="flex: 1; overflow-y: auto; padding: var(--space-md); display: flex; flex-direction: column; gap: var(--space-md);">
            ${chatMessages.length === 0 ? `<div style="text-align: center; color: var(--color-text-secondary); margin-top: auto; margin-bottom: auto;">${t('No messages here yet. Say hi!')}</div>` : ''}
            ${chatMessages.map(msg => {
              const isMine = msg.sender_id === currentUser.id;
              return `
                <div style="display: flex; flex-direction: column; align-items: ${isMine ? 'flex-end' : 'flex-start'};">
                  <div style="max-width: 70%; padding: var(--space-sm) var(--space-md); border-radius: ${isMine ? 'var(--radius-lg) var(--radius-lg) 0 var(--radius-lg)' : 'var(--radius-lg) var(--radius-lg) var(--radius-lg) 0'}; background: ${isMine ? 'var(--color-primary)' : 'var(--color-surface)'}; color: ${isMine ? '#fff' : 'inherit'}; border: ${isMine ? 'none' : '1px solid var(--color-border)'};">
                    ${msg.text}
                  </div>
                  <div class="text-xs text-secondary" style="margin-top: 4px;">${timeAgo(msg.created_at)}</div>
                </div>
              `;
            }).join('')}
          </div>
          <form id="sendMessageForm" style="padding: var(--space-md); background: var(--color-surface); border-top: 1px solid var(--color-border); display: flex; gap: var(--space-sm);">
            <input type="text" id="msgText" class="input" placeholder="${t('Type a message...')}" style="flex: 1;" required autocomplete="off">
            <button type="submit" class="btn btn-primary">${t('Send')}</button>
          </form>
        ` : `
          <div style="flex: 1; display: flex; align-items: center; justify-content: center; color: var(--color-text-secondary);">
            ${t('Select a conversation to start chatting')}
          </div>
        `}
      </div>
    </div>
  `;

  const form = container.querySelector('#sendMessageForm');
  if (form) {
    const area = container.querySelector('#chatMessagesArea');
    area.scrollTop = area.scrollHeight;
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const text = document.getElementById('msgText').value.trim();
      if (!text) return;
      Storage.create('messages', {
        conversation_id: `conv_${Math.min(currentUser.id, activeChatId)}_${Math.max(currentUser.id, activeChatId)}`,
        sender_id: currentUser.id,
        receiver_id: activeChatId,
        text,
        read: false
      });
      renderMessages(container, params);
    });
  }
}
