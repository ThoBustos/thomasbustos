import './ComingSoon.css';
import ThemeToggle from '../ThemeToggle';

function ComingSoon({ onReturnHome, onThemeChange }) {
  return (
    <div className="coming-soon-page">
      <div className="coming-soon-header">
        <h1 className="brand-title" onClick={onReturnHome}>
          Thomas Bustos
        </h1>
      </div>
      
      <div className="coming-soon-theme-toggle">
        <ThemeToggle onThemeChange={onThemeChange} />
      </div>
      
      <div className="coming-soon-content">
        <h2 className="coming-soon-text">
          Coming Soon...
        </h2>
      </div>
    </div>
  );
}

export default ComingSoon;