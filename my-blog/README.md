# MyBlog

개인/기술 블로그 플랫폼 - Next.js 16, Supabase, TypeScript, Tailwind CSS로 구축

## 기술 스택

- **Framework**: Next.js 16 (App Router)
- **Database**: Supabase (PostgreSQL)
- **Language**: TypeScript
- **Styling**: Tailwind CSS 4
- **Markdown**: remark, rehype

## 시작하기

### 1. 의존성 설치

```bash
npm install
```

### 2. 환경 변수 설정

`.env.example` 파일을 복사하여 `.env.local` 파일을 생성하고 Supabase 정보를 입력하세요:

```bash
cp .env.example .env.local
```

### 3. Supabase 설정

```bash
# Supabase 로컬 환경 시작
npx supabase start

# 마이그레이션 적용
npx supabase db push
```

### 4. 개발 서버 실행

```bash
npm run dev
```

브라우저에서 [http://localhost:3000](http://localhost:3000)을 열어 확인하세요.

## 주요 명령어

```bash
npm run dev          # 개발 서버 시작
npm run build        # 프로덕션 빌드
npm run start        # 프로덕션 서버 시작
npm run lint         # ESLint 실행
npm run format       # Prettier로 코드 포맷팅
```

## 프로젝트 구조

```text
my-blog/
├── src/
│   ├── app/              # Next.js App Router 페이지
│   ├── components/       # 재사용 가능한 컴포넌트
│   ├── lib/
│   │   ├── supabase/     # Supabase 클라이언트
│   │   └── utils/        # 유틸리티 함수
│   └── styles/           # 전역 스타일
├── content/
│   └── posts/            # 마크다운 블로그 포스트
├── supabase/
│   ├── migrations/       # 데이터베이스 마이그레이션
│   └── seed.sql          # 초기 데이터
└── public/               # 정적 파일
```

## 블로그 포스트 작성

`content/posts/` 디렉토리에 마크다운 파일을 생성하세요:

```markdown
---
title: "포스트 제목"
date: "2026-01-12"
description: "포스트 설명"
tags: ["tag1", "tag2"]
draft: false
---

포스트 내용을 여기에 작성하세요.
```

## 배포

### Vercel

Vercel에 배포하는 가장 쉬운 방법:

1. GitHub 레포지토리에 푸시
2. [Vercel](https://vercel.com/new)에서 Import
3. 환경 변수 설정
4. 배포

## 문서

더 자세한 정보는 `CLAUDE.md` 파일을 참조하세요.

## 라이선스

MIT

