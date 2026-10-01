import { setRequestLocale } from 'next-intl/server';
import { type Locale } from '@/lib/i18n/config';
import HomePageClient from './HomePageClient';

export default async function HomePage() {
  const locale: Locale = 'zh';

  // Enable static rendering
  setRequestLocale(locale);

  // Get localized content for tools
  const { tools } = await import('@/config/tools');
  const { getToolContent } = await import('@/config/tool-content');

  const localizedToolContent = tools.reduce((acc, tool) => {
    const content = getToolContent(locale, tool.id);
    // Use metaDescription for the card description as it's short and summary-like
    // Use title from the content
    if (content) {
      acc[tool.id] = {
        title: content.title,
        description: content.metaDescription
      };
    }
    return acc;
  }, {} as Record<string, { title: string; description: string }>);

  return <HomePageClient locale={locale as Locale} localizedToolContent={localizedToolContent} />;
}
