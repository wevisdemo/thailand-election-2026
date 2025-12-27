<script setup>
import { marked } from 'marked';
const questions = ref([]);
const currentQuestionIndex = ref(0);
const currentQuestion = computed(() => {
	return questions.value[currentQuestionIndex.value] || {};
});
const renderMarkdown = (markdownText) => {
	return marked.parse(markdownText || '');
};

onMounted(async () => {
	const { Column, asString, Spreadsheet, Object } = await import('sheethuahua');

	const data = await Spreadsheet(
		'1cg85RsWVrSTDgRsVMTsmbkABbDk8Y84kIU_SsRl_smQ',
	).get(
		'bill',
		Object({
			id: Column('id', asString()),
			title: Column('title', asString()),
			title_full: Column('title_full', asString()),
			description: Column('desc', asString()),
		}),
	);
	questions.value = data;
});
</script>

<template>
	<div class="relative flex h-full flex-col">
		<!-- Progress bar -->
		<div class="section w-full py-8">
			<div class="bg-green-2 h-1 w-full rounded"></div>
		</div>

		<!-- Question -->
		<div class="section flex flex-row">
			<img
				src="/assets/images/card-side.png"
				class="scale-x-[-1] transform py-4"
			/>
			<div
				class="flex h-80 flex-col gap-4 rounded-2xl bg-white p-6 text-center shadow-md"
			>
				<h2 class="text-h8 font-kondolar font-bold">
					{{ currentQuestion.title }}
				</h2>
				<p v-if="currentQuestion.title_full">
					ชื่อเต็ม: {{ currentQuestion.title_full }}
				</p>
				<h3 class="font-bold" v-if="currentQuestion.description">รายละเอียด</h3>
				<p
					v-if="currentQuestion.description"
					v-html="renderMarkdown(currentQuestion.description)"
				></p>
			</div>
			<img src="/assets/images/card-side.png" class="py-4" />
		</div>

		<!-- Quiz Choices -->
		<QuizChoices />

		<!-- Quiz Navigation -->

		<button
			v-if="currentQuestionIndex > 0"
			class="font-kondolar absolute bottom-0 left-0 mt-auto mb-0 flex cursor-pointer flex-row items-center gap-2 p-6"
			@click="currentQuestionIndex--"
		>
			<img src="/assets/images/arrow-left.svg" class="h-8" />
			กลับ
		</button>
		<button
			v-if="currentQuestionIndex < questions.length - 1"
			class="font-kondolar absolute right-0 bottom-0 mt-auto mb-0 flex cursor-pointer flex-row items-center gap-2 p-6"
			@click="currentQuestionIndex++"
		>
			ไปต่อ
			<img src="/assets/images/arrow-right.svg" class="h-8" />
		</button>
		<button
			v-else-if="currentQuestionIndex === questions.length - 1"
			class="font-kondolar absolute right-0 bottom-0 mt-auto mb-0 flex cursor-pointer flex-row items-center gap-2 p-6 font-bold"
			@click="currentQuestionIndex++"
		>
			ดูผลลัพธ์
			<img src="/assets/images/icon-heart-ol.svg" class="h-8" />
		</button>
	</div>
</template>
