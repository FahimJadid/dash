/** @type {import('next').NextConfig} */
const nextConfig = {
    transpilePackages: ['@repo/db', '@repo/ui'],
    webpack: (config, { isServer }) => {
      if (isServer) {
        config.externals = [...config.externals, '@prisma/client']
      }
      return config
    },
  }
  
  module.exports = nextConfig
  
  