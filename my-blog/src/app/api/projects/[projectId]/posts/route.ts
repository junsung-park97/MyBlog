import { NextRequest, NextResponse } from 'next/server';
import { getPostsByProjectPaginated } from '@/lib/utils/markdown';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ projectId: string }> }
) {
  const { projectId } = await params;
  const searchParams = request.nextUrl.searchParams;
  const page = parseInt(searchParams.get('page') || '1', 10);
  const limit = parseInt(searchParams.get('limit') || '5', 10);

  const result = await getPostsByProjectPaginated(projectId, page, limit);

  return NextResponse.json(result);
}
