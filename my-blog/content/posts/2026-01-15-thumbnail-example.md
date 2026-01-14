---
title: '썸네일 사용 예시'
date: '2026-01-15'
description: '블로그 포스트에 썸네일을 추가하는 방법을 설명합니다.'
tags: ['Tutorial', 'Thumbnail']
project: 'tutorials'
draft: false
thumbnail: '/images/thumbnails/example.jpg'
---

# 썸네일 사용하기

이 포스트는 front matter에서 `thumbnail` 필드를 사용하고 있습니다.

## Front Matter 설정

```yaml
---
title: '포스트 제목'
date: '2026-01-15'
description: '포스트 설명'
tags: ['Tag1', 'Tag2']
draft: false
thumbnail: '/images/thumbnails/example.jpg'  # 썸네일 추가!
---
```

## 썸네일 이미지 준비

### 방법 1: 정적 이미지 (권장)

1. **이미지를 준비합니다**
   - 권장 크기: 1200×630px (OG 이미지 비율)
   - 또는: 800×450px (16:9 비율)

2. **이미지를 저장합니다**
   ```bash
   public/images/thumbnails/my-thumbnail.jpg
   ```

3. **Front matter에 경로를 추가합니다**
   ```yaml
   thumbnail: '/images/thumbnails/my-thumbnail.jpg'
   ```

### 방법 2: Supabase Storage

1. **이미지 업로드**
   - http://localhost:3000/examples/image-upload
   - "썸네일 이미지 업로드" 섹션 사용

2. **생성된 URL 복사**

3. **Front matter에 전체 URL 추가**
   ```yaml
   thumbnail: 'https://elbkdmizaflfdigzxkxh.supabase.co/storage/v1/object/public/blog-images/thumbnails/xxxxx.png'
   ```

## 썸네일 효과

- ✅ 포스트 목록에서 카드 상단에 표시됨
- ✅ 마우스 호버 시 확대 애니메이션
- ✅ 반응형 디자인 (모바일/데스크톱)
- ✅ 자동 이미지 최적화 (Next.js Image)

## 썸네일이 없는 경우

`thumbnail` 필드를 생략하면 텍스트만 표시됩니다:

```yaml
---
title: '포스트 제목'
date: '2026-01-15'
description: '포스트 설명'
tags: ['Tag1']
draft: false
# thumbnail 없음
---
```

## 권장 사항

### 이미지 크기
- **최소**: 800×450px (16:9)
- **권장**: 1200×630px (OG 이미지로도 사용 가능)
- **최대**: 1920×1080px

### 파일 크기
- 가능하면 200KB 이하로 최적화
- WebP 포맷 권장

### 파일명 규칙
```bash
# 좋은 예
public/images/thumbnails/2026-01-15-my-post.jpg
public/images/thumbnails/react-tutorial-thumbnail.webp

# 나쁜 예
public/images/thumbnails/IMG_1234.jpg
public/images/thumbnails/스크린샷.png
```

## 실전 팁

### 1. 포스트별 일관된 스타일

모든 썸네일을 같은 비율과 스타일로 유지하면 블로그가 더 전문적으로 보입니다.

### 2. 텍스트 오버레이

썸네일에 포스트 제목이나 주요 키워드를 텍스트로 추가하면 더 눈에 띕니다.

### 3. 고화질 이미지 사용

저해상도 이미지는 확대되면 흐릿하게 보일 수 있으므로 충분한 해상도를 유지하세요.

## 참고

이 포스트를 포스트 목록 페이지에서 확인해보세요:
- http://localhost:3000/posts
