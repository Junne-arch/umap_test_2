import type L from 'leaflet';

declare module 'leaflet' {
  export interface DrawEvents {
    Created: {
      layer: L.LayerGroup;
    };
    Edited: {
      layers: L.Layers;
    };
  }

  export interface Layer {
    _layers: L.Layers;
    _leaflet_id: number;
  }

  export interface DrawControlEvent {
    layer: L.Layer;
    layerType: string;
    target: L.Layer;
  }
}
