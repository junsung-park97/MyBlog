import { createClient as createBrowserClient } from '@/lib/supabase/client';
import { createClient as createServerClient } from '@/lib/supabase/server';
import {
  IMAGE_CONFIG,
  validateImageFile,
  generateImageFilename,
  getSupabaseImageUrl,
} from '@/lib/utils/image';

export interface UploadImageResult {
  success: boolean;
  url?: string;
  path?: string;
  error?: string;
}

/**
 * 클라이언트 측에서 이미지를 Supabase Storage에 업로드
 */
export async function uploadImageClient(
  file: File,
  folder: keyof typeof IMAGE_CONFIG.SUPABASE.FOLDERS = 'UPLOADS'
): Promise<UploadImageResult> {
  try {
    // 파일 유효성 검사
    const validation = validateImageFile(file);
    if (!validation.valid) {
      return {
        success: false,
        error: validation.error,
      };
    }

    const supabase = createBrowserClient();
    const filename = generateImageFilename(file.name);
    const folderPath = IMAGE_CONFIG.SUPABASE.FOLDERS[folder];
    const filePath = `${folderPath}/${filename}`;

    // Supabase Storage에 업로드
    const { error } = await supabase.storage
      .from(IMAGE_CONFIG.SUPABASE.BUCKET)
      .upload(filePath, file, {
        cacheControl: '3600',
        upsert: false,
      });

    if (error) {
      console.error('Storage upload error:', error);
      return {
        success: false,
        error: `이미지 업로드 실패: ${error.message}`,
      };
    }

    // Public URL 생성
    const { data: urlData } = supabase.storage
      .from(IMAGE_CONFIG.SUPABASE.BUCKET)
      .getPublicUrl(filePath);

    return {
      success: true,
      url: urlData.publicUrl,
      path: filePath,
    };
  } catch (error) {
    console.error('Upload error:', error);
    return {
      success: false,
      error: '이미지 업로드 중 오류가 발생했습니다.',
    };
  }
}

/**
 * 서버 측에서 이미지를 Supabase Storage에 업로드
 */
export async function uploadImageServer(
  file: File,
  folder: keyof typeof IMAGE_CONFIG.SUPABASE.FOLDERS = 'UPLOADS'
): Promise<UploadImageResult> {
  try {
    // 파일 유효성 검사
    const validation = validateImageFile(file);
    if (!validation.valid) {
      return {
        success: false,
        error: validation.error,
      };
    }

    const supabase = await createServerClient();
    const filename = generateImageFilename(file.name);
    const folderPath = IMAGE_CONFIG.SUPABASE.FOLDERS[folder];
    const filePath = `${folderPath}/${filename}`;

    // File을 ArrayBuffer로 변환
    const arrayBuffer = await file.arrayBuffer();
    const buffer = new Uint8Array(arrayBuffer);

    // Supabase Storage에 업로드
    const { error } = await supabase.storage
      .from(IMAGE_CONFIG.SUPABASE.BUCKET)
      .upload(filePath, buffer, {
        contentType: file.type,
        cacheControl: '3600',
        upsert: false,
      });

    if (error) {
      console.error('Storage upload error:', error);
      return {
        success: false,
        error: `이미지 업로드 실패: ${error.message}`,
      };
    }

    // Public URL 생성
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
    const url = getSupabaseImageUrl(
      supabaseUrl,
      IMAGE_CONFIG.SUPABASE.BUCKET,
      filePath
    );

    return {
      success: true,
      url,
      path: filePath,
    };
  } catch (error) {
    console.error('Upload error:', error);
    return {
      success: false,
      error: '이미지 업로드 중 오류가 발생했습니다.',
    };
  }
}

/**
 * Supabase Storage에서 이미지 삭제
 */
export async function deleteImage(
  filePath: string,
  isServer = false
): Promise<{ success: boolean; error?: string }> {
  try {
    const supabase = isServer
      ? await createServerClient()
      : createBrowserClient();

    const { error } = await supabase.storage
      .from(IMAGE_CONFIG.SUPABASE.BUCKET)
      .remove([filePath]);

    if (error) {
      console.error('Storage delete error:', error);
      return {
        success: false,
        error: `이미지 삭제 실패: ${error.message}`,
      };
    }

    return { success: true };
  } catch (error) {
    console.error('Delete error:', error);
    return {
      success: false,
      error: '이미지 삭제 중 오류가 발생했습니다.',
    };
  }
}

/**
 * 이미지 목록 조회
 */
export async function listImages(
  folder?: keyof typeof IMAGE_CONFIG.SUPABASE.FOLDERS
): Promise<{ success: boolean; files?: string[]; error?: string }> {
  try {
    const supabase = createBrowserClient();
    const path = folder ? IMAGE_CONFIG.SUPABASE.FOLDERS[folder] : '';

    const { data, error } = await supabase.storage
      .from(IMAGE_CONFIG.SUPABASE.BUCKET)
      .list(path);

    if (error) {
      console.error('Storage list error:', error);
      return {
        success: false,
        error: `이미지 목록 조회 실패: ${error.message}`,
      };
    }

    const files = data.map((file) => `${path}/${file.name}`);

    return {
      success: true,
      files,
    };
  } catch (error) {
    console.error('List error:', error);
    return {
      success: false,
      error: '이미지 목록 조회 중 오류가 발생했습니다.',
    };
  }
}
