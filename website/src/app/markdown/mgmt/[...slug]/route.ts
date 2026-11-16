import { mgmtSource } from '@/lib/source';
export const dynamic = 'force-static';
export function generateStaticParams() {
  return mgmtSource.getPages().map((page) => ({
    slug: [...(page.slugs.length ? page.slugs : ['index']).slice(0, -1),
      `${page.slugs.at(-1) ?? 'index'}.md`],
  }));
}
export async function GET(_request: Request, { params }: { params: Promise<{ slug: string[] }> }) {
  const { slug } = await params;
  const segments = [...slug];
  segments[segments.length - 1] = segments.at(-1)!.replace(/\.md$/, '');
  const page = mgmtSource.getPage(segments.length === 1 && segments[0] === 'index' ? [] : segments);
  if (!page) return new Response('Not found', { status: 404 });
  return new Response(`# ${page.data.title}\n\n${await page.data.getText('processed')}`, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
}
