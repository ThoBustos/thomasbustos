import PixelBlast from './PixelBlast'

function App() {
  const socials = [
    { name: 'Newsletter', url: 'https://thomasbustos.substack.com/' },
    { name: 'LinkedIn', url: 'https://www.linkedin.com/in/thomasbustos/' },
    { name: 'X', url: 'https://x.com/ThoBustos' },
    { name: 'YouTube', url: 'https://www.youtube.com/@lets-talk-ai' },
    { name: 'TikTok', url: 'https://www.tiktok.com/@lets_talk_ai' },
  ]

  return (
    <div className="container">
      {/* Background layer - animation */}
      <div className="background-layer">
        <PixelBlast
          variant="rectangular"
          pixelSize={6}
          color="#B19EEF"
          patternScale={3}
          patternDensity={1.2}
          pixelSizeJitter={0.5}
          enableRipples={false}
          rippleSpeed={0.4}
          rippleThickness={0.12}
          rippleIntensityScale={1.5}
          liquid
          liquidStrength={0.12}
          liquidRadius={1.2}
          liquidWobbleSpeed={5}
          speed={0.6}
          edgeFade={0.25}
          transparent
        />
      </div>
      
      {/* Foreground layer - content */}
      <main className="content-layer">
        <h1 className="name">Thomas Bustos</h1>
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
      </main>
    </div>
  )
}

export default App

