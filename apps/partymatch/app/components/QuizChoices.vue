<template>
	<div class="flex flex-col items-center">
		<div class="flex items-center">
			<img src="/img/profile-pic.svg" class="h-8" />
			<img src="/img/profile-pic.svg" class="h-8" />
		</div>
		<button
			:class="buttonClass"
			:style="buttonStyle"
			class="hover: h-20 w-20 cursor-pointer rounded-full hover:border-3 hover:border-b-black"
		>
			<img :src="iconSrc" class="h-20 w-20" />
		</button>
		<span class="mt-2">{{ label }}</span>
		<img v-if="showInfoIcon" src="/img/icon-info.svg" class="h-6" />
	</div>
</template>

<script>
export default {
	props: {
		buttonClass: {
			type: String,
			default: '',
		},
		buttonStyle: {
			type: Object,
			default: () => ({}),
		},
		iconSrc: {
			type: String,
			required: true,
		},
		label: {
			type: String,
			required: true,
		},
		showInfoIcon: {
			type: Boolean,
			default: false,
		},
	},
};
</script>
