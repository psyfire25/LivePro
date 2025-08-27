/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      { source: "/api/:path*", destination: "http://localhost:4000/:path*" },
      { source: "/production/:path*", destination: "http://localhost:3010/:path*" },
      { source: "/staffing/:path*", destination: "http://localhost:3020/:path*" },
      { source: "/talent/:path*", destination: "http://localhost:3030/:path*" },
      { source: "/finance/:path*", destination: "http://localhost:3040/:path*" }
    ];
  }
};
export default nextConfig;
