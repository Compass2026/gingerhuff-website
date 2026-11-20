// After the client and SSR builds: responsive WebP variants of each Compass blog
// hero image, written next to the original in dist/blog/images/. The original
// committed file stays the <img> src (the file the Compass CRM's live
// verification checks); the variants are only offered through <source srcset>.
import { access } from 'node:fs/promises';
import { join } from 'node:path';
import sharp from 'sharp';
import { BLOG_POSTS, heroVariants } from '../.prerender/entry-server.js';

let written = 0;
for (const post of BLOG_POSTS) {
  if (!post.heroImage) continue;
  const source = join('dist', post.heroImage.src);
  await access(source).catch(() => { throw new Error(`${post.slug}: hero image ${post.heroImage.src} is not in public/blog/images/`); });
  // Width and height only set the reserved box (the page frames heroes 16:9), so a
  // mismatch is reported, not fatal. EXIF-rotated photos report swapped dimensions.
  const meta = await sharp(source).metadata();
  const [width, height] = (meta.orientation ?? 1) >= 5 ? [meta.height, meta.width] : [meta.width, meta.height];
  if (width !== post.heroImage.width || height !== post.heroImage.height) {
    console.warn(`${post.slug}: hero image is ${width}x${height}, the article says ${post.heroImage.width}x${post.heroImage.height}`);
  }
  for (const variant of heroVariants(post.heroImage)) {
    await sharp(source).rotate().resize({ width: variant.width, withoutEnlargement: true }).webp({ quality: 80 }).toFile(join('dist', variant.src));
    written++;
  }
}
console.log(`Blog hero images: wrote ${written} responsive variants`);
