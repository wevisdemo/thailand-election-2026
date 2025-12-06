# @election/ui

Election's cross framework UI components library

## Usage

1. Add to package.json dependencies

```json
"dependencies": {
	"@election/ui": "workspace:*",
}
```

2. Run `pnpm i`

3. Follow additional steps based on your framework

### Nuxt

1. Add `src/app/plugins/ui.ts` to register custom elements.

```js
import { defineCustomElements } from '@election/ui/loader';

export default defineNuxtPlugin((nuxtApp) => {
	nuxtApp.vueApp.use({
		install: () => defineCustomElements(),
	});
});
```

2.  Config compiler in `nuxt.config.ts` to recognize custom element

```ts
export default defineNuxtConfig({
	// ...
	vite: {
		vue: {
			template: {
				compilerOptions: {
					isCustomElement: (tag) => tag.startsWith('election-'),
				},
			},
		},
	},
});
```

3. Import and use component just like normal Vue component.

```vue
<script setup>
import { ElectionNavbar } from '@election/ui/vue';
</script>

<template>
	<ElectionNavbar />
</template>
```
