/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  experimental: {
    optimizeCss: true,
    gzipSize: true,
  },
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
  images: {
    formats: [ 'image/avif', 'image/webp' ],
    minimumCacheTTL: 31536000, // 1 year
    deviceSizes: [ 640, 750, 828, 1080, 1200, 1920, 2048, 3840 ],
    imageSizes: [ 16, 32, 48, 64, 96, 128, 256, 384 ],
    dangerouslyAllowSVG: false,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
    // Add image optimization
    unoptimized: false,
  },
};

export default nextConfig;
