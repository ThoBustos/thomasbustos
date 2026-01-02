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

    // Add video section entries
    if (videoSections?.length > 0) {
      videoSections.forEach((video, i) => {
        if (video.title) {
          toc.push({
            id: `video-${video.video_id || i}`,
            title: video.title
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

      <div className="digest-meta">
        <span className="digest-date">{formatDate(publishDate)}</span>
        {stats && (
          <>
            <span className="meta-separator">•</span>
            <span className="digest-video-count">
              {stats.video_count || 0} videos
            </span>
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
            {stats.channels.map(c => c.channel_name).join(', ')}
          </span>
        </div>
      )}
    </header>
  );
}

export default DigestHeader;
