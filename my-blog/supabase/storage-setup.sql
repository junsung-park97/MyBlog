-- Supabase Storage 버킷 생성 및 정책 설정
-- Supabase Dashboard > SQL Editor에서 실행하세요

-- 1. blog-images 버킷이 이미 존재하는지 확인
-- 존재하지 않으면 수동으로 생성해야 합니다 (SQL로 직접 생성 불가)

-- 2. Storage 정책 설정
-- 버킷을 먼저 Dashboard에서 생성한 후 이 정책들을 실행하세요

-- 모든 사용자가 이미지를 볼 수 있음 (SELECT)
create policy "Public images are viewable by everyone"
  on storage.objects for select
  using (bucket_id = 'blog-images');

-- 모든 사용자가 이미지를 업로드할 수 있음 (INSERT)
-- 프로덕션에서는 인증된 사용자만 업로드하도록 제한하는 것을 권장
create policy "Anyone can upload images"
  on storage.objects for insert
  with check (bucket_id = 'blog-images');

-- 모든 사용자가 이미지를 업데이트할 수 있음 (UPDATE)
create policy "Anyone can update images"
  on storage.objects for update
  using (bucket_id = 'blog-images');

-- 모든 사용자가 이미지를 삭제할 수 있음 (DELETE)
create policy "Anyone can delete images"
  on storage.objects for delete
  using (bucket_id = 'blog-images');

-- ============================================
-- 프로덕션 환경용 정책 (인증된 사용자만 허용)
-- ============================================
-- 위의 정책 대신 아래 정책을 사용하려면:
-- 1. 위의 정책들을 모두 DROP
-- 2. 아래 정책들을 실행

/*
-- 인증된 사용자만 업로드 가능
create policy "Authenticated users can upload images"
  on storage.objects for insert
  with check (
    bucket_id = 'blog-images'
    AND auth.role() = 'authenticated'
  );

-- 인증된 사용자만 업데이트 가능
create policy "Authenticated users can update images"
  on storage.objects for update
  using (
    bucket_id = 'blog-images'
    AND auth.role() = 'authenticated'
  );

-- 본인이 업로드한 이미지만 삭제 가능
create policy "Users can delete their own images"
  on storage.objects for delete
  using (
    bucket_id = 'blog-images'
    AND auth.uid() = owner
  );
*/
