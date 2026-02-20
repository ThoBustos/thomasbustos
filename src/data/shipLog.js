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
    date: "2026-03-03",
    linkedin: 0,
    x: 0,
    tiktok: 0,
    youtube: 0,
    substack: 0,
    shorts: 1,
    notes: [
      "shorts: Episode 99 YouTube Short"
    ]
  },
  {
    date: "2026-02-26",
    linkedin: 0,
    x: 1,
    tiktok: 0,
    youtube: 0,
    substack: 0,
    shorts: 0,
    notes: [
      "x: Episode 99 reel"
    ]
  },
  {
    date: "2026-02-25",
    linkedin: 0,
    x: 1,
    tiktok: 1,
    youtube: 0,
    substack: 0,
    shorts: 1,
    notes: [
      "x: Episode 99 reel",
      "tiktok: Episode 99 reel",
      "shorts: Episode 99 YouTube Short"
    ]
  },
  {
    date: "2026-02-24",
    linkedin: 2,
    x: 2,
    tiktok: 1,
    youtube: 0,
    substack: 0,
    shorts: 1,
    notes: [
      "x: Episode 98 reel",
      "linkedin: Episode 99 trailer",
      "linkedin: Episode 99 reel",
      "x: Episode 99 reel",
      "tiktok: Episode 99 reel",
      "shorts: Episode 99 YouTube Short"
    ]
  },
  {
    date: "2026-02-23",
    linkedin: 2,
    x: 2,
    tiktok: 1,
    youtube: 0,
    substack: 0,
    shorts: 1,
    notes: [
      "linkedin: Episode 98 reel",
      "x: Episode 98 reel",
      "shorts: Episode 98 YouTube Short",
      "linkedin: Episode 99 reel",
      "x: Episode 99 trailer",
      "tiktok: Episode 99 reel"
    ]
  },
  {
    date: "2026-02-20",
    linkedin: 2,
    x: 3,
    tiktok: 1,
    youtube: 1,
    substack: 2,
    shorts: 1,
    notes: [
      "linkedin: Episode 98 reel",
      "x: Episode 98 reel",
      "tiktok: Episode 98 reel",
      "shorts: Episode 98 YouTube Short",
      "Episode 99 release day",
      "youtube: Episode 99 full episode",
      "substack: Episode 99 post",
      "linkedin: Episode 99 reel",
      "x: Episode 99 full episode",
      "substack: Reading the GPT Papers (1,2,3,4)",
      "x: Reading the GPT Papers post"
    ]
  },
  {
    date: "2026-02-19",
    linkedin: 1,
    x: 1,
    tiktok: 1,
    youtube: 0,
    substack: 0,
    shorts: 1,
    notes: [
      "linkedin: Episode 98 reel",
      "x: Episode 98 trailer",
      "tiktok: Episode 98 reel",
      "shorts: Episode 98 YouTube Short"
    ]
  },
  {
    date: "2026-02-18",
    linkedin: 1,
    x: 1,
    tiktok: 1,
    youtube: 1,
    substack: 1,
    shorts: 0,
    notes: [
      "Episode 98 release day",
      "youtube: Episode 98 full episode",
      "substack: Episode 98 post",
      "linkedin: Episode 98 trailer",
      "x: Episode 98 full episode",
      "tiktok: Episode 98 reel"
    ]
  },
  {
    date: "2026-02-13",
    linkedin: 2,
    x: 3,
    tiktok: 0,
    youtube: 0,
    substack: 1,
    shorts: 0,
    notes: [
      "linkedin: AI Leader Playbook - Three Pillars post",
      "x: AI Leader Playbook - Three Pillars post",
      "substack: Path to 10x Engineer post",
      "x: Path to 10x Engineer post",
      "x: Path to 10x Engineer promo",
      "linkedin: Path to 10x Engineer promo"
    ]
  },
  {
    date: "2026-02-10",
    linkedin: 0,
    x: 1,
    tiktok: 0,
    youtube: 0,
    substack: 0,
    shorts: 0,
    notes: [
      "x: Episode 97 reel"
    ]
  },
  {
    date: "2026-02-09",
    linkedin: 1,
    x: 1,
    tiktok: 0,
    youtube: 0,
    substack: 0,
    shorts: 1,
    notes: [
      "linkedin: Episode 97 reel",
      "x: Episode 97 reel",
      "shorts: Episode 97 YouTube Short"
    ]
  },
  {
    date: "2026-02-06",
    linkedin: 2,
    x: 3,
    tiktok: 1,
    youtube: 0,
    substack: 1,
    shorts: 1,
    notes: [
      "linkedin: Episode 97 reel",
      "x: Episode 97 reel",
      "tiktok: Episode 97 reel",
      "shorts: Episode 97 YouTube Short",
      "substack: The AI Leader's Playbook",
      "linkedin: The AI Leader's Playbook post",
      "x: The AI Leader's Playbook post",
      "x: The AI Leader's Playbook tweet"
    ]
  },
  {
    date: "2026-02-05",
    linkedin: 1,
    x: 1,
    tiktok: 1,
    youtube: 0,
    substack: 0,
    shorts: 1,
    notes: [
      "linkedin: Episode 97 reel",
      "x: Episode 97 trailer",
      "tiktok: Episode 97 reel",
      "shorts: Episode 97 YouTube Short"
    ]
  },
  {
    date: "2026-02-04",
    linkedin: 1,
    x: 1,
    tiktok: 1,
    youtube: 1,
    substack: 1,
    shorts: 0,
    notes: [
      "Episode 97 release day",
      "youtube: Episode 97 full episode",
      "substack: Episode 97 post",
      "linkedin: Episode 97 trailer",
      "x: Episode 97 full episode",
      "tiktok: Episode 97 reel"
    ]
  },
  {
    date: "2026-02-03",
    linkedin: 1,
    x: 1,
    tiktok: 0,
    youtube: 0,
    substack: 0,
    shorts: 0,
    notes: [
      "linkedin: Episode 96 reel",
      "x: Episode 96 reel"
    ]
  },
  {
    date: "2026-02-02",
    linkedin: 1,
    x: 1,
    tiktok: 0,
    youtube: 0,
    substack: 0,
    shorts: 0,
    notes: [
      "linkedin: Episode 96 reel",
      "x: Episode 96 reel"
    ]
  },
  {
    date: "2026-02-01",
    linkedin: 0,
    x: 0,
    tiktok: 0,
    youtube: 0,
    substack: 0,
    shorts: 1,
    notes: [
      "shorts: Episode 96 YouTube Short"
    ]
  },
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
    date: "2026-01-30",
    linkedin: 1,
    x: 1,
    tiktok: 1,
    youtube: 0,
    substack: 0,
    shorts: 1,
    notes: [
      "linkedin: Episode 96 reel",
      "x: Episode 96 reel",
      "tiktok: Episode 96 reel",
      "shorts: Episode 96 YouTube Short"
    ]
  },
  {
    date: "2026-01-29",
    linkedin: 1,
    x: 3,
    tiktok: 1,
    youtube: 0,
    substack: 1,
    shorts: 1,
    notes: [
      "x: Episode 96 trailer",
      "tiktok: Episode 96 reel",
      "shorts: Episode 96 YouTube Short",
      "substack: The AI Native Employee post",
      "x: The AI Native Employee post",
      "x: The AI Native Employee repost",
      "linkedin: Announcing The AI Native Employee post"
    ]
  },
  {
    date: "2026-01-28",
    linkedin: 1,
    x: 1,
    tiktok: 1,
    youtube: 1,
    substack: 1,
    shorts: 0,
    notes: [
      "Episode 96 release day",
      "youtube: Episode 96 full episode",
      "substack: Episode 96 post",
      "linkedin: Episode 96 trailer",
      "x: Episode 96 full episode post",
      "tiktok: Episode 96 reel"
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
