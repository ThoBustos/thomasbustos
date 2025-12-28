// src/pages/NewsletterPage.jsx
import { useState } from 'react';
import { useTheme } from '../hooks/useTheme';
import { useNavigation } from '../hooks/useNavigation';
import { NEWSLETTER_ISSUES } from '../data/newsletterIssues';
import './NewsletterPage.css';
import NewsletterIssueCard from '../components/features/newsletter/NewsletterIssueCard/NewsletterIssueCard';
import NewsletterHeader from '../components/features/newsletter/NewsletterHeader/NewsletterHeader';

function NewsletterPage() {
  const [theme, setTheme] = useTheme();
  const navigate = useNavigation();
  const [issues] = useState(NEWSLETTER_ISSUES);
  const [hoveredCard, setHoveredCard] = useState(null);

  const handleReturnHome = () => {
    navigate('/');
  };

  const handleIssueClick = (issueId) => {
    // TODO: Navigate to individual issue page
    console.log('Navigate to issue:', issueId);
  };

  const handleCardHover = (issueId) => {
    setHoveredCard(issueId);
  };

  return (
    <div className="newsletter-page">
      <div className="newsletter-layout-container">
        <NewsletterHeader
          onReturnHome={handleReturnHome}
          onThemeChange={setTheme}
        />

        <main className="newsletter-page-content">
          <div className="issues-timeline">
            {issues.map(issue => (
              <NewsletterIssueCard
                key={issue.id}
                issue={issue}
                onClick={() => handleIssueClick(issue.id)}
                onHover={handleCardHover}
                isHovered={hoveredCard === issue.id}
              />
            ))}
          </div>
        </main>
      </div>
    </div>
  );
}

export default NewsletterPage;
