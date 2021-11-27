module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'plugin:react/recommended',
    'airbnb',
  ],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: 'module',
  },
  plugins: [
    'react',
  ],
  rules: {
    'react/react-in-jsx-scope': 'off',
    'react/jsx-filename-extension': [1, { extensions: ['.js', '.jsx'] }],
    'import/prefer-default-export': 'off',
    'default-param-last': 'off',
    'no-console': 'off',
    'jsx-a11y/no-static-element-interactions': 'off',
    'jsx-a11y/click-events-have-key-events': 'off',
    'react/prop-types': 0,
    'react/function-component-definition': [1, {
      namedComponents: 'function-declaration',
      unnamedComponents: 'function-expression',
    }],
    'object-curly-newline': 'off',
    // 'no-unused-vars': 'off',
    // 'no-undef': 'off',
    'template-curly-spacing': 'off',
    indent: ['error', 2, {
      ignoredNodes: ['TemplateLiteral'],
    }],
    'max-len': 'off',
    'import/no-extraneous-dependencies': 'off',
    'import/no-named-as-default': 'off',
    'no-nested-ternary': 'off',
    'jsx-a11y/anchor-is-valid': 'off',
    'react/jsx-props-no-spreading': 'off',
    'no-restricted-syntax': 'off',
    'react/no-array-index-key': 'off',
  },
};
