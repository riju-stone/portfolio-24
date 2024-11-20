/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    turbo: {
      rules: {
        "*html": {
          loaders: ["raw-loader"],
          as: "*.glsl",
        },
      },
    },
  },
};

export default nextConfig;
