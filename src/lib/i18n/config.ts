/**
 * i18n Configuration
 * 本站已收敛为中文单语站点（pdf.中国），保留 next-intl 运行时以保证
 * useTranslations / NextIntlClientProvider 等既有组件零改动。
 * URL 不再带语言前缀，页面直接位于站点根路径下。
 */

export const locales = ['zh'] as const;
export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = 'zh';

export const localeConfig: Record<Locale, {
  name: string;
  nativeName: string;
  direction: 'ltr' | 'rtl';
  dateFormat: string;
}> = {
  zh: { name: 'Chinese (Simplified)', nativeName: '简体中文', direction: 'ltr', dateFormat: 'YYYY-MM-DD' },
};

/**
 * Check if a locale is RTL
 */
export function isRTL(locale: Locale): boolean {
  return localeConfig[locale].direction === 'rtl';
}

/**
 * Check if a string is a valid locale
 */
export function isValidLocale(locale: string): locale is Locale {
  return locales.includes(locale as Locale);
}

/**
 * Get locale from path
 */
export function getLocaleFromPath(path: string): Locale | null {
  const segments = path.split('/').filter(Boolean);
  const firstSegment = segments[0];
  if (firstSegment && isValidLocale(firstSegment)) {
    return firstSegment;
  }
  return null;
}

/**
 * Generate localized path
 * 单语站点下为恒等映射，保留函数以兼容既有调用与测试。
 */
export function getLocalizedPath(path: string, locale: Locale): string {
  // Remove any existing locale prefix (must be followed by / or end of string)
  const cleanPath = path.replace(/^\/(en|ja|ko|es|fr|de|zh-TW|zh|pt|ar|it|id|vi|ro)(\/|$)/, '/');
  // Normalize the path - ensure it starts with / and handle empty paths
  const normalizedPath = cleanPath === '/' ? '/' : cleanPath.replace(/^\/+/, '/');
  // Add the new locale prefix
  return `/${locale}${normalizedPath === '/' ? '/' : normalizedPath}`;
}
