import { setRequestLocale } from 'next-intl/server';
import { type Locale } from '@/lib/i18n/config';
import { TOOL_CATEGORIES, type ToolCategory } from '@/types/tool';
import { getCanonicalUrl } from '@/lib/seo';
import CategoryPageClient from './CategoryPageClient';
import { notFound } from 'next/navigation';

/**
 * 分类页的中文 SEO 文案（中文单语站，站名与描述统一使用中文）
 */
const CATEGORY_SEO: Record<string, { name: string; description: string }> = {
  'edit-annotate': {
    name: 'PDF 编辑与批注',
    description: '在线编辑 PDF 内容、添加批注、水印与页码。全部在浏览器本地完成，文件不上传服务器。',
  },
  'convert-to-pdf': {
    name: '转为 PDF',
    description: '把 Word、Excel、PPT、图片等格式在线转成 PDF。浏览器本地处理，文件不上传服务器。',
  },
  'convert-from-pdf': {
    name: 'PDF 转出',
    description: '把 PDF 在线转成 Word、Excel、PPT、图片等格式。浏览器本地处理，文件不上传服务器。',
  },
  'organize-manage': {
    name: 'PDF 整理与管理',
    description: '在线合并、拆分、旋转、删除 PDF 页面，调整页面顺序与书签目录。浏览器本地处理。',
  },
  'optimize-repair': {
    name: 'PDF 优化与修复',
    description: '在线压缩 PDF 体积、修复打不开的损坏文件、OCR 识别扫描件。浏览器本地处理。',
  },
  'secure-pdf': {
    name: 'PDF 安全',
    description: '在线为 PDF 加密、添加水印、脱敏遮盖敏感信息。浏览器本地处理，文件不上传服务器。',
  },
};

export function generateStaticParams() {
    return TOOL_CATEGORIES.map((category) => ({
        category,
    }));
}

export async function generateMetadata({ params }: { params: Promise<{ category: string }> }) {
    const { category } = await params;

    const meta = CATEGORY_SEO[category];
    const fallbackName = category
        .split('-')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');

    return {
        title: meta ? `${meta.name} - pdf.中国` : `${fallbackName} - pdf.中国`,
        description: meta?.description ?? `免费在线 ${fallbackName} 工具，浏览器本地处理，文件不上传服务器。`,
        alternates: {
            canonical: getCanonicalUrl('zh', `/tools/category/${category}`),
        },
    };
}

export default async function CategoryPage({ params }: { params: Promise<{ category: string }> }) {
    const { category } = await params;

    // Validate category
    if (!TOOL_CATEGORIES.includes(category as ToolCategory)) {
        notFound();
    }

    // Enable static rendering
    setRequestLocale('zh');

    // Get localized content for tools
    const { tools } = await import('@/config/tools');
    const { getToolContent } = await import('@/config/tool-content');

    const localizedToolContent = tools.reduce((acc, tool) => {
        const content = getToolContent('zh', tool.id);
        if (content) {
            acc[tool.id] = {
                title: content.title,
                description: content.metaDescription
            };
        }
        return acc;
    }, {} as Record<string, { title: string; description: string }>);

    return (
        <CategoryPageClient
            locale={'zh' as Locale}
            category={category as ToolCategory}
            localizedToolContent={localizedToolContent}
        />
    );
}
