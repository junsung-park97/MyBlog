import Link from 'next/link';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-gray-200 bg-gray-50 dark:border-gray-800 dark:bg-gray-950">
      <div className="container mx-auto max-w-6xl px-4 py-8">
        <div className="grid grid-cols-1 gap-8 md:flex justify-between">
          <div>
            <h3 className="mb-4 text-lg font-bold text-gray-900 dark:text-gray-100">
              MyBlog
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              개인/기술 블로그 플랫폼
            </p>
            <div className="pt-4 text-center text-sm text-gray-600 dark:border-gray-800 dark:text-gray-400">
              <p>© {currentYear} MyBlog. All rights reserved.</p>
            </div>
          </div>
          <div>
            <h4 className="mb-4 text-sm font-semibold text-gray-900 dark:text-gray-100">
              Links
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  href="/posts"
                  className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100"
                >
                  Posts
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100"
                >
                  About Me
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="mb-4 text-sm font-semibold text-gray-900 dark:text-gray-100">
              Social
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a
                  href="https://github.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100"
                >
                  GitHub
                </a>
              </li>
              <li>
                <a
                  href="https://twitter.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100"
                >
                  Twitter
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}
