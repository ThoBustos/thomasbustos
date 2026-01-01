import './StatsList.css';

function StatsList({ stats, title }) {
  if (!stats || stats.length === 0) return null;

  return (
    <div className="stats-list">
      {title && <h4 className="stats-title">{title}</h4>}
      <ul className="stats-items">
        {stats.map((stat, index) => {
          // Parse "130 tokens/sec: description" format
          const colonIndex = stat.indexOf(':');
          const hasColon = colonIndex > -1;
          const value = hasColon ? stat.slice(0, colonIndex).trim() : stat;
          const description = hasColon ? stat.slice(colonIndex + 1).trim() : '';

          return (
            <li key={index} className="stat-item">
              <span className="stat-value">{value}</span>
              {description && <span className="stat-description">{description}</span>}
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default StatsList;
