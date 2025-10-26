import { useState, useEffect } from 'react'
import PixelBlast from './PixelBlast'
import ThemeToggle from './ThemeToggle'

function App() {
  const [pixelColor, setPixelColor] = useState('#4E4B93')

  const socials = [
    { name: 'Newsletter', url: 'https://thomasbustos.substack.com/' },
    { name: 'LinkedIn', url: 'https://www.linkedin.com/in/thomasbustos/' },
    { name: 'X', url: 'https://x.com/ThoBustos' },
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
            Builder & co-founder. Currently building Radiance, a creative OS. My mission is simple: to build the best products possible with the most talented people. My curiosity led me to Let's Talk AI, a podcast with soon 100 episodes featuring leaders in tech, top builders, authors, and super cool people from whom I learn in public and share every conversation. Join me on my learning journey.
          </p>
          <nav className="socials">
            {socials.map((social) => (
              <a
                key={social.name}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className="social-link"
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

