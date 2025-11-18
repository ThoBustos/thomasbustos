import { useState, useEffect } from 'react'
import PixelBlast from './PixelBlast'
import ThemeToggle from './ThemeToggle'
import TextType from './TextType'
import { trackSocialClick } from './analytics'

function App() {
  const [pixelColor, setPixelColor] = useState('#4E4B93')

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
    setPixelColor('#4E4B93');
  }, []);

  const handleThemeChange = (theme) => {
    // Keep pixel color consistent across themes
    setPixelColor('#4E4B93');
  }

  return (
    <div className="container">
      <ThemeToggle onThemeChange={handleThemeChange} />
      
      {/* Background layer - animation */}
      {/* <div className="background-layer">
        <PixelBlast color={pixelColor} />
      </div> */}
      
      {/* Foreground layer - content */}
      <main className="content-layer">
        <TextType 
          text="Thomas Bustos" 
          as="h1" 
          className="name"
          typingSpeed={100}
          loop={false}
          showCursor={true}
          cursorCharacter="|"
        />
        <div className="content-card">
          <p className="description">
            Builder. Founder. Learner. I'm currently co-founding Radiance and building The SOURCE®, our Creative OS for brands. I host Let's Talk AI, 90+ episodes with founders, builders, and leaders in tech. I learn obsessively in public.
          </p>
          
          <div className="mission-section">
            <h2 className="mission-title">Mission</h2>
            <a 
              href="https://thomasbustos.substack.com/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="mission-link"
              onClick={() => trackSocialClick('Mission - Substack')}
            >
              <p className="mission-statement">Build exceptional products with exceptional people. Document everything along the way.</p>
            </a>
          </div>

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

