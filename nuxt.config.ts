import { defineNuxtConfig } from 'nuxt'

// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
    modules: [
        '@nuxtjs/tailwindcss',
        '@nuxt/content'
    ],

    publicRuntimeConfig: {
        SITE_NAME: process.env.SITE_NAME,
        SITE_URL: process.env.SITE_URL,
    }
})
