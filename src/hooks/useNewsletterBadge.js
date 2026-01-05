// src/hooks/useNewsletterBadge.js
import { useState, useEffect } from 'react';
import { digestService } from '../services/digestService';

const STORAGE_KEY = 'lastViewedNewsletter';

export function useNewsletterBadge() {
  const [hasUnread, setHasUnread] = useState(false);

  useEffect(() => {
    async function checkUnread() {
      try {
        if (!digestService.isConfigured()) return;

        const latest = await digestService.getLatest();
        if (!latest?.publish_date) return;

        const lastViewed = localStorage.getItem(STORAGE_KEY);
        if (!lastViewed || lastViewed < latest.publish_date) {
          setHasUnread(true);
        }
      } catch (err) {
        // Silently fail - badge just won't show
      }
    }

    checkUnread();
  }, []);

  const markAsRead = async () => {
    try {
      if (!digestService.isConfigured()) return;

      const latest = await digestService.getLatest();
      if (latest?.publish_date) {
        localStorage.setItem(STORAGE_KEY, latest.publish_date);
        setHasUnread(false);
      }
    } catch (err) {
      // Silently fail
    }
  };

  return { hasUnread, markAsRead };
}
