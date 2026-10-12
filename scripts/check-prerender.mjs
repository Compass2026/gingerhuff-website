// Fails the build if a service page would ship as a fallback, or if any prerendered page links to a missing route.
import { readFile, access } from 'node:fs/promises';
import { join } from 'node:path';
import { paths, SERVICE_PAGES } from '../.prerender/entry-server.js';
const SITE = 'https://www.gingerhuffinteriors.com';
const fail = [];
const exists = async file => access(file).then(() => true, () => false);
const fileFor = path => path === '/404/' ? 'dist/404.html' : join('dist', path, 'index.html');
const sitemap = await readFile('dist/sitemap.xml', 'utf8');
const titles = new Set(), descriptions = new Set();
for (const page of SERVICE_PAGES) {
  const path = `/${page.id}/`, file = fileFor(path);
  if (!await exists(file)) { fail.push(`${path}: not prerendered`); continue; }
  const html = await readFile(file, 'utf8');
  const h1s = html.match(/<h1\b[^>]*>([\s\S]*?)<\/h1>/g) || [];
  if (h1s.length !== 1 || !h1s[0].includes(page.h1)) fail.push(`${path}: expected one H1 "${page.h1}"`);
  if (!html.includes(`<link rel="canonical" href="${SITE}${path}">`)) fail.push(`${path}: canonical`);
  const title = html.match(/<title>([\s\S]*?)<\/title>/)?.[1], description = html.match(/<meta name="description" content="([^"]*)"/)?.[1];
  if (!title?.startsWith(page.metaTitle.replace(/&/g, '&amp;'))) fail.push(`${path}: title`);
  if (titles.has(title) || descriptions.has(description)) fail.push(`${path}: duplicate title or description`);
  titles.add(title); descriptions.add(description);
  if (!html.includes(`data-service-page="${page.id}"`) || html.includes('Page not found')) fail.push(`${path}: fallback content`);
  if (!html.includes('"@type":"Service"') || !html.includes('"@type":"FAQPage"') || !html.includes('"@type":"BreadcrumbList"')) fail.push(`${path}: structured data`);
  if (!sitemap.includes(`<loc>${SITE}${path}</loc>`)) fail.push(`${path}: missing from sitemap`);
  if (/[–—]/.test(html.slice(html.indexOf('<div id="root">')))) fail.push(`${path}: contains an en or em dash`);
}
const routes = new Set(paths);
for (const path of paths) {
  const html = await readFile(fileFor(path), 'utf8');
  for (const [, href] of html.matchAll(/<a\b[^>]*\bhref="([^"]+)"/g)) {
    const url = href.replace(/&amp;/g, '&');
    const local = url.startsWith(SITE) ? url.slice(SITE.length) || '/' : url.startsWith('/') ? url : null;
    if (!local) continue;
    const route = local.split(/[?#]/)[0];
    if (!routes.has(route) && !await exists(join('dist', decodeURIComponent(route)))) fail.push(`${path}: broken link ${href}`);
  }
  // Every local image or video a page references, including each srcset candidate, must exist in the build.
  const assets = [...html.matchAll(/\b(?:src|href)="(\/[^"]+\.(?:webp|png|svg|jpg|mp4))"/g)].map(match => match[1]);
  for (const [, value] of html.matchAll(/\bsrcSet="([^"]+)"/gi)) assets.push(...value.split(',').map(part => part.trim().split(/\s+/)[0]));
  for (const asset of new Set(assets)) if (!await exists(join('dist', decodeURIComponent(asset)))) fail.push(`${path}: missing asset ${asset}`);
}
if (fail.length) { console.error(fail.join('\n')); process.exit(1); }
console.log(`Checked ${SERVICE_PAGES.length} service pages and internal links on ${paths.length} routes`);
