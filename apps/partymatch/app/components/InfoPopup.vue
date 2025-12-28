<template>
	<div class="bg-bg flex w-90 flex-col gap-4 p-6 shadow-lg">
		<div class="flex w-full justify-between">
			<div class="flex flex-row gap-2">
				<img src="/img/icon-info.svg" class="h-6 w-6" />
				<h3 class="text-h10 font-kondolar font-bold">{{ title }}</h3>
			</div>
			<img
				src="/img/icon-close.svg"
				class="h-6 w-6 cursor-pointer"
				@click.stop="$emit('close')"
			/>
		</div>
		<p>{{ content }}</p>
	</div>
</template>
<script>
export default {
	props: {
		title: {
			type: String,
			required: true,
		},
		content: {
			type: String,
			required: true,
		},
	},
};
</script>
