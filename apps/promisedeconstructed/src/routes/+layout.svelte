<script lang="ts">
	import './layout.css';
	import favicon from '$lib/assets/favicon.svg';
	import { defineCustomElements } from '@election/ui/loader';

	let { children } = $props();

	if (typeof window !== 'undefined') {
		defineCustomElements(window);
	}
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
	<link
		href="https://fonts.googleapis.com/css2?family=IBM+Plex+Sans+Thai+Looped:wght@400;600;700&family=Sriracha&display=swap"
		rel="stylesheet"
	/>
	<link
		href="https://design-systems.wevis.info/typography.css"
		rel="stylesheet"
	/>
</svelte:head>
{@render children()}
