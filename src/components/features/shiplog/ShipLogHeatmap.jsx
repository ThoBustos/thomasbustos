// src/components/features/shiplog/ShipLogHeatmap.jsx
import { useState } from 'react';
import { createPortal } from 'react-dom';
import './ShipLogHeatmap.css';
import { generateYearGrid } from '../../../utils/shipLogUtils';

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

function ShipLogHeatmap({ year, entries, onDayTap }) {
  const grid = generateYearGrid(year, entries);
  const [tooltip, setTooltip] = useState(null);

  const handleMouseEnter = (e, day) => {
    if (!day.isInYear) return;

    const rect = e.target.getBoundingClientRect();

    setTooltip({
      date: day.date,
      total: day.total,
      notes: day.notes,
      x: rect.left + rect.width / 2,
      y: rect.top
    });
  };

  const handleMouseLeave = () => {
    setTooltip(null);
  };

  const handleClick = (day) => {
    if (!day.isInYear) return;
    if (onDayTap) {
      onDayTap(day);
    }
  };

  const formatDate = (dateStr) => {
    const date = new Date(dateStr + 'T00:00:00');
    return date.toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <div className="shiplog-heatmap">
      <div className="heatmap-container">
        <div className="heatmap-days-labels">
          <span></span>
          <span>Mon</span>
          <span></span>
          <span>Wed</span>
          <span></span>
          <span>Fri</span>
          <span></span>
        </div>
        <div className="heatmap-main">
          <div className="heatmap-months">
            {MONTHS.map(m => (
              <span key={m} className="heatmap-month">{m}</span>
            ))}
          </div>
          <div className="heatmap-grid">
            {grid.map((week, wi) => (
              <div key={wi} className="heatmap-week">
                {week.map((day, di) => (
                  <div
                    key={di}
                    className={`heatmap-day ${day.isInYear ? `level-${day.level}` : 'out-of-year'} ${onDayTap ? 'tappable' : ''}`}
                    data-date={day.date}
                    onMouseEnter={(e) => handleMouseEnter(e, day)}
                    onMouseLeave={handleMouseLeave}
                    onClick={() => handleClick(day)}
                  />
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Tooltip rendered via portal to escape overflow:hidden */}
      {tooltip && createPortal(
        <div
          className="heatmap-tooltip"
          style={{
            left: tooltip.x,
            top: tooltip.y
          }}
        >
          <div className="tooltip-date">{formatDate(tooltip.date)}</div>
          <div className="tooltip-total">
            <span className="tooltip-count">{tooltip.total}</span> posts shipped
          </div>
          {tooltip.notes.length > 0 && (
            <ul className="tooltip-notes">
              {tooltip.notes.map((note, i) => (
                <li key={i}>{note}</li>
              ))}
            </ul>
          )}
        </div>,
        document.body
      )}

      <div className="heatmap-legend">
        <span>Less</span>
        <div className="legend-scale">
          {[0, 1, 2, 3, 4].map(level => (
            <div key={level} className={`legend-item level-${level}`} />
          ))}
        </div>
        <span>More</span>
      </div>
    </div>
  );
}

export default ShipLogHeatmap;
