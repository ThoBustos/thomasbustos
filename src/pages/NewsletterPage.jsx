// src/pages/NewsletterPage.jsx
import { useState, useEffect, useMemo } from 'react';
import { useTheme } from '../hooks/useTheme';
import { useNavigation } from '../hooks/useNavigation';
import { useDigests } from '../hooks/useDigests';
import { useWeeklyDigests } from '../hooks/useWeeklyDigests';
import { computeTagsWithCounts } from '../utils/newsletterUtils';
import { digestMatchesSearch, filterTagsByQuery } from '../utils/searchUtils';
import './NewsletterPage.css';
import NewsletterIssueCard from '../components/features/newsletter/NewsletterIssueCard/NewsletterIssueCard';
import WeeklyIssueCard from '../components/features/newsletter/WeeklyIssueCard/WeeklyIssueCard';
import NewsletterHeader from '../components/features/newsletter/NewsletterHeader/NewsletterHeader';
import NewsletterFilterBar from '../components/features/newsletter/NewsletterFilterBar';
import EmptyState from '../components/ui/EmptyState/EmptyState';
import DigestTypeFilter from '../components/features/newsletter/DigestTypeFilter/DigestTypeFilter';

function NewsletterPage() {
  const [theme, setTheme] = useTheme();
  const navigate = useNavigation();
  const { digests, loading: dailyLoading, usingFallback } = useDigests();
  const { weeklyDigests, loading: weeklyLoading } = useWeeklyDigests();
  const [hoveredCard, setHoveredCard] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTags, setSelectedTags] = useState([]);
  const [digestTypeFilter, setDigestTypeFilter] = useState('all');

  const loading = dailyLoading || weeklyLoading;

  // Merge daily and weekly digests into unified timeline sorted by date
  const unifiedDigests = useMemo(() => {
    // Normalize daily digests
    const normalizedDaily = digests.map(d => ({
      ...d,
      digestType: 'daily',
      sortDate: d.publish_date || d.date
    }));

    // Normalize weekly digests
    const normalizedWeekly = weeklyDigests.map(w => ({
      ...w,
      digestType: 'weekly',
      sortDate: w.week_end_date // Sort by end date so it appears after its daily digests
    }));

    // Combine and sort by date descending
    return [...normalizedDaily, ...normalizedWeekly].sort((a, b) => {
      const dateA = new Date(a.sortDate);
      const dateB = new Date(b.sortDate);
      return dateB - dateA;
    });
  }, [digests, weeklyDigests]);

  // Extract tags with counts from all digests
  const allTags = useMemo(() => computeTagsWithCounts(unifiedDigests), [unifiedDigests]);

  // Filter digests based on type, search query, and selected tags
  const filteredDigests = useMemo(() => {
    return unifiedDigests.filter(d => {
      const matchesType = digestTypeFilter === 'all' || d.digestType === digestTypeFilter;
      const matchesSearch = digestMatchesSearch(d, searchQuery);
      const matchesTags = selectedTags.length === 0 ||
        selectedTags.some(tag => (d.keywords || []).includes(tag));
      return matchesType && matchesSearch && matchesTags;
    });
  }, [unifiedDigests, digestTypeFilter, searchQuery, selectedTags]);

  // Filter tags to only show those matching the search query
  const visibleTags = useMemo(() => 
    filterTagsByQuery(allTags, searchQuery),
    [allTags, searchQuery]
  );

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
    if (issue.digestType === 'weekly') {
      navigate(`/newsletter/weekly/${issue.week_start_date}`);
    } else {
      const date = issue.publish_date || issue.date;
      navigate(`/newsletter/${date}`);
    }
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

          <DigestTypeFilter
            selected={digestTypeFilter}
            onChange={setDigestTypeFilter}
          />

          <NewsletterFilterBar
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            tags={visibleTags}
            selectedTags={selectedTags}
            onTagToggle={handleTagToggle}
            onClearFilters={handleClearFilters}
            hasActiveFilters={hasActiveFilters}
          />

          {unifiedDigests.length === 0 ? (
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
                issue.digestType === 'weekly' ? (
                  <WeeklyIssueCard
                    key={`weekly-${issue.id}`}
                    issue={issue}
                    onClick={() => handleIssueClick(issue)}
                    onHover={handleCardHover}
                    isHovered={hoveredCard === issue.id}
                  />
                ) : (
                  <NewsletterIssueCard
                    key={`daily-${issue.id}`}
                    issue={issue}
                    onClick={() => handleIssueClick(issue)}
                    onHover={handleCardHover}
                    isHovered={hoveredCard === issue.id}
                  />
                )
              ))}
            </div>
          )}
        </main>
      </div>
    </div>
  );
}

export default NewsletterPage;
