<script setup lang="ts">
const props = defineProps<{
	data: {
		date: string;
		id: number;
		image: string;
		link: string;
		title: string;
		description?: string;
	};
}>();
</script>

<template>
	<a :href="data.link" target="_blank" rel="noopener noreferrer">
		<div
			class="bg-bg flex h-full w-[260px] cursor-pointer flex-col rounded-2xl border-2 p-[18px] text-left transition-all duration-300 ease-in-out hover:shadow-[6px_6px_4px_0px_rgba(0,0,0,0.4)] md:w-[300px]"
		>
			<img :src="data.image" alt="Project Cover" />
			<img
				src="/assets/images/rough-line.svg"
				class="w-full py-4"
				alt="Rough Line"
			/>
			<p class="font-kondolar mb-2 text-left text-[21px] font-bold text-pretty">
				{{ data.title }}
			</p>
			<!-- <p class="text-[14px]">
				{{ data.description }}
			</p> -->
		</div>
	</a>
</template>

<style scoped></style>
