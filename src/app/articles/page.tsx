import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import { type Locale } from '@/lib/i18n/config';
import { generateArticlesListMetadata } from '@/lib/seo';
import { getAllArticles } from '@/config/articles';
import ArticlesPageClient from './ArticlesPageClient';

export async function generateMetadata(): Promise<Metadata> {
  return generateArticlesListMetadata('zh');
}

export default async function ArticlesPage() {
  const locale: Locale = 'zh';

  // Enable static rendering
  setRequestLocale(locale);

  const articles = getAllArticles();

  return <ArticlesPageClient locale={locale} articles={articles} />;
}
