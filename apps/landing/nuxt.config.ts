import tailwindcss from '@tailwindcss/vite';

export default defineNuxtConfig({
	app: {
		head: {
			htmlAttrs: {
				lang: 'th',
			},
			meta: [
				{ charset: 'utf-8' },
				{ name: 'viewport', content: 'width=device-width, initial-scale=1' },
			],
			link: [
				{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
				{
					href: 'https://fonts.googleapis.com/css2?family=IBM+Plex+Sans+Thai+Looped:wght@400;600;700&family=Sriracha&display=swap',
					rel: 'stylesheet',
				},
				{
					href: 'https://design-systems.wevis.info/typography.css',
					rel: 'stylesheet',
				},
			],
		},
	},
	compatibilityDate: '2025-07-15',
	css: ['./app/assets/css/main.css'],
	devtools: { enabled: true },
	telemetry: false,
	vite: {
		plugins: [tailwindcss()],
		vue: {
			template: {
				compilerOptions: {
					isCustomElement: (tag) => tag.startsWith('election-'),
				},
			},
		},
	},
});
