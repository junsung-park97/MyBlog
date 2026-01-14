'use client';

import { useState, ChangeEvent } from 'react';
import OptimizedImage from '@/components/atoms/optimized-image';
import Button from '@/components/atoms/button';

interface ImageUploaderProps {
  folder?: 'posts' | 'thumbnails' | 'uploads';
  onUploadSuccess?: (url: string, path: string) => void;
}

/**
 * 이미지 업로드 컴포넌트
 * Supabase Storage에 이미지를 업로드하고 미리보기를 제공합니다.
 */
export default function ImageUploader({
  folder = 'uploads',
  onUploadSuccess,
}: ImageUploaderProps) {
  const [imageUrl, setImageUrl] = useState<string>('');
  const [imagePath, setImagePath] = useState<string>('');
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string>('');

  const handleFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // 파일 타입 검증
    if (!file.type.startsWith('image/')) {
      setError('이미지 파일만 업로드 가능합니다.');
      return;
    }

    // 파일 크기 검증 (5MB)
    if (file.size > 5 * 1024 * 1024) {
      setError('파일 크기는 5MB 이하여야 합니다.');
      return;
    }

    setError('');
    setUploading(true);

    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('folder', folder.toUpperCase());

      const response = await fetch('/api/upload/image', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();

      if (data.success) {
        setImageUrl(data.url);
        setImagePath(data.path);
        onUploadSuccess?.(data.url, data.path);
      } else {
        setError(data.error || '업로드에 실패했습니다.');
      }
    } catch (err) {
      console.error('Upload error:', err);
      setError('업로드 중 오류가 발생했습니다.');
    } finally {
      setUploading(false);
    }
  };

  const handleReset = () => {
    setImageUrl('');
    setImagePath('');
    setError('');
  };

  return (
    <div className="space-y-4">
      {/* 파일 선택 */}
      <div className="flex items-center gap-4">
        <label
          htmlFor="image-upload"
          className="cursor-pointer rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
        >
          {uploading ? '업로드 중...' : '이미지 선택'}
        </label>
        <input
          id="image-upload"
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          disabled={uploading}
          className="hidden"
        />
        {imageUrl && (
          <Button variant="secondary" size="sm" onClick={handleReset}>
            초기화
          </Button>
        )}
      </div>

      {/* 에러 메시지 */}
      {error && (
        <div className="rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-700 dark:border-red-900 dark:bg-red-950 dark:text-red-400">
          {error}
        </div>
      )}

      {/* 업로드 진행 중 */}
      {uploading && (
        <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
          <div className="h-4 w-4 animate-spin rounded-full border-2 border-gray-300 border-t-blue-600"></div>
          <span>이미지를 업로드하는 중...</span>
        </div>
      )}

      {/* 이미지 미리보기 */}
      {imageUrl && (
        <div className="space-y-2">
          <div className="relative overflow-hidden rounded-lg border border-gray-200 dark:border-gray-800">
            <OptimizedImage
              src={imageUrl}
              alt="업로드된 이미지"
              width={800}
              height={600}
              className="w-full"
            />
          </div>

          {/* 이미지 정보 */}
          <div className="rounded-lg border border-gray-200 bg-gray-50 p-3 dark:border-gray-800 dark:bg-gray-900">
            <p className="text-xs text-gray-600 dark:text-gray-400">
              <span className="font-medium">URL:</span>{' '}
              <code className="text-xs">{imageUrl}</code>
            </p>
            <p className="mt-1 text-xs text-gray-600 dark:text-gray-400">
              <span className="font-medium">경로:</span>{' '}
              <code className="text-xs">{imagePath}</code>
            </p>
          </div>

          {/* 마크다운 코드 */}
          <div className="rounded-lg border border-gray-200 bg-gray-50 p-3 dark:border-gray-800 dark:bg-gray-900">
            <p className="mb-1 text-xs font-medium text-gray-700 dark:text-gray-300">
              마크다운에서 사용:
            </p>
            <code className="block text-xs text-gray-600 dark:text-gray-400">
              ![이미지 설명]({imageUrl})
            </code>
          </div>
        </div>
      )}
    </div>
  );
}
