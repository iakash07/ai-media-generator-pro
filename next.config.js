/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['oaidalleapiprodscus.blob.core.windows.net', 'cdn.openai.com'],
  },
  // Enable standalone output for Docker
  output: 'standalone',
}

module.exports = nextConfig
