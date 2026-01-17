import './ConceptOfWeek.css';

function ConceptOfWeek({ term, full_name, definition }) {
  if (!term || !definition) return null;

  return (
    <div className="concept-of-week">
      <h3 className="concept-label">Concept of the Week</h3>
      <div className="concept-content">
        <h4 className="concept-term">
          {term}
          {full_name && <span className="concept-full-name"> ({full_name})</span>}
        </h4>
        <p className="concept-definition">{definition}</p>
      </div>
    </div>
  );
}

export default ConceptOfWeek;
