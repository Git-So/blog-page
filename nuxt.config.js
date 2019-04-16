import pkg from './package'

export default {
  mode: 'spa',

  /*
   ** Headers of the page
   */
  head: {
    title: pkg.env.siteName,
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: pkg.description }
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }]
  },

  /*
   ** Customize the progress-bar color
   */
  loading: { color: '#fff' },

  /*
   ** Global CSS
   */
  css: [
    'element-ui/lib/theme-chalk/index.css',
    'element-ui/lib/theme-chalk/display.css'
  ],

  /*
   ** Plugins to load before mounting the App
   */
  plugins: ['@/plugins/element-ui', '~/plugins/mixin.js'],

  /*
   ** Nuxt.js modules
   */
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios',
    '@nuxtjs/pwa'
  ],
  /*
   ** Axios module configuration
   */
  axios: {
    // See https://github.com/nuxt-community/axios-module#options
    https: false,
    host: '0.0.0.0',
    port: '80',
    prefix: '/api/v1/',
    progress: true,
    credentials: true,
    retry: {
      retries: 3
    },
    debug: true
  },

  /*
   ** Build configuration
   */
  build: {
    transpile: [/^element-ui/],

    /*
     ** You can extend webpack config here
     */
    extend(config, ctx) {
      // Run ESLint on save
      if (ctx.isDev && ctx.isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }
    }
  },

  /**
   * router
   */
  router: {
    extendRoutes(routes, resolve) {
      // 设置首页
      const index = routes.findIndex(route => route.path === '/')
      routes[index] = {
        path: '/',
        redirect: '/article/list/1'
      }
    }
  },

  /**
   * manifest
   */
  manifest: {
    name: pkg.env.siteName,
    lang: 'zh-CN'
  },

  /**
   * server
   */
  server: {
    port: 9091, // default: 3000
    host: '0.0.0.0' // default: localhost
  }
}
