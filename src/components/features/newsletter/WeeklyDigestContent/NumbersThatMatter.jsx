import './NumbersThatMatter.css';

function NumbersThatMatter({ numbers }) {
  if (!numbers || numbers.length === 0) return null;

  return (
    <div className="numbers-that-matter">
      <h3 className="numbers-title">Numbers That Matter</h3>
      <div className="numbers-grid">
        {numbers.map((item, index) => (
          <div key={index} className="number-item">
            <span className="number-value">{item.number}</span>
            <span className="number-context">{item.context}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default NumbersThatMatter;
