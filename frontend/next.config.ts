import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      { source: "/minh-bach", destination: "/minh-bach.html" },
    ];
  },
};

export default nextConfig;
