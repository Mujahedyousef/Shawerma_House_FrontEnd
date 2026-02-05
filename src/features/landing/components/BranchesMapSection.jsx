import React, { lazy, Suspense, useState, useEffect } from 'react';

// Lazy load the client-side map component to avoid SSR issues with Leaflet
const BranchesMapSectionClient = lazy(() => import('./BranchesMapSection.client'));

// Loading component
const MapLoadingPlaceholder = () => (
  <section className="relative py-16 md:py-24 bg-section-light">
    <div className="container mx-auto px-4 max-w-7xl">
      <div className="text-center mb-12">
        <div className="h-10 bg-gray-200 dark:bg-gray-700 rounded-lg w-64 mx-auto mb-4 animate-pulse"></div>
        <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded-lg w-96 mx-auto animate-pulse"></div>
      </div>
      <div className="relative overflow-hidden shadow-xl rounded-xl" style={{ height: '600px', padding: '16px', backgroundColor: 'var(--color-bg-2)' }}>
        <div className="w-full h-full bg-gray-200 dark:bg-gray-700 rounded-lg animate-pulse flex items-center justify-center">
          <div className="text-gray-500 dark:text-gray-400">Loading map...</div>
        </div>
      </div>
    </div>
  </section>
);

const BranchesMapSection = () => {
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
      <BranchesMapSectionClient />
    </Suspense>
  );
};

export default BranchesMapSection;

