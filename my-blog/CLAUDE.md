# CLAUDE.md

이 파일은 Claude Code가 이 리포지토리에서 작업할 때 따라야 할 지침을 제공합니다.

## 프로젝트 개요

**프로젝트명**: [블로그 이름]
**목적**: 개인/기술 블로그 플랫폼
**타입**: 정적 사이트 생성기 기반 블로그

## 기술 스택

### 프레임워크 및 라이브러리

- **프레임워크**: Next.js 14+ (App Router)
- **언어**: TypeScript
- **데이터베이스**: Supabase (PostgreSQL)
- **스타일링**: Tailwind CSS / CSS Modules
- **마크다운 처리**: remark, rehype
- **배포**: Vercel / Netlify / GitHub Pages

### 개발 도구
- **패키지 매니저**: npm
- **린터**: ESLint
- **포맷터**: Prettier
- **타입 체커**: TypeScript

## 프로젝트 구조

```text
/
├── src/
│   ├── app/              # Next.js App Router 페이지
│   ├── components/       # 재사용 가능한 컴포넌트
│   ├── lib/              # 유틸리티 함수
│   │   ├── supabase/     # Supabase 클라이언트 및 유틸
│   │   └── utils/        # 일반 유틸리티
│   └── styles/           # 전역 스타일
├── content/
│   └── posts/            # 블로그 포스트 (Markdown)
├── supabase/
│   ├── migrations/       # 데이터베이스 마이그레이션
│   └── seed.sql          # 초기 데이터
├── public/               # 정적 파일
└── tests/                # 테스트 파일
```

## 코딩 컨벤션

### TypeScript/JavaScript
- **명명 규칙**:
  - 컴포넌트: PascalCase (`BlogPost.tsx`)
  - 함수/변수: camelCase (`formatDate()`)
  - 상수: UPPER_SNAKE_CASE (`MAX_POST_LENGTH`)
  - 파일명: kebab-case (`blog-post-list.tsx`)

- **코드 스타일**:
  - 세미콜론 사용
  - 싱글 쿼트 우선
  - 2칸 들여쓰기
  - 화살표 함수 우선
  - async/await 사용 (Promise.then 지양)

### React 컴포넌트
- 함수형 컴포넌트만 사용
- Props 타입은 항상 명시
- 하나의 컴포넌트당 하나의 파일
- Hooks는 컴포넌트 상단에 선언
- 
```typescript
// 좋은 예
interface BlogPostProps {
  title: string;
  date: Date;
  content: string;
}

export default function BlogPost({ title, date, content }: BlogPostProps) {
  // ...
}
```

### CSS/Tailwind
- 유틸리티 클래스 우선 사용
- 커스텀 클래스는 `@apply` 사용
- 모바일 퍼스트 디자인

## 콘텐츠 관리

### 블로그 포스트 형식
- **위치**: `content/posts/`
- **파일명**: `YYYY-MM-DD-title-slug.md`
- **Front Matter 필수 필드**:
```yaml
  ---
  title: "포스트 제목"
  date: "2024-01-12"
  description: "포스트 설명"
  tags: ["tag1", "tag2"]
  draft: false
  ---
```

## Supabase 데이터베이스

### 환경 변수 설정

프로젝트 루트에 `.env.local` 파일 생성:

```bash
NEXT_PUBLIC_SUPABASE_URL=your-project-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
```

### Supabase 클라이언트 설정

**1. 클라이언트 컴포넌트용**

```typescript
// src/lib/supabase/client.ts
import { createBrowserClient } from '@supabase/ssr';

export function createClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
}
```

**2. 서버 컴포넌트용**

```typescript
// src/lib/supabase/server.ts
import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';

export async function createClient() {
  const cookieStore = await cookies();

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            );
          } catch {}
        },
      },
    }
  );
}
```

**3. Route Handler용**

```typescript
// src/lib/supabase/route.ts
import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';

export async function createClient() {
  const cookieStore = await cookies();

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) => {
            cookieStore.set(name, value, options);
          });
        },
      },
    }
  );
}
```

### 데이터베이스 스키마 예시

```sql
-- supabase/migrations/20260112000000_initial_schema.sql

-- 블로그 포스트 테이블
create table posts (
  id uuid default gen_random_uuid() primary key,
  title text not null,
  slug text unique not null,
  content text not null,
  description text,
  thumbnail text,
  published boolean default false,
  view_count integer default 0,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null,
  author_id uuid references auth.users not null
);

-- 태그 테이블
create table tags (
  id uuid default gen_random_uuid() primary key,
  name text unique not null,
  slug text unique not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 포스트-태그 관계 테이블
create table post_tags (
  post_id uuid references posts on delete cascade,
  tag_id uuid references tags on delete cascade,
  primary key (post_id, tag_id)
);

-- 댓글 테이블
create table comments (
  id uuid default gen_random_uuid() primary key,
  post_id uuid references posts on delete cascade not null,
  user_id uuid references auth.users not null,
  content text not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 인덱스 생성
create index posts_slug_idx on posts(slug);
create index posts_published_idx on posts(published);
create index posts_created_at_idx on posts(created_at desc);
create index comments_post_id_idx on comments(post_id);

-- Row Level Security (RLS) 활성화
alter table posts enable row level security;
alter table tags enable row level security;
alter table post_tags enable row level security;
alter table comments enable row level security;

-- RLS 정책
create policy "공개된 포스트는 모두 볼 수 있음"
  on posts for select
  using (published = true);

create policy "작성자는 자신의 포스트를 관리할 수 있음"
  on posts for all
  using (auth.uid() = author_id);

create policy "모든 사용자는 태그를 볼 수 있음"
  on tags for select
  using (true);

create policy "인증된 사용자는 댓글을 작성할 수 있음"
  on comments for insert
  with check (auth.uid() = user_id);

create policy "댓글 작성자는 자신의 댓글을 수정/삭제할 수 있음"
  on comments for all
  using (auth.uid() = user_id);
```

### TypeScript 타입 생성

```bash
# Supabase CLI로 타입 자동 생성
npx supabase gen types typescript --project-id your-project-id > src/lib/supabase/database.types.ts
```

```typescript
// src/lib/supabase/types.ts
import { Database } from './database.types';

export type Post = Database['public']['Tables']['posts']['Row'];
export type PostInsert = Database['public']['Tables']['posts']['Insert'];
export type PostUpdate = Database['public']['Tables']['posts']['Update'];

export type Tag = Database['public']['Tables']['tags']['Row'];
export type Comment = Database['public']['Tables']['comments']['Row'];
```

### 데이터 페칭 패턴

**서버 컴포넌트에서 데이터 조회**

```typescript
// app/posts/page.tsx
import { createClient } from '@/lib/supabase/server';

export default async function PostsPage() {
  const supabase = await createClient();

  const { data: posts, error } = await supabase
    .from('posts')
    .select(`
      *,
      tags:post_tags(
        tag:tags(*)
      )
    `)
    .eq('published', true)
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching posts:', error);
    return <div>포스트를 불러오는데 실패했습니다.</div>;
  }

  return (
    <div>
      {posts?.map((post) => (
        <PostCard key={post.id} post={post} />
      ))}
    </div>
  );
}
```

**ISR과 함께 사용**

```typescript
// app/posts/[slug]/page.tsx
import { createClient } from '@/lib/supabase/server';

export const revalidate = 3600; // 1시간마다 재생성

export async function generateStaticParams() {
  const supabase = await createClient();
  const { data: posts } = await supabase
    .from('posts')
    .select('slug')
    .eq('published', true);

  return posts?.map((post) => ({ slug: post.slug })) ?? [];
}

export default async function PostPage({
  params,
}: {
  params: { slug: string };
}) {
  const supabase = await createClient();

  const { data: post } = await supabase
    .from('posts')
    .select('*, tags:post_tags(tag:tags(*))')
    .eq('slug', params.slug)
    .eq('published', true)
    .single();

  if (!post) {
    return <div>포스트를 찾을 수 없습니다.</div>;
  }

  return <PostContent post={post} />;
}
```

**클라이언트 컴포넌트에서 실시간 구독**

```typescript
'use client';

import { createClient } from '@/lib/supabase/client';
import { useEffect, useState } from 'react';

export default function RealtimeComments({ postId }: { postId: string }) {
  const [comments, setComments] = useState<Comment[]>([]);
  const supabase = createClient();

  useEffect(() => {
    // 초기 데이터 로드
    supabase
      .from('comments')
      .select('*')
      .eq('post_id', postId)
      .then(({ data }) => setComments(data ?? []));

    // 실시간 구독
    const channel = supabase
      .channel('comments')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'comments',
          filter: `post_id=eq.${postId}`,
        },
        (payload) => {
          if (payload.eventType === 'INSERT') {
            setComments((prev) => [...prev, payload.new as Comment]);
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [postId, supabase]);

  return (
    <div>
      {comments.map((comment) => (
        <CommentItem key={comment.id} comment={comment} />
      ))}
    </div>
  );
}
```

### 인증 구현

```typescript
// app/auth/callback/route.ts
import { createClient } from '@/lib/supabase/route';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const code = searchParams.get('code');

  if (code) {
    const supabase = await createClient();
    await supabase.auth.exchangeCodeForSession(code);
  }

  return NextResponse.redirect(new URL('/', request.url));
}
```

```typescript
// components/auth/login-button.tsx
'use client';

import { createClient } from '@/lib/supabase/client';

export default function LoginButton() {
  const supabase = createClient();

  const handleLogin = async () => {
    await supabase.auth.signInWithOAuth({
      provider: 'github',
      options: {
        redirectTo: `${location.origin}/auth/callback`,
      },
    });
  };

  return <button onClick={handleLogin}>GitHub로 로그인</button>;
}
```

### Storage 사용 (이미지 업로드)

```typescript
// app/api/upload/route.ts
import { createClient } from '@/lib/supabase/route';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const supabase = await createClient();
  const formData = await request.formData();
  const file = formData.get('file') as File;

  const fileName = `${Date.now()}-${file.name}`;
  const { data, error } = await supabase.storage
    .from('post-images')
    .upload(fileName, file);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  const { data: { publicUrl } } = supabase.storage
    .from('post-images')
    .getPublicUrl(fileName);

  return NextResponse.json({ url: publicUrl });
}
```

## 개발 워크플로우

### 주요 명령어

**Next.js 개발**

```bash
npm run dev          # 개발 서버 시작 (localhost:3000)
npm run build        # 프로덕션 빌드
npm run start        # 빌드된 앱 실행
npm run lint         # ESLint 실행
npm run format       # Prettier 실행
npm test            # 테스트 실행
```

**Supabase 개발**

```bash
# Supabase 로컬 개발 환경 시작
npx supabase start

# Supabase 로컬 개발 환경 중지
npx supabase stop

# 새 마이그레이션 생성
npx supabase migration new migration_name

# 마이그레이션 적용
npx supabase db push

# 데이터베이스 리셋 (로컬)
npx supabase db reset

# TypeScript 타입 생성
npx supabase gen types typescript --project-id your-project-id > src/lib/supabase/database.types.ts

# 원격 DB와 로컬 연동
npx supabase link --project-ref your-project-ref

# 원격 DB 마이그레이션 상태 확인
npx supabase migration list
```

### Git 컨벤션
- **브랜치 전략**: main (프로덕션), develop (개발)
- **커밋 메시지 형식**:
```
  <type>: <subject>
  
  <body>
```
  - Types: feat, fix, docs, style, refactor, test, chore

### 예시
```
feat: 블로그 포스트 목록 컴포넌트 추가

- PostList 컴포넌트 구현
- 페이지네이션 기능 추가
- 반응형 그리드 레이아웃 적용
```

## 아키텍처 패턴

### 컴포넌트 구조
- **Atomic Design** 패턴 참고:
  - atoms: Button, Input, Text 등
  - molecules: SearchBar, PostCard 등
  - organisms: Header, PostList 등
  - templates: PageLayout 등

### 데이터 흐름
- 서버 컴포넌트 우선 사용 (Next.js App Router)
- 클라이언트 상태: useState, useReducer
- 전역 상태: Zustand (필요시)

### 렌더링 전략 (SSR/SSG/ISR)

#### Next.js App Router 기반 렌더링 구조

**1. Server Components (기본값)**
- 모든 컴포넌트는 기본적으로 Server Component
- 데이터 페칭, 직접 DB 접근 가능
- 번들 사이즈 감소, 초기 로딩 성능 향상
- `use client` 지시어 없는 모든 컴포넌트

```typescript
// app/posts/[slug]/page.tsx (Server Component)
export default async function PostPage({ params }: { params: { slug: string } }) {
  const post = await getPost(params.slug); // 서버에서 직접 데이터 페칭
  return <PostContent post={post} />;
}
```

**2. Client Components**
- `'use client'` 지시어로 명시
- 인터렉티브 UI, 이벤트 핸들러, useState/useEffect 사용 시
- 브라우저 API 접근 필요 시

```typescript
// components/search-bar.tsx
'use client';

import { useState } from 'react';

export default function SearchBar() {
  const [query, setQuery] = useState('');
  // 클라이언트 인터랙션 로직
}
```

**3. 렌더링 전략 선택**

| 전략 | 사용 시기 | 구현 방법 |
|------|----------|-----------|
| **SSG (Static Site Generation)** | 블로그 포스트, About 페이지 등 정적 콘텐츠 | `generateStaticParams()` 사용 |
| **SSR (Server-Side Rendering)** | 동적 데이터, 사용자별 콘텐츠 | 기본 동작 (fetch 캐싱 없음) |
| **ISR (Incremental Static Regeneration)** | 주기적 업데이트 필요한 콘텐츠 | `revalidate` 옵션 설정 |

**4. 데이터 페칭 패턴**

```typescript
// SSG: 빌드 타임에 정적 생성
export async function generateStaticParams() {
  const posts = await getAllPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

// ISR: 10분마다 재생성
export const revalidate = 600;

export async function getPosts() {
  const res = await fetch('https://api.example.com/posts', {
    next: { revalidate: 600 }
  });
  return res.json();
}

// SSR: 요청마다 새로운 데이터
export async function getDynamicData() {
  const res = await fetch('https://api.example.com/data', {
    cache: 'no-store'
  });
  return res.json();
}
```

**5. 렌더링 경계 설정 원칙**

- **Server Component 우선**: 가능한 모든 컴포넌트를 Server Component로 유지
- **Client Component 최소화**: 인터랙티브 부분만 Client Component로 분리
- **Leaf 노드 패턴**: Client Component를 트리의 말단에 배치

```typescript
// ✅ 좋은 예: Client Component를 하위에 배치
// app/posts/page.tsx (Server Component)
import PostList from './post-list'; // Server Component
import SearchBar from './search-bar'; // Client Component

export default async function PostsPage() {
  const posts = await getPosts(); // 서버에서 데이터 페칭

  return (
    <div>
      <SearchBar /> {/* Client Component */}
      <PostList posts={posts} /> {/* Server Component */}
    </div>
  );
}
```

**6. 하이브리드 렌더링 전략**

```typescript
// app/blog/page.tsx
// 메인 포스트 목록: SSG (빌드 타임)
export async function generateStaticParams() {
  return [{ category: 'tech' }, { category: 'life' }];
}

export const revalidate = 3600; // 1시간마다 ISR

export default async function BlogPage({
  params,
  searchParams
}: {
  params: { category: string };
  searchParams: { page?: string };
}) {
  // 정적 데이터 (ISR)
  const posts = await getPosts(params.category);

  // 동적 데이터 (SSR)
  const recentComments = await getRecentComments({
    cache: 'no-store'
  });

  return (
    <>
      <PostList posts={posts} /> {/* 정적 */}
      <CommentSection comments={recentComments} /> {/* 동적 */}
      <LikeButton /> {/* Client Component */}
    </>
  );
}
```

**7. 메타데이터 생성 (SEO)**

```typescript
// 정적 메타데이터
export const metadata = {
  title: '블로그',
  description: '기술 블로그'
};

// 동적 메타데이터
export async function generateMetadata({ params }: { params: { slug: string } }) {
  const post = await getPost(params.slug);

  return {
    title: post.title,
    description: post.description,
    openGraph: {
      images: [post.thumbnail],
    },
  };
}
```

## 성능 최적화

- 이미지는 Next.js Image 컴포넌트 사용
- 코드 스플리팅 활용
- 메타데이터 SEO 최적화
- Lighthouse 점수 90점 이상 유지

## 테스트 전략

- **단위 테스트**: Jest + React Testing Library
- **E2E 테스트**: Playwright (선택사항)
- 컴포넌트는 최소 1개 이상의 테스트 작성
- 중요 유틸리티 함수는 테스트 필수

## 배포

- **플랫폼**: Vercel
- **자동 배포**: main 브랜치 푸시 시
- **환경 변수**: `.env.local` (gitignore에 포함)

## 주의사항

1. **보안**
   - API 키는 절대 커밋하지 않음
   - 환경 변수는 `.env.example` 템플릿만 제공

2. **접근성**
   - 시맨틱 HTML 사용
   - ARIA 레이블 적절히 사용
   - 키보드 네비게이션 지원

3. **SEO**
   - 모든 페이지에 메타 태그 설정
   - sitemap.xml, robots.txt 생성
   - Open Graph 이미지 설정

## 참고 자료

- [Next.js 공식 문서](https://nextjs.org/docs)
- [Supabase 공식 문서](https://supabase.com/docs)
- [Supabase with Next.js](https://supabase.com/docs/guides/getting-started/quickstarts/nextjs)
- [Tailwind CSS 공식 문서](https://tailwindcss.com/docs)
- [TypeScript 핸드북](https://www.typescriptlang.org/docs/)

---

**마지막 업데이트**: 2026-01-12