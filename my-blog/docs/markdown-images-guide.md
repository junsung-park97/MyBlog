# 마크다운에서 이미지 사용하기

## 기본 문법

```markdown
![대체 텍스트](이미지 경로)
```

## 방법 1: 정적 이미지 (권장)

### 장점
- 가장 간단함
- Git으로 버전 관리
- 빌드 시 함께 배포
- 별도 설정 불필요

### 사용 방법

1. **이미지 저장**
   ```bash
   public/images/posts/my-image.jpg
   ```

2. **마크다운에서 참조**
   ```markdown
   ![설명](/images/posts/my-image.jpg)
   ```

### 예시

```markdown
---
title: '내 블로그 포스트'
date: '2026-01-14'
---

# 제목

본문 내용...

![스크린샷](/images/posts/screenshot.jpg)

더 많은 내용...
```

## 방법 2: Supabase Storage

### 장점
- 대용량 파일 지원
- Git 저장소 크기 증가 없음
- 동적 관리 가능

### 사용 방법

1. **이미지 업로드**
   - 개발 서버: http://localhost:3000/examples/image-upload
   - "포스트 이미지 업로드" 선택

2. **URL 복사**
   - 업로드 완료 후 표시된 마크다운 코드 복사

3. **마크다운에 붙여넣기**
   ```markdown
   ![업로드 이미지](https://elbkdmizaflfdigzxkxh.supabase.co/storage/v1/object/public/blog-images/posts/xxxxx.png)
   ```

## 이미지 크기 조절

### HTML 사용

```html
<img src="/images/posts/example.jpg" alt="설명" width="600" />
```

### 중앙 정렬

```html
<div style="text-align: center;">
  <img src="/images/posts/example.jpg" alt="설명" width="600" />
</div>
```

## 권장 사항

### 파일명 규칙

- **좋은 예**: `network-diagram.jpg`, `2026-01-14-screenshot.png`
- **나쁜 예**: `스크린샷.jpg`, `IMG_1234.jpg`, `Pasted image.png`

### 파일 크기

- 썸네일: 400×300px 이하
- 본문 이미지: 800×600px ~ 1200×900px
- 파일 크기: 가능하면 1MB 이하

### 파일 포맷

1. **WebP**: 최고 (압축률 좋음)
2. **JPEG**: 사진에 적합
3. **PNG**: 스크린샷, 투명 배경 필요 시
4. **GIF**: 애니메이션

### Alt 텍스트

```markdown
<!-- ❌ 나쁜 예 -->
![이미지](/images/posts/diagram.jpg)

<!-- ✅ 좋은 예 -->
![OSI 7계층 네트워크 구조 다이어그램](/images/posts/diagram.jpg)
```

## 트러블슈팅

### 이미지가 표시되지 않음

1. **경로 확인**
   - 절대 경로로 시작: `/images/posts/...`
   - 상대 경로 사용 금지: `../images/...` (❌)

2. **파일 존재 확인**
   ```bash
   ls public/images/posts/
   ```

3. **파일명 확인**
   - 대소문자 정확히 일치
   - 공백 없음
   - 특수문자 없음

### Supabase 이미지가 표시되지 않음

1. **URL 확인**
   - `https://`로 시작하는 전체 URL 사용
   - 버킷이 public인지 확인

2. **next.config.ts 확인**
   - Supabase 호스트가 등록되어 있는지 확인

3. **개발 서버 재시작**
   - next.config.ts 변경 후 필수

## 실전 예시

### 코드와 함께

```markdown
다음은 네트워크 계층 구조입니다:

![OSI 7계층](/images/posts/osi-layers.png)

위 다이어그램에서 볼 수 있듯이...
```

### 여러 이미지

```markdown
## Before

![변경 전](/images/posts/before.jpg)

## After

![변경 후](/images/posts/after.jpg)
```

### 캡션 추가

```markdown
![스크린샷](/images/posts/screenshot.jpg)
*그림 1: 데이터베이스 설계 다이어그램*
```

## 참고 링크

- [이미지 업로드 가이드](./image-usage.md)
- [Supabase Storage 설정](./supabase-storage-setup.md)
