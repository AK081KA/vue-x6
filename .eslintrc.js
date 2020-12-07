module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: ['plugin:vue/essential', 'eslint:recommended', '@vue/typescript'],
  rules: {
    'no-constant-condition': 'off',
    'no-unreachable': 'off',
    'no-control-regex': 'off',
    'no-extra-semi': 'off',
    'no-useless-escape': 'off',
    'no-console': 'off',
    'no-redeclare': 'off',
    '@typescript-eslint/no-inferrable-types': 'off', // 关闭类型推断
    'no-unused-vars': 'off',
  },
  parserOptions: {
    parser: '@typescript-eslint/parser',
  },
}
