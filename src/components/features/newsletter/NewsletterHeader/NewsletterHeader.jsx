import { useState } from 'react';
import BrandAvatar from '../../brand/BrandAvatar/BrandAvatar';
import ThemeToggle from '../../../ui/ThemeToggle/ThemeToggle';
import SubscriptionModal from '../SubscriptionModal/SubscriptionModal';
import './NewsletterHeader.css';

function NewsletterHeader({ onReturnHome, onThemeChange }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

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
          <div className="header-branding">
            <h1 className="newsletter-title">LTAI Daily News</h1>
            <p className="newsletter-subtitle">Daily AI insights for builders</p>
          </div>
        </div>

        <div className="header-right">
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
