import './TheOneThing.css';

function TheOneThing({ headline, subtext }) {
  if (!headline) return null;

  return (
    <div className="the-one-thing">
      <h2 className="one-thing-headline">{headline}</h2>
      {subtext && <p className="one-thing-subtext">{subtext}</p>}
    </div>
  );
}

export default TheOneThing;
