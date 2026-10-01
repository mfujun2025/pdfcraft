/**
 * Site configuration — pdf.中国（中文单语站）
 */
export const siteConfig = {
  name: 'pdf.中国',
  description:
    '免费在线 PDF 工具：合并、拆分、压缩、转换、编辑、加密 PDF。全部在浏览器本地完成，文件不上传服务器，安全私密。',
  // 站点正式域名（punycode 形式，避免编码差异导致的 canonical 不一致）
  url: 'https://pdf.xn--fiqs8s',
  ogImage: '/images/og-image.png',
  contactEmail: 'mfujun@agent.qq.com',
  links: {
    github: 'https://github.com/mfujun2025/pdfcraft',
    twitter: '',
    email: 'mfujun@agent.qq.com',
  },
  creator: 'pdf.中国',
  keywords: [
    'PDF工具',
    '在线PDF工具',
    'PDF转换',
    'PDF合并',
    'PDF拆分',
    'PDF压缩',
    'PDF编辑',
    'PDF加密',
    '免费PDF',
    '浏览器本地处理',
  ],
  // SEO-related settings
  seo: {
    titleTemplate: '%s | pdf.中国',
    defaultTitle: 'pdf.中国 - 免费在线 PDF 工具',
    twitterHandle: '',
    locale: 'zh_CN',
  },
};

/**
 * Navigation configuration
 */
export const navConfig = {
  mainNav: [
    { title: '首页', href: '/' },
    { title: '工具', href: '/tools' },
    { title: '文章', href: '/articles' },
    { title: '工作流', href: '/workflow' },
    { title: '关于', href: '/about' },
    { title: '常见问题', href: '/faq' },
  ],
  footerNav: [
    { title: '隐私政策', href: '/privacy' },
    { title: '联系我们', href: '/contact' },
  ],
};
