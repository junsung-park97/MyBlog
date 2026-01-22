import ProjectCard from '@/components/molecules/project-card';
import PostList from '@/components/organisms/post-list';
import Button from '@/components/atoms/button';
import { getRecentPosts } from '@/lib/utils/markdown';
import { getAllProjects } from '@/lib/utils/projects';

// ISR: 30분마다 재생성
export const revalidate = 1800;

export default async function Home() {
  const projects = await getAllProjects();
  const recentPosts = await getRecentPosts(3);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      {/* Hero Section */}
      <section className="mx-24 border-b border-gray-200 dark:border-gray-800 dark:">
        <div className="container mx-auto max-w-6xl px-4 py-16 md:py-24">
          <h1 className="mb-4 text-4xl font-bold text-gray-900 dark:text-gray-100 md:text-5xl lg:text-6xl">
            반갑습니다 🙇🏻‍♂️
          </h1>
          <p className="mb-8 max-w-2xl text-sm text-gray-600 dark:text-gray-400 md:text-lg">
            개발과 회고에 대한 이야기를 나누는 공간입니다.
            <br />
            프로젝트별로 정리된 학습 내용과 경험을 공유합니다.
          </p>
          <div className="flex flex-wrap gap-4">
            <Button href="/about" variant="secondary" size="lg">
              About Me
            </Button>
            {/* <Button href="/about" variant="ghost" size="lg">
              저를 소개합니다 →
            </Button> */}
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section
        id="projects"
        className="container mx-auto max-w-6xl px-4 py-12 md:py-16"
      >
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
            PROJECT
          </h2>
          <p className="mt-2 text-gray-600 dark:text-gray-400">
            다양한 주제의 프로젝트를 진행하고 있습니다.
          </p>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {projects.map((project) => (
            <ProjectCard
              key={project.id}
              id={project.id}
              title={project.title}
              description={project.description}
              thumbnail={project.thumbnail}
            />
          ))}
        </div>
      </section>

      {/* Recent Posts Section */}
      <section className="container mx-auto max-w-6xl px-4 py-12 md:py-16">
        <div className="mb-8 flex items-center justify-between">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
            RECENT POSTS
          </h2>
          <Button href="/posts" variant="ghost">
            ALL →
          </Button>
        </div>
        <PostList posts={recentPosts} />
      </section>
    </div>
  );
}
