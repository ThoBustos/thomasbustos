import './ReferencesIndex.css';

function ReferencesIndex({ references }) {
  if (!references) return null;

  const categories = Object.entries(references).filter(([_, items]) => items?.length > 0);

  if (categories.length === 0) return null;

  const formatCategoryName = (name) => {
    return name.charAt(0).toUpperCase() + name.slice(1).replace(/_/g, ' ');
  };

  return (
    <section className="references-index">
      <h3>References</h3>
      {categories.map(([category, items]) => (
        <div key={category} className="reference-category">
          <h4>{formatCategoryName(category)}</h4>
          <ul>
            {items.map((item, i) => (
              <li key={i}>
                {typeof item === 'string' ? (
                  item
                ) : item.url ? (
                  <a href={item.url} target="_blank" rel="noopener noreferrer">
                    {item.name || item.title}
                  </a>
                ) : (
                  item.name || item.title || item
                )}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </section>
  );
}

export default ReferencesIndex;
