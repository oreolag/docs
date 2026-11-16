import { fileURLToPath } from 'node:url';
import { createMDX } from 'fumadocs-mdx/next';

const withMDX = createMDX();
export default withMDX({
  output: 'export',
  basePath: '/docs',
  trailingSlash: true,
  agentRules: false,
  reactStrictMode: true,
  images: { unoptimized: true },
  webpack(config) {
    // Markdown lives alongside website/, so resolve its imports here too.
    config.resolve.modules.push(fileURLToPath(new URL('./node_modules', import.meta.url)));
    return config;
  },
});
