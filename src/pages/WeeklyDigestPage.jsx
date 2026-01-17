// src/pages/WeeklyDigestPage.jsx
import { useEffect } from 'react';
import { useWeeklyDigest } from '../hooks/useWeeklyDigests';
import { useTheme } from '../hooks/useTheme';
import { useNavigation } from '../hooks/useNavigation';
import WeeklyDigestContent from '../components/features/newsletter/WeeklyDigestContent/WeeklyDigestContent';
import NewsletterHeader from '../components/features/newsletter/NewsletterHeader/NewsletterHeader';
import './DigestDetailPage.css';

function WeeklyDigestPage({ weekStart }) {
  const { weeklyDigest, loading, error } = useWeeklyDigest(weekStart);
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
            <div className="digest-loading">Loading weekly digest...</div>
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
              <h2>Weekly digest not found</h2>
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
          <WeeklyDigestContent digest={weeklyDigest} />
        </main>
      </div>
    </div>
  );
}

export default WeeklyDigestPage;
