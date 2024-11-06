"use client"

import React, { useState } from 'react';
import dynamic from 'next/dynamic';
import { useCity } from '@/contexts/CityContext';
import { GroundBasedControls } from '@/components/maps/GroundBasedControls';
import { TemperatureComparisonChart } from '@/components/maps/TemperatureComparisonChart';
import { Card } from "@/components/ui/card";

const GroundBasedMap = dynamic(
  () => import('@/components/maps/GroundBasedMap'),
  { ssr: false, loading: () => <p>Loading map...</p> }
);

interface SensorPoint {
  position: [number, number];
  temperature: number;
  popup: string;
}

interface PolygonData {
  coordinates: [number, number][];
  temperature: number;
}

interface CityData {
  center: [number, number];
  groundSensors: SensorPoint[];
  polygons: PolygonData[];
}

const generatePoints = (center: [number, number], count: number): SensorPoint[] => {
  const points: SensorPoint[] = [];
  const [lat, lng] = center;
  const radius = 0.02; // Roughly 2km radius

  for (let i = 0; i < count; i++) {
    const angle = (i / count) * Math.PI * 2;
    const r = Math.sqrt(Math.random()) * radius;
    const newLat = lat + r * Math.cos(angle);
    const newLng = lng + r * Math.sin(angle);
    const temp = Math.round(20 + Math.random() * 25); // Temperature between 20-45°C

    points.push({
      position: [newLat, newLng],
      temperature: temp,
      popup: `Sensor #${i + 1} - ${temp}°C`
    });
  }
  return points;
};

const generatePolygons = (center: [number, number], count: number): PolygonData[] => {
  const polygons: PolygonData[] = [];
  const [lat, lng] = center;
  const radius = 0.015; // Slightly smaller radius for polygons

  for (let i = 0; i < count; i++) {
    const centerAngle = (i / count) * Math.PI * 2;
    const centerR = Math.sqrt(Math.random()) * radius;
    const centerLat = lat + centerR * Math.cos(centerAngle);
    const centerLng = lng + centerR * Math.sin(centerAngle);
    const temp = Math.round(20 + Math.random() * 25);

    // Create irregular polygon around this center point
    const vertices: [number, number][] = [];
    const vertexCount = 3 + Math.floor(Math.random() * 3); // 3-5 vertices
    for (let j = 0; j < vertexCount; j++) {
      const vertexAngle = (j / vertexCount) * Math.PI * 2;
      const vertexR = (0.002 + Math.random() * 0.003); // Small random radius
      const vertexLat = centerLat + vertexR * Math.cos(vertexAngle);
      const vertexLng = centerLng + vertexR * Math.sin(vertexAngle);
      vertices.push([vertexLat, vertexLng]);
    }
    // Close the polygon
    vertices.push(vertices[0]);

    polygons.push({
      coordinates: vertices,
      temperature: temp
    });
  }
  return polygons;
};

const cityData: Record<string, CityData> = {
  sargoda: {
    center: [32.0836, 72.6711],
    groundSensors: generatePoints([32.0836, 72.6711], 24),
    polygons: generatePolygons([32.0836, 72.6711], 12)
  },
  nairobi: {
    center: [-1.2921, 36.8219],
    groundSensors: generatePoints([-1.2921, 36.8219], 30),
    polygons: generatePolygons([-1.2921, 36.8219], 15)
  },
  abijan: {
    center: [5.3600, -4.0083],
    groundSensors: generatePoints([5.3600, -4.0083], 36),
    polygons: generatePolygons([5.3600, -4.0083], 18)
  },
  "novi-sad": {
    center: [45.2671, 19.8335],
    groundSensors: generatePoints([45.2671, 19.8335], 20),
    polygons: generatePolygons([45.2671, 19.8335], 10)
  }
};

export default function GroundBasedAnalyticsPage() {
  const { selectedCity } = useCity();
  const city = selectedCity || 'sargoda';
  const data = cityData[city];

  const [showSatelliteData, setShowSatelliteData] = useState(true);
  const [showGroundData, setShowGroundData] = useState(true);
  const [temperatureThreshold, setTemperatureThreshold] = useState(30);

  const filteredSensors = data.groundSensors.filter(
    sensor => showGroundData && sensor.temperature >= temperatureThreshold
  );

  const filteredPolygons = data.polygons.filter(
    polygon => showSatelliteData && polygon.temperature >= temperatureThreshold
  );

  return (
    <div className="h-full relative">
      {/* Map container */}
      <div className="absolute inset-0">
        <GroundBasedMap 
          center={data.center}
          zoom={13} 
          markers={filteredSensors}
          polygons={filteredPolygons}
        />
      </div>
      
      {/* UI Overlay Layer */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="relative w-full h-full">
          {/* Controls */}
          <div className="pointer-events-auto absolute top-4 left-4 z-[1000]">
            <GroundBasedControls
              showSatelliteData={showSatelliteData}
              showGroundData={showGroundData}
              temperatureThreshold={temperatureThreshold}
              onSatelliteToggle={setShowSatelliteData}
              onGroundToggle={setShowGroundData}
              onThresholdChange={setTemperatureThreshold}
            />
          </div>

          {/* Title Card */}
          <Card className="pointer-events-auto absolute top-4 left-1/2 transform -translate-x-1/2 z-[1000] bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm p-4">
            <h2 className="text-lg font-semibold text-center">
              Temperature Analysis: {city.charAt(0).toUpperCase() + city.slice(1)}
            </h2>
          </Card>

          {/* Temperature Comparison Chart */}
          <div className="pointer-events-auto absolute bottom-4 left-4 z-[1000]">
            <TemperatureComparisonChart
              groundData={data.groundSensors.map(sensor => ({ temperature: sensor.temperature }))}
              satelliteData={data.polygons.map(polygon => ({ temperature: polygon.temperature }))}
            />
          </div>
        </div>
      </div>
    </div>
  );
}