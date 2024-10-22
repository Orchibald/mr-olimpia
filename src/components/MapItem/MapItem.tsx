import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import './MapItem.scss';
import L from 'leaflet';

import markerIconPng from 'leaflet/dist/images/marker-icon.png';
import markerIcon2xPng from 'leaflet/dist/images/marker-icon-2x.png';
import markerShadowPng from 'leaflet/dist/images/marker-shadow.png';

const defaultIcon = new L.Icon({
  iconUrl: markerIconPng,
  iconRetinaUrl: markerIcon2xPng,
  shadowUrl: markerShadowPng,
  iconSize: [25, 41], 
  iconAnchor: [12, 41], 
  popupAnchor: [1, -34], 
  shadowSize: [41, 41] 
});

interface Location {
  id: number;
  name: string;
  address: string;
  lat: number;
  lng: number;
}

interface MapItemProps {
  locations: Location[];
}

const MapItem: React.FC<MapItemProps> = ({ locations }) => {
  const handleRoute = (lat: number, lng: number) => {
    navigator.geolocation.getCurrentPosition((position) => {
      const { latitude, longitude } = position.coords;
      const url = `https://www.google.com/maps/dir/${latitude},${longitude}/${lat},${lng}`;
      window.open(url, '_blank');
    });
  };

  return (
    <div className="map-item">
      <h2>Наші локації у Львові</h2>
      <MapContainer center={[49.8419, 24.0315]} zoom={12} className="map-item__map">
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        {locations.map((location) => (
          <Marker 
            key={location.id} 
            position={[location.lat, location.lng]} 
            icon={defaultIcon}
          >
            <Popup>
              <h3>{location.name}</h3>
              <p>{location.address}</p>
              <button onClick={() => handleRoute(location.lat, location.lng)}>
                Прокласти маршрут
              </button>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};

export default MapItem;
