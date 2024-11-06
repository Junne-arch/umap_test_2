"use client"

import React, { useState, useMemo, useEffect } from 'react';
import DeckGL from '@deck.gl/react';
import { _GlobeView as GlobeView, COORDINATE_SYSTEM } from '@deck.gl/core';
import { TileLayer } from '@deck.gl/geo-layers';
import { BitmapLayer, ScatterplotLayer, GeoJsonLayer } from '@deck.gl/layers';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card } from "@/components/ui/card";

const INITIAL_VIEW_STATE = {
  longitude: 0,
  latitude: 20,
  zoom: 1.5,
  minZoom: 0,
  maxZoom: 20,
  pitch: 45,
  bearing: 0
};

const BASEMAPS = {
  osm: 'https://c.tile.openstreetmap.org/{z}/{x}/{y}.png',
  light: 'https://basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png',
  dark: 'https://basemaps.cartocdn.com/dark_all/{z}/{x}/{y}.png'
};

// Generate random stars
const generateStars = () => {
  const stars = [];
  for (let i = 0; i < 1000; i++) {
    const lng = Math.random() * 360 - 180;
    const lat = Math.random() * 180 - 90;
    const size = Math.random() * 2;
    stars.push({ position: [lng, lat], size });
  }
  return stars;
};

// Generate random color
const getRandomColor = () => {
  return [
    Math.floor(Math.random() * 255),
    Math.floor(Math.random() * 255),
    Math.floor(Math.random() * 255),
    180
  ];
};

export default function InteractiveGlobalMap() {
  const [baseMap, setBaseMap] = useState<'osm' | 'light' | 'dark'>('osm');
  const [viewState, setViewState] = useState(INITIAL_VIEW_STATE);
  const [globalData, setGlobalData] = useState(null);

  // Generate stars once
  const stars = useMemo(() => generateStars(), []);

  useEffect(() => {
    fetch('/global_data.geojson')
      .then(response => response.json())
      .then(data => setGlobalData(data));
  }, []);

  const layers = [
    // Stars layer
    new ScatterplotLayer({
      id: 'stars',
      data: stars,
      getPosition: d => d.position,
      getRadius: d => d.size,
      getFillColor: [255, 255, 255, 150],
      radiusMinPixels: 1,
      radiusMaxPixels: 3,
      pickable: false,
      opacity: 0.8,
      stroked: false,
      coordinateSystem: COORDINATE_SYSTEM.LNGLAT,
      parameters: {
        depthTest: false
      }
    }),

    // Earth layer
    new TileLayer({
      id: 'tile-layer',
      data: BASEMAPS[baseMap],
      minZoom: 0,
      maxZoom: 19,
      tileSize: 256,
      refinementStrategy: 'no-overlap',
      renderSubLayers: props => {
        const {
          bbox: { west, south, east, north }
        } = props.tile;

        return new BitmapLayer(props, {
          data: null,
          image: props.data,
          bounds: [west, south, east, north]
        });
      }
    }),

    // Global data layer
    globalData && new GeoJsonLayer({
      id: 'global-data',
      data: globalData,
      filled: true,
      extruded: true,
      wireframe: true,
      getElevation: () => Math.random() * 100000 + 50000,
      getFillColor: () => getRandomColor(),
      getLineColor: [255, 255, 255, 80],
      pickable: true,
      lineWidthMinPixels: 1,
      opacity: 0.8
    }),

    // Atmosphere effect
    new ScatterplotLayer({
      id: 'atmosphere',
      data: [{ position: [0, 0] }],
      getPosition: d => d.position,
      getRadius: 6371000 * 1.1, // Slightly larger than Earth's radius
      getFillColor: [64, 127, 255, 50],
      radiusMinPixels: 0,
      radiusMaxPixels: 0,
      stroked: false,
      opacity: 0.3,
      parameters: {
        depthTest: true,
        blend: true,
        blendFunc: ['SRC_ALPHA', 'ONE_MINUS_SRC_ALPHA']
      }
    })
  ];

  return (
    <>
      <Card className="absolute top-4 left-4 z-10 p-2">
        <Select value={baseMap} onValueChange={(value: 'osm' | 'light' | 'dark') => setBaseMap(value)}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Choose basemap" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="osm">OpenStreetMap</SelectItem>
            <SelectItem value="light">Light</SelectItem>
            <SelectItem value="dark">Dark</SelectItem>
          </SelectContent>
        </Select>
      </Card>

      <DeckGL
        views={new GlobeView({
          resolution: 12
        })}
        viewState={viewState}
        controller={true}
        layers={layers}
        parameters={{
          clearColor: [0, 0, 0, 1]
        }}
        onViewStateChange={({ viewState }) => setViewState(viewState)}
      >
      </DeckGL>
    </>
  );
}