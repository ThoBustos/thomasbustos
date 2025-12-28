// src/config/routes.js
/**
 * Route configuration
 * Maps paths to view names and metadata
 */
export const ROUTES = {
  HOME: {
    path: '/',
    view: 'home',
    title: 'Home'
  },
  MISSION: {
    path: '/mission',
    view: 'mission',
    title: 'Mission'
  },
  EVENTS: {
    path: '/events',
    view: 'events',
    title: 'Events'
  },
  NEWSLETTER: {
    path: '/newsletter',
    view: 'newsletter',
    title: 'LTAI Daily News'
  }
};

/**
 * Get active view from current path
 * @param {string} currentPath - Current URL path
 * @returns {string} Active view name
 */
export const getActiveView = (currentPath) => {
  if (currentPath === ROUTES.MISSION.path) return ROUTES.MISSION.view;
  if (currentPath === ROUTES.EVENTS.path) return ROUTES.EVENTS.view;
  if (currentPath.startsWith(ROUTES.NEWSLETTER.path)) return ROUTES.NEWSLETTER.view;
  return ROUTES.HOME.view;
};
