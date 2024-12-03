import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "image.tmdb.org",
        pathname: "/t/p/**",
      },
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '3001', 
        pathname: '/uploads/**',
      },
    ],
  }
}
export default nextConfig;