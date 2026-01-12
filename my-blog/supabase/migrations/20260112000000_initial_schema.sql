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
