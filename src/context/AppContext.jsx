// src/context/AppContext.jsx
import { createContext, useContext } from 'react';
import { useTheme } from '../hooks/useTheme';
import { useNotification } from '../hooks/useNotification';

export const AppContext = createContext(null);

/**
 * App Context Provider
 * Provides theme and notification state to all children
 *
 * @param {React.ReactNode} props.children
 */
export function AppProvider({ children }) {
  const [theme, setTheme] = useTheme();
  const notification = useNotification();

  // Calculate spark color based on theme
  const sparkColor = theme === 'dark' ? '#F2E7C9' : '#4E4B93';

  const handleThemeChange = (newTheme) => {
    setTheme(newTheme);
  };

  const value = {
    theme,
    setTheme: handleThemeChange,
    sparkColor,
    notification
  };

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
}

/**
 * Hook to access App context
 * @returns {Object} App context value
 */
export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within AppProvider');
  }
  return context;
}
