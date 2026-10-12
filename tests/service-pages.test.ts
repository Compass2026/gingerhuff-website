import { test } from 'node:test';
import assert from 'node:assert/strict';
import { existsSync } from 'node:fs';
import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import App from '../src/App.tsx';
import { SERVICE_PAGES } from '../src/content/service-pages.ts';
import { loadReleasedArticles } from '../src/content/compass-blog.ts';
import { PAGE_PATHS, pageMetadata, resolveRoute } from '../src/routing.ts';

// The inquiry form's existing service options (src/components/ContactSection.tsx).
const INQUIRY_SERVICES = ['Home Interiors', 'Kitchen & Bath', 'Commercial Design', 'E-Design & Virtual Consultation', 'Window Treatments', 'Other Custom Design Sourcing'];
const render = (path: string) => renderToStaticMarkup(React.createElement(App, { initialPath: path }));
const decode = (html: string) => html.replace(/&amp;/g, '&').replace(/&#x27;|&#39;/g, "'").replace(/&quot;/g, '"');

test('each service page resolves at its own URL with unique metadata and one matching H1', () => {
  const titles = new Set<string>(), descriptions = new Set<string>();
  for (const page of SERVICE_PAGES) {
    const path = `/${page.id}/`;
    assert.equal(PAGE_PATHS[page.id], path);
    for (const variant of [path, `/${page.id}`]) assert.equal(resolveRoute(variant).service?.id, page.id);
    const meta = pageMetadata(path);
    assert.equal(meta.canonical, `https://www.gingerhuffinteriors.com${path}`);
    assert.equal(meta.title, `${page.metaTitle} | Ginger Huff Interiors`);
    assert.ok(page.description.length >= 120 && page.description.length <= 170, `${page.id} description length ${page.description.length}`);
    assert.ok(!titles.has(meta.title) && !descriptions.has(meta.description));
    titles.add(meta.title); descriptions.add(meta.description);
    const html = decode(render(path));
    const h1s = html.match(/<h1\b[^>]*>([\s\S]*?)<\/h1>/g) || [];
    assert.equal(h1s.length, 1, `${page.id} has one H1`);
    assert.ok(h1s[0].includes(page.h1));
    assert.ok(!html.includes('Page not found'));
  }
});

test('service pages use the existing inquiry flow and link only to real routes', () => {
  const routes = new Set(Object.values(PAGE_PATHS));
  for (const page of SERVICE_PAGES) {
    assert.ok(INQUIRY_SERVICES.includes(page.inquiryService), `${page.id} inquiry option`);
    const html = decode(render(`/${page.id}/`));
    assert.ok(html.includes(`href="/contact/?service=${encodeURIComponent(page.inquiryService)}"`));
    assert.ok(page.related.length >= 3 && !page.related.includes(page.id));
    for (const related of page.related) assert.ok(html.includes(`href="/${related}/"`), `${page.id} links ${related}`);
    for (const [, href] of html.matchAll(/<a\b[^>]*href="(\/[^"?#]*)/g)) assert.ok(routes.has(href), `${page.id} links to unknown route ${href}`);
    assert.ok(existsSync(`src/assets/images/${page.image.src.split('/').pop()!.replace('.webp', '.png')}`), `${page.id} image source`);
  }
});

test('services overview links to every detail page and keeps window treatments', () => {
  const html = render('/services/');
  for (const page of SERVICE_PAGES) assert.ok(html.includes(`href="/${page.id}/"`), `services links ${page.id}`);
  assert.ok(html.includes('href="/window-treatments/"'));
  assert.equal(resolveRoute('/services/').page, 'services');
  assert.equal(resolveRoute('/window-treatments/').page, 'window-treatments');
});

test('service copy avoids unsupported claims and em dashes', () => {
  const forbidden = [/\b\d+\+?\s*years\b/i, /\breviews?\b/i, /\$\s?\d/, /\b\d+\s*(to|-)\s*\d+\s*weeks\b/i, /award/i, /certified/i, /partner/i, /\btrendy\b/i, /\bcheap\b/i, /\bDIY\b/, /[–—]/];
  for (const page of SERVICE_PAGES) {
    const { crm, image, ...visible } = page;
    const copy = JSON.stringify(visible);
    for (const pattern of forbidden) assert.ok(!pattern.test(copy), `${page.id} matches ${pattern}`);
  }
});

test('blog releases cannot take a service page URL', () => {
  const release = {
    slug: 'kitchen-bath-design', title: 'T', description: 'D', metaTitle: 'M', h1: 'H', datePublished: '2026-10-12', dateModified: '2026-10-12', bodyMarkdown: 'Body',
    cta: { text: 'Go', url: null }, compass: { draft_id: '11111111-1111-4111-8111-111111111111', keyword_id: '22222222-2222-4222-8222-222222222222', release_hash: 'sha256:' + 'a'.repeat(64), version: 1 },
  };
  for (const page of SERVICE_PAGES) assert.throws(() => loadReleasedArticles([{ ...release, slug: page.id }], []), /slug/);
});

test('home makeovers page covers the confirmed home staging service', () => {
  const html = decode(render('/home-makeovers/'));
  assert.ok(/<h2[^>]*id="service-spotlight-heading"[^>]*>Home staging<\/h2>/.test(html));
  assert.ok(html.includes('Do you offer home staging?'));
  assert.ok(pageMetadata('/home-makeovers/').description.includes('home staging'));
  // Only pages with a spotlight render the section.
  assert.ok(!render('/space-planning/').includes('service-spotlight-heading'));
});
