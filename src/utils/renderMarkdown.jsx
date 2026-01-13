/**
 * Simple regex-based markdown renderer for V2 newsletter fields.
 * Handles: **bold**, *italic*, [text](url) links
 * Returns an array of React elements that can be rendered inline.
 */

import React from 'react';

/**
 * Parse markdown text and return React elements
 * @param {string} text - Text containing markdown syntax
 * @param {string} keyPrefix - Prefix for React keys (for list rendering)
 * @returns {React.ReactNode[]} Array of React elements
 */
export function renderMarkdown(text, keyPrefix = 'md') {
  if (!text) return null;

  // Combined regex to match all markdown patterns
  // Order matters: bold (**) must come before italic (*) to avoid conflicts
  const pattern = /(\*\*(.+?)\*\*)|(\*(.+?)\*)|(\[([^\]]+)\]\(([^)]+)\))/g;

  const elements = [];
  let lastIndex = 0;
  let match;
  let partIndex = 0;

  while ((match = pattern.exec(text)) !== null) {
    // Add text before the match
    if (match.index > lastIndex) {
      elements.push(text.slice(lastIndex, match.index));
    }

    if (match[1]) {
      // Bold: **text** - recursively process inner content for nested links
      const boldKey = `${keyPrefix}-b${partIndex++}`;
      elements.push(
        <strong key={boldKey}>{renderMarkdown(match[2], boldKey)}</strong>
      );
    } else if (match[3]) {
      // Italic: *text* - recursively process inner content for nested links
      const italicKey = `${keyPrefix}-i${partIndex++}`;
      elements.push(
        <em key={italicKey}>{renderMarkdown(match[4], italicKey)}</em>
      );
    } else if (match[5]) {
      // Link: [text](url)
      let href = match[7];

      // Transform #video-xxx anchors to YouTube URLs
      if (href.startsWith('#video-')) {
        const videoId = href.replace('#video-', '');
        href = `https://youtube.com/watch?v=${videoId}`;
      }

      elements.push(
        <a
          key={`${keyPrefix}-${partIndex++}`}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="markdown-link"
        >
          {match[6]}
        </a>
      );
    }

    lastIndex = pattern.lastIndex;
  }

  // Add remaining text after last match
  if (lastIndex < text.length) {
    elements.push(text.slice(lastIndex));
  }

  return elements.length > 0 ? elements : text;
}

/**
 * Render markdown text that may contain line breaks into paragraphs
 * @param {string} text - Multi-line text with markdown
 * @param {string} keyPrefix - Prefix for React keys
 * @returns {React.ReactNode[]} Array of paragraph elements
 */
export function renderMarkdownParagraphs(text, keyPrefix = 'p') {
  if (!text) return null;

  const paragraphs = text.split(/\n\n+/);

  return paragraphs.map((para, i) => (
    <p key={`${keyPrefix}-${i}`}>
      {renderMarkdown(para.trim(), `${keyPrefix}-${i}`)}
    </p>
  ));
}

export default renderMarkdown;
