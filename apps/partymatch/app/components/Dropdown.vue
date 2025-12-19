<script setup>
import { Column, asNumber, asString, Spreadsheet } from 'sheethuahua';

const schema = Object({
	id: Column('id', asNumber()),
	name: Column('party_name69', asString()),
	name66: Column('party_name66', asString().optional()),
	logo: Column('logo', asString().optional()),
});

const options = ref([]);
const selected = ref('');

async function fetchData() {
	options.value = await Spreadsheet(
		'1cg85RsWVrSTDgRsVMTsmbkABbDk8Y84kIU_SsRl_smQ',
	).get('party', schema);
}

onMounted(() => {
	fetchData();
});

// const output = await Spreadsheet(
// 	'1cg85RsWVrSTDgRsVMTsmbkABbDk8Y84kIU_SsRl_smQ',
// ).get('party', schema);
// console.log(output);
</script>

<template>
	<div
		class="dropdown flex w-full cursor-pointer flex-row items-center justify-between bg-white"
	>
		<select
			v-model="selected"
			class="h-full w-full appearance-none border-none bg-transparent text-left outline-none"
		>
			<option disabled value="">เลือกพรรค</option>
			<option v-for="option in options" :key="option.id" :value="option.id">
				{{ option.name }}
			</option>
		</select>
		<img src="/assets/images/icon-chevron-down.svg" />
	</div>
</template>

<style scoped>
.dropdown {
	height: 50px;
	border: black 2px solid;
	border-radius: 100px;
	padding: 0 0.8rem 0 1.5rem;
}
</style>
