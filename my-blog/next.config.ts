import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,

  // 이미지 최적화 설정
  images: {
    qualities: [50, 75, 80, 85, 100],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'elbkdmizaflfdigzxkxh.supabase.co',
        port: '',
        pathname: '/storage/v1/object/public/**',
      },
    ],
  },
};

export default nextConfig;
