// storage.js - localStorage abstraction for FreeDom marketplace
export class Storage {
  // Get all items from a collection
  static getAll(collection) {
    return JSON.parse(localStorage.getItem(`freedom_${collection}`) || '[]');
  }

  // Get item by ID
  static getById(collection, id) {
    const items = this.getAll(collection);
    return items.find(item => item.id === id) || null;
  }

  // Create new item (auto-generates id and created_at)
  static create(collection, item) {
    const items = this.getAll(collection);
    const newItem = {
      ...item,
      id: this.generateId(),
      created_at: new Date().toISOString()
    };
    items.push(newItem);
    localStorage.setItem(`freedom_${collection}`, JSON.stringify(items));
    return newItem;
  }

  // Update item by ID
  static update(collection, id, updates) {
    const items = this.getAll(collection);
    const index = items.findIndex(item => item.id === id);
    if (index === -1) return null;
    items[index] = { ...items[index], ...updates, updated_at: new Date().toISOString() };
    localStorage.setItem(`freedom_${collection}`, JSON.stringify(items));
    return items[index];
  }

  // Delete item by ID
  static delete(collection, id) {
    const items = this.getAll(collection).filter(item => item.id !== id);
    localStorage.setItem(`freedom_${collection}`, JSON.stringify(items));
  }

  // Find items matching a filter function
  static find(collection, filterFn) {
    return this.getAll(collection).filter(filterFn);
  }

  // Advanced query with search, filters, sort, pagination
  static query(collection, { search, searchFields, filters, sort, page, limit } = {}) {
    let items = this.getAll(collection);

    // Text search across specified fields
    if (search && searchFields) {
      const q = search.toLowerCase();
      items = items.filter(item =>
        searchFields.some(field =>
          String(item[field] || '').toLowerCase().includes(q)
        )
      );
    }

    // Apply filters (object of field: value pairs, supports arrays for 'in' matching)
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value === undefined || value === null || value === '') return;
        if (Array.isArray(value)) {
          items = items.filter(item => value.includes(item[key]));
        } else {
          items = items.filter(item => item[key] === value);
        }
      });
    }

    // Sort
    if (sort) {
      const [field, order] = sort.split(':');
      items.sort((a, b) => {
        if (order === 'desc') return a[field] > b[field] ? -1 : 1;
        return a[field] > b[field] ? 1 : -1;
      });
    }

    const total = items.length;

    // Pagination
    if (page && limit) {
      const start = (page - 1) * limit;
      items = items.slice(start, start + limit);
    }

    return { items, total, page: page || 1, limit: limit || total };
  }

  // Generate unique ID
  static generateId() {
    return Date.now().toString(36) + Math.random().toString(36).substr(2, 9);
  }

  // Check if collections are empty (for seeding)
  static isEmpty() {
    return this.getAll('users').length === 0;
  }

  // Clear all freedom data
  static clearAll() {
    Object.keys(localStorage)
      .filter(key => key.startsWith('freedom_'))
      .forEach(key => localStorage.removeItem(key));
  }
}
