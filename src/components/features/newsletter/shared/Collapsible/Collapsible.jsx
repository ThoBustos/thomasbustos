import { useState } from 'react';
import './Collapsible.css';

function Collapsible({ title, subtitle, defaultOpen = false, children, className = '' }) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div className={`collapsible ${isOpen ? 'is-open' : ''} ${className}`}>
      <button
        className="collapsible-header"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
      >
        <div className="collapsible-title-group">
          <span className="collapsible-title">{title}</span>
          {subtitle && <span className="collapsible-subtitle">{subtitle}</span>}
        </div>
        <span className="collapsible-icon">{isOpen ? '−' : '+'}</span>
      </button>
      {isOpen && <div className="collapsible-content">{children}</div>}
    </div>
  );
}

export default Collapsible;
