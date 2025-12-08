import './NewsletterIssueCard.css';

function NewsletterIssueCard({ issue, onClick, onHover, isHovered }) {

  const tagColors = {
    frontier: '#4E4B93',
    reasoning: '#8B87D6', 
    coding: '#F2E7C9',
    benchmarking: '#6B68A8',
    daily: '#3a3770',
    brief: '#B8B5E8',
    models: '#4E4B93',
    'open-source': '#8B87D6',
    performance: '#6B68A8',
    deepseek: '#3a3770',
    anthropic: '#4E4B93',
    updates: '#8B87D6',
    google: '#6B68A8',
    multimodal: '#3a3770',
    vision: '#B8B5E8'
  };

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
            <span className="issue-date">{issue.date}</span>
            <div className="issue-meta">
              <span>{issue.sourceCount} sources</span>
              <span className="meta-separator">•</span>
              <span>{issue.readingTime}</span>
            </div>
          </div>
          
          <h3 className="issue-title">{issue.title}</h3>
          <p className="issue-summary">{issue.summary}</p>
        </div>
      </div>

      {isHovered && (
        <div className="tags-external">
          <div className="tags-external-container">
            {issue.tags.map(tag => (
              <span 
                key={tag}
                className="issue-tag"
                style={{ 
                  backgroundColor: tagColors[tag] || '#4E4B93',
                  color: tag === 'coding' ? '#0B102C' : '#FFFFFF'
                }}
              >
                #{tag}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default NewsletterIssueCard;