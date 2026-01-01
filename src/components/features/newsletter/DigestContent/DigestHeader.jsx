import TagPills from './TagPills';
import './DigestHeader.css';

function DigestHeader({ title, publishDate, stats, tableOfContents, keywords, videoSections }) {
  const formatDate = (dateStr) => {
    return new Date(dateStr).toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  // Use provided TOC if it has valid items with titles, otherwise generate from video sections
  const validToc = tableOfContents?.filter(item => item?.title);
  const toc = validToc?.length > 0
    ? validToc
    : videoSections?.map((video, i) => ({
        id: `video-${video.video_id || i}`,
        title: video.title
      })).filter(item => item.title) || [];

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
