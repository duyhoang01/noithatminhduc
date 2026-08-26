import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      { source: "/uu-dai-thang-9", destination: "/uu-dai-thang-9.html" },
    ];
  },
};

export default nextConfig;
