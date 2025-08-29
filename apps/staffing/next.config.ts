import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  transpilePackages: ["@repo/ui", "@repo/motion", "@repo/auth"],
};

export default nextConfig;
