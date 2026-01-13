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
const rootDir = path.join(__dirname, '..');

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

    const indexPath = path.join(rootDir, 'index.html');
    if (!fs.existsSync(indexPath)) {
        issues.critical.push({ file: 'index.html', issue: 'File not found' });
        return;
    }

    const content = fs.readFileSync(indexPath, 'utf-8');

    // Title
    const titleMatch = content.match(/<title>(.*?)<\/title>/);
    if (!titleMatch) {
        issues.critical.push({ check: 'Title tag', issue: 'Missing <title>' });
    } else if (titleMatch[1].length < 20 || titleMatch[1].length > 70) {
        issues.warning.push({
            check: 'Title length',
            current: titleMatch[1].length,
            ideal: '20-70 characters'
        });
    } else {
        issues.success.push({ check: 'Title tag', value: titleMatch[1] });
    }

    // Meta description
    const descMatch = content.match(/<meta name="description"\s+content="([^"]+)"/);
    if (!descMatch) {
        issues.critical.push({ check: 'Meta description', issue: 'Missing' });
    } else if (descMatch[1].length < 80 || descMatch[1].length > 180) {
        issues.warning.push({
            check: 'Description length',
            current: descMatch[1].length,
            ideal: '80-180 characters'
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
}

function checkRobotsTxt() {
    console.log(`\n${colors.bold}${colors.blue}🤖 robots.txt Check${colors.reset}\n`);

    const robotsPath = path.join(rootDir, 'public', 'robots.txt');
    if (!fs.existsSync(robotsPath)) {
        issues.warning.push({ file: 'robots.txt', issue: 'File not found in public/' });
    } else {
        const content = fs.readFileSync(robotsPath, 'utf-8');

        if (!content.includes('User-agent:')) {
            issues.critical.push({ file: 'robots.txt', issue: 'Invalid format' });
        } else {
            issues.success.push({ check: 'robots.txt', status: 'Present' });
        }
    }
}

function checkSitemap() {
    console.log(`\n${colors.bold}${colors.magenta}🗺️  Sitemap Check${colors.reset}\n`);

    const sitemapPath = path.join(rootDir, 'public', 'sitemap.xml');
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
        }
    }
}

function checkI18nSEO() {
    console.log(`\n${colors.bold}${colors.yellow}🌍 I18n SEO Check${colors.reset}\n`);

    const localesDir = path.join(rootDir, 'src', 'locales');
    if (fs.existsSync(localesDir)) {
        const languages = fs.readdirSync(localesDir).filter(f =>
            fs.statSync(path.join(localesDir, f)).isDirectory()
        );

        if (languages.length >= 2) {
            issues.success.push({
                check: 'Multilingual support',
                languages: languages.join(', ')
            });
        }
    }
}

function checkPerformance() {
    console.log(`\n${colors.bold}${colors.cyan}⚡ Performance SEO Factors${colors.reset}\n`);

    const distDir = path.join(rootDir, 'dist');
    if (!fs.existsSync(distDir)) return;

    const assetsDir = path.join(distDir, 'assets');
    if (fs.existsSync(assetsDir)) {
        const files = fs.readdirSync(assetsDir);
        const jsFiles = files.filter(f => f.endsWith('.js'));

        if (jsFiles.length > 20) {
            issues.info.push({ check: 'Code splitting', count: jsFiles.length, status: 'Many chunks detected' });
        } else {
            issues.success.push({ check: 'Code splitting', count: jsFiles.length });
        }
    }
}

function generateReport() {
    console.log(`\n${colors.bold}${colors.magenta}═══════════════════════════════════════════════════${colors.reset}`);
    console.log(`${colors.bold}${colors.magenta}           📊 SEO AUDIT REPORT${colors.reset}`);
    console.log(`${colors.bold}${colors.magenta}═══════════════════════════════════════════════════${colors.reset}\n`);

    const totalIssues = issues.critical.length + issues.warning.length;
    const score = Math.max(0, 100 - (issues.critical.length * 20) - (issues.warning.length * 5));

    const scoreColor = score >= 90 ? colors.green : score >= 75 ? colors.yellow : colors.red;
    console.log(`${colors.bold}SEO Score: ${scoreColor}${score}/100${colors.reset}\n`);

    if (issues.critical.length > 0) {
        console.log(`${colors.red}${colors.bold}🔴 CRITICAL (${issues.critical.length})${colors.reset}`);
        issues.critical.forEach(i => console.log(`  - ${i.check || i.file}: ${i.issue || 'Check failed'}`));
    }
    if (issues.warning.length > 0) {
        console.log(`\n${colors.yellow}${colors.bold}⚠️  WARNINGS (${issues.warning.length})${colors.reset}`);
        issues.warning.forEach(i => console.log(`  - ${i.check || i.file}: ${i.issue || 'Improvement suggested'}`));
    }

    console.log(`\n${colors.green}${colors.bold}✅ PASSED: ${issues.success.length} checks${colors.reset}\n`);

    if (issues.critical.length > 0 || score < 90) {
        process.exit(1);
    }
}

console.clear();
checkIndexHTML();
checkRobotsTxt();
checkSitemap();
checkI18nSEO();
checkPerformance();
generateReport();
