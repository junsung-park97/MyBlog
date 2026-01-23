import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { unified } from 'unified';
import remarkParse from 'remark-parse';
import remarkGfm from 'remark-gfm';
import remarkRehype from 'remark-rehype';
import rehypeHighlight from 'rehype-highlight';
import rehypeStringify from 'rehype-stringify';
import { all } from 'lowlight';

const postsDirectory = path.join(process.cwd(), 'content/posts');
const aboutDirectory = path.join(process.cwd(), 'content/about');

export interface PostMetadata {
  title: string;
  date: string;
  description: string;
  tags: string[];
  draft: boolean;
  thumbnail?: string;
  project?: string;
}

export interface PostData extends PostMetadata {
  slug: string;
  content: string;
}

/**
 * 모든 포스트의 slug를 가져옵니다.
 */
export function getAllPostSlugs(): string[] {
  if (!fs.existsSync(postsDirectory)) {
    return [];
  }

  const fileNames = fs.readdirSync(postsDirectory);
  return fileNames
    .filter((fileName) => fileName.endsWith('.md'))
    .map((fileName) => fileName.replace(/\.md$/, ''));
}

/**
 * slug로 포스트 데이터를 가져옵니다.
 */
export async function getPostBySlug(slug: string): Promise<PostData | null> {
  try {
    const fullPath = path.join(postsDirectory, `${slug}.md`);

    if (!fs.existsSync(fullPath)) {
      return null;
    }

    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const { data, content } = matter(fileContents);

    // 마크다운을 HTML로 변환
    const processedContent = await unified()
      .use(remarkParse)
      .use(remarkGfm)
      .use(remarkRehype)
      .use(rehypeHighlight, { languages: all })
      .use(rehypeStringify)
      .process(content);

    const contentHtml = processedContent.toString();

    return {
      slug,
      title: data.title || '',
      date: data.date || '',
      description: data.description || '',
      tags: data.tags || [],
      draft: data.draft || false,
      thumbnail: data.thumbnail,
      project: data.project,
      content: contentHtml,
    };
  } catch (error) {
    console.error(`Error reading post ${slug}:`, error);
    return null;
  }
}

/**
 * 모든 포스트를 가져옵니다.
 */
export async function getAllPosts(): Promise<PostData[]> {
  const slugs = getAllPostSlugs();
  const posts = await Promise.all(
    slugs.map((slug) => getPostBySlug(slug))
  );

  return posts
    .filter((post): post is PostData => post !== null && !post.draft)
    .sort((a, b) => (a.date > b.date ? -1 : 1));
}

/**
 * 최근 포스트를 가져옵니다.
 */
export async function getRecentPosts(limit = 3): Promise<PostData[]> {
  const allPosts = await getAllPosts();
  return allPosts.slice(0, limit);
}

/**
 * 특정 프로젝트의 포스트를 가져옵니다.
 */
export async function getPostsByProject(
  projectId: string
): Promise<PostData[]> {
  const allPosts = await getAllPosts();
  return allPosts.filter((post) => post.project === projectId);
}

/**
 * 특정 프로젝트의 포스트를 페이지네이션하여 가져옵니다.
 */
export async function getPostsByProjectPaginated(
  projectId: string,
  page: number = 1,
  limit: number = 5
): Promise<{ posts: PostData[]; hasMore: boolean; total: number }> {
  const allProjectPosts = await getPostsByProject(projectId);
  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + limit;
  const posts = allProjectPosts.slice(startIndex, endIndex);
  const hasMore = endIndex < allProjectPosts.length;

  return {
    posts,
    hasMore,
    total: allProjectPosts.length,
  };
}

export interface AdjacentPost {
  slug: string;
  title: string;
}

export interface AdjacentPosts {
  prevPost: AdjacentPost | null;
  nextPost: AdjacentPost | null;
}

/**
 * 같은 프로젝트 내에서 이전/다음 포스트를 가져옵니다.
 */
export async function getAdjacentPosts(
  slug: string,
  projectId: string
): Promise<AdjacentPosts> {
  const projectPosts = await getPostsByProject(projectId);

  // 날짜순 정렬 (최신순)
  const sortedPosts = projectPosts.sort((a, b) =>
    a.date > b.date ? -1 : 1
  );

  const currentIndex = sortedPosts.findIndex((post) => post.slug === slug);

  if (currentIndex === -1) {
    return { prevPost: null, nextPost: null };
  }

  // 이전글 = 더 최신 글 (인덱스가 작은 쪽)
  // 다음글 = 더 오래된 글 (인덱스가 큰 쪽)
  const prevPost =
    currentIndex > 0
      ? { slug: sortedPosts[currentIndex - 1].slug, title: sortedPosts[currentIndex - 1].title }
      : null;

  const nextPost =
    currentIndex < sortedPosts.length - 1
      ? { slug: sortedPosts[currentIndex + 1].slug, title: sortedPosts[currentIndex + 1].title }
      : null;

  return { prevPost, nextPost };
}

export interface AboutPageData {
  title: string;
  description: string;
  content: string;
}

/**
 * About 페이지 데이터를 가져옵니다.
 */
export async function getAboutPage(): Promise<AboutPageData | null> {
  try {
    const fullPath = path.join(aboutDirectory, 'about.md');

    if (!fs.existsSync(fullPath)) {
      return null;
    }

    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const { data, content } = matter(fileContents);

    // 마크다운을 HTML로 변환
    const processedContent = await unified()
      .use(remarkParse)
      .use(remarkGfm)
      .use(remarkRehype)
      .use(rehypeHighlight, { languages: all })
      .use(rehypeStringify)
      .process(content);

    const contentHtml = processedContent.toString();

    return {
      title: data.title || 'About',
      description: data.description || '',
      content: contentHtml,
    };
  } catch (error) {
    console.error('Error reading about page:', error);
    return null;
  }
}
