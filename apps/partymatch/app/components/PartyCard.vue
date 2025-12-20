<script setup>
defineProps({
	selectedParty: {
		type: Object,
		default: null,
	},
});
</script>

<template>
	<div v-if="selectedParty">
		<p>มาดูกันว่า {{ selectedParty.name }} ทำงานตรงใจคุณแค่ไหน</p>
		<img src="/assets/images/hero-img.svg" />
		<img :src="selectedParty.logo" alt="Party Logo" />
		<button>เริ่มเล่น</button>
	</div>
</template>
