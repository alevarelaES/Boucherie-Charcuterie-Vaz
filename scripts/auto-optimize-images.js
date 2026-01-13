#!/usr/bin/env node
/**
 * Auto Image Optimizer
 * Automatically optimizes images using Sharp (pure Node.js, no external tools needed)
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import sharp from 'sharp';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const publicDir = path.join(__dirname, '..', 'public');
const imagesDir = path.join(publicDir, 'images');

// Optimization settings
const QUALITY = {
    webp: 80,
    jpeg: 85,
    png: 90
};

const MAX_WIDTH = 1920;
const MAX_HEIGHT = 1080;

const colors = {
    reset: '\x1b[0m',
    green: '\x1b[32m',
    yellow: '\x1b[33m',
    cyan: '\x1b[36m',
    bold: '\x1b[1m'
};

async function optimizeImage(inputPath, filename) {
    try {
        const ext = path.extname(filename).toLowerCase();
        const basename = path.basename(filename, ext);
        const dir = path.dirname(inputPath);

        // Get original file stats
        const originalStats = fs.statSync(inputPath);
        const originalSizeKB = (originalStats.size / 1024).toFixed(2);

        console.log(`${colors.cyan}Processing: ${filename} (${originalSizeKB} KB)${colors.reset}`);

        let totalSaved = 0;

        // Load image with Sharp
        const image = sharp(inputPath);
        const metadata = await image.metadata();

        // Resize if too large
        const needsResize = metadata.width > MAX_WIDTH || metadata.height > MAX_HEIGHT;
        if (needsResize) {
            image.resize(MAX_WIDTH, MAX_HEIGHT, {
                fit: 'inside',
                withoutEnlargement: true
            });
        }

        // Generate WebP version
        const webpPath = path.join(dir, `${basename}.webp`);
        await image
            .clone()
            .webp({ quality: QUALITY.webp })
            .toFile(webpPath);

        const webpStats = fs.statSync(webpPath);
        const webpSizeKB = (webpStats.size / 1024).toFixed(2);
        console.log(`  ${colors.green}✅ WebP: ${webpSizeKB} KB${colors.reset}`);

        // Optimize original format
        if (ext === '.jpg' || ext === '.jpeg') {
            const optimizedPath = inputPath + '.optimized.jpg';
            await image
                .clone()
                .jpeg({ quality: QUALITY.jpeg, progressive: true })
                .toFile(optimizedPath);

            const optimizedStats = fs.statSync(optimizedPath);
            const optimizedSizeKB = (optimizedStats.size / 1024).toFixed(2);

            // Replace original if smaller
            if (optimizedStats.size < originalStats.size) {
                fs.unlinkSync(inputPath);
                fs.renameSync(optimizedPath, inputPath);
                const saved = ((originalStats.size - optimizedStats.size) / 1024).toFixed(2);
                totalSaved += parseFloat(saved);
                console.log(`  ${colors.green}✅ JPEG optimized: ${optimizedSizeKB} KB (saved ${saved} KB)${colors.reset}`);
            } else {
                fs.unlinkSync(optimizedPath);
                console.log(`  ${colors.yellow}⚠️  Original JPEG already optimal${colors.reset}`);
            }
        } else if (ext === '.png') {
            const optimizedPath = inputPath + '.optimized.png';
            await image
                .clone()
                .png({ quality: QUALITY.png, compressionLevel: 9 })
                .toFile(optimizedPath);

            const optimizedStats = fs.statSync(optimizedPath);
            const optimizedSizeKB = (optimizedStats.size / 1024).toFixed(2);

            if (optimizedStats.size < originalStats.size) {
                fs.unlinkSync(inputPath);
                fs.renameSync(optimizedPath, inputPath);
                const saved = ((originalStats.size - optimizedStats.size) / 1024).toFixed(2);
                totalSaved += parseFloat(saved);
                console.log(`  ${colors.green}✅ PNG optimized: ${optimizedSizeKB} KB (saved ${saved} KB)${colors.reset}`);
            } else {
                fs.unlinkSync(optimizedPath);
                console.log(`  ${colors.yellow}⚠️  Original PNG already optimal${colors.reset}`);
            }
        }

        return {
            filename,
            originalSize: originalStats.size,
            webpSize: webpStats.size,
            saved: totalSaved
        };

    } catch (error) {
        console.error(`  ${colors.yellow}⚠️  Error optimizing ${filename}:${colors.reset}`, error.message);
        return null;
    }
}

async function scanAndOptimize(dir) {
    const results = [];

    if (!fs.existsSync(dir)) {
        console.log(`Directory not found: ${dir}`);
        return results;
    }

    const files = fs.readdirSync(dir, { recursive: true });

    for (const file of files) {
        const fullPath = path.join(dir, file);

        if (fs.statSync(fullPath).isFile()) {
            if (/\.(jpg|jpeg|png)$/i.test(file) && !file.includes('.optimized')) {
                const result = await optimizeImage(fullPath, file);
                if (result) results.push(result);
            }
        }
    }

    return results;
}

async function main() {
    console.log(`\n${colors.bold}${colors.cyan}🖼️  Starting Image Optimization...${colors.reset}\n`);

    const results = await scanAndOptimize(imagesDir);

    if (results.length === 0) {
        console.log(`\n${colors.yellow}No images found to optimize.${colors.reset}\n`);
        return;
    }

    // Calculate totals
    const totalOriginal = results.reduce((sum, r) => sum + r.originalSize, 0);
    const totalWebP = results.reduce((sum, r) => sum + r.webpSize, 0);
    const totalSaved = results.reduce((sum, r) => sum + r.saved, 0);

    const savingsPercent = ((totalSaved / totalOriginal) * 100).toFixed(1);

    console.log(`\n${colors.bold}${colors.green}═══════════════════════════════════════${colors.reset}`);
    console.log(`${colors.bold}${colors.green}     📊 OPTIMIZATION SUMMARY${colors.reset}`);
    console.log(`${colors.bold}${colors.green}═══════════════════════════════════════${colors.reset}\n`);

    console.log(`Images processed: ${colors.cyan}${results.length}${colors.reset}`);
    console.log(`Original total: ${colors.cyan}${(totalOriginal / 1024).toFixed(2)} KB${colors.reset}`);
    console.log(`WebP total: ${colors.green}${(totalWebP / 1024).toFixed(2)} KB${colors.reset}`);
    console.log(`Total saved: ${colors.green}${totalSaved.toFixed(2)} KB${colors.reset}`);
    console.log(`Savings: ${colors.green}${savingsPercent}%${colors.reset}\n`);

    console.log(`${colors.green}✅ Image optimization complete!${colors.reset}\n`);
}

// Check if Sharp is installed
try {
    await import('sharp');
    main();
} catch (error) {
    console.log(`\n${colors.yellow}⚠️  Sharp package not found.${colors.reset}`);
    console.log(`${colors.cyan}Installing Sharp...${colors.reset}\n`);

    const { execSync } = await import('child_process');
    try {
        execSync('npm install --save-dev sharp', { stdio: 'inherit' });
        console.log(`\n${colors.green}✅ Sharp installed! Running optimization...${colors.reset}\n`);

        // Retry after installation
        const sharpModule = await import('sharp');
        main();
    } catch (installError) {
        console.error(`\n${colors.yellow}❌ Failed to install Sharp.${colors.reset}`);
        console.log(`Please install manually: ${colors.cyan}npm install --save-dev sharp${colors.reset}\n`);
        process.exit(1);
    }
}
