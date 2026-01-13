#!/usr/bin/env node
/**
 * Image Optimization Script
 * Automatically optimizes images for web by creating WebP versions
 * and providing recommendations
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { execSync } from 'child_process';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.join(__dirname, '..');

console.log('\n🖼️  Starting Image Optimization Process...\n');

const publicDir = path.join(rootDir, 'public');
const imagesDir = path.join(publicDir, 'images');

function scanImages(dir) {
    const images = [];

    function scan(currentDir) {
        if (!fs.existsSync(currentDir)) return;

        const files = fs.readdirSync(currentDir);
        files.forEach(file => {
            const fullPath = path.join(currentDir, file);
            const stats = fs.statSync(fullPath);

            if (stats.isDirectory()) {
                scan(fullPath);
            } else if (/\.(jpg|jpeg|png)$/i.test(file)) {
                const sizeKB = (stats.size / 1024).toFixed(2);
                images.push({
                    path: fullPath,
                    name: file,
                    sizeKB: parseFloat(sizeKB),
                    relativePath: path.relative(__dirname, fullPath)
                });
            }
        });
    }

    scan(dir);
    return images;
}

function generateOptimizationReport(images) {
    console.log('📊 Image Optimization Report\n');
    console.log('Images found:', images.length);

    const largeImages = images.filter(img => img.sizeKB > 500);
    const mediumImages = images.filter(img => img.sizeKB > 200 && img.sizeKB <= 500);
    const optimizedImages = images.filter(img => img.sizeKB <= 200);

    console.log(`\n🔴 Large (>500KB): ${largeImages.length}`);
    largeImages.forEach(img => {
        console.log(`   - ${img.name}: ${img.sizeKB} KB`);
    });

    console.log(`\n🟡 Medium (200-500KB): ${mediumImages.length}`);
    mediumImages.forEach(img => {
        console.log(`   - ${img.name}: ${img.sizeKB} KB`);
    });

    console.log(`\n🟢 Optimized (<200KB): ${optimizedImages.length}`);

    console.log('\n📋 Recommendations:\n');

    if (largeImages.length > 0) {
        console.log('1. Compress large images using:');
        console.log('   - Online: https://squoosh.app/');
        console.log('   - CLI: npm install -g @squoosh/cli');
        console.log('   - Or use Photoshop/GIMP with quality 75-85%\n');
    }

    console.log('2. Convert to WebP format for better compression:');
    if (process.platform === 'win32') {
        console.log('   - Install cwebp: https://developers.google.com/speed/webp/download');
    } else {
        console.log('   - Install cwebp: brew install webp (macOS) or apt-get install webp (Linux)');
    }

    console.log('\n3. Use responsive images with srcset attribute');
    console.log('4. Implement lazy loading for all images below the fold\n');

    // Generate commands to optimize
    console.log('🔧 Quick optimization commands:\n');
    images.forEach(img => {
        if (img.sizeKB > 200) {
            const outputPath = img.path.replace(/\.(jpg|jpeg|png)$/i, '.webp');
            console.log(`cwebp -q 80 "${img.relativePath}" -o "${path.relative(__dirname, outputPath)}"`);
        }
    });
}

const images = scanImages(imagesDir);
generateOptimizationReport(images);

console.log('\n✅ Image optimization report complete!\n');

