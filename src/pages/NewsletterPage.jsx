// src/pages/NewsletterPage.jsx
import { useState, useEffect, useMemo } from 'react';
import { useTheme } from '../hooks/useTheme';
import { useNavigation } from '../hooks/useNavigation';
import { useDigests } from '../hooks/useDigests';
import './NewsletterPage.css';
import NewsletterIssueCard from '../components/features/newsletter/NewsletterIssueCard/NewsletterIssueCard';
import NewsletterHeader from '../components/features/newsletter/NewsletterHeader/NewsletterHeader';
import NewsletterFilterBar from '../components/features/newsletter/NewsletterFilterBar';
import EmptyState from '../components/ui/EmptyState/EmptyState';

function NewsletterPage() {
  const [theme, setTheme] = useTheme();
  const navigate = useNavigation();
  const { digests, loading, usingFallback } = useDigests();
  const [hoveredCard, setHoveredCard] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTags, setSelectedTags] = useState([]);

  // Extract unique tags from all digests
  const allTags = useMemo(() => {
    const tags = new Set();
    digests.forEach(d => (d.keywords || []).forEach(k => tags.add(k)));
    return Array.from(tags).sort();
  }, [digests]);

  // Filter digests based on search query and selected tags
  const filteredDigests = useMemo(() => {
    return digests.filter(d => {
      const matchesSearch = !searchQuery ||
        d.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        d.content_json?.daily_tldr?.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesTags = selectedTags.length === 0 ||
        selectedTags.every(tag => (d.keywords || []).includes(tag));

      return matchesSearch && matchesTags;
    });
  }, [digests, searchQuery, selectedTags]);

  const hasActiveFilters = searchQuery || selectedTags.length > 0;

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

  const handleTagToggle = (tag) => {
    setSelectedTags(prev =>
      prev.includes(tag)
        ? prev.filter(t => t !== tag)
        : [...prev, tag]
    );
  };

  const handleClearFilters = () => {
    setSearchQuery('');
    setSelectedTags([]);
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

          <NewsletterFilterBar
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            tags={allTags}
            selectedTags={selectedTags}
            onTagToggle={handleTagToggle}
            onClearFilters={handleClearFilters}
            hasActiveFilters={hasActiveFilters}
          />

          {digests.length === 0 ? (
            <EmptyState
              title="No digests yet"
              description="Check back soon for daily AI insights"
            />
          ) : filteredDigests.length === 0 && hasActiveFilters ? (
            <div className="no-results">
              <p>No issues match your filters</p>
              <button onClick={handleClearFilters}>Clear filters</button>
            </div>
          ) : (
            <div className="issues-timeline">
              {filteredDigests.map(issue => (
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
