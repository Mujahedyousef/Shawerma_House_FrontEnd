import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

const ProductImageGallery = ({ product, getImageUrl }) => {
  const { i18n } = useTranslation();
  const isRTL = i18n.language === 'ar';
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalImageIndex, setModalImageIndex] = useState(0);

  if (!product) return null;

  // Get images array
  const getImages = () => {
    if (product?.images && product.images.length > 0) {
      return product.images.map(img => img.imageUrl);
    } else if (product?.imageUrls && product.imageUrls.length > 0) {
      return product.imageUrls;
    } else if (product?.imageUrl) {
      return [product.imageUrl];
    }
    return [];
  };

  const images = getImages();

  if (images.length === 0) {
    return null;
  }

  // Modal navigation
  const handlePrevImage = e => {
    e.stopPropagation();
    setModalImageIndex(prev => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const handleNextImage = e => {
    e.stopPropagation();
    setModalImageIndex(prev => (prev === images.length - 1 ? 0 : prev + 1));
  };

  // Keyboard navigation in modal
  useEffect(() => {
    if (!isModalOpen) return;

    const handleKeyDown = e => {
      if (e.key === 'ArrowLeft') {
        handlePrevImage(e);
      } else if (e.key === 'ArrowRight') {
        handleNextImage(e);
      } else if (e.key === 'Escape') {
        setIsModalOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isModalOpen, modalImageIndex]);

  const openModal = index => {
    setModalImageIndex(index);
    setIsModalOpen(true);
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    setIsModalOpen(false);
    document.body.style.overflow = 'unset';
  };

  const renderImageGallery = () => {
    // 1 image: full width
    if (images.length === 1) {
      return (
        <div className="w-full">
          <img
            src={getImageUrl(images[0])}
            alt={isRTL ? product.titleAr : product.titleEn}
            className="w-full h-[300px] sm:h-[400px] md:h-[500px] object-cover rounded-xl cursor-pointer hover:opacity-90 transition-opacity"
            onClick={() => openModal(0)}
          />
        </div>
      );
    }

    // 2 images: side by side (responsive)
    if (images.length === 2) {
      return (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
          {images.map((img, idx) => (
            <img
              key={idx}
              src={getImageUrl(img)}
              alt={`${isRTL ? product.titleAr : product.titleEn} - ${idx + 1}`}
              className="w-full h-[250px] sm:h-[400px] md:h-[500px] object-cover rounded-xl cursor-pointer hover:opacity-90 transition-opacity"
              onClick={() => openModal(idx)}
            />
          ))}
        </div>
      );
    }

    // 3 images: first takes 2/3, other two stack in 1/3 (responsive)
    if (images.length === 3) {
      return (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
          <div className="sm:col-span-2">
            <img
              src={getImageUrl(images[0])}
              alt={`${isRTL ? product.titleAr : product.titleEn} - 1`}
              className="w-full h-[250px] sm:h-[400px] md:h-[500px] object-cover rounded-xl cursor-pointer hover:opacity-90 transition-opacity"
              onClick={() => openModal(0)}
            />
          </div>
          <div className="sm:col-span-1 flex flex-col gap-3 sm:gap-4">
            {images.slice(1, 3).map((img, idx) => (
              <img
                key={idx + 1}
                src={getImageUrl(img)}
                alt={`${isRTL ? product.titleAr : product.titleEn} - ${idx + 2}`}
                className="w-full h-[120px] sm:h-[190px] md:h-[242px] object-cover rounded-xl cursor-pointer hover:opacity-90 transition-opacity"
                onClick={() => openModal(idx + 1)}
              />
            ))}
          </div>
        </div>
      );
    }

    // 4+ images: 2x2 grid with "Show More" button
    const displayImages = images.slice(0, 4);
    const remainingCount = images.length - 4;

    return (
      <div>
        <div className="grid grid-cols-2 gap-3 sm:gap-4">
          {displayImages.map((img, idx) => (
            <div key={idx} className="relative group">
              <img
                src={getImageUrl(img)}
                alt={`${isRTL ? product.titleAr : product.titleEn} - ${idx + 1}`}
                className="w-full h-[150px] sm:h-[200px] md:h-[350px] object-cover rounded-xl cursor-pointer hover:opacity-90 transition-opacity"
                onClick={() => openModal(idx)}
              />
              {idx === 3 && remainingCount > 0 && (
                <div
                  className="absolute inset-0 bg-black/40 rounded-xl flex items-center justify-center cursor-pointer hover:bg-black/50 transition-colors"
                  onClick={() => openModal(3)}
                >
                  <span className="text-white text-sm sm:text-base font-semibold">{isRTL ? `+${remainingCount} المزيد` : `+${remainingCount} More`}</span>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <>
      <div className="mb-8">{renderImageGallery()}</div>

      {/* Image Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[9999] bg-black/95 flex items-center justify-center p-4" onClick={closeModal}>
          {/* Close Button */}
          <button
            onClick={closeModal}
            className="absolute top-4 right-4 sm:top-6 sm:right-6 z-10 p-2 bg-white/10 hover:bg-white/20 rounded-full transition-colors"
            aria-label="Close"
          >
            <X className="w-6 h-6 text-white" />
          </button>

          {/* Navigation Buttons */}
          {images.length > 1 && (
            <>
              <button
                onClick={handlePrevImage}
                className={`absolute ${
                  isRTL ? 'right-4 sm:right-6' : 'left-4 sm:left-6'
                } top-1/2 -translate-y-1/2 z-10 p-3 bg-white/10 hover:bg-white/20 rounded-full transition-colors`}
                aria-label="Previous image"
              >
                <ChevronLeft className={`w-6 h-6 text-white ${isRTL ? 'rotate-180' : ''}`} />
              </button>
              <button
                onClick={handleNextImage}
                className={`absolute ${
                  isRTL ? 'left-4 sm:left-6' : 'right-4 sm:right-6'
                } top-1/2 -translate-y-1/2 z-10 p-3 bg-white/10 hover:bg-white/20 rounded-full transition-colors`}
                aria-label="Next image"
              >
                <ChevronRight className={`w-6 h-6 text-white ${isRTL ? 'rotate-180' : ''}`} />
              </button>
            </>
          )}

          {/* Main Image */}
          <div className="relative max-w-7xl w-full h-full flex items-center justify-center" onClick={e => e.stopPropagation()}>
            <img
              src={getImageUrl(images[modalImageIndex])}
              alt={`${isRTL ? product.titleAr : product.titleEn} - ${modalImageIndex + 1}`}
              className="max-w-full max-h-[90vh] object-contain rounded-lg"
            />
          </div>

          {/* Image Counter */}
          <div className="absolute bottom-4 sm:bottom-6 left-1/2 -translate-x-1/2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-white text-sm sm:text-base">
            {modalImageIndex + 1} / {images.length}
          </div>

          {/* Thumbnail Strip (for 4+ images) */}
          {images.length > 4 && (
            <div className="absolute bottom-16 sm:bottom-20 left-1/2 -translate-x-1/2 w-full max-w-4xl px-4">
              <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
                {images.map((img, idx) => (
                  <img
                    key={idx}
                    src={getImageUrl(img)}
                    alt={`Thumbnail ${idx + 1}`}
                    className={`h-16 sm:h-20 w-auto object-cover rounded-lg cursor-pointer transition-opacity ${
                      idx === modalImageIndex ? 'opacity-100 ring-2 ring-white' : 'opacity-60 hover:opacity-80'
                    }`}
                    onClick={e => {
                      e.stopPropagation();
                      setModalImageIndex(idx);
                    }}
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default ProductImageGallery;
