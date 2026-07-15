// auth.js - Authentication system for FreeDom marketplace
import { Storage } from './storage.js';

export class Auth {
  static SESSION_KEY = 'freedom_session';

  static register({ name, email, password }) {
    const role = 'freelancer'; // Force everyone to freelancer
    // Check if email exists
    const existing = Storage.find('users', u => u.email === email);
    if (existing.length > 0) throw new Error('Email already registered');

    // Auto-generate unique username from name
    let baseUsername = name.toLowerCase().replace(/[^a-z0-9]/g, '_');
    // Remove leading/trailing underscores
    baseUsername = baseUsername.replace(/^_+|_+$/g, '');
    if (!baseUsername) baseUsername = 'user';

    let username = baseUsername;
    let counter = 1;
    while (Storage.find('users', u => u.username === username).length > 0) {
      username = `${baseUsername}_${counter}`;
      counter++;
    }

    const user = Storage.create('users', {
      name,
      username,
      email,
      password_hash: this.hashPassword(password),
      role, // 'freelancer', 'client', or 'both'
      plan: 'free',
      avatar: null,
      avatar_color: this.generateAvatarColor(),
      skills: [],
      categories: [],
      bio: '',
      portfolio: [],
      rating: 0,
      reviews_count: 0,
      completed_projects: 0,
      balance: 0,
      response_time: '< 1 hour',
      is_verified: false,
      is_online: true,
      location: '',
      hourly_rate: 0,
      title: '' // professional title like 'Full Stack Developer'
    });

    this.setSession(user);
    return user;
  }

  static login(email, password) {
    const users = Storage.find('users', u => u.email === email);
    if (users.length === 0) throw new Error('User not found');

    const user = users[0];
    if (user.password_hash !== this.hashPassword(password)) {
      throw new Error('Invalid password');
    }

    Storage.update('users', user.id, { is_online: true, last_seen: new Date().toISOString() });
    this.setSession(user);
    return user;
  }

  static logout() {
    const user = this.getCurrentUser();
    if (user) {
      Storage.update('users', user.id, { is_online: false, last_seen: new Date().toISOString() });
    }
    localStorage.removeItem(this.SESSION_KEY);
  }

  static getCurrentUser() {
    const session = localStorage.getItem(this.SESSION_KEY);
    if (!session) return null;
    try {
      const sessionData = JSON.parse(session);
      const { userId, lastActive } = sessionData;

      // Check inactivity: 28 days = 28 * 24 * 60 * 60 * 1000 = 2419200000 ms
      const INACTIVITY_LIMIT = 28 * 24 * 60 * 60 * 1000;
      const now = Date.now();

      if (lastActive) {
        const lastActiveTime = new Date(lastActive).getTime();
        if (now - lastActiveTime > INACTIVITY_LIMIT) {
          this.logout();
          return null;
        }
      }

      const user = Storage.getById('users', userId);
      if (!user || !user.name) {
        localStorage.removeItem(this.SESSION_KEY);
        return null;
      }

      // Update last active timestamp
      sessionData.lastActive = new Date().toISOString();
      localStorage.setItem(this.SESSION_KEY, JSON.stringify(sessionData));

      return user;
    } catch (e) {
      localStorage.removeItem(this.SESSION_KEY);
      return null;
    }
  }

  static isLoggedIn() {
    return this.getCurrentUser() !== null;
  }

  static updateProfile(updates) {
    const user = this.getCurrentUser();
    if (!user) throw new Error('Not logged in');
    return Storage.update('users', user.id, updates);
  }

  static setSession(user) {
    localStorage.setItem(this.SESSION_KEY, JSON.stringify({
      userId: user.id,
      loginAt: new Date().toISOString(),
      lastActive: new Date().toISOString()
    }));
  }

  static hashPassword(password) {
    // Simple hash for demo purposes
    let hash = 0;
    for (let i = 0; i < password.length; i++) {
      const char = password.charCodeAt(i);
      hash = ((hash << 5) - hash) + char;
      hash = hash & hash;
    }
    return 'h_' + Math.abs(hash).toString(36);
  }

  static generateAvatarColor() {
    const colors = ['#6C5CE7', '#00B894', '#E17055', '#0984E3', '#FDCB6E', '#D63031', '#00CEC9', '#E84393'];
    return colors[Math.floor(Math.random() * colors.length)];
  }

  static getInitials(name) {
    if (!name) return '??';
    return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
  }
}
