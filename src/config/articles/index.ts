/**
 * 文章索引
 * 汇总各批次文章，并提供查询辅助函数。
 */
import type { Article, ArticleCategoryId } from './types';
import { articlesBatch1 } from './content/batch-1';
import { articlesBatch2 } from './content/batch-2';
import { articlesBatch3 } from './content/batch-3';
import { articlesBatch4 } from './content/batch-4';
import { articlesBatch5 } from './content/batch-5';
import { articlesBatch6 } from './content/batch-6';

export const articles: Article[] = [
  ...articlesBatch1,
  ...articlesBatch2,
  ...articlesBatch3,
  ...articlesBatch4,
  ...articlesBatch5,
  ...articlesBatch6,
].sort((a, b) => (a.publishedAt < b.publishedAt ? 1 : -1));

export function getAllArticles(): Article[] {
  return articles;
}

export function getArticleBySlug(slug: string): Article | undefined {
  return articles.find((article) => article.slug === slug);
}

export function getArticlesByCategory(category: ArticleCategoryId): Article[] {
  return articles.filter((article) => article.category === category);
}

/**
 * 取相关文章：同分类优先，不足时用其它分类补齐
 */
export function getRelatedArticles(article: Article, limit = 4): Article[] {
  const sameCategory = articles.filter(
    (item) => item.slug !== article.slug && item.category === article.category
  );
  const rest = articles.filter(
    (item) => item.slug !== article.slug && item.category !== article.category
  );
  return [...sameCategory, ...rest].slice(0, limit);
}

/**
 * 统计每个分类的文章数
 */
export function getCategoryCounts(): Record<string, number> {
  return articles.reduce((acc, article) => {
    acc[article.category] = (acc[article.category] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);
}

export * from './types';
export * from './categories';
