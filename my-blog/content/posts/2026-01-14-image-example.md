---
title: '이미지 사용 예시'
date: '2026-01-14'
description: '마크다운에서 이미지를 사용하는 방법'
tags: ['Mate-trip', 'Images']
project: 'Mate-trip'
draft: false
thumbnail: '/images/thumbnails/image-tutorial.jpg'
---

# 마크다운에서 이미지 사용하기

이 포스트는 마크다운 파일에서 이미지를 사용하는 방법을 설명합니다.

## 방법 1: 정적 이미지 (권장)

`public/images/posts/` 폴더에 이미지 파일을 넣고 상대 경로로 참조합니다.

### 사용법

```markdown
![이미지 설명](/images/posts/example.jpg)
```

### 장점

- 빌드 시 함께 배포됨
- Git으로 버전 관리 가능
- 별도 업로드 과정 불필요

### 추천 시나리오

- 블로그 포스트의 스크린샷
- 고정된 다이어그램
- 로고나 아이콘

## 방법 2: Supabase Storage 이미지

동적으로 업로드한 이미지는 전체 URL을 사용합니다.

### 사용법

1. `/examples/image-upload` 페이지에서 이미지 업로드
2. 생성된 URL을 복사
3. 마크다운에 붙여넣기:

```markdown
![업로드된 이미지](https://elbkdmizaflfdigzxkxh.supabase.co/storage/v1/object/public/blog-images/posts/1768366166648-m90c2e.png)
```

### 장점

- 큰 파일도 저장 가능
- 사용자가 업로드한 이미지 관리
- Git 저장소 크기가 커지지 않음

### 추천 시나리오

- 사용자가 업로드한 이미지
- 자주 변경되는 이미지
- 매우 큰 파일

## 이미지 크기 조절

마크다운 자체로는 크기 조절이 어렵지만, HTML을 직접 사용할 수 있습니다:

```html
<img src="/images/posts/example.jpg" alt="설명" width="400" />
```

## 실제 예시

아래는 정적 이미지 예시입니다 (파일이 있다면 표시됨):

![예시 이미지](/images/posts/example.jpg)

## 주의사항

1. **파일 이름 규칙**: 영문, 숫자, 하이픈(-), 언더스코어(\_)만 사용
2. **권장 포맷**: WebP > JPEG > PNG
3. **파일 크기**: 가능하면 1MB 이하로 최적화
4. **Alt 텍스트**: 접근성을 위해 항상 작성

## 참고

자세한 이미지 사용 가이드는 `docs/image-usage.md`를 확인하세요.
