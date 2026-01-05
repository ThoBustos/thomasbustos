// src/components/ui/HeaderActions/HeaderActions.jsx
import { VscMail } from 'react-icons/vsc';
import ThemeToggle from '../ThemeToggle/ThemeToggle';
import { useNavigation } from '../../../hooks/useNavigation';
import { useNewsletterBadge } from '../../../hooks/useNewsletterBadge';
import './HeaderActions.css';

function HeaderActions({ onThemeChange }) {
  const navigate = useNavigation();
  const { hasUnread, markAsRead } = useNewsletterBadge();

  const handleNewsletterClick = () => {
    markAsRead();
    navigate('/newsletter');
  };

  return (
    <div className="header-actions">
      <button
        className="header-btn newsletter-btn"
        onClick={handleNewsletterClick}
        aria-label="Newsletter"
      >
        <VscMail size={20} />
        {hasUnread && <span className="newsletter-badge" />}
      </button>
      <ThemeToggle onThemeChange={onThemeChange} />
    </div>
  );
}

export default HeaderActions;
