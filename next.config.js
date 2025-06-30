/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  images: {
    unoptimized: true,
  },
  trailingSlash: true,
  experimental: {
    forceSwcTransforms: true,
  },
}

module.exports = nextConfig
