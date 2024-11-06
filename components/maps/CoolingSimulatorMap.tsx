"use client"

import React, { useEffect } from 'react';
import L from 'leaflet';
import { MapContainer, TileLayer, ZoomControl, ScaleControl, FeatureGroup, LayersControl, useMap, GeoJSON } from 'react-leaflet';
import { EditControl } from "react-leaflet-draw";
import 'leaflet/dist/leaflet.css';
import 'leaflet-draw/dist/leaflet.draw.css';
import type { FeatureCollection, Feature, Geometry } from 'geojson';

// Fix for default marker icons
delete (L.Icon.Default.prototype as any)._getIconUrl;

interface ChangeViewProps {
  center: [number, number];
  zoom: number;
}

interface GeoJSONFeature {
  properties: {
    SUHII_05_1?: number;
    Classname?: string;
  };
}

interface CoolingSimulatorMapProps {
  center: [number, number];
  zoom: number;
  onShapeCreated?: (layer: L.Layer) => void;
  geoJsonData?: FeatureCollection | null;
  visualizationType: 'suhii' | 'class';
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

const CoolingSimulatorMap: React.FC<CoolingSimulatorMapProps> = ({ 
  center, 
  zoom,
  onShapeCreated,
  geoJsonData,
  visualizationType
}) => {
  const handleCreated = (e: L.DrawEvents.Created) => {
    if (onShapeCreated) {
      onShapeCreated(e.layer);
    }
  };

  const geoJsonStyle = (feature: GeoJSONFeature): L.PathOptions => {
    return {
      fillColor: visualizationType === 'suhii' 
        ? getSUHIIColor(feature.properties.SUHII_05_1 || 0)
        : getClassColor(feature.properties.Classname || ''),
      weight: 0.5,
      opacity: 1,
      color: 'white',
      fillOpacity: 0.7
    };
  };

  const getPopupContent = (feature: GeoJSONFeature): string => {
    if (visualizationType === 'suhii') {
      return `SUHII: ${feature.properties.SUHII_05_1?.toFixed(2) || 'N/A'}`;
    }
    return `Class: ${feature.properties.Classname || 'N/A'}`;
  };

  const getSUHIIColor = (suhii: number): string => {
    const normalized = Math.min(Math.max((suhii - 1.2) / (3.0 - 1.2), 0), 1);
    const red = Math.round(255 * normalized);
    const green = Math.round(255 * (1 - normalized));
    return `rgb(${red}, ${green}, 0)`;
  };

  const getClassColor = (className: string): string => {
    const colorMap: { [key: string]: string } = {
      'Agricultural Areas': '#f4a460',
      'Airports': '#a9a9a9',
      'Artificial Surfaces': '#cd5c5c',
      'Cemeteries': '#556b2f',
      'Collector Line': '#808080',
      'Domestic gardens': '#90ee90',
      'Green urban area': '#228b22',
      'Industrial_Commercial_Public_Education units': '#bc8f8f',
      'Linear plantations along roads, rivers': '#32cd32',
      'Mines,dumps & construction sites': '#8b4513',
      'Natural and Seminatural Areas': '#6b8e23',
      'Railways': '#696969',
      'Sports & leisure facilities': '#98fb98',
      'Urban parks': '#2e8b57',
      'Water': '#4169e1'
    };
    
    return colorMap[className] || '#bdbdbd';
  };

  return (
    <MapContainer 
      center={center} 
      zoom={zoom} 
      style={{ height: '100%', width: '100%', zIndex: 1 }} 
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

      {geoJsonData && (
        <GeoJSON 
          key={visualizationType}
          data={geoJsonData} 
          style={geoJsonStyle}
          onEachFeature={(feature, layer: L.Layer) => {
            layer.bindPopup(getPopupContent(feature as GeoJSONFeature));
          }}
        />
      )}

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

      <ZoomControl position="topright" />
      <ScaleControl position="bottomright" />
    </MapContainer>
  );
};

export default CoolingSimulatorMap;