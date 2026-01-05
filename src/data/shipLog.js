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
