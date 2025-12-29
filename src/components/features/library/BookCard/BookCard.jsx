// src/components/features/library/BookCard/BookCard.jsx
import { VscBook } from "react-icons/vsc";
import './BookCard.css';

export default function BookCard({ book, onClick }) {
  return (
    <div className="book-card" onClick={onClick}>
      <div className="book-cover">
        {book.cover ? (
          <img src={book.cover} alt={book.title} />
        ) : (
          <div className="cover-placeholder">
            <VscBook size={40} className="placeholder-icon" />
          </div>
        )}
        {book.status === 'reading' && (
          <span className="reading-badge">Reading</span>
        )}
      </div>
    </div>
  );
}
