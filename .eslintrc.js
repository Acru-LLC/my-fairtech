module.exports = {
    root: true,
    env: {
        node: true
    },
    'extends': [
        'plugin:vue/essential',
        "plugin:vue/base",
        'eslint:recommended'
    ],
    rules: {
        'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
        "no-mixed-spaces-and-tabs": 0, // disable rule
        "no-undef": 0, // disable rule
        "no-console": "off", // disable rule
        "no-unused-vars": 0, // disable rule
        "no-empty": 0, // disable rule
        "no-prototype-builtins": 0, // disable rule
    },
    parserOptions: {
        parser: 'babel-eslint'
    }
}
