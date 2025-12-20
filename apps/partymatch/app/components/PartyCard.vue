<script setup>
import { ElectionButton } from '@election/ui/vue';

defineProps({
	selectedParty: {
		type: Object,
		default: null,
	},
});
</script>

<template>
	<div
		v-if="selectedParty"
		class="flex w-full flex-col items-center gap-6 rounded-2xl bg-white p-10 shadow-md"
	>
		<p>
			มาดูกันว่า <b>พรรค{{ selectedParty.name }}</b> ทำงานตรงใจคุณแค่ไหน
		</p>
		<div class="relative">
			<img src="/assets/images/neo-selected.svg" class="w-100" />
			<img
				:src="selectedParty.logo"
				alt=""
				class="absolute top-2/3 left-1/2 w-24 -translate-x-1/2 -translate-y-1/2 transform rounded-full bg-white p-1"
			/>
		</div>
		<ElectionButton class="typo-h8 font-kondolar w-full font-bold">
			เริ่มเล่น
		</ElectionButton>
	</div>
</template>
