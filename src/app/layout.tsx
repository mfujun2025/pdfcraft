import type { Metadata, Viewport } from 'next';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages, getTranslations } from 'next-intl/server';
import { fontVariables } from '@/lib/fonts';
import { SkipLink } from '@/components/common/SkipLink';
import { generateHomeMetadata } from '@/lib/seo';
import '@/app/globals.css';

/**
 * Viewport configuration for performance
 */
export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#0f172a' },
  ],
};

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations({ locale: 'zh', namespace: 'metadata' });

  return generateHomeMetadata('zh', {
    title: t('home.title'),
    description: t('home.description'),
  });
}

// Root layout - provides the HTML structure and the Chinese i18n provider
export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const messages = await getMessages({ locale: 'zh' });

  return (
    <html lang="zh-CN" dir="ltr" suppressHydrationWarning>
      <head>
        <meta name="color-scheme" content="light dark" />
        <style dangerouslySetInnerHTML={{ __html: 'html{scrollbar-gutter:stable}' }} />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              try {
                if (localStorage.getItem('theme') === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
                  document.documentElement.classList.add('dark')
                } else {
                  document.documentElement.classList.remove('dark')
                }
              } catch (_) {}
            `,
          }}
        />
      </head>
      <body className="min-h-screen bg-background text-foreground antialiased">
        <NextIntlClientProvider messages={messages} locale="zh">
          <div className={`${fontVariables} min-h-screen bg-background text-foreground antialiased font-sans`}>
            <SkipLink targetId="main-content">跳到主要内容</SkipLink>
            {children}
          </div>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
