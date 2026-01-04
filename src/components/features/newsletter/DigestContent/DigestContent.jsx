import DigestHeader from './DigestHeader';
import VideoCard from './VideoCard';
import ContrarianCorner from './ContrarianCorner';
import ActionItems from './ActionItems';
import ReferencesIndex from './ReferencesIndex';
import BigPictureBullets from './BigPictureBullets';
import DeeperPicture from './DeeperPicture';
import ConvergencePoints from './ConvergencePoints';
import KeyTensions from './KeyTensions';
import './DigestContent.css';

function DigestContent({ digest }) {
  // Parse content_json if it's a string
  const content = typeof digest?.content_json === 'string'
    ? JSON.parse(digest.content_json)
    : digest?.content_json;

  if (!content) {
    return <div className="digest-content-empty">No content available</div>;
  }

  // V2 detection: has big_picture_bullets
  const hasV2BigPicture = content.big_picture_bullets?.length > 0;
  const hasBigPicture = hasV2BigPicture || !!content.daily_tldr;
  const hasDeeperPicture = !!content.deeper_picture;
  const hasConvergencePoints = content.convergence_points?.length > 0;
  const hasKeyTensions = content.key_tensions?.length > 0;

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
          hasBigPicture={hasBigPicture}
          hasDeeperPicture={hasDeeperPicture}
          hasConvergencePoints={hasConvergencePoints}
          hasKeyTensions={hasKeyTensions}
          hasContrarianCorner={!!content.contrarian_corner}
          hasActionItems={content.action_items?.length > 0}
          hasFinalThought={!!content.conclusion}
        />
      </section>

      {/* Big Picture Section - V2 or V1 */}
      {hasBigPicture && (
        <section id="overview" className="digest-section digest-tldr-section">
          <h2>The Big Picture</h2>
          {hasV2BigPicture ? (
            <BigPictureBullets bullets={content.big_picture_bullets} />
          ) : (
            <p>{content.daily_tldr}</p>
          )}
        </section>
      )}

      {/* V2: Deeper Picture Section */}
      {hasDeeperPicture && (
        <section id="deeper-picture" className="digest-section digest-deeper-section">
          <h2>The Deeper Picture</h2>
          <DeeperPicture content={content.deeper_picture} />
        </section>
      )}

      {/* V2: Convergence Points */}
      {hasConvergencePoints && (
        <section id="convergence" className="digest-section digest-convergence-section">
          <h2>Where Videos Converge</h2>
          <ConvergencePoints points={content.convergence_points} />
        </section>
      )}

      {/* V2: Key Tensions */}
      {hasKeyTensions && (
        <section id="key-tensions" className="digest-section digest-tensions-section">
          <h2>Key Tensions</h2>
          <KeyTensions tensions={content.key_tensions} />
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
            />
          ))}
        </>
      )}

      {/* Contrarian Corner */}
      {content.contrarian_corner && (
        <section id="contrarian-corner" className="digest-section">
          <ContrarianCorner data={content.contrarian_corner} />
        </section>
      )}

      {/* Action Items */}
      {content.action_items?.length > 0 && (
        <section id="action-items" className="digest-section">
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
        <section id="final-thought" className="digest-section digest-conclusion-section">
          <h2>Final Thought</h2>
          <p className="conclusion-text">{content.conclusion}</p>
        </section>
      )}
    </div>
  );
}

export default DigestContent;
