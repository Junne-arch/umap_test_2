import React from 'react';

const UMAPLogo: React.FC<React.SVGProps<SVGSVGElement>> = (props) => {
  return (
    <svg width="180" height="60" viewBox="0 0 180 60" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <defs>
        <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#10B981" />
          <stop offset="100%" stopColor="#3B82F6" />
        </linearGradient>
      </defs>
      <text x="5" y="40" fontFamily="Arial, sans-serif" fontSize="36" fontWeight="bold" fill="url(#gradient)">UMAP</text>
      <text x="5" y="55" fontFamily="Arial, sans-serif" fontSize="10" fill="currentColor">Urban Microclimate Analysis Platform</text>
    </svg>
  );
};

export default UMAPLogo;