import Link from 'next/link';
import { GitHubIcon } from './github-icon';
import { Languages } from 'lucide-react';

export function PageToolbar() {
  return <div className="oreol-page-toolbar">
    <span className="oreol-language"><Languages size={16} aria-hidden="true" /> English</span>
    <Link href="https://github.com/oreolag/docs" aria-label="Documentation on GitHub" target="_blank" rel="noreferrer">
      <GitHubIcon size={19} />
    </Link>
  </div>;
}
