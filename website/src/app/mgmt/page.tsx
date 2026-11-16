import { SectionLayout } from '@/components/section-layout';
import { DocsBody, DocsDescription, DocsPage, DocsTitle } from 'fumadocs-ui/layouts/docs/page';
import { PageToolbar } from '@/components/page-toolbar';
export const metadata = { title: 'Management' };
export default function Page() {
  return <SectionLayout section="mgmt"><DocsPage breadcrumb={{ enabled: false }}>
    <PageToolbar />
    <DocsTitle>Management</DocsTitle>
    <DocsDescription>Infrastructure and administration documentation.</DocsDescription>
    <DocsBody><p>This section will be prepared in a later step.</p></DocsBody>
  </DocsPage></SectionLayout>;
}
