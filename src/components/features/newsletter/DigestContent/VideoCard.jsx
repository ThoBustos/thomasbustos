import Collapsible from '../shared/Collapsible/Collapsible';
import QuoteBlock from './QuoteBlock';
import StatsList from './StatsList';
import TagPills from './TagPills';
import { formatDuration } from '../../../../utils/formatDuration';
import './VideoCard.css';

function VideoCard({ video, defaultOpen = false, id }) {
  const subtitle = `${video.channel_name || 'Unknown Channel'} · ${formatDuration(video.duration_minutes)} video`;

  return (
    <div id={id}>
      <Collapsible
        title={video.title}
        subtitle={subtitle}
        defaultOpen={defaultOpen}
        className="video-card"
      >
      <div className="video-card-content">
        {/* Header with link and speakers */}
        <div className="video-card-header">
          {video.video_url && (
            <a
              href={video.video_url}
              target="_blank"
              rel="noopener noreferrer"
              className="video-link"
            >
              Watch on YouTube
            </a>
          )}
          {video.speakers?.length > 0 && (
            <span className="video-speakers">
              Speakers: {video.speakers.join(', ')}
            </span>
          )}
        </div>

        {/* Tags */}
        {video.tags?.length > 0 && (
          <TagPills tags={video.tags} className="video-tags" />
        )}

        {/* Summary */}
        <div className="video-summary">
          {video.condensed_summary && (
            <p className="video-condensed">{video.condensed_summary}</p>
          )}
          {video.structure_overview && (
            <p className="video-structure">{video.structure_overview}</p>
          )}
        </div>

        {/* Key Quotes */}
        {video.key_quotes?.length > 0 && (
          <div className="video-section-group">
            <h4>Key Quotes</h4>
            {video.key_quotes.map((quote, i) => (
              <QuoteBlock key={i} quote={quote} />
            ))}
          </div>
        )}

        {/* Frameworks Mentioned */}
        {video.frameworks_mentioned?.length > 0 && (
          <div className="video-section-group">
            <h4>Frameworks Mentioned</h4>
            <TagPills tags={video.frameworks_mentioned} variant="outline" />
          </div>
        )}

        {/* Key Statistics */}
        {video.key_statistics?.length > 0 && (
          <StatsList stats={video.key_statistics} title="Key Statistics" />
        )}

        {/* Key Analogies */}
        {video.key_analogies?.length > 0 && (
          <div className="video-section-group">
            <h4>Key Analogies</h4>
            <ul className="video-list">
              {video.key_analogies.map((analogy, i) => (
                <li key={i}>{analogy}</li>
              ))}
            </ul>
          </div>
        )}

        {/* Deep Analysis */}
        {video.deep_analysis && (
          <div className="video-section-group video-deep-analysis">
            <h4>Deep Analysis</h4>
            <p>{video.deep_analysis}</p>
          </div>
        )}

        {/* Connections */}
        {video.connections?.length > 0 && (
          <div className="video-section-group">
            <h4>Connections</h4>
            <ul className="video-list">
              {video.connections.map((connection, i) => (
                <li key={i}>{connection}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
      </Collapsible>
    </div>
  );
}

export default VideoCard;
