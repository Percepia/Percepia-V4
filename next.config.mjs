/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      { source: "/user/new-request", destination: "/user/request", permanent: false },
      { source: "/user/requests", destination: "/user/request", permanent: false },
    ];
  },
};

export default nextConfig;
