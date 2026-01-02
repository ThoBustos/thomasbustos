// src/pages/DigestDetailPage.jsx
import { useEffect } from 'react';
import { useDigest } from '../hooks/useDigests';
import { useTheme } from '../hooks/useTheme';
import { useNavigation } from '../hooks/useNavigation';
import DigestContent from '../components/features/newsletter/DigestContent/DigestContent';
import NewsletterHeader from '../components/features/newsletter/NewsletterHeader/NewsletterHeader';
import './DigestDetailPage.css';

function DigestDetailPage({ date }) {
  const { digest, loading, error } = useDigest(date);
  const [theme, setTheme] = useTheme();
  const navigate = useNavigation();

  // Fix mobile scrolling by adding class to body
  useEffect(() => {
    document.body.classList.add('newsletter-page');
    return () => {
      document.body.classList.remove('newsletter-page');
    };
  }, []);

  const handleReturnHome = () => {
    navigate('/');
  };

  const handleBackToArchive = () => {
    navigate('/newsletter');
  };

  if (loading) {
    return (
      <div className="digest-detail-page">
        <div className="digest-layout-container">
          <NewsletterHeader
            onReturnHome={handleReturnHome}
            onThemeChange={setTheme}
            linkToIssues
          />
          <main className="digest-page-content">
            <div className="digest-loading">Loading digest...</div>
          </main>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="digest-detail-page">
        <div className="digest-layout-container">
          <NewsletterHeader
            onReturnHome={handleReturnHome}
            onThemeChange={setTheme}
            linkToIssues
          />
          <main className="digest-page-content">
            <div className="digest-error">
              <h2>Digest not found</h2>
              <p>{error.message}</p>
              <span className="back-link" onClick={handleBackToArchive}>
                ← All Issues
              </span>
            </div>
          </main>
        </div>
      </div>
    );
  }

  return (
    <div className="digest-detail-page">
      <div className="digest-layout-container">
        <NewsletterHeader
          onReturnHome={handleReturnHome}
          onThemeChange={setTheme}
          linkToIssues
        />
        <main className="digest-page-content">
          <span className="back-link" onClick={handleBackToArchive}>
            ← All Issues
          </span>
          <DigestContent digest={digest} />
        </main>
      </div>
    </div>
  );
}

export default DigestDetailPage;
