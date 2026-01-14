-- 인증 제한 정책 삭제
-- 현재 "Authenticated users can upload images" 정책이 업로드를 막고 있습니다.

-- 1. 인증 필요 정책들 삭제
DROP POLICY IF EXISTS "Authenticated users can upload images" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated users can update images" ON storage.objects;
DROP POLICY IF EXISTS "Users can delete their own images" ON storage.objects;

-- 2. 정책 삭제 확인
SELECT policyname, cmd,
  CASE
    WHEN cmd = 'INSERT' THEN with_check::text
    ELSE qual::text
  END as condition
FROM pg_policies
WHERE tablename = 'objects'
  AND schemaname = 'storage'
  AND (qual::text LIKE '%blog-images%' OR with_check::text LIKE '%blog-images%');

-- 3. 만약 "anyone can update images"와 "anyone can delete images" 정책이 없다면 추가
-- (이미 있으면 에러가 나지만 무시하세요)

CREATE POLICY "anyone can update images"
  ON storage.objects FOR UPDATE
  USING (bucket_id = 'blog-images');

CREATE POLICY "anyone can delete images"
  ON storage.objects FOR DELETE
  USING (bucket_id = 'blog-images');

-- 4. 최종 확인 - 아래 4개 정책만 남아야 합니다:
-- - anyone can upload images (INSERT)
-- - public images are viewable by everyone (SELECT)
-- - anyone can update images (UPDATE)
-- - anyone can delete images (DELETE)

SELECT policyname, cmd
FROM pg_policies
WHERE tablename = 'objects'
  AND schemaname = 'storage'
  AND (qual::text LIKE '%blog-images%' OR with_check::text LIKE '%blog-images%')
ORDER BY cmd;
