import './WeeklyIssueCard.css';

function WeeklyIssueCard({ issue, onClick, onHover, isHovered }) {
  // Format week date range
  const formatWeekRange = () => {
    const start = new Date(issue.week_start_date);
    const end = new Date(issue.week_end_date);
    const startStr = start.toLocaleDateString('en-US', { month: 'short', day: '2-digit' });
    const endStr = end.toLocaleDateString('en-US', { month: 'short', day: '2-digit' });
    return `${startStr} - ${endStr}`;
  };

  const title = issue.title;
  const tags = issue.keywords || [];
  const totalVideos = issue.total_videos || 0;
  const daysWithContent = issue.days_with_content || 0;
  const description = issue.description || issue.content_json?.week_in_review?.summary || '';

  return (
    <div
      className="weekly-issue-card-zone"
      onMouseEnter={() => onHover(issue.id)}
      onMouseLeave={() => onHover(null)}
    >
      <div
        className="weekly-issue-card"
        onClick={onClick}
      >
        <div className="weekly-issue-main">
          <div className="weekly-issue-header">
            <div className="weekly-header-left">
              <span className="weekly-badge">Weekly</span>
              <span className="weekly-date">{formatWeekRange()}</span>
            </div>
            <div className="weekly-issue-meta">
              <span>{daysWithContent}/7 days</span>
              <span className="meta-separator">•</span>
              <span>{totalVideos} videos</span>
            </div>
          </div>

          <h3 className="weekly-issue-title">{title}</h3>
          <p className="weekly-issue-summary">{description}</p>
        </div>
      </div>

      {isHovered && tags.length > 0 && (
        <div className="weekly-tags-external">
          <div className="weekly-tags-external-container">
            {tags.map(tag => (
              <span key={tag} className="weekly-issue-tag">
                {tag}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default WeeklyIssueCard;
