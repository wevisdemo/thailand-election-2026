<script setup>
import heartMatchImg from '~/assets/images/heart-match.svg';
import heartUnMatchImg from '~/assets/images/heart-unmatch.svg';
import heartParty from '~/assets/images/heart-party.svg';
import IconHeart from './icons/IconHeart.vue';
const props = defineProps({
	partyAnswers: { type: Array, required: true },
	matchAnswers: { type: Object, required: true },
	matchLogo: String,
	matchName: String,
	selectedParty: { type: Object, default: null },
	showAll: { type: Boolean, default: false },
	allPartiesData: { type: Array, default: () => [] },
});

const emit = defineEmits(['update:matchScore']);

const allScores = computed(() => {
	return props.allPartiesData.map((party) => ({
		name: party.name,
		logo: party.logo,
		score: calculateScore(party.answers),
	}));
});

const computedMatchScore = computed(() => {
	const currentParty = allScores.value.find((p) => p.name === props.matchName);
	return currentParty ? currentParty.score : 0;
});

const topMatches = computed(() => {
	const sorted = [...allScores.value]
		.filter((p) => p.name !== props.matchName)
		.sort((a, b) => b.score - a.score);

	const groups = sorted.reduce((acc, party) => {
		const existingGroup = acc.find((g) => g.score === party.score);
		if (existingGroup) {
			existingGroup.parties.push({ name: party.name, logo: party.logo });
		} else {
			acc.push({
				score: party.score,
				parties: [{ name: party.name, logo: party.logo }],
			});
		}
		return acc;
	}, []);

	return props.showAll ? groups : groups.slice(0, 3);
});

const matchPercentage = computed(() => {
	const totalQuestions = 10;
	return Math.round((computedMatchScore.value / totalQuestions) * 100);
});

const matchMessage = computed(() => {
	if (matchPercentage.value >= 90) return 'ตรงสุดๆ';
	if (matchPercentage.value >= 70) return 'ก็ตรงอยู่น้า';
	if (matchPercentage.value >= 50) return 'ได้อยู่';
	if (matchPercentage.value >= 30) return 'ไม่ค่อยเท่าไร';
	return 'อาจจะยังน้า';
});

watch(
	computedMatchScore,
	(newVal) => {
		emit('update:matchScore', newVal);
	},
	{ immediate: true },
);

function calculateScore(partyAnswersArray) {
	if (!partyAnswersArray || !props.matchAnswers) return 0;

	const labelMap = {
		agree: 'เห็นด้วย',
		disagree: 'ไม่เห็นด้วย',
		abstain: 'งดออกเสียง',
	};

	return partyAnswersArray.reduce((score, partyEntry) => {
		const questionId = partyEntry.quiz_id;
		const userAns = props.matchAnswers[questionId];
		const pAnsKey = partyEntry.party_answer;

		if (!userAns) return score;

		if (labelMap[pAnsKey] === userAns) return score + 1;

		if (
			pAnsKey === 'agree, disagree' &&
			(userAns === 'เห็นด้วย' || userAns === 'ไม่เห็นด้วย')
		) {
			return score + 0.5;
		}

		return score;
	}, 0);
}
</script>

<template>
	<div
		class="bg-bg flex min-h-140 w-full max-w-[360px] flex-col items-center justify-between gap-6 rounded-2xl p-6 shadow-md"
	>
		<div class="bg-bg flex w-full flex-col items-center gap-6">
			<div class="flex h-full flex-col items-center gap-4">
				<div
					class="font-kondolar text-h9 flex flex-row gap-1.5 leading-none font-bold"
				>
					<h2>มติพรรคที่<span v-if="selectedParty?.id">เลือก</span></h2>
					<IconHeart class="h-5 w-5 text-black" />
					<h2>ใจตรงกับ</h2>
					<IconHeart class="text-green-2 h-5 w-5" />
					<h2 class="text-green-2 font-bold">คุณ</h2>
				</div>

				<div>
					<div
						class="flex flex-row items-center justify-center"
						:style="{ gap: `${(10 - computedMatchScore) * 8}px` }"
					>
						<div v-if="selectedParty?.id" class="relative">
							<img :src="heartParty" class="z-1 h-20 w-20" />
							<img
								:src="matchLogo"
								class="absolute top-1/2 left-1/2 z-0 h-10 w-10 -translate-x-1/2 -translate-y-1/2 transform rounded-full"
							/>
						</div>
						<div v-if="selectedParty?.id" class="relative">
							<p
								class="text-h6 font-kondolar absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 transform font-black"
							>
								{{ matchPercentage }}<span class="text-h8">%</span>
							</p>
							<img
								:src="matchPercentage > 50 ? heartMatchImg : heartUnMatchImg"
								class="h-20 w-20"
							/>
						</div>
					</div>
					<p v-if="selectedParty?.id" class="font-sriracha text-center">
						{{ matchMessage }}
					</p>
				</div>

				<div
					v-if="selectedParty?.id"
					class="bg-green-3 rounded-xl p-0.75 shadow-sm"
				>
					<ResultItem
						:parties="[{ name: matchName, logo: matchLogo }]"
						:matchScore="computedMatchScore"
						class="rounded-lg bg-white p-2"
					/>
				</div>
			</div>
			<div class="flex w-full flex-col items-center gap-3">
				<h3 v-if="selectedParty?.id" class="w-72 text-left font-bold">
					พรรคอื่นที่คะแนนตรงกับคุณ
				</h3>
				<ResultItem
					v-for="group in topMatches"
					:key="group.score"
					:parties="group.parties"
					:matchScore="group.score"
				/>
			</div>
		</div>

		<div class="flex flex-col items-center gap-2">
			<p class="underline">election69.wevis.info/partymatch</p>
			<img src="/img/wv-election69-logo.svg" class="inline h-6" />
		</div>
	</div>
</template>
