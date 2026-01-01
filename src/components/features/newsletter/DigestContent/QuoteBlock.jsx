import './QuoteBlock.css';

function QuoteBlock({ quote }) {
  if (!quote) return null;

  return (
    <blockquote className="quote-block">
      <span className="quote-mark">"</span>
      <p className="quote-text">{quote}</p>
    </blockquote>
  );
}

export default QuoteBlock;
