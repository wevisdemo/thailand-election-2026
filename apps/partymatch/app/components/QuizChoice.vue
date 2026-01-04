<script setup>
import InfoPopup from './InfoPopup.vue';
import { onClickOutside } from '@vueuse/core';

const props = defineProps({
	buttonClass: {
		type: String,
		default: '',
	},
	buttonStyle: {
		type: Object,
		default: () => ({}),
	},
	icon: {
		type: [Object, Function, String],
		required: true,
	},
	logoSrc: {
		type: String,
		required: false,
	},
	label: {
		type: String,
		required: true,
	},
	showInfoIcon: {
		type: Boolean,
		default: false,
	},
	isMatch: {
		type: Boolean,
		default: false,
	},
	disabled: {
		type: Boolean,
		default: false,
	},
	selected: {
		type: Boolean,
		default: false,
	},
	isUnselected: {
		type: Boolean,
		default: false,
	},
	showPartyLogo: {
		type: Boolean,
		default: false,
	},
});

const isInfoPopupVisible = ref(false);
const popupContainer = ref(null);
onClickOutside(popupContainer, () => (isInfoPopupVisible.value = false));
</script>

<template>
	<div class="flex flex-col items-center gap-1 md:gap-2">
		<div class="flex min-h-8 items-center">
			<img
				v-if="selected"
				src="/img/profile-pic.svg"
				alt="Your choice"
				class="h-6 w-6 md:h-8 md:w-8"
			/>
			<img
				v-if="showPartyLogo"
				:src="logoSrc"
				alt="Party's choice"
				class="h-6 w-6 rounded-full object-contain md:h-8 md:w-8"
			/>
		</div>
		<button
			:class="[
				'border-bg flex items-center justify-center self-center rounded-full border-4 transition-all duration-200',
				isMatch || selected ? 'border-4 border-black' : '',
				isUnselected && !showPartyLogo
					? 'border-gray-3 bg-bg border-4 opacity-75'
					: '',
				!disabled ? 'cursor-pointer border-4 hover:border-black' : '',
				buttonClass,
			]"
			:style="buttonStyle"
			class="h-20 w-20"
			@click="$emit('click')"
			:disabled="disabled"
		>
			<div
				class="flex h-20 w-20 items-center justify-center transition-colors"
				:class="[isUnselected && !showPartyLogo ? 'text-gray-3' : 'text-white']"
			>
				<slot name="icon"></slot>
			</div>
		</button>
		<span class="mt-2">{{ label }}</span>
		<img
			v-if="showInfoIcon"
			src="/img/icon-info.svg"
			class="z-1 h-6 cursor-pointer"
			@click.stop="isInfoPopupVisible = true"
		/>
		<Teleport to="body">
			<InfoPopup
				v-if="isInfoPopupVisible"
				:title="label"
				class="fixed top-1/2 left-1/2 z-2 -translate-x-1/2 -translate-y-1/2 transform"
				content="งดออกเสียง = สส. เข้าประชุมแต่ไม่ออกเสียงว่าเห็นด้วยหรือไม่เห็นด้วยกับมติ อาจจะเพราะยังไม่ตัดสินใจหรือเลี่ยงความขัดแย้ง<br/><br/> ในกรณีที่ต้อง ใช้เสียงข้างมากในการชี้ขาด<span class='text-purple-1 font-bold'>การงดออกเสียงจะมีผลเท่ากับเป็นการไม่เห็นด้วยได้</span> เช่น ญัตติอภิปรายไม่ไว้วางใจรัฐมนตรีที่ต้องใช้คะแนนเสียงมากกว่ากึ่งหนึ่งของจำนวน สส. ที่มีอยู่ในสภา การงดออกเสียงจึงทำให้เกิดผลไม่เห็นด้วยกับมติ"
				@close="isInfoPopupVisible = false"
			/>
		</Teleport>
	</div>
</template>
