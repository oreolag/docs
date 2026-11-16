import { SectionLayout } from '@/components/section-layout';
import type { ReactNode } from 'react';

export default function Layout({ children }: { children: ReactNode }) {
  return <SectionLayout section="mgmt">{children}</SectionLayout>;
}
