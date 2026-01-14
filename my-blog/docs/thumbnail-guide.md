# 썸네일 사용 가이드

블로그 포스트에 썸네일 이미지를 추가하는 방법을 설명합니다.

## 기본 사용법

마크다운 파일의 front matter에 `thumbnail` 필드를 추가하면 됩니다.

```yaml
---
title: '포스트 제목'
date: '2026-01-15'
description: '포스트 설명'
tags: ['Tag1', 'Tag2']
draft: false
thumbnail: '/images/thumbnails/my-thumbnail.jpg'  # 👈 이것만 추가!
---
```

## 썸네일 이미지 준비하기

### 방법 1: 정적 이미지 (권장 ⭐)

가장 간단하고 추천하는 방법입니다.

**1단계: 이미지 준비**
- 권장 크기: 1200×630px (OG 이미지 비율) 또는 800×450px (16:9)
- 권장 포맷: WebP > JPEG > PNG
- 파일 크기: 200KB 이하로 최적화

**2단계: 파일 저장**

```bash
# 이미지를 이 경로에 저장
public/images/thumbnails/my-thumbnail.jpg
```

**3단계: Front matter에 추가**

```yaml
thumbnail: '/images/thumbnails/my-thumbnail.jpg'
```

### 방법 2: Supabase Storage

동적으로 업로드한 이미지를 사용하는 방법입니다.

**1단계: 이미지 업로드**

- 브라우저에서 접속: http://localhost:3000/examples/image-upload
- "썸네일 이미지 업로드" 섹션에서 이미지 선택
- 업로드 완료 대기

**2단계: URL 복사**

업로드가 완료되면 생성된 URL을 복사합니다:

```
https://elbkdmizaflfdigzxkxh.supabase.co/storage/v1/object/public/blog-images/thumbnails/1768367662381-xcruj5.png
```

**3단계: Front matter에 추가**

```yaml
thumbnail: 'https://elbkdmizaflfdigzxkxh.supabase.co/storage/v1/object/public/blog-images/thumbnails/1768367662381-xcruj5.png'
```

## 완전한 예시

### 썸네일이 있는 포스트

```markdown
---
title: 'Next.js 시작하기'
date: '2026-01-15'
description: 'Next.js 14 App Router를 사용한 블로그 만들기'
tags: ['Next.js', 'React', 'Tutorial']
draft: false
thumbnail: '/images/thumbnails/nextjs-tutorial.jpg'
---

# Next.js 시작하기

본문 내용...
```

### 썸네일이 없는 포스트

```markdown
---
title: 'Next.js 시작하기'
date: '2026-01-15'
description: 'Next.js 14 App Router를 사용한 블로그 만들기'
tags: ['Next.js', 'React', 'Tutorial']
draft: false
---

# Next.js 시작하기

본문 내용...
```

썸네일을 생략하면 포스트 카드에 이미지 없이 텍스트만 표시됩니다.

## 썸네일 표시 위치

썸네일은 다음 위치에서 표시됩니다:

1. **포스트 목록 페이지** (`/posts`)
   - 각 포스트 카드 상단에 표시
   - 16:9 비율로 자동 크롭

2. **홈페이지** (`/`)
   - 최근 포스트 섹션의 카드에 표시

3. **개별 포스트 페이지** (`/posts/[slug]`)
   - 현재는 표시되지 않음 (필요시 추가 가능)

## 권장 사항

### 이미지 크기

| 용도 | 크기 | 비율 |
|------|------|------|
| 기본 썸네일 | 800×450px | 16:9 |
| 고해상도 | 1200×675px | 16:9 |
| OG 이미지 겸용 | 1200×630px | 1.91:1 |

### 파일 포맷

1. **WebP**: 최고의 압축률 (권장)
2. **JPEG**: 사진에 적합
3. **PNG**: 투명 배경 필요 시

### 파일명 규칙

**좋은 예:**
```bash
public/images/thumbnails/2026-01-15-nextjs-tutorial.jpg
public/images/thumbnails/react-hooks-guide.webp
public/images/thumbnails/typescript-basics.jpg
```

**나쁜 예:**
```bash
public/images/thumbnails/IMG_1234.jpg  # ❌ 의미 없는 이름
public/images/thumbnails/스크린샷.png  # ❌ 한글 사용
public/images/thumbnails/Untitled.png  # ❌ 기본 이름
```

### 이미지 최적화

**온라인 도구:**
- [TinyPNG](https://tinypng.com/) - PNG/JPEG 압축
- [Squoosh](https://squoosh.app/) - 이미지 최적화 및 WebP 변환
- [ImageOptim](https://imageoptim.com/) - Mac용 이미지 최적화

**명령줄 도구:**
```bash
# WebP 변환 (cwebp 설치 필요)
cwebp -q 80 input.jpg -o output.webp

# ImageMagick으로 리사이즈
convert input.jpg -resize 1200x630^ -gravity center -extent 1200x630 output.jpg
```

## 디자인 팁

### 1. 일관된 스타일 유지

모든 썸네일을 같은 스타일로 만들면 블로그가 더 전문적으로 보입니다:

- 같은 비율 사용 (16:9 권장)
- 같은 색상 테마
- 같은 폰트 사용 (텍스트 오버레이 시)

### 2. 텍스트 오버레이

썸네일에 포스트 제목이나 주요 키워드를 추가하면 더 눈에 띕니다:

```
[배경 이미지]
+ [포스트 제목 텍스트]
+ [카테고리 또는 아이콘]
```

### 3. 고대비 색상 사용

텍스트가 있는 경우 배경과 대비가 높아야 읽기 쉽습니다.

### 4. 브랜딩 요소 추가

블로그 로고나 워터마크를 일관되게 추가하면 좋습니다.

## 트러블슈팅

### 썸네일이 표시되지 않음

**1. 경로 확인**

```yaml
# ✅ 올바른 경로
thumbnail: '/images/thumbnails/my-image.jpg'

# ❌ 잘못된 경로
thumbnail: 'images/thumbnails/my-image.jpg'  # 앞에 / 없음
thumbnail: '../public/images/thumbnails/my-image.jpg'  # 상대 경로
```

**2. 파일 존재 확인**

```bash
# 파일이 실제로 존재하는지 확인
ls public/images/thumbnails/
```

**3. 파일명 대소문자 확인**

Linux/Mac은 대소문자를 구분합니다:

```bash
# 파일명: MyImage.jpg
thumbnail: '/images/thumbnails/MyImage.jpg'  # ✅
thumbnail: '/images/thumbnails/myimage.jpg'  # ❌
```

### 이미지가 깨져 보임

**1. 이미지 크기 확인**

최소 800×450px 이상 사용하세요.

**2. 이미지 품질 확인**

과도하게 압축된 이미지는 화질이 떨어집니다.

**3. 적절한 포맷 사용**

- 사진: JPEG 또는 WebP
- 일러스트: PNG 또는 WebP

### Supabase 이미지가 표시되지 않음

**1. URL 확인**

전체 URL이 올바른지 확인:

```yaml
# ✅ 전체 URL
thumbnail: 'https://elbkdmizaflfdigzxkxh.supabase.co/storage/v1/object/public/blog-images/thumbnails/xxxxx.png'

# ❌ 상대 경로 사용 불가
thumbnail: '/blog-images/thumbnails/xxxxx.png'
```

**2. next.config.ts 확인**

Supabase 호스트가 등록되어 있는지 확인하고, 없으면 개발 서버를 재시작하세요.

**3. 버킷 권한 확인**

Supabase Dashboard에서 버킷이 public인지 확인하세요.

## 실전 예시

### 기술 블로그

```yaml
---
title: 'React Hooks 완벽 가이드'
thumbnail: '/images/thumbnails/react-hooks.jpg'
---
```

### 일상 블로그

```yaml
---
title: '제주도 여행 후기'
thumbnail: '/images/thumbnails/jeju-trip.jpg'
---
```

### 썸네일 없이 심플하게

```yaml
---
title: '짧은 생각'
# thumbnail 생략
---
```

## 참고 링크

- [이미지 사용 가이드](./markdown-images-guide.md)
- [Supabase Storage 설정](./supabase-storage-setup.md)
- [Next.js Image 최적화](https://nextjs.org/docs/app/building-your-application/optimizing/images)
