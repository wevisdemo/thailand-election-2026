<script setup>
import { marked } from 'marked';
import QuizChoices from './QuizChoice.vue';
import PartyVotes from './PartyVotes.vue';
import arrowNext from '~/assets/images/arrow-next.svg';
import heartIcon from '~/assets/images/heart-icon.svg';
import IconAbstain from './icons/IconAbstain.vue';
import IconAgree from './icons/IconAgree.vue';
import IconDisagree from './icons/IconDisagree.vue';

const props = defineProps({
	questions: Array,
	partyAnswers: Array,
	selectedPartyId: String,
	partyLogo: String,
	partyName: String,
});

const emit = defineEmits(['show-result']);

const currentQuestionIndex = ref(0);
const selectedAnswer = ref(null);
const hasClicked = ref(false);
const resultMessage = ref('');
const explainMessage = ref('');
const userAnswers = ref([]);

// --- Computed ---
const currentQuestion = computed(
	() => props.questions[currentQuestionIndex.value] || {},
);
const isLastQuestion = computed(
	() => currentQuestionIndex.value === props.questions.length - 1,
);
const currentPartyAnswer = computed(() => {
	return props.partyAnswers?.find(
		(a) =>
			a.party_id === props.selectedPartyId &&
			a.quiz_id === currentQuestion.value.id,
	);
});

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

// --- Logic ---
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

	userAnswers.value[currentQuestionIndex.value] = label;

	resultMessage.value = isAnswerMatch(label) ? "It's a match!" : 'Not match!';

	const statusMap = {
		absent: 'ไม่เข้าประชุมเกินครึ่ง',
		'agree, disagree': 'เสียงแตก',
		undefined: 'ยังไม่มีชื่อตอนโหวต',
	};
	explainMessage.value =
		statusMap[currentPartyAnswer.value?.party_answer] || '';
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

// --- UI/Overflow Logic ---
const descriptionContainer = ref(null);
const innerContent = ref(null);
const isOverflowing = ref(false);
const renderedDescription = computed(() =>
	marked.parse(currentQuestion.value.description || ''),
);

const showPartyResult = ref(false);

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
	const previousAnswer = userAnswers.value[newIndex];
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

let observer;
onMounted(() => {
	observer = new ResizeObserver(checkOverflow);
	if (innerContent.value) observer.observe(innerContent.value);
});
onUnmounted(() => observer?.disconnect());
</script>

<template>
	<div class="relative flex h-full flex-col">
		<!-- Progress bar -->
		<div class="section w-full pt-2 pb-4">
			<div
				:style="{
					width: `${((currentQuestionIndex + 1) / questions.length) * 100}%`,
				}"
				class="bg-green-2 h-1 rounded transition-all duration-300"
			></div>
		</div>

		<!-- Question -->
		<div class="mx-auto flex flex-row md:max-w-[40rem]">
			<img
				src="/img/card-side.png"
				class="h-60 scale-x-[-1] transform py-4 md:h-80"
			/>
			<div
				class="relative h-60 overflow-auto rounded-2xl bg-white p-4 text-center shadow-md [-ms-overflow-style:none] [scrollbar-width:none] md:h-80 md:px-8 md:py-6 [&::-webkit-scrollbar]:hidden"
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
						<p v-html="renderedDescription"></p>
					</div>
				</div>
				<div
					v-if="isOverflowing"
					class="0% 25% 100% sticky -bottom-6 flex h-14 w-full shrink-0 items-center justify-center bg-gradient-to-t from-white via-white to-transparent"
				>
					<img src="/img/chevron-down.svg" class="h-6" />
				</div>
			</div>
			<img src="/img/card-side.png" class="h-60 py-4 md:h-80" />
		</div>

		<!-- Choices -->
		<div class="section flex w-full flex-col gap-4 pt-3 md:pt-4">
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
					class="flex cursor-pointer items-center gap-1 self-center hover:font-bold md:gap-2"
					@click="currentQuestionIndex--"
				>
					<img :src="arrowNext" class="h-6 scale-x-[-1] md:h-8" /> กลับ
				</button>
			</div>

			<button
				v-if="
					selectedPartyId &&
					hasClicked &&
					explainMessage !== 'ยังไม่มีชื่อตอนโหวต'
				"
				class="hover:bg-gray-3 mx-auto cursor-pointer self-center rounded-full border-3 bg-white px-4 py-2 font-bold text-nowrap md:self-end"
				@click="showPartyResult = true"
			>
				ดูผลลงมติพรรค
			</button>

			<button
				class="flex h-8 w-40 items-center justify-end gap-1 self-center pr-0 md:gap-2"
				:class="{
					'font-bold': isLastQuestion,
					'cursor-not-allowed opacity-50': !hasClicked,
					'cursor-pointer hover:font-bold': hasClicked,
				}"
				:disabled="!hasClicked"
				@click="handleNextClick"
			>
				{{ isLastQuestion ? 'ดูผลลัพธ์' : 'ไปต่อ' }}
				<img :src="isLastQuestion ? heartIcon : arrowNext" class="h-6 md:h-8" />
			</button>
		</div>

		<!-- Party Votes Popup -->
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
			@click="handleClose"
		/>
	</div>
</template>
