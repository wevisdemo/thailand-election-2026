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
				class="relative flex h-90 flex-col gap-4 overflow-auto rounded-2xl bg-white px-8 py-6 text-center shadow-md [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
				ref="descriptionContainer"
			>
				<div ref="innerContent">
					<h2 class="text-h8 font-kondolar font-bold">
						{{ currentQuestion.title }}
					</h2>
					<p v-if="currentQuestion.title_full">
						ชื่อเต็ม: {{ currentQuestion.title_full }}
					</p>
					<h3 class="font-bold" v-if="currentQuestion.description">
						รายละเอียด
					</h3>
					<p
						v-if="currentQuestion.description"
						v-html="renderMarkdown(currentQuestion.description)"
					></p>
				</div>
				<div
					v-if="isOverflowing"
					class="0% 25% 100% sticky -bottom-6 flex h-14 w-full shrink-0 items-center justify-center bg-linear-to-t from-white via-white to-transparent"
				>
					<img src="/img/icon-chevron-down.svg" class="h-6" />
				</div>
			</div>
			<img src="/img/card-side.png" class="py-4" />
		</div>

		<!-- Choices -->
		<div class="section flex w-full flex-col gap-4 py-4">
			<div>
				<p class="font-sriracha text-b2 text-center">{{ resultMessage }}</p>
				<!-- <p class="text-b6 text-center">เพราะพรรคนี้ ไม่เข้าประชุมเกินครึ่ง</p> -->
			</div>
			<div class="flex justify-between px-20">
				<QuizChoices
					buttonClass="bg-gray-3 focus:bg-gray-2"
					iconSrc="/img/choice-abstain.svg"
					:logoSrc="partyLogo"
					label="งดออกเสียง"
					:showInfoIcon="true"
					:isMatch="
						selectedAnswer === 'งดออกเสียง' && isAnswerMatch('งดออกเสียง')
					"
					:selected="selectedAnswer === 'งดออกเสียง'"
					:isUnselected="selectedAnswer && selectedAnswer !== 'งดออกเสียง'"
					:showPartyLogo="hasClicked && isAnswerMatch('งดออกเสียง')"
					:disabled="!!selectedAnswer"
					@click="handleChoiceClick('งดออกเสียง')"
				/>
				<QuizChoices
					buttonClass="bg-green-2 focus:bg-green-1"
					iconSrc="/img/choice-agree.svg"
					:logoSrc="partyLogo"
					label="เห็นด้วย"
					:isMatch="selectedAnswer === 'เห็นด้วย' && isAnswerMatch('เห็นด้วย')"
					:selected="selectedAnswer === 'เห็นด้วย'"
					:isUnselected="selectedAnswer && selectedAnswer !== 'เห็นด้วย'"
					:showPartyLogo="hasClicked && isAnswerMatch('เห็นด้วย')"
					:disabled="!!selectedAnswer"
					@click="handleChoiceClick('เห็นด้วย')"
				/>
				<QuizChoices
					buttonClass="bg-[var(--red-2)] focus:bg-[var(--red-1)]"
					iconSrc="/img/choice-disagree.svg"
					:logoSrc="partyLogo"
					label="ไม่เห็นด้วย"
					:isMatch="
						selectedAnswer === 'ไม่เห็นด้วย' && isAnswerMatch('ไม่เห็นด้วย')
					"
					:selected="selectedAnswer === 'ไม่เห็นด้วย'"
					:isUnselected="selectedAnswer && selectedAnswer !== 'ไม่เห็นด้วย'"
					:showPartyLogo="hasClicked && isAnswerMatch('ไม่เห็นด้วย')"
					:disabled="!!selectedAnswer"
					@click="handleChoiceClick('ไม่เห็นด้วย')"
				/>
			</div>
		</div>

		<!-- Navigation -->
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

<script setup>
import { marked } from 'marked';
import QuizChoices from '../components/QuizChoices.vue';

const props = defineProps({
	questions: {
		type: Array,
		required: true,
	},
	partyAnswers: {
		type: Array,
		required: true,
	},
	selectedPartyId: {
		type: String,
		required: true,
	},
	partyLogo: {
		type: String,
		required: false,
	},
});

const currentQuestionIndex = ref(0);
const currentQuestion = computed(
	() => props.questions[currentQuestionIndex.value] || {},
);

const filteredPartyAnswers = computed(() => {
	if (!props.partyAnswers || !props.selectedPartyId) {
		return [];
	}
	return props.partyAnswers.filter(
		(answer) => answer.party_id === props.selectedPartyId,
	);
});

const isAnswerMatch = (answerLabel) => {
	if (!filteredPartyAnswers.value.length) {
		return false;
	}

	const currentAnswer = filteredPartyAnswers.value.find(
		(answer) => answer.quiz_id === currentQuestion.value.id,
	);
	if (!currentAnswer) return false;

	switch (answerLabel) {
		case 'งดออกเสียง':
			return currentAnswer.party_answer === 'abstain';
		case 'เห็นด้วย':
			return currentAnswer.party_answer === 'agree';
		case 'ไม่เห็นด้วย':
			return currentAnswer.party_answer === 'disagree';
		default:
			return false;
	}
};
const resultMessage = ref('');
const selectedAnswer = ref(null);
const hasClicked = ref(false);

const handleChoiceClick = (selectedLabel) => {
	if (selectedAnswer.value) return;

	selectedAnswer.value = selectedLabel;
	hasClicked.value = true;
	const isMatch = isAnswerMatch(selectedLabel);
	if (isMatch) {
		resultMessage.value = `It's a match!`;
	} else {
		resultMessage.value = `It's not match.`;
	}
};

const descriptionContainer = ref(null);
const innerContent = ref(null);
const isOverflowing = ref(false);
let observer = null;

const renderMarkdown = (markdownText) => marked.parse(markdownText || '');

const checkOverflow = () => {
	const container = descriptionContainer.value;
	const content = innerContent.value;
	if (container && content) {
		isOverflowing.value = content.scrollHeight > container.clientHeight;
	}
};

watch(currentQuestion, () => {
	selectedAnswer.value = null;
	resultMessage.value = '';
	hasClicked.value = false;
	checkOverflow();
});
onMounted(async () => {
	observer = new ResizeObserver(() => {
		checkOverflow();
	});

	if (innerContent.value) {
		observer.observe(innerContent.value);
	}
});
onUnmounted(() => {
	if (observer) {
		observer.disconnect();
	}
});
</script>
