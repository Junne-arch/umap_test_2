"use client"

import React, { useState, useCallback } from 'react';
import Map, { Source, Layer, NavigationControl, LayerProps } from 'react-map-gl/maplibre';
import type { Feature, FeatureCollection } from 'geojson';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card } from "@/components/ui/card";
import TreeCounter from './TreeCounter';

const BASEMAPS = {
  light: 'https://basemaps.cartocdn.com/gl/positron-nolabels-gl-style/style.json',
  satellite: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}'
};

interface TreeFeature extends Feature {
  properties: {
    id: string;
    type: string;
    style: string;
    height: number;
  };
}

export default function InteractiveMap2() {
  const [trees, setTrees] = useState<FeatureCollection>({
    type: 'FeatureCollection',
    features: []
  });
  const [treeTemplates, setTreeTemplates] = useState<Feature[]>([]);
  const [baseMap, setBaseMap] = useState<'light' | 'satellite'>('light');
  const [treeCounts, setTreeCounts] = useState({
    round: 0,
    pine: 0,
    flowering: 0,
    branching: 0,
    star: 0
  });

  React.useEffect(() => {
    Promise.all([
      fetch('/tree1.geojson').then(res => res.json()),
      fetch('/tree2.geojson').then(res => res.json()),
      fetch('/tree3.geojson').then(res => res.json()),
      fetch('/tree4.geojson').then(res => res.json()),
      fetch('/tree5.geojson').then(res => res.json())
    ]).then(loadedTrees => {
      setTreeTemplates(loadedTrees);
    }).catch(error => {
      console.error('Error loading tree templates:', error);
    });
  }, []);

  const handleClick = useCallback((event: any) => {
    if (treeTemplates.length === 0) return;

    const coordinates = event.lngLat;
    const randomTree = treeTemplates[Math.floor(Math.random() * treeTemplates.length)];
    const scale = 0.0005;
    const height = Math.random() * 50 + 50;

    const newTree: TreeFeature = {
      type: 'Feature',
      properties: {
        id: `tree-${Date.now()}`,
        type: 'tree',
        style: randomTree.properties.style,
        height: height
      },
      geometry: {
        type: 'Polygon',
        coordinates: [
          (randomTree.geometry as any).coordinates[0].map((coord: number[]) => [
            coordinates.lng + coord[0] * scale,
            coordinates.lat + coord[1] * scale
          ])
        ]
      }
    };

    setTrees(current => ({
      type: 'FeatureCollection',
      features: [...current.features, newTree]
    }));

    setTreeCounts(current => ({
      ...current,
      [randomTree.properties.style]: current[randomTree.properties.style] + 1
    }));
  }, [treeTemplates]);

  const treeLayerStyle: LayerProps = {
    id: 'tree-extrusion',
    type: 'fill-extrusion',
    paint: {
      'fill-extrusion-color': '#2E7D32',
      'fill-extrusion-height': ['get', 'height'],
      'fill-extrusion-base': 0,
      'fill-extrusion-opacity': 0.8,
      'fill-extrusion-vertical-gradient': true
    }
  };

  return (
    <div className="h-full w-full relative">
      <Card className="absolute top-4 left-4 z-10 p-2">
        <Select value={baseMap} onValueChange={(value: 'light' | 'satellite') => setBaseMap(value)}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Choose basemap" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="light">Light</SelectItem>
            <SelectItem value="satellite">ESRI Satellite</SelectItem>
          </SelectContent>
        </Select>
      </Card>

      <div className="absolute bottom-4 right-4 z-10">
        <TreeCounter trees={treeCounts} />
      </div>

      <Map
        initialViewState={{
          longitude: 72.68,
          latitude: 32.07,
          zoom: 13,
          pitch: 45,
          bearing: -45
        }}
        mapStyle={baseMap === 'satellite' ? undefined : BASEMAPS.light}
        onClick={handleClick}
        style={{ width: '100%', height: '100%', cursor: 'none' }}
      >
        {baseMap === 'satellite' && (
          <Source
            type="raster"
            tiles={[BASEMAPS.satellite]}
            tileSize={256}
          >
            <Layer
              id="satellite"
              type="raster"
              paint={{
                'raster-opacity': 1
              }}
            />
          </Source>
        )}
        <Source type="geojson" data={trees}>
          <Layer {...treeLayerStyle} />
        </Source>
        <NavigationControl position="top-right" />
      </Map>
    </div>
  );
}