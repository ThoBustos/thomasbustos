// src/utils/shipLogUtils.js
/**
 * Utility functions for Ship Log feature
 */

/**
 * Get total posts for a single day entry
 * @param {Object} entry - Day entry with platform counts
 * @returns {number} Total posts for the day
 */
export function getDayTotal(entry) {
  if (!entry) return 0;
  return (entry.linkedin || 0) +
         (entry.x || 0) +
         (entry.tiktok || 0) +
         (entry.youtube || 0) +
         (entry.substack || 0) +
         (entry.shorts || 0);
}

/**
 * Get intensity level (0-4) for heatmap coloring
 * @param {number} total - Total posts for the day
 * @returns {number} Intensity level 0-4
 */
export function getIntensityLevel(total) {
  if (total === 0) return 0;
  if (total <= 2) return 1;
  if (total <= 4) return 2;
  if (total <= 7) return 3;
  return 4;
}

/**
 * Get the start of the week (Sunday) for a given date
 * @param {Date} date - Input date
 * @returns {Date} Start of the week (Sunday)
 */
function getWeekStart(date) {
  const d = new Date(date);
  const day = d.getDay();
  d.setDate(d.getDate() - day);
  d.setHours(0, 0, 0, 0);
  return d;
}

/**
 * Format date as YYYY-MM-DD
 * @param {Date} date - Date to format
 * @returns {string} Formatted date string
 */
function formatDate(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

/**
 * Get year statistics from log
 * @param {Array} log - Ship log entries
 * @param {string} year - Year to filter (e.g., "2026")
 * @returns {Object} Year stats with totals by platform and entries
 */
export function getYearStats(log, year) {
  const yearEntries = log.filter(e => e.date.startsWith(year));
  const totals = {
    linkedin: 0,
    x: 0,
    tiktok: 0,
    youtube: 0,
    substack: 0,
    shorts: 0
  };

  yearEntries.forEach(entry => {
    Object.keys(totals).forEach(platform => {
      totals[platform] += entry[platform] || 0;
    });
  });

  const total = Object.values(totals).reduce((a, b) => a + b, 0);
  return { totals, total, entries: yearEntries };
}

/**
 * Get week-over-week comparison
 * @param {Array} log - Ship log entries
 * @returns {Object} WoW stats with thisWeek, lastWeek, percentChange
 */
export function getWoWChange(log) {
  const today = new Date();
  const thisWeekStart = getWeekStart(today);
  const lastWeekStart = new Date(thisWeekStart);
  lastWeekStart.setDate(lastWeekStart.getDate() - 7);

  // Create lookup map for quick access
  const logMap = {};
  log.forEach(entry => {
    logMap[entry.date] = entry;
  });

  let thisWeek = 0;
  let lastWeek = 0;

  // Calculate this week total
  for (let i = 0; i < 7; i++) {
    const date = new Date(thisWeekStart);
    date.setDate(date.getDate() + i);
    const dateStr = formatDate(date);
    if (logMap[dateStr]) {
      thisWeek += getDayTotal(logMap[dateStr]);
    }
  }

  // Calculate last week total
  for (let i = 0; i < 7; i++) {
    const date = new Date(lastWeekStart);
    date.setDate(date.getDate() + i);
    const dateStr = formatDate(date);
    if (logMap[dateStr]) {
      lastWeek += getDayTotal(logMap[dateStr]);
    }
  }

  // Calculate percent change
  let percentChange = 0;
  if (lastWeek > 0) {
    percentChange = Math.round(((thisWeek - lastWeek) / lastWeek) * 100);
  } else if (thisWeek > 0) {
    percentChange = 100;
  }

  return { thisWeek, lastWeek, percentChange };
}

/**
 * Generate calendar grid for heatmap (52 weeks × 7 days)
 * @param {string} year - Year to generate grid for
 * @param {Array} entries - Ship log entries for this year
 * @returns {Array} Array of weeks, each week is array of 7 days
 */
export function generateYearGrid(year, entries) {
  // Create lookup map for entries
  const entryMap = {};
  entries.forEach(entry => {
    entryMap[entry.date] = entry;
  });

  const weeks = [];
  const yearNum = parseInt(year, 10);

  // Start from Jan 1st of the year
  const startDate = new Date(yearNum, 0, 1);
  // Find the Sunday before or on Jan 1st
  const firstSunday = new Date(startDate);
  firstSunday.setDate(startDate.getDate() - startDate.getDay());

  // End date - Dec 31st of the year
  const endDate = new Date(yearNum, 11, 31);

  // Generate weeks
  let currentDate = new Date(firstSunday);

  while (currentDate <= endDate || weeks.length < 53) {
    const week = [];

    for (let dayOfWeek = 0; dayOfWeek < 7; dayOfWeek++) {
      const dateStr = formatDate(currentDate);
      const currentYear = currentDate.getFullYear();

      // Only show dates from the target year
      const isInYear = currentYear === yearNum;
      const entry = entryMap[dateStr];
      const total = entry ? getDayTotal(entry) : 0;

      week.push({
        date: dateStr,
        total,
        level: isInYear ? getIntensityLevel(total) : -1, // -1 for out-of-year
        dayOfWeek,
        isInYear,
        notes: entry?.notes || []
      });

      currentDate.setDate(currentDate.getDate() + 1);
    }

    weeks.push(week);

    // Stop if we've passed the year and have at least 52 weeks
    if (currentDate.getFullYear() > yearNum && weeks.length >= 52) {
      break;
    }
  }

  return weeks;
}

/**
 * Get all years present in log
 * @param {Array} log - Ship log entries
 * @returns {Array} Array of year strings sorted newest first
 */
export function getYearsInLog(log) {
  if (!log || log.length === 0) {
    // Return current year if no data
    return [new Date().getFullYear().toString()];
  }
  const years = new Set(log.map(e => e.date.substring(0, 4)));
  return Array.from(years).sort().reverse(); // Most recent first
}

/**
 * Get all-time total posts from log
 * @param {Array} log - Ship log entries
 * @returns {number} Total posts shipped all time
 */
export function getAllTimeTotal(log) {
  return log.reduce((sum, entry) => sum + getDayTotal(entry), 0);
}

/**
 * Get current week entries for 7-day strip display
 * @param {Array} log - Ship log entries
 * @returns {Array} Array of 7 day objects for current week (Sun-Sat)
 */
export function getCurrentWeekEntries(log) {
  const today = new Date();
  const weekStart = getWeekStart(today);

  // Create lookup map
  const logMap = {};
  log.forEach(entry => {
    logMap[entry.date] = entry;
  });

  const weekDays = [];
  for (let i = 0; i < 7; i++) {
    const date = new Date(weekStart);
    date.setDate(date.getDate() + i);
    const dateStr = formatDate(date);
    const entry = logMap[dateStr];
    const total = entry ? getDayTotal(entry) : 0;

    weekDays.push({
      date: dateStr,
      dayOfWeek: i,
      total,
      level: getIntensityLevel(total),
      notes: entry?.notes || [],
      isToday: dateStr === formatDate(today)
    });
  }

  return weekDays;
}

/**
 * Get month total posts
 * @param {Array} log - Ship log entries
 * @param {number} year - Year (e.g., 2026)
 * @param {number} month - Month (0-11)
 * @returns {number} Total posts for the month
 */
export function getMonthTotal(log, year, month) {
  const monthStr = `${year}-${String(month + 1).padStart(2, '0')}`;
  return log
    .filter(e => e.date.startsWith(monthStr))
    .reduce((sum, entry) => sum + getDayTotal(entry), 0);
}

/**
 * Get most recent activity (last day with posts)
 * @param {Array} log - Ship log entries
 * @returns {Object|null} Most recent entry with posts, or null
 */
export function getMostRecentActivity(log) {
  // Sort by date descending and find first with posts
  const sorted = [...log].sort((a, b) => b.date.localeCompare(a.date));
  for (const entry of sorted) {
    if (getDayTotal(entry) > 0) {
      return {
        date: entry.date,
        total: getDayTotal(entry),
        notes: entry.notes || []
      };
    }
  }
  return null;
}
