<template>
	<div class="flex flex-col items-center gap-2">
		<div class="flex items-center">
			<img
				v-if="selected"
				src="/img/profile-pic.svg"
				alt="Your choice"
				class="h-8"
			/>
			<img
				v-if="showPartyLogo"
				:src="logoSrc"
				alt="Party's choice"
				class="w-8"
			/>
		</div>
		<button
			:class="[
				isMatch ? 'border-3 border-b-black' : '',
				selected ? 'border-3 border-b-black' : '',
				isUnselected ? 'border-bg border-3 opacity-50' : '',
				!disabled ? 'cursor-pointer hover:border-3 hover:border-b-black' : '',
				buttonClass,
			]"
			:style="buttonStyle"
			class="h-20 w-20 rounded-full"
			@click="$emit('click')"
			:disabled="disabled"
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
	},
};
</script>
