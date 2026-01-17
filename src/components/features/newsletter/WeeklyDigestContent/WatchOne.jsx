import './WatchOne.css';

function WatchOne({ video_id, title, channel, duration_minutes, why }) {
  if (!video_id || !title) return null;

  const videoUrl = `https://www.youtube.com/watch?v=${video_id}`;
  const thumbnailUrl = `https://img.youtube.com/vi/${video_id}/maxresdefault.jpg`;

  const formatDuration = (minutes) => {
    if (!minutes) return null;
    const hrs = Math.floor(minutes / 60);
    const mins = minutes % 60;
    if (hrs > 0) {
      return `${hrs}h ${mins}m`;
    }
    return `${mins} min`;
  };

  return (
    <div className="watch-one">
      <h3 className="watch-one-label">If You Watch One Thing</h3>
      <div className="watch-one-card">
        <a
          href={videoUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="watch-one-thumbnail"
        >
          <img src={thumbnailUrl} alt={title} />
          <div className="watch-one-play">
            <svg viewBox="0 0 24 24" fill="currentColor">
              <path d="M8 5v14l11-7z" />
            </svg>
          </div>
        </a>
        <div className="watch-one-content">
          <h4 className="watch-one-title">{title}</h4>
          <div className="watch-one-meta">
            {channel && <span className="watch-one-channel">{channel}</span>}
            {duration_minutes && (
              <span className="watch-one-duration">{formatDuration(duration_minutes)}</span>
            )}
          </div>
          {why && (
            <div className="watch-one-why">
              <span className="why-label">Why this one:</span>
              <span className="why-text">{why}</span>
            </div>
          )}
          <a
            href={videoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="watch-one-button"
          >
            Watch on YouTube
          </a>
        </div>
      </div>
    </div>
  );
}

export default WatchOne;
