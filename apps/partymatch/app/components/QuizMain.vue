<script setup>
import { marked } from 'marked';
import QuizChoices from './QuizChoices.vue';
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
			<img src="/img/card-side.png" class="scale-x-[-1] transform py-4" />
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
			<img src="/img/card-side.png" class="py-4" />
		</div>

		<!-- Quiz Choices -->
		<template>
			<div class="section flex w-full flex-col gap-4 py-4">
				<div>
					<p class="font-sriracha text-b2 text-center">It's a match</p>
					<p class="text-b6 text-center">เพราะพรรคนี้ ไม่เข้าประชุมเกินครึ่ง</p>
				</div>
				<div class="flex justify-between px-20">
					<QuizChoices
						buttonClass="bg-gray-3 w-20 rounded-full"
						iconSrc="~/assets/images/choice-abstain.svg"
						label="งดออกเสียง"
						:showInfoIcon="true"
					/>
					<QuizChoices
						buttonClass="bg-green-2 w-20 rounded-full"
						iconSrc="~/assets/images/choice-agree.svg"
						label="เห็นด้วย"
					/>
					<QuizChoices
						buttonStyle="{ backgroundColor: 'var(--red)' }"
						iconSrc="~/assets/images/choice-disagree.svg"
						label="ไม่เห็นด้วย"
					/>
				</div>
			</div>
		</template>

		<!-- Quiz Navigation -->

		<button
			v-if="currentQuestionIndex > 0"
			class="font-kondolar absolute bottom-0 left-0 mt-auto mb-0 flex cursor-pointer flex-row items-center gap-2 p-6"
			@click="currentQuestionIndex--"
		>
			<img src="/img/arrow-left.svg" class="h-8" />
			กลับ
		</button>
		<button
			v-if="currentQuestionIndex < questions.length - 1"
			class="font-kondolar absolute right-0 bottom-0 mt-auto mb-0 flex cursor-pointer flex-row items-center gap-2 p-6"
			@click="currentQuestionIndex++"
		>
			ไปต่อ
			<img src="/img/arrow-right.svg" class="h-8" />
		</button>
		<button
			v-else-if="currentQuestionIndex === questions.length - 1"
			class="font-kondolar absolute right-0 bottom-0 mt-auto mb-0 flex cursor-pointer flex-row items-center gap-2 p-6 font-bold"
			@click="currentQuestionIndex++"
		>
			ดูผลลัพธ์
			<img src="/img/icon-heart-ol.svg" class="h-8" />
		</button>
	</div>
</template>
