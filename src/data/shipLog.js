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
