import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  experimental: {
    ppr: true,
  },
  transpilePackages: ['@tomo-inc/tomo-web-sdk', '@tomo-wallet/uikit', '@tomo-inc/shared-type'],
  images: {
    remotePatterns: [
      {
        hostname: 'avatar.vercel.sh',
      },
    ],
  },
};

export default nextConfig;
