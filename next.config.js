/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: '/clinic/:path*',
        destination: 'https://clinicsarmayeh.com/wp-json/:path*',
      },
    ];
  },
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'bprice.clinicsarmayeh.com',
      },
    ],
  },
};
module.exports = nextConfig;
