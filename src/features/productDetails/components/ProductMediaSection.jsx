import React, { useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Play, Pause } from 'lucide-react';

// --- Sub-Component: Play Button Overlay ---
const PlayOverlay = ({ isPlaying, isHovered }) => (
  <div
    className={`absolute inset-0 flex items-center justify-center bg-black/10 transition-opacity duration-300 ${
      isPlaying && !isHovered ? 'opacity-0' : 'opacity-100'
    }`}
  >
    <div className="relative group">
      {/* Button Circle */}
      <div className="w-16 h-16 sm:w-20 sm:h-20 bg-white/90 backdrop-blur-md rounded-full flex items-center justify-center shadow-lg transform transition-all duration-300 group-hover:scale-110 group-hover:bg-white">
        {isPlaying ? (
          <Pause className="w-6 h-6 sm:w-8 sm:h-8 text-slate-900 fill-current" />
        ) : (
          <Play className="w-6 h-6 sm:w-8 sm:h-8 text-slate-900 fill-current ml-1" />
        )}
      </div>

      {/* Pulse Animation (Only when paused) */}
      {!isPlaying && <div className="absolute inset-0 w-16 h-16 sm:w-20 sm:h-20 -z-10 bg-white/40 rounded-full animate-ping" />}
    </div>
  </div>
);

// --- Sub-Component: Video Player ---
const VideoPlayer = ({ src, isRTL }) => {
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const handlePlayPause = () => {
    if (videoRef.current) {
      if (videoRef.current.paused) {
        videoRef.current.play();
        setIsPlaying(true);
      } else {
        videoRef.current.pause();
        setIsPlaying(false);
      }
    }
  };

  return (
    <div
      className="relative group cursor-pointer rounded-xl overflow-hidden shadow-lg bg-black/5"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handlePlayPause}
    >
      <video
        ref={videoRef}
        src={src}
        loop
        muted
        playsInline
        onEnded={() => setIsPlaying(false)}
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
        className="w-full h-[350px] sm:h-[450px] md:h-[500px] object-contain mx-auto block"
        style={{ userSelect: 'none' }}
        onContextMenu={e => e.preventDefault()}
      >
        {isRTL ? 'متصفحك لا يدعم الفيديو' : 'Your browser does not support the video tag.'}
      </video>

      <PlayOverlay isPlaying={isPlaying} isHovered={isHovered} />
    </div>
  );
};

// --- Sub-Component: Image Viewer ---
const ImageViewer = ({ src, alt }) => (
  <div className="relative rounded-xl overflow-hidden shadow-lg bg-black/5">
    <img
      src={src}
      alt={alt}
      className="w-full h-[350px] sm:h-[450px] md:h-[500px] object-contain mx-auto block transition-transform duration-500 hover:scale-105"
    />
  </div>
);

// --- Main Component ---
const ProductMediaSection = ({ product, getImageUrl }) => {
  const { i18n } = useTranslation();

  if (!product?.mediaUrl || !product?.mediaType) return null;

  const isRTL = i18n.language === 'ar';
  const title = isRTL ? product.titleAr : product.titleEn;
  const mediaSrc = getImageUrl(product.mediaUrl);

  return (
    <div className="w-full overflow-hidden mt-6 mb-0">
      {/* Full-width container using the requested 'bg-text' class.
         Ensure 'bg-text' is defined in your tailwind config or CSS.
      */}
      <div className={`w-screen relative ${isRTL ? 'right-1/2' : 'left-1/2'} ${isRTL ? '-mr-[50vw]' : '-ml-[50vw]'} bg-[#0b1320] py-12 sm:py-16`}>
        {/* Content Container */}
        <div className="max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8">
          {product.mediaType === 'video' ? (
            <>
              <VideoPlayer src={mediaSrc} isRTL={isRTL} />
              <p className="text-center mt-4 text-sm opacity-60 text-white mix-blend-overlay">{isRTL ? 'انقر للتشغيل' : 'Click to play'}</p>
            </>
          ) : (
            <ImageViewer src={mediaSrc} alt={title} />
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductMediaSection;
