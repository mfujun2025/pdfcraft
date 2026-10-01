import { setRequestLocale } from 'next-intl/server';
import { type Locale } from '@/lib/i18n/config';
import WorkflowPageClient from './WorkflowPageClient';

export default async function WorkflowPage() {
    // Enable static rendering
    setRequestLocale('zh');

    return <WorkflowPageClient locale={'zh' as Locale} />;
}
