import { renderMarkdown } from '../../../../utils/renderMarkdown';
import './KeyTensions.css';

function KeyTensions({ tensions }) {
  if (!tensions || tensions.length === 0) return null;

  return (
    <div className="key-tensions">
      {tensions.map((tension, index) => (
        <div key={index} className="tension-item">
          <div className="tension-topic">
            <h4>{tension.topic}</h4>
          </div>

          {tension.perspectives?.length > 0 && (
            <div className="tension-perspectives">
              {tension.perspectives.map((perspective, i) => (
                <div key={i} className="tension-perspective">
                  <div className="perspective-header">
                    {perspective.speaker && (
                      <span className="perspective-speaker">{perspective.speaker}</span>
                    )}
                    {perspective.video_title && perspective.video_id && (
                      <a
                        href={`#video-${perspective.video_id}`}
                        className="perspective-video-link"
                      >
                        {perspective.video_title}
                      </a>
                    )}
                  </div>
                  <p className="perspective-position">
                    {renderMarkdown(perspective.position, `pos-${index}-${i}`)}
                  </p>
                </div>
              ))}
            </div>
          )}

          {tension.resolution && (
            <div className="tension-resolution">
              <span className="resolution-label">Resolution:</span>
              <p>{renderMarkdown(tension.resolution, `res-${index}`)}</p>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

export default KeyTensions;
