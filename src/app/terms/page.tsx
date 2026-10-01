import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import { type Locale } from '@/lib/i18n/config';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { generateBaseMetadata } from '@/lib/seo';

export async function generateMetadata(): Promise<Metadata> {
  return generateBaseMetadata({
    locale: 'zh',
    path: '/terms',
    title: '服务条款',
    description:
      'pdf.中国 服务条款：工具使用范围、免费与商用说明、用户责任、免责声明与条款变更方式。',
    keywords: ['服务条款', '使用协议', 'PDF工具使用规范'],
  });
}

const EMAIL = 'mfujun@agent.qq.com';

export default async function TermsPage() {
  const locale: Locale = 'zh';
  setRequestLocale(locale);

  return (
    <div className="min-h-screen flex flex-col">
      <Header locale={locale} />
      <main className="flex-1 pt-20" id="main-content">
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-3xl mx-auto">
            <h1 className="text-3xl font-bold text-[hsl(var(--color-foreground))] mb-6">服务条款</h1>
            <p className="text-sm text-[hsl(var(--color-muted-foreground))] mb-10">
              最近更新：2026-10-01
            </p>

            <div className="space-y-8 text-[hsl(var(--color-foreground))] leading-8">
              <section>
                <h2 className="text-xl font-bold mb-3">一、服务内容</h2>
                <p>
                  pdf.中国 提供在线 PDF 处理工具，包括合并、拆分、压缩、转换、编辑、加密等。
                  所有处理默认在您的浏览器本地完成，文件不会被上传到我们的服务器。
                </p>
              </section>

              <section>
                <h2 className="text-xl font-bold mb-3">二、使用许可与费用</h2>
                <p>
                  本站工具免费使用，无需注册。个人与商业用途均可使用。您需要自行确保对处理的文件
                  拥有合法权利，并自行承担处理结果的使用后果。
                </p>
              </section>

              <section>
                <h2 className="text-xl font-bold mb-3">三、用户责任</h2>
                <ul className="list-disc pl-6 space-y-2">
                  <li>不得使用本站工具处理违法违规内容。</li>
                  <li>不得对本站发起自动化高频请求、压测或尝试入侵。</li>
                  <li>不得移除、遮挡本站的版权与来源标识后二次分发。</li>
                </ul>
              </section>

              <section>
                <h2 className="text-xl font-bold mb-3">四、免责声明</h2>
                <p>
                  本站按「现状」提供工具，不对处理结果的准确性、完整性或适用于特定用途作出保证。
                  涉及合同、证件、财务等关键文件时，请务必人工复核处理结果，并保留原始文件备份。
                </p>
              </section>

              <section>
                <h2 className="text-xl font-bold mb-3">五、条款变更与联系方式</h2>
                <p>
                  我们可能根据服务调整更新本条款，更新后会在本页标注日期。如对条款有疑问，可发邮件至{' '}
                  <a
                    href={`mailto:${EMAIL}`}
                    className="text-[hsl(var(--color-primary))] hover:underline break-all"
                  >
                    {EMAIL}
                  </a>
                  。
                </p>
              </section>
            </div>
          </div>
        </div>
      </main>
      <Footer locale={locale} />
    </div>
  );
}
