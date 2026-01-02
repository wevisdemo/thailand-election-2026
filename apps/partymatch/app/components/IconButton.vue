<template>
	<div
		class="hover:bg-purple-1 font-kondolar flex h-12 cursor-pointer flex-row items-center justify-center gap-4 self-center rounded-full bg-black px-6 font-bold text-white shadow-lg hover:shadow-none"
	>
		<div
			v-if="buttonIcon"
			v-html="buttonIcon"
			class="flex h-6 w-6 items-center justify-center"
		></div>
		<div v-html="buttonText"></div>
	</div>
</template>

<script setup>
const props = defineProps({
	buttonIcon: {
		type: String,
		default: null,
	},
	buttonText: String,
});
</script>
