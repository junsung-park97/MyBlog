import Image from 'next/image';
import { isStaticImage, isSupabaseImage } from '@/lib/utils/image';

interface OptimizedImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  fill?: boolean;
  className?: string;
  priority?: boolean;
  sizes?: string;
  quality?: number;
}

/**
 * Next.js Image 컴포넌트 래퍼
 * 정적 이미지와 Supabase Storage 이미지를 자동으로 처리
 */
export default function OptimizedImage({
  src,
  alt,
  width,
  height,
  fill = false,
  className = '',
  priority = false,
  sizes,
  quality = 85,
}: OptimizedImageProps) {
  // 정적 이미지 또는 Supabase 이미지 확인
  const isStatic = isStaticImage(src);
  const isSupabase = isSupabaseImage(src);

  // 외부 이미지 URL 처리
  const isExternal = !isStatic && !isSupabase && src.startsWith('http');

  // fill 모드일 때는 width, height 불필요
  const imageProps = fill
    ? {
        fill: true,
        sizes: sizes || '100vw',
      }
    : {
        width: width || 800,
        height: height || 600,
      };

  return (
    <Image
      src={src}
      alt={alt}
      className={className}
      priority={priority}
      quality={quality}
      {...imageProps}
      // 외부 이미지는 unoptimized 처리하거나 next.config에 추가 필요
      unoptimized={isExternal}
    />
  );
}
