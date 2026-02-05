import React from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { Navigation } from 'lucide-react';

// Fix for default marker icon in react-leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

// Component to handle map click events
const MapClickHandler = ({ latitude, longitude }) => {
  useMapEvents({
    click: () => {
      // Open Google Maps with directions to this location
      const googleMapsUrl = `https://www.google.com/maps/dir/?api=1&destination=${latitude},${longitude}`;
      window.open(googleMapsUrl, '_blank', 'noopener,noreferrer');
    },
  });
  return null;
};

const ContactMapClient = ({ latitude, longitude, locationName }) => {
  const position = [latitude, longitude];

  return (
    <div className="w-full h-[550px] relative">
      <MapContainer center={position} zoom={15} style={{ height: '100%', width: '100%' }} scrollWheelZoom={true}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={position}>{locationName && <Popup>{locationName}</Popup>}</Marker>
        <MapClickHandler latitude={latitude} longitude={longitude} />
      </MapContainer>
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 z-[1000] bg-[var(--color-card-surface)]/90 backdrop-blur-sm px-4 py-2 rounded-lg shadow-lg pointer-events-none border border-[var(--color-border)]">
        <p className="text-sm font-semibold text-[var(--color-text)] flex items-center gap-2">
          <Navigation size={16} className="text-[var(--color-text-muted)]" />
          Click map to get directions
        </p>
      </div>
    </div>
  );
};

export default ContactMapClient;
