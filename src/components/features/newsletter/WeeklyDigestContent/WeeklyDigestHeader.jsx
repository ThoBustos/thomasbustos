import './WeeklyDigestHeader.css';

function WeeklyDigestHeader({
  title,
  weekStartDate,
  weekEndDate,
  totalVideos,
  daysWithContent,
  channelsIncluded,
  keywords
}) {
  // Handle channelsIncluded being either a number or an array
  const channelCount = Array.isArray(channelsIncluded)
    ? channelsIncluded.length
    : (typeof channelsIncluded === 'number' ? channelsIncluded : 0);
  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const formatDateShort = (dateStr) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  return (
    <div className="weekly-digest-header">
      <div className="weekly-header-badge">
        <span className="weekly-header-badge-text">Weekly Digest</span>
      </div>

      <div className="weekly-header-date-range">
        {formatDateShort(weekStartDate)} - {formatDateShort(weekEndDate)}
      </div>

      <h1 className="weekly-header-title">{title}</h1>

      <div className="weekly-header-stats">
        <div className="weekly-stat">
          <span className="weekly-stat-value">{daysWithContent || 0}</span>
          <span className="weekly-stat-label">days</span>
        </div>
        <div className="weekly-stat-divider" />
        <div className="weekly-stat">
          <span className="weekly-stat-value">{totalVideos || 0}</span>
          <span className="weekly-stat-label">videos</span>
        </div>
        <div className="weekly-stat-divider" />
        <div className="weekly-stat">
          <span className="weekly-stat-value">{channelCount}</span>
          <span className="weekly-stat-label">channels</span>
        </div>
      </div>

      {/* Channel pills - below stats */}
      {Array.isArray(channelsIncluded) && channelsIncluded.length > 0 && (
        <div className="weekly-header-channels">
          {channelsIncluded.map((channel, index) => (
            <span key={index} className="weekly-channel-pill">
              {channel}
            </span>
          ))}
        </div>
      )}

      {keywords?.length > 0 && (
        <div className="weekly-header-keywords">
          {keywords.slice(0, 8).map((keyword, index) => (
            <span key={index} className="weekly-keyword-tag">
              {keyword}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}

export default WeeklyDigestHeader;
