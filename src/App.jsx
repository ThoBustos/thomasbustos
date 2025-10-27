import { useState, useEffect } from 'react'
import PixelBlast from './PixelBlast'
import ThemeToggle from './ThemeToggle'
import { trackSocialClick } from './analytics'

function App() {
  const [pixelColor, setPixelColor] = useState('#B09EEF')

  const socials = [
    { name: 'Newsletter', url: 'https://thomasbustos.substack.com/' },
    { name: 'LinkedIn', url: 'https://www.linkedin.com/in/thomasbustos/' },
    { name: 'X', url: 'https://x.com/ThoBustos' },
    { name: 'GitHub', url: 'https://github.com/ThoBustos' },
    { name: 'YouTube', url: 'https://www.youtube.com/@lets-talk-ai' },
    { name: 'TikTok', url: 'https://www.tiktok.com/@lets_talk_ai' },
  ]

  useEffect(() => {
    // Set initial color based on saved theme
    const savedTheme = localStorage.getItem('theme') || 'dark';
    setPixelColor('#B09EEF');
  }, []);

  const handleThemeChange = (theme) => {
    // Same pixel color for both themes
    setPixelColor('#B09EEF');
  }

  return (
    <div className="container">
      <ThemeToggle onThemeChange={handleThemeChange} />
      
      {/* Background layer - animation */}
      <div className="background-layer">
        <PixelBlast color={pixelColor} />
      </div>
      
      {/* Foreground layer - content */}
      <main className="content-layer">
        <h1 className="name">Thomas Bustos</h1>
        <div className="content-card">
          <p className="description">
            Builder. Founder. Learner. I'm currently co-founding Radiance and building The SOURCE®, our Creative OS for brands. I host Let's Talk AI, 90+ episodes with founders, builders, and leaders in tech. I learn obsessively in public.
          </p>
          
          <a 
            href="https://thomasbustos.substack.com/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="mission-section"
            onClick={() => trackSocialClick('Mission - Substack')}
          >
            <h2 className="mission-title">Mission</h2>
            <p className="mission-statement">Build exceptional products with exceptional people. Document everything along the way.</p>
          </a>

          <div className="events-section">
            <h2 className="events-title">Upcoming Events</h2>
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
      </main>
    </div>
  )
}

export default App

