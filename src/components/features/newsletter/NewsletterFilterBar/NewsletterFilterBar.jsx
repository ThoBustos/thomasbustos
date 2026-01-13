// src/components/features/newsletter/NewsletterFilterBar/NewsletterFilterBar.jsx
import { useState, useEffect } from 'react';
import './NewsletterFilterBar.css';

function NewsletterFilterBar({
  searchQuery,
  onSearchChange,
  tags, // Array of { tag: string, count: number }
  selectedTags,
  onTagToggle,
  onClearFilters,
  hasActiveFilters
}) {
  const [showAllTags, setShowAllTags] = useState(false);

  // Responsive tag count: 4 on mobile, 8 on desktop
  const [visibleTagCount, setVisibleTagCount] = useState(8);

  useEffect(() => {
    const handleResize = () => {
      setVisibleTagCount(window.innerWidth < 768 ? 4 : 8);
    };
    handleResize(); // Set initial value
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const visibleTags = showAllTags ? tags : tags.slice(0, visibleTagCount);
  const hasMoreTags = tags.length > visibleTagCount;

  return (
    <div className="newsletter-filter-bar">
      <div className="filter-search">
        <span className="search-icon">🔍</span>
        <input
          type="text"
          placeholder="Search issues..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
        />
        {searchQuery && (
          <button
            className="clear-search"
            onClick={() => onSearchChange('')}
            aria-label="Clear search"
          >
            ×
          </button>
        )}
      </div>

      {tags.length > 0 && (
        <div className="filter-tags">
          {visibleTags.map(({ tag, count }) => (
            <button
              key={tag}
              className={`filter-tag ${selectedTags.includes(tag) ? 'selected' : ''}`}
              onClick={() => onTagToggle(tag)}
            >
              {tag}
              <span className="tag-count">{count}</span>
            </button>
          ))}
          {hasMoreTags && (
            <button
              className="show-more"
              onClick={() => setShowAllTags(!showAllTags)}
            >
              {showAllTags ? 'Less' : `+${tags.length - visibleTagCount}`}
            </button>
          )}
          {hasActiveFilters && (
            <button className="clear-all" onClick={onClearFilters}>
              Clear
            </button>
          )}
        </div>
      )}
    </div>
  );
}

export default NewsletterFilterBar;
