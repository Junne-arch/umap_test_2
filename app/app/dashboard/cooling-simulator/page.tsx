"use client"

import React, { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { useCity } from '@/contexts/CityContext';
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertTriangle } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import type { GeoJSON } from 'geojson';

const CoolingSimulatorMap = dynamic(
  () => import('@/components/maps/CoolingSimulatorMap'),
  { ssr: false, loading: () => <p>Loading map...</p> }
);

interface MapOverlayProps {
  children: React.ReactNode;
  className: string;
}

const MapOverlay: React.FC<MapOverlayProps> = ({ children, className }) => (
  <div className={`absolute z-[1001] bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm p-2 shadow-lg ${className}`}>
    {children}
  </div>
);

const cityCoordinates: Record<string, [number, number]> = {
  sargoda: [32.0836, 72.6711],
  nairobi: [-1.2921, 36.8219],
  abijan: [5.3600, -4.0083],
  "novi-sad": [45.2671, 19.8335],
};

export default function CoolingSimulatorPage() {
  const { selectedCity } = useCity();
  const city = selectedCity || 'sargoda';
  const [greenSpacePercentage, setGreenSpacePercentage] = useState<number>(20);
  const [reflectiveRoofPercentage, setReflectiveRoofPercentage] = useState<number>(10);
  const [geoJsonData, setGeoJsonData] = useState<GeoJSON.FeatureCollection | null>(null);
  const [visualizationType, setVisualizationType] = useState<'suhii' | 'class'>('suhii');

  useEffect(() => {
    if (city === 'sargoda') {
      fetch('/Sargoda_complete.geojson')
        .then(response => response.json())
        .then(data => setGeoJsonData(data))
        .catch(error => console.error('Error loading GeoJSON:', error));
    } else {
      setGeoJsonData(null);
    }
  }, [city]);

  const handleSimulate = () => {
    console.log("Simulating with:", { greenSpacePercentage, reflectiveRoofPercentage });
  };

  const handleShapeCreated = (layer: L.Layer) => {
    console.log("New shape created:", layer);
  };

  const SimulationControls = () => (
    <div className="space-y-1 text-sm">
      <h3 className="font-semibold mb-2">Simulation Parameters</h3>
      <Alert className="mb-2 py-2 text-xs">
        <AlertTriangle className="h-3 w-3" />
        <AlertDescription>
          Controls not yet functional
        </AlertDescription>
      </Alert>
      <div>
        <label className="block font-medium mb-1 text-xs">
          Green Space: {greenSpacePercentage}%
        </label>
        <Slider
          min={0}
          max={100}
          step={1}
          value={[greenSpacePercentage]}
          onValueChange={(value) => setGreenSpacePercentage(value[0])}
          className="rounded-none"
        />
      </div>
      <div>
        <label className="block font-medium mb-1 text-xs">
          Reflective Roofs: {reflectiveRoofPercentage}%
        </label>
        <Slider
          min={0}
          max={100}
          step={1}
          value={[reflectiveRoofPercentage]}
          onValueChange={(value) => setReflectiveRoofPercentage(value[0])}
          className="rounded-none"
        />
      </div>
      <Button size="sm" onClick={handleSimulate} className="w-full rounded-none mt-2">
        Run Simulation
      </Button>
    </div>
  );

  return (
    <div className="h-full">
      <div className="relative h-full">
        <CoolingSimulatorMap 
          center={cityCoordinates[city]} 
          zoom={13}
          onShapeCreated={handleShapeCreated}
          geoJsonData={geoJsonData}
          visualizationType={visualizationType}
        />
        <MapOverlay className="top-2 left-2 w-64">
          <SimulationControls />
        </MapOverlay>
        <MapOverlay className="top-2 left-1/2 transform -translate-x-1/2">
          <h2 className="text-xl font-bold">blabla - go to Sargoda</h2>
        </MapOverlay>
        {geoJsonData && (
          <MapOverlay className="bottom-2 left-2">
            <div className="space-y-1">
              <label className="text-sm font-medium">Visualization Type</label>
              <Select value={visualizationType} onValueChange={(value: 'suhii' | 'class') => setVisualizationType(value)}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Select visualization" />
                </SelectTrigger>
                <SelectContent className="z-[2000]">
                  <SelectItem value="suhii">Surface UHI Intensity</SelectItem>
                  <SelectItem value="class">Land Use Classes</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </MapOverlay>
        )}
      </div>
    </div>
  );
}