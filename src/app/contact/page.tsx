import type { Metadata } from 'next';
import { setRequestLocale, getTranslations } from 'next-intl/server';
import { type Locale } from '@/lib/i18n/config';
import { generateContactMetadata } from '@/lib/seo';
import ContactPageClient from './ContactPageClient';

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations({ locale: 'zh', namespace: 'metadata' });

  return generateContactMetadata('zh', {
    title: t('contact.title'),
    description: t('contact.description'),
  });
}

export default async function ContactPage() {
  // Enable static rendering
  setRequestLocale('zh');

  return <ContactPageClient locale={'zh' as Locale} />;
}
