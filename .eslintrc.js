module.exports = {
  root: true,
  env: {
    browser: true,
    node: true
  },
  parserOptions: {
    parser: '@babel/eslint-parser',
    requireConfigFile: false
  },
  extends: [
    '@nuxtjs',
    'plugin:nuxt/recommended'
  ],
  plugins: [
  ],
  // add your custom rules here
  rules: {
    'no-console': 'off',
    'no-async-promise-executor': 'off',
    'vue/no-v-html': 'off',
    'vue/no-mutating-props': 'off',
    'vue/valid-v-bind-sync': 'off'
  }
}
