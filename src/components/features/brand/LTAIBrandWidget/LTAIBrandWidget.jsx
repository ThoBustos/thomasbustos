import { useState, useEffect } from 'react';
import { VscGithub } from 'react-icons/vsc';
import './LTAIBrandWidget.css';

function LTAIBrandWidget({ onNotify }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [stars, setStars] = useState(null);

  // Fetch GitHub stars
  useEffect(() => {
    fetch('https://api.github.com/repos/ThoBustos/thomasbustos')
      .then(res => res.json())
      .then(data => setStars(data.stargazers_count))
      .catch(() => setStars(null));
  }, []);

  const handleDownloadLogo = () => {
    const link = document.createElement('a');
    link.href = '/LTAI_logo.png';
    link.download = 'LTAI_logo.png';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    // Track download
    if (window.gtag) {
      window.gtag('event', 'logo_download', {
        'event_category': 'brand',
        'event_label': 'LTAI Logo'
      });
    }
  };

  const handleYouTubeClick = () => {
    window.open('https://www.youtube.com/@lets-talk-ai', '_blank');
    
    // Track YouTube click
    if (window.gtag) {
      window.gtag('event', 'youtube_click', {
        'event_category': 'brand',
        'event_label': 'Lets Talk AI'
      });
    }
  };

  const copyToClipboard = (color, colorName) => {
    navigator.clipboard.writeText(color);
    onNotify(`${colorName} copied!`);
    
    // Track color copy
    if (window.gtag) {
      window.gtag('event', 'color_copy', {
        'event_category': 'brand',
        'event_label': colorName
      });
    }
  };

  // ESC key listener
  useEffect(() => {
    const handleEscKey = (event) => {
      if (event.key === 'Escape' && isExpanded) {
        setIsExpanded(false);
      }
    };

    if (isExpanded) {
      document.addEventListener('keydown', handleEscKey);
    }

    return () => {
      document.removeEventListener('keydown', handleEscKey);
    };
  }, [isExpanded]);

  return (
    <>
      <div 
        className="ltai-brand-widget"
        onClick={() => setIsExpanded(true)}
      >
        <img 
          src="/LTAI_logo.png" 
          alt="Let's Talk AI" 
          className="ltai-logo"
        />
      </div>

      {isExpanded && (
        <div className="ltai-brand-overlay" onClick={() => setIsExpanded(false)}>
          <div className="ltai-brand-panel" onClick={(e) => e.stopPropagation()}>
            <button 
              className="ltai-panel-close"
              onClick={() => setIsExpanded(false)}
            >
              ×
            </button>
            
            <h3 className="ltai-panel-title">Site Info</h3>
            
            <div className="ltai-section">
              <h4>Logo</h4>
              <div className="ltai-logo-section">
                <div className="ltai-logo-container" onClick={handleDownloadLogo}>
                  <img 
                    src="/LTAI_logo.png" 
                    alt="Let's Talk AI Logo" 
                    className="ltai-panel-logo"
                  />
                  <div className="ltai-download-overlay">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                      <polyline points="7,10 12,15 17,10"/>
                      <line x1="12" y1="15" x2="12" y2="3"/>
                    </svg>
                  </div>
                </div>
              </div>
            </div>

            <div className="ltai-section">
              <h4>Colors</h4>
              <div className="ltai-colors">
                <div className="ltai-color-item">
                  <div 
                    className="ltai-color-swatch primary"
                    onClick={() => copyToClipboard('#4E4B93', 'Primary Purple')}
                    title="Click to copy"
                  ></div>
                  <span className="ltai-color-code">#4E4B93</span>
                  <span className="ltai-color-name">Primary</span>
                </div>
                <div className="ltai-color-item">
                  <div 
                    className="ltai-color-swatch secondary"
                    onClick={() => copyToClipboard('#F2E7C9', 'Secondary Beige')}
                    title="Click to copy"
                  ></div>
                  <span className="ltai-color-code">#F2E7C9</span>
                  <span className="ltai-color-name">Secondary</span>
                </div>
              </div>
            </div>

            <div className="ltai-section">
              <h4>Open Source</h4>
              <a
                className="ltai-github-link"
                href="https://github.com/ThoBustos/thomasbustos"
                target="_blank"
                rel="noopener noreferrer"
              >
                <VscGithub size={24} />
                <span className="ltai-github-text">
                  {stars !== null ? `${stars} stars` : 'View on GitHub'}
                </span>
              </a>
              <p className="ltai-opensource-desc">
                This site is open source. Fork it!
              </p>
            </div>

            <div className="ltai-section">
              <a
                className="ltai-youtube-link"
                onClick={handleYouTubeClick}
                href="#"
              >
                Watch on YouTube →
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default LTAIBrandWidget;