import './ContrarianTake.css';

function ContrarianTake({ conventional, actual }) {
  if (!conventional || !actual) return null;

  return (
    <div className="contrarian-take">
      <h3 className="contrarian-take-title">Contrarian Take</h3>
      <div className="contrarian-take-content">
        <div className="contrarian-row conventional">
          <span className="contrarian-label">They say:</span>
          <p className="contrarian-text">{conventional}</p>
        </div>
        <div className="contrarian-divider">vs</div>
        <div className="contrarian-row actual">
          <span className="contrarian-label">Actually:</span>
          <p className="contrarian-text">{actual}</p>
        </div>
      </div>
    </div>
  );
}

export default ContrarianTake;
