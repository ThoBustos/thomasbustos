// src/components/features/newsletter/DigestTypeFilter/DigestTypeFilter.jsx
import './DigestTypeFilter.css';

const DIGEST_TYPES = [
  { value: 'all', label: 'All' },
  { value: 'daily', label: 'Daily' },
  { value: 'weekly', label: 'Weekly' }
];

function DigestTypeFilter({ selected, onChange }) {
  return (
    <div className="digest-type-filter">
      {DIGEST_TYPES.map(({ value, label }) => (
        <button
          key={value}
          className={`digest-type-option ${selected === value ? 'selected' : ''}`}
          onClick={() => onChange(value)}
          aria-pressed={selected === value}
        >
          {label}
        </button>
      ))}
    </div>
  );
}

export default DigestTypeFilter;

