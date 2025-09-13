/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    formats: ['image/webp', 'image/avif'],
    domains: ['localhost', 'images.unsplash.com'],
  },
  async redirects() {
    return [
      {
        source: '/product/:slug',
        destination: '/download?product=:slug',
        permanent: false,
      },
    ]
  },
}

module.exports = nextConfig