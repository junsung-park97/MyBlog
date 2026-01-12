/**
 * 날짜를 포맷팅합니다.
 * @param date - 포맷팅할 날짜
 * @param locale - 로케일 (기본값: 'ko-KR')
 * @returns 포맷팅된 날짜 문자열
 */
export function formatDate(date: Date | string, locale = 'ko-KR'): string {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  return dateObj.toLocaleDateString(locale, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

/**
 * 문자열을 URL 친화적인 슬러그로 변환합니다.
 * @param text - 변환할 텍스트
 * @returns 슬러그
 */
export function slugify(text: string): string {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')
    .replace(/[^\w\-]+/g, '')
    .replace(/\-\-+/g, '-');
}

/**
 * 텍스트를 지정된 길이로 자르고 말줄임표를 추가합니다.
 * @param text - 자를 텍스트
 * @param maxLength - 최대 길이
 * @returns 잘린 텍스트
 */
export function truncate(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength).trim() + '...';
}
