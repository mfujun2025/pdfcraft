import { setRequestLocale } from 'next-intl/server';
import { type Locale } from '@/lib/i18n/config';
import { TOOL_CATEGORIES, type ToolCategory } from '@/types/tool';
import CategoryPageClient from './CategoryPageClient';
import { notFound } from 'next/navigation';

export function generateStaticParams() {
    return TOOL_CATEGORIES.map((category) => ({
        category,
    }));
}

export async function generateMetadata({ params }: { params: Promise<{ category: string }> }) {
    const { category } = await params;

    const formattedCategory = category
        .split('-')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');

    return {
        title: `${formattedCategory} Tools - pdf.中国`,
        description: `Free online ${formattedCategory} tools. Secure, fast, and easy to use.`,
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
