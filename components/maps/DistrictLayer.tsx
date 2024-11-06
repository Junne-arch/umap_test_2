"use client"

import { Layer, LayerProps } from 'react-map-gl/maplibre';

interface DistrictLayerProps {
  timeStep: number;
}

// Define a custom type for the layer style that includes transition
type CustomLayerStyle = LayerProps & {
  transition?: {
    duration: number;
    delay: number;
  };
};

export const DistrictLayer: React.FC<DistrictLayerProps> = ({ timeStep }) => {
  const layerStyle: CustomLayerStyle = {
    id: 'districts',
    type: 'fill-extrusion',
    source: 'districts',  // Make sure this matches your source ID
    paint: {
      'fill-extrusion-color': [
        'interpolate',
        ['linear'],
        ['get', ['at', ['get', 'temperatures'], ['literal', timeStep]]],
        25, '#00ff00',
        37.5, '#ffff00',
        50, '#ff0000'
      ],
      'fill-extrusion-height': ['get', 'height'],
      'fill-extrusion-base': 0,
      'fill-extrusion-opacity': 0.7
    },
    transition: {
      duration: 300,
      delay: 0
    }
  };

  return <Layer {...(layerStyle as LayerProps)} />;
};