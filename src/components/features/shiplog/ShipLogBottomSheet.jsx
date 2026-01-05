// src/components/features/shiplog/ShipLogBottomSheet.jsx
import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import './ShipLogBottomSheet.css';

function ShipLogBottomSheet({ day, onClose }) {
  // Close on escape key
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [onClose]);

  // Prevent body scroll when open
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = '';
    };
  }, []);

  const formatDate = (dateStr) => {
    const date = new Date(dateStr + 'T00:00:00');
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      month: 'short',
      day: 'numeric'
    });
  };

  if (!day) return null;

  return createPortal(
    <div className="bottom-sheet-overlay" onClick={onClose}>
      <div
        className="bottom-sheet"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="bottom-sheet-handle" />

        <div className="bottom-sheet-content">
          <div className="sheet-date">{formatDate(day.date)}</div>
          <div className="sheet-total">
            <span className="sheet-count">{day.total}</span>
            <span className="sheet-label">
              {day.total === 1 ? 'post shipped' : 'posts shipped'}
            </span>
          </div>

          {day.notes && day.notes.length > 0 && (
            <>
              <div className="sheet-divider" />
              <ul className="sheet-notes">
                {day.notes.map((note, i) => (
                  <li key={i}>{note}</li>
                ))}
              </ul>
            </>
          )}

          {day.total === 0 && (
            <div className="sheet-empty">
              No content shipped this day
            </div>
          )}
        </div>

        <button className="sheet-dismiss" onClick={onClose}>
          Dismiss
        </button>
      </div>
    </div>,
    document.body
  );
}

export default ShipLogBottomSheet;
