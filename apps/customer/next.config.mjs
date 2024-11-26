/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ['@repo/db', '@repo/ui', '@repo/store'],
  webpack: (config, { isServer }) => {
    if (isServer) {
      config.externals = [...config.externals, '@prisma/client']
    }
    return config
  },
}

export default nextConfig;
