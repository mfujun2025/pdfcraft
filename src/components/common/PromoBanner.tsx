import React from 'react';
import { PhoneCall, ArrowRight, Check } from 'lucide-react';
import { PROMO_400 } from '@/config/promo';

/**
 * 首页通栏推广位
 * 配置见 src/config/promo.ts，把 enabled 设为 false 即可下线。
 */
export const PromoBanner: React.FC = () => {
  if (!PROMO_400.enabled) return null;

  return (
    <section className="py-10" aria-label="企业 400 电话办理推广">
      <div className="container mx-auto px-4">
        <div className="relative overflow-hidden rounded-2xl border border-[hsl(var(--color-primary)/0.25)] bg-[hsl(var(--color-primary)/0.06)] px-6 py-8 md:px-10 md:py-10">
          <span className="absolute right-4 top-4 rounded-full border border-[hsl(var(--color-border))] bg-[hsl(var(--color-background)/0.8)] px-2 py-0.5 text-[11px] text-[hsl(var(--color-muted-foreground))]">
            {PROMO_400.badge}
          </span>

          <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <div className="flex items-start gap-4">
              <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-[hsl(var(--color-primary)/0.12)] text-[hsl(var(--color-primary))]">
                <PhoneCall className="h-6 w-6" aria-hidden="true" />
              </div>
              <div className="min-w-0">
                <h2 className="text-xl md:text-2xl font-bold text-[hsl(var(--color-foreground))] mb-2">
                  {PROMO_400.title}
                </h2>
                <p className="text-sm md:text-base text-[hsl(var(--color-muted-foreground))] leading-relaxed max-w-2xl">
                  {PROMO_400.description}
                </p>
                <ul className="mt-4 flex flex-wrap gap-x-5 gap-y-2">
                  {PROMO_400.highlights.map((item) => (
                    <li
                      key={item}
                      className="flex items-center gap-1.5 text-sm text-[hsl(var(--color-foreground))]"
                    >
                      <Check className="h-4 w-4 text-[hsl(var(--color-primary))]" aria-hidden="true" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="flex flex-col items-start md:items-end gap-2 flex-shrink-0">
              <a
                href={PROMO_400.ctaHref}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-lg bg-[hsl(var(--color-primary))] px-6 py-3 text-sm font-semibold text-white shadow-sm transition-all hover:opacity-90 hover:-translate-y-0.5"
              >
                {PROMO_400.ctaLabel}
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </a>
              <span className="text-xs text-[hsl(var(--color-muted-foreground))]">
                跳转 {PROMO_400.siteName}
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PromoBanner;
