// src/Router.jsx
import { useState, useEffect } from 'react';
import { AppProvider } from './context/AppContext';
import { NavigationProvider } from './context/NavigationContext';
import App from './App';
import NewsletterPage from './pages/NewsletterPage';
import DigestDetailPage from './pages/DigestDetailPage';
import { ROUTES } from './config/routes';

// Extract digest date from path (YYYY-MM-DD format)
const getDigestDate = (path) => {
  const match = path.match(/^\/newsletter\/(\d{4}-\d{2}-\d{2})$/)
  return match ? match[1] : null
};

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
    // Newsletter page styling
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
    // Check for newsletter detail page first (more specific route)
    const digestDate = getDigestDate(currentPath);
    if (digestDate) {
      return <DigestDetailPage date={digestDate} />;
    }

    // Newsletter archive page
    if (currentPath === ROUTES.NEWSLETTER.path) {
      return <NewsletterPage />;
    }

    switch (currentPath) {
      case ROUTES.HOME.path:
      case ROUTES.MISSION.path:
      case ROUTES.EVENTS.path:
      case ROUTES.LIBRARY.path:
      case ROUTES.SHIP_LOG.path:
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
