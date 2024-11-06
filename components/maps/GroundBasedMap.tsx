"use client"

import React, { useEffect } from 'react';
import L from 'leaflet';
import { MapContainer, TileLayer, Marker, Popup, ZoomControl, ScaleControl, LayersControl, useMap, Polygon } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

// Add these type declarations
interface ExtendedIconDefault extends L.Icon.Default {
  _getIconUrl?: string;
}

interface DrawControlEvent {
  layer: L.Layer & {
    getLatLng?: () => L.LatLng;
    getCenter?: () => L.LatLng;
  };
  layerType: string;
  target: L.Layer;
}

// Fix the icon URL type error
delete ((L.Icon.Default as any).prototype as ExtendedIconDefault)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

interface ChangeViewProps {
  center: [number, number];
  zoom: number;
}

interface Marker {
  position: [number, number];
  temperature: number;
  popup: string;
}

interface PolygonData {
  coordinates: [number, number][];
  temperature: number;
}

interface GroundBasedMapProps {
  center: [number, number];
  zoom: number;
  markers: Marker[];
  polygons: PolygonData[];
}

const ChangeView: React.FC<ChangeViewProps> = ({ center, zoom }) => {
  const map = useMap();
  
  useEffect(() => {
    if (map) {
      map.setView(center, zoom);
    }
  }, [center, zoom, map]);
  
  return null;
};

const GroundBasedMap: React.FC<GroundBasedMapProps> = ({ 
  center, 
  zoom,
  markers,
  polygons
}) => {
  const getTemperatureColor = (temperature: number): string => {
    const normalized = (temperature - 20) / 25; // Normalize between 20-45°C
    const red = Math.round(255 * normalized);
    const green = Math.round(255 * (1 - normalized));
    return `rgb(${red}, ${green}, 0)`;
  };

  return (
    <MapContainer 
      center={center} 
      zoom={zoom} 
      style={{ height: '100%', width: '100%' }} 
      zoomControl={false}
    >
      <ChangeView center={center} zoom={zoom} />
      
      <LayersControl position="topright">
        <LayersControl.BaseLayer checked name="Satellite">
          <TileLayer
            url="https://{s}.google.com/vt/lyrs=s,h&x={x}&y={y}&z={z}"
            maxZoom={20}
            subdomains={['mt0', 'mt1', 'mt2', 'mt3']}
            attribution="&copy; Google"
          />
        </LayersControl.BaseLayer>
        <LayersControl.BaseLayer name="OpenStreetMap">
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
        </LayersControl.BaseLayer>
      </LayersControl>

      {markers.map((marker, index) => (
        <Marker key={index} position={marker.position}>
          <Popup>{marker.popup}</Popup>
        </Marker>
      ))}

      {polygons.map((polygon, index) => (
        <Polygon
          key={index}
          positions={polygon.coordinates}
          pathOptions={{
            fillColor: getTemperatureColor(polygon.temperature),
            fillOpacity: 0.7,
            weight: 1,
            opacity: 0.8,
            color: 'white'
          }}
        >
          <Popup>Temperature: {polygon.temperature}°C</Popup>
        </Polygon>
      ))}

      <ZoomControl position="topright" />
      <ScaleControl position="bottomright" />
    </MapContainer>
  );
};

export default GroundBasedMap;