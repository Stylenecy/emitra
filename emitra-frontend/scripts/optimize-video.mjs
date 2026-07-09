import fs from 'fs';
import path from 'path';
import { execFile } from 'child_process';
import ffmpegPath from 'ffmpeg-static';

const dir = path.resolve('public/assets');
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
