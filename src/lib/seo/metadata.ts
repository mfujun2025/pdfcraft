/**
 * SEO Metadata Generation Utilities
 * Provides functions for generating meta tags, Open Graph, and Twitter Card data
 * 
 * @module lib/seo/metadata
 */

import type { Metadata } from 'next';
import { siteConfig } from '@/config/site';
import { type Locale, localeConfig, locales } from '@/lib/i18n/config';
import type { Tool, ToolContent } from '@/types/tool';
import { getBasePath } from '@/lib/utils/path';

/**
 * Base metadata configuration
 */
export interface BaseMetadataOptions {
  locale: Locale;
  path?: string;
}

/**
 * Page-specific metadata options
 */
export interface PageMetadataOptions extends BaseMetadataOptions {
  title: string;
  description: string;
  keywords?: string[];
  image?: string;
  noIndex?: boolean;
}

/**
 * Tool page metadata options
 */
export interface ToolMetadataOptions extends BaseMetadataOptions {
  tool: Tool;
  content: ToolContent;
}

/**
 * Generate the canonical URL for a page
 * 中文单语站点：URL 不带语言前缀
 */
export function getCanonicalUrl(locale: Locale, path: string = ''): string {
  const cleanPath = path.startsWith('/') ? path : `/${path}`;
  const basePath = getBasePath().replace(/\/$/, '');
  return `${siteConfig.url}${basePath}${cleanPath === '/' ? '/' : cleanPath}`;
}

/**
 * Generate alternate language URLs for hreflang tags
 * 单语站点下所有语言（仅 zh）与 x-default 指向同一 URL
 */
export function getAlternateUrls(path: string = ''): Record<string, string> {
  const cleanPath = path.startsWith('/') ? path : `/${path}`;
  const alternates: Record<string, string> = {};
  const basePath = getBasePath().replace(/\/$/, '');
  const url = `${siteConfig.url}${basePath}${cleanPath === '/' ? '/' : cleanPath}`;

  for (const locale of locales) {
    alternates[locale] = url;
  }

  // Add x-default pointing to the same page
  alternates['x-default'] = url;

  return alternates;
}

/**
 * Generate base metadata for any page
 */
export function generateBaseMetadata(options: PageMetadataOptions): Metadata {
  const { locale, path = '', title, description, keywords = [], image, noIndex = false } = options;

  const fullTitle = title.includes(siteConfig.name)
    ? title
    : `${title} | ${siteConfig.name}`;

  const canonicalUrl = getCanonicalUrl(locale, path);
  const ogImage = image || siteConfig.ogImage;
  const ogLocale = getOpenGraphLocale(locale);

  // Ensure description is optimal length (150-160 characters)
  const optimizedDescription = description.length > 160
    ? description.substring(0, 157) + '...'
    : description;

  return {
    title: fullTitle,
    description: optimizedDescription,
    keywords: [...new Set([...keywords, 'PDF', 'PDF tools', 'free', 'online', siteConfig.name])],
    authors: [{ name: siteConfig.creator }],
    creator: siteConfig.creator,
    publisher: siteConfig.name,
    robots: noIndex
      ? { index: false, follow: false }
      : {
        index: true,
        follow: true,
        'max-snippet': -1,
        'max-image-preview': 'large',
        'max-video-preview': -1,
      },
    icons: {
      icon: '/favicon.svg',
      shortcut: '/favicon.svg',
      apple: '/favicon.svg',
    },
    alternates: {
      canonical: canonicalUrl,
      languages: getAlternateUrls(path),
    },
    openGraph: {
      type: 'website',
      locale: ogLocale,
      url: canonicalUrl,
      title: fullTitle,
      description: optimizedDescription,
      siteName: siteConfig.name,
      images: [
        {
          url: ogImage.startsWith('http') ? ogImage : `${siteConfig.url}${ogImage}`,
          width: 1200,
          height: 630,
          alt: fullTitle,
          type: 'image/png',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: fullTitle,
      description: optimizedDescription,
      images: [ogImage.startsWith('http') ? ogImage : `${siteConfig.url}${ogImage}`],
      creator: siteConfig.creator,
    },
    verification: {
      // Add verification tags if needed
      // google: 'google-site-verification-code',
      // yandex: 'yandex-verification-code',
    },
    category: 'technology',
  };
}

/**
 * Generate metadata for tool pages
 */
export function generateToolMetadata(options: ToolMetadataOptions): Metadata {
  const { locale, tool, content } = options;
  const path = `/tools/${tool.slug}`;

  // Enhance keywords with common PDF-related terms
  const enhancedKeywords = [
    ...content.keywords,
    'free',
    'online',
    'no registration',
    'browser-based',
    'secure',
    'private',
  ];

  return generateBaseMetadata({
    locale,
    path,
    title: content.title,
    description: content.metaDescription,
    keywords: enhancedKeywords,
  });
}

/**
 * Generate metadata for the homepage
 */
export function generateHomeMetadata(locale: Locale, translations?: { title: string; description: string }): Metadata {
  const defaultTitle = `${siteConfig.name} - 免费在线 PDF 工具`;
  const defaultDescription = siteConfig.description;

  return generateBaseMetadata({
    locale,
    path: '',
    title: translations?.title || defaultTitle,
    description: translations?.description || defaultDescription,
    keywords: ['PDF工具', 'PDF合并', 'PDF拆分', 'PDF压缩', 'PDF转换', '免费PDF工具', '在线PDF编辑器'],
  });
}

/**
 * Generate metadata for the tools listing page
 */
export function generateToolsListMetadata(locale: Locale, translations?: { title: string; description: string }): Metadata {
  return generateBaseMetadata({
    locale,
    path: '/tools',
    title: translations?.title || 'All PDF Tools',
    description: translations?.description || 'Browse all 67+ professional PDF tools. Merge, split, compress, convert, edit, and secure your PDF files for free.',
    keywords: ['PDF tools', 'all PDF tools', 'PDF editor', 'PDF converter', 'PDF merger', 'PDF splitter'],
  });
}

/**
 * Generate metadata for the about page
 */
export function generateAboutMetadata(locale: Locale, translations?: { title: string; description: string }): Metadata {
  return generateBaseMetadata({
    locale,
    path: '/about',
    title: translations?.title || 'About',
    description: translations?.description || `Learn about ${siteConfig.name} - your free, private, and powerful PDF toolkit. All processing happens in your browser.`,
    keywords: ['about', 'PDF tools', 'privacy', 'browser-based'],
  });
}

/**
 * Generate metadata for the FAQ page
 */
export function generateFaqMetadata(locale: Locale, translations?: { title: string; description: string }): Metadata {
  return generateBaseMetadata({
    locale,
    path: '/faq',
    title: translations?.title || 'Frequently Asked Questions',
    description: translations?.description || `Find answers to common questions about ${siteConfig.name}. Learn how to use our PDF tools effectively.`,
    keywords: ['FAQ', 'help', 'questions', 'PDF tools help'],
  });
}

/**
 * Generate metadata for the privacy page
 */
export function generatePrivacyMetadata(locale: Locale, translations?: { title: string; description: string }): Metadata {
  return generateBaseMetadata({
    locale,
    path: '/privacy',
    title: translations?.title || 'Privacy Policy',
    description: translations?.description || `${siteConfig.name} privacy policy. Your files never leave your device - all processing happens locally in your browser.`,
    keywords: ['privacy', 'security', 'data protection', 'local processing'],
  });
}

/**
 * Generate metadata for the contact page
 */
export function generateContactMetadata(locale: Locale, translations?: { title: string; description: string }): Metadata {
  return generateBaseMetadata({
    locale,
    path: '/contact',
    title: translations?.title || 'Contact Us',
    description: translations?.description || `Get in touch with ${siteConfig.name} team. We'd love to hear from you.`,
    keywords: ['contact', 'support', 'help', 'feedback'],
  });
}

/**
 * Generate metadata for the articles listing page
 */
export function generateArticlesListMetadata(
  locale: Locale,
  translations?: { title: string; description: string }
): Metadata {
  return generateBaseMetadata({
    locale,
    path: '/articles',
    title: translations?.title || 'PDF 实用教程与技巧',
    description:
      translations?.description ||
      'PDF 转换、合并、压缩、编辑、加密的实操教程。每个问题都给可照做的步骤和判断标准，不做空泛科普。',
    keywords: ['PDF教程', 'PDF技巧', 'PDF使用方法', 'PDF转换教程', 'PDF压缩方法'],
  });
}

/**
 * Generate metadata for an article page
 */
export function generateArticleMetadata(
  locale: Locale,
  article: { slug: string; seoTitle: string; description: string; keywords: string[] }
): Metadata {
  return generateBaseMetadata({
    locale,
    path: `/articles/${article.slug}`,
    title: article.seoTitle,
    description: article.description,
    keywords: article.keywords,
    noIndex: false,
  });
}

/**
 * Convert locale to Open Graph locale format
 */
export function getOpenGraphLocale(locale: Locale): string {
  const ogLocaleMap: Record<string, string> = {
    zh: 'zh_CN',
  };
  return ogLocaleMap[locale] || 'zh_CN';
}

/**
 * Check if metadata contains all required fields
 */
export function validateMetadata(metadata: Metadata): {
  valid: boolean;
  missingFields: string[];
} {
  const requiredFields = ['title', 'description'];
  const requiredOgFields = ['title', 'description'];
  const requiredTwitterFields = ['card', 'title', 'description'];

  const missingFields: string[] = [];

  // Check base fields
  for (const field of requiredFields) {
    if (!metadata[field as keyof Metadata]) {
      missingFields.push(field);
    }
  }

  // Check Open Graph fields
  if (metadata.openGraph) {
    for (const field of requiredOgFields) {
      if (!metadata.openGraph[field as keyof typeof metadata.openGraph]) {
        missingFields.push(`og:${field}`);
      }
    }
  } else {
    missingFields.push('openGraph');
  }

  // Check Twitter Card fields
  if (metadata.twitter) {
    for (const field of requiredTwitterFields) {
      if (!metadata.twitter[field as keyof typeof metadata.twitter]) {
        missingFields.push(`twitter:${field}`);
      }
    }
  } else {
    missingFields.push('twitter');
  }

  return {
    valid: missingFields.length === 0,
    missingFields,
  };
}
