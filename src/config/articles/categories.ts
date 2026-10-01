/**
 * 文章分类
 */
import type { ArticleCategory, ArticleCategoryId } from './types';

export const ARTICLE_CATEGORIES: ArticleCategory[] = [
  {
    id: 'convert',
    name: '格式转换',
    description: 'PDF 与 Word、Excel、PPT、图片等格式互转的完整做法与踩坑点。',
  },
  {
    id: 'organize',
    name: '合并拆分',
    description: '多份 PDF 合并、按页拆分、调序、删页等页面整理操作。',
  },
  {
    id: 'optimize',
    name: '压缩优化',
    description: 'PDF 体积压缩、清晰度权衡、文件修复与体积控制。',
  },
  {
    id: 'edit',
    name: '编辑排版',
    description: '水印、页码、页眉页脚、签名、旋转裁剪等排版类操作。',
  },
  {
    id: 'secure',
    name: '加密安全',
    description: 'PDF 加密解密、权限限制、敏感信息遮盖与文件安全检查。',
  },
  {
    id: 'office',
    name: '办公效率',
    description: '扫描件 OCR、电子书阅读、打印拼版等日常办公场景。',
  },
];

export const ARTICLE_CATEGORY_MAP: Record<ArticleCategoryId, ArticleCategory> =
  ARTICLE_CATEGORIES.reduce((acc, category) => {
    acc[category.id] = category;
    return acc;
  }, {} as Record<ArticleCategoryId, ArticleCategory>);

export function getCategoryName(id: ArticleCategoryId): string {
  return ARTICLE_CATEGORY_MAP[id]?.name ?? '全部';
}
