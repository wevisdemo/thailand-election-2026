<script setup>
import { marked } from 'marked';
import QuizChoices from './QuizChoice.vue';
import PartyVotes from './PartyVotes.vue';
import IconNext from './icons/IconNext.vue';
import IconHeart from './icons/IconHeart.vue';
import IconAbstain from './icons/IconAbstain.vue';
import IconAgree from './icons/IconAgree.vue';
import IconDisagree from './icons/IconDisagree.vue';
import IconChevron from './icons/IconChevron.vue';

const props = defineProps({
	questionsData: { type: Array, required: true },
	partyAnswers: { type: Array, default: () => [] },
	selectedPartyId: String,
	partyLogo: String,
	partyName: String,
});

const emit = defineEmits(['show-result']);

const currentQuestionIndex = ref(0);
const shuffledQuestions = ref([]);

const userAnswers = ref({});
const selectedAnswer = ref(null);

const hasClicked = ref(false);
const resultMessage = ref('');
const explainMessage = ref('');
const showPartyResult = ref(false);

const currentQuestion = computed(() => {
	return shuffledQuestions.value[currentQuestionIndex.value] || {};
});
const isLastQuestion = computed(
	() => currentQuestionIndex.value === shuffledQuestions.value.length - 1,
);

const currentPartyAnswer = computed(() => {
	if (!currentQuestion.value.id) return null;
	return props.partyAnswers?.find(
		(a) =>
			a.party_id === props.selectedPartyId &&
			a.quiz_id === currentQuestion.value.id,
	);
});

const renderedDescription = computed(() =>
	marked.parse(currentQuestion.value.description || ''),
);

const ANSWER_MAP = {
	abstain: { label: 'งดออกเสียง', matchKey: 'งดออกเสียง' },
	agree: { label: 'เห็นด้วย', matchKey: 'เห็นด้วย' },
	disagree: { label: 'ไม่เห็นด้วย', matchKey: 'ไม่เห็นด้วย' },
	'agree, disagree': {
		label: 'เสียงแตก',
		matchKey: ['เห็นด้วย', 'ไม่เห็นด้วย'],
	},
	absent: { label: 'ลา/ขาด', matchKey: null },
};

const choiceConfigs = [
	{
		label: 'งดออกเสียง',
		icon: IconAbstain,
		buttonClass: 'bg-[#BFBFBF] focus:bg-gray-2',
		showInfoIcon: true,
	},
	{
		label: 'เห็นด้วย',
		icon: IconAgree,
		buttonClass: 'bg-[#1AD39E] focus:bg-green-1',
	},
	{
		label: 'ไม่เห็นด้วย',
		icon: IconDisagree,
		buttonClass: 'bg-[var(--red-2)] focus:bg-[var(--red-1)]',
	},
];

const partyVotes = computed(() => {
	if (!currentPartyAnswer.value) return [];
	return [
		{
			label: 'เห็นด้วย',
			count: currentPartyAnswer.value.agree_count,
			color: '#1AD39E',
		},
		{
			label: 'ไม่เห็นด้วย',
			count: currentPartyAnswer.value.disagree_count,
			color: 'var(--red-2)',
		},
		{
			label: 'งดออกเสียง',
			count: currentPartyAnswer.value.abstain_count,
			color: '#9D9D9D',
		},
		{
			label: 'ลา/ขาด',
			count: currentPartyAnswer.value.absent_count,
			color: 'white',
			border: '1px solid gray',
		},
	];
});

const partyAnswerPct = computed(() => {
	if (!currentPartyAnswer.value || !currentPartyAnswer.value.party_count)
		return 0;

	const matchingVote = partyVotes.value.find(
		(vote) => vote.label === partyAnswerLabel.value,
	);

	const matchingCount = matchingVote ? matchingVote.count : 0;
	const totalCount = currentPartyAnswer.value.party_count;

	return parseFloat(((matchingCount / totalCount) * 100).toFixed(0));
});

const partyAnswerLabel = computed(() => {
	const pAns = currentPartyAnswer.value?.party_answer;
	return ANSWER_MAP[pAns]?.label || 'ยังไม่มีชื่อตอนโหวต';
});

const isAnswerMatch = (label) => {
	const pAns = currentPartyAnswer.value?.party_answer;
	if (!pAns || !ANSWER_MAP[pAns]) return false;

	const matchKey = ANSWER_MAP[pAns].matchKey;

	return Array.isArray(matchKey)
		? matchKey.includes(label)
		: matchKey === label;
};

function getExplainMessage(partyAnswer) {
	const statusMap = {
		absent: 'ไม่เข้าประชุมเกินครึ่ง',
		'agree, disagree': 'เสียงแตก',
		undefined: 'ยังไม่มีชื่อตอนโหวต',
	};
	return statusMap[partyAnswer] || '';
}

const handleChoiceClick = (label) => {
	if (selectedAnswer.value) return;
	selectedAnswer.value = label;
	hasClicked.value = true;
	userAnswers.value[currentQuestion.value.id] = label;
	if (props.selectedPartyId) {
		resultMessage.value = isAnswerMatch(label) ? "It's a match!" : 'Not match!';
		explainMessage.value = getExplainMessage(
			currentPartyAnswer.value?.party_answer,
		);
	}
};

const handleNextClick = () => {
	if (!hasClicked.value) {
		return;
	}

	if (isLastQuestion.value) {
		emit('show-result', userAnswers.value);
	} else {
		currentQuestionIndex.value++;
	}
};

const shuffleArray = (array) => {
	if (!array) return [];
	const newArray = [...array];
	for (let i = newArray.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1));
		[newArray[i], newArray[j]] = [newArray[j], newArray[i]];
	}
	return newArray;
};

// ---
const descriptionContainer = ref(null);
const innerContent = ref(null);
const isOverflowing = ref(false);

const handleClose = () => {
	showPartyResult.value = false;
};

const checkOverflow = () => {
	if (descriptionContainer.value && innerContent.value) {
		isOverflowing.value =
			innerContent.value.scrollHeight >
			descriptionContainer.value.clientHeight - 32;
	}
};

watch(currentQuestionIndex, (newIndex) => {
	const qId = shuffledQuestions.value[newIndex]?.id;
	const previousAnswer = userAnswers.value[qId];

	if (previousAnswer) {
		selectedAnswer.value = previousAnswer;
		hasClicked.value = true;
		resultMessage.value = isAnswerMatch(previousAnswer)
			? "It's a match!"
			: 'Not match!';
		explainMessage.value = getExplainMessage(
			currentPartyAnswer.value?.party_answer,
		);
	} else {
		selectedAnswer.value = null;
		hasClicked.value = false;
		resultMessage.value = '';
		explainMessage.value = '';
	}
	nextTick(checkOverflow);
});
watch(
	() => props.questionsData,
	(newData) => {
		if (newData && newData.length > 0 && shuffledQuestions.value.length === 0) {
			shuffledQuestions.value = shuffleArray(newData);
		}
	},
	{ immediate: true },
);

let observer;
onMounted(() => {
	if (props.questionsData && props.questionsData.length > 0) {
		shuffledQuestions.value = shuffleArray(props.questionsData);
	}

	observer = new ResizeObserver(checkOverflow);
	if (innerContent.value) observer.observe(innerContent.value);

	const handleKeyDown = (event) => {
		if (event.key === 'ArrowLeft' && currentQuestionIndex.value > 0) {
			currentQuestionIndex.value--;
		} else if (event.key === 'ArrowRight' && hasClicked.value) {
			handleNextClick();
		}
	};

	window.addEventListener('keydown', handleKeyDown);

	onUnmounted(() => {
		observer?.disconnect();
		window.removeEventListener('keydown', handleKeyDown);
	});
});
</script>

<template>
	<div class="relative flex h-full flex-col items-center overflow-hidden">
		<!-- Progress bar -->
		<div class="w-full pt-2 pb-4 md:max-w-[40rem]">
			<div
				:style="{
					width: `${((currentQuestionIndex + 1) / shuffledQuestions.length) * 100}%`,
				}"
				class="bg-green-2 h-1 rounded transition-all duration-300"
			></div>
		</div>

		<!-- Question -->
		<div
			class="mx-auto flex h-80 max-h-[30dvh] flex-row sm:max-h-[60dvh] md:max-w-[40rem]"
		>
			<img
				src="/img/card-side.png"
				class="h-full scale-x-[-1] transform py-4"
			/>
			<div
				class="relative h-80 max-h-[30dvh] overflow-auto rounded-2xl bg-white p-4 text-center shadow-md [-ms-overflow-style:none] [scrollbar-width:none] sm:max-h-[60dvh] md:max-w-[40rem] md:px-8 md:py-6 [&::-webkit-scrollbar]:hidden"
				ref="descriptionContainer"
			>
				<div ref="innerContent" class="flex flex-col gap-4">
					<h2 class="text-h8 font-kondolar font-bold">
						{{ currentQuestion.title }}
					</h2>
					<p v-if="currentQuestion.title_full" class="text-b5">
						ชื่อเต็ม: {{ currentQuestion.title_full }}
					</p>
					<div class="text-b5">
						<h3 class="font-bold" v-if="currentQuestion.description">
							รายละเอียด
						</h3>
						<div
							v-html="renderedDescription"
							class="text-left [&_ul]:ml-6 [&_ul]:list-disc"
						></div>
					</div>
				</div>
				<div
					v-if="isOverflowing"
					class="sticky -bottom-6 flex h-12 w-full shrink-0 items-center justify-center bg-gradient-to-t from-white via-white to-transparent"
				>
					<IconChevron class="h-6" />
				</div>
			</div>
			<img src="/img/card-side.png" class="h-full py-4" />
		</div>

		<!-- Choices -->
		<div
			class="section flex h-full w-full flex-col justify-center gap-2 self-center pt-3 pb-15 md:gap-4 md:pt-6 md:pb-20"
		>
			<div class="flex h-10 flex-col items-center justify-center text-center">
				<p v-if="selectedPartyId" class="font-sriracha text-b2">
					{{ resultMessage }}
				</p>
				<p v-else-if="hasClicked" class="font-sriracha text-b2">Your Answer</p>
				<p v-if="explainMessage && selectedPartyId" class="text-b6">
					เพราะพรรคนี้ {{ explainMessage }}
				</p>
			</div>
			<div class="flex justify-between md:px-20">
				<QuizChoices
					v-for="choice in choiceConfigs"
					:key="choice.label"
					v-bind="choice"
					:logoSrc="partyLogo"
					:selected="selectedAnswer === choice.label"
					:isUnselected="selectedAnswer && selectedAnswer !== choice.label"
					:isMatch="
						selectedAnswer === choice.label && isAnswerMatch(choice.label)
					"
					:showPartyLogo="hasClicked && isAnswerMatch(choice.label)"
					:disabled="!!selectedAnswer"
					@click="handleChoiceClick(choice.label)"
				>
					<template #icon>
						<component :is="choice.icon" class="h-12 w-12 md:h-16 md:w-16" />
					</template>
				</QuizChoices>
			</div>
		</div>

		<!-- Navigation -->
		<div
			class="font-kondolar gap-auto absolute bottom-0 z-0 flex h-16 w-full flex-row items-center justify-between px-4 md:h-20 md:p-6"
		>
			<div class="flex h-8 w-40 items-center justify-start">
				<button
					v-if="currentQuestionIndex > 0"
					class="hover:text-purple-1 flex cursor-pointer items-center gap-1 self-center hover:font-bold md:gap-2"
					@click="currentQuestionIndex--"
				>
					<IconNext class="h-6 w-6 scale-x-[-1] md:h-8 md:w-8" />
					กลับ
				</button>
			</div>

			<button
				v-if="
					selectedPartyId &&
					hasClicked &&
					explainMessage !== 'ยังไม่มีชื่อตอนโหวต'
				"
				class="hover:text-purple-1 mx-auto cursor-pointer self-center rounded-full border-3 bg-white px-4 py-2 font-bold text-nowrap hover:bg-[#F5EEE5] md:self-end"
				@click.stop="showPartyResult = true"
			>
				ดูผลลงมติพรรค
			</button>

			<button
				class="flex h-8 w-40 items-center justify-end gap-1 self-center pr-0 md:gap-2"
				:class="{
					'font-bold': isLastQuestion,
					'cursor-not-allowed opacity-50': !hasClicked,
					'hover:text-purple-1 cursor-pointer hover:font-bold': hasClicked,
				}"
				:disabled="!hasClicked"
				@click="handleNextClick"
			>
				{{ isLastQuestion ? 'ดูผลลัพธ์' : 'ไปต่อ' }}
				<component
					:is="isLastQuestion ? IconHeart : IconNext"
					:class="
						isLastQuestion ? 'h-4 w-4 md:h-6 md:w-6' : 'h-6 w-6 md:h-8 md:w-8'
					"
				/>
			</button>
		</div>

		<!-- Party Votes Popup -->
		<Transition
			enter-active-class="transition-all duration-500 ease-[cubic-bezier(0.25,1,0.5,1)]"
			leave-active-class="transition-all duration-500 ease-[cubic-bezier(0.25,1,0.5,1)]"
			enter-from-class="translate-y-full"
			enter-to-class="translate-y-0"
			leave-from-class="translate-y-0"
			leave-to-class="translate-y-full"
		>
			<PartyVotes
				v-if="showPartyResult"
				class="absolute"
				:billTitle="currentQuestion.title"
				:partyLogo="partyLogo"
				:partyName="partyName"
				:partyCount="currentPartyAnswer?.party_count"
				:result="partyAnswerLabel"
				:resultPct="partyAnswerPct"
				:votes="partyVotes"
				:pwUrl="currentQuestion.pw_url"
				@close="handleClose"
			/>
		</Transition>
	</div>
</template>
