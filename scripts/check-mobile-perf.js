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

function log(type, message, details = '') {
    const prefix = {
        critical: `${colors.red}🔴 CRITICAL:${colors.reset}`,
        warning: `${colors.yellow}⚠️  WARNING:${colors.reset}`,
        info: `${colors.blue}ℹ️  INFO:${colors.reset}`,
        success: `${colors.green}✅ SUCCESS:${colors.reset}`
    };

    console.log(`${prefix[type]} ${message}`);
    if (details) console.log(`   ${colors.cyan}${details}${colors.reset}`);
}

function checkFileSize(filePath, maxSize, category) {
    if (!fs.existsSync(filePath)) return;

    const stats = fs.statSync(filePath);
    const sizeKB = (stats.size / 1024).toFixed(2);

    if (stats.size > maxSize) {
        issues.critical.push({
            file: path.basename(filePath),
            size: `${sizeKB} KB`,
            limit: `${(maxSize / 1024).toFixed(0)} KB`,
            category
        });
    } else if (stats.size > maxSize * 0.8) {
        issues.warning.push({
            file: path.basename(filePath),
            size: `${sizeKB} KB`,
            limit: `${(maxSize / 1024).toFixed(0)} KB`,
            category
        });
    } else {
        issues.success.push({
            file: path.basename(filePath),
            size: `${sizeKB} KB`,
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

    // Check for missing lazy loading
    if (content.includes('import') && !content.includes('lazy') &&
        (filename.endsWith('Page.tsx') || filename.endsWith('Section.tsx'))) {
        issues.info.push({
            file: filename,
            issue: 'Consider lazy loading for large components',
            line: 'Top of file'
        });
    }

    // Check for inline styles (bad for mobile perf)
    const inlineStyleCount = (content.match(/style={{/g) || []).length;
    if (inlineStyleCount > 5) {
        issues.warning.push({
            file: filename,
            issue: `${inlineStyleCount} inline styles detected - use Tailwind classes`,
            category: 'Performance'
        });
    }

    // Check for large images without optimization
    const imgMatches = content.match(/src=["'].*?\.(jpg|jpeg|png|gif)["']/gi) || [];
    imgMatches.forEach(imgTag => {
        if (!content.includes('loading="lazy"')) {
            issues.warning.push({
                file: filename,
                issue: 'Images without lazy loading attribute',
                suggestion: 'Add loading="lazy" to img tags'
            });
        }
    });

    // Check for useEffect without cleanup
    const useEffectMatches = content.match(/useEffect\(\(\)\s*=>\s*{[^}]*}/g) || [];
    useEffectMatches.forEach((effect, idx) => {
        if (!effect.includes('return')) {
            issues.info.push({
                file: filename,
                issue: `useEffect #${idx + 1} might need cleanup function`,
                category: 'Memory Leak Prevention'
            });
        }
    });
}

function checkMobileOptimization() {
    console.log(`\n${colors.bold}${colors.magenta}📱 Mobile Optimization Check${colors.reset}\n`);

    // Check index.html for viewport meta
    const indexPath = path.join(__dirname, 'index.html');
    if (fs.existsSync(indexPath)) {
        const indexContent = fs.readFileSync(indexPath, 'utf-8');

        if (!indexContent.includes('viewport')) {
            issues.critical.push({
                file: 'index.html',
                issue: 'Missing viewport meta tag',
                fix: 'Add <meta name="viewport" content="width=device-width, initial-scale=1.0">'
            });
        } else {
            issues.success.push({
                file: 'index.html',
                check: 'Viewport meta tag present'
            });
        }

        if (!indexContent.includes('theme-color')) {
            issues.info.push({
                file: 'index.html',
                suggestion: 'Add theme-color meta for better mobile experience'
            });
        }
    }

    // Check for touch-action CSS
    const srcDir = path.join(__dirname, 'src');
    let hasTouchOptimization = false;

    scanDirectory(srcDir, /\.(css|tsx?)$/, (filePath) => {
        const content = fs.readFileSync(filePath, 'utf-8');
        if (content.includes('touch-action') || content.includes('user-select')) {
            hasTouchOptimization = true;
        }
    });

    if (!hasTouchOptimization) {
        issues.warning.push({
            category: 'Touch Optimization',
            issue: 'No touch-action CSS found',
            suggestion: 'Add touch-action: manipulation for better mobile UX'
        });
    }
}

function analyzeBundleSize() {
    console.log(`\n${colors.bold}${colors.cyan}📦 Bundle Size Analysis${colors.reset}\n`);

    const distDir = path.join(__dirname, 'dist', 'assets');

    if (!fs.existsSync(distDir)) {
        issues.warning.push({
            category: 'Build',
            issue: 'dist/ folder not found. Run "npm run build" first.'
        });
        return;
    }

    // Check JS bundles
    scanDirectory(distDir, /\.js$/, (filePath) => {
        checkFileSize(filePath, 500 * 1024, 'JavaScript'); // 500KB limit
    });

    // Check CSS bundles
    scanDirectory(distDir, /\.css$/, (filePath) => {
        checkFileSize(filePath, 150 * 1024, 'CSS'); // 150KB limit
    });
}

function analyzeImages() {
    console.log(`\n${colors.bold}${colors.blue}🖼️  Image Optimization Check${colors.reset}\n`);

    const publicDir = path.join(__dirname, 'public');
    const srcDir = path.join(__dirname, 'src');

    [publicDir, srcDir].forEach(dir => {
        scanDirectory(dir, /\.(jpg|jpeg|png|gif|svg)$/i, (filePath, filename) => {
            const stats = fs.statSync(filePath);
            const sizeKB = stats.size / 1024;

            if (sizeKB > 500) {
                issues.critical.push({
                    file: filename,
                    size: `${sizeKB.toFixed(2)} KB`,
                    issue: 'Image too large for mobile',
                    suggestion: 'Use WebP format or compress with tools like ImageOptim'
                });
            } else if (sizeKB > 200) {
                issues.warning.push({
                    file: filename,
                    size: `${sizeKB.toFixed(2)} KB`,
                    suggestion: 'Consider optimizing or using responsive images'
                });
            }

            // Check for WebP alternatives
            if (filename.match(/\.(jpg|jpeg|png)$/i)) {
                const webpPath = filePath.replace(/\.(jpg|jpeg|png)$/i, '.webp');
                if (!fs.existsSync(webpPath)) {
                    issues.info.push({
                        file: filename,
                        suggestion: 'Create WebP version for better mobile performance'
                    });
                }
            }
        });
    });
}

function analyzeComponents() {
    console.log(`\n${colors.bold}${colors.yellow}⚛️  Component Analysis${colors.reset}\n`);

    const componentsDir = path.join(__dirname, 'src', 'app', 'components');

    scanDirectory(componentsDir, /\.tsx$/, (filePath, filename) => {
        analyzeComponent(filePath, filename);
    });
}

function generateReport() {
    console.log(`\n${colors.bold}${colors.magenta}═══════════════════════════════════════════════════${colors.reset}`);
    console.log(`${colors.bold}${colors.magenta}      📊 MOBILE PERFORMANCE AUDIT REPORT${colors.reset}`);
    console.log(`${colors.bold}${colors.magenta}═══════════════════════════════════════════════════${colors.reset}\n`);

    const totalIssues = issues.critical.length + issues.warning.length;
    const score = Math.max(0, 100 - (issues.critical.length * 15) - (issues.warning.length * 5));

    // Score display
    const scoreColor = score >= 85 ? colors.green : score >= 70 ? colors.yellow : colors.red;
    console.log(`${colors.bold}Performance Score: ${scoreColor}${score}/100${colors.reset}\n`);

    // Critical Issues
    if (issues.critical.length > 0) {
        console.log(`${colors.red}${colors.bold}🔴 CRITICAL ISSUES (${issues.critical.length})${colors.reset}`);
        issues.critical.forEach((issue, idx) => {
            console.log(`  ${idx + 1}. ${JSON.stringify(issue, null, 2)}`);
        });
        console.log('');
    }

    // Warnings
    if (issues.warning.length > 0) {
        console.log(`${colors.yellow}${colors.bold}⚠️  WARNINGS (${issues.warning.length})${colors.reset}`);
        issues.warning.slice(0, 10).forEach((issue, idx) => {
            console.log(`  ${idx + 1}. ${JSON.stringify(issue, null, 2)}`);
        });
        if (issues.warning.length > 10) {
            console.log(`  ... and ${issues.warning.length - 10} more warnings.`);
        }
        console.log('');
    }

    // Recommendations
    if (issues.info.length > 0) {
        console.log(`${colors.blue}${colors.bold}💡 RECOMMENDATIONS (${issues.info.length})${colors.reset}`);
        issues.info.slice(0, 5).forEach((info, idx) => {
            console.log(`  ${idx + 1}. ${JSON.stringify(info, null, 2)}`);
        });
        if (issues.info.length > 5) {
            console.log(`  ... and ${issues.info.length - 5} more recommendations.`);
        }
        console.log('');
    }

    // Success items
    console.log(`${colors.green}${colors.bold}✅ PASSED CHECKS (${issues.success.length})${colors.reset}\n`);

    // Summary
    console.log(`${colors.bold}Summary:${colors.reset}`);
    console.log(`  Critical Issues: ${issues.critical.length}`);
    console.log(`  Warnings: ${issues.warning.length}`);
    console.log(`  Recommendations: ${issues.info.length}`);
    console.log(`  Passed: ${issues.success.length}\n`);

    // Action items
    if (totalIssues > 0) {
        console.log(`${colors.yellow}${colors.bold}📋 ACTION ITEMS:${colors.reset}`);
        console.log(`  1. Fix all ${issues.critical.length} critical issues immediately`);
        console.log(`  2. Address ${issues.warning.length} warnings for optimal performance`);
        console.log(`  3. Consider ${issues.info.length} recommendations for best practices\n`);
    } else {
        console.log(`${colors.green}${colors.bold}🎉 Great job! No critical issues found!${colors.reset}\n`);
    }

    console.log(`${colors.magenta}═══════════════════════════════════════════════════${colors.reset}\n`);
}

// Main execution
console.clear();
console.log(`${colors.bold}${colors.cyan}Starting Mobile Performance Audit...${colors.reset}\n`);

analyzeBundleSize();
analyzeImages();
checkMobileOptimization();
analyzeComponents();
generateReport();
