# Frontend Architecture Refactoring Guide

## 📋 Table of Contents
1. [Overview](#overview)
2. [Goals & Benefits](#goals--benefits)
3. [Current Architecture Analysis](#current-architecture-analysis)
4. [New Architecture Structure](#new-architecture-structure)
5. [Implementation Plan](#implementation-plan)
6. [Step-by-Step Implementation](#step-by-step-implementation)
7. [File Changes Summary](#file-changes-summary)
8. [Testing Checklist](#testing-checklist)

---

## Overview

This guide documents a comprehensive refactoring of the React frontend to improve:
- **Component organization** - Clear separation by feature and purpose
- **Code reusability** - Custom hooks and shared utilities
- **State management** - Context API for shared state
- **Maintainability** - Easier to find, understand, and modify code
- **Scalability** - Structure that supports future growth

---

## Goals & Benefits

### Primary Goals
1. Extract page-level components from `App.jsx`
2. Create reusable custom hooks for common logic
3. Implement Context API for shared state (theme, navigation, notifications)
4. Organize components by feature and purpose
5. Extract constants and configuration to dedicated files
6. Improve code organization and file structure

### Benefits
- **Easier navigation** - Know exactly where to find code
- **Better testability** - Isolated components and hooks
- **Reduced duplication** - Shared logic in hooks and context
- **Clearer responsibilities** - Each file has a single, clear purpose
- **Easier onboarding** - New developers understand structure quickly

---

## Current Architecture Analysis

### Current File Structure
```
src/
├── App.jsx                    # 281 lines - Does EVERYTHING
├── Router.jsx                  # 54 lines - Routing logic
├── main.jsx                    # Entry point
├── ClickSpark.jsx             # Animation wrapper
├── ThemeToggle.jsx            # Theme switcher
├── TextType.jsx               # Typing animation
├── components/
│   ├── Dock/
│   │   ├── Dock.jsx
│   │   └── Dock.css
│   ├── BackgroundImage.jsx
│   ├── LTAIBrandWidget.jsx
│   ├── NotificationToast.jsx
│   ├── NewsletterArchive.jsx
│   ├── NewsletterHeader.jsx
│   ├── NewsletterIssueCard.jsx
│   └── Newsletter.jsx
└── analytics.js
```

### Current Issues
1. **App.jsx is too large** - Contains routing logic, state management, and all page views
2. **State duplication** - Theme state exists in both `App.jsx` and `NewsletterArchive.jsx`
3. **Global variables** - `window.navigate` is a code smell
4. **Mixed concerns** - Business logic, UI, and routing all in one file
5. **No clear feature boundaries** - Hard to know what belongs where
6. **Constants scattered** - Dock items, social links defined inline

---

## New Architecture Structure

### Target File Structure
```
src/
├── main.jsx                    # Entry point (minimal changes)
├── App.jsx                     # Main orchestrator (simplified)
├── Router.jsx                  # Routing logic (minimal changes)
│
├── components/                 # Reusable UI components
│   ├── ui/                     # Generic UI components
│   │   ├── NotificationToast/
│   │   │   ├── NotificationToast.jsx
│   │   │   └── NotificationToast.css
│   │   └── ThemeToggle/
│   │       ├── ThemeToggle.jsx
│   │       └── ThemeToggle.css
│   │
│   ├── layout/                 # Layout components
│   │   ├── Dock/
│   │   │   ├── Dock.jsx
│   │   │   └── Dock.css
│   │   ├── BackgroundImage/
│   │   │   ├── BackgroundImage.jsx
│   │   │   └── BackgroundImage.css
│   │   └── AppLayout/
│   │       ├── AppLayout.jsx
│   │       └── AppLayout.css
│   │
│   └── features/               # Feature-specific components
│       ├── newsletter/
│       │   ├── NewsletterArchive/
│       │   │   ├── NewsletterArchive.jsx
│       │   │   └── NewsletterArchive.css
│       │   ├── NewsletterHeader/
│       │   │   ├── NewsletterHeader.jsx
│       │   │   └── NewsletterHeader.css
│       │   ├── NewsletterIssueCard/
│       │   │   ├── NewsletterIssueCard.jsx
│       │   │   └── NewsletterIssueCard.css
│       │   └── Newsletter/
│       │       └── Newsletter.jsx
│       │
│       └── brand/
│           └── LTAIBrandWidget/
│               ├── LTAIBrandWidget.jsx
│               └── LTAIBrandWidget.css
│
├── pages/                      # Page-level components
│   ├── HomePage.jsx
│   ├── MissionPage.jsx
│   ├── EventsPage.jsx
│   └── NewsletterPage.jsx      # Wrapper for NewsletterArchive
│
├── hooks/                      # Custom React hooks
│   ├── useTheme.js
│   ├── useNavigation.js
│   ├── useNotification.js
│   └── useAnalytics.js
│
├── context/                    # React Context providers
│   ├── AppContext.jsx
│   └── NavigationContext.jsx
│
├── config/                     # Configuration and constants
│   ├── dockItems.js
│   ├── socialLinks.js
│   └── routes.js
│
├── utils/                      # Utility functions
│   └── analytics.js            # Moved from src/analytics.js
│
└── animations/                 # Animation components
    ├── ClickSpark.jsx
    ├── ClickSpark.css
    ├── TextType.jsx
    └── TextType.css
```

---

## Implementation Plan

### Phase 1: Setup New Structure (Foundation)
1. Create new directory structure
2. Move existing files to new locations
3. Update import paths

### Phase 2: Extract Configuration
1. Extract dock items to config
2. Extract social links to config
3. Extract route definitions

### Phase 3: Create Custom Hooks
1. Create `useTheme` hook
2. Create `useNotification` hook
3. Create `useNavigation` hook
4. Create `useAnalytics` hook

### Phase 4: Implement Context API
1. Create `AppContext` for theme and notifications
2. Create `NavigationContext` for navigation
3. Update components to use context

### Phase 5: Extract Page Components
1. Create `HomePage` component
2. Create `MissionPage` component
3. Create `EventsPage` component
4. Refactor `App.jsx` to use pages

### Phase 6: Reorganize Components
1. Move components to new structure
2. Update all import paths
3. Verify everything works

### Phase 7: Cleanup
1. Remove unused code
2. Update documentation
3. Final testing

---

## Step-by-Step Implementation

### STEP 1: Create New Directory Structure

**Action:** Create all new directories

```bash
# Run these commands in your project root
mkdir -p src/components/ui/NotificationToast
mkdir -p src/components/ui/ThemeToggle
mkdir -p src/components/layout/Dock
mkdir -p src/components/layout/BackgroundImage
mkdir -p src/components/layout/AppLayout
mkdir -p src/components/features/newsletter/NewsletterArchive
mkdir -p src/components/features/newsletter/NewsletterHeader
mkdir -p src/components/features/newsletter/NewsletterIssueCard
mkdir -p src/components/features/newsletter/Newsletter
mkdir -p src/components/features/brand/LTAIBrandWidget
mkdir -p src/pages
mkdir -p src/hooks
mkdir -p src/context
mkdir -p src/config
mkdir -p src/utils
mkdir -p src/animations
```

**Files Created:** Directories only (no files yet)

**Why:** Establishes the foundation for organized code structure

---

### STEP 2: Move Animation Components

**Action:** Move animation-related components

**Files to Move:**
- `src/ClickSpark.jsx` → `src/animations/ClickSpark.jsx`
- `src/TextType.jsx` → `src/animations/TextType.jsx`
- `src/TextType.css` → `src/animations/TextType.css`
- `src/PixelBlast.jsx` → `src/animations/PixelBlast.jsx` (if exists)
- `src/PixelBlast.css` → `src/animations/PixelBlast.css` (if exists)

**Files to Update:**
- `src/App.jsx` - Update import: `import ClickSpark from './animations/ClickSpark'`
- `src/App.jsx` - Update import: `import TextType from './animations/TextType'`

**Why:** Animations are reusable across the app and deserve their own category

---

### STEP 3: Move Utilities

**Action:** Move utility files

**Files to Move:**
- `src/analytics.js` → `src/utils/analytics.js`

**Files to Update:**
- `src/main.jsx` - Update import: `import { initGoogleAnalytics } from './utils/analytics.js'`

**Why:** Utilities belong in a dedicated utils folder

---

### STEP 4: Create Configuration Files

**Action:** Extract constants to configuration files

#### 4.1: Create `src/config/socialLinks.js`

**File to Create:**
```javascript
// src/config/socialLinks.js
export const SOCIAL_LINKS = [
  { 
    name: 'LinkedIn', 
    url: 'https://www.linkedin.com/in/thomasbustos/',
    category: 'professional'
  },
  { 
    name: 'X', 
    url: 'https://x.com/ThoBustos',
    category: 'social'
  },
  { 
    name: 'GitHub', 
    url: 'https://github.com/ThoBustos',
    category: 'development'
  },
  { 
    name: 'YouTube', 
    url: 'https://www.youtube.com/@lets-talk-ai',
    category: 'content'
  },
  { 
    name: 'Substack', 
    url: 'https://thomasbustos.substack.com/',
    category: 'content'
  },
  { 
    name: 'TikTok', 
    url: 'https://www.tiktok.com/@lets_talk_ai',
    category: 'content'
  },
];
```

**Why:** Centralizes social link configuration, makes it easy to add/remove links

---

#### 4.2: Create `src/config/dockItems.js`

**File to Create:**
```javascript
// src/config/dockItems.js
import { VscHome, VscTelescope, VscCalendar, VscBell } from "react-icons/vsc";

/**
 * Creates dock items configuration
 * @param {Function} navigate - Navigation function
 * @returns {Array} Array of dock item configurations
 */
export const createDockItems = (navigate) => {
  const nav = navigate || window.navigate || (() => {});
  
  return [
    {
      icon: <VscHome size={24} />,
      label: 'Home',
      view: 'home',
      path: '/',
      onClick: () => nav('/')
    },
    {
      icon: <VscTelescope size={24} />,
      label: 'Mission',
      view: 'mission',
      path: '/mission',
      onClick: () => nav('/mission')
    },
    {
      icon: <VscCalendar size={24} />,
      label: 'Events',
      view: 'events',
      path: '/events',
      onClick: () => nav('/events')
    },
    {
      icon: <VscBell size={24} />,
      label: 'LTAI Daily News',
      view: 'newsletter',
      path: '/newsletter',
      onClick: () => nav('/newsletter')
    },
  ];
};
```

**Why:** Separates configuration from component logic, makes dock items reusable

---

#### 4.3: Create `src/config/routes.js`

**File to Create:**
```javascript
// src/config/routes.js
/**
 * Route configuration
 * Maps paths to view names and metadata
 */
export const ROUTES = {
  HOME: {
    path: '/',
    view: 'home',
    title: 'Home'
  },
  MISSION: {
    path: '/mission',
    view: 'mission',
    title: 'Mission'
  },
  EVENTS: {
    path: '/events',
    view: 'events',
    title: 'Events'
  },
  NEWSLETTER: {
    path: '/newsletter',
    view: 'newsletter',
    title: 'Newsletter Archive'
  }
};

/**
 * Get active view from current path
 * @param {string} currentPath - Current URL path
 * @returns {string} Active view name
 */
export const getActiveView = (currentPath) => {
  if (currentPath === ROUTES.MISSION.path) return ROUTES.MISSION.view;
  if (currentPath === ROUTES.EVENTS.path) return ROUTES.EVENTS.view;
  if (currentPath.startsWith(ROUTES.NEWSLETTER.path)) return ROUTES.NEWSLETTER.view;
  return ROUTES.HOME.view;
};
```

**Why:** Centralizes routing logic, makes route changes easier

---

### STEP 5: Create Custom Hooks

**Action:** Extract reusable logic into custom hooks

#### 5.1: Create `src/hooks/useTheme.js`

**File to Create:**
```javascript
// src/hooks/useTheme.js
import { useState, useEffect } from 'react';

/**
 * Custom hook for managing theme state
 * Handles localStorage persistence and DOM updates
 * 
 * @returns {[string, Function]} [theme, setTheme]
 */
export function useTheme() {
  const [theme, setTheme] = useState(() => {
    // Initialize from localStorage or default to 'dark'
    return localStorage.getItem('theme') || 'dark';
  });

  useEffect(() => {
    // Persist theme to localStorage
    localStorage.setItem('theme', theme);
    
    // Update DOM attribute for CSS theming
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  return [theme, setTheme];
}
```

**Why:** Encapsulates theme logic, reusable across components, handles persistence

**Files to Update Later:**
- `src/App.jsx` - Replace theme state with `useTheme()`
- `src/components/features/newsletter/NewsletterArchive.jsx` - Replace theme state with `useTheme()`

---

#### 5.2: Create `src/hooks/useNotification.js`

**File to Create:**
```javascript
// src/hooks/useNotification.js
import { useState } from 'react';

/**
 * Custom hook for managing notification state
 * Handles showing/hiding notifications with animation reset logic
 * 
 * @returns {Object} { notification, showNotification, show, hide }
 */
export function useNotification() {
  const [notification, setNotification] = useState('');
  const [showNotification, setShowNotification] = useState(false);

  const show = (message) => {
    // If any notification is already showing, reset the timer
    if (showNotification) {
      setShowNotification(false);
      // Force re-render with slight delay to restart animation
      setTimeout(() => {
        setNotification(message);
        setShowNotification(true);
      }, 50);
    } else {
      setNotification(message);
      setShowNotification(true);
    }
  };

  const hide = () => {
    setShowNotification(false);
    setNotification('');
  };

  return {
    notification,
    showNotification,
    show,
    hide
  };
}
```

**Why:** Encapsulates notification logic, reusable, handles animation reset

**Files to Update Later:**
- `src/App.jsx` - Replace notification state with `useNotification()`

---

#### 5.3: Create `src/hooks/useNavigation.js`

**File to Create:**
```javascript
// src/hooks/useNavigation.js
import { useContext } from 'react';
import { NavigationContext } from '../context/NavigationContext';

/**
 * Custom hook to access navigation function
 * Provides fallback to window.navigate if context not available
 * 
 * @returns {Function} navigate function
 */
export function useNavigation() {
  const context = useContext(NavigationContext);
  
  // Fallback for components outside NavigationProvider
  return context?.navigate || window.navigate || (() => {
    console.warn('Navigation not available');
  });
}
```

**Why:** Provides consistent navigation API, handles context gracefully

**Note:** This will be used after we create NavigationContext in Step 6

---

#### 5.4: Create `src/hooks/useAnalytics.js`

**File to Create:**
```javascript
// src/hooks/useAnalytics.js
/**
 * Custom hook for analytics tracking
 * Provides consistent interface for tracking events
 * 
 * @returns {Object} { trackEvent, trackSocialClick }
 */
export function useAnalytics() {
  const trackEvent = (eventName, eventParams = {}) => {
    if (window.gtag) {
      window.gtag('event', eventName, eventParams);
    }
  };

  const trackSocialClick = (platform) => {
    trackEvent('social_click', {
      'event_category': 'engagement',
      'event_label': platform
    });
  };

  return {
    trackEvent,
    trackSocialClick
  };
}
```

**Why:** Centralizes analytics logic, makes tracking consistent

**Files to Update Later:**
- `src/App.jsx` - Replace `trackSocialClick` with `useAnalytics()`
- `src/components/features/brand/LTAIBrandWidget.jsx` - Use `useAnalytics()`

---

### STEP 6: Create Context Providers

**Action:** Create React Context for shared state

#### 6.1: Create `src/context/NavigationContext.jsx`

**File to Create:**
```javascript
// src/context/NavigationContext.jsx
import { createContext } from 'react';

export const NavigationContext = createContext(null);

/**
 * Navigation Context Provider
 * Makes navigate function available to all children
 * 
 * @param {Object} props
 * @param {Function} props.navigate - Navigation function
 * @param {React.ReactNode} props.children
 */
export function NavigationProvider({ navigate, children }) {
  return (
    <NavigationContext.Provider value={{ navigate }}>
      {children}
    </NavigationContext.Provider>
  );
}
```

**Why:** Eliminates need for `window.navigate`, provides proper React context

**Files to Update Later:**
- `src/Router.jsx` - Wrap app with NavigationProvider
- `src/App.jsx` - Use `useNavigation()` instead of prop/global

---

#### 6.2: Create `src/context/AppContext.jsx`

**File to Create:**
```javascript
// src/context/AppContext.jsx
import { createContext } from 'react';
import { useTheme } from '../hooks/useTheme';
import { useNotification } from '../hooks/useNotification';

export const AppContext = createContext(null);

/**
 * App Context Provider
 * Provides theme and notification state to all children
 * 
 * @param {React.ReactNode} props.children
 */
export function AppProvider({ children }) {
  const [theme, setTheme] = useTheme();
  const notification = useNotification();

  // Calculate spark color based on theme
  const sparkColor = theme === 'dark' ? '#F2E7C9' : '#4E4B93';

  const handleThemeChange = (newTheme) => {
    setTheme(newTheme);
  };

  const value = {
    theme,
    setTheme: handleThemeChange,
    sparkColor,
    notification
  };

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
}

/**
 * Hook to access App context
 * @returns {Object} App context value
 */
export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within AppProvider');
  }
  return context;
}
```

**Why:** Centralizes app-wide state, eliminates prop drilling

**Files to Update Later:**
- `src/App.jsx` - Use `useApp()` instead of local state
- Components can access theme/notifications via context

---

### STEP 7: Move Components to New Structure

**Action:** Reorganize components into feature/layout/ui structure

#### 7.1: Move UI Components

**Files to Move:**
- `src/components/NotificationToast.jsx` → `src/components/ui/NotificationToast/NotificationToast.jsx`
- `src/components/NotificationToast.css` → `src/components/ui/NotificationToast/NotificationToast.css`
- `src/ThemeToggle.jsx` → `src/components/ui/ThemeToggle/ThemeToggle.jsx`
- `src/ThemeToggle.css` → `src/components/ui/ThemeToggle/ThemeToggle.css`

**Files to Update:**
- `src/App.jsx` - Update imports
- Any other files importing these components

---

#### 7.2: Move Layout Components

**Files to Move:**
- `src/components/Dock/Dock.jsx` → `src/components/layout/Dock/Dock.jsx` (already in Dock folder, just move folder)
- `src/components/Dock/Dock.css` → `src/components/layout/Dock/Dock.css`
- `src/components/BackgroundImage.jsx` → `src/components/layout/BackgroundImage/BackgroundImage.jsx`
- `src/components/BackgroundImage.css` → `src/components/layout/BackgroundImage/BackgroundImage.css`

**Files to Update:**
- `src/App.jsx` - Update imports

---

#### 7.3: Move Feature Components

**Files to Move:**
- `src/components/NewsletterArchive.jsx` → `src/components/features/newsletter/NewsletterArchive/NewsletterArchive.jsx`
- `src/components/NewsletterArchive.css` → `src/components/features/newsletter/NewsletterArchive/NewsletterArchive.css`
- `src/components/NewsletterHeader.jsx` → `src/components/features/newsletter/NewsletterHeader/NewsletterHeader.jsx`
- `src/components/NewsletterHeader.css` → `src/components/features/newsletter/NewsletterHeader/NewsletterHeader.css`
- `src/components/NewsletterIssueCard.jsx` → `src/components/features/newsletter/NewsletterIssueCard/NewsletterIssueCard.jsx`
- `src/components/NewsletterIssueCard.css` → `src/components/features/newsletter/NewsletterIssueCard/NewsletterIssueCard.css`
- `src/components/Newsletter.jsx` → `src/components/features/newsletter/Newsletter/Newsletter.jsx`
- `src/components/LTAIBrandWidget.jsx` → `src/components/features/brand/LTAIBrandWidget/LTAIBrandWidget.jsx`
- `src/components/LTAIBrandWidget.css` → `src/components/features/brand/LTAIBrandWidget/LTAIBrandWidget.css`

**Files to Update:**
- `src/Router.jsx` - Update NewsletterArchive import
- `src/components/features/newsletter/NewsletterArchive/NewsletterArchive.jsx` - Update relative imports for NewsletterHeader and NewsletterIssueCard

---

### STEP 8: Create Page Components

**Action:** Extract page views from App.jsx into separate components

#### 8.1: Create `src/pages/HomePage.jsx`

**File to Create:**
```javascript
// src/pages/HomePage.jsx
import TextType from '../animations/TextType';
import { SOCIAL_LINKS } from '../config/socialLinks';
import { useAnalytics } from '../hooks/useAnalytics';

export default function HomePage() {
  const { trackSocialClick } = useAnalytics();

  return (
    <div className="content-card">
      <TextType
        text="Thomas Bustos"
        as="h1"
        className="name"
        typingSpeed={100}
        loop={false}
        showCursor={true}
        cursorCharacter="|"
      />
      <div className="bio-card">
        <p className="description">
          Builder. Founder. Learner. I'm currently co-founding Radiance and building The SOURCE®, our Creative OS for brands. I host Let's Talk AI, 90+ episodes with founders, builders, and leaders in tech. I learn obsessively in public.
        </p>
      </div>
      <nav className="socials">
        {SOCIAL_LINKS.map((social) => (
          <a
            key={social.name}
            href={social.url}
            target="_blank"
            rel="noopener noreferrer"
            className="social-link"
            onClick={() => trackSocialClick(social.name)}
          >
            {social.name}
          </a>
        ))}
      </nav>
    </div>
  );
}
```

**Why:** Separates home page logic from App.jsx, makes it reusable and testable

---

#### 8.2: Create `src/pages/MissionPage.jsx`

**File to Create:**
```javascript
// src/pages/MissionPage.jsx
import TextType from '../animations/TextType';
import { useAnalytics } from '../hooks/useAnalytics';

export default function MissionPage() {
  const { trackSocialClick } = useAnalytics();

  return (
    <div className="content-card">
      <TextType
        text="Mission"
        as="h1"
        className="name"
        typingSpeed={100}
        loop={false}
        showCursor={true}
        cursorCharacter="|"
      />
      <div className="mission-section">
        <a
          href="https://thomasbustos.substack.com/"
          target="_blank"
          rel="noopener noreferrer"
          className="mission-link"
          onClick={() => trackSocialClick('Mission - Substack')}
        >
          <div className="mission-statement">
            Build exceptional products with exceptional people. Document everything along the way.
          </div>
        </a>
      </div>
    </div>
  );
}
```

**Why:** Separates mission page logic, cleaner and more maintainable

---

#### 8.3: Create `src/pages/EventsPage.jsx`

**File to Create:**
```javascript
// src/pages/EventsPage.jsx
import { useState } from 'react';
import TextType from '../animations/TextType';
import { useAnalytics } from '../hooks/useAnalytics';

export default function EventsPage() {
  const [eventsView, setEventsView] = useState('upcoming');
  const { trackSocialClick } = useAnalytics();

  const upcomingEvents = [
    {
      name: 'AI Engineer Europe',
      url: 'https://www.ai.engineer/europe',
      details: 'London, UK • Apr 8-10, 2026',
      label: 'AI Engineer Europe'
    }
  ];

  const pastEvents = [
    {
      name: 'NeurIPS 2025',
      url: 'https://neurips.cc/',
      details: 'San Diego, CA • Dec 2-7, 2025',
      label: 'NeurIPS 2025'
    },
    {
      name: 'AIE Code Summit',
      url: 'https://www.ai.engineer/',
      details: 'New York • Nov 20-22, 2025',
      label: 'AIE Code Summit'
    }
  ];

  return (
    <div className="content-card">
      <TextType
        text="Events"
        as="h1"
        className="name"
        typingSpeed={100}
        loop={false}
        showCursor={true}
        cursorCharacter="|"
      />
      <div className="events-section">
        <div className="events-widget">
          <div className="events-tabs">
            <button
              className={`events-tab ${eventsView === 'upcoming' ? 'active' : ''}`}
              onClick={() => setEventsView('upcoming')}
            >
              Upcoming
            </button>
            <button
              className={`events-tab ${eventsView === 'past' ? 'active' : ''}`}
              onClick={() => setEventsView('past')}
            >
              Past
            </button>
          </div>

          {eventsView === 'upcoming' ? (
            <div className="events-list">
              {upcomingEvents.map((event, index) => (
                <a
                  key={index}
                  href={event.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="event-link"
                  onClick={() => trackSocialClick(event.label)}
                >
                  <div className="event-item">
                    <span className="event-name">{event.name}</span>
                    <span className="event-details">{event.details}</span>
                  </div>
                </a>
              ))}
            </div>
          ) : (
            <div className="events-list">
              {pastEvents.map((event, index) => (
                <a
                  key={index}
                  href={event.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="event-link"
                  onClick={() => trackSocialClick(event.label)}
                >
                  <div className="event-item">
                    <span className="event-name">{event.name}</span>
                    <span className="event-details">{event.details}</span>
                  </div>
                </a>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
```

**Why:** Separates events page logic, can be extended with event data management later

---

#### 8.4: Create `src/pages/NewsletterPage.jsx`

**File to Create:**
```javascript
// src/pages/NewsletterPage.jsx
import NewsletterArchive from '../components/features/newsletter/NewsletterArchive/NewsletterArchive';
import { useNavigation } from '../hooks/useNavigation';

export default function NewsletterPage() {
  const navigate = useNavigation();

  return <NewsletterArchive navigate={navigate} />;
}
```

**Why:** Provides consistent page structure, NewsletterArchive can focus on its content

---

### STEP 9: Refactor App.jsx

**Action:** Simplify App.jsx to orchestrate components

**File to Update:** `src/App.jsx`

**New Content:**
```javascript
// src/App.jsx
import { useApp } from './context/AppContext';
import { useNavigation } from './hooks/useNavigation';
import { getActiveView } from './config/routes';
import { createDockItems } from './config/dockItems';

import ClickSpark from './animations/ClickSpark';
import BackgroundImage from './components/layout/BackgroundImage/BackgroundImage';
import Dock from './components/layout/Dock/Dock';
import ThemeToggle from './components/ui/ThemeToggle/ThemeToggle';
import LTAIBrandWidget from './components/features/brand/LTAIBrandWidget/LTAIBrandWidget';
import NotificationToast from './components/ui/NotificationToast/NotificationToast';

import HomePage from './pages/HomePage';
import MissionPage from './pages/MissionPage';
import EventsPage from './pages/EventsPage';

function App({ currentPath = '/' }) {
  const { theme, setTheme, sparkColor, notification } = useApp();
  const navigate = useNavigation();
  const activeView = getActiveView(currentPath);
  const dockItems = createDockItems(navigate);

  return (
    <ClickSpark
      sparkColor={sparkColor}
      sparkSize={12}
      sparkRadius={20}
      sparkCount={8}
      duration={500}
      easing="ease-out"
      extraScale={1.2}
    >
      <BackgroundImage theme={theme} />
      <div className="container">
        <main className="content-layer">
          <ThemeToggle onThemeChange={setTheme} />

          {activeView === 'home' && <HomePage />}
          {activeView === 'mission' && <MissionPage />}
          {activeView === 'events' && <EventsPage />}
        </main>

        <Dock
          items={dockItems}
          activeView={activeView}
          panelHeight={68}
          baseItemSize={50}
          magnification={70}
        />
        
        <LTAIBrandWidget onNotify={notification.show} />
      </div>

      <NotificationToast 
        message={notification.notification}
        isVisible={notification.showNotification}
        onClose={notification.hide}
      />
    </ClickSpark>
  );
}

export default App;
```

**Changes:**
- Removed all state management (moved to hooks/context)
- Removed inline component definitions (moved to pages)
- Removed constants (moved to config)
- Uses context and hooks for shared state
- Much cleaner and focused on orchestration

---

### STEP 10: Update Router.jsx

**Action:** Integrate context providers and update imports

**File to Update:** `src/Router.jsx`

**New Content:**
```javascript
// src/Router.jsx
import { useState, useEffect } from 'react';
import { AppProvider } from './context/AppContext';
import { NavigationProvider } from './context/NavigationContext';
import App from './App';
import NewsletterPage from './pages/NewsletterPage';
import { ROUTES } from './config/routes';

function Router() {
  const [currentPath, setCurrentPath] = useState(window.location.pathname);

  useEffect(() => {
    const handlePopState = () => {
      setCurrentPath(window.location.pathname);
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // Manage body classes based on current route
  useEffect(() => {
    if (currentPath.startsWith(ROUTES.NEWSLETTER.path)) {
      document.body.classList.add('newsletter-page');
    } else {
      document.body.classList.remove('newsletter-page');
    }
  }, [currentPath]);

  const navigate = (path) => {
    window.history.pushState({}, '', path);
    setCurrentPath(path);
  };

  // Make navigate function available globally for backward compatibility
  // TODO: Remove this once all components use context
  window.navigate = navigate;

  const renderCurrentPage = () => {
    if (currentPath.startsWith(ROUTES.NEWSLETTER.path)) {
      return <NewsletterPage />;
    }

    switch (currentPath) {
      case ROUTES.HOME.path:
      case ROUTES.MISSION.path:
      case ROUTES.EVENTS.path:
        return <App currentPath={currentPath} />;
      default:
        return <App currentPath={ROUTES.HOME.path} />;
    }
  };

  return (
    <AppProvider>
      <NavigationProvider navigate={navigate}>
        {renderCurrentPage()}
      </NavigationProvider>
    </AppProvider>
  );
}

export default Router;
```

**Changes:**
- Wraps app with context providers
- Uses route constants
- Uses NewsletterPage component
- Still maintains window.navigate for backward compatibility (can remove later)

---

### STEP 11: Update NewsletterArchive Component

**Action:** Update to use hooks and context

**File to Update:** `src/components/features/newsletter/NewsletterArchive/NewsletterArchive.jsx`

**Key Changes:**
- Import `useTheme` instead of managing theme state
- Import `useNavigation` instead of receiving navigate as prop
- Update relative imports for NewsletterHeader and NewsletterIssueCard

**Updated Imports Section:**
```javascript
import { useState, useEffect } from 'react';
import { useTheme } from '../../../hooks/useTheme';
import { useNavigation } from '../../../hooks/useNavigation';
import './NewsletterArchive.css';
import NewsletterIssueCard from '../NewsletterIssueCard/NewsletterIssueCard';
import NewsletterHeader from '../NewsletterHeader/NewsletterHeader';
```

**Updated Component:**
- Replace `const [theme, setTheme] = useState(...)` with `const [theme, setTheme] = useTheme()`
- Replace `navigate` prop with `const navigate = useNavigation()`
- Update `handleReturnHome` to use `navigate` from hook

---

### STEP 12: Update Component Imports

**Action:** Update all relative imports in moved components

**Files to Check and Update:**

1. **NewsletterHeader.jsx** - Update any relative imports
2. **NewsletterIssueCard.jsx** - Update any relative imports  
3. **LTAIBrandWidget.jsx** - Update CSS import path, add useAnalytics hook
4. **Dock.jsx** - Verify CSS import path
5. **BackgroundImage.jsx** - Update CSS import path
6. **ThemeToggle.jsx** - Update CSS import path
7. **NotificationToast.jsx** - Update CSS import path

**Pattern for Updates:**
- If component moved from `src/components/X.jsx` to `src/components/features/Y/X/X.jsx`
- CSS imports should be: `import './X.css'` (same folder)
- Other component imports need relative paths updated

---

### STEP 13: Update LTAIBrandWidget to Use Analytics Hook

**File to Update:** `src/components/features/brand/LTAIBrandWidget/LTAIBrandWidget.jsx`

**Changes:**
- Import `useAnalytics` hook
- Replace inline `window.gtag` calls with hook methods
- Update CSS import to relative path

**Example:**
```javascript
import { useAnalytics } from '../../../hooks/useAnalytics';

function LTAIBrandWidget({ onNotify }) {
  const { trackEvent } = useAnalytics();
  
  // Replace window.gtag calls with:
  trackEvent('logo_download', {
    'event_category': 'brand',
    'event_label': 'LTAI Logo'
  });
}
```

---

### STEP 14: Create AppLayout Component (Optional Enhancement)

**Action:** Extract layout structure for reusability

**File to Create:** `src/components/layout/AppLayout/AppLayout.jsx`

```javascript
// src/components/layout/AppLayout/AppLayout.jsx
import BackgroundImage from '../BackgroundImage/BackgroundImage';
import Dock from '../Dock/Dock';
import ThemeToggle from '../../ui/ThemeToggle/ThemeToggle';
import LTAIBrandWidget from '../../features/brand/LTAIBrandWidget/LTAIBrandWidget';

export default function AppLayout({ 
  theme, 
  onThemeChange, 
  dockItems, 
  activeView, 
  onNotify,
  children 
}) {
  return (
    <>
      <BackgroundImage theme={theme} />
      <div className="container">
        <main className="content-layer">
          <ThemeToggle onThemeChange={onThemeChange} />
          {children}
        </main>

        <Dock
          items={dockItems}
          activeView={activeView}
          panelHeight={68}
          baseItemSize={50}
          magnification={70}
        />
        
        <LTAIBrandWidget onNotify={onNotify} />
      </div>
    </>
  );
}
```

**Why:** Further simplifies App.jsx, makes layout reusable

**Note:** This is optional - App.jsx is already much cleaner without it

---

### STEP 15: Final Cleanup

**Action:** Remove unused code and verify everything works

**Tasks:**
1. **Remove window.navigate** (if all components use context)
   - Search for `window.navigate` usage
   - Replace with `useNavigation()` hook
   - Remove from Router.jsx

2. **Verify all imports**
   - Run the app and check console for import errors
   - Fix any broken import paths

3. **Check for unused files**
   - Remove any old component files that weren't moved
   - Remove duplicate files

4. **Update any remaining hardcoded paths**
   - Search for hardcoded route strings
   - Replace with ROUTES constants

---

## File Changes Summary

### Files Created (New)
```
src/
├── hooks/
│   ├── useTheme.js
│   ├── useNavigation.js
│   ├── useNotification.js
│   └── useAnalytics.js
├── context/
│   ├── AppContext.jsx
│   └── NavigationContext.jsx
├── config/
│   ├── dockItems.js
│   ├── socialLinks.js
│   └── routes.js
├── pages/
│   ├── HomePage.jsx
│   ├── MissionPage.jsx
│   ├── EventsPage.jsx
│   └── NewsletterPage.jsx
└── components/
    ├── layout/
    │   └── AppLayout/ (optional)
    └── [reorganized structure]
```

### Files Moved
```
src/ClickSpark.jsx → src/animations/ClickSpark.jsx
src/TextType.jsx → src/animations/TextType.jsx
src/TextType.css → src/animations/TextType.css
src/analytics.js → src/utils/analytics.js
src/ThemeToggle.jsx → src/components/ui/ThemeToggle/ThemeToggle.jsx
src/ThemeToggle.css → src/components/ui/ThemeToggle/ThemeToggle.css
src/components/NotificationToast.* → src/components/ui/NotificationToast/
src/components/Dock/ → src/components/layout/Dock/
src/components/BackgroundImage.* → src/components/layout/BackgroundImage/
src/components/NewsletterArchive.* → src/components/features/newsletter/NewsletterArchive/
src/components/NewsletterHeader.* → src/components/features/newsletter/NewsletterHeader/
src/components/NewsletterIssueCard.* → src/components/features/newsletter/NewsletterIssueCard/
src/components/Newsletter.jsx → src/components/features/newsletter/Newsletter/
src/components/LTAIBrandWidget.* → src/components/features/brand/LTAIBrandWidget/
```

### Files Updated (Modified)
```
src/App.jsx                    # Major refactor - simplified
src/Router.jsx                  # Added context providers, updated imports
src/main.jsx                    # Updated analytics import path
src/components/features/newsletter/NewsletterArchive/NewsletterArchive.jsx  # Use hooks
src/components/features/brand/LTAIBrandWidget/LTAIBrandWidget.jsx  # Use analytics hook
[All component files with updated import paths]
```

### Files Removed
```
None - we're moving, not deleting (for safety)
```

---

## Testing Checklist

After completing the refactoring, verify:

### Functionality Tests
- [ ] Home page loads and displays correctly
- [ ] Mission page loads and displays correctly
- [ ] Events page loads with tabs working
- [ ] Newsletter archive page loads
- [ ] Navigation between pages works (Dock clicks)
- [ ] Browser back/forward buttons work
- [ ] Theme toggle works on all pages
- [ ] Theme persists after page refresh
- [ ] ClickSpark animation works
- [ ] LTAIBrandWidget opens and functions
- [ ] Notification toast appears and dismisses
- [ ] Social links work and track analytics
- [ ] All external links open correctly

### Code Quality Checks
- [ ] No console errors
- [ ] No import errors
- [ ] All components render without warnings
- [ ] CSS styles apply correctly
- [ ] No unused imports
- [ ] No broken relative paths

### Architecture Verification
- [ ] All pages use hooks instead of local state (where applicable)
- [ ] Theme state is shared via context
- [ ] Navigation uses context (or hook)
- [ ] Analytics tracking works via hook
- [ ] Configuration is in config files
- [ ] Components are in correct folders

---

## Migration Notes

### Backward Compatibility
- `window.navigate` is kept temporarily for safety
- Can be removed once all components use `useNavigation()` hook
- Search codebase for `window.navigate` usage before removing

### Breaking Changes
- **Import paths changed** - All components need updated imports
- **Props changed** - Some components no longer receive certain props (use context instead)
- **File locations changed** - Need to update any external references

### Rollback Plan
If something breaks:
1. Git commit before starting: `git commit -am "Before refactoring"`
2. If issues arise: `git reset --hard HEAD` to revert
3. Or fix issues incrementally - each step is independent

---

## Next Steps (Future Enhancements)

After this refactoring is complete, consider:

1. **TypeScript Migration** - Add type safety
2. **Testing** - Add unit tests for hooks and components
3. **Code Splitting** - Lazy load pages for better performance
4. **State Management** - Consider Zustand/Redux if state grows complex
5. **Routing Library** - Migrate to React Router if routing becomes complex
6. **Component Library** - Extract reusable UI components to separate package

---

## Questions & Troubleshooting

### Common Issues

**Issue:** Import errors after moving files
- **Solution:** Check relative import paths, update to new file locations

**Issue:** Theme not persisting
- **Solution:** Verify `useTheme` hook is being used, check localStorage

**Issue:** Navigation not working
- **Solution:** Verify NavigationProvider wraps components, check navigate function

**Issue:** Context not available
- **Solution:** Ensure component is inside AppProvider/NavigationProvider

### Getting Help
- Check browser console for specific errors
- Verify all import paths are correct
- Ensure context providers wrap the app
- Test each step incrementally

---

## Conclusion

This refactoring transforms your codebase from a monolithic structure to a well-organized, maintainable architecture. Each step builds on the previous one, so follow them in order.

**Key Principles Applied:**
- ✅ Separation of Concerns
- ✅ Single Responsibility Principle
- ✅ DRY (Don't Repeat Yourself)
- ✅ Component Composition
- ✅ Reusable Hooks
- ✅ Context for Shared State

Good luck with the refactoring! 🚀
