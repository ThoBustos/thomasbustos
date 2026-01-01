// src/pages/NewsletterPage.jsx
import { useState, useEffect } from 'react';
import { useTheme } from '../hooks/useTheme';
import { useNavigation } from '../hooks/useNavigation';
import { useDigests } from '../hooks/useDigests';
import './NewsletterPage.css';
import NewsletterIssueCard from '../components/features/newsletter/NewsletterIssueCard/NewsletterIssueCard';
import NewsletterHeader from '../components/features/newsletter/NewsletterHeader/NewsletterHeader';
import EmptyState from '../components/ui/EmptyState/EmptyState';

function NewsletterPage() {
  const [theme, setTheme] = useTheme();
  const navigate = useNavigation();
  const { digests, loading, usingFallback } = useDigests();
  const [hoveredCard, setHoveredCard] = useState(null);

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

  const handleIssueClick = (issue) => {
    // Navigate to digest detail page using publish_date (Supabase) or date (mock)
    const date = issue.publish_date || issue.date;
    navigate(`/newsletter/${date}`);
  };

  const handleCardHover = (issueId) => {
    setHoveredCard(issueId);
  };

  if (loading) {
    return (
      <div className="newsletter-page">
        <div className="newsletter-layout-container">
          <NewsletterHeader
            onReturnHome={handleReturnHome}
            onThemeChange={setTheme}
          />
          <main className="newsletter-page-content">
            <div className="newsletter-loading">Loading digests...</div>
          </main>
        </div>
      </div>
    );
  }

  return (
    <div className="newsletter-page">
      <div className="newsletter-layout-container">
        <NewsletterHeader
          onReturnHome={handleReturnHome}
          onThemeChange={setTheme}
        />

        <main className="newsletter-page-content">
          {usingFallback && (
            <div className="fallback-notice">Showing cached data</div>
          )}
          {digests.length === 0 ? (
            <EmptyState
              title="No digests yet"
              description="Check back soon for daily AI insights"
            />
          ) : (
            <div className="issues-timeline">
              {digests.map(issue => (
                <NewsletterIssueCard
                  key={issue.id}
                  issue={issue}
                  onClick={() => handleIssueClick(issue)}
                  onHover={handleCardHover}
                  isHovered={hoveredCard === issue.id}
                />
              ))}
            </div>
          )}
        </main>
      </div>
    </div>
  );
}

export default NewsletterPage;
