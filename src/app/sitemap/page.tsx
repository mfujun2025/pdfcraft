import type { Metadata } from 'next';
import Link from 'next/link';
import { setRequestLocale } from 'next-intl/server';
import { type Locale } from '@/lib/i18n/config';
import { getCanonicalUrl } from '@/lib/seo';
import { getAllTools } from '@/config/tools';
import { getToolContent } from '@/config/tool-content';
import { getAllArticles, getArticlesByCategory, ARTICLE_CATEGORIES } from '@/config/articles';
import { TOOL_CATEGORIES, type ToolCategory } from '@/types/tool';

/** 工具分类的中文名（与分类页保持一致） */
const TOOL_CATEGORY_NAMES: Record<ToolCategory, string> = {
  'edit-annotate': 'PDF 编辑与批注',
  'convert-to-pdf': '转为 PDF',
  'convert-from-pdf': 'PDF 转出',
  'organize-manage': 'PDF 整理与管理',
  'optimize-repair': 'PDF 优化与修复',
  'secure-pdf': 'PDF 安全',
};

const STATIC_PAGES: { href: string; label: string }[] = [
  { href: '/', label: '首页' },
  { href: '/tools', label: '全部 PDF 工具' },
  { href: '/articles', label: 'PDF 使用指南（文章）' },
  { href: '/workflow', label: '工作流' },
  { href: '/about', label: '关于我们' },
  { href: '/faq', label: '常见问题' },
  { href: '/contact', label: '联系我们' },
  { href: '/privacy', label: '隐私政策' },
  { href: '/terms', label: '服务条款' },
  { href: '/cookies', label: 'Cookie 说明' },
];

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: '网站地图',
    description:
      'pdf.中国 全站页面索引：全部在线 PDF 工具、工具分类与 PDF 使用指南文章，一页找到需要的页面。',
    alternates: {
      canonical: getCanonicalUrl('zh', '/sitemap'),
    },
  };
}

export default async function SitemapPage() {
  const locale: Locale = 'zh';
  setRequestLocale(locale);

  const tools = getAllTools();
  const articles = getAllArticles();

  return (
    <div className="container mx-auto px-4 py-10 max-w-5xl">
      <h1 className="text-3xl font-bold mb-3">网站地图</h1>
      <p className="text-[hsl(var(--color-muted-foreground))] mb-8">
        全站共 {STATIC_PAGES.length} 个主要页面、{tools.length} 个在线工具、{articles.length} 篇使用指南。
        所有工具都在浏览器本地运行，文件不上传服务器。
      </p>

      <section className="mb-10">
        <h2 className="text-xl font-semibold mb-3 pb-2 border-b">主要页面</h2>
        <ul className="grid grid-cols-2 sm:grid-cols-3 gap-2">
          {STATIC_PAGES.map((page) => (
            <li key={page.href}>
              <Link
                href={page.href}
                className="text-sm hover:underline text-[hsl(var(--color-primary))]"
              >
                {page.label}
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-semibold mb-3 pb-2 border-b">
          工具分类（{TOOL_CATEGORIES.length} 个）
        </h2>
        <ul className="grid grid-cols-2 sm:grid-cols-3 gap-2">
          {TOOL_CATEGORIES.map((category) => (
            <li key={category}>
              <Link
                href={`/tools/category/${category}`}
                className="text-sm hover:underline text-[hsl(var(--color-primary))]"
              >
                {TOOL_CATEGORY_NAMES[category]}
              </Link>
            </li>
          ))}
        </ul>
      </section>

      {TOOL_CATEGORIES.map((category) => {
        const list = tools.filter((tool) => tool.category === category);
        if (list.length === 0) return null;
        return (
          <section key={category} className="mb-8">
            <h2 className="text-lg font-semibold mb-3">
              {TOOL_CATEGORY_NAMES[category]}
              <span className="ml-2 text-sm font-normal text-[hsl(var(--color-muted-foreground))]">
                {list.length} 个工具
              </span>
            </h2>
            <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-1">
              {list.map((tool) => {
                const content = getToolContent(locale, tool.id);
                return (
                  <li key={tool.slug}>
                    <Link
                      href={`/tools/${tool.slug}`}
                      className="text-sm hover:underline text-[hsl(var(--color-primary))]"
                    >
                      {content?.title || tool.slug}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </section>
        );
      })}

      <section className="mb-10">
        <h2 className="text-xl font-semibold mb-3 pb-2 border-b">
          使用指南（{articles.length} 篇）
        </h2>
        {ARTICLE_CATEGORIES.map((category) => {
          const list = getArticlesByCategory(category.id);
          if (list.length === 0) return null;
          return (
            <div key={category.id} className="mb-5">
              <h3 className="text-base font-medium mb-2">
                {category.name}
                <span className="ml-2 text-sm font-normal text-[hsl(var(--color-muted-foreground))]">
                  {list.length} 篇
                </span>
              </h3>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-1">
                {list.map((article) => (
                  <li key={article.slug}>
                    <Link
                      href={`/articles/${article.slug}`}
                      className="text-sm hover:underline text-[hsl(var(--color-primary))]"
                    >
                      {article.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          );
        })}
      </section>

      <section className="pt-4 border-t">
        <h2 className="text-xl font-semibold mb-3">给搜索引擎的站点地图</h2>
        <p className="text-sm text-[hsl(var(--color-muted-foreground))] mb-2">
          如果你要向搜索引擎提交站点地图，用这个地址：
        </p>
        <p className="text-sm">
          <Link href="/sitemap.xml" className="hover:underline text-[hsl(var(--color-primary))]">
            /sitemap.xml
          </Link>
        </p>
      </section>
    </div>
  );
}
