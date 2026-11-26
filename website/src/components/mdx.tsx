import defaultMdxComponents from 'fumadocs-ui/mdx';
import type { MDXComponents } from 'mdx/types';
import type { ComponentProps } from 'react';

function MarkdownLink(props: ComponentProps<'a'>) {
  // Native fragment links scroll again even when the URL hash is unchanged.
  if (props.href?.startsWith('#')) return <a {...props} />;
  const Link = defaultMdxComponents.a;
  return <Link {...props} />;
}

export function getMDXComponents(components?: MDXComponents) {
  return {
    ...defaultMdxComponents,
    a: MarkdownLink,
    ...components,
  } satisfies MDXComponents;
}

export const useMDXComponents = getMDXComponents;

declare global {
  type MDXProvidedComponents = ReturnType<typeof getMDXComponents>;
}
