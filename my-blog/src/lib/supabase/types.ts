// Supabase 데이터베이스 타입 정의
// 실제 사용 시 다음 명령으로 자동 생성하세요:
// npx supabase gen types typescript --project-id your-project-id > src/lib/supabase/database.types.ts

// 임시 타입 정의 (실제 프로젝트에서는 자동 생성된 타입 사용)
export interface Post {
  id: string;
  title: string;
  slug: string;
  content: string;
  description: string | null;
  thumbnail: string | null;
  published: boolean;
  view_count: number;
  created_at: string;
  updated_at: string;
  author_id: string;
}

export interface Tag {
  id: string;
  name: string;
  slug: string;
  created_at: string;
}

export interface Comment {
  id: string;
  post_id: string;
  user_id: string;
  content: string;
  created_at: string;
  updated_at: string;
}

export interface PostTag {
  post_id: string;
  tag_id: string;
}
