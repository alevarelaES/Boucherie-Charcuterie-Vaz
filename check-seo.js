#!/usr/bin/env node
/**
 * SEO Audit Script
 * Checks all SEO-related aspects of the site
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

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

function checkIndexHTML() {
    console.log(`\n${colors.bold}${colors.cyan}📄 index.html SEO Check${colors.reset}\n`);

    const indexPath = path.join(__dirname, 'index.html');
    if (!fs.existsSync(indexPath)) {
        issues.critical.push({ file: 'index.html', issue: 'File not found' });
        return;
    }

    const content = fs.readFileSync(indexPath, 'utf-8');

    // Title
    const titleMatch = content.match(/<title>(.*?)<\/title>/);
    if (!titleMatch) {
        issues.critical.push({ check: 'Title tag', issue: 'Missing <title>' });
    } else if (titleMatch[1].length < 30 || titleMatch[1].length > 60) {
        issues.warning.push({
            check: 'Title length',
            current: titleMatch[1].length,
            ideal: '30-60 characters'
        });
    } else {
        issues.success.push({ check: 'Title tag', value: titleMatch[1] });
    }

    // Meta description
    const descMatch = content.match(/<meta name="description"\s+content="([^"]+)"/);
    if (!descMatch) {
        issues.critical.push({ check: 'Meta description', issue: 'Missing' });
    } else if (descMatch[1].length < 120 || descMatch[1].length > 160) {
        issues.warning.push({
            check: 'Description length',
            current: descMatch[1].length,
            ideal: '120-160 characters'
        });
    } else {
        issues.success.push({ check: 'Meta description', length: descMatch[1].length });
    }

    // Canonical
    if (!content.includes('rel="canonical"')) {
        issues.warning.push({ check: 'Canonical URL', issue: 'Missing canonical tag' });
    } else {
        issues.success.push({ check: 'Canonical URL' });
    }

    // Open Graph
    const ogChecks = ['og:title', 'og:description', 'og:image', 'og:url', 'og:type'];
    const missingOG = ogChecks.filter(tag => !content.includes(`property="${tag}"`));

    if (missingOG.length > 0) {
        issues.warning.push({
            check: 'Open Graph',
            missing: missingOG.join(', ')
        });
    } else {
        issues.success.push({ check: 'Open Graph tags', status: 'Complete' });
    }

    // Twitter Cards
    const twitterChecks = ['twitter:card', 'twitter:title', 'twitter:description'];
    const missingTwitter = twitterChecks.filter(tag => !content.includes(`name="${tag}"`));

    if (missingTwitter.length > 0) {
        issues.warning.push({
            check: 'Twitter Cards',
            missing: missingTwitter.join(', ')
        });
    } else {
        issues.success.push({ check: 'Twitter Cards', status: 'Complete' });
    }

    // Structured Data (JSON-LD)
    if (!content.includes('application/ld+json')) {
        issues.critical.push({ check: 'Structured Data', issue: 'Missing JSON-LD' });
    } else {
        const jsonLdMatch = content.match(/<script type="application\/ld\+json">(.*?)<\/script>/s);
        if (jsonLdMatch) {
            try {
                const data = JSON.parse(jsonLdMatch[1].trim());
                issues.success.push({
                    check: 'Structured Data',
                    type: data['@type'] || 'Unknown'
                });
            } catch (e) {
                issues.critical.push({ check: 'Structured Data', issue: 'Invalid JSON-LD' });
            }
        }
    }

    // Lang attribute
    if (!content.match(/<html\s+lang="/)) {
        issues.warning.push({ check: 'HTML lang attribute', issue: 'Missing or incorrect' });
    } else {
        issues.success.push({ check: 'HTML lang attribute' });
    }

    // Favicon
    if (!content.includes('rel="icon"')) {
        issues.warning.push({ check: 'Favicon', issue: 'Missing favicon link' });
    } else {
        issues.success.push({ check: 'Favicon' });
    }

    // Robots meta
    if (content.includes('name="robots"') && content.includes('noindex')) {
        issues.critical.push({ check: 'Robots', issue: 'Site is set to noindex!' });
    } else {
        issues.success.push({ check: 'Robots indexing', status: 'Allowed' });
    }
}

function checkRobotsTxt() {
    console.log(`\n${colors.bold}${colors.blue}🤖 robots.txt Check${colors.reset}\n`);

    const robotsPath = path.join(__dirname, 'public', 'robots.txt');
    if (!fs.existsSync(robotsPath)) {
        issues.warning.push({ file: 'robots.txt', issue: 'File not found in public/' });
    } else {
        const content = fs.readFileSync(robotsPath, 'utf-8');

        if (!content.includes('User-agent:')) {
            issues.critical.push({ file: 'robots.txt', issue: 'Invalid format' });
        } else {
            issues.success.push({ check: 'robots.txt', status: 'Present' });
        }

        if (!content.includes('Sitemap:')) {
            issues.info.push({ file: 'robots.txt', suggestion: 'Add Sitemap reference' });
        }
    }
}

function checkSitemap() {
    console.log(`\n${colors.bold}${colors.magenta}🗺️  Sitemap Check${colors.reset}\n`);

    const sitemapPath = path.join(__dirname, 'public', 'sitemap.xml');
    if (!fs.existsSync(sitemapPath)) {
        issues.warning.push({ file: 'sitemap.xml', issue: 'File not found in public/' });
    } else {
        const content = fs.readFileSync(sitemapPath, 'utf-8');

        if (!content.includes('<?xml') || !content.includes('<urlset')) {
            issues.critical.push({ file: 'sitemap.xml', issue: 'Invalid XML format' });
        } else {
            const urlCount = (content.match(/<url>/g) || []).length;
            issues.success.push({
                check: 'sitemap.xml',
                urls: urlCount
            });

            if (urlCount === 0) {
                issues.warning.push({ file: 'sitemap.xml', issue: 'No URLs found' });
            }
        }
    }
}

function checkI18nSEO() {
    console.log(`\n${colors.bold}${colors.yellow}🌍 I18n SEO Check${colors.reset}\n`);

    const localesDir = path.join(__dirname, 'src', 'locales');
    const languages = fs.readdirSync(localesDir).filter(f =>
        fs.statSync(path.join(localesDir, f)).isDirectory()
    );

    if (languages.length < 2) {
        issues.info.push({
            check: 'Multilingual',
            suggestion: 'Consider adding more languages'
        });
    } else {
        issues.success.push({
            check: 'Multilingual support',
            languages: languages.join(', ')
        });
    }

    // Check for hreflang implementation
    const appPath = path.join(__dirname, 'src', 'app', 'App.tsx');
    if (fs.existsSync(appPath)) {
        const content = fs.readFileSync(appPath, 'utf-8');
        if (!content.includes('hreflang')) {
            issues.info.push({
                check: 'hreflang tags',
                suggestion: 'Add hreflang tags for language variants'
            });
        }
    }
}

function checkImagesSEO() {
    console.log(`\n${colors.bold}${colors.green}🖼️  Images SEO Check${colors.reset}\n`);

    const publicDir = path.join(__dirname, 'public');
    let totalImages = 0;
    let missingAlt = 0;

    function scanComponents(dir) {
        if (!fs.existsSync(dir)) return;

        const files = fs.readdirSync(dir, { recursive: true });
        files.forEach(file => {
            const fullPath = path.join(dir, file);
            if (fs.statSync(fullPath).isFile() && /\.(tsx|jsx)$/.test(file)) {
                const content = fs.readFileSync(fullPath, 'utf-8');
                const imgTags = content.match(/<img[^>]*>/g) || [];

                imgTags.forEach(tag => {
                    totalImages++;
                    if (!tag.includes('alt=')) {
                        missingAlt++;
                    }
                });
            }
        });
    }

    scanComponents(path.join(__dirname, 'src', 'app', 'components'));

    if (missingAlt > 0) {
        issues.critical.push({
            check: 'Image alt attributes',
            missing: missingAlt,
            total: totalImages
        });
    } else if (totalImages > 0) {
        issues.success.push({
            check: 'Image alt attributes',
            status: 'All images have alt text'
        });
    }
}

function checkPerformance() {
    console.log(`\n${colors.bold}${colors.cyan}⚡ Performance SEO Factors${colors.reset}\n`);

    const distDir = path.join(__dirname, 'dist');
    if (!fs.existsSync(distDir)) {
        issues.info.push({
            check: 'Build',
            suggestion: 'Run "npm run build" to check production performance'
        });
        return;
    }

    // Check for asset optimization
    const assetsDir = path.join(distDir, 'assets');
    if (fs.existsSync(assetsDir)) {
        const files = fs.readdirSync(assetsDir);

        const jsFiles = files.filter(f => f.endsWith('.js'));
        const cssFiles = files.filter(f => f.endsWith('.css'));

        if (jsFiles.length > 3) {
            issues.warning.push({
                check: 'Code splitting',
                jsFiles: jsFiles.length,
                suggestion: 'Consider more aggressive code splitting'
            });
        } else {
            issues.success.push({ check: 'Code splitting', files: jsFiles.length });
        }

        // Check for compression
        const gzFiles = files.filter(f => f.endsWith('.gz'));
        if (gzFiles.length === 0) {
            issues.info.push({
                check: 'Gzip compression',
                suggestion: 'Enable gzip compression on server'
            });
        }
    }
}

function generateReport() {
    console.log(`\n${colors.bold}${colors.magenta}═══════════════════════════════════════════════════${colors.reset}`);
    console.log(`${colors.bold}${colors.magenta}           📊 SEO AUDIT REPORT${colors.reset}`);
    console.log(`${colors.bold}${colors.magenta}═══════════════════════════════════════════════════${colors.reset}\n`);

    const totalIssues = issues.critical.length + issues.warning.length;
    const score = Math.max(0, 100 - (issues.critical.length * 20) - (issues.warning.length * 5));

    const scoreColor = score >= 85 ? colors.green : score >= 70 ? colors.yellow : colors.red;
    console.log(`${colors.bold}SEO Score: ${scoreColor}${score}/100${colors.reset}\n`);

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
        issues.warning.forEach((issue, idx) => {
            console.log(`  ${idx + 1}. ${JSON.stringify(issue, null, 2)}`);
        });
        console.log('');
    }

    // Recommendations
    if (issues.info.length > 0) {
        console.log(`${colors.blue}${colors.bold}💡 RECOMMENDATIONS (${issues.info.length})${colors.reset}`);
        issues.info.forEach((info, idx) => {
            console.log(`  ${idx + 1}. ${JSON.stringify(info, null, 2)}`);
        });
        console.log('');
    }

    // Success
    console.log(`${colors.green}${colors.bold}✅ PASSED CHECKS (${issues.success.length})${colors.reset}\n`);

    // Summary
    console.log(`${colors.bold}Summary:${colors.reset}`);
    console.log(`  Critical Issues: ${issues.critical.length}`);
    console.log(`  Warnings: ${issues.warning.length}`);
    console.log(`  Recommendations: ${issues.info.length}`);
    console.log(`  Passed: ${issues.success.length}\n`);

    if (totalIssues > 0) {
        console.log(`${colors.yellow}${colors.bold}📋 NEXT STEPS:${colors.reset}`);
        console.log(`  1. Fix ${issues.critical.length} critical SEO issues`);
        console.log(`  2. Address ${issues.warning.length} warnings for better ranking`);
        console.log(`  3. Consider ${issues.info.length} recommendations\n`);
    } else {
        console.log(`${colors.green}${colors.bold}🎉 Excellent! All SEO checks passed!${colors.reset}\n`);
    }

    console.log(`${colors.magenta}═══════════════════════════════════════════════════${colors.reset}\n`);

    // Exit with error if critical issues
    if (issues.critical.length > 0) {
        process.exit(1);
    }
}

// Main execution
console.clear();
console.log(`${colors.bold}${colors.cyan}Starting SEO Audit...${colors.reset}\n`);

checkIndexHTML();
checkRobotsTxt();
checkSitemap();
checkI18nSEO();
checkImagesSEO();
checkPerformance();
generateReport();
