/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // allow Firebase Storage URLs
    domains: [
      "firebasestorage.googleapis.com",
      "storage.googleapis.com",
      "percepia-7ebf6.firebasestorage.app",
    ],
    remotePatterns: [
      { protocol: "https", hostname: "firebasestorage.googleapis.com", pathname: "/v0/b/**" },
      { protocol: "https", hostname: "storage.googleapis.com", pathname: "/**" },
      { protocol: "https", hostname: "percepia-7ebf6.firebasestorage.app", pathname: "/**" },
    ],
  },
};

module.exports = nextConfig;
