import './EmptyState.css';

function EmptyState({ title, description }) {
  return (
    <div className="empty-state">
      <h3 className="empty-state-title">{title}</h3>
      {description && <p className="empty-state-description">{description}</p>}
    </div>
  );
}

export default EmptyState;
