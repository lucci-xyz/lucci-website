import createMDX from '@next/mdx';

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: { typedRoutes: true },
  images: { remotePatterns: [] },
};

const withMDX = createMDX({ extension: /\.mdx?$/ });
export default withMDX({ ...nextConfig, pageExtensions: ['tsx', 'ts', 'mdx'] });
