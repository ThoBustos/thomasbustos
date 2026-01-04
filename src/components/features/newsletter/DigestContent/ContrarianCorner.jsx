import './ContrarianCorner.css';

function ContrarianCorner({ data }) {
  if (!data || (!data.insight && !data.claim)) return null;

  // Support both V2 (insight, why_counterintuitive) and V1 (claim, verdict, conventional_wisdom) field names
  const insight = data.insight || data.claim;
  const conventionalWisdom = data.conventional_wisdom || data.verdict;
  const whyCounterintuitive = data.why_counterintuitive;
  const evidence = data.evidence;
  const soWhat = data.so_what;
  const sourceVideoId = data.source_video_id;
  const sourceVideoTitle = data.source_video_title;

  return (
    <aside className="contrarian-corner">
      <h3>Contrarian Corner</h3>

      {/* V2: Source attribution */}
      {sourceVideoTitle && (
        <div className="contrarian-source">
          <span className="source-label">From:</span>
          {sourceVideoId ? (
            <a href={`#video-${sourceVideoId}`} className="source-link">
              {sourceVideoTitle}
            </a>
          ) : (
            <span>{sourceVideoTitle}</span>
          )}
        </div>
      )}

      {insight && (
        <div className="contrarian-insight">
          <strong>The Insight:</strong>
          <p>{insight}</p>
        </div>
      )}

      {/* V2: Why Counterintuitive (takes precedence over conventional_wisdom) */}
      {whyCounterintuitive && (
        <div className="contrarian-why">
          <strong>Why Counterintuitive:</strong>
          <p>{whyCounterintuitive}</p>
        </div>
      )}

      {/* V1 fallback: Conventional Wisdom (only show if no why_counterintuitive) */}
      {!whyCounterintuitive && conventionalWisdom && (
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

      {/* V2: So What */}
      {soWhat && (
        <div className="contrarian-sowhat">
          <strong>So What:</strong>
          <p>{soWhat}</p>
        </div>
      )}
    </aside>
  );
}

export default ContrarianCorner;
