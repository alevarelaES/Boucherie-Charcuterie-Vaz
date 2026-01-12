export default {
    defaultNamespace: 'translation',
    lexers: {
        ts: ['JavascriptLexer'],
        tsx: ['JsxLexer'],
        js: ['JavascriptLexer'],
        jsx: ['JsxLexer'],
    },
    locales: ['en', 'fr'],
    output: 'src/locales/$LOCALE/$NAMESPACE.json',
    input: ['src/**/*.{js,jsx,ts,tsx}'],
    sort: true,
    createOldCatalogs: false,
    useKeysAsDefaultValue: true,
    verbose: true
};
