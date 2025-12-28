// src/components/features/library/BookModal/BookModal.jsx
import { useEffect } from 'react';
import { VscBook } from "react-icons/vsc";
import './BookModal.css';

export default function BookModal({ book, isOpen, onClose }) {
  // Close modal on ESC key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
      return () => document.removeEventListener('keydown', handleKeyDown);
    }
  }, [isOpen, onClose]);

  if (!isOpen || !book) return null;

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div className="book-modal-backdrop" onClick={handleBackdropClick}>
      <div className="book-modal">
        <button className="modal-close" onClick={onClose}>×</button>

        <div className="book-modal-content">
          <div className="book-modal-cover">
            {book.cover ? (
              <img src={book.cover} alt={book.title} />
            ) : (
              <div className="modal-cover-placeholder">
                <VscBook size={60} className="placeholder-icon" />
              </div>
            )}
          </div>

          <div className="book-modal-info">
            <h2 className="book-modal-title">{book.title}</h2>
            <p className="book-modal-author">by {book.author}</p>

            <div className="book-modal-meta">
              <span className="book-modal-year">{book.year}</span>
              {book.status === 'reading' && (
                <span className="book-modal-status">Currently Reading</span>
              )}
            </div>

            <div className="book-modal-tags">
              {book.tags.map(tag => (
                <span key={tag} className="book-modal-tag">{tag}</span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
