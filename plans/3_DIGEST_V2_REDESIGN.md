# Digest Detail Page V2 Redesign

## Overview

Complete redesign of the DigestDetailPage to properly render V2 digest data structure, align with the app's design system, and provide a clean, progressive disclosure UX for consuming daily AI digests.

**Problem Statement:**
1. Current implementation maps V1 data fields that no longer exist in V2
2. Rich V2 fields (quotes, statistics, frameworks, deep analysis) are never rendered
3. Styling uses hardcoded colors that break the theme system
4. Layout patterns differ from other pages in the app
5. UX doesn't support scanning vs. deep reading modes

**Solution:**
- Native V2 data consumption (no transformation layer)
- Collapsible video sections for progressive disclosure
- Consistent styling using only CSS variables
- Shared layout patterns with NewsletterPage

---

## Table of Contents

1. [V2 Data Structure Reference](#v2-data-structure-reference)
2. [Design System Rules](#design-system-rules)
3. [Architecture Changes](#architecture-changes)
4. [Files to Create](#files-to-create)
5. [Files to Modify](#files-to-modify)
6. [Files to Delete](#files-to-delete)
7. [Implementation Steps](#implementation-steps)
8. [Component Specifications](#component-specifications)
9. [Testing Checklist](#testing-checklist)

---

## V2 Data Structure Reference

### Root Level Fields

```javascript
{
  // Database fields
  id: "uuid",
  publish_date: "2025-12-29",
  title: "Clean title without emoji",
  description: "Brief description",
  
  // Rendered formats (from backend)
  formatted_html: "...",      // Pre-rendered HTML
  formatted_markdown: "...",  // Pre-rendered Markdown
  
  // Structured data (what we'll use)
  content_json: {
    title: "...",
    stats: {
      video_count: 5,
      estimated_read_minutes: 10,
      total_duration_minutes: 334,
      channels: [
        { channel_id, channel_name, video_count, thumbnail_url }
      ]
    },
    table_of_contents: [
      { id: "overview", title: "Overview" },
      { id: "video-slug", title: "Video Title" },
      // ...
    ],
    daily_tldr: "Multi-paragraph overview...",
    keywords: ["LLM Memory", "LoRA", "..."],
    
    video_sections: [
      {
        title: "Video Title",
        video_id: "youtube-id",
        video_url: "https://youtube.com/watch?v=...",
        channel_name: "Channel Name",
        speakers: ["Speaker 1", "Speaker 2"],
        duration_minutes: 62,
        tags: ["Tag1", "Tag2"],
        
        // Summary content
        condensed_summary: "2-3 sentence summary",
        structure_overview: "What the video covers",
        
        // Rich content (V2 additions)
        key_quotes: [
          "Direct quote from video...",
          "Another quote..."
        ],
        frameworks_mentioned: [
          "Framework Name 1",
          "Framework Name 2"
        ],
        key_statistics: [
          "130 tokens per second: Description",
          "91% accuracy: Context"
        ],
        key_analogies: [
          "Analogy description 1",
          "Analogy description 2"
        ],
        deep_analysis: "Multi-paragraph deep dive...",
        connections: [
          "How this relates to other videos..."
        ]
      }
    ],
    
    contrarian_corner: {
      insight: "The counterintuitive take",
      conventional_wisdom: "What most people think",
      evidence: "Why the contrarian view might be right"
    },
    
    action_items: [
      {
        action: "What to do",
        context: "Why and how",
        difficulty: "quick" | "medium" | "deep-dive"
      }
    ],
    
    references: {
      books: ["Book 1", "Book 2"],
      papers: ["Paper 1"],
      frameworks: ["Framework 1"],
      tools: ["Tool 1"]
    },
    
    conclusion: "Closing thought..."
  }
}
```

### V1 Fields NO LONGER PRESENT (Remove All References)

| V1 Field | Status |
|----------|--------|
| `title_emoji` | Removed |
| `highest_signal_hook` | Replaced by `condensed_summary` |
| `golden_nuggets` | Replaced by `key_quotes`, `key_statistics` |
| `key_insights` | Replaced by `deep_analysis`, `connections` |
| `thumbnail_url` (in video_sections) | Removed |

---

## Design System Rules

### Color Palette (ONLY CSS Variables)

```css
/* Primary colors - ONLY use these */
--bg-color           /* Page background */
--text-primary       /* Main text */
--bio-bg             /* Card backgrounds */
--bio-text           /* Card text */
--social-border      /* Borders */
--social-bg          /* Button/tag backgrounds */
--social-text        /* Button/tag text */
--social-hover-bg    /* Hover state background */
--social-hover-text  /* Hover state text */
--title-shadow       /* Box shadows */
--accent-primary     /* Accent color */
--accent-secondary   /* Secondary accent */
--card-bg            /* Glass card background */
--card-border        /* Glass card border */
--card-shadow        /* Glass card shadow */
```

**BANNED:** Any hardcoded hex colors (e.g., `#fef3c7`, `#f59e0b`, `#92400e`)

### Typography

| Element | Font Family | Size | Weight |
|---------|-------------|------|--------|
| Page title | Poppins | `clamp(1.5rem, 4vw, 2rem)` | 700-800 |
| Section headers | Poppins | `1.25rem` | 600 |
| Video titles | Poppins | `1.125rem` | 600 |
| Body text | Manrope | `1rem` / `15px` | 400-500 |
| Meta text | Manrope | `0.875rem` | 600 |
| Tags/pills | Manrope | `0.75rem` | 500-600 |

### Component Patterns

**Solid Card (Primary):**
```css
.solid-card {
  background: var(--bio-bg);
  border: 1px solid var(--social-border);
  border-radius: 16px;
  box-shadow: 6px 6px 0px var(--title-shadow);
  padding: 1.5rem;
}
```

**Glass Card (Secondary):**
```css
.glass-card {
  background: var(--card-bg);
  backdrop-filter: blur(12px);
  border: 1px solid var(--card-border);
  border-radius: 16px;
  box-shadow: 0 4px 20px var(--card-shadow);
}
```

**Tag/Pill:**
```css
.tag-pill {
  background: var(--social-bg);
  border: 1px solid var(--social-border);
  color: var(--social-text);
  padding: 0.25rem 0.75rem;
  border-radius: 20px;
  font-size: 0.75rem;
  font-weight: 600;
}
```

**Quote Block:**
```css
.quote-block {
  background: var(--card-bg);
  border-left: 3px solid var(--accent-primary);
  padding: 1rem 1.25rem;
  border-radius: 0 8px 8px 0;
  font-style: italic;
  color: var(--bio-text);
}
```

**Difficulty Badge:**
```css
.difficulty-badge {
  font-size: 0.7rem;
  padding: 0.2rem 0.6rem;
  border-radius: 12px;
  font-weight: 600;
  text-transform: capitalize;
}
.difficulty-quick {
  background: var(--social-hover-bg);
  color: var(--social-hover-text);
}
.difficulty-medium {
  background: var(--card-bg);
  border: 1px solid var(--social-border);
  color: var(--bio-text);
}
.difficulty-deep-dive {
  background: var(--accent-primary);
  color: var(--bio-bg);
}
```

### Layout Rules

```css
/* Page container */
.digest-page {
  height: 100vh;
  background-color: var(--bg-color);
  overflow: hidden;
}

/* Layout grid (matches NewsletterPage) */
.digest-layout-container {
  display: grid;
  grid-template-rows: auto 1fr;
  height: 100vh;
  width: 100%;
  overflow-y: auto;
  scroll-behavior: smooth;
}

/* Content width */
.digest-page-content {
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem 1.5rem 4rem;
  width: 100%;
}
```

---

## Architecture Changes

### Before

```
src/components/features/newsletter/
├── DigestContent/
│   ├── DigestContent.jsx      # Parses + maps V1 data + renders all
│   ├── DigestContent.css      # Hardcoded colors, mixed patterns
│   ├── DigestHeader.jsx       # Expects V1 fields
│   ├── VideoSection.jsx       # Expects transformed V1 data
│   ├── ContrarianCorner.jsx   # V1 structure
│   ├── ActionItems.jsx        # Works (V2 compatible)
│   └── ReferencesIndex.jsx    # Works (V2 compatible)

src/pages/
├── DigestDetailPage.jsx       # Different layout than NewsletterPage
└── DigestDetailPage.css       # Inconsistent with NewsletterPage.css
```

### After

```
src/components/features/newsletter/
├── DigestContent/
│   ├── DigestContent.jsx      # REWRITE: V2 native, no mapping
│   ├── DigestContent.css      # REWRITE: Only CSS variables
│   ├── DigestHeader.jsx       # REWRITE: V2 fields + stats bar + TOC
│   ├── VideoCard.jsx          # NEW: Collapsible, V2 native
│   ├── VideoCard.css          # NEW: Collapsible styling
│   ├── QuoteBlock.jsx         # NEW: Reusable quote component
│   ├── StatsList.jsx          # NEW: Key statistics display
│   ├── TagPills.jsx           # NEW: Reusable tag/keyword pills
│   ├── ContrarianCorner.jsx   # UPDATE: V2 fields
│   ├── ActionItems.jsx        # KEEP: Already V2 compatible
│   └── ReferencesIndex.jsx    # UPDATE: V2 structure
│
├── shared/                     # NEW: Shared primitives
│   └── Collapsible/
│       ├── Collapsible.jsx    # NEW: Reusable expand/collapse
│       └── Collapsible.css

src/pages/
├── DigestDetailPage.jsx       # UPDATE: Match NewsletterPage layout
└── DigestDetailPage.css       # UPDATE: Align with NewsletterPage.css
```

---

## Files to Create

### 1. `src/components/features/newsletter/shared/Collapsible/Collapsible.jsx`

Reusable collapsible section component.

```jsx
import { useState } from 'react';
import './Collapsible.css';

function Collapsible({ 
  title, 
  subtitle,
  defaultOpen = false, 
  children,
  className = ''
}) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div className={`collapsible ${isOpen ? 'is-open' : ''} ${className}`}>
      <button 
        className="collapsible-header"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
      >
        <div className="collapsible-title-group">
          <span className="collapsible-title">{title}</span>
          {subtitle && <span className="collapsible-subtitle">{subtitle}</span>}
        </div>
        <span className="collapsible-icon">{isOpen ? '−' : '+'}</span>
      </button>
      {isOpen && (
        <div className="collapsible-content">
          {children}
        </div>
      )}
    </div>
  );
}

export default Collapsible;
```

### 2. `src/components/features/newsletter/shared/Collapsible/Collapsible.css`

```css
.collapsible {
  border: 1px solid var(--card-border);
  border-radius: 12px;
  overflow: hidden;
  background: var(--card-bg);
  backdrop-filter: blur(12px);
  transition: all 0.2s ease;
}

.collapsible.is-open {
  border-color: var(--social-border);
}

.collapsible-header {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 1.25rem;
  background: transparent;
  border: none;
  cursor: pointer;
  text-align: left;
  color: var(--bio-text);
  transition: background 0.2s ease;
}

.collapsible-header:hover {
  background: var(--card-bg);
}

.collapsible-title-group {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.collapsible-title {
  font-family: 'Poppins', sans-serif;
  font-size: 1rem;
  font-weight: 600;
  color: var(--bio-text);
}

.collapsible-subtitle {
  font-size: 0.8rem;
  color: var(--bio-text);
  opacity: 0.7;
}

.collapsible-icon {
  font-size: 1.25rem;
  font-weight: 300;
  color: var(--accent-primary);
  width: 24px;
  text-align: center;
}

.collapsible-content {
  padding: 0 1.25rem 1.25rem;
  animation: fadeIn 0.2s ease;
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

/* Mobile */
@media (max-width: 768px) {
  .collapsible-header {
    padding: 0.875rem 1rem;
  }
  
  .collapsible-content {
    padding: 0 1rem 1rem;
  }
}
```

### 3. `src/components/features/newsletter/DigestContent/VideoCard.jsx`

Collapsible video section that reads V2 data natively.

```jsx
import Collapsible from '../shared/Collapsible/Collapsible';
import QuoteBlock from './QuoteBlock';
import StatsList from './StatsList';
import TagPills from './TagPills';
import './VideoCard.css';

function VideoCard({ video, defaultOpen = false }) {
  const subtitle = `${video.channel_name} · ${video.duration_minutes} min`;
  
  return (
    <Collapsible 
      title={video.title}
      subtitle={subtitle}
      defaultOpen={defaultOpen}
      className="video-card"
    >
      <div className="video-card-content">
        {/* Header with link and speakers */}
        <div className="video-card-header">
          {video.video_url && (
            <a 
              href={video.video_url} 
              target="_blank" 
              rel="noopener noreferrer"
              className="video-link"
            >
              Watch on YouTube
            </a>
          )}
          {video.speakers?.length > 0 && (
            <span className="video-speakers">
              Speakers: {video.speakers.join(', ')}
            </span>
          )}
        </div>

        {/* Tags */}
        {video.tags?.length > 0 && (
          <TagPills tags={video.tags} className="video-tags" />
        )}

        {/* Summary */}
        <div className="video-summary">
          <p className="video-condensed">{video.condensed_summary}</p>
          {video.structure_overview && (
            <p className="video-structure">{video.structure_overview}</p>
          )}
        </div>

        {/* Key Quotes */}
        {video.key_quotes?.length > 0 && (
          <div className="video-quotes">
            <h4>Key Quotes</h4>
            {video.key_quotes.map((quote, i) => (
              <QuoteBlock key={i} quote={quote} />
            ))}
          </div>
        )}

        {/* Frameworks */}
        {video.frameworks_mentioned?.length > 0 && (
          <div className="video-frameworks">
            <h4>Frameworks Mentioned</h4>
            <TagPills tags={video.frameworks_mentioned} variant="outline" />
          </div>
        )}

        {/* Statistics */}
        {video.key_statistics?.length > 0 && (
          <StatsList stats={video.key_statistics} title="Key Statistics" />
        )}

        {/* Analogies */}
        {video.key_analogies?.length > 0 && (
          <div className="video-analogies">
            <h4>Key Analogies</h4>
            <ul>
              {video.key_analogies.map((analogy, i) => (
                <li key={i}>{analogy}</li>
              ))}
            </ul>
          </div>
        )}

        {/* Deep Analysis */}
        {video.deep_analysis && (
          <div className="video-deep-analysis">
            <h4>Deep Analysis</h4>
            <p>{video.deep_analysis}</p>
          </div>
        )}

        {/* Connections */}
        {video.connections?.length > 0 && (
          <div className="video-connections">
            <h4>Connections</h4>
            <ul>
              {video.connections.map((connection, i) => (
                <li key={i}>{connection}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </Collapsible>
  );
}

export default VideoCard;
```

### 4. `src/components/features/newsletter/DigestContent/VideoCard.css`

```css
.video-card {
  margin-bottom: 1rem;
}

.video-card-content {
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
}

.video-card-header {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 1rem;
}

.video-link {
  color: var(--accent-primary);
  font-size: 0.875rem;
  font-weight: 600;
  text-decoration: none;
  transition: opacity 0.2s ease;
}

.video-link:hover {
  opacity: 0.8;
  text-decoration: underline;
}

.video-speakers {
  font-size: 0.8rem;
  color: var(--bio-text);
  opacity: 0.7;
}

.video-tags {
  margin-top: -0.5rem;
}

.video-summary {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.video-condensed {
  font-size: 1rem;
  line-height: 1.7;
  color: var(--bio-text);
  margin: 0;
}

.video-structure {
  font-size: 0.9rem;
  line-height: 1.6;
  color: var(--bio-text);
  opacity: 0.8;
  margin: 0;
}

.video-quotes,
.video-frameworks,
.video-analogies,
.video-deep-analysis,
.video-connections {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.video-card h4 {
  font-size: 0.8rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: var(--bio-text);
  opacity: 0.7;
  margin: 0;
}

.video-analogies ul,
.video-connections ul {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.video-analogies li,
.video-connections li {
  position: relative;
  padding-left: 1.25rem;
  font-size: 0.9rem;
  line-height: 1.5;
  color: var(--bio-text);
}

.video-analogies li::before,
.video-connections li::before {
  content: '→';
  position: absolute;
  left: 0;
  color: var(--accent-primary);
}

.video-deep-analysis p {
  font-size: 0.95rem;
  line-height: 1.7;
  color: var(--bio-text);
  margin: 0;
  white-space: pre-line;
}

/* Mobile */
@media (max-width: 768px) {
  .video-card-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.5rem;
  }
}
```

### 5. `src/components/features/newsletter/DigestContent/QuoteBlock.jsx`

```jsx
import './QuoteBlock.css';

function QuoteBlock({ quote }) {
  return (
    <blockquote className="quote-block">
      "{quote}"
    </blockquote>
  );
}

export default QuoteBlock;
```

### 6. `src/components/features/newsletter/DigestContent/QuoteBlock.css`

```css
.quote-block {
  background: var(--card-bg);
  border-left: 3px solid var(--accent-primary);
  padding: 0.875rem 1rem;
  margin: 0;
  border-radius: 0 8px 8px 0;
  font-style: italic;
  font-size: 0.95rem;
  line-height: 1.6;
  color: var(--bio-text);
}

/* Multiple quotes */
.quote-block + .quote-block {
  margin-top: 0.5rem;
}
```

### 7. `src/components/features/newsletter/DigestContent/StatsList.jsx`

```jsx
import './StatsList.css';

function StatsList({ stats, title }) {
  return (
    <div className="stats-list">
      {title && <h4>{title}</h4>}
      <ul>
        {stats.map((stat, i) => {
          // Parse "130 tokens per second: Description" format
          const colonIndex = stat.indexOf(':');
          const number = colonIndex > 0 ? stat.substring(0, colonIndex) : stat;
          const description = colonIndex > 0 ? stat.substring(colonIndex + 1).trim() : '';
          
          return (
            <li key={i}>
              <span className="stat-number">{number}</span>
              {description && <span className="stat-description">{description}</span>}
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default StatsList;
```

### 8. `src/components/features/newsletter/DigestContent/StatsList.css`

```css
.stats-list h4 {
  font-size: 0.8rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: var(--bio-text);
  opacity: 0.7;
  margin: 0 0 0.75rem 0;
}

.stats-list ul {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.stats-list li {
  display: flex;
  flex-direction: column;
  gap: 0.125rem;
}

.stat-number {
  font-size: 0.95rem;
  font-weight: 700;
  color: var(--accent-primary);
}

.stat-description {
  font-size: 0.85rem;
  color: var(--bio-text);
  opacity: 0.8;
}
```

### 9. `src/components/features/newsletter/DigestContent/TagPills.jsx`

```jsx
import './TagPills.css';

function TagPills({ tags, variant = 'filled', className = '' }) {
  return (
    <div className={`tag-pills ${variant} ${className}`}>
      {tags.map((tag, i) => (
        <span key={i} className="tag-pill">
          {variant === 'filled' ? `#${tag}` : tag}
        </span>
      ))}
    </div>
  );
}

export default TagPills;
```

### 10. `src/components/features/newsletter/DigestContent/TagPills.css`

```css
.tag-pills {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.tag-pills .tag-pill {
  font-size: 0.75rem;
  font-weight: 600;
  padding: 0.25rem 0.75rem;
  border-radius: 20px;
  transition: all 0.2s ease;
}

/* Filled variant (default) */
.tag-pills.filled .tag-pill {
  background: var(--social-bg);
  border: 1px solid var(--social-border);
  color: var(--social-text);
}

/* Outline variant */
.tag-pills.outline .tag-pill {
  background: transparent;
  border: 1px solid var(--social-border);
  color: var(--bio-text);
}

/* Mobile */
@media (max-width: 768px) {
  .tag-pills .tag-pill {
    font-size: 0.7rem;
    padding: 0.2rem 0.6rem;
  }
}
```

---

## Files to Modify

### 1. `src/components/features/newsletter/DigestContent/DigestContent.jsx`

**Change:** Complete rewrite to consume V2 data natively.

```jsx
// src/components/features/newsletter/DigestContent/DigestContent.jsx
import DigestHeader from './DigestHeader';
import VideoCard from './VideoCard';
import ContrarianCorner from './ContrarianCorner';
import ActionItems from './ActionItems';
import ReferencesIndex from './ReferencesIndex';
import './DigestContent.css';

function DigestContent({ digest }) {
  // Parse content_json if it's a string
  const content = typeof digest?.content_json === 'string' 
    ? JSON.parse(digest.content_json) 
    : digest?.content_json;

  if (!content) {
    return <div className="digest-content-empty">No content available</div>;
  }

  return (
    <article className="digest-content">
      {/* Header with title, date, stats, TOC */}
      <DigestHeader
        title={digest.title}
        publishDate={digest.publish_date}
        stats={content.stats}
        tableOfContents={content.table_of_contents}
        keywords={content.keywords}
      />

      {/* Overview / Daily TL;DR */}
      {content.daily_tldr && (
        <section id="overview" className="digest-overview">
          <h2>Overview</h2>
          <p>{content.daily_tldr}</p>
        </section>
      )}

      {/* Video Sections */}
      {content.video_sections?.length > 0 && (
        <section className="digest-videos">
          <h2>Video Breakdowns</h2>
          {content.video_sections.map((video, index) => (
            <VideoCard 
              key={video.video_id || index} 
              video={video}
              defaultOpen={index === 0} // First video expanded by default
            />
          ))}
        </section>
      )}

      {/* Contrarian Corner */}
      {content.contrarian_corner && (
        <ContrarianCorner data={content.contrarian_corner} />
      )}

      {/* Action Items */}
      {content.action_items?.length > 0 && (
        <ActionItems items={content.action_items} />
      )}

      {/* References */}
      {content.references && (
        <ReferencesIndex references={content.references} />
      )}

      {/* Conclusion */}
      {content.conclusion && (
        <section className="digest-conclusion">
          <h2>Final Thought</h2>
          <p>{content.conclusion}</p>
        </section>
      )}
    </article>
  );
}

export default DigestContent;
```

### 2. `src/components/features/newsletter/DigestContent/DigestContent.css`

**Change:** Complete rewrite using only CSS variables.

```css
/* DigestContent.css - V2 Redesign */

.digest-content {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.digest-content-empty {
  text-align: center;
  padding: 4rem 2rem;
  color: var(--bio-text);
  opacity: 0.7;
  font-size: 1rem;
}

/* Section Headers */
.digest-content h2 {
  font-family: 'Poppins', sans-serif;
  font-size: 1.25rem;
  font-weight: 600;
  color: var(--bio-text);
  margin: 0 0 1rem 0;
  padding-bottom: 0.5rem;
  border-bottom: 1px solid var(--social-border);
}

/* Overview Section */
.digest-overview {
  background: var(--bio-bg);
  border: 1px solid var(--social-border);
  border-radius: 16px;
  box-shadow: 6px 6px 0px var(--title-shadow);
  padding: 1.5rem;
}

.digest-overview p {
  font-size: 1rem;
  line-height: 1.8;
  color: var(--bio-text);
  margin: 0;
  white-space: pre-line;
}

/* Videos Section */
.digest-videos {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.digest-videos h2 {
  border-bottom: none;
  margin-bottom: 0.5rem;
}

/* Conclusion Section */
.digest-conclusion {
  background: var(--card-bg);
  border-radius: 16px;
  padding: 1.5rem;
  text-align: center;
}

.digest-conclusion h2 {
  border-bottom: none;
  text-align: center;
}

.digest-conclusion p {
  font-size: 1.1rem;
  line-height: 1.7;
  color: var(--bio-text);
  font-style: italic;
  margin: 0;
}

/* Mobile */
@media (max-width: 768px) {
  .digest-content {
    gap: 1.5rem;
  }

  .digest-overview {
    padding: 1.25rem;
  }

  .digest-content h2 {
    font-size: 1.125rem;
  }
}
```

### 3. `src/components/features/newsletter/DigestContent/DigestHeader.jsx`

**Change:** Complete rewrite for V2 fields.

```jsx
// src/components/features/newsletter/DigestContent/DigestHeader.jsx
import TagPills from './TagPills';
import './DigestHeader.css';

function DigestHeader({ title, publishDate, stats, tableOfContents, keywords }) {
  const formatDate = (dateStr) => {
    return new Date(dateStr).toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <header className="digest-header">
      <h1 className="digest-title">{title}</h1>
      <p className="digest-date">{formatDate(publishDate)}</p>
      
      {/* Stats Bar */}
      {stats && (
        <div className="digest-stats-bar">
          <span className="stat-item">
            <strong>{stats.video_count}</strong> videos
          </span>
          <span className="stat-divider">|</span>
          <span className="stat-item">
            <strong>{stats.total_duration_minutes}</strong> min watch time
          </span>
          <span className="stat-divider">|</span>
          <span className="stat-item">
            <strong>{stats.estimated_read_minutes}</strong> min read
          </span>
        </div>
      )}

      {/* Source Channels */}
      {stats?.channels?.length > 0 && (
        <p className="digest-sources">
          Sources: {stats.channels.map(c => `${c.channel_name} (${c.video_count})`).join(', ')}
        </p>
      )}

      {/* Table of Contents */}
      {tableOfContents?.length > 0 && (
        <nav className="digest-toc">
          <h4>Contents</h4>
          <ol>
            {tableOfContents.map((item, i) => (
              <li key={i}>
                <a href={`#${item.id}`}>{item.title}</a>
              </li>
            ))}
          </ol>
        </nav>
      )}

      {/* Keywords */}
      {keywords?.length > 0 && (
        <TagPills tags={keywords} className="digest-keywords" />
      )}
    </header>
  );
}

export default DigestHeader;
```

### 4. `src/components/features/newsletter/DigestContent/DigestHeader.css` (NEW FILE)

```css
/* DigestHeader.css */

.digest-header {
  text-align: center;
  padding-bottom: 1.5rem;
  border-bottom: 1px solid var(--social-border);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
}

.digest-title {
  font-family: 'Poppins', sans-serif;
  font-size: clamp(1.5rem, 4vw, 2rem);
  font-weight: 700;
  color: var(--bio-text);
  line-height: 1.3;
  margin: 0;
}

.digest-date {
  font-size: 0.9rem;
  color: var(--bio-text);
  opacity: 0.7;
  margin: 0;
}

.digest-stats-bar {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  gap: 0.75rem;
  background: var(--card-bg);
  padding: 0.75rem 1.25rem;
  border-radius: 8px;
  font-size: 0.875rem;
  color: var(--bio-text);
}

.stat-item strong {
  color: var(--accent-primary);
}

.stat-divider {
  opacity: 0.4;
}

.digest-sources {
  font-size: 0.8rem;
  color: var(--bio-text);
  opacity: 0.6;
  font-style: italic;
  margin: 0;
  text-align: center;
}

.digest-toc {
  width: 100%;
  max-width: 400px;
  background: var(--card-bg);
  padding: 1rem 1.25rem;
  border-radius: 8px;
  text-align: left;
}

.digest-toc h4 {
  font-size: 0.75rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: var(--bio-text);
  opacity: 0.6;
  margin: 0 0 0.75rem 0;
}

.digest-toc ol {
  margin: 0;
  padding-left: 1.25rem;
  display: flex;
  flex-direction: column;
  gap: 0.375rem;
}

.digest-toc li {
  font-size: 0.875rem;
}

.digest-toc a {
  color: var(--accent-primary);
  text-decoration: none;
  transition: opacity 0.2s ease;
}

.digest-toc a:hover {
  opacity: 0.8;
  text-decoration: underline;
}

.digest-keywords {
  justify-content: center;
}

/* Mobile */
@media (max-width: 768px) {
  .digest-header {
    gap: 0.75rem;
  }

  .digest-stats-bar {
    flex-direction: column;
    gap: 0.5rem;
    padding: 0.625rem 1rem;
  }

  .stat-divider {
    display: none;
  }

  .digest-toc {
    max-width: 100%;
  }
}
```

### 5. `src/components/features/newsletter/DigestContent/ContrarianCorner.jsx`

**Change:** Update for V2 field names.

```jsx
// src/components/features/newsletter/DigestContent/ContrarianCorner.jsx
import './ContrarianCorner.css';

function ContrarianCorner({ data }) {
  return (
    <aside className="contrarian-corner">
      <h3>Contrarian Corner</h3>
      {data.insight && (
        <div className="contrarian-insight">
          <strong>Insight:</strong>
          <p>{data.insight}</p>
        </div>
      )}
      {data.conventional_wisdom && (
        <div className="contrarian-conventional">
          <strong>Conventional Wisdom:</strong>
          <p>{data.conventional_wisdom}</p>
        </div>
      )}
      {data.evidence && (
        <div className="contrarian-evidence">
          <strong>Evidence:</strong>
          <p>{data.evidence}</p>
        </div>
      )}
      {/* Legacy V1 fields fallback */}
      {data.claim && !data.insight && (
        <div className="contrarian-insight">
          <strong>Claim:</strong>
          <p>{data.claim}</p>
        </div>
      )}
      {data.verdict && (
        <div className="contrarian-verdict">
          <strong>Verdict:</strong>
          <p>{data.verdict}</p>
        </div>
      )}
    </aside>
  );
}

export default ContrarianCorner;
```

### 6. `src/components/features/newsletter/DigestContent/ContrarianCorner.css` (NEW FILE)

```css
/* ContrarianCorner.css */

.contrarian-corner {
  background: var(--accent-primary);
  color: var(--bio-bg);
  padding: 1.5rem;
  border-radius: 16px;
}

.contrarian-corner h3 {
  font-family: 'Poppins', sans-serif;
  font-size: 1.125rem;
  font-weight: 700;
  margin: 0 0 1rem 0;
}

.contrarian-insight,
.contrarian-conventional,
.contrarian-evidence,
.contrarian-verdict {
  margin-bottom: 1rem;
}

.contrarian-insight:last-child,
.contrarian-conventional:last-child,
.contrarian-evidence:last-child,
.contrarian-verdict:last-child {
  margin-bottom: 0;
}

.contrarian-corner strong {
  display: block;
  font-size: 0.7rem;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  opacity: 0.8;
  margin-bottom: 0.25rem;
}

.contrarian-corner p {
  font-size: 0.95rem;
  line-height: 1.6;
  margin: 0;
}

/* Mobile */
@media (max-width: 768px) {
  .contrarian-corner {
    padding: 1.25rem;
  }
}
```

### 7. `src/components/features/newsletter/DigestContent/ActionItems.css` (NEW FILE)

Extract and update styling.

```css
/* ActionItems.css */

.action-items {
  background: var(--bio-bg);
  border: 1px solid var(--social-border);
  border-radius: 16px;
  box-shadow: 6px 6px 0px var(--title-shadow);
  padding: 1.5rem;
}

.action-items h3 {
  font-family: 'Poppins', sans-serif;
  font-size: 1.125rem;
  font-weight: 700;
  color: var(--bio-text);
  margin: 0 0 1rem 0;
}

.action-items ul {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.action-items li {
  display: flex;
  flex-direction: column;
  gap: 0.375rem;
  padding-left: 1.75rem;
  position: relative;
}

.action-items li::before {
  content: '☐';
  position: absolute;
  left: 0;
  font-size: 1rem;
  color: var(--accent-primary);
}

.action-title {
  font-weight: 600;
  font-size: 0.95rem;
  color: var(--bio-text);
}

.action-context {
  font-size: 0.85rem;
  color: var(--bio-text);
  opacity: 0.7;
  line-height: 1.5;
}

.difficulty {
  display: inline-block;
  font-size: 0.7rem;
  padding: 0.2rem 0.6rem;
  border-radius: 12px;
  font-weight: 600;
  text-transform: capitalize;
  width: fit-content;
}

.difficulty-quick {
  background: var(--social-hover-bg);
  color: var(--social-hover-text);
}

.difficulty-medium {
  background: var(--card-bg);
  border: 1px solid var(--social-border);
  color: var(--bio-text);
}

.difficulty-deep-dive {
  background: var(--accent-primary);
  color: var(--bio-bg);
}

/* Mobile */
@media (max-width: 768px) {
  .action-items {
    padding: 1.25rem;
  }
}
```

### 8. `src/components/features/newsletter/DigestContent/ActionItems.jsx`

**Change:** Add CSS import.

```jsx
// src/components/features/newsletter/DigestContent/ActionItems.jsx
import './ActionItems.css';

function ActionItems({ items }) {
  return (
    <section className="action-items">
      <h3>Action Items</h3>
      <ul>
        {items.map((item, i) => (
          <li key={i}>
            <span className="action-title">{item.action}</span>
            {item.context && (
              <span className="action-context">{item.context}</span>
            )}
            {item.difficulty && (
              <span className={`difficulty difficulty-${item.difficulty}`}>
                {item.difficulty.replace('-', ' ')}
              </span>
            )}
          </li>
        ))}
      </ul>
    </section>
  );
}

export default ActionItems;
```

### 9. `src/components/features/newsletter/DigestContent/ReferencesIndex.jsx`

**Change:** Update for V2 structure.

```jsx
// src/components/features/newsletter/DigestContent/ReferencesIndex.jsx
import './ReferencesIndex.css';

function ReferencesIndex({ references }) {
  // V2 structure: { books: [], papers: [], frameworks: [], tools: [] }
  const categories = Object.entries(references).filter(([_, items]) => items?.length > 0);

  if (categories.length === 0) return null;

  return (
    <section className="references-index">
      <h3>References</h3>
      <div className="references-grid">
        {categories.map(([category, items]) => (
          <div key={category} className="reference-category">
            <h4>{category}</h4>
            <ul>
              {items.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}

export default ReferencesIndex;
```

### 10. `src/components/features/newsletter/DigestContent/ReferencesIndex.css` (NEW FILE)

```css
/* ReferencesIndex.css */

.references-index {
  border-top: 1px solid var(--social-border);
  padding-top: 1.5rem;
}

.references-index h3 {
  font-family: 'Poppins', sans-serif;
  font-size: 1.125rem;
  font-weight: 700;
  color: var(--bio-text);
  margin: 0 0 1rem 0;
}

.references-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
  gap: 1.5rem;
}

.reference-category h4 {
  font-size: 0.75rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: var(--bio-text);
  opacity: 0.6;
  margin: 0 0 0.75rem 0;
}

.reference-category ul {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 0.375rem;
}

.reference-category li {
  font-size: 0.875rem;
  color: var(--bio-text);
  line-height: 1.4;
}

/* Mobile */
@media (max-width: 768px) {
  .references-grid {
    grid-template-columns: 1fr 1fr;
    gap: 1rem;
  }
}

@media (max-width: 480px) {
  .references-grid {
    grid-template-columns: 1fr;
  }
}
```

### 11. `src/pages/DigestDetailPage.jsx`

**Change:** Align layout with NewsletterPage.

```jsx
// src/pages/DigestDetailPage.jsx
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

  const handleReturnHome = () => {
    navigate('/');
  };

  const handleBackToArchive = () => {
    navigate('/newsletter');
  };

  if (loading) {
    return (
      <div className="digest-page">
        <div className="digest-layout-container">
          <NewsletterHeader
            onReturnHome={handleReturnHome}
            onThemeChange={setTheme}
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
      <div className="digest-page">
        <div className="digest-layout-container">
          <NewsletterHeader
            onReturnHome={handleReturnHome}
            onThemeChange={setTheme}
          />
          <main className="digest-page-content">
            <div className="digest-error">
              <h2>Digest not found</h2>
              <p>{error.message}</p>
              <button className="back-link" onClick={handleBackToArchive}>
                Back to Archive
              </button>
            </div>
          </main>
        </div>
      </div>
    );
  }

  return (
    <div className="digest-page">
      <div className="digest-layout-container">
        <NewsletterHeader
          onReturnHome={handleReturnHome}
          onThemeChange={setTheme}
        />
        <main className="digest-page-content">
          <nav className="digest-nav">
            <button className="back-link" onClick={handleBackToArchive}>
              ← Back to Archive
            </button>
          </nav>
          <DigestContent digest={digest} />
        </main>
      </div>
    </div>
  );
}

export default DigestDetailPage;
```

### 12. `src/pages/DigestDetailPage.css`

**Change:** Align with NewsletterPage.css layout.

```css
/* DigestDetailPage.css */

/* Page container - matches NewsletterPage */
.digest-page {
  height: 100vh;
  background-color: var(--bg-color);
  color: var(--text-primary);
  overflow: hidden;
}

/* Layout grid - matches NewsletterPage */
.digest-layout-container {
  display: grid;
  grid-template-rows: auto 1fr;
  height: 100vh;
  width: 100%;
  overflow-y: auto;
  scroll-behavior: smooth;
}

/* Content area */
.digest-page-content {
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem 1.5rem 4rem;
  width: 100%;
}

/* Navigation */
.digest-nav {
  margin-bottom: 1.5rem;
}

.back-link {
  background: transparent;
  border: 1px solid var(--social-border);
  color: var(--bio-text);
  padding: 0.5rem 1rem;
  border-radius: 8px;
  font-size: 0.875rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
}

.back-link:hover {
  background: var(--social-hover-bg);
  color: var(--social-hover-text);
  border-color: var(--social-hover-bg);
}

/* Loading and Error States */
.digest-loading,
.digest-error {
  text-align: center;
  padding: 4rem 2rem;
}

.digest-error h2 {
  font-family: 'Poppins', sans-serif;
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--bio-text);
  margin: 0 0 1rem 0;
}

.digest-error p {
  color: var(--bio-text);
  opacity: 0.7;
  margin: 0 0 1.5rem 0;
}

/* Mobile */
@media (max-width: 768px) {
  .digest-page-content {
    padding: 1.5rem 1rem 3rem;
  }

  .digest-nav {
    margin-bottom: 1rem;
  }

  .back-link {
    padding: 0.375rem 0.75rem;
    font-size: 0.8rem;
  }
}
```

---

## Files to Delete

### 1. `src/components/features/newsletter/DigestContent/VideoSection.jsx`

**Reason:** Replaced by `VideoCard.jsx` which consumes V2 data natively and includes collapsible functionality.

---

## Implementation Steps

### Phase 1: Create Shared Primitives (Est. 30 min)

1. Create `src/components/features/newsletter/shared/Collapsible/` folder
2. Create `Collapsible.jsx`
3. Create `Collapsible.css`
4. Test Collapsible component in isolation

### Phase 2: Create New Sub-Components (Est. 45 min)

1. Create `QuoteBlock.jsx` + `QuoteBlock.css`
2. Create `StatsList.jsx` + `StatsList.css`
3. Create `TagPills.jsx` + `TagPills.css`
4. Create `VideoCard.jsx` + `VideoCard.css`
5. Test each component with mock V2 data

### Phase 3: Update DigestHeader (Est. 20 min)

1. Rewrite `DigestHeader.jsx` for V2 fields
2. Create `DigestHeader.css` (extracted styling)
3. Test with V2 stats and TOC data

### Phase 4: Update Supporting Components (Est. 30 min)

1. Update `ContrarianCorner.jsx` for V2 fields
2. Create `ContrarianCorner.css` (extracted styling)
3. Update `ActionItems.jsx` to import CSS
4. Create `ActionItems.css` (extracted styling)
5. Update `ReferencesIndex.jsx` for V2 structure
6. Create `ReferencesIndex.css` (extracted styling)

### Phase 5: Rewrite DigestContent (Est. 30 min)

1. Delete old `DigestContent.jsx`
2. Create new `DigestContent.jsx` (V2 native)
3. Create new `DigestContent.css` (CSS variables only)
4. Delete `VideoSection.jsx`

### Phase 6: Update Page Layout (Est. 20 min)

1. Update `DigestDetailPage.jsx` for new layout
2. Update `DigestDetailPage.css` to match NewsletterPage

### Phase 7: Testing & Polish (Est. 30 min)

1. Test with real V2 digest from Supabase
2. Verify theme switching (light/dark)
3. Test mobile responsiveness
4. Test all collapsible states
5. Verify TOC anchor links work
6. Check loading and error states

---

## Component Specifications

### Collapsible

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `title` | string | required | Header text |
| `subtitle` | string | null | Secondary text |
| `defaultOpen` | boolean | false | Initial state |
| `children` | ReactNode | required | Content |
| `className` | string | '' | Additional class |

### VideoCard

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `video` | V2VideoSection | required | Raw V2 video_section object |
| `defaultOpen` | boolean | false | Initial collapsed state |

### TagPills

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `tags` | string[] | required | Array of tag strings |
| `variant` | 'filled' \| 'outline' | 'filled' | Visual variant |
| `className` | string | '' | Additional class |

### QuoteBlock

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `quote` | string | required | Quote text |

### StatsList

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `stats` | string[] | required | Array of "Number: Description" strings |
| `title` | string | null | Section title |

### DigestHeader

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `title` | string | required | Digest title |
| `publishDate` | string | required | YYYY-MM-DD format |
| `stats` | V2Stats | null | Stats object |
| `tableOfContents` | TOCItem[] | null | TOC array |
| `keywords` | string[] | null | Keywords array |

---

## Testing Checklist

### Functionality

- [ ] DigestDetailPage loads without errors
- [ ] V2 digest data renders completely (all fields)
- [ ] Video cards expand/collapse correctly
- [ ] First video card is expanded by default
- [ ] TOC anchor links scroll to sections
- [ ] YouTube links open in new tab
- [ ] Back to Archive button navigates correctly
- [ ] Loading state displays properly
- [ ] Error state displays properly

### Styling

- [ ] No hardcoded colors (inspect with DevTools)
- [ ] Light theme displays correctly
- [ ] Dark theme displays correctly
- [ ] Theme toggle works on page
- [ ] Consistent with NewsletterPage styling
- [ ] Cards have proper shadows and borders

### Responsive

- [ ] Desktop (1200px+) displays correctly
- [ ] Tablet (768px-1200px) displays correctly
- [ ] Mobile (480px-768px) displays correctly
- [ ] Small mobile (<480px) displays correctly
- [ ] Stats bar wraps properly on mobile
- [ ] Video cards are touch-friendly

### Edge Cases

- [ ] Digest with no video_sections
- [ ] Video with no key_quotes
- [ ] Video with no frameworks_mentioned
- [ ] Empty contrarian_corner
- [ ] Empty action_items
- [ ] Empty references
- [ ] Very long title (3+ lines)
- [ ] Very long quote (4+ sentences)

---

## Rollback Plan

If issues arise during implementation:

1. **Immediate rollback:** Git reset to pre-implementation commit
2. **Partial rollback:** Revert specific files while keeping working components
3. **Feature flag:** Add `USE_V2_DIGEST_UI` env var to toggle between old/new

---

## Future Enhancements (Out of Scope)

- Interactive action item checkboxes (localStorage persistence)
- Sticky TOC sidebar on desktop
- Video thumbnail previews (if thumbnails return to V2)
- Reading progress indicator
- Share buttons for individual sections
- Bookmark/save digest functionality

