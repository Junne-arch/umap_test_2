'use client';

import React, { useEffect, useState } from 'react';
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  ZoomControl,
  ScaleControl,
  FeatureGroup,
  LayersControl,
} from 'react-leaflet';
import { EditControl } from 'react-leaflet-draw';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet-draw/dist/leaflet.draw.css';

// Fix for default marker icons
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl:
    'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl:
    'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

interface MapComponentProps {
  center: [number, number];
  zoom: number;
  markers?: Array<{ position: [number, number]; popup: string }>;
  drawTools?: boolean;
  defaultBasemap?: 'OSM' | 'ESRI' | 'GoogleSatelliteHybrid';
}

interface DrawControlEvent {
  layer: L.Layer & {
    getLatLng?: () => L.LatLng;
    getCenter?: () => L.LatLng;
  };
  layerType: string;
  target: L.Layer;
}

const MapComponent: React.FC<MapComponentProps> = ({ center, zoom, markers = [], drawTools = false, defaultBasemap = 'OSM' }) => {
  const [map, setMap] = useState<L.Map | null>(null);

  const handleCreated = (e: DrawControlEvent) => {
    const { layer, layerType } = e;
    
    // Check if it's a marker (has getLatLng) or a shape (has getCenter)
    const center = layer.getLatLng ? layer.getLatLng() : 
                  layer.getCenter ? layer.getCenter() : 
                  null;
                  
    console.log("New layer created:", layer);
    if (center) {
      console.log("Center position:", center);
    }
  };

  useEffect(() => {
    if (!map) return;

    map.setView(center, zoom);
  }, [map, center, zoom]);

  return (
    <MapContainer
      center={center}
      zoom={zoom}
      style={{ height: '100%', width: '100%' }}
      ref={setMap}
      zoomControl={false}
    >
      <LayersControl position="topright">
        <LayersControl.BaseLayer
          checked={defaultBasemap === 'OSM'}
          name="OpenStreetMap"
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
        </LayersControl.BaseLayer>
        <LayersControl.BaseLayer
          checked={defaultBasemap === 'ESRI'}
          name="ESRI World Imagery"
        >
          <TileLayer
            url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
            attribution="Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community"
          />
        </LayersControl.BaseLayer>
        <LayersControl.BaseLayer
          checked={defaultBasemap === 'GoogleSatelliteHybrid'}
          name="Google Satellite Hybrid"
        >
          <TileLayer
            url="https://{s}.google.com/vt/lyrs=s,h&x={x}&y={y}&z={z}"
            maxZoom={20}
            subdomains={['mt0', 'mt1', 'mt2', 'mt3']}
            attribution="&copy; Google"
          />
        </LayersControl.BaseLayer>
      </LayersControl>
      {markers.map((marker, index) => (
        <Marker key={index} position={marker.position}>
          <Popup>{marker.popup}</Popup>
        </Marker>
      ))}
      <ZoomControl position="topright" />
      <ScaleControl position="bottomright" />
      {drawTools && (
        <FeatureGroup>
          <EditControl
            position="topright"
            onCreated={handleCreated}
            draw={{
              rectangle: true,
              polygon: true,
              circle: false,
              circlemarker: false,
              marker: true,
              polyline: true,
            }}
          />
        </FeatureGroup>
      )}
    </MapContainer>
  );
};

export default MapComponent;
