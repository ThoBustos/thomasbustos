import './ContrarianCorner.css';

function ContrarianCorner({ data }) {
  if (!data || (!data.insight && !data.claim)) return null;

  // Support both V2 (insight, conventional_wisdom) and V1 (claim, verdict) field names
  const insight = data.insight || data.claim;
  const conventionalWisdom = data.conventional_wisdom || data.verdict;
  const evidence = data.evidence;

  return (
    <aside className="contrarian-corner">
      <h3>Contrarian Corner</h3>
      {insight && (
        <div className="contrarian-insight">
          <strong>The Insight:</strong>
          <p>{insight}</p>
        </div>
      )}
      {conventionalWisdom && (
        <div className="contrarian-conventional">
          <strong>Conventional Wisdom:</strong>
          <p>{conventionalWisdom}</p>
        </div>
      )}
      {evidence && (
        <div className="contrarian-evidence">
          <strong>Evidence:</strong>
          <p>{evidence}</p>
        </div>
      )}
    </aside>
  );
}

export default ContrarianCorner;
