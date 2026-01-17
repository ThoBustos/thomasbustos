import WeeklyDigestHeader from './WeeklyDigestHeader';
import TheOneThing from './TheOneThing';
import QuoteOfWeek from './QuoteOfWeek';
import WatchOne from './WatchOne';
import NumbersThatMatter from './NumbersThatMatter';
import ContrarianTake from './ContrarianTake';
import ConceptOfWeek from './ConceptOfWeek';
import EmergingThemes from './EmergingThemes';
import VideosByCategory from './VideosByCategory';
import WeeklyReferences from './WeeklyReferences';
import WeeklyNote from './WeeklyNote';
import './WeeklyDigestContent.css';

function WeeklyDigestContent({ digest }) {
  // Parse content_json if it's a string
  const content = typeof digest?.content_json === 'string'
    ? JSON.parse(digest.content_json)
    : digest?.content_json;

  if (!content) {
    return <div className="weekly-content-empty">No content available</div>;
  }

  const {
    stats,
    title,
    the_one_thing,
    quote_of_the_week,
    watch_one,
    numbers_that_matter,
    contrarian_take,
    concept_of_the_week,
    themes,
    videos_by_category,
    weekly_references,
    weekly_note,
    keywords
  } = content;

  return (
    <div className="weekly-digest-sections">
      {/* Header Section with stats */}
      <section className="weekly-section weekly-header-section">
        <WeeklyDigestHeader
          title={digest.title || title}
          weekStartDate={digest.week_start_date}
          weekEndDate={digest.week_end_date}
          stats={stats}
          totalVideos={digest.total_videos || stats?.total_videos}
          daysWithContent={digest.days_with_content || stats?.days_covered}
          channelsIncluded={digest.channels_included || stats?.channels}
          keywords={keywords || digest.keywords}
        />
      </section>

      {/* The One Thing */}
      {the_one_thing && (
        <section className="weekly-section weekly-highlight-section">
          <TheOneThing {...the_one_thing} />
        </section>
      )}

      {/* Quote of the Week */}
      {quote_of_the_week && (
        <section className="weekly-section">
          <QuoteOfWeek {...quote_of_the_week} />
        </section>
      )}

      {/* Watch One */}
      {watch_one && (
        <section className="weekly-section">
          <WatchOne {...watch_one} />
        </section>
      )}

      {/* Numbers That Matter */}
      {numbers_that_matter?.length > 0 && (
        <section className="weekly-section">
          <NumbersThatMatter numbers={numbers_that_matter} />
        </section>
      )}

      {/* Contrarian Take */}
      {contrarian_take && (
        <section className="weekly-section">
          <ContrarianTake {...contrarian_take} />
        </section>
      )}

      {/* Concept of the Week */}
      {concept_of_the_week && (
        <section className="weekly-section">
          <ConceptOfWeek {...concept_of_the_week} />
        </section>
      )}

      {/* Emerging Themes */}
      {themes?.length > 0 && (
        <section className="weekly-section">
          <EmergingThemes themes={themes} />
        </section>
      )}

      {/* Videos by Category - renders its own cards */}
      {videos_by_category && Object.keys(videos_by_category).length > 0 && (
        <VideosByCategory categories={videos_by_category} />
      )}

      {/* Weekly References */}
      {weekly_references?.length > 0 && (
        <section className="weekly-section">
          <WeeklyReferences references={weekly_references} />
        </section>
      )}

      {/* Weekly Note */}
      {weekly_note && (
        <section className="weekly-section weekly-note-section">
          <WeeklyNote text={weekly_note} />
        </section>
      )}
    </div>
  );
}

export default WeeklyDigestContent;
