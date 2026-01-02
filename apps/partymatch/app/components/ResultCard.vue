<template>
	<div
		class="section bg-bg flex w-full flex-col items-center justify-between gap-6 rounded-2xl p-10 shadow-md"
	>
		<div class="flex h-full flex-col items-center gap-4">
			<div class="flex flex-row">
				<h2>มติพรรคที่<span v-if="selectedParty?.id">เลือก</span></h2>
				<img src="assets/images/heart-icon.svg" class="inline h-6 w-6" />
				<h2>ใจตรงกับ</h2>
				<svg
					width="24"
					height="24"
					viewBox="0 0 24 24"
					fill="none"
					xmlns="http://www.w3.org/2000/svg"
				>
					<path
						d="M15.6087 2.85417C16.0302 2.71309 16.4577 2.75545 16.8415 2.94733L17.4158 3.23503C17.418 3.23428 17.4207 3.23368 17.4234 3.23268L18.1101 2.97956L18.1945 2.95085C18.3965 2.88863 18.6269 2.86116 18.8695 2.90807C19.1173 2.95602 19.3268 3.07231 19.4953 3.22331L19.565 3.28952L20.029 3.7653C20.2441 3.98559 20.4209 4.23424 20.5517 4.5112L20.8195 5.0778C20.8917 5.23059 20.9741 5.37694 21.0667 5.51667L21.4113 6.03639C21.6408 6.38252 21.7269 6.7805 21.6656 7.18893L21.5724 7.8112C21.515 8.19322 21.345 8.52868 21.0966 8.80905L20.7099 9.2444L20.9015 9.89713C20.9732 10.1421 20.9951 10.4329 20.8921 10.7286C20.7884 11.0263 20.5882 11.2415 20.3724 11.3883L19.7607 11.8044C19.6725 11.8644 19.66 11.9012 19.6593 11.9034L19.4454 12.4811C19.4167 12.5589 19.3953 12.6689 19.3992 12.8239L19.4173 13.5499C19.4269 13.932 19.341 14.3105 19.1249 14.6473L18.7839 15.1788C18.5779 15.4999 18.2905 15.7366 17.9589 15.8995L17.315 16.2159C17.2783 16.2339 17.2634 16.2476 17.2599 16.251C17.2575 16.2535 17.2569 16.2537 17.2558 16.2563L16.9986 16.8364C16.8862 17.0893 16.7457 17.3258 16.5773 17.5436L16.1964 18.0358C16.0394 18.2389 15.865 18.4271 15.6744 18.5995L15.2115 19.0184C15.0504 19.1641 14.8875 19.3068 14.7228 19.4462L14.2494 19.8464C14.0738 19.9949 13.8922 20.1361 13.7044 20.2694L13.1982 20.6286C12.9102 20.833 12.4374 21.0318 11.9261 20.7973L11.5394 20.6198C11.4835 20.5941 11.3468 20.5315 11.2324 20.4376C11.199 20.4102 11.1305 20.3508 11.0665 20.2589C11.0428 20.2247 11.0061 20.1659 10.9745 20.0866L10.7326 19.9372C10.4073 19.7362 10.1649 19.4524 10.006 19.1133L9.72064 18.504C9.71789 18.4981 9.71555 18.4944 9.7142 18.4923C9.7125 18.4914 9.71003 18.4902 9.70658 18.4887L9.09135 18.2356C8.83232 18.1292 8.58895 17.9972 8.36361 17.8389L7.84623 17.4757C7.56351 17.277 7.33994 17.0199 7.17885 16.7163L6.87357 16.1403C6.80256 16.0065 6.72097 15.8913 6.63041 15.7917L6.21264 15.3317C6.11869 15.2283 6.00861 15.1323 5.88041 15.0446L5.3431 14.6772C5.06297 14.4856 4.83388 14.2394 4.66517 13.9436L4.35053 13.3917C4.183 13.0979 4.08709 12.7775 4.05639 12.4424L3.99779 11.8096L3.40424 11.3895C2.99358 11.0987 2.73975 10.6492 2.77728 10.1046L2.82416 9.42956C2.83701 9.24321 2.83677 9.0593 2.82357 8.8776L2.77494 8.21315C2.74134 7.75115 2.90018 7.33247 3.20502 7.00202L3.67787 6.48932C3.75816 6.40229 3.79502 6.32822 3.81263 6.26667L3.98431 5.66667C4.0582 5.4085 4.15997 5.15879 4.28783 4.91842L4.5931 4.34538C4.76471 4.02278 5.01165 3.76187 5.31029 3.56081L5.9015 3.16295C6.11765 3.01743 6.38179 2.9197 6.67963 2.92448C6.93615 2.92865 7.16377 3.00773 7.35463 3.11784L7.43431 3.16706L8.00971 3.54381L8.63021 3.25963L8.71752 3.22331C8.92619 3.14233 9.17231 3.09777 9.43763 3.1442C9.74673 3.19831 9.99138 3.36012 10.1706 3.55378L10.6535 4.07467C10.7815 4.21301 10.9098 4.32785 11.0378 4.42155L11.5622 4.80534C11.9576 5.09479 12.1567 5.51706 12.1822 5.97487L12.2144 6.56432L12.5103 6.71549L12.6538 6.12135C12.7476 5.73376 12.9604 5.41022 13.2538 5.15924L13.7718 4.71628C13.8418 4.65647 13.8706 4.60597 13.8855 4.56217L14.087 3.97038L14.1175 3.88835C14.2802 3.48522 14.5949 3.1933 15.0093 3.05456L15.6087 2.85417ZM15.6257 4.59733L15.4558 5.09655C15.3364 5.44732 15.1252 5.74183 14.8499 5.97721L14.332 6.4196C14.2803 6.46376 14.2711 6.49185 14.2663 6.51159L14.1187 7.12272C14.06 7.36557 13.9843 7.6013 13.8913 7.82936L13.6605 8.39538C13.6376 8.45151 13.6126 8.5088 13.5867 8.56178C13.5691 8.59757 13.5217 8.69473 13.4449 8.78737C13.4211 8.81601 13.2995 8.96683 13.0792 9.04753C12.9459 9.09633 12.7543 9.12656 12.5431 9.061C12.3351 8.99641 12.199 8.86699 12.1212 8.76335C11.9905 8.58891 11.9652 8.41156 11.9595 8.37428C11.9551 8.34493 11.9523 8.31729 11.9507 8.29284L11.3765 7.99811C10.9125 7.76006 10.5966 7.33489 10.5656 6.77643L10.5275 6.10319L10.0581 5.76042C9.83676 5.59838 9.62953 5.41121 9.43588 5.20202L9.11947 4.85983L8.62846 5.08424C8.13759 5.3085 7.61412 5.2675 7.1642 4.97292L6.66674 4.64713L6.23666 4.93717C6.14107 5.00153 6.08906 5.06453 6.05736 5.12409L5.75267 5.69772C5.67726 5.8395 5.61986 5.98115 5.57924 6.12311L5.40756 6.72311C5.31066 7.06168 5.13226 7.35894 4.89721 7.61374L4.43139 8.11823L4.47767 8.7569C4.49666 9.01798 4.49702 9.28046 4.47885 9.54381L4.44076 10.0911L4.96693 10.4637C5.32187 10.7151 5.56898 11.0772 5.63549 11.5255L5.64603 11.6163L5.70814 12.2913C5.71869 12.4063 5.74891 12.4952 5.79135 12.5696L6.10599 13.1221C6.14723 13.1944 6.20223 13.2547 6.28002 13.3079L6.81674 13.6753C7.04651 13.8324 7.25545 14.0128 7.44017 14.2161L7.85795 14.676C8.04595 14.8829 8.20576 15.1128 8.33842 15.3628L8.64428 15.9387C8.68685 16.019 8.73759 16.0751 8.79955 16.1186L9.31693 16.4819C9.43642 16.5658 9.57076 16.6396 9.72181 16.7016L10.337 16.9542C10.7365 17.1184 11.0409 17.4116 11.223 17.8003L11.5083 18.4096C11.5396 18.4763 11.5716 18.5059 11.6044 18.5262L12.1417 18.8579C12.232 18.9136 12.3504 18.99 12.4441 19.0741C12.4536 19.0826 12.4644 19.0935 12.4769 19.1057L12.7441 18.9165C12.8937 18.8103 13.0386 18.6983 13.1783 18.5801L13.6511 18.1799C13.8018 18.0525 13.9511 17.9215 14.0988 17.788L14.5617 17.369C14.6798 17.2622 14.787 17.1462 14.8839 17.021L15.2648 16.5288C15.3503 16.4183 15.4228 16.2968 15.4822 16.1632L15.74 15.5831C15.9151 15.1888 16.2182 14.9063 16.5831 14.727L17.2277 14.4106C17.3257 14.3625 17.3669 14.3161 17.3882 14.2829L17.7292 13.7514C17.7405 13.7338 17.7617 13.6928 17.7591 13.5915L17.741 12.8661C17.7327 12.5375 17.7762 12.2129 17.8898 11.9057L18.1037 11.328C18.246 10.9432 18.5106 10.649 18.8279 10.4333L19.2462 10.1479L19.0962 9.63522C18.954 9.14949 19.0318 8.6379 19.3945 8.22838L19.8544 7.70924C19.9126 7.64357 19.9268 7.598 19.9318 7.5651L20.0244 6.94635L19.6845 6.43307C19.5475 6.22648 19.4256 6.01088 19.3195 5.7862L19.0517 5.2196C19.0042 5.11904 18.9367 5.02079 18.8425 4.92428L18.522 4.59557L17.9964 4.78893C17.5756 4.94386 17.1214 4.942 16.6968 4.72975L16.1091 4.43561L15.6257 4.59733Z"
						fill="#1AD39E"
					/>
				</svg>
				<h2 class="text-green-2 font-bold">คุณ</h2>
			</div>
			<div>
				<div class="flex flex-row items-center justify-center">
					<div v-if="selectedParty?.id" class="relative">
						<img src="/img/heart-party.svg" class="z-1 h-20 w-20" />
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

			<ResultItem
				v-if="selectedParty?.id"
				:parties="[{ name: matchName, logo: matchLogo }]"
				:matchScore="computedMatchScore"
				class="border-green-3 rounded-lg border-2 bg-white p-2 shadow-sm"
			/>

			<h3 v-if="selectedParty?.id" class="font-bold">
				พรรคอื่นที่คะแนนตรงกับคุณ
			</h3>
			<ResultItem
				v-for="group in topMatches"
				:key="group.score"
				:parties="group.parties"
				:matchScore="group.score"
			/>
		</div>

		<div class="flex flex-col items-center gap-2">
			<p class="underline">election69.wevis.info/partymatch</p>
			<img src="/img/wv-election69-logo.svg" class="inline h-6" />
		</div>
	</div>
</template>

<script setup>
import heartMatchImg from '~/assets/images/heart-match.svg';
import heartUnMatchImg from '~/assets/images/heart-unmatch.svg';

const props = defineProps({
	partyAnswers: { type: Array, required: true },
	matchAnswers: { type: Array, required: true },
	matchLogo: String,
	matchName: String,
	selectedParty: { type: Object, default: null },
	allPartiesData: { type: Array, default: () => [] },
});

const emit = defineEmits(['update:matchScore']);

const computedMatchScore = computed(() => {
	const currentParty = props.allPartiesData.find(
		(p) => p.name === props.matchName,
	);
	return currentParty ? calculateScore(currentParty.answers) : 0;
});

const allScores = computed(() => {
	return props.allPartiesData.map((party) => {
		return {
			name: party.name,
			logo: party.logo,
			score: calculateScore(party.answers),
		};
	});
});

const topMatches = computed(() => {
	const sorted = [...allScores.value]
		.filter((p) => p.name !== props.matchName)
		.sort((a, b) => b.score - a.score);

	const groups = [];
	for (const p of sorted) {
		const g = groups.find((gr) => gr.score === p.score);
		if (g) g.parties.push({ name: p.name, logo: p.logo });
		else
			groups.push({
				score: p.score,
				parties: [{ name: p.name, logo: p.logo }],
			});
	}

	return groups.slice(0, 3);
});

const matchPercentage = computed(() => {
	const total = props.matchAnswers.length || 10;
	return Math.round((computedMatchScore.value / total) * 100);
});

const matchMessage = computed(() => {
	if (matchPercentage.value >= 90) return 'ตรงสุดๆ';
	if (matchPercentage.value >= 70) return 'ก็ตรงอยู่น้า';
	if (matchPercentage.value >= 50) return 'ได้อยู่';
	if (matchPercentage.value >= 30) return 'ไม่ค่อยเท่าไร';
	return 'อาจจะยังน้า';
});

watch(
	() => computedMatchScore.value,
	(newVal) => {
		emit('update:matchScore', newVal);
	},
	{ immediate: true },
);

function calculateScore(partyAnswersArray) {
	if (!partyAnswersArray || !props.matchAnswers.length) return 0;

	const labelMap = {
		agree: 'เห็นด้วย',
		disagree: 'ไม่เห็นด้วย',
		abstain: 'งดออกเสียง',
	};

	return partyAnswersArray.reduce((score, partyEntry, index) => {
		const userAns = props.matchAnswers[index];
		const pAnsKey = partyEntry.party_answer;
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
