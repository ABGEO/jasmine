/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    swcMinify: true,
    images: {
        remotePatterns: [
          {
            protocol: 'https',
            hostname: 'files.abgeo.cloud',
          },
        ],
      },
};

export default nextConfig;
