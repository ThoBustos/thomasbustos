import './QuoteOfWeek.css';

function QuoteOfWeek({ text, speaker, source_video_id }) {
  if (!text) return null;

  const videoUrl = source_video_id
    ? `https://www.youtube.com/watch?v=${source_video_id}`
    : null;

  return (
    <div className="quote-of-week">
      <div className="quote-of-week-mark">"</div>
      <blockquote className="quote-of-week-text">{text}</blockquote>
      {speaker && (
        <div className="quote-of-week-attribution">
          <span className="quote-speaker">— {speaker}</span>
          {videoUrl && (
            <a
              href={videoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="quote-source-link"
            >
              Watch
            </a>
          )}
        </div>
      )}
    </div>
  );
}

export default QuoteOfWeek;
