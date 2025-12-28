// src/hooks/useTheme.js
import { useState, useEffect } from 'react';

/**
 * Custom hook for managing theme state
 * Handles localStorage persistence and DOM updates
 *
 * @returns {[string, Function]} [theme, setTheme]
 */
export function useTheme() {
  const [theme, setTheme] = useState(() => {
    // Initialize from localStorage or default to 'dark'
    return localStorage.getItem('theme') || 'dark';
  });

  useEffect(() => {
    // Persist theme to localStorage
    localStorage.setItem('theme', theme);

    // Update DOM attribute for CSS theming
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  return [theme, setTheme];
}
