import { useState, useEffect } from 'react'

import ThemeToggle from './ThemeToggle'
import TextType from './TextType'
import ClickSpark from './ClickSpark'
import Dock from './components/Dock/Dock'
import ComingSoon from './components/ComingSoon'
import { VscHome, VscTelescope, VscCalendar, VscBell } from "react-icons/vsc";

function App() {
  const [theme, setTheme] = useState('dark');
  const [sparkColor, setSparkColor] = useState('#B8B5E8');
  const [activeView, setActiveView] = useState('home');

  const socials = [
    { name: 'LinkedIn', url: 'https://www.linkedin.com/in/thomasbustos/' },
    { name: 'X', url: 'https://x.com/thomasbustos_' },
    { name: 'GitHub', url: 'https://github.com/thomasbustos' },
    { name: 'YouTube', url: 'https://www.youtube.com/@thomasbustos' },
    { name: 'Substack', url: 'https://thomasbustos.substack.com/' },
    { name: 'TikTok', url: 'https://www.tiktok.com/@thomasbustos' },
  ];

  useEffect(() => {
    // Set initial theme and spark color based on saved theme
    const savedTheme = localStorage.getItem('theme') || 'dark';
    setTheme(savedTheme);
    setSparkColor(savedTheme === 'dark' ? '#B8B5E8' : '#4E4B93');
  }, []);

  const handleThemeChange = (newTheme) => {
    setTheme(newTheme);
    setSparkColor(newTheme === 'dark' ? '#B8B5E8' : '#4E4B93');
  }

  const [eventsView, setEventsView] = useState('upcoming');

  const trackSocialClick = (platform) => {
    if (window.gtag) {
      window.gtag('event', 'social_click', {
        'event_category': 'engagement',
        'event_label': platform
      });
    }
  };

  const dockItems = [
    {
      icon: <VscHome size={24} />,
      label: 'Home',
      view: 'home',
      onClick: () => setActiveView('home')
    },
    {
      icon: <VscTelescope size={24} />,
      label: 'Mission',
      view: 'mission',
      onClick: () => setActiveView('mission')
    },
    {
      icon: <VscCalendar size={24} />,
      label: 'Events',
      view: 'events',
      onClick: () => setActiveView('events')
    },
    {
      icon: <VscBell size={24} />,
      label: 'LTAI Daily News',
      view: 'newsletter',
      onClick: () => window.navigate('/newsletter')
    },
  ];

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
      {activeView === 'newsletter' ? (
        <ComingSoon
          onReturnHome={() => setActiveView('home')}
          onThemeChange={handleThemeChange}
        />
      ) : (
        <div className="container">
          <ThemeToggle onThemeChange={handleThemeChange} />

          <Dock
            items={dockItems}
            activeView={activeView}
            panelHeight={68}
            baseItemSize={50}
            magnification={70}
          />

          {/* Foreground layer - content */}
          <main className="content-layer">

            {activeView === 'home' && (
              <div className="content-card">
                <TextType
                  text="Thomas Bustos"
                  as="h1"
                  className="name"
                  typingSpeed={100}
                  loop={false}
                  showCursor={true}
                  cursorCharacter="|"
                />
                <div className="bio-card">
                  <p className="description">
                    Builder. Founder. Learner. I'm currently co-founding Radiance and building The SOURCE®, our Creative OS for brands. I host Let's Talk AI, 90+ episodes with founders, builders, and leaders in tech. I learn obsessively in public.
                  </p>
                </div>
                <nav className="socials">
                  {socials.map((social) => (
                    <a
                      key={social.name}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="social-link"
                      onClick={() => trackSocialClick(social.name)}
                    >
                      {social.name}
                    </a>
                  ))}
                </nav>
              </div>
            )}

            {activeView === 'mission' && (
              <div className="content-card">
                <TextType
                  text="Mission"
                  as="h1"
                  className="name"
                  typingSpeed={100}
                  loop={false}
                  showCursor={true}
                  cursorCharacter="|"
                />
                <div className="mission-section">
                  <a
                    href="https://thomasbustos.substack.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mission-link"
                    onClick={() => trackSocialClick('Mission - Substack')}
                  >
                    <div className="mission-statement">
                      Build exceptional products with exceptional people. Document everything along the way.
                    </div>
                  </a>
                </div>
              </div>
            )}

            {activeView === 'events' && (
              <div className="content-card">
                <TextType
                  text="Events"
                  as="h1"
                  className="name"
                  typingSpeed={100}
                  loop={false}
                  showCursor={true}
                  cursorCharacter="|"
                />
                <div className="events-section">
                  <div className="events-widget">
                    <div className="events-tabs">
                      <button
                        className={`events-tab ${eventsView === 'upcoming' ? 'active' : ''}`}
                        onClick={() => setEventsView('upcoming')}
                      >
                        Upcoming
                      </button>
                      <button
                        className={`events-tab ${eventsView === 'past' ? 'active' : ''}`}
                        onClick={() => setEventsView('past')}
                      >
                        Past
                      </button>
                    </div>

                    {eventsView === 'upcoming' ? (
                      <div className="empty-events">
                        No upcoming events scheduled.
                      </div>
                    ) : (
                      <a
                        href="https://www.ai.engineer/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="event-link"
                        onClick={() => trackSocialClick('AIE Code Summit')}
                      >
                        <div className="event-item">
                          <span className="event-name">AIE Code Summit</span>
                          <span className="event-details">New York • Nov 20-22, 2025</span>
                        </div>
                      </a>
                    )}
                  </div>
                </div>
              </div>
            )}
          </main>
        </div>
      )}
    </ClickSpark>
  )
}

export default App

