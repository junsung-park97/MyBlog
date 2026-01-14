# Supabase Storage 설정 가이드

"Bucket not found" 에러는 Supabase Storage에 `blog-images` 버킷이 생성되지 않아서 발생합니다.

## 1단계: Supabase Dashboard에서 버킷 생성

### 방법 1: Dashboard UI 사용 (권장)

1. **Supabase Dashboard 접속**
   - https://supabase.com/dashboard/project/elbkdmizaflfdigzxkxh/storage/buckets

2. **Storage 메뉴 이동**
   - 왼쪽 사이드바에서 **Storage** 클릭

3. **새 버킷 생성**
   - **New Bucket** 버튼 클릭
   - 또는 **Create a new bucket** 클릭

4. **버킷 설정**
   ```
   Name: blog-images
   Public bucket: ✅ ON (체크)
   File size limit: 5MB (optional)
   Allowed MIME types: image/jpeg, image/png, image/webp, image/gif (optional)
   ```

5. **Create bucket** 버튼 클릭

### 방법 2: SQL로 확인 (버킷 존재 여부)

Supabase Dashboard > SQL Editor에서 실행:

```sql
-- 현재 생성된 버킷 목록 확인
SELECT * FROM storage.buckets;

-- blog-images 버킷이 목록에 없으면 Dashboard UI로 생성하세요
```

## 2단계: Storage 정책 설정

버킷 생성 후, 접근 권한을 설정해야 합니다.

### 개발 환경용 정책 (누구나 업로드 가능)

Supabase Dashboard > SQL Editor에서 실행:

```sql
-- 모든 사용자가 이미지를 볼 수 있음
create policy "Public images are viewable by everyone"
  on storage.objects for select
  using (bucket_id = 'blog-images');

-- 모든 사용자가 이미지를 업로드할 수 있음
create policy "Anyone can upload images"
  on storage.objects for insert
  with check (bucket_id = 'blog-images');

-- 모든 사용자가 이미지를 업데이트할 수 있음
create policy "Anyone can update images"
  on storage.objects for update
  using (bucket_id = 'blog-images');

-- 모든 사용자가 이미지를 삭제할 수 있음
create policy "Anyone can delete images"
  on storage.objects for delete
  using (bucket_id = 'blog-images');
```

또는 `supabase/storage-setup.sql` 파일의 내용을 복사하여 실행하세요.

## 3단계: 폴더 구조 생성 (선택사항)

버킷 내부에 폴더를 미리 만들 수 있습니다:

1. Storage > blog-images 버킷 클릭
2. **Create folder** 또는 **Upload** 시 자동 생성됨
3. 생성할 폴더:
   - `posts/`
   - `thumbnails/`
   - `uploads/`

> **참고**: 폴더는 첫 번째 파일 업로드 시 자동으로 생성되므로 미리 만들지 않아도 됩니다.

## 4단계: 테스트

1. 개발 서버 실행 (이미 실행 중이면 재시작)
   ```bash
   npm run dev
   ```

2. 이미지 업로드 테스트 페이지 접속
   ```
   http://localhost:3000/examples/image-upload
   ```

3. 이미지 파일을 선택하여 업로드 테스트

## 트러블슈팅

### "Bucket not found" 에러가 계속 발생하는 경우

1. **버킷 이름 확인**
   - Dashboard에서 버킷 이름이 정확히 `blog-images`인지 확인
   - 대소문자, 하이픈 등이 정확해야 함

2. **Public 설정 확인**
   - 버킷 설정에서 "Public bucket"이 ON으로 되어 있는지 확인
   - OFF인 경우: 버킷 클릭 > Settings > Public bucket ON

3. **환경 변수 확인**
   ```bash
   # .env.local 파일 확인
   cat .env.local
   ```
   - `NEXT_PUBLIC_SUPABASE_URL`이 올바른지 확인
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`가 올바른지 확인

4. **개발 서버 재시작**
   - 환경 변수 변경 후 반드시 서버 재시작

### "Policy violation" 에러가 발생하는 경우

Storage 정책이 설정되지 않았거나 잘못 설정되었습니다:

1. Dashboard > Storage > Policies 확인
2. `storage.objects` 테이블에 정책이 없으면 위의 SQL 실행
3. 정책이 있는데 에러가 발생하면 기존 정책 삭제 후 다시 생성

```sql
-- 기존 정책 삭제
drop policy if exists "Public images are viewable by everyone" on storage.objects;
drop policy if exists "Anyone can upload images" on storage.objects;
drop policy if exists "Anyone can update images" on storage.objects;
drop policy if exists "Anyone can delete images" on storage.objects;

-- 위의 2단계 정책을 다시 실행
```

### 이미지가 업로드되지만 표시되지 않는 경우

1. **Public URL 확인**
   - Dashboard > Storage > blog-images에서 업로드된 파일 클릭
   - "Get public URL" 클릭하여 브라우저에서 직접 접근 가능한지 확인

2. **CORS 설정 확인**
   - Dashboard > Storage > Configuration > CORS
   - 필요시 CORS 정책 추가

## 참고 링크

- [Supabase Storage 공식 문서](https://supabase.com/docs/guides/storage)
- [Storage Policies 문서](https://supabase.com/docs/guides/storage/security/access-control)
- [프로젝트 Dashboard](https://supabase.com/dashboard/project/elbkdmizaflfdigzxkxh)
