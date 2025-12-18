<script setup lang="ts">
defineProps<{
	part: 'extended' | 'ect' | 'team';
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
		<p
			:class="`text-h4 font-kondolar mb-1 font-bold ${part === 'team' ? 'w-[250px] md:w-full' : 'w-ful'}`"
		>
			{{ title }}
		</p>
		<div
			:class="`mb-1 ${part === 'ect' ? 'w-[220px] md:w-full' : part === 'team' ? 'w-60 md:w-full' : 'w-full'} mx-auto text-[16px] md:text-[24px]`"
		>
			<span>
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
