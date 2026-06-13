import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

const svgPath = path.resolve('public/globe.svg');
const icon192 = path.resolve('public/icon-192x192.png');
const icon512 = path.resolve('public/icon-512x512.png');

async function generateIcons() {
  try {
    const svgBuffer = fs.readFileSync(svgPath);

    await sharp(svgBuffer)
      .resize(192, 192)
      .png()
      .toFile(icon192);
    console.log('Created icon-192x192.png');

    await sharp(svgBuffer)
      .resize(512, 512)
      .png()
      .toFile(icon512);
    console.log('Created icon-512x512.png');
  } catch (err) {
    console.error('Error generating icons:', err);
  }
}

generateIcons();
