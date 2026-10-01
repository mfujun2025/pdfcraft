import type { Metadata } from 'next';
import { setRequestLocale, getTranslations } from 'next-intl/server';
import { type Locale } from '@/lib/i18n/config';
import { generateFaqMetadata } from '@/lib/seo';
import FAQPageClient from './FAQPageClient';

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations({ locale: 'zh', namespace: 'metadata' });

  return generateFaqMetadata('zh', {
    title: t('faq.title'),
    description: t('faq.description'),
  });
}

export default async function FAQPage() {
  // Enable static rendering
  setRequestLocale('zh');

  return <FAQPageClient locale={'zh' as Locale} />;
}
