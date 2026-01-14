import Button from '@/components/atoms/button';

export default function NotFound() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 dark:bg-gray-950">
      <div className="text-center">
        <h1 className="mb-4 text-6xl font-bold text-gray-900 dark:text-gray-100">
          404
        </h1>
        <h2 className="mb-4 text-2xl font-semibold text-gray-700 dark:text-gray-300">
          포스트를 찾을 수 없습니다
        </h2>
        <p className="mb-8 text-gray-600 dark:text-gray-400">
          요청하신 포스트가 존재하지 않거나 삭제되었습니다.
        </p>
        <Button href="/" variant="primary" size="lg">
          홈으로 돌아가기
        </Button>
      </div>
    </div>
  );
}
