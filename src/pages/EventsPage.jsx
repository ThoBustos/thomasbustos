// src/pages/EventsPage.jsx
import { useState } from 'react';
import TextType from '../animations/TextType';
import { useAnalytics } from '../hooks/useAnalytics';
import { UPCOMING_EVENTS, PAST_EVENTS } from '../data/events';

export default function EventsPage() {
  const [eventsView, setEventsView] = useState('upcoming');
  const { trackSocialClick } = useAnalytics();

  return (
    <div className="content-card">
      <TextType
        text="Events"
        as="h1"
        className="name"
        typingSpeed={100}
        loop={false}
        showCursor={true}
        cursorCharacter="|"
      />
      <div className="events-section">
        <div className="events-widget">
          <div className="events-tabs">
            <button
              className={`events-tab ${eventsView === 'upcoming' ? 'active' : ''}`}
              onClick={() => setEventsView('upcoming')}
            >
              Upcoming
            </button>
            <button
              className={`events-tab ${eventsView === 'past' ? 'active' : ''}`}
              onClick={() => setEventsView('past')}
            >
              Past
            </button>
          </div>

          {eventsView === 'upcoming' ? (
            <div className="events-list">
              {UPCOMING_EVENTS.map((event, index) => (
                <a
                  key={index}
                  href={event.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="event-link"
                  onClick={() => trackSocialClick(event.label)}
                >
                  <div className="event-item">
                    <span className="event-name">{event.name}</span>
                    <span className="event-details">{event.details}</span>
                  </div>
                </a>
              ))}
            </div>
          ) : (
            <div className="events-list">
              {PAST_EVENTS.map((event, index) => (
                <a
                  key={index}
                  href={event.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="event-link"
                  onClick={() => trackSocialClick(event.label)}
                >
                  <div className="event-item">
                    <span className="event-name">{event.name}</span>
                    <span className="event-details">{event.details}</span>
                  </div>
                </a>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
