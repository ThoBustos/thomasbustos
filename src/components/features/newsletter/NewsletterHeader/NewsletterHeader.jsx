import { useState, useEffect } from 'react';
import { VscGithub } from 'react-icons/vsc';
import { FaStar } from 'react-icons/fa';
import { useNavigation } from '../../../../hooks/useNavigation';
import BrandAvatar from '../../brand/BrandAvatar/BrandAvatar';
import ThemeToggle from '../../../ui/ThemeToggle/ThemeToggle';
import SubscriptionModal from '../SubscriptionModal/SubscriptionModal';
import './NewsletterHeader.css';

function NewsletterHeader({ onReturnHome, onThemeChange, linkToIssues = false }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [stars, setStars] = useState(null);
  const navigate = useNavigation();

  // Fetch GitHub stars
  useEffect(() => {
    fetch('https://api.github.com/repos/ThoBustos/ltai-news')
      .then(res => res.json())
      .then(data => setStars(data.stargazers_count))
      .catch(() => setStars(null));
  }, []);

  const handleSubscribe = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <header className="newsletter-main-header">
        <div className="header-left">
          <BrandAvatar
            onClick={onReturnHome}
            size={64}
            className="header-avatar"
          />
          <div
            className={`header-branding ${linkToIssues ? 'header-branding-link' : ''}`}
            onClick={linkToIssues ? () => navigate('/newsletter') : undefined}
            role={linkToIssues ? 'link' : undefined}
            tabIndex={linkToIssues ? 0 : undefined}
          >
            <h1 className="newsletter-title">LTAI Daily News</h1>
            <p className="newsletter-subtitle">Daily AI insights for builders</p>
          </div>
        </div>

        <div className="header-right">
          <a
            href="https://github.com/ThoBustos/ltai-news"
            target="_blank"
            rel="noopener noreferrer"
            className="opensource-tag"
            title="Free & open source - fork it, use it, make it yours!"
          >
            <VscGithub size={20} />
            {stars !== null && (
              <span className="opensource-stars">
                <FaStar size={12} />
                {stars}
              </span>
            )}
          </a>
          <button className="subscribe-button" onClick={handleSubscribe}>
            Subscribe
          </button>
          <ThemeToggle
            onThemeChange={onThemeChange}
            className="header-theme-toggle"
          />
        </div>
      </header>

      <SubscriptionModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </>
  );
}

export default NewsletterHeader;
