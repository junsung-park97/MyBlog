import { NextRequest, NextResponse } from 'next/server';
import { uploadImageServer } from '@/lib/supabase/storage';
import { IMAGE_CONFIG } from '@/lib/utils/image';

/**
 * 이미지 업로드 API Route Handler
 * POST /api/upload/image
 */
export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;
    const folder = (formData.get('folder') as string) || 'UPLOADS';

    if (!file) {
      return NextResponse.json(
        { error: '파일이 제공되지 않았습니다.' },
        { status: 400 }
      );
    }

    // 폴더 유효성 검사
    if (
      !Object.keys(IMAGE_CONFIG.SUPABASE.FOLDERS).includes(folder.toUpperCase())
    ) {
      return NextResponse.json(
        { error: '유효하지 않은 폴더입니다.' },
        { status: 400 }
      );
    }

    // 이미지 업로드
    const result = await uploadImageServer(
      file,
      folder.toUpperCase() as keyof typeof IMAGE_CONFIG.SUPABASE.FOLDERS
    );

    if (!result.success) {
      return NextResponse.json(
        { error: result.error || '업로드 실패' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      url: result.url,
      path: result.path,
    });
  } catch (error) {
    console.error('Image upload API error:', error);
    return NextResponse.json(
      { error: '이미지 업로드 중 오류가 발생했습니다.' },
      { status: 500 }
    );
  }
}
