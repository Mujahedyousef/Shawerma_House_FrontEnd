import React, { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import { MapPin, Phone, Mail, Clock, Navigation } from 'lucide-react';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import useMapSection from '../../../hooks/useMapSection';

// Fix for default marker icon in React-Leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
    iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

// Custom marker icon with brand color
const createCustomIcon = (accentColor = '#3daae1') => {
    return L.divIcon({
        html: `
      <div style="position: relative;">
        <svg width="40" height="50" viewBox="0 0 40 50" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M20 0C8.95 0 0 8.95 0 20C0 35 20 50 20 50C20 50 40 35 40 20C40 8.95 31.05 0 20 0Z" fill="${accentColor}"/>
          <circle cx="20" cy="20" r="8" fill="white"/>
        </svg>
      </div>
    `,
        className: 'custom-marker',
        iconSize: [40, 50],
        iconAnchor: [20, 50],
        popupAnchor: [0, -50],
    });
};

// Component to handle map center changes
const MapCenterController = ({ center, zoom }) => {
    const map = useMap();

    React.useEffect(() => {
        if (center && zoom) {
            map.setView(center, zoom);
        }
    }, [center, zoom, map]);

    return null;
};

// Branch Info Card Component
const BranchInfoCard = ({ branch, isRTL, colors }) => {
    const handleGetDirections = () => {
        const url = `https://www.google.com/maps/dir/?api=1&destination=${branch.latitude},${branch.longitude}`;
        window.open(url, '_blank');
    };

    return (
        <div className="min-w-[280px] max-w-[320px]" dir={isRTL ? 'rtl' : 'ltr'}>
            <div
                className="rounded-lg shadow-lg overflow-hidden dark:shadow-xl"
                style={{
                    backgroundColor: 'var(--color-mode) === "dark" ? colors.cardBackgroundDark : colors.cardBackgroundLight',
                }}
            >
                {/* Header */}
                <div
                    className="p-4"
                    style={{
                        background: `linear-gradient(to right, ${colors.cardAccentLight}, ${colors.cardAccentDark})`,
                    }}
                >
                    <h3 className="text-white font-bold text-lg mb-1">
                        {isRTL ? branch.nameAr : branch.nameEn}
                    </h3>
                    <div className="flex items-start text-white/90 text-sm">
                        <MapPin className="w-4 h-4 mr-2 mt-0.5 shrink-0" />
                        <span>{isRTL ? branch.addressAr : branch.addressEn}</span>
                    </div>
                </div>

                {/* Body */}
                <div className="p-4 space-y-3 bg-white dark:bg-[--card-bg-dark]" style={{ backgroundColor: colors.cardBackgroundLight }}>
                    <div className="flex items-center" style={{ color: colors.cardTextLight }}>
                        <Phone className="w-4 h-4 mr-2 shrink-0" style={{ color: colors.cardAccentLight }} />
                        <a
                            href={`tel:${branch.phoneNumber}`}
                            className="transition-colors"
                            style={{ color: colors.cardTextLight }}
                            onMouseEnter={(e) => e.target.style.color = colors.cardAccentLight}
                            onMouseLeave={(e) => e.target.style.color = colors.cardTextLight}
                        >
                            {branch.phoneNumber}
                        </a>
                    </div>

                    <div className="flex items-center" style={{ color: colors.cardTextLight }}>
                        <Mail className="w-4 h-4 mr-2 shrink-0" style={{ color: colors.cardAccentLight }} />
                        <a
                            href={`mailto:${branch.email}`}
                            className="transition-colors truncate"
                            style={{ color: colors.cardTextLight }}
                            onMouseEnter={(e) => e.target.style.color = colors.cardAccentLight}
                            onMouseLeave={(e) => e.target.style.color = colors.cardTextLight}
                        >
                            {branch.email}
                        </a>
                    </div>

                    <div className="flex items-start" style={{ color: colors.cardTextLight }}>
                        <Clock className="w-4 h-4 mr-2 mt-0.5 shrink-0" style={{ color: colors.cardAccentLight }} />
                        <span className="text-sm whitespace-pre-line">
                            {isRTL ? branch.workingHoursAr : branch.workingHoursEn}
                        </span>
                    </div>

                    {/* Get Directions Button */}
                    <button
                        onClick={handleGetDirections}
                        className="w-full mt-4 flex items-center justify-center px-4 py-2.5 text-white rounded-lg transition-all transform hover:scale-105 font-medium"
                        style={{
                            backgroundColor: colors.cardAccentLight,
                        }}
                        onMouseEnter={(e) => e.target.style.backgroundColor = colors.cardAccentDark}
                        onMouseLeave={(e) => e.target.style.backgroundColor = colors.cardAccentLight}
                    >
                        <Navigation className="w-4 h-4 mr-2" />
                        {isRTL ? 'احصل على الاتجاهات' : 'Get Directions'}
                    </button>
                </div>
            </div>
        </div>
    );
};

const BranchesMapSection = () => {
    const { i18n } = useTranslation();
    const isRTL = i18n.language === 'ar';
    const { mapSection, isLoading, isError } = useMapSection();

    // Detect dark mode
    const [isDarkMode, setIsDarkMode] = React.useState(false);

    React.useEffect(() => {
        // Check if dark mode is enabled
        const checkDarkMode = () => {
            const dataTheme = document.documentElement.getAttribute('data-theme');
            const isDark = dataTheme === 'dark' ||
                (!dataTheme && window.matchMedia('(prefers-color-scheme: dark)').matches);
            setIsDarkMode(isDark);
        };

        checkDarkMode();

        // Listen for theme changes
        const observer = new MutationObserver(checkDarkMode);
        observer.observe(document.documentElement, {
            attributes: true,
            attributeFilter: ['data-theme']
        });

        const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
        mediaQuery.addEventListener('change', checkDarkMode);

        return () => {
            observer.disconnect();
            mediaQuery.removeEventListener('change', checkDarkMode);
        };
    }, []);

    // Extract colors from mapSection with fallbacks
    const colors = useMemo(() => ({
        cardBackgroundLight: mapSection?.cardBackgroundLight || '#ffffff',
        cardTextLight: mapSection?.cardTextLight || '#1a1a1a',
        cardAccentLight: mapSection?.cardAccentLight || '#3daae1',
        pinColorLight: mapSection?.pinColorLight || '#3daae1',
        cardBackgroundDark: mapSection?.cardBackgroundDark || '#2a2a2a',
        cardTextDark: mapSection?.cardTextDark || '#ffffff',
        cardAccentDark: mapSection?.cardAccentDark || '#3daae1',
        pinColorDark: mapSection?.pinColorDark || '#3daae1',
    }), [mapSection]);

    const borderRadius = useMemo(() => mapSection?.borderRadius || 12, [mapSection]);

    // Use the appropriate pin color based on theme
    const currentPinColor = useMemo(() =>
        isDarkMode ? colors.pinColorDark : colors.pinColorLight,
        [isDarkMode, colors.pinColorDark, colors.pinColorLight]
    );

    const customIcon = useMemo(() => createCustomIcon(currentPinColor), [currentPinColor]);

    // Don't render if loading, error, or no data
    if (isLoading || isError || !mapSection || !mapSection.isActive) {
        return null;
    }

    // Check if there are active branches
    const activeBranches = mapSection.branches?.filter(branch => branch.isActive) || [];

    if (activeBranches.length === 0) {
        return null;
    }

    const mapCenter = [mapSection.mapCenterLat, mapSection.mapCenterLng];
    const zoomLevel = mapSection.defaultZoomLevel;

    return (
        <section className="relative py-16 md:py-24 bg-section-light" dir={isRTL ? 'rtl' : 'ltr'}>
            <div className="container mx-auto px-4 max-w-7xl">
                <div>
                    {/* Section Header */}
                    <div className="text-center mb-12">
                        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-text mb-4">
                            {isRTL ? mapSection.sectionTitleAr : mapSection.sectionTitleEn}
                        </h2>
                        {mapSection.sectionSubtitleEn && (
                            <p className="text-lg text-text-muted max-w-2xl mx-auto">
                                {isRTL ? mapSection.sectionSubtitleAr : mapSection.sectionSubtitleEn}
                            </p>
                        )}
                    </div>

                    {/* Map Container */}
                    <div
                        className="relative overflow-hidden shadow-xl"
                        style={{
                            height: '600px',
                            borderRadius: `${borderRadius}px`,
                            padding: '16px',
                            backgroundColor: 'var(--color-bg-2)',
                        }}
                    >
                        <div
                            className="w-full h-full overflow-hidden"
                            style={{
                                borderRadius: `${Math.max(0, borderRadius - 4)}px`,
                            }}
                        >
                            <MapContainer
                                center={mapCenter}
                                zoom={zoomLevel}
                                style={{ height: '100%', width: '100%', borderRadius: `${Math.max(0, borderRadius - 4)}px` }}
                                className="z-0"
                                scrollWheelZoom={false}
                            >
                                <MapCenterController center={mapCenter} zoom={zoomLevel} />

                                {/* Tile Layer - Light theme */}
                                <TileLayer
                                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
                                    url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
                                />

                                {/* Branch Markers */}
                                {activeBranches.map((branch) => (
                                    <Marker
                                        key={branch.id}
                                        position={[branch.latitude, branch.longitude]}
                                        icon={customIcon}
                                    >
                                        <Popup
                                            closeButton={true}
                                            className="custom-popup"
                                            maxWidth={320}
                                            minWidth={280}
                                        >
                                            <BranchInfoCard branch={branch} isRTL={isRTL} colors={colors} />
                                        </Popup>
                                    </Marker>
                                ))}
                            </MapContainer>
                        </div>

                        {/* Floating Branch Count Badge */}
                        {/* <div
                            className={`absolute top-6 ${isRTL ? 'left-6' : 'right-6'} bg-white dark:bg-gray-800 rounded-full shadow-lg px-4 py-2 flex items-center space-x-2`}
                            style={{
                                borderRadius: `${borderRadius}px`,
                                zIndex: 1000,
                            }}
                        >
                            <MapPin className="w-5 h-5" style={{ color: currentPinColor }} />
                            <span className="font-bold text-gray-800 dark:text-white">
                                {activeBranches.length} {isRTL ? 'فرع' : activeBranches.length === 1 ? 'Branch' : 'Branches'}
                            </span>
                        </div> */}
                    </div>

                    {/* Branch Cards Grid (Optional - for mobile users) */}
                    <div
                        className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:hidden"
                    >
                        {activeBranches.slice(0, 3).map((branch) => (
                            <div
                                key={branch.id}
                                className="shadow-md p-4 cursor-pointer hover:shadow-lg transition-shadow"
                                style={{
                                    backgroundColor: colors.cardBackgroundLight,
                                    borderRadius: `${borderRadius}px`,
                                }}
                                onClick={() => {
                                    const branchElement = document.querySelector(`[data-branch-id="${branch.id}"]`);
                                    if (branchElement) {
                                        branchElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
                                    }
                                }}
                            >
                                <h4 className="font-bold mb-2" style={{ color: colors.cardTextLight }}>
                                    {isRTL ? branch.nameAr : branch.nameEn}
                                </h4>
                                <p className="text-sm line-clamp-2" style={{ color: colors.cardTextLight, opacity: 0.8 }}>
                                    {isRTL ? branch.addressAr : branch.addressEn}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Custom CSS for Leaflet Popup */}
            <style>{`
        .leaflet-popup-content-wrapper {
          padding: 0;
          border-radius: ${borderRadius}px;
          box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
        }
        
        .leaflet-popup-content {
          margin: 0;
          width: auto !important;
        }

        .leaflet-popup-tip {
          display: none;
        }

        .custom-marker {
          background: transparent;
          border: none;
        }

        .custom-marker svg {
          filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.2));
          transition: transform 0.2s ease;
        }

        .custom-marker:hover svg {
          transform: scale(1.1);
        }

        .leaflet-container {
          font-family: inherit;
        }

        .leaflet-popup-close-button {
          font-size: 20px;
          padding: 8px 8px 0 0;
          color: #666;
        }

        .leaflet-popup-close-button:hover {
          color: ${isDarkMode ? colors.cardAccentDark : colors.cardAccentLight};
        }

        @media (max-width: 640px) {
          .leaflet-popup-content-wrapper {
            max-width: 90vw;
          }
        }
      `}</style>
        </section>
    );
};

export default BranchesMapSection;

