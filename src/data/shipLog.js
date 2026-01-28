// src/data/shipLog.js
/**
 * Ship Log - Public accountability tracker for content shipping
 * Each entry represents posts shipped on a given day across platforms
 *
 * Format:
 * {
 *   date: "YYYY-MM-DD",
 *   linkedin: number,
 *   x: number,
 *   tiktok: number,
 *   youtube: number,
 *   substack: number,
 *   shorts: number,
 *   notes: ["platform: description", ...]  // platform prefix for auto-tracking
 * }
 */

export const SHIP_LOG = [
  {
    date: "2026-01-31",
    linkedin: 1,
    x: 0,
    tiktok: 0,
    youtube: 0,
    substack: 0,
    shorts: 0,
    notes: [
      "linkedin: The AI Native Company follow-up post"
    ]
  },
  {
    date: "2026-01-28",
    linkedin: 4,
    x: 4,
    tiktok: 3,
    youtube: 1,
    substack: 1,
    shorts: 3,
    notes: [
      "Episode 96 release - full episode on YouTube, Substack, Ausha",
      "linkedin: Trailer + 3 reels (scheduled Jan 28-Feb 3)",
      "x: Full episode + trailer + 3 reels (scheduled Jan 28-Feb 3)",
      "tiktok: 3 reels (scheduled Jan 28-30)",
      "shorts: 3 YouTube Shorts (scheduled Jan 29-Feb 1)"
    ]
  },
  {
    date: "2026-01-27",
    linkedin: 0,
    x: 1,
    tiktok: 0,
    youtube: 0,
    substack: 0,
    shorts: 0,
    notes: [
      "x: Episode 95 reel"
    ]
  },
  {
    date: "2026-01-26",
    linkedin: 0,
    x: 1,
    tiktok: 0,
    youtube: 0,
    substack: 0,
    shorts: 1,
    notes: [
      "shorts: Episode 95 YouTube Short",
      "x: Episode 95 reel"
    ]
  },
  {
    date: "2026-01-23",
    linkedin: 1,
    x: 2,
    tiktok: 1,
    youtube: 0,
    substack: 1,
    shorts: 1,
    notes: [
      "substack: The AI Native Company (full post)",
      "x: The AI Native Company (full post)",
      "linkedin: Posted about The AI Native Company article",
      "shorts: Episode 95 YouTube Short",
      "x: Episode 95 reel",
      "tiktok: Episode 95 reel"
    ]
  },
  {
    date: "2026-01-22",
    linkedin: 1,
    x: 5,
    tiktok: 1,
    youtube: 1,
    substack: 0,
    shorts: 1,
    notes: [
      "episode 95 went live - youtube video, linkedin newsletter, and x announcement",
      "dropped 3 tweets about early stage frameworks",
      "shorts: Episode 95 YouTube Short",
      "x: Episode 95 trailer",
      "tiktok: Episode 95 reel"
    ]
  },
  {
    date: "2026-01-21",
    linkedin: 1,
    x: 1,
    tiktok: 1,
    youtube: 1,
    substack: 1,
    shorts: 0,
    notes: [
      "youtube: New podcast episode",
      "x: Episode teaser",
      "linkedin: Episode teaser",
      "substack: Podcast episode post",
      "tiktok: Episode 95 reel"
    ]
  },
  {
    date: "2026-01-19",
    linkedin: 0,
    x: 1,
    tiktok: 0,
    youtube: 0,
    substack: 0,
    shorts: 0,
    notes: [
      "x: Weekly report"
    ]
  },
  {
    date: "2026-01-17",
    linkedin: 1,
    x: 1,
    tiktok: 0,
    youtube: 0,
    substack: 0,
    shorts: 0,
    notes: [
      "x: Building live #2 part 2 - AI newsletter weekly generation + UI",
      "linkedin: Building live #2 part 2 - AI newsletter weekly generation + UI"
    ]
  },
  {
    date: "2026-01-15",
    linkedin: 1,
    x: 1,
    tiktok: 0,
    youtube: 0,
    substack: 0,
    shorts: 0,
    notes: [
      "x: The Early-Stage Visibility System (Substack promo)",
      "linkedin: The Early-Stage Visibility System (Substack repurpose)"
    ]
  },
  {
    date: "2026-01-14",
    linkedin: 0,
    x: 1,
    tiktok: 0,
    youtube: 0,
    substack: 1,
    shorts: 0,
    notes: [
      "x: Building live #2 - AI newsletter opensource",
      "substack: The Early-Stage Visibility System"
    ]
  },
  {
    date: "2026-01-07",
    linkedin: 2,
    x: 1,
    tiktok: 0,
    youtube: 0,
    substack: 0,
    shorts: 0,
    notes: [
      "linkedin: Newsletter for Max Berthelot (Lucis, YC X25)",
      "linkedin: Post for Max Berthelot",
      "x: Episode promo"
    ]
  },
  {
    date: "2026-01-05",
    linkedin: 0,
    x: 1,
    tiktok: 0,
    youtube: 0,
    substack: 0,
    shorts: 0,
    notes: [
      "x: AI newsletter live building"
    ]
  },
  // {
  //   date: "2026-01-04",
  //   linkedin: 0,
  //   x: 0,
  //   tiktok: 0,
  //   youtube: 0,
  //   substack: 0,
  //   shorts: 0,
  //   notes: []
  // },
];

// Platform metadata for display
export const PLATFORMS = [
  { key: 'linkedin', label: 'LinkedIn' },
  { key: 'x', label: 'X' },
  { key: 'tiktok', label: 'TikTok' },
  { key: 'youtube', label: 'YouTube' },
  { key: 'substack', label: 'Substack' },
  { key: 'shorts', label: 'Shorts' }
];
