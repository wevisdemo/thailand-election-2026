<script setup>
import { ref } from 'vue';
import { onClickOutside } from '@vueuse/core';
import IconClose from './icons/IconClose.vue';
import IconInfo from './icons/IconInfo.vue';
const props = defineProps({
	title: String,
	content: String,
});

const emit = defineEmits(['close']);
const popupContainer = ref(null);
onClickOutside(popupContainer, () => {
	emit('close');
});
const closePopup = () => {
	emit('close');
};
</script>
<template>
	<div
		class="absolute top-0 left-0 flex h-full w-full items-center justify-center bg-[rgba(0,0,0,0.5)]"
	>
		<div
			class="bg-bg flex w-90 flex-col gap-4 rounded-sm p-8 shadow-lg"
			ref="popupContainer"
		>
			<div class="flex w-full justify-between">
				<div class="flex flex-row gap-2">
					<IconInfo class="h-6 w-6" />
					<h3 class="text-h10 font-kondolar font-bold">{{ title }}</h3>
				</div>
				<IconClose class="h-6 w-6 cursor-pointer" @click.stop="closePopup" />
			</div>
			<div v-html="content"></div>
		</div>
	</div>
</template>
