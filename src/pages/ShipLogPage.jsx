// src/pages/ShipLogPage.jsx
import { useMemo } from 'react';
import './ShipLogPage.css';
import { SHIP_LOG } from '../data/shipLog';
import {
  getYearsInLog,
  getYearStats,
  getWoWChange,
  getAllTimeTotal
} from '../utils/shipLogUtils';
import ShipLogYear from '../components/features/shiplog/ShipLogYear';

function ShipLogPage() {
  const years = useMemo(() => getYearsInLog(SHIP_LOG), []);
  const currentYear = new Date().getFullYear().toString();
  const wowChange = useMemo(() => getWoWChange(SHIP_LOG), []);
  const allTimeTotal = useMemo(() => getAllTimeTotal(SHIP_LOG), []);

  return (
    <div className="shiplog-content">
      <div className="shiplog-alltime">
        <span className="alltime-value">{allTimeTotal.toLocaleString()}</span>
        <span className="alltime-label">content shipped all time</span>
      </div>

      <div className="shiplog-years">
        {years.map(year => (
          <ShipLogYear
            key={year}
            year={year}
            stats={getYearStats(SHIP_LOG, year)}
            wowChange={year === currentYear ? wowChange : null}
            isCurrentYear={year === currentYear}
          />
        ))}
      </div>
    </div>
  );
}

export default ShipLogPage;
