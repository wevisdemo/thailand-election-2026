<script setup>
const props = defineProps({
	options: {
		type: Array,
		required: true,
	},
	isUnselected: {
		type: Boolean,
		default: false,
	},
});

const selected = ref('');
const isOpen = ref(false);

const selectedOption = computed(() => {
	if (props.isUnselected && !isOpen.value) {
		return null;
	}
	return props.options.find((opt) => opt.id === selected.value);
});

const toggleDropdown = () => {
	isOpen.value = !isOpen.value;
};

const emit = defineEmits(['update:selected', 'update:isUnselected']);

const selectOption = (option) => {
	selected.value = option.id;
	isOpen.value = false;
	emit('update:selected', option);
	emit('update:isUnselected', false);
};
</script>

<template>
	<div class="dropdown-container relative w-full">
		<div
			class="flex h-13 w-full cursor-pointer flex-row items-center justify-between rounded-full border-2 border-black bg-white pr-4 pl-6"
			@click="toggleDropdown"
		>
			<div class="flex w-full items-center gap-4">
				<img
					v-if="selectedOption?.logo"
					:src="selectedOption.logo"
					class="h-6 w-6 rounded-full object-contain"
					alt=""
				/>

				<span>
					{{
						selectedOption
							? `${selectedOption.name}${selectedOption.name66 ? ` / ${selectedOption.name66}` : ''}`
							: 'เลือกพรรค'
					}}
				</span>
			</div>
			<img
				src="/img/chevron-down.svg"
				:class="{ 'rotate-180': isOpen }"
				class="transition-transform"
			/>
		</div>

		<div
			v-if="isOpen"
			class="absolute z-50 mt-2 max-h-[300px] w-full overflow-y-auto rounded-lg border-2 border-black bg-white shadow-lg"
		>
			<div
				v-for="option in options"
				:key="option.id"
				class="hover:bg-gray-3 border-gray-3 flex cursor-pointer items-center gap-4 border-b px-4 py-2"
				:class="{ 'bg-gray-2': selected === option.id }"
				@click="selectOption(option)"
			>
				<img
					v-if="option.logo"
					:src="option.logo"
					class="h-8 w-8 rounded-full object-contain"
					alt=""
				/>
				<span>
					{{ option.name }} {{ option.name66 ? `/ ${option.name66}` : '' }}
				</span>
			</div>
		</div>
	</div>
</template>
