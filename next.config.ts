/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    turbo: false,  // <- Turbopack disable
  },
};

module.exports = nextConfig;