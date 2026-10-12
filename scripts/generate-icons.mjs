// Regenerates the favicon set in public/ from the master logo. Run after the logo changes:
//   node scripts/generate-icons.mjs
import sharp from 'sharp';
import { writeFile } from 'node:fs/promises';

const LOGO = 'public/logos/Ginger Huff Interiors Logo.webp';
const WHITE = { r: 255, g: 255, b: 255, alpha: 1 };
const png = size => sharp(LOGO).resize(size, size).png().toBuffer();
// Opaque icons: iOS fills transparency with black, and maskable icons are cropped to a circle
// covering the central 80%, so the logo sits on white with padding.
const padded = async (size, scale) => {
  const inner = Math.round(size * scale);
  return sharp({ create: { width: size, height: size, channels: 4, background: WHITE } })
    .composite([{ input: await png(inner), gravity: 'center' }]).png().toBuffer();
};

// favicon.ico holding PNG-encoded 16, 32 and 48px images (supported by every current browser).
const icoSizes = [16, 32, 48];
const images = await Promise.all(icoSizes.map(png));
const header = Buffer.alloc(6 + 16 * images.length);
header.writeUInt16LE(0, 0); header.writeUInt16LE(1, 2); header.writeUInt16LE(images.length, 4);
let offset = header.length;
images.forEach((image, i) => {
  const entry = 6 + 16 * i;
  header.writeUInt8(icoSizes[i], entry); header.writeUInt8(icoSizes[i], entry + 1);
  header.writeUInt16LE(1, entry + 4); header.writeUInt16LE(32, entry + 6);
  header.writeUInt32LE(image.length, entry + 8); header.writeUInt32LE(offset, entry + 12);
  offset += image.length;
});
await writeFile('public/favicon.ico', Buffer.concat([header, ...images]));

await writeFile('public/icon-192.png', await png(192));
await writeFile('public/icon-512.png', await png(512));
await writeFile('public/icon-maskable-512.png', await padded(512, 0.78));
await writeFile('public/apple-touch-icon.png', await padded(180, 0.86));
console.log('Generated favicon.ico, icon-192.png, icon-512.png, icon-maskable-512.png, apple-touch-icon.png');
