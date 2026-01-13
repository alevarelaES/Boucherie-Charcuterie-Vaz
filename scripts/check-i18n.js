import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const localesDir = path.join(__dirname, 'src', 'locales');
const frFile = path.join(localesDir, 'fr', 'translation.json');

// Common words that are acceptable to be identical across languages
const COMMON_EXCEPTIONS = [
    'email', 'e-mail', 'menu', 'premium', 'adresse', 'address',
    'telefon', 'telephone', 'téléphone', 'navigation', 'contact',
    'cookies', 'cookie', 'spam', 'scroll', 'vallorbe', 'vaz',
    'boucherie', 'charcuterie', 'boutique', 'catering', 'info',
    'information', 'informations', 'details', 'hotel', 'restaurant'
];

// Days and months are naturally different lengths across languages
const TEMPORAL_WORDS = [
    'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday',
    'lundi', 'mardi', 'mercredi', 'jeudi', 'vendredi', 'samedi', 'dimanche',
    'montag', 'dienstag', 'mittwoch', 'donnerstag', 'freitag', 'samstag', 'sonntag',
    'lunedì', 'martedì', 'mercoledì', 'giovedì', 'venerdì', 'sabato', 'domenica',
    'january', 'february', 'march', 'april', 'may', 'june', 'july', 'august',
    'september', 'october', 'november', 'december', 'janvier', 'février', 'mars',
    'avril', 'mai', 'juin', 'juillet', 'août', 'septembre', 'octobre', 'novembre',
    'décembre', 'lun', 'mar', 'mer', 'jeu', 'ven', 'sam', 'dim', 'mon', 'tue',
    'wed', 'thu', 'fri', 'sat', 'sun', 'mo', 'di', 'mi', 'do', 'fr', 'sa', 'so',
    'donner', 'diens', 'dienst', 'thurs', 'tues', 'giov', 'mart', 'merc'
];

// Keys that are expected to have different lengths (context-specific)
const LENGTH_EXCEPTION_PATTERNS = [
    /^days\./,           // Day names vary naturally
    /^contact\.days/,   // Contact day names
    /\.stats\./,        // Statistics labels
    /\.badge$/,         // Badges can vary
    /\.cta\./           // Call-to-action buttons can vary
];

function flattenObject(obj, prefix = '', result = {}) {
    for (const key in obj) {
        const fullKey = prefix ? `${prefix}.${key}` : key;
        if (typeof obj[key] === 'object' && obj[key] !== null && !Array.isArray(obj[key])) {
            flattenObject(obj[key], fullKey, result);
        } else {
            result[fullKey] = String(obj[key]);
        }
    }
    return result;
}

function calculateSimilarity(str1, str2) {
    const normalize = (s) => s.toLowerCase().replace(/[^\w\s]/g, '').trim();
    const s1 = normalize(str1);
    const s2 = normalize(str2);

    if (s1 === s2) return 1.0;

    const maxLen = Math.max(s1.length, s2.length);
    if (maxLen === 0) return 1.0;

    let matches = 0;
    for (let i = 0; i < Math.min(s1.length, s2.length); i++) {
        if (s1[i] === s2[i]) matches++;
    }

    return matches / maxLen;
}

function isLikelyException(text, key) {
    const normalized = text.toLowerCase().replace(/[^\w\s]/g, '').trim();

    // Check if key matches length exception patterns
    if (LENGTH_EXCEPTION_PATTERNS.some(pattern => pattern.test(key))) {
        return true;
    }

    // Check if it's a common exception
    if (COMMON_EXCEPTIONS.some(exc => normalized.includes(exc.toLowerCase()))) {
        return true;
    }

    // Check if it's a temporal word (day/month)
    if (TEMPORAL_WORDS.some(word => normalized.includes(word.toLowerCase()))) {
        return true;
    }

    // Check if it's a phone number, date, or address
    if (/^\+?[\d\s\-()]+$/.test(text) || /\d{4}/.test(text)) {
        return true;
    }

    // Check if it's very short (likely acronym or proper noun)
    if (text.length <= 3) {
        return true;
    }

    // Check if it contains brand names or place names
    if (/vallorbe|hostpoint|facebook|instagram/i.test(text)) {
        return true;
    }

    return false;
}

function getToleranceRatio(length, key) {
    // Very lenient for temporal words and known variable-length content
    if (LENGTH_EXCEPTION_PATTERNS.some(pattern => pattern.test(key))) {
        return { min: 0.3, max: 3.0 };
    }

    // More lenient for very short strings (1-5 chars)
    if (length <= 5) {
        return { min: 0.4, max: 3.0 };
    }

    // Lenient for short strings (6-15 chars)
    if (length <= 15) {
        return { min: 0.6, max: 1.8 };
    }

    // Moderate for medium strings (16-30 chars)
    if (length <= 30) {
        return { min: 0.7, max: 1.5 };
    }

    // Strict for long strings (31+ chars)
    return { min: 0.8, max: 1.3 };
}

try {
    const frData = JSON.parse(fs.readFileSync(frFile, 'utf8'));
    const frStats = flattenObject(frData);
    const languages = fs.readdirSync(localesDir)
        .filter(f => f !== 'fr' && fs.lstatSync(path.join(localesDir, f)).isDirectory())
        .sort();

    console.log('\n\x1b[1m\x1b[34m╔════════════════════════════════════════════════════════════════════════╗\x1b[0m');
    console.log('\x1b[1m\x1b[34m║         I18N SMART TRANSLATION QUALITY CHECK (v2.0)                  ║\x1b[0m');
    console.log('\x1b[1m\x1b[34m╚════════════════════════════════════════════════════════════════════════╝\x1b[0m');
    console.log(`\nBase Language: \x1b[1mFR (French)\x1b[0m | Total Keys: \x1b[1m${Object.keys(frStats).length}\x1b[0m\n`);

    const globalStats = {
        totalKeys: Object.keys(frStats).length,
        languages: {}
    };

    languages.forEach(lang => {
        const langFile = path.join(localesDir, lang, 'translation.json');
        if (!fs.existsSync(langFile)) return;

        const langData = JSON.parse(fs.readFileSync(langFile, 'utf8'));
        const langStats = flattenObject(langData);

        let issues = [];
        let missing = [];
        let suspicious = [];
        let untranslated = [];

        for (const key in frStats) {
            const frText = frStats[key];
            const frLen = frText.length;

            if (langStats[key] === undefined) {
                missing.push(key);
                continue;
            }

            const targetText = langStats[key];
            const targetLen = targetText.length;

            // Check for empty strings
            if (targetLen === 0 && frLen > 0) {
                issues.push({
                    key,
                    fr: frLen,
                    target: 0,
                    ratio: 0,
                    severity: 'CRITICAL',
                    msg: '❌ EMPTY STRING'
                });
                continue;
            }

            // Calculate similarity between French and target
            const similarity = calculateSimilarity(frText, targetText);

            // Check for likely untranslated content (very similar to French)
            // Only flag if NOT an exception and similarity is very high
            if (similarity > 0.90 && frLen > 5 && !isLikelyException(frText, key)) {
                untranslated.push({
                    key,
                    fr: frText.substring(0, 50),
                    target: targetText.substring(0, 50),
                    similarity: (similarity * 100).toFixed(0) + '%'
                });
            }

            // Check for identical strings (exact copies)
            // Only flag if NOT an exception
            if (targetText === frText && frLen > 3 && !isLikelyException(frText, key)) {
                suspicious.push({
                    key,
                    text: frText.substring(0, 40) + (frText.length > 40 ? '...' : '')
                });
            }

            const ratio = targetLen / frLen;

            // Skip length check if it's a known exception
            if (isLikelyException(frText, key)) {
                continue;
            }

            // Get context-aware tolerance
            const tolerance = getToleranceRatio(frLen, key);

            if (ratio > tolerance.max) {
                issues.push({
                    key,
                    fr: frLen,
                    target: targetLen,
                    ratio: ratio.toFixed(2),
                    severity: ratio > 2.0 ? 'HIGH' : 'MEDIUM',
                    msg: 'Too Long'
                });
            } else if (ratio < tolerance.min) {
                issues.push({
                    key,
                    fr: frLen,
                    target: targetLen,
                    ratio: ratio.toFixed(2),
                    severity: ratio < 0.4 ? 'HIGH' : 'MEDIUM',
                    msg: 'Too Short'
                });
            }
        }

        // Calculate quality score with adjusted penalties
        const qualityScore = Math.max(0, 100 - (
            (missing.length * 15) +      // Missing keys are serious
            (suspicious.length * 5) +     // Suspicious identical strings
            (untranslated.length * 8) +   // Likely untranslated
            (issues.length * 2)           // Reduced penalty for length issues
        ));

        globalStats.languages[lang] = {
            missing: missing.length,
            suspicious: suspicious.length,
            untranslated: untranslated.length,
            issues: issues.length,
            qualityScore: Math.round(qualityScore)
        };

        // Display results
        console.log(`\x1b[1m▶ Language: [${lang.toUpperCase()}]\x1b[0m`);

        // Quality Score
        const scoreColor = qualityScore >= 85 ? '\x1b[32m' : qualityScore >= 70 ? '\x1b[33m' : '\x1b[31m';
        console.log(`  ${scoreColor}📊 Quality Score: ${Math.round(qualityScore)}/100\x1b[0m`);

        // Missing keys
        if (missing.length > 0) {
            console.log(`  \x1b[31m❌ Missing Keys (${missing.length}):\x1b[0m`);
            missing.slice(0, 5).forEach(k => console.log(`     - ${k}`));
            if (missing.length > 5) console.log(`     ... and ${missing.length - 5} more.`);
        } else {
            console.log(`  \x1b[32m✅ Structure: All ${Object.keys(frStats).length} keys present.\x1b[0m`);
        }

        // Untranslated (high similarity to French)
        if (untranslated.length > 0) {
            console.log(`  \x1b[35m🚨 Likely Untranslated (${untranslated.length}):\x1b[0m`);
            untranslated.slice(0, 5).forEach(u => {
                console.log(`     - ${u.key.padEnd(30)} (${u.similarity} similar)`);
                console.log(`       FR: "${u.fr}"`);
                console.log(`       ${lang.toUpperCase()}: "${u.target}"`);
            });
            if (untranslated.length > 5) console.log(`     ... and ${untranslated.length - 5} more.`);
        }

        // Suspicious identical strings
        if (suspicious.length > 0) {
            console.log(`  \x1b[33m⚠️  Identical to French (${suspicious.length}):\x1b[0m`);
            suspicious.slice(0, 5).forEach(s => {
                console.log(`     - ${s.key.padEnd(30)}: "${s.text}"`);
            });
            if (suspicious.length > 5) console.log(`     ... and ${suspicious.length - 5} more.`);
        }

        // Length issues
        if (issues.length > 0) {
            const critical = issues.filter(i => i.severity === 'CRITICAL');
            const high = issues.filter(i => i.severity === 'HIGH');

            if (critical.length > 0 || high.length > 0) {
                console.log(`  \x1b[33m📏 Significant Length Issues (${critical.length + high.length}):\x1b[0m`);

                if (critical.length > 0) {
                    console.log(`     \x1b[31m🔴 Critical (${critical.length}):\x1b[0m`);
                    critical.forEach(i => {
                        console.log(`        ${i.key.padEnd(35)} - ${i.msg}`);
                    });
                }

                if (high.length > 0) {
                    console.log(`     \x1b[33m🟡 High (${high.length}):\x1b[0m`);
                    high.slice(0, 5).forEach(i => {
                        const sign = parseFloat(i.ratio) > 1 ? '▲' : '▼';
                        console.log(`        ${i.key.padEnd(35)}: FR=${String(i.fr).padStart(3)} vs ${lang.toUpperCase()}=${String(i.target).padStart(3)} ${sign} x${i.ratio}`);
                    });
                    if (high.length > 5) console.log(`        ... and ${high.length - 5} more.`);
                }
            } else {
                console.log(`  \x1b[32m✅ Lengths: All within acceptable tolerance.\x1b[0m`);
            }
        } else {
            console.log(`  \x1b[32m✅ Lengths: All within acceptable tolerance.\x1b[0m`);
        }

        console.log('\x1b[90m' + '─'.repeat(78) + '\x1b[0m\n');
    });

    // Global Summary
    console.log('\x1b[1m\x1b[36m═══════════════════════════════ SUMMARY ════════════════════════════════\x1b[0m\n');

    languages.forEach(lang => {
        const stats = globalStats.languages[lang];
        const emoji = stats.qualityScore >= 85 ? '🟢' : stats.qualityScore >= 70 ? '🟡' : '🔴';
        const issues = stats.missing + stats.untranslated + stats.suspicious;
        console.log(`${emoji} ${lang.toUpperCase()}: ${stats.qualityScore}/100 | Critical Issues: ${issues}`);
    });

    const avgScore = Math.round(
        Object.values(globalStats.languages).reduce((sum, s) => sum + s.qualityScore, 0) / languages.length
    );

    const avgColor = avgScore >= 85 ? '\x1b[32m' : avgScore >= 70 ? '\x1b[33m' : '\x1b[31m';
    console.log(`\n${avgColor}\x1b[1m★ Overall Quality: ${avgScore}/100\x1b[0m`);

    if (avgScore >= 85) {
        console.log(`\x1b[32m✨ Excellent! Your translations are high quality.\x1b[0m`);
    } else if (avgScore >= 70) {
        console.log(`\x1b[33m👍 Good! Minor improvements could be made.\x1b[0m`);
    } else {
        console.log(`\x1b[31m⚠️  Attention needed! Review flagged issues.\x1b[0m`);
    }

    console.log('\x1b[90m' + '═'.repeat(78) + '\x1b[0m\n');

} catch (err) {
    console.error('\x1b[31m❌ Error running check:\x1b[0m', err.stack);
    process.exit(1);
}
