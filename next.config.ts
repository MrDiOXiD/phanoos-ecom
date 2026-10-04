import type { NextConfig } from "next";

const isDev = process.env.NODE_ENV === "development";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: isDev
          ? "http://localhost:3020/:path*"
          : "https://api.chatratech.ir/:path*",
      },
    ];
  },

  cacheComponents: false,
  reactStrictMode: false,

  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "chatra-phanoos.s3.ir-thr-at1.arvanstorage.ir",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "api.chatratech.ir",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;