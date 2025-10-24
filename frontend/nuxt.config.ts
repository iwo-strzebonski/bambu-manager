// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-10-24',
  devtools: { enabled: true },
  
  // Server configuration
  nitro: {
    preset: 'node-server'
  },

  // Runtime config
  runtimeConfig: {
    public: {
      apiBase: process.env.API_BASE || 'http://backend:3000'
    }
  },

  // Development server
  devServer: {
    host: '0.0.0.0',
    port: 3000
  }
})
