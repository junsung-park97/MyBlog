import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import remarkGfm from 'remark-gfm';
import remarkHtml from 'remark-html';

const projectsDirectory = path.join(process.cwd(), 'content/projects');

export interface ProjectMetadata {
  id: string;
  title: string;
  description: string;
  thumbnail?: string;
  order: number;
}

export interface ProjectData extends ProjectMetadata {
  content: string;
}

/**
 * 모든 프로젝트의 ID를 가져옵니다.
 */
export function getAllProjectIds(): string[] {
  if (!fs.existsSync(projectsDirectory)) {
    return [];
  }

  const fileNames = fs.readdirSync(projectsDirectory);
  return fileNames
    .filter((fileName) => fileName.endsWith('.md'))
    .map((fileName) => fileName.replace(/\.md$/, ''));
}

/**
 * ID로 프로젝트 데이터를 가져옵니다.
 */
export async function getProjectById(
  id: string
): Promise<ProjectData | null> {
  try {
    const fullPath = path.join(projectsDirectory, `${id}.md`);

    if (!fs.existsSync(fullPath)) {
      return null;
    }

    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const { data, content } = matter(fileContents);

    // 마크다운을 HTML로 변환
    const processedContent = await remark()
      .use(remarkGfm)
      .use(remarkHtml, { sanitize: false })
      .process(content);

    const contentHtml = processedContent.toString();

    return {
      id: data.id || id,
      title: data.title || '',
      description: data.description || '',
      thumbnail: data.thumbnail,
      order: data.order || 999,
      content: contentHtml,
    };
  } catch (error) {
    console.error(`Error reading project ${id}:`, error);
    return null;
  }
}

/**
 * 모든 프로젝트를 가져옵니다.
 */
export async function getAllProjects(): Promise<ProjectData[]> {
  const ids = getAllProjectIds();
  const projects = await Promise.all(ids.map((id) => getProjectById(id)));

  return projects
    .filter((project): project is ProjectData => project !== null)
    .sort((a, b) => a.order - b.order);
}
