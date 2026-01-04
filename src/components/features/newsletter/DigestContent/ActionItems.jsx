import './ActionItems.css';

function ActionItems({ items }) {
  if (!items || items.length === 0) return null;

  return (
    <section className="action-items">
      <h3>Action Items</h3>
      <ul>
        {items.map((item, i) => (
          <li key={i}>
            <div className="action-header">
              <span className="action-title">{item.action}</span>
              {item.difficulty && (
                <span className={`difficulty difficulty-${item.difficulty}`}>
                  {item.difficulty.replace('-', ' ')}
                </span>
              )}
            </div>

            {/* V2: Source attribution */}
            {item.source_video_title && (
              <span className="action-source">
                From:{' '}
                {item.source_video_id ? (
                  <a href={`#video-${item.source_video_id}`} className="action-source-link">
                    {item.source_video_title}
                  </a>
                ) : (
                  item.source_video_title
                )}
              </span>
            )}

            {item.context && (
              <span className="action-context">{item.context}</span>
            )}

            {/* V2: First step */}
            {item.first_step && (
              <span className="action-first-step">
                <strong>First step:</strong> {item.first_step}
              </span>
            )}
          </li>
        ))}
      </ul>
    </section>
  );
}

export default ActionItems;
