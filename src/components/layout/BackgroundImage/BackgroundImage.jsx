import { useState, useEffect } from 'react';
import './BackgroundImage.css';

const BackgroundImage = ({ theme = 'dark', className = '' }) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.matchMedia('(max-width: 768px)').matches);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const imagePrefix = `background_${theme}${isMobile ? '_mobile' : ''}`;

  // Simple CSS blur placeholder (no base64 needed)
  const blurStyle = theme === 'dark' 
    ? { backgroundColor: '#0B102C', filter: 'blur(20px)' }
    : { backgroundColor: '#F2E7C9', filter: 'blur(20px)' };

  return (
    <div className={`background-image-container ${className}`}>
      {/* Blur placeholder - shown while loading */}
      <div 
        className={`background-blur-placeholder ${imageLoaded ? 'loaded' : ''}`}
        style={blurStyle}
      />
      
      {/* Simplified WebP-first with JPG fallback */}
      <picture className={`background-image ${imageLoaded ? 'loaded' : ''}`}>
        {/* WebP first - excellent compression, 94% browser support */}
        <source srcSet={`/${imagePrefix}.webp`} type="image/webp" />
        
        {/* JPG fallback - universal support, good compression */}
        <img
          src={`/${imagePrefix}.jpg`}
          alt=""
          onLoad={() => setImageLoaded(true)}
          fetchpriority="high"
          decoding="async"
        />
      </picture>
    </div>
  );
};

export default BackgroundImage;