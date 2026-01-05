// src/components/features/shiplog/ShipLogYear.jsx
import { useState } from 'react';
import './ShipLogYear.css';
import ShipLogHeatmap from './ShipLogHeatmap';
import ShipLogStats from './ShipLogStats';
import ShipLogMobileSummary from './ShipLogMobileSummary';
import ShipLogBottomSheet from './ShipLogBottomSheet';
import { useMediaQuery } from '../../../hooks/useMediaQuery';

function ShipLogYear({ year, stats, wowChange, isCurrentYear }) {
  const [expanded, setExpanded] = useState(isCurrentYear);
  const [bottomSheetDay, setBottomSheetDay] = useState(null);
  const isMobile = useMediaQuery('(max-width: 768px)');

  const handleDayTap = (day) => {
    setBottomSheetDay(day);
  };

  return (
    <div className={`shiplog-year ${expanded ? 'expanded' : 'collapsed'}`}>
      <button
        className="year-header"
        onClick={() => setExpanded(!expanded)}
        aria-expanded={expanded}
      >
        <span className="year-label">{year}</span>
        <span className="year-total">
          <span className="total-count">{stats.total.toLocaleString()}</span>
          <span className="total-label">posts shipped</span>
        </span>
        <span className="year-toggle" aria-hidden="true">
          {expanded ? '−' : '+'}
        </span>
      </button>

      {expanded && (
        <div className="year-content">
          {isMobile ? (
            <ShipLogMobileSummary
              year={year}
              onDayTap={handleDayTap}
            />
          ) : (
            <ShipLogHeatmap
              year={year}
              entries={stats.entries}
            />
          )}
          {isCurrentYear && !isMobile && (
            <ShipLogStats yearStats={stats} wowChange={wowChange} />
          )}
        </div>
      )}

      {bottomSheetDay && (
        <ShipLogBottomSheet
          day={bottomSheetDay}
          onClose={() => setBottomSheetDay(null)}
        />
      )}
    </div>
  );
}

export default ShipLogYear;
