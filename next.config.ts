import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ['res.cloudinary.com', 'localhost'], // add any other external image domains if needed
  },
  /* config options here */
};

export default nextConfig;
