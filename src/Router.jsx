// src/Router.jsx
import { useState, useEffect } from 'react';
import { AppProvider } from './context/AppContext';
import { NavigationProvider } from './context/NavigationContext';
import App from './App';
import NewsletterPage from './pages/NewsletterPage';
import { ROUTES } from './config/routes';

function Router() {
  const [currentPath, setCurrentPath] = useState(window.location.pathname);

  useEffect(() => {
    const handlePopState = () => {
      setCurrentPath(window.location.pathname);
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // Manage body classes based on current route
  useEffect(() => {
    if (currentPath.startsWith(ROUTES.NEWSLETTER.path)) {
      document.body.classList.add('newsletter-page');
    } else {
      document.body.classList.remove('newsletter-page');
    }
  }, [currentPath]);

  const navigate = (path) => {
    window.history.pushState({}, '', path);
    setCurrentPath(path);
  };

  // Make navigate function available globally for backward compatibility
  // TODO: Remove this once all components use context
  window.navigate = navigate;

  const renderCurrentPage = () => {
    if (currentPath.startsWith(ROUTES.NEWSLETTER.path)) {
      return <NewsletterPage />;
    }

    switch (currentPath) {
      case ROUTES.HOME.path:
      case ROUTES.MISSION.path:
      case ROUTES.EVENTS.path:
        return <App currentPath={currentPath} />;
      default:
        return <App currentPath={ROUTES.HOME.path} />;
    }
  };

  return (
    <AppProvider>
      <NavigationProvider navigate={navigate}>
        {renderCurrentPage()}
      </NavigationProvider>
    </AppProvider>
  );
}

export default Router;
