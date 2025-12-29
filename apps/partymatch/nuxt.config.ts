import tailwindcss from '@tailwindcss/vite';

export default defineNuxtConfig({
	app: {
		baseURL: '/partymatch/',
		head: {
			link: [
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
