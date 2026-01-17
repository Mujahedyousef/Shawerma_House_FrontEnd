import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { ChevronRight, Play } from 'lucide-react';
import { getImageUrl } from '../../../utils/imageUrl';

const HeroMediaCarousel = ({ mediaItems = [], autoPlayInterval = 5000, fallbackVideo = null, pauseOnHover = true }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const [loadedMedia, setLoadedMedia] = useState(new Set());
  const intervalRef = useRef(null);
  const videoRefs = useRef({});

  const hasMultipleItems = mediaItems.length > 1;
  const currentMedia = mediaItems[currentIndex];
  const isCurrentVideo = currentMedia?.type === 'video';

  // Preload all media on mount
  useEffect(() => {
    const preloadPromises = mediaItems.map(media => {
      return new Promise(resolve => {
        if (media.type === 'image') {
          const img = new Image();
          img.onload = () => {
            setLoadedMedia(prev => new Set([...prev, media.id]));
            resolve();
          };
          img.onerror = () => resolve(); // Resolve even on error to not block
          img.src = getImageUrl(media.url);
        } else {
          // For videos, create video element to preload
          const video = document.createElement('video');
          video.preload = 'auto';
          video.muted = true;
          video.oncanplaythrough = () => {
            setLoadedMedia(prev => new Set([...prev, media.id]));
            resolve();
          };
          video.onerror = () => resolve(); // Resolve even on error
          video.src = getImageUrl(media.url);
        }
      });
    });

    Promise.all(preloadPromises).then(() => {
      // All media preloaded
    });
  }, [mediaItems]);

  // Auto-play functionality - only for images, videos wait for end
  useEffect(() => {
    // Don't auto-advance if paused, hovered, or if current item is a video
    if (!hasMultipleItems || isPaused || isHovered || isVideoPlaying) {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
      return;
    }

    // Only auto-advance for images
    if (!isCurrentVideo) {
      intervalRef.current = setInterval(() => {
        setCurrentIndex(prev => (prev + 1) % mediaItems.length);
      }, autoPlayInterval);
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [hasMultipleItems, isPaused, isHovered, autoPlayInterval, mediaItems.length, isCurrentVideo, isVideoPlaying]);

  // Handle hover pause
  const handleMouseEnter = () => {
    if (pauseOnHover) {
      setIsHovered(true);
    }
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  // Manual navigation
  const goToNext = () => {
    setCurrentIndex(prev => (prev + 1) % mediaItems.length);
  };

  const goToPrevious = () => {
    setCurrentIndex(prev => (prev - 1 + mediaItems.length) % mediaItems.length);
  };

  const goToIndex = index => {
    setCurrentIndex(index);
  };

  // Video play/pause control
  const handleVideoPlay = videoId => {
    // Pause all other videos
    Object.keys(videoRefs.current).forEach(id => {
      if (id !== videoId && videoRefs.current[id]) {
        videoRefs.current[id].pause();
      }
    });
    setIsVideoPlaying(true);
  };

  const handleVideoPause = () => {
    setIsVideoPlaying(false);
  };

  const handleVideoEnded = () => {
    setIsVideoPlaying(false);
    // When video ends, move to next if multiple items
    if (hasMultipleItems) {
      goToNext();
    }
  };

  // Handle video interaction - unmute on hover
  useEffect(() => {
    const currentVideo = videoRefs.current[mediaItems[currentIndex]?.id];
    if (currentVideo && mediaItems[currentIndex]?.type === 'video') {
      if (isHovered) {
        // On hover, unmute video
        currentVideo.muted = false;
      } else {
        // On leave, mute video
        currentVideo.muted = true;
      }
    }
  }, [isHovered, currentIndex, mediaItems]);

  // Reset video playing state when index changes and ensure active video plays
  useEffect(() => {
    setIsVideoPlaying(false);

    // Ensure the active video plays
    const activeVideo = videoRefs.current[mediaItems[currentIndex]?.id];
    if (activeVideo && mediaItems[currentIndex]?.type === 'video') {
      if (activeVideo.paused) {
        activeVideo.play().catch(() => {
          // Auto-play might be blocked, that's okay
        });
      }
    }
  }, [currentIndex, mediaItems]);

  // If no media items, show fallback
  if (mediaItems.length === 0 && fallbackVideo) {
    return (
      <video autoPlay loop muted playsInline className="absolute inset-0 w-full h-full object-cover">
        <source src={fallbackVideo} type="video/mp4" />
      </video>
    );
  }

  if (mediaItems.length === 0) {
    return null;
  }

  return (
    <>
      {/* Media Container */}
      <div className="absolute inset-0 w-full h-full z-[1]" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
        {/* Render all media with crossfade transition */}
        {mediaItems.map((media, index) => {
          const isActive = index === currentIndex;
          const isPrevious = index === (currentIndex - 1 + mediaItems.length) % mediaItems.length;

          return (
            <motion.div
              key={media.id}
              className="absolute inset-0 w-full h-full overflow-hidden"
              style={{ zIndex: isActive ? 1 : isPrevious ? 0 : -1 }}
              initial={false}
              animate={{
                opacity: isActive ? 1 : isPrevious ? 0 : 0,
              }}
              transition={{
                opacity: {
                  duration: 1.2,
                  ease: [0.4, 0, 0.2, 1], // Smooth cubic-bezier easing
                },
              }}
            >
              {media.type === 'video' ? (
                <video
                  ref={el => {
                    if (el) {
                      videoRefs.current[media.id] = el;
                      // Preload video
                      if (el.readyState < 3) {
                        el.load();
                      }
                      // Ensure video plays when active
                      if (isActive && el.paused) {
                        el.play().catch(() => {
                          // Auto-play might be blocked, that's okay
                        });
                      }
                    }
                  }}
                  autoPlay={isActive}
                  loop={!hasMultipleItems}
                  muted={!isHovered || !isActive}
                  playsInline
                  preload="auto"
                  onPlay={() => isActive && handleVideoPlay(media.id)}
                  onPause={handleVideoPause}
                  onEnded={handleVideoEnded}
                  className="absolute inset-0 w-full h-full object-cover"
                  style={{ pointerEvents: isHovered && isActive ? 'auto' : 'none' }}
                >
                  <source src={getImageUrl(media.url)} type="video/mp4" />
                </video>
              ) : (
                <motion.img
                  src={getImageUrl(media.url)}
                  alt="Hero background"
                  loading={index === 0 ? 'eager' : 'lazy'}
                  className="absolute inset-0 w-full h-full object-cover"
                  style={{ display: 'block' }}
                  initial={false}
                  animate={{
                    scale: isActive ? [1, 1.1] : 1,
                  }}
                  transition={{
                    scale: {
                      duration: autoPlayInterval / 1000, // Duration matches auto-play interval
                      ease: 'linear', // Smooth linear zoom
                      repeat: 0, // Don't repeat, just zoom once
                    },
                  }}
                />
              )}
            </motion.div>
          );
        })}
      </div>

      {/* Navigation Controls - Outside container for proper z-index */}
      {hasMultipleItems && (
        <>
          {/* Previous Button */}
          <motion.button
            onClick={goToPrevious}
            className="hidden sm:flex absolute left-4 top-1/2 -translate-y-1/2 z-[50] w-12 h-12 rounded-full bg-black/40 backdrop-blur-md  items-center justify-center hover:bg-black/60 transition-all group"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <ChevronRight size={24} className="text-white rotate-180 group-hover:translate-x-[-2px] transition-transform" />
          </motion.button>

          {/* Next Button */}
          <motion.button
            onClick={goToNext}
            className="hidden sm:flex absolute right-4 top-1/2 -translate-y-1/2 z-[50] w-12 h-12 rounded-full bg-black/40 backdrop-blur-md  items-center justify-center hover:bg-black/60 transition-all group"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <ChevronRight size={24} className="text-white group-hover:translate-x-[2px] transition-transform" />
          </motion.button>

          {/* Progress Indicator */}
          <div className="absolute bottom-0 md:bottom-1.5 left-1/2 -translate-x-1/2 z-[50] flex items-center gap-2 bg-black/40 backdrop-blur-md rounded-full px-4 py-2">
            {mediaItems.map((media, index) => (
              <button key={index} onClick={() => goToIndex(index)} className="group relative flex items-center gap-2">
                <div className="w-16 h-1 bg-white/30 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-white rounded-full"
                    initial={{ width: 0 }}
                    animate={{
                      width: index === currentIndex && !isPaused && !isHovered && !isVideoPlaying ? '100%' : index === currentIndex ? '100%' : '0%',
                    }}
                    transition={{
                      duration: autoPlayInterval / 1000,
                      ease: 'linear',
                    }}
                  />
                </div>
                {media.type === 'video' && <Play size={12} className={`text-white ${index === currentIndex ? 'opacity-100' : 'opacity-50'}`} />}
                <motion.div
                  className={`absolute -top-1 -bottom-1 -left-1 -right-1 rounded-full border-2 transition-colors ${
                    index === currentIndex ? 'border-white' : 'border-transparent group-hover:border-white/50'
                  }`}
                  whileHover={{ scale: 1.2 }}
                />
              </button>
            ))}
          </div>

          {/* Media Counter Badge */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="absolute top-4 right-4 z-[50] bg-black/60 backdrop-blur-md rounded-full px-4 py-2 flex items-center gap-2 text-white text-sm font-semibold"
          >
            <span className="text-white/80">
              {currentIndex + 1} / {mediaItems.length}
            </span>
            {currentMedia.type === 'video' && (
              <motion.div animate={{ scale: [1, 1.2, 1] }} transition={{ duration: 2, repeat: Infinity }}>
                <Play size={14} className="text-white" />
              </motion.div>
            )}
          </motion.div>
        </>
      )}
    </>
  );
};

export default HeroMediaCarousel;
