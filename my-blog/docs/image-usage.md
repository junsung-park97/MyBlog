# 이미지 사용 가이드

이 프로젝트는 하이브리드 이미지 처리 방식을 사용합니다.

## 이미지 저장 방식

### 1. 정적 이미지 (public/ 디렉토리)

빌드 시 포함되는 정적 이미지는 `public/images/` 디렉토리에 저장합니다.

```
public/
├── images/
│   ├── posts/       # 포스트 이미지
│   ├── thumbnails/  # 썸네일 이미지
│   ├── og-images/   # Open Graph 이미지
│   └── avatars/     # 프로필 이미지
└── icons/           # 아이콘 파일
```

**사용 예시:**

```markdown
<!-- 마크다운에서 -->
![대체 텍스트](/images/posts/example.jpg)

<!-- React 컴포넌트에서 -->
<OptimizedImage
  src="/images/posts/example.jpg"
  alt="대체 텍스트"
  width={800}
  height={600}
/>
```

### 2. 동적 이미지 (Supabase Storage)

사용자가 업로드하거나 동적으로 생성되는 이미지는 Supabase Storage에 저장합니다.

**업로드 방법:**

```typescript
import { uploadImageClient } from '@/lib/supabase/storage';

// 클라이언트에서 직접 업로드
const result = await uploadImageClient(file, 'POSTS');

// API Route를 통한 업로드
const formData = new FormData();
formData.append('file', file);
formData.append('folder', 'posts');

const response = await fetch('/api/upload/image', {
  method: 'POST',
  body: formData,
});

const data = await response.json();
console.log(data.url); // 업로드된 이미지 URL
```

## OptimizedImage 컴포넌트

Next.js Image 최적화 기능을 자동으로 적용하는 래퍼 컴포넌트입니다.

### Props

- `src`: 이미지 경로 (정적/Supabase/외부 URL)
- `alt`: 대체 텍스트 (필수)
- `width`: 이미지 너비 (픽셀)
- `height`: 이미지 높이 (픽셀)
- `fill`: fill 모드 사용 여부 (default: false)
- `className`: CSS 클래스
- `priority`: 우선 로딩 여부 (default: false)
- `sizes`: 반응형 크기 설정
- `quality`: 이미지 품질 (default: 85)

### 사용 예시

```typescript
import OptimizedImage from '@/components/atoms/optimized-image';

// 기본 사용
<OptimizedImage
  src="/images/posts/example.jpg"
  alt="예시 이미지"
  width={800}
  height={600}
/>

// fill 모드
<div className="relative h-64">
  <OptimizedImage
    src="/images/thumbnails/post-1.jpg"
    alt="썸네일"
    fill
    className="object-cover"
  />
</div>

// Supabase Storage 이미지
<OptimizedImage
  src="https://xxx.supabase.co/storage/v1/object/public/blog-images/posts/image.jpg"
  alt="업로드된 이미지"
  width={1200}
  height={900}
/>
```

## 마크다운에서 이미지 사용

### 기본 문법

```markdown
![대체 텍스트](/images/posts/example.jpg)
```

### 추천 사항

1. **파일명 규칙**: `YYYY-MM-DD-descriptive-name.jpg`
2. **이미지 크기**:
   - 썸네일: 400x300
   - 포스트 이미지: 800x600 또는 1200x900
   - OG 이미지: 1200x630
3. **포맷**: WebP > JPEG > PNG (용량 순)
4. **파일 크기**: 최대 5MB

### 예시 포스트

```markdown
---
title: "예시 포스트"
date: "2026-01-14"
description: "이미지가 포함된 예시 포스트"
thumbnail: "/images/thumbnails/2026-01-14-example.jpg"
---

# 포스트 제목

본문 내용...

![예시 이미지](/images/posts/2026-01-14-example.jpg)

더 많은 내용...
```

## 이미지 업로드 컴포넌트 예시

```typescript
'use client';

import { useState } from 'react';
import OptimizedImage from '@/components/atoms/optimized-image';

export default function ImageUploader() {
  const [imageUrl, setImageUrl] = useState<string>('');
  const [uploading, setUploading] = useState(false);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);

    const formData = new FormData();
    formData.append('file', file);
    formData.append('folder', 'uploads');

    try {
      const response = await fetch('/api/upload/image', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();

      if (data.success) {
        setImageUrl(data.url);
      } else {
        alert(data.error);
      }
    } catch (error) {
      console.error('Upload error:', error);
      alert('업로드 중 오류가 발생했습니다.');
    } finally {
      setUploading(false);
    }
  };

  return (
    <div>
      <input
        type="file"
        accept="image/*"
        onChange={handleUpload}
        disabled={uploading}
      />

      {uploading && <p>업로드 중...</p>}

      {imageUrl && (
        <OptimizedImage
          src={imageUrl}
          alt="업로드된 이미지"
          width={800}
          height={600}
        />
      )}
    </div>
  );
}
```

## Supabase Storage 설정

### 버킷 생성

1. Supabase Dashboard > Storage로 이동
2. "New Bucket" 클릭
3. 버킷 이름: `blog-images`
4. Public 설정: ON (공개 이미지인 경우)
5. 생성 완료

### 폴더 구조

```
blog-images/
├── posts/       # 포스트 본문 이미지
├── thumbnails/  # 썸네일 이미지
└── uploads/     # 사용자 업로드 이미지
```

### Storage 정책 (RLS)

```sql
-- 모든 사용자가 이미지를 볼 수 있음
create policy "Public images are viewable by everyone"
  on storage.objects for select
  using (bucket_id = 'blog-images');

-- 인증된 사용자만 업로드 가능
create policy "Authenticated users can upload images"
  on storage.objects for insert
  with check (
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
```

## 환경 변수

`.env.local` 파일에 Supabase 설정이 필요합니다:

```bash
NEXT_PUBLIC_SUPABASE_URL=your-project-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
```

## 참고

- Next.js Image 최적화: https://nextjs.org/docs/app/building-your-application/optimizing/images
- Supabase Storage: https://supabase.com/docs/guides/storage
