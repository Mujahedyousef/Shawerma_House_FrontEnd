import React, { lazy, Suspense, useState, useEffect } from 'react';

// Lazy load the client-side map component to avoid SSR issues with Leaflet
const ContactMapClient = lazy(() => import('./ContactMap.client'));

// Loading component
const MapLoadingPlaceholder = () => (
  <div className="w-full h-[550px] relative bg-gray-200 dark:bg-gray-700 rounded-lg animate-pulse flex items-center justify-center">
    <div className="text-gray-500 dark:text-gray-400">Loading map...</div>
  </div>
);

const ContactMap = ({ latitude, longitude, locationName }) => {
  // Only render on client-side to avoid SSR issues
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return <MapLoadingPlaceholder />;
  }

  return (
    <Suspense fallback={<MapLoadingPlaceholder />}>
      <ContactMapClient latitude={latitude} longitude={longitude} locationName={locationName} />
    </Suspense>
  );
};

export default ContactMap;
