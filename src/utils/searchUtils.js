// src/utils/searchUtils.js

/**
 * Get all searchable text fields from any digest type.
 * Normalizes the different shapes into a unified search surface.
 * 
 * @param {Object} digest - The digest object (daily or weekly)
 * @returns {Array<string|undefined>} Array of searchable field values
 */
function getSearchableFields(digest) {
  const fields = [
    digest.title,
    ...(digest.keywords || [])
  ];
  
  // Type-specific fields
  if (digest.digestType === 'weekly') {
    fields.push(
      digest.description,
      digest.content_json?.week_in_review?.summary
    );
  } else {
    // daily (default)
    fields.push(digest.content_json?.daily_tldr);
  }
  
  return fields;
}

/**
 * Check if a digest matches search query across all searchable fields.
 * Works for any digest type (daily, weekly, future types).
 * 
 * @param {Object} digest - The digest to check
 * @param {string} query - The search query
 * @returns {boolean} True if digest matches the query
 */
export function digestMatchesSearch(digest, query) {
  if (!query) return true;
  
  const normalizedQuery = query.toLowerCase();
  return getSearchableFields(digest).some(field => 
    field?.toLowerCase().includes(normalizedQuery)
  );
}

/**
 * Filter tags to only those matching the current search query.
 * Returns all tags if no query is provided.
 * 
 * @param {Array<{tag: string, count: number}>} tags - Tags with counts
 * @param {string} query - The search query
 * @returns {Array<{tag: string, count: number}>} Filtered tags
 */
export function filterTagsByQuery(tags, query) {
  if (!query) return tags;
  
  const normalizedQuery = query.toLowerCase();
  return tags.filter(({ tag }) => 
    tag.toLowerCase().includes(normalizedQuery)
  );
}

