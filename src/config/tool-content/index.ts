/**
 * 工具页内容（中文单语）
 * 站点已收敛为中文，原 14 语言内容文件（约 4.3MB）已移除，
 * 保留 getToolContent 的调用签名以兼容既有页面组件。
 */

import { toolContentZh } from './zh';
import type { ToolContent } from '@/types/tool';
import type { Locale } from '@/lib/i18n/config';

export { toolContentZh };
export type { Locale };

/**
 * Get tool content for a locale
 * 单语站点：仅存在中文内容
 */
export function getToolContent(locale: Locale, toolId: string): ToolContent | undefined {
  void locale;
  return toolContentZh[toolId];
}
