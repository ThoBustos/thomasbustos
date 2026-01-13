// src/utils/newsletterUtils.js

/**
 * Computes unique tags with occurrence counts from digests.
 * Returns tags sorted by frequency (descending), then alphabetically.
 * 
 * @param {Array} digests - Array of digest objects with keywords
 * @returns {Array<{tag: string, count: number}>} Sorted array of tag objects
 */
export function computeTagsWithCounts(digests) {
  const tagCounts = new Map();
  
  digests.forEach(d => {
    (d.keywords || []).forEach(k => {
      tagCounts.set(k, (tagCounts.get(k) || 0) + 1);
    });
  });
  
  return Array.from(tagCounts.entries())
    .sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]))
    .map(([tag, count]) => ({ tag, count }));
}

