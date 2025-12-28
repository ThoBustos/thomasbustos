// src/hooks/useNavigation.js
import { useContext } from 'react';
import { NavigationContext } from '../context/NavigationContext';

/**
 * Custom hook to access navigation function
 * Provides fallback to window.navigate if context not available
 *
 * @returns {Function} navigate function
 */
export function useNavigation() {
  const context = useContext(NavigationContext);

  // Fallback for components outside NavigationProvider
  return context?.navigate || window.navigate || (() => {
    console.warn('Navigation not available');
  });
}
