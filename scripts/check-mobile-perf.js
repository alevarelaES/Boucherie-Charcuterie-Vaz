#!/usr/bin/env node
/**
 * Mobile Performance Audit Script
 * Analyzes bundle size, images, lazy loading, mobile optimization
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.join(__dirname, '..');

// ANSI color codes
const colors = {
    reset: '\x1b[0m',
    bold: '\x1b[1m',
    green: '\x1b[32m',
    yellow: '\x1b[33m',
    red: '\x1b[31m',
    blue: '\x1b[34m',
    cyan: '\x1b[36m',
    magenta: '\x1b[35m'
};

const issues = {
    critical: [],
    warning: [],
    info: [],
    success: []
};

// --- CONFIGURATION ---
const JS_LIMIT = 600 * 1024; // 600 KB
const CSS_LIMIT = 200 * 1024; // 200 KB
const IMG_CRITICAL = 600 * 1024; // 600 KB
const IMG_WARNING = 400 * 1024; // 400 KB

function checkFileSize(filePath, maxSize, category) {
    if (!fs.existsSync(filePath)) return;

    const stats = fs.statSync(filePath);
    const sizeKB = stats.size / 1024;

    if (stats.size > maxSize) {
        issues.critical.push({
            file: path.basename(filePath),
            size: `${sizeKB.toFixed(2)} KB`,
            limit: `${(maxSize / 1024).toFixed(0)} KB`,
            category
        });
    } else if (stats.size > maxSize * 0.8) {
        issues.warning.push({
            file: path.basename(filePath),
            size: `${sizeKB.toFixed(2)} KB`,
            limit: `${(maxSize / 1024).toFixed(0)} KB`,
            category
        });
    } else {
        issues.success.push({
            file: path.basename(filePath),
            size: `${sizeKB.toFixed(2)} KB`,
            category
        });
    }
}

function scanDirectory(dir, pattern, callback) {
    if (!fs.existsSync(dir)) return;

    const files = fs.readdirSync(dir, { recursive: true });
    files.forEach(file => {
        const fullPath = path.join(dir, file);
        if (fs.statSync(fullPath).isFile() && pattern.test(file)) {
            callback(fullPath, file);
        }
    });
}

function analyzeComponent(filePath, filename) {
    const content = fs.readFileSync(filePath, 'utf-8');

    // 1. Check for missing lazy loading on major components
    if (content.includes('import') && !content.includes('lazy') &&
        (filename.endsWith('Page.tsx') || filename === 'CateringPage.tsx' || filename === 'RecipesPage.tsx')) {
        issues.info.push({
            file: filename,
            issue: 'Route/Page components should be lazy loaded',
            suggestion: 'Use React.lazy()'
        });
    }

    // 2. Check for standard <img> without lazy loading (ignoring Hero)
    const imgTags = content.match(/<img[^>]*>/gi) || [];
    imgTags.forEach(tag => {
        if (!tag.includes('loading=') && !tag.includes('priority') && !filename.includes('Hero')) {
            issues.warning.push({
                file: filename,
                issue: 'Standard <img> might need lazy loading/priority',
                suggestion: 'Use OptimizedImage or add loading="lazy"'
            });
        }
    });

    // 3. Side Effects Cleanup Check (Robust)
    if (content.includes('useEffect')) {
        const effectMatches = content.match(/useEffect\s*\(\s*\(\s*\)\s*=>\s*\{/g) || [];
        if (effectMatches.length > 0) {
            const hasCleanup = content.includes('return () =>') || content.includes('return function') || content.includes('return () => {');
            const hasSideEffects = content.includes('addEventListener') || content.includes('setInterval') || content.includes('setTimeout') || content.includes('IntersectionObserver');

            if (hasSideEffects && !hasCleanup) {
                issues.warning.push({
                    file: filename,
                    issue: 'Possible missing Cleanup function in useEffect',
                    category: 'Memory'
                });
            }
        }
    }
}

function checkMobileOptimization() {
    console.log(`\n${colors.bold}${colors.magenta}📱 Mobile Optimization Check${colors.reset}\n`);

    const indexPath = path.join(rootDir, 'index.html');
    if (fs.existsSync(indexPath)) {
        const indexContent = fs.readFileSync(indexPath, 'utf-8');
        if (indexContent.includes('viewport') && indexContent.includes('width=device-width')) {
            issues.success.push({ check: 'Viewport Meta present' });
        } else {
            issues.critical.push({ check: 'Viewport Meta', issue: 'Missing meta viewport' });
        }
    }

    const hasOptimizationsCss = fs.existsSync(path.join(rootDir, 'src', 'mobile-optimizations.css'));
    if (hasOptimizationsCss) {
        issues.success.push({ check: 'Mobile CSS found' });
    }
}

function analyzeBundleSize() {
    console.log(`\n${colors.bold}${colors.cyan}📦 Bundle Size Analysis${colors.reset}\n`);
    const distDir = path.join(rootDir, 'dist', 'assets');

    if (!fs.existsSync(distDir)) {
        console.log(`${colors.yellow}⚠️  Build folder not found. Run "npm run build" first.${colors.reset}`);
        return;
    }

    scanDirectory(distDir, /\.js$/, (filePath) => checkFileSize(filePath, JS_LIMIT, 'JavaScript'));
    scanDirectory(distDir, /\.css$/, (filePath) => checkFileSize(filePath, CSS_LIMIT, 'CSS'));
}

function analyzeImages() {
    console.log(`\n${colors.bold}${colors.blue}🖼️  Image Optimization Check${colors.reset}\n`);
    const imagesDir = path.join(rootDir, 'public', 'images');

    scanDirectory(imagesDir, /\.(jpg|jpeg|png)$/i, (filePath, filename) => {
        const stats = fs.statSync(filePath);
        const sizeKB = stats.size / 1024;

        if (stats.size > IMG_CRITICAL) {
            issues.critical.push({ file: filename, size: `${sizeKB.toFixed(2)} KB`, issue: 'Image very large' });
        } else if (stats.size > IMG_WARNING) {
            issues.warning.push({ file: filename, size: `${sizeKB.toFixed(2)} KB`, suggestion: 'Compress further' });
        } else {
            issues.success.push({ file: filename, size: `${sizeKB.toFixed(2)} KB` });
        }

        const webpPath = filePath.replace(/\.(jpg|jpeg|png)$/i, '.webp');
        if (!fs.existsSync(webpPath)) {
            issues.info.push({ file: filename, issue: 'No WebP alternate found' });
        }
    });
}

function analyzeComponents() {
    console.log(`\n${colors.bold}${colors.yellow}⚛️  Component Analysis${colors.reset}\n`);
    const componentsDir = path.join(rootDir, 'src', 'app', 'components');
    scanDirectory(componentsDir, /\.tsx$/, (filePath, filename) => analyzeComponent(filePath, filename));
}

function generateReport() {
    console.log(`\n${colors.bold}${colors.magenta}═══════════════════════════════════════════════════${colors.reset}`);
    console.log(`${colors.bold}${colors.magenta}      📊 MOBILE PERFORMANCE AUDIT REPORT${colors.reset}`);
    console.log(`${colors.bold}${colors.magenta}═══════════════════════════════════════════════════${colors.reset}\n`);

    const criticalCount = issues.critical.length;
    const warningCount = issues.warning.length;
    const score = Math.max(0, 100 - (criticalCount * 12) - (warningCount * 4));

    const scoreColor = score >= 90 ? colors.green : score >= 75 ? colors.yellow : colors.red;
    console.log(`${colors.bold}Performance Score: ${scoreColor}${score}/100${colors.reset}\n`);

    if (criticalCount > 0) {
        console.log(`${colors.red}${colors.bold}🔴 CRITICAL (${criticalCount})${colors.reset}`);
        issues.critical.forEach(i => console.log(`  - ${i.file || i.check}: ${i.issue || i.size || ''}`));
    }
    if (warningCount > 0) {
        console.log(`\n${colors.yellow}${colors.bold}⚠️  WARNINGS (${warningCount})${colors.reset}`);
        issues.warning.slice(0, 15).forEach(i => console.log(`  - ${i.file || i.category}: ${i.issue || i.size || i.check || ''}`));
        if (warningCount > 15) console.log(`    ...and ${warningCount - 15} more`);
    }

    console.log(`\n${colors.green}${colors.bold}✅ PASSED: ${issues.success.length} checks${colors.reset}\n`);

    if (score < 90) process.exit(1);
}

console.clear();
analyzeBundleSize();
analyzeImages();
checkMobileOptimization();
analyzeComponents();
generateReport();
