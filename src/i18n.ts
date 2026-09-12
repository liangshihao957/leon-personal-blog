export const locales = ['zh', 'en'] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = 'zh';

export const isLocale = (v: unknown): v is Locale => v === 'zh' || v === 'en';

const translations = {
  zh: {
    'site.title': 'Leon 的个人博客',
    'site.desc': '记录技术笔记与生活随笔',
    'site.brand': 'Leon 的博客',
    'nav.tags': '标签',
    'nav.about': '关于',
    'search.placeholder': '搜索文章',
    'theme.toggle': '切换明暗模式',
    'lang.switch': 'EN',
    'hero.eyebrow': 'Personal Blog',
    'hero.sub': '记录技术笔记与生活随笔，欢迎交流。',
    'section.latest': '最新文章',
    'footer.copyright': '© {year} Leon',
    'footer.powered': '由 Astro 驱动',
    'back.home': '← 返回首页',
    'back.tags': '← 标签归档',
    'meta.tags': '标签归档',
    'meta.tags.desc': '按标签浏览全部文章',
    'meta.about': '关于',
    'meta.about.desc': '关于我和这个博客',
    'read.minutes': '约 {n} 分钟阅读',
    'updated.on': '更新于',
    'prev.post': '← 上一篇',
    'next.post': '下一篇 →',
    'tags.count': '共 {n} 个标签',
    'posts.count': '共 {n} 篇文章',
    'about.sub': '关于我 & 这个博客',
    'back.top': '回到顶部',
    'pagination.prev': '上一页',
    'pagination.next': '下一页',
    'comments.title': '评论',
  },
  en: {
    'site.title': "Leon's Blog",
    'site.desc': 'Notes on tech & life',
    'site.brand': "Leon's Blog",
    'nav.tags': 'Tags',
    'nav.about': 'About',
    'search.placeholder': 'Search posts',
    'theme.toggle': 'Toggle theme',
    'lang.switch': '中文',
    'hero.eyebrow': 'Personal Blog',
    'hero.sub': 'Notes on tech and life. Welcome!',
    'section.latest': 'Latest Posts',
    'footer.copyright': '© {year} Leon',
    'footer.powered': 'Powered by Astro',
    'back.home': '← Back Home',
    'back.tags': '← All Tags',
    'meta.tags': 'Tags',
    'meta.tags.desc': 'Browse all posts by tag',
    'meta.about': 'About',
    'meta.about.desc': 'About me and this blog',
    'read.minutes': 'About {n} min read',
    'updated.on': 'Updated',
    'prev.post': '← Previous',
    'next.post': 'Next →',
    'tags.count': '{n} tags',
    'posts.count': '{n} posts',
    'about.sub': 'About Me & This Blog',
    'back.top': 'Back to top',
    'pagination.prev': 'Prev',
    'pagination.next': 'Next',
    'comments.title': 'Comments',
  },
} as const;

export type TranslationKey = keyof typeof translations.zh;

export function t(
  locale: Locale,
  key: TranslationKey,
  vars?: Record<string, string | number>,
): string {
  let str: string = translations[locale]?.[key] ?? translations[defaultLocale][key];
  if (vars) {
    for (const [k, v] of Object.entries(vars)) {
      str = str.replaceAll(`{${k}}`, String(v));
    }
  }
  return str;
}

/** 去掉当前语言前缀，得到该页面的根路径（如 /en/blog/x/ → /blog/x/） */
export function rootPathOf(pathname: string, locale: Locale): string {
  const prefix = `/${locale}`;
  if (pathname === prefix) return '/';
  return pathname.startsWith(`${prefix}/`) ? pathname.slice(prefix.length) : pathname;
}
