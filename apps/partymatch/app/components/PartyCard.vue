<script setup>
import { ElectionButton } from '@election/ui/vue';
import neoUnselected from '~/assets/images/neo-unselected.svg';
import neoSelected from '~/assets/images/neo-selected.svg';
defineProps({
	selectedParty: {
		type: Object,
		default: null,
	},
	isUnselected: {
		type: Boolean,
		default: false,
	},
});
</script>

<template>
	<div
		class="flex w-full flex-col items-center gap-6 rounded-2xl bg-white p-10 shadow-md"
	>
		<p>
			<span v-if="!isUnselected && selectedParty">
				มาดูกันว่า <b>พรรค{{ selectedParty.name }}</b> ทำงานตรงใจคุณแค่ไหน
			</span>
			<span v-else> มาดูกันว่าพรรคไหน ใจตรงกับคุณมากที่สุด </span>
		</p>
		<div class="relative">
			<img :src="isUnselected ? neoUnselected : neoSelected" class="w-100" />
			<img
				v-if="!isUnselected"
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
