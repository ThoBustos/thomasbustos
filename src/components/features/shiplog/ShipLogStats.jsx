// src/components/features/shiplog/ShipLogStats.jsx
import './ShipLogStats.css';
import { PLATFORMS } from '../../../data/shipLog';

function ShipLogStats({ yearStats, wowChange }) {
  return (
    <div className="shiplog-stats">
      {wowChange && (
        <div className="stats-summary">
          <div className="stat-item">
            <span className="stat-value">{wowChange.thisWeek}</span>
            <span className="stat-label">This Week</span>
          </div>
          <div className="stat-divider">|</div>
          <div className="stat-item">
            <span className="stat-value">{wowChange.lastWeek}</span>
            <span className="stat-label">Last Week</span>
          </div>
          <div className="stat-divider">|</div>
          <div className="stat-item">
            <span className={`stat-value ${wowChange.percentChange >= 0 ? 'positive' : 'negative'}`}>
              {wowChange.percentChange >= 0 ? '+' : ''}{wowChange.percentChange}%
            </span>
          </div>
        </div>
      )}

      <div className="stats-platforms">
        <span className="platforms-label">Platform Breakdown</span>
        <div className="platform-grid">
          {PLATFORMS.map(p => (
            <div key={p.key} className="platform-stat">
              <span className="platform-name">{p.label}</span>
              <span className="platform-count">{yearStats.totals[p.key]}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ShipLogStats;
