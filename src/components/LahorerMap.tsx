// Interactive Leaflet map centered on Lahore, Pakistan
// Shows workshop location with custom markers

import { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { Icon } from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Fix for default markers in react-leaflet
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

// Delete default icon
delete (Icon.Default.prototype as any)._getIconUrl;

// Set default icon options
Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

// Custom marker icon
const customIcon = new Icon({
  iconUrl: markerIcon,
  iconRetinaUrl: markerIcon2x,
  shadowUrl: markerShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

const LahorerMap = () => {
  const [isMounted, setIsMounted] = useState(false);

  // Lahore coordinates (Liberty Market area - central location)
  const lahorePosition: [number, number] = [31.5497, 74.3436];

  // Workshop location (example location in Lahore)
  const workshopPosition: [number, number] = [31.5204, 74.3587];

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return (
      <div className="w-full h-full bg-gradient-subtle rounded-lg flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-2"></div>
          <p className="text-muted-foreground text-sm">Loading map...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full h-full relative">
      <MapContainer
        center={lahorePosition}
        zoom={12}
        className="w-full h-full rounded-lg"
        scrollWheelZoom={false}
        style={{ height: '400px', width: '100%' }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        
        {/* Workshop Marker */}
        <Marker position={workshopPosition} icon={customIcon}>
          <Popup>
            <div className="p-2">
              <h4 className="font-semibold text-sm mb-1">Elite Blade Co. Workshop</h4>
              <p className="text-xs text-muted-foreground mb-2">
                42 Liberty Market Road<br />
                Gulberg III, Lahore<br />
                Punjab, Pakistan
              </p>
              <div className="text-xs">
                <p><strong>Hours:</strong> Mon-Fri 9am-6pm</p>
                <p><strong>Phone:</strong> +92 42 123 4567</p>
              </div>
            </div>
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  );
};

export default LahorerMap;