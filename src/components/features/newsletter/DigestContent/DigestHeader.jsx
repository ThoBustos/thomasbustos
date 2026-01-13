import TagPills from './TagPills';
import { formatDuration } from '../../../../utils/formatDuration';
import './DigestHeader.css';

function DigestHeader({
  title,
  publishDate,
  stats,
  tableOfContents,
  keywords,
  videoSections,
  hasBigPicture,
  hasDeeperPicture,
  hasConvergencePoints,
  hasKeyTensions,
  hasContrarianCorner,
  hasActionItems,
  hasFinalThought
}) {
  const formatDate = (dateStr) => {
    return new Date(dateStr).toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  // Build complete table of contents with all sections
  const buildToc = () => {
    const toc = [];

    // Add Big Picture first
    if (hasBigPicture) {
      toc.push({ id: 'overview', title: 'The Big Picture' });
    }

    // V2: Deeper Picture
    if (hasDeeperPicture) {
      toc.push({ id: 'deeper-picture', title: 'The Deeper Picture' });
    }

    // V2: Convergence Points
    if (hasConvergencePoints) {
      toc.push({ id: 'convergence', title: 'Where Videos Converge' });
    }

    // V2: Key Tensions
    if (hasKeyTensions) {
      toc.push({ id: 'key-tensions', title: 'Key Tensions' });
    }

    // Add video section entries with emoji + channel prefix
    if (videoSections?.length > 0) {
      videoSections.forEach((video, i) => {
        if (video.title) {
          const channelPrefix = video.channel_name ? `[${video.channel_name}] ` : '';
          toc.push({
            id: `video-${video.video_id || i}`,
            title: `🎬 ${channelPrefix}${video.title}`
          });
        }
      });
    }

    // Add end sections conditionally
    if (hasContrarianCorner) {
      toc.push({ id: 'contrarian-corner', title: 'Contrarian Corner' });
    }
    if (hasActionItems) {
      toc.push({ id: 'action-items', title: 'Action Items' });
    }
    if (hasFinalThought) {
      toc.push({ id: 'final-thought', title: 'Final Thought' });
    }

    return toc;
  };

  const toc = buildToc();

  return (
    <header className="digest-header">
      <h1 className="digest-title">{title}</h1>

      {stats && (
        <p className="digest-intro">
          Daily AI insights extracted from {stats.video_count || 0} videos across {stats.channels?.length || 0} channels
        </p>
      )}

      <div className="digest-meta">
        <span className="digest-date">{formatDate(publishDate)}</span>
        {stats && (
          <>
            <span className="meta-separator">•</span>
            <span className="digest-read-time">
              {stats.estimated_read_minutes || 0} min read
            </span>
            <span className="meta-separator">•</span>
            <span className="digest-time-saved">
              Save {formatDuration((stats.total_duration_minutes || 0) - (stats.estimated_read_minutes || 0))}
            </span>
          </>
        )}
      </div>

      {keywords?.length > 0 && (
        <TagPills tags={keywords} className="digest-keywords" />
      )}

      {toc.length > 0 && (
        <nav className="digest-toc">
          <h2 className="digest-toc-title">In This Issue</h2>
          <ul className="digest-toc-list">
            {toc.map((item, index) => (
              <li key={item.id || index}>
                <a href={`#${item.id}`} className="digest-toc-link">
                  {item.title}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      )}

      {stats?.channels?.length > 0 && (
        <div className="digest-channels">
          <span className="channels-label">Sources:</span>
          <span className="channels-list">
            {stats.channels.map((c, i) => (
              <span key={c.channel_id || i}>
                {i > 0 && ', '}
                <a
                  href={c.channel_url || `https://www.youtube.com/channel/${c.channel_id}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="channel-link"
                >
                  {c.channel_name}
                </a>
              </span>
            ))}
          </span>
        </div>
      )}
    </header>
  );
}

export default DigestHeader;
