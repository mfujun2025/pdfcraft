import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import { type Locale } from '@/lib/i18n/config';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { generateBaseMetadata } from '@/lib/seo';

export async function generateMetadata(): Promise<Metadata> {
  return generateBaseMetadata({
    locale: 'zh',
    path: '/cookies',
    title: 'Cookie 说明',
    description:
      'pdf.中国 Cookie 说明：本站使用本地存储保存主题与语言偏好，不用于广告追踪，以及如何清除这些数据。',
    keywords: ['Cookie', '本地存储', '隐私', '浏览器数据'],
  });
}

const EMAIL = 'mfujun@agent.qq.com';

export default async function CookiesPage() {
  const locale: Locale = 'zh';
  setRequestLocale(locale);

  return (
    <div className="min-h-screen flex flex-col">
      <Header locale={locale} />
      <main className="flex-1 pt-20" id="main-content">
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-3xl mx-auto">
            <h1 className="text-3xl font-bold text-[hsl(var(--color-foreground))] mb-6">Cookie 说明</h1>
            <p className="text-sm text-[hsl(var(--color-muted-foreground))] mb-10">
              最近更新：2026-10-01
            </p>

            <div className="space-y-8 text-[hsl(var(--color-foreground))] leading-8">
              <section>
                <h2 className="text-xl font-bold mb-3">我们存了什么</h2>
                <p>
                  本站不使用第三方广告或跨站追踪 Cookie。为了让站点正常工作，浏览器本地会保存少量数据：
                </p>
                <ul className="list-disc pl-6 mt-3 space-y-2">
                  <li>
                    <strong>主题偏好</strong>：记录您选择浅色还是深色界面，键名 <code>theme</code>。
                  </li>
                  <li>
                    <strong>最近文件与项目记录</strong>：记录您在本地处理过哪些文件、用过哪些工具，
                    仅保存在您的浏览器里，方便下次直接打开工具。
                  </li>
                </ul>
              </section>

              <section>
                <h2 className="text-xl font-bold mb-3">这些数据在哪</h2>
                <p>
                  上述数据全部保存在您自己的浏览器（localStorage / IndexedDB）中，
                  不会上传到我们的服务器，我们也无法读取。
                </p>
              </section>

              <section>
                <h2 className="text-xl font-bold mb-3">如何清除</h2>
                <ol className="list-decimal pl-6 space-y-2">
                  <li>打开浏览器的「设置 → 隐私与安全 → 网站数据」。</li>
                  <li>搜索本站域名，选择「删除该站点的数据」。</li>
                  <li>刷新页面，偏好设置与最近文件记录即被清空。</li>
                </ol>
              </section>

              <section>
                <h2 className="text-xl font-bold mb-3">联系方式</h2>
                <p>
                  如对本站的数据处理方式有疑问，可发邮件至{' '}
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
