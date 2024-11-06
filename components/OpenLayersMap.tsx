"use client"

import React, { useEffect, useRef } from 'react';
import Map from 'ol/Map';
import View from 'ol/View';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import { fromLonLat } from 'ol/proj';
import { Circle as CircleStyle, Fill, Stroke, Style } from 'ol/style';
import { Feature } from 'ol';
import { Point } from 'ol/geom';
import { defaults as defaultControls } from 'ol/control';
import 'ol/ol.css';

interface OpenLayersMapProps {
  center: [number, number];
  zoom: number;
  vulnerabilityPoints?: Array<{
    coordinates: [number, number];
    vulnerability: number;
  }>;
}

const OpenLayersMap: React.FC<OpenLayersMapProps> = ({
  center,
  zoom,
  vulnerabilityPoints = []
}) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<Map | null>(null);

  useEffect(() => {
    if (!mapRef.current || mapInstanceRef.current) return;

    // Convert center coordinates to OpenLayers format
    const transformedCenter = fromLonLat(center);

    // Create base layer
    const baseLayer = new TileLayer({
      source: new OSM()
    });

    // Create vector source for vulnerability points
    const vectorSource = new VectorSource();

    // Add vulnerability points
    vulnerabilityPoints.forEach(point => {
      const transformedCoords = fromLonLat(point.coordinates);
      const feature = new Feature({
        geometry: new Point(transformedCoords)
      });

      const color = `rgba(${255 * point.vulnerability}, ${
        255 * (1 - point.vulnerability)
      }, 0, 0.8)`;

      feature.setStyle(
        new Style({
          image: new CircleStyle({
            radius: 12,
            fill: new Fill({ color }),
            stroke: new Stroke({
              color: '#fff',
              width: 2
            })
          })
        })
      );

      vectorSource.addFeature(feature);
    });

    // Create vector layer
    const vectorLayer = new VectorLayer({
      source: vectorSource,
      zIndex: 1
    });

    // Initialize map
    const map = new Map({
      target: mapRef.current,
      layers: [baseLayer, vectorLayer],
      view: new View({
        center: transformedCenter,
        zoom: zoom,
        minZoom: 2,
        maxZoom: 19
      }),
      controls: defaultControls({
        zoom: true,
        rotate: false,
        attribution: true
      })
    });

    mapInstanceRef.current = map;

    // Ensure proper sizing
    const updateMapSize = () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.updateSize();
      }
    };

    // Update size after a short delay to ensure container is fully rendered
    setTimeout(updateMapSize, 100);

    // Add resize listener
    window.addEventListener('resize', updateMapSize);

    return () => {
      window.removeEventListener('resize', updateMapSize);
      if (mapInstanceRef.current) {
        mapInstanceRef.current.setTarget(undefined);
        mapInstanceRef.current = null;
      }
    };
  }, [center, zoom, vulnerabilityPoints]);

  // Force the container to have dimensions
  return (
    <div className="w-full h-[500px] relative">
      <div 
        ref={mapRef} 
        className="absolute inset-0 rounded-lg shadow-lg"
        style={{ background: '#f8f9fa' }}
      />
    </div>
  );
};

export default OpenLayersMap;