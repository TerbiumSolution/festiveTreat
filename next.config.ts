import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  basePath: '/ps/festive-treats',
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'wrapperengine-s3.s3.ap-south-1.amazonaws.com',
      },
      {
        protocol: 'https',
        hostname: 'hb.terbiumsolutions.in',
      },
      {
        protocol: 'http',
        hostname: 'localhost',
      }
    ],
  },
};

export default nextConfig;