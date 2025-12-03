import './BrandAvatar.css';

function BrandAvatar({ onClick, size = 'medium', className = '' }) {
  const sizeMap = {
    small: 60,
    medium: 70,
    large: 80
  };

  // Allow numeric size or use size map
  const dimension = typeof size === 'number' ? size : (sizeMap[size] || sizeMap.medium);

  return (
    <img 
      src="/thomas-bustos.png" 
      alt="Thomas Bustos" 
      className={`brand-avatar ${className}`}
      onClick={onClick}
      style={{ width: `${dimension}px`, height: `${dimension}px` }}
    />
  );
}

export default BrandAvatar;

