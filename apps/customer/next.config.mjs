/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ['@repo/db', '@repo/ui', '@repo/store'],
  webpack: (config, { isServer }) => {
    if (isServer) {
      config.externals = [...config.externals, '@prisma/client']
    }
    return config
  },
  experimental: {
    // This will disable static page generation for all pages
    // You can adjust this to only exclude specific problematic pages
    unstable_disableStaticRendering: true,
  }
}

export default nextConfig;
