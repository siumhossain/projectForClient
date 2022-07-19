export default {
  // Target: https://go.nuxtjs.dev/config-target
  target: 'static',
  ssr: true,
  loading: false,

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'Girls On Top',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
   '@/assets/css/bootstrap.min.css',
   '@/assets/css/font-awesome.min.css',
   '@/assets/css/style.css',
   '@/assets/css/responsive.css',
  ],

  Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
     { src: '~/plugins/bootstrap.min.js', mode: 'client' },
     { src: '~/plugins/vuex-persist.js', mode: 'client' },
     { src: '@/plugins/owl.js', ssr: false },
     { src: '@/plugins/skeleton.js', ssr: false },
     { src: '@/plugins/vs-pagination.js', ssr: false },
  ],




  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    '@nuxtjs/axios',
    '@nuxtjs/toast',
    'vue-social-sharing/nuxt',
  ],
  seo: {
    // Module Options
  },
  toast: {
    position: 'bottom-right',
    theme: "bubble",
    duration: 3000
  },

  axios: {
    baseURL: 'https://girlsontop.websolutionit.com/backend/',
    // Used as fallback if no runtime config is provided
  },
  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    publicPath: 'https://girlsontop.websolutionit.com/',
  },
  publicRuntimeConfig: {
    baseURL: 'https://girlsontop.websolutionit.com/backend/',
  }
}
