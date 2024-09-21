// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
	modules: ['@nuxtjs/tailwindcss', '@nuxt/content'],
	css: ['/assets/css/base.css'],
	ssr: true,
	devtools: { enabled: true },
	// site: {
	// 	url: 'https://browsergadgets.io',
	// 	name: 'Browser Gadgets',
	// 	description: 'Everything about Browser Extensions',
	// 	defaultLocale: 'en', // not needed if you have @nuxtjs/i18n installed
	// 	ogImage: { enabled: false },
	// },
	experimental: {
		payloadExtraction: false,
	},

	router: {
		options: {
			strict: false,
		},
	},

	sourcemap: false,

	app: {
		pageTransition: { name: 'page', mode: 'out-in' },

		// layoutTransition: { name: 'layout', mode: 'out-in' },

		head: {
			title: 'Browser Gadgets',
			link: [
				{
					rel: 'apple-touch-icon',
					sizes: '180x180',
					href: '/apple-touch-icon.png',
				},
				{
					rel: 'icon',
					type: 'image/png',
					sizes: '32x32',
					href: '/favicon-32x32.png',
				},
				{
					rel: 'icon',
					type: 'image/png',
					sizes: '16x16',
					href: '/favicon-16x16.png',
				},
				{ rel: 'manifest', href: '/site.webmanifest' },
				{ rel: 'mask-icon', href: '/safari-pinned-tab.svg', color: '#5bbad5' },

				// Preconnect to Google Fonts
				{ rel: 'preconnect', href: 'https://fonts.googleapis.com' },
				{
					rel: 'preconnect',
					href: 'https://fonts.gstatic.com',
					crossorigin: 'anonymous',
				},

				// Load Nunito font
				{
					rel: 'stylesheet',
					href: 'https://fonts.googleapis.com/css2?family=Nunito:ital,wght@0,200..1000;1,200..1000&display=swap',
				},
			],
			meta: [
				{ name: 'msapplication-TileColor', content: '#da532c' },
				{ name: 'theme-color', content: '#ffffff' },
			],
		},
	},
	runtimeConfig: {
		public: {
			posthogPublicKey: 'phc_ro9vKAOYIHgWTpIyEoJxDlMOCaTmmG8oJebYuausdLM',
			posthogHost: 'https://us.i.posthog.com',
		},
	},

	compatibilityDate: '2024-09-02',
});
