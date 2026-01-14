-- Storage RLS 정책 에러 해결
-- "new row violates row-level security policy" 에러 수정

-- 1. 기존 정책 확인
SELECT policyname, cmd
FROM pg_policies
WHERE tablename = 'objects'
  AND schemaname = 'storage'
  AND (qual::text LIKE '%blog-images%' OR with_check::text LIKE '%blog-images%');

-- 결과가 비어있으면 정책이 없는 것입니다.
-- 아래 정책들을 추가하세요.

-- 2. 정책이 이미 있으면 삭제 (선택사항)
DROP POLICY IF EXISTS "Anyone can upload images" ON storage.objects;
DROP POLICY IF EXISTS "Public images are viewable by everyone" ON storage.objects;
DROP POLICY IF EXISTS "Anyone can update images" ON storage.objects;
DROP POLICY IF EXISTS "Anyone can delete images" ON storage.objects;

-- 3. 새로운 정책 추가 (개발 환경용 - 모든 사용자 허용)
-- INSERT 정책 (업로드 허용)
CREATE POLICY "Anyone can upload images"
  ON storage.objects FOR INSERT
  WITH CHECK (bucket_id = 'blog-images');

-- SELECT 정책 (읽기 허용)
CREATE POLICY "Public images are viewable by everyone"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'blog-images');

-- UPDATE 정책 (수정 허용)
CREATE POLICY "Anyone can update images"
  ON storage.objects FOR UPDATE
  USING (bucket_id = 'blog-images');

-- DELETE 정책 (삭제 허용)
CREATE POLICY "Anyone can delete images"
  ON storage.objects FOR DELETE
  USING (bucket_id = 'blog-images');

-- 4. 정책 추가 확인
SELECT
  policyname,
  cmd as command,
  CASE
    WHEN cmd = 'INSERT' THEN with_check::text
    ELSE qual::text
  END as condition
FROM pg_policies
WHERE tablename = 'objects'
  AND schemaname = 'storage'
  AND (qual::text LIKE '%blog-images%' OR with_check::text LIKE '%blog-images%');

-- 결과에 4개의 정책이 표시되어야 합니다:
-- 1. Anyone can upload images (INSERT)
-- 2. Public images are viewable by everyone (SELECT)
-- 3. Anyone can update images (UPDATE)
-- 4. Anyone can delete images (DELETE)
