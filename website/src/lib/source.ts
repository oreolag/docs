import Link from 'next/link';
import { BookOpen, Download } from 'lucide-react';
import { createElement } from 'react';
import { defineDocs } from 'fumadocs-mdx/macro';
import { loader } from 'fumadocs-core/source';

const cli = defineDocs({
  dir: '../cli',
  docs: { postprocess: { includeProcessedMarkdown: true } },
});

export const cliSource = loader({
  baseUrl: '/cli',
  pageTree: {
    transformers: [{
      separator(node) {
        if (node.name === 'Getting started') {
          return { ...node, name: createElement(Link, { href: '/cli' }, 'Getting started') };
        }
        return node;
      },
    }],
  },
  slugs(_file, next) { return next().map((slug) => slug.toLowerCase()); },
  icon(name) {
    const Icon = name === 'BookOpen' ? BookOpen : name === 'Download' ? Download : undefined;
    return Icon ? createElement(Icon) : undefined;
  },
  source: cli.toFumadocsSource(),
});

const mgmt = defineDocs({
  dir: '../mgmt',
  docs: { postprocess: { includeProcessedMarkdown: true } },
});

export const mgmtSource = loader({
  baseUrl: '/mgmt',
  slugs(_file, next) { return next().map((slug) => slug.toLowerCase()); },
  source: mgmt.toFumadocsSource(),
});
