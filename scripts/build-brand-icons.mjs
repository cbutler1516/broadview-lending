// Deterministic format/size exports of the supplied brand artwork; no redrawing.
import sharp from 'sharp';
import { writeFile } from 'node:fs/promises';

const mark = 'public/brand/broadview-mark-official.png';
async function square(size) {
  const padding = Math.round(size * 0.1);
  const artwork = await sharp(mark).resize(size - padding * 2, size - padding * 2, { fit: 'contain', background: '#ffffff' }).flatten({ background: '#ffffff' }).png().toBuffer();
  return sharp({ create: { width: size, height: size, channels: 4, background: '#ffffff' } }).composite([{ input: artwork, gravity: 'centre' }]).png().toBuffer();
}
await writeFile('src/app/icon.png', await square(192));
await writeFile('src/app/apple-icon.png', await square(180));
const sizes = [16, 32, 48];
const frames = await Promise.all(sizes.map(square));
const header = Buffer.alloc(6 + frames.length * 16);
header.writeUInt16LE(1, 2);
header.writeUInt16LE(frames.length, 4);
let offset = header.length;
frames.forEach((frame, i) => {
  const entry = 6 + i * 16;
  header[entry] = sizes[i]; header[entry + 1] = sizes[i];
  header.writeUInt16LE(1, entry + 4); header.writeUInt16LE(32, entry + 6);
  header.writeUInt32LE(frame.length, entry + 8); header.writeUInt32LE(offset, entry + 12);
  offset += frame.length;
});
await writeFile('src/app/favicon.ico', Buffer.concat([header, ...frames]));
const logo = await sharp('public/brand/broadview-barrett-logo.png').resize(1000, 300, { fit: 'inside' }).png().toBuffer();
await sharp({ create: { width: 1200, height: 630, channels: 3, background: '#ffffff' } }).composite([{ input: logo, gravity: 'centre' }]).png().toFile('public/brand/broadview-social-card.png');
