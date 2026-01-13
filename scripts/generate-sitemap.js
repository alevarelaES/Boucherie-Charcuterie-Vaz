#!/usr/bin/env node
/**
 * Sitemap Generator
 * Automatically generates sitemap.xml with all routes and languages
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const SITE_URL = 'https://boucherie-charcuterie-vaz.ch';
const LANGUAGES = ['fr', 'en', 'de', 'it'];
const OUTPUT_PATH = path.join(__dirname, '..', 'public', 'sitemap.xml');

// Define all routes with their priorities and change frequencies
const routes = [
    {
        path: '',
        priority: 1.0,
        changefreq: 'weekly',
        description: 'Homepage'
    },
    {
        path: '/mentions-legales',
        priority: 0.3,
        changefreq: 'monthly',
        description: 'Legal Notice'
    },
    {
        path: '/politique-confidentialite',
        priority: 0.3,
        changefreq: 'monthly',
        description: 'Privacy Policy'
    }
];

function generateSitemap() {
    const lastmod = new Date().toISOString().split('T')[0];

    let xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">
`;

    // Generate URLs for each route and language combination
    routes.forEach(route => {
        LANGUAGES.forEach(lang => {
            const loc = `${SITE_URL}/${lang}${route.path}`;

            xml += `    
    <!-- ${route.description} (${lang.toUpperCase()}) -->
    <url>
        <loc>${loc}</loc>
        <lastmod>${lastmod}</lastmod>
        <changefreq>${route.changefreq}</changefreq>
        <priority>${route.priority}</priority>
`;

            // Add hreflang alternates for main pages
            if (route.priority >= 0.9) {
                LANGUAGES.forEach(altLang => {
                    const altLoc = `${SITE_URL}/${altLang}${route.path}`;
                    xml += `        <xhtml:link rel="alternate" hreflang="${altLang}" href="${altLoc}"/>\n`;
                });
            }

            xml += `    </url>\n`;
        });
    });

    xml += `</urlset>`;

    // Write to file
    fs.writeFileSync(OUTPUT_PATH, xml, 'utf-8');

    console.log('✅ Sitemap generated successfully!');
    console.log(`📄 Location: ${OUTPUT_PATH}`);
    console.log(`🔗 Total URLs: ${routes.length * LANGUAGES.length}`);
    console.log(`🌍 Languages: ${LANGUAGES.join(', ')}`);
    console.log(`📅 Last modified: ${lastmod}\n`);

    // Display stats
    console.log('📊 URL Distribution:');
    routes.forEach(route => {
        console.log(`   ${route.description}: ${LANGUAGES.length} URLs (priority: ${route.priority})`);
    });
}

// Run generator
try {
    generateSitemap();
} catch (error) {
    console.error('❌ Error generating sitemap:', error);
    process.exit(1);
}
