/** @type {import('next').NextConfig} */
const nextConfig = {
  // Removed output: 'export' to allow API routes
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: { 
    domains: ['avatars.githubusercontent.com', 'authjs.dev'],
    unoptimized: true 
  },
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
      };
    }
    return config;
  },
};

module.exports = nextConfig;