// src/App.jsx
import { useApp } from './context/AppContext';
import { useNavigation } from './hooks/useNavigation';
import { getActiveView } from './config/routes';
import { createDockItems } from './config/dockItems.jsx';

import ClickSpark from './animations/ClickSpark';
import BackgroundImage from './components/layout/BackgroundImage/BackgroundImage';
import Dock from './components/layout/Dock/Dock';
import ThemeToggle from './components/ui/ThemeToggle/ThemeToggle';
import LTAIBrandWidget from './components/features/brand/LTAIBrandWidget/LTAIBrandWidget';
import NotificationToast from './components/ui/NotificationToast/NotificationToast';

import HomePage from './pages/HomePage';
import MissionPage from './pages/MissionPage';
import EventsPage from './pages/EventsPage';

function App({ currentPath = '/' }) {
  const { theme, setTheme, sparkColor, notification } = useApp();
  const navigate = useNavigation();
  const activeView = getActiveView(currentPath);
  const dockItems = createDockItems(navigate);

  return (
    <ClickSpark
      sparkColor={sparkColor}
      sparkSize={12}
      sparkRadius={20}
      sparkCount={8}
      duration={500}
      easing="ease-out"
      extraScale={1.2}
    >
      <BackgroundImage theme={theme} />
      <div className="container">
        <main className="content-layer">
          <ThemeToggle onThemeChange={setTheme} />

          {activeView === 'home' && <HomePage />}
          {activeView === 'mission' && <MissionPage />}
          {activeView === 'events' && <EventsPage />}
        </main>

        <Dock
          items={dockItems}
          activeView={activeView}
          panelHeight={68}
          baseItemSize={50}
          magnification={70}
        />

        <LTAIBrandWidget onNotify={notification.show} />
      </div>

      <NotificationToast
        message={notification.notification}
        isVisible={notification.showNotification}
        onClose={notification.hide}
      />
    </ClickSpark>
  );
}

export default App;
