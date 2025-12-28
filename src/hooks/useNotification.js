// src/hooks/useNotification.js
import { useState } from 'react';

/**
 * Custom hook for managing notification state
 * Handles showing/hiding notifications with animation reset logic
 *
 * @returns {Object} { notification, showNotification, show, hide }
 */
export function useNotification() {
  const [notification, setNotification] = useState('');
  const [showNotification, setShowNotification] = useState(false);

  const show = (message) => {
    // If any notification is already showing, reset the timer
    if (showNotification) {
      setShowNotification(false);
      // Force re-render with slight delay to restart animation
      setTimeout(() => {
        setNotification(message);
        setShowNotification(true);
      }, 50);
    } else {
      setNotification(message);
      setShowNotification(true);
    }
  };

  const hide = () => {
    setShowNotification(false);
    setNotification('');
  };

  return {
    notification,
    showNotification,
    show,
    hide
  };
}
