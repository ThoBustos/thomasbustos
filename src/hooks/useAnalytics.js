// src/hooks/useAnalytics.js
/**
 * Custom hook for analytics tracking
 * Provides consistent interface for tracking events
 *
 * @returns {Object} { trackEvent, trackSocialClick }
 */
export function useAnalytics() {
  const trackEvent = (eventName, eventParams = {}) => {
    if (window.gtag) {
      window.gtag('event', eventName, eventParams);
    }
  };

  const trackSocialClick = (platform) => {
    trackEvent('social_click', {
      'event_category': 'engagement',
      'event_label': platform
    });
  };

  return {
    trackEvent,
    trackSocialClick
  };
}
