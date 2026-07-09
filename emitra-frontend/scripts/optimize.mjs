import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
import { execFile } from 'child_process';
import ffmpegPath from 'ffmpeg-static';

const dir = path.resolve('public/assets');

const photos = [
  { n: 'documents', w: 1600, q: 80 },
  { n: 'factory', w: 1600, q: 80 },
  { n: 'map-eu-ri', w: 1600, q: 80 },
  { n: 'mood-green', w: 1600, q: 80 },
  { n: 'team', w: 1600, q: 80 },
  { n: 'testimonial', w: 700, q: 82 },
  { n: 'icon-ai', w: 700, q: 85 },
  { n: 'icon-carbon', w: 700, q: 85 },
  { n: 'icon-cert', w: 700, q: 85 },
  { n: 'icon-growth', w: 700, q: 85 },
];

for (const p of photos) {
  const src = path.join(dir, p.n + '.jpeg');
  const out = path.join(dir, p.n + '.webp');
  await sharp(src)
    .resize({ width: p.w, withoutEnlargement: true })
    .webp({ quality: p.q })
    .toFile(out);
  const a = fs.statSync(src).size, b = fs.statSync(out).size;
  fs.unlinkSync(src);
  console.log(`WEBP ${p.n}: ${(a/1e6).toFixed(1)}MB -> ${(b/1e6).toFixed(2)}MB`);
}

const vids = [
  { n: 'hero-bg', scale: '1280:-2' },
  { n: 'data-flow', scale: '1280:-2' },
];
for (const v of vids) {
  const src = path.join(dir, v.n + '.mp4');
  const tmp = path.join(dir, v.n + '_tmp.mp4');
  await new Promise((res, rej) => {
    execFile(ffmpegPath, [
      '-y', '-i', src,
      '-vf', `scale=${v.scale}`,
      '-c:v', 'libx264', '-crf', '30', '-preset', 'veryfast',
      '-an', '-movflags', '+faststart', tmp,
    ], (e) => (e ? rej(e) : res(null)));
  });
  const a = fs.statSync(src).size, b = fs.statSync(tmp).size;
  fs.unlinkSync(src);
  fs.renameSync(tmp, src);
  console.log(`MP4  ${v.n}: ${(a/1e6).toFixed(1)}MB -> ${(b/1e6).toFixed(2)}MB`);
}
console.log('DONE');
