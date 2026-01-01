# Thomas Bustos - Personal Website

A minimalist React-based personal website.

## Setup

1. Install dependencies:
```bash
npm install
```

2. Create a `.env` file in the project root:
```bash
cp .env.example .env
```

3. Add your environment variables to `.env`:
```
VITE_GA_MEASUREMENT_ID=G-XXXXXXXXXX
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key
```

4. Run development server:
```bash
npm run dev
```

5. Build for production:
```bash
npm run build
```

## Project Structure

```
src/
├── pages/                    # Page components
│   ├── Home                  # Landing page
│   ├── Mission               # About/mission page
│   ├── Events                # Events calendar
│   ├── Library               # Book library
│   ├── NewsletterPage        # Daily digest archive
│   └── DigestDetailPage      # Individual digest view
├── components/
│   ├── ui/                   # Reusable UI components
│   │   ├── ThemeToggle
│   │   └── NotificationToast
│   ├── layout/               # Layout components
│   │   ├── Dock              # Navigation dock
│   │   └── BackgroundImage
│   └── features/             # Feature-specific components
│       ├── brand/            # BrandAvatar, LTAIBrandWidget
│       ├── newsletter/       # NewsletterHeader, IssueCard, DigestContent
│       └── library/          # BookCard, BookModal
├── hooks/                    # Custom React hooks
│   ├── useTheme              # Theme management
│   ├── useNotification       # Toast notifications
│   ├── useAnalytics          # GA tracking
│   ├── useNavigation         # Client-side routing
│   └── useDigests            # Supabase digest fetching
├── services/                 # API layer
│   ├── supabase.js           # Supabase client
│   └── digestService.js      # Digest queries
├── context/                  # React context providers
│   ├── AppContext            # Theme, notifications
│   └── NavigationContext     # Routing
├── config/                   # Configuration
│   ├── routes.js             # Route definitions
│   ├── dockItems.jsx         # Dock navigation items
│   └── socialLinks.js        # Social media links
├── data/                     # Static/fallback data
│   ├── books.js              # Book library data
│   ├── events.js             # Events data
│   └── newsletterIssues.js   # Fallback digest data
├── animations/               # Visual effects
│   ├── PixelBlast            # 3D particle effect
│   ├── TextType              # Typing animation
│   └── ClickSpark            # Click effects
├── utils/                    # Utilities
│   └── analytics.js          # GA initialization
└── assets/                   # Static assets

public/                       # Static files
├── images/                   # Image assets
├── favicon.ico               # Favicon
├── robots.txt                # SEO robots
├── sitemap.xml               # SEO sitemap
└── llms.txt                  # LLM discovery
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

## Analytics

This site uses Google Analytics to track visitor metrics. The implementation uses environment variables to keep the Measurement ID out of the public repository while still allowing it to be visible in the deployed site (as is standard for client-side analytics).

### Setup Google Analytics:

1. Create a Google Analytics account at [analytics.google.com](https://analytics.google.com)
2. Get your Measurement ID (format: `G-XXXXXXXXXX`)
3. Add it to your `.env` file: `VITE_GA_MEASUREMENT_ID=G-XXXXXXXXXX`
4. For Vercel deployment, add the environment variable in your project settings

## Supabase Integration

The newsletter/digest feature pulls live data from Supabase. If Supabase credentials are not configured, it falls back to mock data.

### Setup Supabase:

1. Create a Supabase project at [supabase.com](https://supabase.com)
2. Get your project URL and anon key from Settings > API
3. Add to your `.env` file:
   ```
   VITE_SUPABASE_URL=https://your-project.supabase.co
   VITE_SUPABASE_ANON_KEY=your-anon-key
   ```
4. For Vercel deployment, add environment variables in project settings

### Security

**Important:** This project uses Row Level Security (RLS) to protect data. The `anon` key is public and visible in the browser - security comes from RLS policies, not the key.

See [SECURITY.md](./SECURITY.md) for:
- Full architecture overview
- RLS policy documentation
- Guidelines for adding new tables
- Verification queries

### Deployment:

**Vercel Environment Variables:**
- Go to your Vercel project → Settings → Environment Variables
- Add: `VITE_GA_MEASUREMENT_ID` with your Google Analytics ID
- Add: `VITE_SUPABASE_URL` with your Supabase project URL
- Add: `VITE_SUPABASE_ANON_KEY` with your Supabase anon key
- Redeploy your site

If you fork this project and don't want analytics or Supabase, simply don't set the environment variables - the site will work with fallback data.
