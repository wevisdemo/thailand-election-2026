<script setup lang="ts">
defineProps<{
	title: string;
	subtitle: {
		before: string;
		strike?: string;
		after?: string;
	};
}>();
</script>

<template>
	<div>
		<p class="text-h4 mb-1 font-bold">{{ title }}</p>
		<div class="mb-1 text-[16px] md:text-[24px]">
			<span class="">
				{{ subtitle.before }}
			</span>
			<span v-if="subtitle.strike" class="text-[#616161] line-through">
				{{ subtitle.strike }}
			</span>
			<span v-if="subtitle.after">
				{{ subtitle.after }}
			</span>
		</div>
	</div>
</template>

<style scoped></style>
