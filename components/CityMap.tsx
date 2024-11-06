"use client"

import React, { useEffect, useState } from 'react';
import L from 'leaflet';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

type CityCoordinates = {
  [key: string]: [number, number];
};

const cityCoordinates: CityCoordinates = {
  sargoda: [32.0836, 72.6711],
  nairobi: [-1.2921, 36.8219],
  abijan: [5.3600, -4.0083],
  "novi-sad": [45.2671, 19.8335],
};

interface ChangeViewProps {
  center: [number, number];
  zoom: number;
}

function ChangeView({ center, zoom }: ChangeViewProps) {
  const map = useMap();
  useEffect(() => {
    map.setView(center, zoom);
  }, [center, zoom, map]);
  return null;
}

interface CityMapProps {
  city: string;
}

export default function CityMap({ city }: CityMapProps) {
  const [position, setPosition] = useState<[number, number]>(cityCoordinates[city] || [0, 0]);

  useEffect(() => {
    if (cityCoordinates[city]) {
      setPosition(cityCoordinates[city]);
    }
  }, [city]);

  useEffect(() => {
    // Fix for default marker icons
    delete (L.Icon.Default.prototype as any)._getIconUrl;
    L.Icon.Default.mergeOptions({
      iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.3.1/images/marker-icon-2x.png',
      iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.3.1/images/marker-icon.png',
      shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.3.1/images/marker-shadow.png',
    });
  }, []);

  return (
    <MapContainer 
      center={position} 
      zoom={5} 
      style={{ height: '400px', width: '100%' }}
      scrollWheelZoom={false}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      <Marker position={position}>
        <Popup>
          {city.charAt(0).toUpperCase() + city.slice(1)}
        </Popup>
      </Marker>
      <ChangeView center={position} zoom={5} />
    </MapContainer>
  );
}