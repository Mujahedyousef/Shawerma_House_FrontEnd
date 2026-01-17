import React from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Phone, Mail, Clock, MapPin } from 'lucide-react';

const ContactDetails = ({ settings }) => {
  const { i18n } = useTranslation();
  const isRTL = i18n.language === 'ar';

  if (!settings) return null;

  // Helper to split content into lines if it contains newlines or multiple values
  const formatContent = content => {
    if (!content) return [];
    // Check if content has newlines or multiple lines
    if (typeof content === 'string' && content.includes('\n')) {
      return content.split('\n').filter(line => line.trim());
    }
    // For single line content, return as array
    return [content];
  };

  const handleLocationClick = () => {
    if (settings.mapLatitude && settings.mapLongitude) {
      const googleMapsUrl = `https://www.google.com/maps/dir/?api=1&destination=${settings.mapLatitude},${settings.mapLongitude}`;
      window.open(googleMapsUrl, '_blank', 'noopener,noreferrer');
    }
  };

  const contactItems = [
    {
      icon: Phone,
      title: isRTL ? 'أرقام التواصل' : 'Contact Numbers',
      content: formatContent(settings.phoneNumber),
      type: 'phone',
      clickable: true,
    },
    {
      icon: Mail,
      title: isRTL ? 'البريد الإلكتروني' : 'Email',
      content: formatContent(settings.email),
      type: 'email',
      clickable: true,
    },
    {
      icon: Clock,
      title: isRTL ? 'ساعات العمل' : 'Working Hours',
      content: formatContent(isRTL ? settings.workingHoursAr : settings.workingHoursEn),
      type: 'text',
      clickable: false,
    },
    {
      icon: MapPin,
      title: isRTL ? 'الموقع' : 'Location',
      content: formatContent(isRTL ? settings.locationAr : settings.locationEn),
      type: 'location',
      clickable: settings.mapLatitude && settings.mapLongitude,
    },
  ];

  return (
    <motion.div
      className={`${isRTL ? 'lg:col-start-1' : ''} h-full relative z-0`}
      initial={{ opacity: 0, x: isRTL ? -50 : 50 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      <div className={`bg-[#020617] p-6 md:p-8 h-full ${isRTL ? 'rounded-br-xl rounded-tr-xl' : 'rounded-tl-xl rounded-bl-xl'}`}>
        {/* Contact Items */}
        <div className="space-y-0 flex flex-col justify-center h-full">
          {contactItems.map((item, index) => {
            const Icon = item.icon;
            const isLast = index === contactItems.length - 1;

            return (
              <div key={index} className={`py-4 ${!isLast ? 'border-b border-[#3d3f48]' : ''}`}>
                <div className={`flex items-start gap-3 ${isRTL ? 'flex-row-reverse' : ''}`}>
                  {/* Content - takes flex-1 and aligns text */}
                  <div className={`flex-1 ${isRTL ? 'text-right' : 'text-left'}`}>
                    <h3 className="font-semibold text-white mb-1.5 text-sm">{item.title}</h3>
                    <div className="space-y-0.5">
                      {item.content.map((line, lineIndex) => {
                        if (item.type === 'email' && item.clickable) {
                          return (
                            <a
                              key={lineIndex}
                              href={`mailto:${line}`}
                              className="text-text-muted text-sm leading-tight hover:text-white transition-colors cursor-pointer underline"
                            >
                              {line}
                            </a>
                          );
                        }
                        if (item.type === 'phone' && item.clickable) {
                          // Clean phone number for tel: link (remove spaces, dashes, etc.)
                          const cleanPhone = line.replace(/[\s\-\(\)]/g, '');
                          return (
                            <a
                              key={lineIndex}
                              href={`tel:${cleanPhone}`}
                              className="text-text-muted text-sm leading-tight hover:text-white transition-colors cursor-pointer underline"
                            >
                              {line}
                            </a>
                          );
                        }
                        if (item.type === 'location' && item.clickable) {
                          return (
                            <button
                              key={lineIndex}
                              onClick={handleLocationClick}
                              className={`text-text-muted text-sm leading-tight hover:text-white transition-colors cursor-pointer underline w-full ${
                                isRTL ? 'text-right' : 'text-left'
                              }`}
                            >
                              {line}
                            </button>
                          );
                        }
                        return (
                          <p key={lineIndex} className="text-text-muted text-sm leading-tight">
                            {line}
                          </p>
                        );
                      })}
                    </div>
                  </div>

                  {/* Icon - positioned on right in RTL, left in LTR */}
                  <div className={`shrink-0 ${isRTL ? 'ml-3' : 'mr-3'}`}>
                    <Icon className="text-text-muted" size={18} />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </motion.div>
  );
};

export default ContactDetails;
