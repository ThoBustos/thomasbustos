import './TagPills.css';

function TagPills({ tags, variant = 'filled', className = '' }) {
  if (!tags || tags.length === 0) return null;

  return (
    <div className={`tag-pills ${variant} ${className}`}>
      {tags.map((tag, index) => (
        <span key={index} className="tag-pill">
          {tag}
        </span>
      ))}
    </div>
  );
}

export default TagPills;
