/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack(config) {
    const fileLoaderRule = config.module.rules.find((rule) =>
      rule.test?.test?.('.svg')
    );
    config.module.rules.push(
      // Reapply the existing rule, but only for svg imports ending in ?url
      {
        ...fileLoaderRule,
        test: /\.svg$/i,
        resourceQuery: /url/, // *.svg?url
      },
      // Convert all other *.svg imports to React components
      {
        test: /\.svg$/i,
        issuer: fileLoaderRule.issuer,
        resourceQuery: { not: [...fileLoaderRule.resourceQuery.not, /url/] }, // exclude if *.svg?url
        use: ['@svgr/webpack'],
      }
    );
    return config;
  },
  trailingSlash: true,
  async rewrites() {
    return [
      {
        source: '/clinic/:path*',
        destination: 'https://clinicsarmayeh.com/wp-json/:path*',
      },
      {
        source: '/api/:path*',
        destination: 'https://bprice.clinicsarmayeh.com/api/:path*',
      },
    ];
  },
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'bprice.clinicsarmayeh.com',
      }
    ],
  },
};
module.exports = nextConfig;
