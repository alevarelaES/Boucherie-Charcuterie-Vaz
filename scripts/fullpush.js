#!/usr/bin/env node
/**
 * Full Push Script
 * Runs all quality checks before pushing to GitHub
 */

import { execSync } from 'child_process';

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

function log(message, color = colors.reset) {
    console.log(`${color}${message}${colors.reset}`);
}

function runCommand(name, command) {
    log(`\n${colors.bold}${colors.cyan}▶ Running: ${name}${colors.reset}\n`);
    try {
        execSync(command, { stdio: 'inherit' });
        log(`\n${colors.green}✅ ${name} passed${colors.reset}`);
        return true;
    } catch (error) {
        log(`\n${colors.red}❌ ${name} failed${colors.reset}`);
        return false;
    }
}

function main() {
    console.clear();
    log(`${colors.bold}${colors.magenta}═════════════════════════════════════════════════════`, colors.magenta);
    log(`       🚀 FULL PUSH - QUALITY CHECKS SUITE`, colors.magenta);
    log(`═════════════════════════════════════════════════════${colors.reset}`, colors.magenta);

    const checks = [
        { name: 'TypeScript Check', cmd: 'npx tsc --noEmit' },
        { name: 'Build', cmd: 'npm run build' },
        { name: 'Unit Tests', cmd: 'npm test' },
        { name: 'I18n Quality', cmd: 'npm run check:i18n' },
        { name: 'Mobile Performance', cmd: 'npm run check:mobile' },
        { name: 'SEO Audit', cmd: 'npm run check:seo' }
    ];

    const results = [];
    let allPassed = true;

    for (const check of checks) {
        const passed = runCommand(check.name, check.cmd);
        results.push({ name: check.name, passed });
        if (!passed) allPassed = false;
    }

    // Summary
    log(`\n${colors.bold}${colors.magenta}═════════════════════════════════════════════════════${colors.reset}`, colors.magenta);
    log(`${colors.bold}                    📊 SUMMARY${colors.reset}`);
    log(`${colors.magenta}═════════════════════════════════════════════════════${colors.reset}\n`, colors.magenta);

    results.forEach(result => {
        const icon = result.passed ? '✅' : '❌';
        const color = result.passed ? colors.green : colors.red;
        log(`${icon} ${result.name}`, color);
    });

    console.log('');

    if (allPassed) {
        log(`${colors.bold}${colors.green}🎉 All checks passed! Ready to push.${colors.reset}\n`);

        // Offer to push
        log(`${colors.cyan}Would you like to push to GitHub now?${colors.reset}`);
        log(`${colors.yellow}Run: git push${colors.reset}\n`);

        process.exit(0);
    } else {
        log(`${colors.bold}${colors.red}⚠️  Some checks failed. Please fix before pushing.${colors.reset}\n`);
        process.exit(1);
    }
}

main();

