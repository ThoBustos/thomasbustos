// src/pages/LibraryPage.jsx
import { useState } from 'react';
import { BOOKS, BOOK_CATEGORIES } from '../data/books';
import BookCard from '../components/features/library/BookCard/BookCard';
import BookModal from '../components/features/library/BookModal/BookModal';
import './LibraryPage.css';

export default function LibraryPage() {
  const [activeFilter, setActiveFilter] = useState('All');
  const [selectedBook, setSelectedBook] = useState(null);

  const filteredBooks = BOOKS
    .filter(book => {
      if (activeFilter === 'All') return true;
      if (activeFilter === 'Favorites') return book.isFavorite;
      return book.category === activeFilter;
    })
    .sort((a, b) => {
      // Order: reading -> read -> to-read
      const statusOrder = { 'reading': 0, 'read': 1, 'to-read': 2 };
      const aOrder = statusOrder[a.status] ?? 1;
      const bOrder = statusOrder[b.status] ?? 1;
      return aOrder - bOrder;
    });

  const handleBookClick = (book) => {
    setSelectedBook(book);
  };

  const handleCloseModal = () => {
    setSelectedBook(null);
  };

  return (
    <div className="library-container">
      <h1 className="library-title">Library</h1>

      <nav className="library-filters">
        {BOOK_CATEGORIES.map(category => (
          <button
            key={category}
            className={`filter-pill ${activeFilter === category ? 'active' : ''}`}
            onClick={() => setActiveFilter(category)}
          >
            {category}
          </button>
        ))}
      </nav>

      <div className="books-grid">
        {filteredBooks.map(book => (
          <BookCard
            key={book.id}
            book={book}
            onClick={() => handleBookClick(book)}
          />
        ))}
      </div>

      {filteredBooks.length === 0 && (
        <p className="empty-library">No books in this category yet.</p>
      )}

      <BookModal
        book={selectedBook}
        isOpen={!!selectedBook}
        onClose={handleCloseModal}
      />
    </div>
  );
}
