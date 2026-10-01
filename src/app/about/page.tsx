import type { Metadata } from 'next';
import { setRequestLocale, getTranslations } from 'next-intl/server';
import { type Locale } from '@/lib/i18n/config';
import { generateAboutMetadata } from '@/lib/seo';
import AboutPageClient from './AboutPageClient';

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations({ locale: 'zh', namespace: 'metadata' });

  return generateAboutMetadata('zh', {
    title: t('about.title'),
    description: t('about.description'),
  });
}

export default async function AboutPage() {
  // Enable static rendering
  setRequestLocale('zh');

  return <AboutPageClient locale={'zh' as Locale} />;
}
