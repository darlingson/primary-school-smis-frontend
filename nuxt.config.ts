// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },

  nitro: {
    plugins: ['~/server/api/index.ts']
  },

  runtimeConfig: {
    mongoURI: process.env.MONGODB_URI,
    jwtSecret: process.env.JWT_SECRET
  },
  modules: ["@nuxtjs/tailwindcss", '@pinia/nuxt', '@pinia-plugin-persistedstate/nuxt',]
})