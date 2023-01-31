export default {
  env: {
    NODE_ENV: process.env.NODE_ENV,
    PROXY: process.env.PROXY || "",
    isDev: process.env.NODE_ENV !== "production"
  },
  server: process.env.NODE_ENV !== "production"
    ? { host: "0.0.0.0" }
    : {},
  // Disable server-side rendering: https://go.nuxtjs.dev/ssr-mode
  ssr: false,
  target: "static", // target: "static",
  router: {
    base: "/",
    extendRoutes (routes, resolve) {
      routes.push({
        name: "custom",
        path: "*",
        component: resolve(__dirname, "pages/404.vue")
      });
    }
  },

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: "The World’s first NFT Rarity Upgrade Platform DEMO | by SharkRace.com",
    htmlAttrs: {
      lang: "en"
    },
    meta: [
      { charset: "utf-8" },
      {
        name: "viewport",
        content: "width=device-width, initial-scale=1"
      },
      {
        hid: "description",
        name: "description",
        content: "The great place to boost the price of your NFT and enjoy a fantastic creative experience with your asset"
      },
      {
        name: "format-detection",
        content: "telephone=no"
      }
    ],
    link: [
      {
        rel: "apple-touch-icon",
        sizes: "180x180",
        href: "/favicon/apple-touch-icon.png"
      },
      {
        rel: "icon",
        type: "image/png",
        sizes: "32x32",
        href: "/favicon/favicon-32x32.png"
      },
      {
        rel: "icon",
        type: "image/png",
        sizes: "16x16",
        href: "/favicon/favicon-16x16.png"
      },
      {
        rel: "manifest",
        href: "/favicon/site.webmanifest"
      },
      {
        rel: "mask-icon",
        href: "/favicon/safari-pinned-tab.svg",
        color: "#5bbad5"
      },
      {
        rel: "shortcut icon",
        href: "/favicon/favicon.ico"
      },
      {
        rel: "icon",
        type: "image/x-icon",
        href: "/favicon/favicon.ico"
      },
      {
        rel: "msapplication-TileColor",
        content: "#611a6a"
      },
      {
        rel: "msapplication-config",
        content: "/favicon/browserconfig.xml"
      },
      {
        rel: "theme-color",
        content: "#fff"
      },
      {
        rel: "preconnect",
        href: "https://fonts.googleapis.com"
      },
      {
        rel: "preconnect",
        href: "https://fonts.gstatic.com",
        cssorigin: "",
        as: "font"
      },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700&display=swap"
      }
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  styleResources: {
    scss: ["@/assets/scss/variables.scss", "@/assets/scss/mixins/mixins.scss"]
  },

  css: [
    {
      src: "@/assets/scss/template.scss",
      lang: "scss"
    }
  ],

  loading: false,

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    { src: "~plugins/click-outside.js", ssr: false },
    { src: "~plugins/browser-detect.js", ssr: false },
    { src: "~plugins/api.js", ssr: false }
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/eslint
    "@nuxtjs/eslint-module",
    "@nuxtjs/global-components"
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    "@nuxtjs/axios",
    "@nuxtjs/proxy",
    "@nuxtjs/style-resources",
    "cookie-universal-nuxt",
    [
      "nuxt-i18n",
      {
        locales: [
          {
            name: "English",
            code: "en",
            iso: "en-US",
            file: "en-US.js"
          }
        ],
        langDir: "lang/",
        defaultLocale: "en",
        vueI18nLoader: true
      }
    ],
    [
      "nuxt-lazy-load",
      {
        defaultImage: "/images/spinner.gif"
      }
    ],
    [
      "nuxt-vuex-localstorage",
      {
        mode: process.env.NODE_ENV !== "production" ? "debug" : "auto",
        localStorage: ["sharks", "favorites"],  //  If not entered, “localStorage” is the default value
        sessionStorage: ["user"]  //  If not entered, “sessionStorage” is the default value
      }
    ]
  ],

  proxy: process.env.PROXY
    ? {
      "/socket.io": {
        target: process.env.PROXY
      },
      "/api": {
        target: process.env.PROXY
      }
    }
    : {},

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    baseURL: "/"
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    extend (config, { loaders }) {
      loaders.scss.additionalData = "@use \"sass:math\";";
    }
  }
};
