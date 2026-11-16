import { cliSource, mgmtSource } from '@/lib/source';
import { createSearchAPI } from 'fumadocs-core/search/server';

export const revalidate = false;
export const { staticGET: GET } = createSearchAPI('advanced', {
  language: 'english',
  indexes: [
    ...cliSource.getPages().map((page) => ({
      id: page.url, title: page.data.title, description: page.data.description,
      url: page.url, structuredData: page.data.structuredData, breadcrumbs: ['CLI'],
    })),
    ...mgmtSource.getPages().map((page) => ({
      id: page.url, title: page.data.title, description: page.data.description,
      url: page.url, structuredData: page.data.structuredData,
      breadcrumbs: ['Management', ...(page.slugs[0] === 'odev' ? ['odev'] : page.slugs[0] === 'system-management' ? ['System management'] : ['Introduction'])],
    })),
  ],
});
