import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  output: 'standalone',
  reactStrictMode: false,
  transpilePackages: ['@mantine/core'],
};

export default nextConfig;
