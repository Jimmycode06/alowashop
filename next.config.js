/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    unoptimized: true, // nécessaire pour que les images s'affichent sur tous les hébergeurs (Vercel, Netlify, etc.)
  },
}

module.exports = nextConfig
