/* Compass blog hero image (compass-blog.json `hero_image`).

   The Compass CRM publishes an approved article into data/blog-posts.json
   and, when it has an approved hero, commits the image in the same commit at
   public/blog/images/<slug>-<hash12>.<ext>. The article then carries
   heroImage {src, alt, width, height, illustrative}.

   The hero shows with its alt text and no caption: `illustrative` is the
   CRM's internal classification (a generated graphic, not a photo of
   Ginger's work) and is never printed on the page. A malformed hero fails
   the build rather than shipping, and the src can only ever be a committed
   file in /blog/images/, never another host. */

export interface HeroImage {
  src: string;
  alt: string;
  width: number;
  height: number;
  /** Internal classification only; never rendered as text. */
  illustrative: boolean;
}

export const HERO_IMAGE_DIR = 'public/blog/images';
export const HERO_IMAGE_URL_PREFIX = '/blog/images/';
const HERO_FILE = /^\/blog\/images\/[a-z0-9]+(-[a-z0-9]+)*-[0-9a-f]{12}\.(png|jpe?g|webp)$/;

/** WebP widths written next to the original at build time (scripts/blog-hero-images.mjs). */
export const HERO_WIDTHS = [640, 1024, 1536];
/** The article column is max-w-3xl (768px); the journal grid is three columns on desktop. */
export const HERO_SIZES = '(min-width: 768px) 768px, 100vw';
export const CARD_SIZES = '(min-width: 1024px) 352px, (min-width: 768px) 50vw, 100vw';

/** Validate the article's hero; undefined when it has none, an error when it is malformed. */
export function loadHero(value: unknown): HeroImage | undefined {
  if (value === undefined || value === null) return undefined;
  if (typeof value !== 'object') throw new Error('Invalid article hero image');
  const h = value as Record<string, unknown>;
  if (typeof h.src !== 'string' || !HERO_FILE.test(h.src)) throw new Error('Article hero image must be a committed file in /blog/images/');
  if (typeof h.alt !== 'string' || !h.alt.trim() || h.alt.length > 250) throw new Error('Article hero image needs alt text');
  if (!Number.isInteger(h.width) || !Number.isInteger(h.height) || (h.width as number) < 1 || (h.height as number) < 1) {
    throw new Error('Article hero image needs its dimensions');
  }
  if (typeof h.illustrative !== 'boolean') throw new Error('Article hero image needs its illustrative flag');
  return { src: h.src, alt: h.alt, width: h.width as number, height: h.height as number, illustrative: h.illustrative };
}

/** The build-time WebP variants of a hero, only those narrower than the original. */
export function heroVariants(hero: Pick<HeroImage, 'src' | 'width'>): { width: number; src: string }[] {
  const base = hero.src.replace(/\.(png|jpe?g|webp)$/, '');
  return HERO_WIDTHS.filter(width => width < hero.width).map(width => ({ width, src: `${base}-${width}.webp` }));
}
