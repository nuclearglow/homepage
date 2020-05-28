module.exports = {
    extends: ['airbnb-base', 'prettier'],
    plugins: ['prettier'],
    env: {
        browser: true,
        es6: true,
        node: true,
    },
    parser: 'babel-eslint',
    parserOptions: {
        sourceType: "module",
        ecmaVersion: 8
    },
    globals: {
        Promise: true,
        ArrayBuffer: true,
        File: true,
        Blob: true,
        OSjs: true,
        OSJS_VERSION: true,
        Atomics: 'readonly',
        SharedArrayBuffer: 'readonly',
    },
    rules: {
        'prettier/prettier': 'error'
    }
}
