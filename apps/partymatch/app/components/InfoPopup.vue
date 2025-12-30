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
	setup(props, { emit }) {
		const isVisible = ref(false);
		const popupContainer = ref(null);

		const togglePopup = (event) => {
			event.stopPropagation();
			isVisible.value = !isVisible.value;
		};

		const closePopup = () => {
			isVisible.value = false;
			emit('close');
		};

		const handleClickOutside = (event) => {
			if (
				isVisible.value &&
				popupContainer.value &&
				!popupContainer.value.contains(event.target)
			) {
				closePopup();
			}
		};

		onMounted(() => {
			document.addEventListener('click', handleClickOutside);
		});

		onUnmounted(() => {
			document.removeEventListener('click', handleClickOutside);
		});
		return {
			isVisible,
			popupContainer,
			togglePopup,
			closePopup,
		};
	},
};
</script>
