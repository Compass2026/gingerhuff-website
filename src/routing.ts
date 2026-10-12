import type { PageId } from './types';
import { BLOG_POSTS } from './content/articles';
import { SERVICE_PAGES, getServicePage, servicePagePath, type ServicePageId } from './content/service-pages';
export const SITE_URL = 'https://www.gingerhuffinteriors.com';
export const PAGE_PATHS: Record<PageId, string> = { home: '/', about: '/about/', services: '/services/', 'window-treatments': '/window-treatments/', portfolio: '/portfolio/', blog: '/blog/', faq: '/faq/', contact: '/contact/', privacy: '/privacy/', 'not-found': '/404/', ...Object.fromEntries(SERVICE_PAGES.map(page => [page.id, servicePagePath(page.id)])) as Record<ServicePageId, string> };
export const normalizePath = (path: string) => path === '/' ? '/' : '/' + path.replace(/^\/+|\/+$/g, '') + '/';
export function resolveRoute(path: string) {
  const normalized = normalizePath(path);
  const article = BLOG_POSTS.find(post => `/${post.slug}/` === normalized);
  const page = article ? 'blog' : Object.entries(PAGE_PATHS).find(([, value]) => value === normalized)?.[0] as PageId | undefined;
  return { page: page || 'not-found', article, service: page ? getServicePage(page) : undefined };
}
const descriptions: Partial<Record<PageId,string>> = {...Object.fromEntries(SERVICE_PAGES.map(page => [page.id, page.description])),privacy: 'Learn how Ginger Huff Interiors handles website inquiries, analytics, service providers, and requests about your personal information.', about: 'Meet Ginger Huff Interiors, a family-owned design firm serving Edwardsville and the St. Louis metro area with a personal, collaborative approach.',services: 'Explore residential interiors, kitchen and bath design, commercial spaces, and virtual design with Ginger Huff Interiors.', 'window-treatments': 'Explore custom drapery, shutters, Roman shades, and motorized window treatment options for your Edwardsville or St. Louis area home.',portfolio: 'Explore illustrative interior design concepts and discuss the right direction for your home with Ginger Huff Interiors.',blog: 'Read practical interior design advice from Ginger Huff Interiors, including consultation preparation, small spaces, and planning your project.',faq: 'Answers to common questions about interior design services, project budgets, timelines, and getting started with Ginger Huff Interiors.'};
const titles: Record<PageId, string> = {...Object.fromEntries(SERVICE_PAGES.map(page => [page.id, page.metaTitle])) as Record<ServicePageId, string>,home:'Interior Design in Edwardsville & St. Louis',about:'Our Story',services:'Interior Design Services','window-treatments':'Custom Window Treatments',portfolio:'Interior Design Inspiration',blog:'Design Journal',faq:'Interior Design Questions',contact:'Contact',privacy:'Privacy Notice','not-found':'Page Not Found'};
export function pageMetadata(path: string) {
 const { page, article } = resolveRoute(path);
 return { title: article?.metaTitle || (article?.title || titles[page]) + ' | Ginger Huff Interiors', description: article?.excerpt || descriptions[page] || (page === 'contact' ? 'Start your interior design project. Contact Ginger Huff Interiors at 618-791-9113 or request a consultation for your Edwardsville or St. Louis area home.' : 'Family-owned interior design serving Edwardsville and the St. Louis metro area. Explore residential design, kitchen and bath, commercial interiors, and custom window treatments.'), canonical: SITE_URL + normalizePath(path), page };
}
