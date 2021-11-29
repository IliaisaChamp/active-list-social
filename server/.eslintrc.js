module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'airbnb-base',
  ],
  parserOptions: {
    ecmaVersion: 13,
    sourceType: 'module',
  },
  rules: {
    'import/prefer-default-export': 'off',
    'default-param-last': 'off',
    'no-console': 'off',
    'object-curly-newline': 'off',
    'template-curly-spacing': 'off',
    'max-len': 'off',
    'import/no-extraneous-dependencies': 'off',
    'import/no-named-as-default': 'off',
    'no-nested-ternary': 'off',
  },
};
