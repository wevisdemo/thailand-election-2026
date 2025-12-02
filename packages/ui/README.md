# @election/ui

Election shared UI components

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

Add `apps/landing/app/plugins/ui.ts` to register custom elements.

```js
import { defineCustomElements } from '@election/ui/loader';

export default defineNuxtPlugin((nuxtApp) => {
	nuxtApp.vueApp.use({
		install: () => defineCustomElements(),
	});
});
```

Then import and use component just like normal Vue component.

```vue
<script setup>
import { ElectionNavbar } from '@election/ui/vue';
</script>

<template>
	<ElectionNavbar first="We" last="Vis" />
</template>
```
