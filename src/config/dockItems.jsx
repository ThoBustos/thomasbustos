// src/config/dockItems.js
import { VscHome, VscTelescope, VscCalendar, VscBook, VscGraph } from "react-icons/vsc";

/**
 * Creates dock items configuration
 * @param {Function} navigate - Navigation function
 * @returns {Array} Array of dock item configurations
 */
export const createDockItems = (navigate) => {
  const nav = navigate || window.navigate || (() => {});

  return [
    {
      icon: <VscHome size={24} />,
      label: 'Home',
      view: 'home',
      path: '/',
      onClick: () => nav('/')
    },
    {
      icon: <VscTelescope size={24} />,
      label: 'Mission',
      view: 'mission',
      path: '/mission',
      onClick: () => nav('/mission')
    },
    {
      icon: <VscCalendar size={24} />,
      label: 'Events',
      view: 'events',
      path: '/events',
      onClick: () => nav('/events')
    },
    {
      icon: <VscBook size={24} />,
      label: 'Library',
      view: 'library',
      path: '/library',
      onClick: () => nav('/library')
    },
    {
      icon: <VscGraph size={24} />,
      label: 'Ship Log',
      view: 'shiplog',
      path: '/shiplog',
      onClick: () => nav('/shiplog')
    },
  ];
};
