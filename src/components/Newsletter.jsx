import { useState, useEffect } from 'react';
import '../Newsletter.css';
import ThemeToggle from '../ThemeToggle';

function Newsletter() {
  const [theme, setTheme] = useState('dark');

  useEffect(() => {
    // Get current theme from localStorage or default to dark
    const savedTheme = localStorage.getItem('theme') || 'dark';
    setTheme(savedTheme);
    document.documentElement.setAttribute('data-theme', savedTheme);
  }, []);

  const handleThemeChange = (newTheme) => {
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
  };

  const handleReturnHome = () => {
    window.navigate('/');
  };

  return (
    <div className="newsletter-coming-soon-page">
      <div className="newsletter-header">
        <h1 className="newsletter-brand-title" onClick={handleReturnHome}>
          Thomas Bustos
        </h1>
      </div>
      
      <div className="newsletter-theme-toggle">
        <ThemeToggle onThemeChange={handleThemeChange} />
      </div>
      
      <div className="newsletter-content">
        <h2 className="newsletter-coming-soon-text">
          Coming Soon...
        </h2>
      </div>
    </div>
  );
}

export default Newsletter;