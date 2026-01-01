import './NewsletterIssueCard.css';

function NewsletterIssueCard({ issue, onClick, onHover, isHovered }) {
  // Handle both Supabase and mock data shapes
  const title = issue.title;
  const date = issue.publish_date
    ? new Date(issue.publish_date).toLocaleDateString('en-US', { month: 'short', day: '2-digit' })
    : issue.date;
  const tags = issue.keywords || issue.tags || [];
  const sourceCount = issue.video_count || issue.sourceCount || 0;
  const readingTime = issue.readingTime || `${Math.max(2, sourceCount * 2)} min`;
  const summary = issue.summary || issue.content_json?.daily_tldr || issue.content_json?.header?.title || '';

  return (
    <div
      className="issue-card-zone"
      onMouseEnter={() => onHover(issue.id)}
      onMouseLeave={() => onHover(null)}
    >
      <div
        className="issue-card"
        onClick={onClick}
      >
        <div className="issue-main">
          <div className="issue-header">
            <span className="issue-date">{date}</span>
            <div className="issue-meta">
              <span>{sourceCount} sources</span>
              <span className="meta-separator">•</span>
              <span>{readingTime}</span>
            </div>
          </div>

          <h3 className="issue-title">{title}</h3>
          <p className="issue-summary">{summary}</p>
        </div>
      </div>

      {isHovered && tags.length > 0 && (
        <div className="tags-external">
          <div className="tags-external-container">
            {tags.map(tag => (
              <span key={tag} className="issue-tag">
                {tag}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default NewsletterIssueCard;