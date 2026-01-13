#!/usr/bin/env node
/**
 * Auto Image Optimizer
 * Aggressive optimization for mobile-first performance
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import sharp from 'sharp';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.join(__dirname, '..');
const imagesDir = path.join(rootDir, 'public', 'images');

const QUALITY = {
    webp: 65,    // Aggressive
    jpeg: 70,
    png: 75
};

async function optimizeImage(inputPath, filename) {
    try {
        const ext = path.extname(filename).toLowerCase();
        const basename = path.basename(filename, ext);
        const dir = path.dirname(inputPath);
        const stats = fs.statSync(inputPath);

        console.log(`Optimizing: ${filename} (${(stats.size / 1024).toFixed(1)} KB)`);

        const image = sharp(inputPath);
        const metadata = await image.metadata();

        // 1. Determine Target Dimensions
        let targetWidth = 1200;
        if (filename.includes('hero') || filename === 'meats.jpg') {
            targetWidth = 1600; // Hero doesn't need 4K
        } else if (filename.includes('products') || filename.includes('logo')) {
            targetWidth = 800;
        }

        if (metadata.width > targetWidth) {
            image.resize(targetWidth, null, { withoutEnlargement: true, fit: 'inside' });
        }

        // 2. Generate WebP (The primary format for the app)
        const webpPath = path.join(dir, `${basename}.webp`);
        await image.clone().webp({ quality: QUALITY.webp, effort: 6 }).toFile(webpPath);

        // 3. Optimize Original (Fallback)
        if (ext === '.jpg' || ext === '.jpeg') {
            const tmp = inputPath + '.tmp';
            await image.clone().jpeg({ quality: QUALITY.jpeg, progressive: true, mozjpeg: true }).toFile(tmp);
            if (fs.statSync(tmp).size < stats.size) {
                fs.unlinkSync(inputPath);
                fs.renameSync(tmp, inputPath);
            } else {
                fs.unlinkSync(tmp);
            }
        } else if (ext === '.png') {
            // If PNG is huge, maybe it's a photo misconfigured as PNG
            if (stats.size > 300 * 1024 && !filename.includes('logo')) {
                console.log(`  Converting large PNG to JPEG: ${filename}`);
                const jpgPath = path.join(dir, `${basename}.jpg`);
                await image.clone().jpeg({ quality: QUALITY.jpeg }).toFile(jpgPath);
                // Note: We might want to update settings.json if we change extension, 
                // but for now let's just optimize the PNG further.
            }

            const tmp = inputPath + '.tmp';
            await image.clone().png({ quality: QUALITY.png, compressionLevel: 9, palette: true }).toFile(tmp);
            if (fs.statSync(tmp).size < stats.size) {
                fs.unlinkSync(inputPath);
                fs.renameSync(tmp, inputPath);
            } else {
                fs.unlinkSync(tmp);
            }
        }

        console.log(`  Done: ${(fs.statSync(inputPath).size / 1024).toFixed(1)} KB | WebP: ${(fs.statSync(webpPath).size / 1024).toFixed(1)} KB`);
        return true;
    } catch (e) {
        console.error(`  Error: ${e.message}`);
        return false;
    }
}

async function walk(dir) {
    const files = fs.readdirSync(dir, { withFileTypes: true });
    for (const file of files) {
        const fullPath = path.join(dir, file.name);
        if (file.isDirectory()) {
            await walk(fullPath);
        } else if (/\.(jpg|jpeg|png)$/i.test(file.name)) {
            await optimizeImage(fullPath, file.name);
        }
    }
}

console.log('Starting Aggressive Image Optimization...');
walk(imagesDir).then(() => console.log('Optimization Complete!'));
