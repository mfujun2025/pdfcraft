/**
 * 首页推广位配置
 * 只用于站内自有业务的品牌展示，集中配置便于后续更换文案或下线。
 */
export interface PromoConfig {
  /** 是否展示（设为 false 即可全站下线，无需改组件） */
  enabled: boolean;
  /** 右上角小标签，用于向用户标明这是推广内容 */
  badge: string;
  /** 主标题 */
  title: string;
  /** 说明文字 */
  description: string;
  /** 要点，两三条即可 */
  highlights: string[];
  /** 主按钮文案 */
  ctaLabel: string;
  /** 落地页地址（中文域名统一用 punycode，避免编码问题） */
  ctaHref: string;
  /** 落地页显示名 */
  siteName: string;
}

export const PROMO_400: PromoConfig = {
  enabled: true,
  badge: '广告',
  title: '企业 400 电话办理 · 全国靓号在线选',
  description:
    '公司对外只留一个号，印在合同、官网、名片上都是同一串数字。全国 400 靓号在线选号，资料齐全当天开通。',
  highlights: ['全国号码在线选', '手机座机都能接', '来电录音可回听'],
  ctaLabel: '免费选号',
  ctaHref: 'https://xn--400-nt1hja4195aifa.xn--fiqs8s',
  siteName: '400电话申请.中国',
};
