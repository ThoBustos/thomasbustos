import DigestHeader from './DigestHeader';
import VideoCard from './VideoCard';
import ContrarianCorner from './ContrarianCorner';
import ActionItems from './ActionItems';
import ReferencesIndex from './ReferencesIndex';
import './DigestContent.css';

function DigestContent({ digest }) {
  // Parse content_json if it's a string
  const content = typeof digest?.content_json === 'string'
    ? JSON.parse(digest.content_json)
    : digest?.content_json;

  if (!content) {
    return <div className="digest-content-empty">No content available</div>;
  }

  return (
    <div className="digest-sections">
      {/* Header Section */}
      <section className="digest-section digest-header-section">
        <DigestHeader
          title={digest.title}
          publishDate={digest.publish_date}
          stats={content.stats}
          tableOfContents={content.table_of_contents}
          keywords={content.keywords}
          videoSections={content.video_sections}
        />
      </section>

      {/* Big Picture Section */}
      {content.daily_tldr && (
        <section id="overview" className="digest-section digest-tldr-section">
          <h2>The Big Picture</h2>
          <p>{content.daily_tldr}</p>
        </section>
      )}

      {/* Video Breakdowns - Each as standalone */}
      {content.video_sections?.length > 0 && (
        <>
          <section className="digest-section digest-videos-header">
            <h2>Video Breakdowns</h2>
            <p className="section-subtitle">{content.video_sections.length} videos analyzed</p>
          </section>

          {content.video_sections.map((video, index) => (
            <VideoCard
              key={video.video_id || index}
              id={`video-${video.video_id || index}`}
              video={video}
              defaultOpen={index === 0}
            />
          ))}
        </>
      )}

      {/* Contrarian Corner */}
      {content.contrarian_corner && (
        <section className="digest-section">
          <ContrarianCorner data={content.contrarian_corner} />
        </section>
      )}

      {/* Action Items */}
      {content.action_items?.length > 0 && (
        <section className="digest-section">
          <ActionItems items={content.action_items} />
        </section>
      )}

      {/* References */}
      {content.references && (
        <section className="digest-section">
          <ReferencesIndex references={content.references} />
        </section>
      )}

      {/* Conclusion */}
      {content.conclusion && (
        <section className="digest-section digest-conclusion-section">
          <h2>Final Thought</h2>
          <p className="conclusion-text">{content.conclusion}</p>
        </section>
      )}
    </div>
  );
}

export default DigestContent;
