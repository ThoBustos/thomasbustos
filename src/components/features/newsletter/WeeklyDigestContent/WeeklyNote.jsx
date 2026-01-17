import './WeeklyNote.css';

function WeeklyNote({ text }) {
  if (!text) return null;

  return (
    <div className="weekly-note">
      <p className="weekly-note-text">{text}</p>
      <span className="weekly-note-signature">— LTAI</span>
    </div>
  );
}

export default WeeklyNote;
