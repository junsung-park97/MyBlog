# 정적 이미지 디렉토리

이 디렉토리는 빌드 시 포함되는 정적 이미지 파일을 저장합니다.

## 디렉토리 구조

```
images/
├── posts/        # 블로그 포스트 본문 이미지
├── thumbnails/   # 포스트 썸네일 이미지
├── og-images/    # Open Graph 소셜 미디어 이미지
└── avatars/      # 프로필/아바타 이미지
```

## 사용 방법

### 마크다운에서

```markdown
![대체 텍스트](/images/posts/example.jpg)
```

### React 컴포넌트에서

```tsx
import OptimizedImage from '@/components/atoms/optimized-image';

<OptimizedImage
  src="/images/posts/example.jpg"
  alt="설명"
  width={800}
  height={600}
/>
```

## 파일 명명 규칙

- **날짜 포함**: `YYYY-MM-DD-descriptive-name.jpg`
- **소문자 사용**: `my-blog-post.jpg` (✅) vs `MyBlogPost.jpg` (❌)
- **하이픈 사용**: `my-image.jpg` (✅) vs `my_image.jpg` (❌)

## 이미지 최적화

- **권장 포맷**: WebP > JPEG > PNG
- **최대 파일 크기**: 5MB 이하
- **권장 크기**:
  - 썸네일: 400×300px
  - 포스트 이미지: 800×600px 또는 1200×900px
  - OG 이미지: 1200×630px
  - 아바타: 200×200px

## 주의사항

1. 이미지는 빌드 시 번들에 포함되므로 파일 크기에 주의하세요.
2. 자주 변경되는 이미지는 Supabase Storage 사용을 권장합니다.
3. 저작권이 있는 이미지는 반드시 라이선스를 확인하세요.

## 더 알아보기

자세한 이미지 사용 가이드는 `docs/image-usage.md`를 참고하세요.
