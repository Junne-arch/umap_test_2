"use client"

import dynamic from 'next/dynamic';

const InteractiveGlobalMap = dynamic(
  () => import('@/components/InteractiveGlobalMap'),
  { 
    ssr: false,
    loading: () => (
      <div className="w-full h-full flex items-center justify-center bg-gray-900">
        <div className="text-white text-lg">Loading Globe View...</div>
      </div>
    )
  }
);

export default function Globe3D() {
  return (
    <div className="dashboard-map-container">
      <div className="absolute inset-0">
        <InteractiveGlobalMap />
      </div>
      <div className="absolute top-4 left-1/2 transform -translate-x-1/2 z-10 text-center bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm p-4 rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">Globe 3D test</h1>
        <p className="text-sm text-gray-600 dark:text-gray-300">Interactive globe visualization</p>
      </div>
    </div>
  );
}