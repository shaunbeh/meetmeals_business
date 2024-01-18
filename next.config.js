/** @type {import('next').NextConfig} */
const nextConfig = {
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
