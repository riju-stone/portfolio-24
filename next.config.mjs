/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  experimental: {
    optimizeCss: true,
    gzipSize: true,
    bundlePagesRouterDependencies: true,
    turbo: {
      rules: {
        '*.svg': {
          loaders: [ '@svgr/webpack' ],
          as: '*.js',
        },
      },
    },
  },
  images: {
    formats: [ 'image/webp', 'image/avif' ],
    deviceSizes: [ 640, 750, 828, 1080, 1200, 1920, 2048, 3840 ],
  },
};

export default nextConfig;
