"use client"

import React, { useEffect, useRef } from 'react';
import createGlobe from 'cobe';

interface CobeGlobeProps {
  size?: number;
  markers?: Array<{ location: [number, number]; size: number }>;
  autoRotate?: boolean;
  rotationSpeed?: number;
}

export default function CobeGlobe({
  size = 1000,
  markers = [
    { location: [32.0836, 72.6711], size: 0.05 },
    { location: [-1.2921, 36.8219], size: 0.05 },
    { location: [5.3600, -4.0083], size: 0.05 },
    { location: [45.2671, 19.8335], size: 0.05 },
  ],
  autoRotate = true,
  rotationSpeed = 0.001
}: CobeGlobeProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    let phi = 3.5;

    const globe = createGlobe(canvasRef.current!, {
      devicePixelRatio: 2,
      width: size * 2,
      height: size * 2,
      phi: 3.5,
      theta: -0.2,
      dark: 1,
      diffuse: 1.2,
      mapSamples: 60000,
      mapBrightness: 6,
      opacity: 0.5,
      baseColor: [0.3, 0.3, 0.3],
      markerColor: [0.1, 0.8, 0.1],
      glowColor: [1, 1, 1],
      markers,
      onRender: (state) => {
        if (autoRotate) {
          state.phi = phi;
          phi += rotationSpeed;
        }
      }
    });

    return () => {
      globe.destroy();
    };
  }, [size, markers, autoRotate, rotationSpeed]);

  return (
    <canvas
      ref={canvasRef}
      style={{ width: `${size}px`, height: `${size}px` }}
      className="w-full h-full max-w-full aspect-square"
    />
  );
}