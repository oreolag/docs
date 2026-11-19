import Link from 'next/link';
import Markdown from 'react-markdown';
import { DocsDescription } from 'fumadocs-ui/layouts/docs/page';

/** Subtitles support inline Markdown while retaining the standard page styling. */
export function MarkdownDescription({ children }: { children?: string }) {
  if (children === undefined) return null;

  return (
    <DocsDescription>
      <Markdown
        allowedElements={['em', 'strong', 'code', 'a', 'br']}
        unwrapDisallowed
        skipHtml
        components={{
          a: ({ href, children }) => (
            <Link href={href ?? '#'} className="text-fd-primary underline underline-offset-4">{children}</Link>
          ),
          code: ({ children }) => (
            <code className="rounded bg-fd-muted px-1 font-mono text-[0.9em]">{children}</code>
          ),
        }}
      >
        {children}
      </Markdown>
    </DocsDescription>
  );
}
