import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  images: {
    unoptimized: true,
  },
  allowedDevOrigins: ["192.168.0.84", "192.168.0.84:3000", "localhost:3000"],
};

export default nextConfig;
