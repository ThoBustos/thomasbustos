# Supabase Integration for Daily Digests

## Overview

Connect the React website to Supabase to pull real daily digest data from the backend, replacing the current mocked newsletter data. This upgrade adds a clean service layer architecture with proper error handling and fallback support.

---

## Table of Contents

1. [Architecture](#architecture)
2. [Files to Create](#files-to-create)
3. [Files to Modify](#files-to-modify)
4. [Implementation Steps](#implementation-steps)
5. [Data Shapes](#data-shapes)
6. [README Updates](#readme-updates)

---

## Architecture

### Before

```
src/
├── data/
│   └── newsletterIssues.js     # Mock data (static)
├── pages/
│   └── NewsletterPage.jsx      # Imports mock data directly
└── components/features/newsletter/
    └── NewsletterIssueCard/    # Renders mock structure
```

### After

```
src/
├── services/                    # NEW: API layer
│   ├── supabase.js             # Supabase client initialization
│   └── digestService.js        # Digest-specific query functions
├── hooks/
│   ├── useTheme.js             # (existing)
│   ├── useNotification.js      # (existing)
│   ├── useAnalytics.js         # (existing)
│   ├── useNavigation.js        # (existing)
│   └── useDigests.js           # NEW: Data fetching hook with fallback
├── data/
│   └── newsletterIssues.js     # KEEP: Fallback data
├── pages/
│   ├── NewsletterPage.jsx      # UPDATE: Archive list view
│   └── DigestDetailPage.jsx    # NEW: Individual digest view
├── components/features/newsletter/
│   ├── NewsletterHeader/       # (existing)
│   ├── NewsletterIssueCard/    # UPDATE: Adapt to digest shape
│   ├── SubscriptionModal/      # (existing - keep simulated)
│   └── DigestContent/          # NEW: Render content_json structure
│       ├── DigestContent.jsx
│       ├── DigestContent.css
│       ├── DigestHeader.jsx    # Title, emoji, stats
│       ├── VideoSection.jsx    # Per-video summaries
│       ├── ContrarianCorner.jsx # Highlight box
│       ├── ActionItems.jsx     # Checklist
│       └── ReferencesIndex.jsx # Categorized links
└── config/
    └── routes.js               # UPDATE: Add newsletter detail route
```

---

## Files to Create

### 1. `src/services/supabase.js`

Supabase client initialization with environment variables.

```javascript
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn('Supabase credentials not configured. Using fallback data.')
}

export const supabase = supabaseUrl && supabaseAnonKey
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null
```

---

### 2. `src/services/digestService.js`

Query functions for digest operations.

```javascript
import { supabase } from './supabase'

export const digestService = {
  /**
   * Check if Supabase is configured
   */
  isConfigured() {
    return supabase !== null
  },

  /**
   * Get the latest published digest
   * @returns {Promise<Object>} Latest digest with full content
   */
  async getLatest() {
    if (!supabase) throw new Error('Supabase not configured')

    const { data, error } = await supabase
      .from('daily_digests')
      .select('*')
      .eq('status', 'published')
      .order('publish_date', { ascending: false })
      .limit(1)
      .single()

    if (error) throw error
    return data
  },

  /**
   * Get digest by specific date
   * @param {string} date - Date in YYYY-MM-DD format
   * @returns {Promise<Object>} Digest for that date
   */
  async getByDate(date) {
    if (!supabase) throw new Error('Supabase not configured')

    const { data, error } = await supabase
      .from('daily_digests')
      .select('*')
      .eq('publish_date', date)
      .single()

    if (error) throw error
    return data
  },

  /**
   * Get archive list (for list view)
   * @param {number} limit - Max number of results
   * @returns {Promise<Array>} List of digest summaries
   */
  async getArchive(limit = 30) {
    if (!supabase) throw new Error('Supabase not configured')

    const { data, error } = await supabase
      .from('daily_digests')
      .select('id, publish_date, title, video_count, keywords, status, content_json')
      .eq('status', 'published')
      .order('publish_date', { ascending: false })
      .limit(limit)

    if (error) throw error
    return data
  }
}
```

---

### 3. `src/hooks/useDigests.js`

React hooks for fetching digests with loading states and fallback support.

```javascript
import { useState, useEffect, useCallback } from 'react'
import { digestService } from '../services/digestService'
import { NEWSLETTER_ISSUES } from '../data/newsletterIssues'

/**
 * Hook for fetching the archive list
 * Falls back to mock data if Supabase fails
 */
export function useDigests() {
  const [digests, setDigests] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [usingFallback, setUsingFallback] = useState(false)

  const fetchDigests = useCallback(async () => {
    setLoading(true)
    setError(null)

    try {
      if (!digestService.isConfigured()) {
        throw new Error('Supabase not configured')
      }
      const data = await digestService.getArchive()
      setDigests(data)
      setUsingFallback(false)
    } catch (err) {
      console.warn('Failed to fetch digests, using fallback:', err.message)
      setDigests(NEWSLETTER_ISSUES)
      setUsingFallback(true)
      // Don't set error since we have fallback
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchDigests()
  }, [fetchDigests])

  return { digests, loading, error, usingFallback, refetch: fetchDigests }
}

/**
 * Hook for fetching a single digest by date
 * @param {string|null} date - Date in YYYY-MM-DD format, or null for latest
 */
export function useDigest(date = null) {
  const [digest, setDigest] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchDigest = async () => {
      setLoading(true)
      setError(null)

      try {
        if (!digestService.isConfigured()) {
          throw new Error('Supabase not configured')
        }

        const data = date
          ? await digestService.getByDate(date)
          : await digestService.getLatest()
        setDigest(data)
      } catch (err) {
        console.error('Failed to fetch digest:', err)
        setError(err)
      } finally {
        setLoading(false)
      }
    }

    fetchDigest()
  }, [date])

  return { digest, loading, error }
}
```

---

### 4. `src/pages/DigestDetailPage.jsx`

New page for viewing individual digest content.

```javascript
import { useDigest } from '../hooks/useDigests'
import DigestContent from '../components/features/newsletter/DigestContent/DigestContent'
import { useNavigation } from '../hooks/useNavigation'
import './DigestDetailPage.css'

function DigestDetailPage({ date }) {
  const { digest, loading, error } = useDigest(date)
  const navigate = useNavigation()

  if (loading) {
    return (
      <div className="digest-detail-page">
        <div className="digest-loading">Loading digest...</div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="digest-detail-page">
        <div className="digest-error">
          <h2>Digest not found</h2>
          <p>{error.message}</p>
          <button onClick={() => navigate('/newsletter')}>
            Back to Archive
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="digest-detail-page">
      <button
        className="back-button"
        onClick={() => navigate('/newsletter')}
      >
        ← Back to Archive
      </button>
      <DigestContent digest={digest} />
    </div>
  )
}

export default DigestDetailPage
```

---

### 5. `src/components/features/newsletter/DigestContent/`

Component suite for rendering `content_json` structure.

#### DigestContent.jsx (main)
```javascript
import DigestHeader from './DigestHeader'
import VideoSection from './VideoSection'
import ContrarianCorner from './ContrarianCorner'
import ActionItems from './ActionItems'
import ReferencesIndex from './ReferencesIndex'
import './DigestContent.css'

function DigestContent({ digest }) {
  const content = digest.content_json

  if (!content) {
    return <div className="digest-content-empty">No content available</div>
  }

  return (
    <article className="digest-content">
      <DigestHeader
        title={digest.title}
        header={content.header}
        publishDate={digest.publish_date}
      />

      {content.videos?.map((video, index) => (
        <VideoSection key={index} video={video} />
      ))}

      {content.contrarian_corner && (
        <ContrarianCorner data={content.contrarian_corner} />
      )}

      {content.action_items?.length > 0 && (
        <ActionItems items={content.action_items} />
      )}

      {content.references && (
        <ReferencesIndex references={content.references} />
      )}
    </article>
  )
}

export default DigestContent
```

#### DigestHeader.jsx
```javascript
function DigestHeader({ title, header, publishDate }) {
  const formatDate = (dateStr) => {
    return new Date(dateStr).toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  return (
    <header className="digest-header">
      <span className="digest-emoji">{header?.emoji || '📰'}</span>
      <h1 className="digest-title">{title || header?.title}</h1>
      <div className="digest-meta">
        <span className="digest-date">{formatDate(publishDate)}</span>
        <span className="digest-video-count">
          {header?.video_count || 0} videos analyzed
        </span>
      </div>
      {header?.keywords?.length > 0 && (
        <div className="digest-keywords">
          {header.keywords.map((keyword, i) => (
            <span key={i} className="digest-keyword">{keyword}</span>
          ))}
        </div>
      )}
    </header>
  )
}

export default DigestHeader
```

#### VideoSection.jsx
```javascript
function VideoSection({ video }) {
  return (
    <section className="video-section">
      <h2 className="video-title">{video.title}</h2>
      <span className="video-channel">{video.channel}</span>

      {video.why_it_matters && (
        <p className="video-why-matters">{video.why_it_matters}</p>
      )}

      {video.nuggets?.length > 0 && (
        <ul className="video-nuggets">
          {video.nuggets.map((nugget, i) => (
            <li key={i} className="nugget">{nugget.text}</li>
          ))}
        </ul>
      )}
    </section>
  )
}

export default VideoSection
```

#### ContrarianCorner.jsx
```javascript
function ContrarianCorner({ data }) {
  return (
    <aside className="contrarian-corner">
      <h3>🎯 Contrarian Corner</h3>
      <div className="contrarian-claim">
        <strong>Claim:</strong> {data.claim}
      </div>
      <div className="contrarian-evidence">
        <strong>Evidence:</strong> {data.evidence}
      </div>
      <div className="contrarian-verdict">
        <strong>Verdict:</strong> {data.verdict}
      </div>
    </aside>
  )
}

export default ContrarianCorner
```

#### ActionItems.jsx
```javascript
function ActionItems({ items }) {
  return (
    <section className="action-items">
      <h3>✅ Action Items</h3>
      <ul>
        {items.map((item, i) => (
          <li key={i}>{item}</li>
        ))}
      </ul>
    </section>
  )
}

export default ActionItems
```

#### ReferencesIndex.jsx
```javascript
function ReferencesIndex({ references }) {
  const categories = Object.entries(references).filter(([_, items]) => items?.length > 0)

  if (categories.length === 0) return null

  return (
    <section className="references-index">
      <h3>📚 References</h3>
      {categories.map(([category, items]) => (
        <div key={category} className="reference-category">
          <h4>{category}</h4>
          <ul>
            {items.map((item, i) => (
              <li key={i}>
                {item.url ? (
                  <a href={item.url} target="_blank" rel="noopener noreferrer">
                    {item.name}
                  </a>
                ) : (
                  item.name || item
                )}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </section>
  )
}

export default ReferencesIndex
```

---

## Files to Modify

### 1. `.env.example`

Add Supabase credentials:

```env
# Google Analytics Measurement ID
# Get yours at: https://analytics.google.com
VITE_GA_MEASUREMENT_ID=G-XXXXXXXXXX

# Supabase Configuration
# Get these from your Supabase project settings > API
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

---

### 2. `src/config/routes.js`

Add newsletter detail route:

```javascript
export const ROUTES = {
  HOME: { path: '/', view: 'home', title: 'Home' },
  MISSION: { path: '/mission', view: 'mission', title: 'Mission' },
  EVENTS: { path: '/events', view: 'events', title: 'Events' },
  LIBRARY: { path: '/library', view: 'library', title: 'Library' },
  NEWSLETTER: { path: '/newsletter', view: 'newsletter', title: 'LTAI Daily News' },
  NEWSLETTER_DETAIL: { path: '/newsletter/:date', view: 'newsletter-detail', title: 'Daily Digest' }
}
```

---

### 3. `src/Router.jsx`

Update to handle `/newsletter/:date` routes:

```javascript
// Add date extraction from path
const getDigestDate = (path) => {
  const match = path.match(/^\/newsletter\/(\d{4}-\d{2}-\d{2})$/)
  return match ? match[1] : null
}

// In component:
const digestDate = getDigestDate(currentPath)
const isNewsletterDetail = digestDate !== null
const isNewsletterArchive = currentPath === '/newsletter'

// Conditional rendering:
{isNewsletterDetail && <DigestDetailPage date={digestDate} />}
{isNewsletterArchive && <NewsletterPage />}
```

---

### 4. `src/pages/NewsletterPage.jsx`

Replace mock import with hook:

```javascript
// REMOVE:
import { NEWSLETTER_ISSUES } from '../data/newsletterIssues'

// ADD:
import { useDigests } from '../hooks/useDigests'

function NewsletterPage() {
  const { digests, loading, error, usingFallback } = useDigests()
  // ... rest of component

  if (loading) {
    return <div className="newsletter-loading">Loading digests...</div>
  }

  // Optional: show indicator when using fallback
  {usingFallback && (
    <div className="fallback-notice">Showing cached data</div>
  )}
}
```

---

### 5. `src/components/features/newsletter/NewsletterIssueCard/NewsletterIssueCard.jsx`

Adapt to handle both mock and real digest shapes:

```javascript
// Add navigation to detail page
const handleClick = () => {
  const date = issue.publish_date || issue.date
  navigate(`/newsletter/${date}`)
}

// Handle both data shapes
const title = issue.title
const date = issue.publish_date || issue.date
const tags = issue.keywords || issue.tags
const videoCount = issue.video_count || issue.sourceCount
```

---

## Data Shapes

### Supabase `daily_digests` Table

```typescript
interface DailyDigest {
  id: string
  publish_date: string          // YYYY-MM-DD
  title: string
  status: 'draft' | 'published'
  video_count: number
  keywords: string[]
  content_json: DigestContent
  formatted_html: string
  formatted_markdown: string
  created_at: string
  updated_at: string
}

interface DigestContent {
  header: {
    emoji: string
    title: string
    video_count: number
    keywords: string[]
  }
  videos: {
    title: string
    channel: string
    why_it_matters: string
    nuggets: { text: string; video_title?: string }[]
  }[]
  contrarian_corner?: {
    claim: string
    evidence: string
    verdict: string
  }
  action_items: string[]
  references: {
    companies?: { name: string; url?: string }[]
    tools?: { name: string; url?: string }[]
    papers?: { name: string; url?: string }[]
    people?: { name: string; url?: string }[]
  }
}
```

### Mock Data Shape (existing)

```typescript
interface NewsletterIssue {
  id: number
  date: string              // "Dec 04"
  title: string
  summary: string
  tags: string[]
  sourceCount: number
  readingTime: string
}
```

---

## README Updates

After implementation, update `README.md` with:

### Updated Project Structure

```
src/
├── pages/              # Page components
│   ├── Home            # Landing page
│   ├── Mission         # About/mission page
│   ├── Events          # Events calendar
│   ├── Library         # Book library
│   ├── NewsletterPage  # Daily digest archive
│   └── DigestDetailPage # Individual digest view
├── components/
│   ├── ui/             # Reusable UI components
│   │   ├── ThemeToggle
│   │   └── NotificationToast
│   ├── layout/         # Layout components
│   │   ├── Dock        # Navigation dock
│   │   └── BackgroundImage
│   └── features/       # Feature-specific components
│       ├── brand/      # BrandAvatar, LTAIBrandWidget
│       ├── newsletter/ # NewsletterHeader, IssueCard, DigestContent
│       └── library/    # BookCard, BookModal
├── hooks/              # Custom React hooks
│   ├── useTheme       # Theme management
│   ├── useNotification # Toast notifications
│   ├── useAnalytics   # GA tracking
│   ├── useNavigation  # Client-side routing
│   └── useDigests     # Supabase digest fetching
├── services/           # API layer
│   ├── supabase.js    # Supabase client
│   └── digestService.js # Digest queries
├── context/            # React context providers
│   ├── AppContext     # Theme, notifications
│   └── NavigationContext # Routing
├── config/             # Configuration
│   ├── routes.js      # Route definitions
│   ├── dockItems.jsx  # Dock navigation items
│   └── socialLinks.js # Social media links
├── data/               # Static/fallback data
│   ├── books.js       # Book library data
│   ├── events.js      # Events data
│   └── newsletterIssues.js # Fallback digest data
├── animations/         # Visual effects
│   ├── PixelBlast     # 3D particle effect
│   ├── TextType       # Typing animation
│   └── ClickSpark     # Click effects
├── utils/              # Utilities
│   └── analytics.js   # GA initialization
└── assets/             # Static assets

public/                 # Static files
├── images/            # Image assets
├── favicon.ico        # Favicon
├── robots.txt         # SEO robots
├── sitemap.xml        # SEO sitemap
└── llms.txt           # LLM discovery
```

### New Features Section

```
## Features

### Core
- Minimalist design with clean typography
- Fully responsive (mobile, tablet, desktop, landscape)
- Dark/light theme toggle with persistence
- Smooth scaling typography using clamp()
- Interactive 3D background (PixelBlast effect)

### Newsletter (LTAI Daily)
- **Live data** from Supabase backend
- Daily AI digest archive with search
- Individual digest detail pages
- Video summaries with key nuggets
- Contrarian corner highlights
- Action items and references
- Fallback to cached data if offline

### Library
- 50+ curated books
- Category filtering
- Book detail modals

### Events
- Upcoming events calendar
- Past events archive

### SEO
- Open Graph meta tags
- Twitter Card support
- JSON-LD structured data
- XML sitemap
- robots.txt
- llms.txt for LLM discovery
```

---

## Implementation Order

| Step | Task | Files |
|------|------|-------|
| 1 | Install Supabase | `npm install @supabase/supabase-js` |
| 2 | Update env | `.env.example`, `.env` |
| 3 | Create services | `src/services/supabase.js`, `src/services/digestService.js` |
| 4 | Create hooks | `src/hooks/useDigests.js` |
| 5 | Update routes | `src/config/routes.js` |
| 6 | Update Router | `src/Router.jsx` |
| 7 | Update NewsletterPage | `src/pages/NewsletterPage.jsx` |
| 8 | Create DigestDetailPage | `src/pages/DigestDetailPage.jsx` |
| 9 | Create DigestContent | `src/components/features/newsletter/DigestContent/*` |
| 10 | Update IssueCard | `src/components/features/newsletter/NewsletterIssueCard/` |
| 11 | Add styles | CSS for new components |
| 12 | Update README | `README.md` |
| 13 | Test | Manual testing with real Supabase data |

---

## Decisions Log

| Decision | Choice | Rationale |
|----------|--------|-----------|
| Fallback data | Keep mock data | Graceful degradation for offline/dev |
| Detail pages | Yes | Better UX for reading full digests |
| Subscription | Keep simulated | Not priority for MVP |
| Render method | Custom components | Full styling control |
| Real-time | No | Simple fetch is sufficient |

---

## Testing Checklist

- [ ] Supabase connection works with real credentials
- [ ] Fallback works when credentials missing
- [ ] Archive loads and displays digests
- [ ] Navigation to detail page works
- [ ] Back navigation from detail page works
- [ ] Content renders correctly from `content_json`
- [ ] Loading states display properly
- [ ] Error states display properly
- [ ] Mobile responsive
- [ ] Dark/light theme compatible
