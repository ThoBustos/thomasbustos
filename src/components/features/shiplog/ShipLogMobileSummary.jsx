// src/components/features/shiplog/ShipLogMobileSummary.jsx
import { useMemo } from 'react';
import './ShipLogMobileSummary.css';
import { SHIP_LOG } from '../../../data/shipLog';
import {
  getCurrentWeekEntries,
  getMonthTotal,
  getMostRecentActivity,
  getWoWChange
} from '../../../utils/shipLogUtils';

const DAY_LABELS = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];

function ShipLogMobileSummary({ year, onDayTap }) {
  const weekDays = useMemo(() => getCurrentWeekEntries(SHIP_LOG), []);
  const wowChange = useMemo(() => getWoWChange(SHIP_LOG), []);
  const today = new Date();
  const monthTotal = useMemo(
    () => getMonthTotal(SHIP_LOG, today.getFullYear(), today.getMonth()),
    []
  );
  const recentActivity = useMemo(() => getMostRecentActivity(SHIP_LOG), []);

  const formatDate = (dateStr) => {
    const date = new Date(dateStr + 'T00:00:00');
    return date.toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <div className="mobile-summary">
      {/* Stats row */}
      <div className="summary-stats">
        <div className="summary-stat">
          <span className="summary-value">{wowChange.thisWeek}</span>
          <span className="summary-label">This Week</span>
        </div>
        <div className="summary-divider" />
        <div className="summary-stat">
          <span className="summary-value">{monthTotal}</span>
          <span className="summary-label">This Month</span>
        </div>
      </div>

      {/* 7-day strip */}
      <div className="week-strip-container">
        <div className="week-strip">
          {weekDays.map((day, i) => (
            <button
              key={day.date}
              className={`week-strip-day level-${day.level} ${day.isToday ? 'today' : ''}`}
              onClick={() => onDayTap?.(day)}
              aria-label={`${formatDate(day.date)}: ${day.total} posts`}
            >
              <span className="day-label">{DAY_LABELS[i]}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Recent activity */}
      {recentActivity && (
        <div className="recent-activity">
          <div className="recent-header">
            <span className="recent-date">{formatDate(recentActivity.date)}</span>
            <span className="recent-count">{recentActivity.total} shipped</span>
          </div>
          {recentActivity.notes.length > 0 && (
            <ul className="recent-notes">
              {recentActivity.notes.slice(0, 2).map((note, i) => (
                <li key={i}>{note}</li>
              ))}
              {recentActivity.notes.length > 2 && (
                <li className="more-notes">+{recentActivity.notes.length - 2} more</li>
              )}
            </ul>
          )}
        </div>
      )}

    </div>
  );
}

export default ShipLogMobileSummary;
