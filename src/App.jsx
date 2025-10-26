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
            Builder. Founder. Learner. I'm currently co-founding Radiance and building The SOURCE®, our Creative OS for brands. I host Let's Talk AI, 90+ episodes with founders, builders, and leaders in tech. I build AI-powered solutions that create real value, not just demos. My mission: build the best products with the most talented people. I learn obsessively in public.
          </p>
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

