import type { BlogPost } from '../types';

type ReleasedArticle = {
  slug: string; title: string; description: string; metaTitle: string; h1: string;
  datePublished: string; dateModified: string; bodyMarkdown: string;
  cta: { text: string; url: string | null };
  compass: { draft_id: string; release_hash: string; keyword_id: string; version: number };
};
const uuid = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
const reserved = new Set(['about','services','window-treatments','portfolio','blog','faq','contact','privacy','404']);

/** Reject malformed releases at build time instead of shipping a partial article. */
export function loadReleasedArticles(input: unknown, legacy: BlogPost[]): BlogPost[] {
  if (!Array.isArray(input)) throw new Error('Compass blog data must be an array');
  const slugs = new Set(legacy.map(post => post.slug));
  const releases = input.map((value: ReleasedArticle) => {
    if (!value || !/^[a-z0-9]+(-[a-z0-9]+)*$/.test(value.slug) || reserved.has(value.slug) || slugs.has(value.slug)) {
      throw new Error('Invalid or duplicate Compass blog slug');
    }
    slugs.add(value.slug);
    for (const field of ['title','description','metaTitle','h1','bodyMarkdown'] as const) {
      if (typeof value[field] !== 'string' || !value[field].trim()) throw new Error(`Missing article ${field}`);
    }
    if (!uuid.test(value.compass?.draft_id ?? '') || !uuid.test(value.compass?.keyword_id ?? '')
      || !/^sha256:[a-f0-9]{64}$/.test(value.compass?.release_hash ?? '')
      || !Number.isInteger(value.compass?.version) || value.compass.version < 1) throw new Error('Missing release provenance');
    for (const date of [value.datePublished, value.dateModified]) {
      if (!/^\d{4}-\d{2}-\d{2}$/.test(date) || new Date(`${date}T12:00:00Z`).toISOString().slice(0,10) !== date) throw new Error('Invalid article date');
    }
    if (!value.cta || typeof value.cta.text !== 'string' || !value.cta.text.trim()
      || (value.cta.url !== null && !/^https:\/\/[^\s<>]+$/.test(value.cta.url))) throw new Error('Invalid article CTA');
    return {
      id: value.compass.draft_id, slug: value.slug, title: value.title, excerpt: value.description,
      metaTitle: value.metaTitle, h1: value.h1, content: value.bodyMarkdown,
      date: new Date(`${value.datePublished}T12:00:00Z`).toLocaleDateString('en-US', { timeZone:'UTC', month:'long',day:'numeric',year:'numeric' }),
      datePublished: value.datePublished, dateModified: value.dateModified,
      author: 'Ginger Huff Interiors', category: 'Design Advice', image: '',
      readTime: `${Math.max(1, Math.ceil(value.bodyMarkdown.split(/\s+/).length / 220))} min read`,
      cta: value.cta, compass: value.compass,
    };
  });
  return [...releases.sort((a,b) => b.datePublished.localeCompare(a.datePublished)), ...legacy];
}
