// src/pages/MissionPage.jsx
import TextType from '../animations/TextType';
import { useAnalytics } from '../hooks/useAnalytics';

export default function MissionPage() {
  const { trackSocialClick } = useAnalytics();

  return (
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
  );
}
