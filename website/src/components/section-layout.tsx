import { DocsLayout } from 'fumadocs-ui/layouts/docs';
import { Terminal, Settings2 } from 'lucide-react';
import { cliSource } from '@/lib/source';
import type { ReactNode } from 'react';

export function SectionLayout({ children, section = 'cli' }: {
  children: ReactNode; section?: 'cli' | 'mgmt';
}) {
  const tree = section === 'cli' ? cliSource.getPageTree() : {
    name: 'Management',
    children: [{ type: 'page' as const, name: 'Overview', url: '/mgmt' }],
  };
  return (
    <DocsLayout
      tree={tree}
      nav={{ title: <><span className="oreol-mark" aria-hidden="true" />OREOL Docs</>, url: '/cli' }}
      tabs={[
        { title: 'CLI', description: 'Command-line tools', url: '/cli', icon: <Terminal /> },
        { title: 'Management', description: 'Infrastructure and administration', url: '/mgmt', icon: <Settings2 /> },
      ]}
      themeSwitch={{ enabled: false }}
    >
      {children}
    </DocsLayout>
  );
}
