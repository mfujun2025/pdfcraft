import type { Metadata } from 'next';
import { setRequestLocale, getTranslations } from 'next-intl/server';
import { type Locale } from '@/lib/i18n/config';
import { generatePrivacyMetadata } from '@/lib/seo';
import PrivacyPageClient from './PrivacyPageClient';

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations({ locale: 'zh', namespace: 'metadata' });

  return generatePrivacyMetadata('zh', {
    title: t('privacy.title'),
    description: t('privacy.description'),
  });
}

export default async function PrivacyPage() {
  // Enable static rendering
  setRequestLocale('zh');

  return <PrivacyPageClient locale={'zh' as Locale} />;
}
