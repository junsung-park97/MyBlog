interface MarkdownContentProps {
  content: string;
}

export default function MarkdownContent({ content }: MarkdownContentProps) {
  return (
    <article
      className="prose prose-gray max-w-none dark:prose-invert
        prose-h1:text-3xl
        prose-headings:font-bold prose-headings:text-gray-900 dark:prose-headings:text-gray-100
        prose-p:text-gray-700 dark:prose-p:text-gray-300
        prose-a:text-blue-600 prose-a:no-underline hover:prose-a:underline dark:prose-a:text-blue-400
        prose-strong:text-gray-900 dark:prose-strong:text-gray-100
        prose-code:rounded prose-code:bg-gray-100 prose-code:px-1.5 prose-code:py-0.5
        prose-code:text-sm prose-code:text-gray-900 prose-code:before:content-none
        prose-code:after:content-none dark:prose-code:bg-gray-800 dark:prose-code:text-gray-100
        prose-pre:bg-gray-900 prose-pre:text-gray-100 dark:prose-pre:bg-gray-950
        prose-img:rounded-lg prose-img:shadow-md
        prose-hr:border-gray-200 dark:prose-hr:border-gray-800
        prose-blockquote:border-l-blue-600 prose-blockquote:text-gray-700
        dark:prose-blockquote:border-l-blue-400 dark:prose-blockquote:text-gray-300
        prose-ul:list-disc prose-ol:list-decimal
        prose-li:text-gray-700 dark:prose-li:text-gray-300
        prose-table:w-full prose-th:bg-gray-100 prose-th:text-left
        dark:prose-th:bg-gray-800 prose-td:border-gray-200 dark:prose-td:border-gray-700"
      dangerouslySetInnerHTML={{ __html: content }}
    />
  );
}
