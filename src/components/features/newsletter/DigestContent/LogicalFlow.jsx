import './LogicalFlow.css';

function LogicalFlow({ steps }) {
  if (!steps || steps.length === 0) return null;

  return (
    <div className="logical-flow">
      <span className="logical-flow-label">Flow:</span>
      <div className="logical-flow-steps">
        {steps.map((step, index) => {
          const cleanStep = step.replace(/^→\s*/, ''); // Remove leading arrow from data
          return (
            <span key={index} className="logical-flow-item">
              <span className="logical-flow-step">{cleanStep}</span>
              {index < steps.length - 1 && (
                <span className="logical-flow-arrow">→</span>
              )}
            </span>
          );
        })}
      </div>
    </div>
  );
}

export default LogicalFlow;
