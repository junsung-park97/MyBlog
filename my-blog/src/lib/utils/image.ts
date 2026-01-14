/**
 * 이미지 처리 유틸리티
 * 하이브리드 방식: 정적 이미지(public/) + 동적 이미지(Supabase Storage)
 */

export const IMAGE_CONFIG = {
  // 정적 이미지 경로 (public/ 디렉토리)
  PATHS: {
    POSTS: '/images/posts',
    THUMBNAILS: '/images/thumbnails',
    OG_IMAGES: '/images/og-images',
    AVATARS: '/images/avatars',
    ICONS: '/icons',
  },

  // Supabase Storage 버킷
  SUPABASE: {
    BUCKET: 'blog-images',
    FOLDERS: {
      POSTS: 'posts',
      THUMBNAILS: 'thumbnails',
      UPLOADS: 'uploads',
    },
  },

  // 이미지 크기 설정
  SIZES: {
    thumbnail: { width: 400, height: 300 },
    medium: { width: 800, height: 600 },
    large: { width: 1200, height: 900 },
    og: { width: 1200, height: 630 },
  },

  // 지원하는 이미지 포맷
  ALLOWED_FORMATS: ['image/jpeg', 'image/png', 'image/webp', 'image/gif'],

  // 최대 파일 크기 (5MB)
  MAX_FILE_SIZE: 5 * 1024 * 1024,
};

/**
 * 이미지 경로가 정적 이미지인지 확인
 */
export function isStaticImage(src: string): boolean {
  return src.startsWith('/images/') || src.startsWith('/icons/');
}

/**
 * 이미지 경로가 Supabase Storage 이미지인지 확인
 */
export function isSupabaseImage(src: string): boolean {
  return src.includes('supabase.co/storage/');
}

/**
 * 정적 이미지 경로 생성
 */
export function getStaticImagePath(
  folder: keyof typeof IMAGE_CONFIG.PATHS,
  filename: string
): string {
  return `${IMAGE_CONFIG.PATHS[folder]}/${filename}`;
}

/**
 * Supabase Storage 이미지 URL 생성
 */
export function getSupabaseImageUrl(
  supabaseUrl: string,
  bucket: string,
  path: string
): string {
  return `${supabaseUrl}/storage/v1/object/public/${bucket}/${path}`;
}

/**
 * 이미지 파일 유효성 검사
 */
export function validateImageFile(file: File): {
  valid: boolean;
  error?: string;
} {
  // 파일 형식 검사
  if (!IMAGE_CONFIG.ALLOWED_FORMATS.includes(file.type)) {
    return {
      valid: false,
      error: `지원하지 않는 이미지 형식입니다. 지원 형식: ${IMAGE_CONFIG.ALLOWED_FORMATS.join(', ')}`,
    };
  }

  // 파일 크기 검사
  if (file.size > IMAGE_CONFIG.MAX_FILE_SIZE) {
    return {
      valid: false,
      error: `파일 크기가 너무 큽니다. 최대 ${IMAGE_CONFIG.MAX_FILE_SIZE / 1024 / 1024}MB까지 업로드 가능합니다.`,
    };
  }

  return { valid: true };
}

/**
 * 파일명 생성 (타임스탬프 + 랜덤)
 */
export function generateImageFilename(originalName: string): string {
  const timestamp = Date.now();
  const random = Math.random().toString(36).substring(2, 8);
  const extension = originalName.split('.').pop();
  return `${timestamp}-${random}.${extension}`;
}

/**
 * 이미지 최적화를 위한 srcSet 생성
 */
export function generateSrcSet(
  baseSrc: string,
  sizes: Array<number>
): string {
  return sizes.map((size) => `${baseSrc}?w=${size} ${size}w`).join(', ');
}
