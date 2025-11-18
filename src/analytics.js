// Google Analytics initialization
export const initGoogleAnalytics = () => {
  const GA_ID = import.meta.env.VITE_GA_MEASUREMENT_ID;
  
  if (!GA_ID) {
    console.warn('Google Analytics: Measurement ID not found. Set VITE_GA_MEASUREMENT_ID in your .env file.');
    return;
  }

  // Load Google Analytics script
  const script = document.createElement('script');
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`;
  document.head.appendChild(script);

  // Initialize dataLayer and gtag function
  window.dataLayer = window.dataLayer || [];
  function gtag(){window.dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', GA_ID);
  
  // Make gtag available globally for custom event tracking
  window.gtag = gtag;
};

// Track custom events
export const trackEvent = (eventName, eventParams = {}) => {
  if (window.gtag) {
    window.gtag('event', eventName, eventParams);
  }
};

// Track social link clicks
export const trackSocialClick = (socialName) => {
  trackEvent('social_click', {
    'social_network': socialName,
    'event_category': 'engagement',
    'event_label': socialName
  });
};

