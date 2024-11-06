'use client';

import React, { useState, useEffect, useCallback } from 'react';
import DeckGL from '@deck.gl/react';
import { GeoJsonLayer } from '@deck.gl/layers';
import { Map } from 'react-map-gl/maplibre';
import { TimeControl } from '@/components/maps/TimeControl';
import { FlyToInterpolator } from '@deck.gl/core';
import { useCity } from '@/contexts/CityContext';
import { Card } from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

// Monthly base temperatures for Sargoda
const sargodaMonthlyTemp = [
  12, 15, 21, 27, 32, 35, 34, 33, 31, 26, 20, 14
];

const getElevationHeight = (temperature: number, suhii?: number): number => {
  // For Sargoda with SUHII data
  if (suhii !== undefined) {
    // Scale SUHII (typically 0-5) to a multiplier (1.0-2.0)
    const suhiiMultiplier = 1 + (suhii * 0.2);
    // Base height from temperature
    const baseHeight = temperature * 50;
    // Apply SUHII multiplier to create enhanced height effect
    return baseHeight * suhiiMultiplier;
  }
  
  // For other cities without SUHII data
  return temperature * 50;
};

interface GeoJsonFeature {
  type: 'Feature';
  properties: {
    name?: string;
    description?: string;
    landmarks?: string[];
    temperatures?: number[];
    SUHII_05_1?: number;
  };
  geometry: {
    type: string;
    coordinates: number[][][];
  };
}

interface GeoJsonData {
  type: 'FeatureCollection';
  features: GeoJsonFeature[];
}

interface ViewState {
  longitude: number;
  latitude: number;
  zoom: number;
  pitch: number;
  bearing: number;
  transitionDuration?: number;
  transitionInterpolator?: any;
}

const BASEMAPS = {
  dark: 'https://basemaps.cartocdn.com/gl/dark-matter-gl-style/style.json',
  light: 'https://basemaps.cartocdn.com/gl/positron-gl-style/style.json',
  satellite:
    'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
};

const cityViewStates: Record<string, ViewState> = {
  sargoda: {
    longitude: 72.6711,
    latitude: 32.0836,
    zoom: 13,
    pitch: 45,
    bearing: 0,
  },
  nairobi: {
    longitude: 36.8219,
    latitude: -1.2921,
    zoom: 13,
    pitch: 45,
    bearing: 0,
  },
  abijan: {
    longitude: -4.0083,
    latitude: 5.36,
    zoom: 13,
    pitch: 45,
    bearing: 0,
  },
  'novi-sad': {
    longitude: 19.8335,
    latitude: 45.2671,
    zoom: 13,
    pitch: 45,
    bearing: 0,
  },
};

const generateTemperatures = (baseTemp: number, variance: number): number[] => {
  return Array.from({ length: 12 }, (_, i) => {
    const seasonalOffset = Math.sin((i / 11) * Math.PI) * variance;
    return baseTemp + seasonalOffset + (Math.random() - 0.5) * 2;
  });
};

const processGeoJson = (data: GeoJsonData, isSargodaComplete: boolean): GeoJsonData => {
  return {
    ...data,
    features: data.features.map((feature) => {
      if (isSargodaComplete) {
        // For Sargoda_complete.geojson, use SUHII to modify monthly temperatures
        const suhii = feature.properties.SUHII_05_1 || 0;
        return {
          ...feature,
          properties: {
            ...feature.properties,
            temperatures: sargodaMonthlyTemp.map(temp => temp + (suhii * 2))
          }
        };
      } else {
        // For other cities, use the original temperature generation
        return {
          ...feature,
          properties: {
            ...feature.properties,
            temperatures: generateTemperatures(
              feature.properties.name?.toLowerCase().includes('industrial')
                ? 32
                : 30,
              feature.properties.name?.toLowerCase().includes('center') ? 8 : 6
            ),
          },
        };
      }
    }),
  };
};

interface HoveredInfo {
  object?: {
    properties: {
      name?: string;
      description?: string;
      temperatures?: number[];
      SUHII_05_1?: number;
    };
  };
}

const getTemperatureColor = (
  temperature: number,
  suhii?: number
): [number, number, number, number] => {
  // If SUHII is available, use it to influence the color more strongly
  let t: number;
  if (suhii !== undefined) {
    // Normalize SUHII (typically between 0-5) to have stronger influence
    const suhiiNormalized = Math.max(0, Math.min(1, suhii / 5));
    // Blend SUHII with temperature for color calculation
    t = Math.max(0, Math.min(1, (0.3 * (temperature - 15) / 30) + (0.7 * suhiiNormalized)));
  } else {
    // Regular temperature normalization for non-Sargoda cities
    t = Math.max(0, Math.min(1, (temperature - 15) / 30));
  }
  
  // Full spectrum color calculation
  if (t < 0.2) {
    // Blue to Cyan (cold)
    return [0, Math.round(255 * (t * 5)), 255, 180];
  } else if (t < 0.4) {
    // Cyan to Green
    return [0, 255, Math.round(255 * (2 - t * 5)), 180];
  } else if (t < 0.6) {
    // Green to Yellow
    return [Math.round(255 * ((t - 0.4) * 5)), 255, 0, 180];
  } else if (t < 0.8) {
    // Yellow to Red
    return [255, Math.round(255 * (2 - (t - 0.4) * 5)), 0, 180];
  } else {
    // Red to Purple (very hot)
    return [255, 0, Math.round(255 * ((t - 0.8) * 5)), 180];
  }
};

export default function SpatialAnalyticsPage() {
  const { selectedCity } = useCity();
  const city = selectedCity || 'sargoda';
  const [isPlaying, setIsPlaying] = useState(false);
  const [timeStep, setTimeStep] = useState(0);
  const [viewState, setViewState] = useState<ViewState>(cityViewStates[city]);
  const [geoJsonData, setGeoJsonData] = useState<GeoJsonData | null>(null);
  const [hoveredInfo, setHoveredInfo] = useState<HoveredInfo | null>(null);
  const [baseMap, setBaseMap] = useState<'dark' | 'light' | 'satellite'>(
    'satellite'
  );

  useEffect(() => {
    if (city === 'sargoda') {
      // Load Sargoda_complete.geojson for Sargoda
      fetch('/Sargoda_complete.geojson')
        .then((response) => response.json())
        .then((data) => setGeoJsonData(processGeoJson(data, true)))
        .catch((error) => {
          console.error('Error loading Sargoda complete data:', error);
          setGeoJsonData(null);
        });
    } else {
      // Load regular geojson for other cities
      const cityFileName = city === 'abijan' ? 'abidjan' : city;
      fetch(`/updated_geojson/${cityFileName}-geojson.json`)
        .then((response) => response.json())
        .then((data) => setGeoJsonData(processGeoJson(data, false)))
        .catch((error) => {
          console.error(`Error loading data for ${city}:`, error);
          setGeoJsonData(null);
        });
    }
  }, [city]);

  useEffect(() => {
    setViewState({
      ...cityViewStates[city],
      transitionDuration: 1000,
      transitionInterpolator: new FlyToInterpolator(),
    });
  }, [city]);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isPlaying) {
      interval = setInterval(() => {
        setTimeStep((prev) => (prev + 1) % 12);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isPlaying]);

  const layers = [
    new GeoJsonLayer({
      id: 'districts',
      data: geoJsonData,
      pickable: true,
      stroked: true,
      filled: true,
      extruded: true,
      wireframe: true,
      getElevation: (d: GeoJsonFeature) => 
        getElevationHeight(
          d.properties.temperatures![timeStep],
          d.properties.SUHII_05_1
        ),
      getFillColor: (d: GeoJsonFeature) =>
        getTemperatureColor(
          d.properties.temperatures![timeStep],
          d.properties.SUHII_05_1
        ),
      getLineColor: [255, 255, 255, 80],
      lineWidthMinPixels: 1,
      transitions: {
        getFillColor: {
          duration: 300,
          easing: (t: number) => t,
        },
        getElevation: {
          duration: 300,
          easing: (t: number) => t,
        },
      },
      onHover: (info: any) => setHoveredInfo(info),
      updateTriggers: {
        getFillColor: timeStep,
        getElevation: timeStep,
      },
    }),
  ];

  const handleTimeStepChange = useCallback((value: number) => {
    setTimeStep(value);
  }, []);

  const togglePlay = useCallback(() => {
    setIsPlaying((prev) => !prev);
  }, []);

  return (
    <div className="dashboard-map-container">
      <DeckGL
        initialViewState={cityViewStates[city]}
        controller={true}
        layers={layers}
        viewState={viewState}
        onViewStateChange={({ viewState }: { viewState: ViewState }) =>
          setViewState(viewState)
        }
      >
        {baseMap === 'satellite' ? (
          <Map
            mapStyle={{
              version: 8,
              sources: {
                'esri-satellite': {
                  type: 'raster',
                  tiles: [BASEMAPS.satellite],
                  tileSize: 256,
                },
              },
              layers: [
                {
                  id: 'esri-satellite-layer',
                  type: 'raster',
                  source: 'esri-satellite',
                  minzoom: 0,
                  maxzoom: 22,
                },
              ],
            }}
          />
        ) : (
          <Map mapStyle={BASEMAPS[baseMap]} />
        )}
      </DeckGL>

      <Card className="absolute top-4 left-4 z-10 p-2">
        <Select
          value={baseMap}
          onValueChange={(value: 'dark' | 'light' | 'satellite') =>
            setBaseMap(value)
          }
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Choose basemap" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="satellite">Satellite</SelectItem>
            <SelectItem value="dark">Dark</SelectItem>
            <SelectItem value="light">Light</SelectItem>
          </SelectContent>
        </Select>
      </Card>

      {hoveredInfo?.object && (
        <div className="absolute top-20 left-4 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm p-4 rounded-lg shadow-lg">
          <h3 className="font-bold">{hoveredInfo.object.properties.name || 'Area'}</h3>
          <p>
            Temperature:{' '}
            {hoveredInfo.object.properties.temperatures![timeStep].toFixed(1)}°C
          </p>
          {hoveredInfo.object.properties.SUHII_05_1 !== undefined && (
            <p>SUHII: {hoveredInfo.object.properties.SUHII_05_1.toFixed(2)}</p>
          )}
          {hoveredInfo.object.properties.description && (
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {hoveredInfo.object.properties.description}
            </p>
          )}
        </div>
      )}

      <TimeControl
        timeStep={timeStep}
        isPlaying={isPlaying}
        onTimeStepChange={handleTimeStepChange}
        onPlayToggle={togglePlay}
      />
    </div>
  );
}