// src/context/NavigationContext.jsx
import { createContext } from 'react';

export const NavigationContext = createContext(null);

/**
 * Navigation Context Provider
 * Makes navigate function available to all children
 *
 * @param {Object} props
 * @param {Function} props.navigate - Navigation function
 * @param {React.ReactNode} props.children
 */
export function NavigationProvider({ navigate, children }) {
  return (
    <NavigationContext.Provider value={{ navigate }}>
      {children}
    </NavigationContext.Provider>
  );
}
