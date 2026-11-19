import { MarkdownDescription } from '@/components/markdown-description';
import { mgmtSource } from '@/lib/source';
import { DocsBody, DocsPage, DocsTitle } from 'fumadocs-ui/layouts/docs/page';
import { getMDXComponents } from '@/components/mdx';
import { PageToolbar } from '@/components/page-toolbar';
import { PageActions } from '@/components/page-actions';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';

type Props = { params: Promise<{ slug?: string[] }> };
export default async function Page({ params }: Props) {
  const page = mgmtSource.getPage((await params).slug);
  if (!page) notFound();
  const MDX = page.data.body;
  const markdown = `# ${page.data.title}\n\n${await page.data.getText('processed')}`;
  const file = page.slugs.length ? page.slugs.join('/') : 'index';
  return <DocsPage toc={page.data.toc} breadcrumb={{ enabled: false }}
    tableOfContent={{ style: 'block' }} tableOfContentPopover={{ style: 'block' }}>
    <PageToolbar />
    <DocsTitle>{page.data.title}</DocsTitle>
    <MarkdownDescription>{page.data.description}</MarkdownDescription>
    <PageActions githubUrl="https://github.com/oreolag/docs/tree/main/mgmt" markdown={markdown} markdownUrl={`/docs/markdown/mgmt/${file}.md`} />
    <DocsBody><MDX components={getMDXComponents()} /></DocsBody>
  </DocsPage>;
}
export function generateStaticParams() { return mgmtSource.generateParams(); }
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const page = mgmtSource.getPage((await params).slug);
  if (!page) notFound();
  return { title: page.data.title, description: page.data.description };
}
