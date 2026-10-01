/**
 * 文章数据结构定义
 * 文章以结构化数据描述，构建期渲染为静态页面，便于批量维护与 SEO 结构化输出。
 */

export type ArticleCategoryId =
  | 'convert'
  | 'organize'
  | 'optimize'
  | 'edit'
  | 'secure'
  | 'office';

export interface ArticleSection {
  /** 小节标题 */
  heading: string;
  /** 正文段落 */
  paragraphs?: string[];
  /** 要点列表 */
  list?: string[];
  /** 列表是否为有序列表（步骤类内容用 true） */
  ordered?: boolean;
  /** 简单表格 */
  table?: {
    headers: string[];
    rows: string[][];
  };
  /** 提示框（说明、注意事项） */
  note?: string;
}

export interface ArticleFaq {
  question: string;
  answer: string;
}

export interface ArticleToolLink {
  /** 站内工具 slug，必须与 src/config/tools.ts 中真实存在的 slug 一致 */
  slug: string;
  /** 链接锚文本 */
  label: string;
}

export interface Article {
  /** URL 片段，/articles/{slug} */
  slug: string;
  /** 页面 H1 与列表页标题 */
  title: string;
  /** <title> 标签内容（可带关键词，不含站点名，渲染时自动追加） */
  seoTitle: string;
  /** meta description，建议 70-120 字 */
  description: string;
  /** 列表页摘要，建议 40-80 字 */
  summary: string;
  keywords: string[];
  category: ArticleCategoryId;
  /** YYYY-MM-DD */
  publishedAt: string;
  /** YYYY-MM-DD */
  updatedAt: string;
  readingMinutes: number;
  /** 文中推荐的工具，渲染为内链卡片 */
  tools: ArticleToolLink[];
  sections: ArticleSection[];
  faqs?: ArticleFaq[];
}

export interface ArticleCategory {
  id: ArticleCategoryId;
  name: string;
  description: string;
}
