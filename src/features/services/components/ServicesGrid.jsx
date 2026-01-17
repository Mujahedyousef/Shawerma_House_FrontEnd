import React from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import ServiceCard from './ServiceCard';
import { getImageUrl } from '../../../utils/imageUrl';

const ServicesGrid = ({ services }) => {
  const { i18n } = useTranslation();
  const isRTL = i18n.language === 'ar';

  if (!services || services.length === 0) {
    return (
      <div className="text-center py-20">
        <p className="text-[var(--color-text-muted)] text-lg">{isRTL ? 'لا توجد خدمات متاحة حالياً' : 'No services available at the moment'}</p>
      </div>
    );
  }

  // Create alternating pattern: Image-Service-Image-Service-Image-Service
  // Count numbers (01, 02, 03...) only appear on Service cards
  const createLayoutItems = () => {
    const items = [];

    // Separate services by type and sort by order
    const imageServices = services.filter(s => s.type === 'image').sort((a, b) => a.order - b.order);
    const cardServices = services.filter(s => s.type === 'card').sort((a, b) => a.order - b.order);

    let imageIndex = 0;
    let cardIndex = 0;
    let cardCount = 1; // Track count for service cards only

    // Alternate pattern: Image, Service, Image, Service, Image, Service...
    // Start with Image (index 0 = Image, index 1 = Service, index 2 = Image, etc.)
    for (let i = 0; i < services.length; i++) {
      const isEvenIndex = i % 2 === 0; // Even index = Image, Odd index = Service Card

      let service, type;

      if (isEvenIndex) {
        // Need an Image
        if (imageIndex < imageServices.length) {
          service = imageServices[imageIndex];
          type = 'image';
          imageIndex++;
        } else if (cardIndex < cardServices.length) {
          // Fallback to card if no images left
          service = cardServices[cardIndex];
          type = 'card';
          cardIndex++;
          cardCount++;
        }
      } else {
        // Need a Service Card
        if (cardIndex < cardServices.length) {
          service = cardServices[cardIndex];
          type = 'card';
          cardIndex++;
          cardCount++;
        } else if (imageIndex < imageServices.length) {
          // Fallback to image if no cards left
          service = imageServices[imageIndex];
          type = 'image';
          imageIndex++;
        }
      }

      if (service) {
        items.push({
          service,
          type,
          index: i,
          // Assign count only to cards
          cardNumber: type === 'card' ? cardCount - 1 : null,
        });
      }
    }

    return items;
  };

  const layoutItems = createLayoutItems();

  // Use a flexible grid that adapts to content
  const gridClass = 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3';

  return (
    <div className={`grid ${gridClass} gap-6`}>
      {layoutItems.map(item => {
        return (
          <motion.div
            key={`${item.service.id}-${item.index}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: item.index * 0.1 }}
          >
            {item.type === 'image' ? (
              <ServiceImage service={item.service} getImageUrl={getImageUrl} isRTL={isRTL} />
            ) : (
              <ServiceCard
                service={{
                  ...item.service,
                  // Override count with the sequential card number
                  count: item.cardNumber || item.service.count,
                }}
                isRTL={isRTL}
              />
            )}
          </motion.div>
        );
      })}
    </div>
  );
};

const ServiceImage = ({ service, getImageUrl, isRTL }) => {
  const title = isRTL ? service.titleAr : service.titleEn;

  return (
    <div className="relative w-full rounded-xl overflow-hidden group">
      <div className="relative w-full h-[400px] md:h-[500px] overflow-hidden">
        <img
          src={getImageUrl(service?.imageUrl || '')}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
      </div>
    </div>
  );
};

export default ServicesGrid;
