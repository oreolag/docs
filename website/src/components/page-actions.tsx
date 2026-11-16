'use client';
import { GitHubIcon } from './github-icon';
import { useState } from 'react';
import { Check, ChevronDown, Copy, ExternalLink, FileText } from 'lucide-react';

export function PageActions({ markdown, markdownUrl }: { markdown: string; markdownUrl: string }) {
  const [copied, setCopied] = useState(false);
  const [failed, setFailed] = useState(false);
  async function copy() {
    try {
      await navigator.clipboard.writeText(markdown);
      setCopied(true); setFailed(false);
      window.setTimeout(() => setCopied(false), 1800);
    } catch { setFailed(true); }
  }
  return <div className="oreol-actions">
    <button type="button" onClick={copy} aria-live="polite">
      {copied ? <Check size={16} /> : <Copy size={16} />}
      {copied ? 'Copied' : failed ? 'Could not copy' : 'Copy Markdown'}
    </button>
    <details className="oreol-open">
      <summary>Open <ChevronDown size={15} /></summary>
      <div className="oreol-open-menu">
        <a href={markdownUrl} target="_blank" rel="noreferrer"><FileText size={15} />Markdown <ExternalLink size={13} /></a>
        <a href="https://github.com/oreolag/docs/tree/main/cli" target="_blank" rel="noreferrer"><GitHubIcon size={15} />GitHub <ExternalLink size={13} /></a>
      </div>
    </details>
  </div>;
}
