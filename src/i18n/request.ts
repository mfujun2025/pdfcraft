import { getRequestConfig } from 'next-intl/server';
import zhMessages from '../../messages/zh.json';

/**
 * 中文单语站点：所有请求固定使用 messages/zh.json。
 * 不再有语言协商与 en 兜底，构建期也无需再打包 14 份语言包。
 */
export default getRequestConfig(async () => ({
  locale: 'zh',
  messages: zhMessages,
  timeZone: 'Asia/Shanghai',
  now: new Date(),
}));
