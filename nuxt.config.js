export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'nuxt_01',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { hid: 'keywords', name: 'keywords', content: '' },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },
  router: {
    middleware: 'auth',
    // 扩展路由
    extendRoutes (routes, resolve) {
      routes.push({
        name: 'home',
        path: '/index',
        component: resolve(__dirname, 'pages/index/index.vue')
      })
    }
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    { src: 'assets/scss/transition.scss', lang: 'scss' },
    'element-ui/lib/theme-chalk/index.css'
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    {
      src: '~/plugins/element-ui'
      // mode: 'client'
    },
    {
      src: '~/plugins/axios'
      // mode: 'client'
    }, {
      src: '~/plugins/mixins'
    },
    {
      src: '~/plugins/wangeditor',
      mode: 'client'
    }
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    '@nuxtjs/style-resources'
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    '@nuxtjs/style-resources',
    '@nuxtjs/axios',
    'cookie-universal-nuxt'
  ],
  axios: {
    proxy: true // 开启axiox跨域
    // prefix: '/api'// baseUrl
  },
  styleResources: {
    scss: [
      './assets/scss/common.scss'
    ]
  },
  proxy: {
    '/api/': {
      target: 'http://localhost:3000', // 代理转发地址
      chageOrigin: true,
      pathRewrite: {
        // '^/api': ''
      }
    }
  },
  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    transpile: [/^element-ui/]
  },
  server: {
    port: 8000,
    host: '0.0.0.0' // default: localhost
  }
}
