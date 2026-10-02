/**
 * Sitemap Generation
 * 中文单语站点：URL 不带语言前缀
 *
 * @see https://nextjs.org/docs/app/api-reference/file-conventions/metadata/sitemap
 */

import { MetadataRoute } from 'next';
import { siteConfig } from '@/config/site';
import { getAllTools } from '@/config/tools';
import { getAllArticles } from '@/config/articles';
import { TOOL_CATEGORIES } from '@/types/tool';

// Required for static export
export const dynamic = 'force-static';

/**
 * Priority values for different page types
 */
const PRIORITY = {
  home: 1.0,
  tools: 0.9,
  toolPage: 0.8,
  categoryPage: 0.75,
  articles: 0.8,
  articlePage: 0.7,
  static: 0.5,
} as const;

/**
 * Change frequency for different page types
 */
const CHANGE_FREQUENCY = {
  home: 'daily',
  tools: 'weekly',
  toolPage: 'weekly',
  articles: 'weekly',
  articlePage: 'monthly',
  static: 'monthly',
} as const;

/**
 * Static pages
 */
const STATIC_PAGES = [
  { path: '/', priority: PRIORITY.home, changeFrequency: CHANGE_FREQUENCY.home },
  { path: '/tools', priority: PRIORITY.tools, changeFrequency: CHANGE_FREQUENCY.tools },
  { path: '/articles', priority: PRIORITY.articles, changeFrequency: CHANGE_FREQUENCY.articles },
  { path: '/workflow', priority: PRIORITY.static, changeFrequency: CHANGE_FREQUENCY.static },
  { path: '/about', priority: PRIORITY.static, changeFrequency: CHANGE_FREQUENCY.static },
  { path: '/faq', priority: PRIORITY.static, changeFrequency: CHANGE_FREQUENCY.static },
  { path: '/privacy', priority: PRIORITY.static, changeFrequency: CHANGE_FREQUENCY.static },
  { path: '/terms', priority: PRIORITY.static, changeFrequency: CHANGE_FREQUENCY.static },
  { path: '/cookies', priority: PRIORITY.static, changeFrequency: CHANGE_FREQUENCY.static },
  { path: '/contact', priority: PRIORITY.static, changeFrequency: CHANGE_FREQUENCY.static },
  { path: '/sitemap', priority: PRIORITY.static, changeFrequency: CHANGE_FREQUENCY.static },
];

/**
 * Generate the complete sitemap
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  const entries: MetadataRoute.Sitemap = [];

  // Static pages
  for (const page of STATIC_PAGES) {
    entries.push({
      url: `${siteConfig.url}${page.path}`,
      lastModified,
      changeFrequency: page.changeFrequency as 'daily' | 'weekly' | 'monthly',
      priority: page.priority,
    });
  }

  // Tool pages
  for (const tool of getAllTools()) {
    entries.push({
      url: `${siteConfig.url}/tools/${tool.slug}`,
      lastModified,
      changeFrequency: CHANGE_FREQUENCY.toolPage,
      priority: PRIORITY.toolPage,
    });
  }

  // Tool category pages
  for (const category of TOOL_CATEGORIES) {
    entries.push({
      url: `${siteConfig.url}/tools/category/${category}`,
      lastModified,
      changeFrequency: CHANGE_FREQUENCY.toolPage,
      priority: PRIORITY.categoryPage,
    });
  }

  // Article pages
  for (const article of getAllArticles()) {
    entries.push({
      url: `${siteConfig.url}/articles/${article.slug}`,
      lastModified: new Date(article.updatedAt),
      changeFrequency: CHANGE_FREQUENCY.articlePage,
      priority: PRIORITY.articlePage,
    });
  }

  return entries;
}

/**
 * Get total number of URLs in sitemap
 * Useful for testing and validation
 */
export function getSitemapUrlCount(): number {
  return (
    STATIC_PAGES.length +
    getAllTools().length +
    TOOL_CATEGORIES.length +
    getAllArticles().length
  );
}
