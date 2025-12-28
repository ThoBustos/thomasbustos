// src/pages/HomePage.jsx
import TextType from '../animations/TextType';
import { SOCIAL_LINKS } from '../config/socialLinks';
import { useAnalytics } from '../hooks/useAnalytics';

export default function HomePage() {
  const { trackSocialClick } = useAnalytics();

  return (
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
        {SOCIAL_LINKS.map((social) => (
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
  );
}
