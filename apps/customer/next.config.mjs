/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ['@repo/db', '@repo/ui', '@repo/store'],
}

export default nextConfig;
