import '@fontsource-variable/inter';
import { Provider } from '@/components/provider';
import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import './global.css';

export const metadata: Metadata = {
  title: { default: 'OREOL Documentation', template: '%s | OREOL Docs' },
};
export default function Layout({ children }: { children: ReactNode }) {
  return <html lang="en" suppressHydrationWarning>
    <body className="flex min-h-screen flex-col"><Provider>{children}</Provider></body>
  </html>;
}
