import { defineCustomElements } from '@election/ui/loader';

export default defineNuxtPlugin((nuxtApp) => {
	nuxtApp.vueApp.use({
		install: () => defineCustomElements(),
	});
});
