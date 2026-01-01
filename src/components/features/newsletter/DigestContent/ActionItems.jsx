import './ActionItems.css';

function ActionItems({ items }) {
  if (!items || items.length === 0) return null;

  return (
    <section className="action-items">
      <h3>Action Items</h3>
      <ul>
        {items.map((item, i) => (
          <li key={i}>
            <span className="action-title">{item.action}</span>
            {item.context && (
              <span className="action-context">{item.context}</span>
            )}
            {item.difficulty && (
              <span className={`difficulty difficulty-${item.difficulty}`}>
                {item.difficulty.replace('-', ' ')}
              </span>
            )}
          </li>
        ))}
      </ul>
    </section>
  );
}

export default ActionItems;
