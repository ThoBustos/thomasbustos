import { renderMarkdown } from '../../../../utils/renderMarkdown';
import './ConvergencePoints.css';

function ConvergencePoints({ points }) {
  if (!points || points.length === 0) return null;

  return (
    <div className="convergence-points">
      {points.map((point, index) => (
        <div key={index} className="convergence-point">
          <div className="convergence-concept">
            <h4>{point.concept}</h4>
          </div>

          {point.video_titles?.length > 0 && (
            <div className="convergence-videos">
              <span className="convergence-label">Discussed in:</span>
              <ul className="convergence-video-list">
                {point.video_titles.map((title, i) => (
                  <li key={i}>
                    {point.video_ids?.[i] ? (
                      <a href={`#video-${point.video_ids[i]}`} className="convergence-video-link">
                        {title}
                      </a>
                    ) : (
                      <span>{title}</span>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {point.synthesis && (
            <div className="convergence-synthesis">
              <p>{renderMarkdown(point.synthesis, `synth-${index}`)}</p>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

export default ConvergencePoints;
