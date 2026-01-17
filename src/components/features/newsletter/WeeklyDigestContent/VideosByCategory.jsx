import Collapsible from '../shared/Collapsible/Collapsible';
import { formatDuration } from '../../../../utils/formatDuration';
import './VideosByCategory.css';

function VideosByCategory({ categories }) {
  if (!categories || Object.keys(categories).length === 0) return null;

  const categoryNames = Object.keys(categories);
  const totalCategories = categoryNames.length;
  const totalVideos = Object.values(categories).reduce(
    (sum, videos) => sum + videos.length,
    0
  );

  return (
    <div className="videos-by-category">
      {/* Header card */}
      <div className="videos-header-card">
        <h3 className="videos-header-title">Video Breakdowns</h3>
        <p className="videos-header-count">{totalVideos} videos · {totalCategories} categories</p>
      </div>

      {/* Each category is its own collapsible card */}
      {categoryNames.map((category, catIndex) => {
        const videos = categories[category];
        const subtitle = `${videos.length} video${videos.length !== 1 ? 's' : ''}`;

        return (
          <Collapsible
            key={category}
            title={category}
            subtitle={subtitle}
            defaultOpen={false}
            className="category-collapsible"
          >
            <div className="category-videos">
              {videos.map((video, index) => {
                const videoUrl = `https://www.youtube.com/watch?v=${video.video_id}`;
                return (
                  <a
                    key={index}
                    href={videoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="video-item"
                  >
                    <div className="video-main">
                      <span className="video-title">{video.title}</span>
                      <div className="video-meta">
                        {video.channel && <span className="video-channel">{video.channel}</span>}
                        {video.duration_minutes && (
                          <span className="video-duration">{formatDuration(video.duration_minutes)} video</span>
                        )}
                      </div>
                    </div>
                    {video.one_liner && (
                      <p className="video-one-liner">{video.one_liner}</p>
                    )}
                  </a>
                );
              })}
            </div>
          </Collapsible>
        );
      })}
    </div>
  );
}

export default VideosByCategory;
