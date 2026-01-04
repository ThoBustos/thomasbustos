// src/components/features/newsletter/DigestContent/VideoSection.jsx

function VideoSection({ video }) {
  return (
    <section className="video-section">
      {video.thumbnail_url && (
        <img 
          src={video.thumbnail_url} 
          alt={video.title} 
          className="video-thumbnail"
        />
      )}
      
      <h2 className="video-title">
        {video.video_url ? (
          <a href={video.video_url} target="_blank" rel="noopener noreferrer">
            {video.title}
          </a>
        ) : video.title}
      </h2>
      <span className="video-channel">{video.channel}</span>

      {video.why_it_matters && (
        <blockquote className="video-hook">{video.why_it_matters}</blockquote>
      )}

      {video.nuggets?.length > 0 && (
        <div className="video-nuggets">
          <h4>Golden Nuggets</h4>
          <ul>
            {video.nuggets.map((nugget, i) => (
              <li key={i} className="nugget">
                {typeof nugget === 'string' ? nugget : nugget.text}
              </li>
            ))}
          </ul>
        </div>
      )}

      {video.key_insights?.length > 0 && (
        <div className="video-insights">
          <h4>Key Insights</h4>
          <ul>
            {video.key_insights.map((insight, i) => (
              <li key={i}>{insight}</li>
            ))}
          </ul>
        </div>
      )}
    </section>
  );
}

export default VideoSection;
