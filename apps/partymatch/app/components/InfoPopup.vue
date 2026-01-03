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
					<img src="/img/icon-info.svg" class="h-6 w-6" />
					<h3 class="text-h10 font-kondolar font-bold">{{ title }}</h3>
				</div>
				<img
					src="/img/icon-close.svg"
					class="h-6 w-6 cursor-pointer"
					@click.stop="closePopup"
				/>
			</div>
			<div v-html="content"></div>
		</div>
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
	setup(props, { emit }) {
		const popupContainer = ref(null);
		const closePopup = () => {
			emit('close');
		};

		const handleClickOutside = (event) => {
			if (
				popupContainer.value &&
				!popupContainer.value.contains(event.target)
			) {
				closePopup();
			}
		};

		onMounted(() => {
			document.addEventListener('mousedown', handleClickOutside);
		});

		onUnmounted(() => {
			document.removeEventListener('mousedown', handleClickOutside);
		});
		return {
			popupContainer,
			closePopup,
		};
	},
};
</script>
