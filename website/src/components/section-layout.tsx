import { DocsLayout } from 'fumadocs-ui/layouts/docs';
import { cliSource, mgmtSource } from '@/lib/source';
import type { ReactNode } from 'react';

export function SectionLayout({ children, section = 'cli' }: {
  children: ReactNode; section?: 'cli' | 'mgmt';
}) {
  const tree = section === 'cli' ? cliSource.getPageTree() : mgmtSource.getPageTree();
  return (
    <DocsLayout
      tree={tree}
      nav={{ title: <><span className="oreol-mark" aria-hidden="true" />OREOL Docs</>, url: '/cli' }}
      tabs={[
        { title: 'CLI', description: <>The CLI for hetero<em>genius</em> computing</>, url: '/cli' },
        { title: 'Management', description: 'The management toolkit for your Oreol cluster', url: '/mgmt' },
      ]}
      themeSwitch={{ enabled: false }}
    >
      {children}
    </DocsLayout>
  );
}
