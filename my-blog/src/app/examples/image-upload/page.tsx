'use client';

import ImageUploader from '@/components/molecules/image-uploader';

/**
 * 이미지 업로드 예시 페이지
 * 개발 및 테스트 목적으로 사용
 */
export default function ImageUploadExample() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      <div className="container mx-auto max-w-4xl px-4 py-12">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
            이미지 업로드 예시
          </h1>
          <p className="mt-2 text-gray-600 dark:text-gray-400">
            Supabase Storage에 이미지를 업로드하고 마크다운에서 사용할 수 있는
            URL을 확인하세요.
          </p>
        </div>

        <div className="space-y-8">
          {/* Posts 폴더 업로드 */}
          <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-900">
            <h2 className="mb-4 text-xl font-semibold text-gray-900 dark:text-gray-100">
              포스트 이미지 업로드
            </h2>
            <p className="mb-4 text-sm text-gray-600 dark:text-gray-400">
              블로그 포스트에 사용할 이미지를 업로드합니다. (blog-images/posts/)
            </p>
            <ImageUploader
              folder="posts"
              onUploadSuccess={(url) => {
                console.log('포스트 이미지 업로드 완료:', url);
              }}
            />
          </div>

          {/* Thumbnails 폴더 업로드 */}
          <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-900">
            <h2 className="mb-4 text-xl font-semibold text-gray-900 dark:text-gray-100">
              썸네일 이미지 업로드
            </h2>
            <p className="mb-4 text-sm text-gray-600 dark:text-gray-400">
              포스트 썸네일로 사용할 이미지를 업로드합니다.
              (blog-images/thumbnails/)
            </p>
            <ImageUploader
              folder="thumbnails"
              onUploadSuccess={(url) => {
                console.log('썸네일 이미지 업로드 완료:', url);
              }}
            />
          </div>

          {/* Uploads 폴더 업로드 */}
          <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-900">
            <h2 className="mb-4 text-xl font-semibold text-gray-900 dark:text-gray-100">
              일반 이미지 업로드
            </h2>
            <p className="mb-4 text-sm text-gray-600 dark:text-gray-400">
              기타 용도의 이미지를 업로드합니다. (blog-images/uploads/)
            </p>
            <ImageUploader
              folder="uploads"
              onUploadSuccess={(url) => {
                console.log('일반 이미지 업로드 완료:', url);
              }}
            />
          </div>
        </div>

        {/* 사용 안내 */}
        <div className="mt-8 rounded-lg border border-blue-200 bg-blue-50 p-6 dark:border-blue-900 dark:bg-blue-950">
          <h3 className="mb-2 font-semibold text-blue-900 dark:text-blue-100">
            📌 사용 방법
          </h3>
          <ul className="space-y-2 text-sm text-blue-800 dark:text-blue-200">
            <li>
              1. 위의 각 섹션에서 이미지 파일을 선택하여 업로드합니다.
            </li>
            <li>
              2. 업로드가 완료되면 이미지 URL과 마크다운 코드가 표시됩니다.
            </li>
            <li>
              3. 마크다운 코드를 복사하여 포스트에 붙여넣으면 이미지가
              표시됩니다.
            </li>
            <li>
              4. 지원 형식: JPEG, PNG, WebP, GIF (최대 5MB)
            </li>
          </ul>
        </div>

        {/* 개발 정보 */}
        <div className="mt-8 rounded-lg border border-gray-200 bg-gray-50 p-6 dark:border-gray-800 dark:bg-gray-900">
          <h3 className="mb-2 font-semibold text-gray-900 dark:text-gray-100">
            🔧 개발자 정보
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            이 페이지는 이미지 업로드 기능을 테스트하기 위한 예시 페이지입니다.
            <br />
            실제 프로덕션에서는 이 페이지를 제거하거나 관리자 전용으로
            제한하세요.
          </p>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
            자세한 사용법은{' '}
            <code className="rounded bg-gray-200 px-1 py-0.5 text-xs dark:bg-gray-800">
              docs/image-usage.md
            </code>
            를 참고하세요.
          </p>
        </div>
      </div>
    </div>
  );
}
