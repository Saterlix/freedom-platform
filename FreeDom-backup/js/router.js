// router.js - Hash-based SPA router for FreeDom marketplace
export class Router {
  constructor() {
    this.routes = {};
    this.currentRoute = null;
    this.beforeHooks = [];
    window.addEventListener('hashchange', () => this.resolve());
  }

  on(path, handler) {
    this.routes[path] = handler;
    return this;
  }

  before(hookFn) {
    this.beforeHooks.push(hookFn);
    return this;
  }

  navigate(path) {
    window.location.hash = path;
  }

  resolve() {
    const hash = window.location.hash.slice(1) || '/dashboard';
    const [path, queryString] = hash.split('?');
    const params = {};

    if (queryString) {
      queryString.split('&').forEach(param => {
        const [key, value] = param.split('=');
        params[key] = decodeURIComponent(value);
      });
    }

    // Find matching route (supports :param patterns)
    let handler = null;
    let routeParams = {};

    for (const [routePath, routeHandler] of Object.entries(this.routes)) {
      const match = this.matchRoute(routePath, path);
      if (match) {
        handler = routeHandler;
        routeParams = match;
        break;
      }
    }

    if (!handler) {
      handler = this.routes['/404'] || this.routes['/dashboard'];
    }

    // Run before hooks
    for (const hook of this.beforeHooks) {
      if (hook(path, params) === false) return;
    }

    this.currentRoute = path;

    if (handler) {
      handler({ ...params, ...routeParams, path });
    }
  }

  matchRoute(routePath, actualPath) {
    const routeParts = routePath.split('/');
    const actualParts = actualPath.split('/');

    if (routeParts.length !== actualParts.length) return null;

    const params = {};
    for (let i = 0; i < routeParts.length; i++) {
      if (routeParts[i].startsWith(':')) {
        params[routeParts[i].slice(1)] = actualParts[i];
      } else if (routeParts[i] !== actualParts[i]) {
        return null;
      }
    }
    return params;
  }

  getCurrentRoute() {
    return this.currentRoute;
  }

  init() {
    this.resolve();
    return this;
  }
}
