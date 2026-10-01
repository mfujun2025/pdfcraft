'use client';

import React, { useMemo, useState } from 'react';
import Link from 'next/link';
import { CalendarDays, Clock, ChevronRight, FileText } from 'lucide-react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { type Locale } from '@/lib/i18n/config';
import { ARTICLE_CATEGORIES, getCategoryName } from '@/config/articles/categories';
import type { Article, ArticleCategoryId } from '@/config/articles/types';

interface ArticlesPageClientProps {
  locale: Locale;
  articles: Article[];
}

type FilterId = 'all' | ArticleCategoryId;

export default function ArticlesPageClient({ locale, articles }: ArticlesPageClientProps) {
  const [activeCategory, setActiveCategory] = useState<FilterId>('all');

  const counts = useMemo(() => {
    return articles.reduce((acc, article) => {
      acc[article.category] = (acc[article.category] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);
  }, [articles]);

  const visibleArticles = useMemo(() => {
    if (activeCategory === 'all') return articles;
    return articles.filter((article) => article.category === activeCategory);
  }, [articles, activeCategory]);

  const filters: { id: FilterId; name: string; count: number }[] = [
    { id: 'all', name: '全部', count: articles.length },
    ...ARTICLE_CATEGORIES.map((category) => ({
      id: category.id as FilterId,
      name: category.name,
      count: counts[category.id] || 0,
    })).filter((item) => item.count > 0),
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Header locale={locale} />

      <main className="flex-1 pt-20" id="main-content">
        {/* Hero */}
        <section className="bg-[hsl(var(--color-muted)/0.3)] py-12 border-b border-[hsl(var(--color-border))]">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl">
              <h1 className="text-3xl md:text-4xl font-bold text-[hsl(var(--color-foreground))] mb-4">
                PDF 实用教程与技巧
              </h1>
              <p className="text-[hsl(var(--color-muted-foreground))] leading-relaxed">
                共 {articles.length} 篇。每一篇都围绕一个具体问题展开，给出能照着做的步骤、参数选择和判断标准，
                而不是泛泛而谈的概念介绍。配套工具全部在浏览器本地处理，文件不会上传到服务器。
              </p>
            </div>
          </div>
        </section>

        {/* Filter */}
        <section className="py-8">
          <div className="container mx-auto px-4">
            <div className="flex flex-wrap gap-2 mb-8" role="tablist" aria-label="文章分类">
              {filters.map((filter) => {
                const isActive = filter.id === activeCategory;
                return (
                  <button
                    key={filter.id}
                    type="button"
                    role="tab"
                    aria-selected={isActive}
                    onClick={() => setActiveCategory(filter.id)}
                    className={`px-4 py-2 text-sm rounded-full border transition-all ${
                      isActive
                        ? 'bg-[hsl(var(--color-primary))] text-white border-transparent font-medium'
                        : 'bg-[hsl(var(--color-background))] text-[hsl(var(--color-muted-foreground))] border-[hsl(var(--color-border))] hover:text-[hsl(var(--color-foreground))]'
                    }`}
                  >
                    {filter.name}
                    <span className="ml-2 opacity-70">{filter.count}</span>
                  </button>
                );
              })}
            </div>

            {/* Article grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {visibleArticles.map((article) => (
                <Link
                  key={article.slug}
                  href={`/articles/${article.slug}`}
                  className="group flex flex-col h-full rounded-2xl border border-[hsl(var(--color-border))] bg-[hsl(var(--color-card))] p-6 transition-all hover:border-[hsl(var(--color-primary))] hover:shadow-lg"
                >
                  <div className="flex items-center gap-3 mb-3 text-xs text-[hsl(var(--color-muted-foreground))]">
                    <span className="inline-flex items-center gap-1 rounded-full bg-[hsl(var(--color-primary)/0.1)] px-2.5 py-1 font-medium text-[hsl(var(--color-primary))]">
                      <FileText className="h-3 w-3" aria-hidden="true" />
                      {getCategoryName(article.category)}
                    </span>
                    <span className="inline-flex items-center gap-1">
                      <Clock className="h-3 w-3" aria-hidden="true" />
                      {article.readingMinutes} 分钟
                    </span>
                  </div>

                  <h2 className="text-lg font-bold text-[hsl(var(--color-foreground))] mb-2 group-hover:text-[hsl(var(--color-primary))] transition-colors">
                    {article.title}
                  </h2>

                  <p className="text-sm text-[hsl(var(--color-muted-foreground))] leading-relaxed flex-1">
                    {article.summary}
                  </p>

                  <div className="mt-4 flex items-center justify-between text-xs text-[hsl(var(--color-muted-foreground))]">
                    <span className="inline-flex items-center gap-1">
                      <CalendarDays className="h-3 w-3" aria-hidden="true" />
                      {article.updatedAt}
                    </span>
                    <span className="inline-flex items-center gap-1 font-medium text-[hsl(var(--color-primary))]">
                      阅读全文
                      <ChevronRight className="h-3 w-3" aria-hidden="true" />
                    </span>
                  </div>
                </Link>
              ))}
            </div>

            {visibleArticles.length === 0 && (
              <p className="py-16 text-center text-[hsl(var(--color-muted-foreground))]">
                该分类下暂无文章。
              </p>
            )}
          </div>
        </section>
      </main>

      <Footer locale={locale} />
    </div>
  );
}
