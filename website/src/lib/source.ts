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
  slugs(_file, next) { return next().map((slug) => slug.toLowerCase()); },
  icon(name) {
    const Icon = name === 'BookOpen' ? BookOpen : name === 'Download' ? Download : undefined;
    return Icon ? createElement(Icon) : undefined;
  },
  source: cli.toFumadocsSource(),
});
