import './WeeklyReferences.css';

function WeeklyReferences({ references }) {
  if (!references || references.length === 0) return null;

  // Group references by type
  const groupedRefs = references.reduce((acc, ref) => {
    const type = ref.reference_type || 'other';
    if (!acc[type]) {
      acc[type] = [];
    }
    acc[type].push(ref);
    return acc;
  }, {});

  // Display order for reference types
  const typeOrder = ['framework', 'person', 'book', 'paper', 'community', 'other'];
  const typeLabels = {
    framework: 'Frameworks & Tools',
    person: 'People',
    book: 'Books',
    paper: 'Papers',
    community: 'Communities',
    other: 'Other References'
  };

  const sortedTypes = typeOrder.filter(type => groupedRefs[type]);

  return (
    <div className="weekly-references">
      <h3 className="references-title">Referenced This Week</h3>
      <div className="references-groups">
        {sortedTypes.map(type => (
          <div key={type} className="reference-group">
            <h4 className="reference-type-label">{typeLabels[type]}</h4>
            <div className="reference-pills">
              {groupedRefs[type].map((ref, index) => (
                <span key={index} className="reference-pill">
                  <span className="reference-name">{ref.name}</span>
                  {ref.mention_count > 1 && (
                    <span className="reference-count">{ref.mention_count}</span>
                  )}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default WeeklyReferences;
