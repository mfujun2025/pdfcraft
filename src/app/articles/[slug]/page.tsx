import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { setRequestLocale } from 'next-intl/server';
import { CalendarDays, Clock, ChevronRight, Lightbulb, ArrowRight, Wrench } from 'lucide-react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { JsonLd } from '@/components/seo/JsonLd';
import { type Locale } from '@/lib/i18n/config';
import {
  generateArticleMetadata,
  generateArticleSchema,
  generateFAQPageSchema,
  generateBreadcrumbSchema,
} from '@/lib/seo';
import { articles, getArticleBySlug, getRelatedArticles } from '@/config/articles';
import { getCategoryName } from '@/config/articles/categories';
import type { ArticleSection } from '@/config/articles/types';

interface ArticlePageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return articles.map((article) => ({ slug: article.slug }));
}

export async function generateMetadata({ params }: ArticlePageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticleBySlug(slug);

  if (!article) {
    return { title: '文章未找到' };
  }

  return generateArticleMetadata('zh', article);
}

function sectionId(index: number): string {
  return `section-${index + 1}`;
}

function renderSection(section: ArticleSection, index: number) {
  return (
    <section key={section.heading} id={sectionId(index)} className="scroll-mt-24">
      <h2 className="text-xl md:text-2xl font-bold text-[hsl(var(--color-foreground))] mb-4">
        {section.heading}
      </h2>

      {section.paragraphs?.map((paragraph) => (
        <p
          key={paragraph.slice(0, 24)}
          className="text-[hsl(var(--color-foreground))] leading-8 mb-4"
        >
          {paragraph}
        </p>
      ))}

      {section.list && section.list.length > 0 && (
        section.ordered ? (
          <ol className="list-decimal pl-6 mb-4 space-y-2 text-[hsl(var(--color-foreground))] leading-7">
            {section.list.map((item) => (
              <li key={item.slice(0, 24)}>{item}</li>
            ))}
          </ol>
        ) : (
          <ul className="list-disc pl-6 mb-4 space-y-2 text-[hsl(var(--color-foreground))] leading-7">
            {section.list.map((item) => (
              <li key={item.slice(0, 24)}>{item}</li>
            ))}
          </ul>
        )
      )}

      {section.table && (
        <div className="overflow-x-auto mb-4 rounded-xl border border-[hsl(var(--color-border))]">
          <table className="w-full text-sm">
            <thead className="bg-[hsl(var(--color-muted)/0.5)]">
              <tr>
                {section.table.headers.map((header) => (
                  <th
                    key={header}
                    className="px-4 py-3 text-left font-semibold text-[hsl(var(--color-foreground))]"
                  >
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {section.table.rows.map((row, rowIndex) => (
                <tr
                  key={rowIndex}
                  className="border-t border-[hsl(var(--color-border))]"
                >
                  {row.map((cell, cellIndex) => (
                    <td
                      key={cellIndex}
                      className="px-4 py-3 align-top text-[hsl(var(--color-foreground))]"
                    >
                      {cell}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {section.note && (
        <div className="flex gap-3 rounded-xl border border-[hsl(var(--color-primary)/0.3)] bg-[hsl(var(--color-primary)/0.06)] p-4 mb-4">
          <Lightbulb
            className="h-5 w-5 flex-shrink-0 text-[hsl(var(--color-primary))]"
            aria-hidden="true"
          />
          <p className="text-sm leading-7 text-[hsl(var(--color-foreground))]">{section.note}</p>
        </div>
      )}
    </section>
  );
}

export default async function ArticlePage({ params }: ArticlePageProps) {
  const { slug } = await params;
  const locale: Locale = 'zh';

  // Enable static rendering
  setRequestLocale(locale);

  const article = getArticleBySlug(slug);

  if (!article) {
    notFound();
  }

  const categoryName = getCategoryName(article.category);
  const relatedArticles = getRelatedArticles(article, 4);

  const articleSchema = generateArticleSchema({
    ...article,
    categoryName,
  });

  const breadcrumbSchema = generateBreadcrumbSchema(
    [
      { name: '首页', path: '/' },
      { name: '文章', path: '/articles' },
      { name: article.title, path: `/articles/${article.slug}` },
    ],
    locale
  );

  const faqSchema =
    article.faqs && article.faqs.length > 0 ? generateFAQPageSchema(article.faqs) : null;

  return (
    <div className="min-h-screen flex flex-col">
      <JsonLd data={articleSchema} />
      <JsonLd data={breadcrumbSchema} />
      {faqSchema && <JsonLd data={faqSchema} />}

      <Header locale={locale} />

      <main className="flex-1 pt-20" id="main-content">
        {/* Breadcrumb */}
        <nav
          aria-label="面包屑"
          className="container mx-auto px-4 py-6 text-sm text-[hsl(var(--color-muted-foreground))]"
        >
          <ol className="flex flex-wrap items-center gap-1">
            <li>
              <Link href="/" className="hover:text-[hsl(var(--color-primary))]">
                首页
              </Link>
            </li>
            <li aria-hidden="true">
              <ChevronRight className="h-3.5 w-3.5" />
            </li>
            <li>
              <Link href="/articles" className="hover:text-[hsl(var(--color-primary))]">
                文章
              </Link>
            </li>
            <li aria-hidden="true">
              <ChevronRight className="h-3.5 w-3.5" />
            </li>
            <li className="text-[hsl(var(--color-foreground))]">{categoryName}</li>
          </ol>
        </nav>

        <article className="container mx-auto px-4 pb-16">
          <div className="max-w-3xl mx-auto">
            {/* Title block */}
            <header className="mb-8 pb-8 border-b border-[hsl(var(--color-border))]">
              <h1 className="text-2xl md:text-3xl font-bold leading-snug text-[hsl(var(--color-foreground))] mb-4">
                {article.title}
              </h1>
              <p className="text-[hsl(var(--color-muted-foreground))] leading-7 mb-4">
                {article.description}
              </p>
              <div className="flex flex-wrap items-center gap-4 text-xs text-[hsl(var(--color-muted-foreground))]">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-[hsl(var(--color-primary)/0.1)] px-2.5 py-1 font-medium text-[hsl(var(--color-primary))]">
                  {categoryName}
                </span>
                <span className="inline-flex items-center gap-1">
                  <CalendarDays className="h-3.5 w-3.5" aria-hidden="true" />
                  更新于 {article.updatedAt}
                </span>
                <span className="inline-flex items-center gap-1">
                  <Clock className="h-3.5 w-3.5" aria-hidden="true" />
                  约 {article.readingMinutes} 分钟读完
                </span>
              </div>
            </header>

            {/* Table of contents */}
            {article.sections.length > 2 && (
              <nav
                aria-label="本文目录"
                className="mb-10 rounded-2xl border border-[hsl(var(--color-border))] bg-[hsl(var(--color-muted)/0.25)] p-5"
              >
                <h2 className="text-sm font-bold text-[hsl(var(--color-foreground))] mb-3">
                  本文目录
                </h2>
                <ol className="space-y-2 text-sm">
                  {article.sections.map((section, index) => (
                    <li key={section.heading}>
                      <a
                        href={`#${sectionId(index)}`}
                        className="text-[hsl(var(--color-muted-foreground))] hover:text-[hsl(var(--color-primary))]"
                      >
                        {index + 1}. {section.heading}
                      </a>
                    </li>
                  ))}
                </ol>
              </nav>
            )}

            {/* Body */}
            <div className="space-y-10">{article.sections.map(renderSection)}</div>

            {/* Tools */}
            {article.tools.length > 0 && (
              <section className="mt-12 rounded-2xl border border-[hsl(var(--color-border))] bg-[hsl(var(--color-card))] p-6">
                <h2 className="flex items-center gap-2 text-lg font-bold text-[hsl(var(--color-foreground))] mb-4">
                  <Wrench className="h-5 w-5 text-[hsl(var(--color-primary))]" aria-hidden="true" />
                  文中提到的在线工具
                </h2>
                <p className="text-sm text-[hsl(var(--color-muted-foreground))] mb-4">
                  以下工具全部在浏览器本地运行，文件不会上传到服务器。
                </p>
                <div className="flex flex-wrap gap-3">
                  {article.tools.map((tool) => (
                    <Link
                      key={tool.slug}
                      href={`/tools/${tool.slug}`}
                      className="inline-flex items-center gap-2 rounded-full border border-[hsl(var(--color-border))] px-4 py-2 text-sm font-medium text-[hsl(var(--color-foreground))] transition-all hover:border-[hsl(var(--color-primary))] hover:text-[hsl(var(--color-primary))]"
                    >
                      {tool.label}
                      <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
                    </Link>
                  ))}
                </div>
              </section>
            )}

            {/* FAQ */}
            {article.faqs && article.faqs.length > 0 && (
              <section className="mt-12">
                <h2 className="text-xl font-bold text-[hsl(var(--color-foreground))] mb-6">
                  常见问题
                </h2>
                <div className="space-y-4">
                  {article.faqs.map((faq) => (
                    <div
                      key={faq.question}
                      className="rounded-xl border border-[hsl(var(--color-border))] p-5"
                    >
                      <h3 className="font-semibold text-[hsl(var(--color-foreground))] mb-2">
                        {faq.question}
                      </h3>
                      <p className="text-sm leading-7 text-[hsl(var(--color-muted-foreground))]">
                        {faq.answer}
                      </p>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Related */}
            {relatedArticles.length > 0 && (
              <section className="mt-14 pt-10 border-t border-[hsl(var(--color-border))]">
                <h2 className="text-lg font-bold text-[hsl(var(--color-foreground))] mb-6">
                  继续阅读
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {relatedArticles.map((item) => (
                    <Link
                      key={item.slug}
                      href={`/articles/${item.slug}`}
                      className="group rounded-xl border border-[hsl(var(--color-border))] p-5 transition-all hover:border-[hsl(var(--color-primary))]"
                    >
                      <div className="text-xs text-[hsl(var(--color-muted-foreground))] mb-2">
                        {getCategoryName(item.category)}
                      </div>
                      <div className="font-semibold text-[hsl(var(--color-foreground))] group-hover:text-[hsl(var(--color-primary))] transition-colors">
                        {item.title}
                      </div>
                    </Link>
                  ))}
                </div>
              </section>
            )}

            {/* Back to list */}
            <div className="mt-12">
              <Link
                href="/articles"
                className="inline-flex items-center gap-2 text-sm font-medium text-[hsl(var(--color-primary))] hover:underline"
              >
                <ChevronRight className="h-4 w-4 rotate-180" aria-hidden="true" />
                返回文章列表
              </Link>
            </div>
          </div>
        </article>
      </main>

      <Footer locale={locale} />
    </div>
  );
}
