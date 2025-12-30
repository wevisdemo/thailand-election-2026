<template>
	<div class="relative flex h-full flex-col">
		<!-- Progress bar -->
		<div class="section w-full py-8">
			<div
				:style="{
					width: `${((currentQuestionIndex + 1) / questions.length) * 100}%`,
				}"
				class="bg-green-2 h-1 rounded transition-all duration-300"
			></div>
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
					<p v-html="renderMarkdown(currentQuestion.description)"></p>
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
			<div class="h-12 text-center">
				<p v-if="selectedPartyId" class="font-sriracha text-b2">
					{{ resultMessage }}
				</p>
				<p v-else-if="hasClicked" class="font-sriracha text-b2">Your Answer</p>
				<p v-if="explainMessage" class="text-b6">
					เพราะพรรคนี้ {{ explainMessage }}
				</p>
			</div>
			<div class="flex justify-between px-20">
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
				/>
			</div>
		</div>

		<!-- Navigation -->
		<div
			class="font-kondolar gap-auto absolute bottom-0 flex w-full flex-row justify-between p-6"
		>
			<div class="w-40 self-center">
				<button
					v-if="currentQuestionIndex > 0"
					class="flex w-40 cursor-pointer items-center gap-2 hover:font-bold"
					@click="currentQuestionIndex--"
				>
					<img src="/img/arrow-left.svg" class="h-8" /> กลับ
				</button>
			</div>

			<button
				v-if="
					selectedPartyId &&
					hasClicked &&
					explainMessage !== 'ยังไม่มีชื่อตอนโหวต'
				"
				class="hover:bg-gray-3 m-auto cursor-pointer rounded-full border-3 bg-white px-4 py-2 font-bold"
				@click="showPartyResult = true"
			>
				ดูผลลงมติพรรค
			</button>

			<button
				class="flex w-40 cursor-pointer items-center justify-end gap-2 pr-0 hover:font-bold"
				:class="{ 'font-bold': isLastQuestion }"
				@click="handleNextClick"
			>
				{{ isLastQuestion ? 'ดูผลลัพธ์' : 'ไปต่อ' }}
				<img
					:src="
						isLastQuestion ? '/img/icon-heart-ol.svg' : '/img/arrow-right.svg'
					"
					class="h-8"
				/>
			</button>
		</div>

		<!-- Party Result Popup -->
		<PartyResult
			v-if="showPartyResult"
			class="absolute"
			:billTitle="currentQuestion.title"
			:partyLogo="partyLogo"
			:partyName="partyName"
			:partyCount="currentPartyAnswer?.party_count"
			:result="partyAnswerLabel"
			:resultPct="partyAnswerPct"
			:votes="partyVotes"
			@click="handleClose"
		/>
	</div>
</template>

<script setup>
import { marked } from 'marked';
import QuizChoices from '../components/QuizChoices.vue';
import PartyResult from './PartyVotes.vue';
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
		iconSrc: '/img/choice-abstain.svg',
		buttonClass: 'bg-gray-2 focus:bg-gray-1',
		showInfoIcon: true,
	},
	{
		label: 'เห็นด้วย',
		iconSrc: '/img/choice-agree.svg',
		buttonClass: 'bg-green-2 focus:bg-green-1',
	},
	{
		label: 'ไม่เห็นด้วย',
		iconSrc: '/img/choice-disagree.svg',
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

const handleChoiceClick = (label) => {
	if (selectedAnswer.value) return;
	selectedAnswer.value = label;
	hasClicked.value = true;

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
	if (isLastQuestion.value) {
		emit('show-result');
	} else {
		currentQuestionIndex.value++;
	}
};

// --- UI/Overflow Logic ---
const descriptionContainer = ref(null);
const innerContent = ref(null);
const isOverflowing = ref(false);
const renderMarkdown = (markdownText) => marked.parse(markdownText || '');

const showPartyResult = ref(false);

const handleClose = () => {
	showPartyResult.value = false;
};

const checkOverflow = () => {
	if (descriptionContainer.value && innerContent.value) {
		isOverflowing.value =
			innerContent.value.scrollHeight > descriptionContainer.value.clientHeight;
	}
};

watch(currentQuestionIndex, () => {
	selectedAnswer.value = null;
	resultMessage.value = '';
	explainMessage.value = '';
	hasClicked.value = false;
	nextTick(checkOverflow);
});

let observer;
onMounted(() => {
	observer = new ResizeObserver(checkOverflow);
	if (innerContent.value) observer.observe(innerContent.value);
});
onUnmounted(() => observer?.disconnect());
</script>
