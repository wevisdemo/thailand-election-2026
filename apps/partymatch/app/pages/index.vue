<script setup>
import {
	ElectionNavbar,
	ElectionButton,
	ElectionSharer,
	ElectionAboutActions,
	ElectionFooter,
} from '@election/ui/vue';
import lottie from 'lottie-web';
import loadingAnimation from '~/assets/lotties/loading.json';
import landingAnimation from '~/assets/lotties/landing.json';

import PartyDropdown from '../components/PartyDropdown.vue';
import PartyCard from '../components/PartyCard.vue';
import QuizMain from '../components/QuizMain.vue';
import ResultMain from '../components/ResultMain.vue';

const selectedParty = ref(null);
const lottieContainer = ref(null);
const lottieLandingContainer = ref(null);

const isUnselected = ref(false);
const showQuiz = ref(false);
const showResult = ref(false);

const partyOptions = ref([]);
const quizQuestions = ref([]);
const partyAnswers = ref([]);
const userAnswers = ref({});
const matchScore = ref(0);

const toggleState = () => {
	if (!isUnselected.value) {
		isUnselected.value = true;
		selectedParty.value = null;
	}
};

const handlePartySelected = (party) => {
	selectedParty.value = party;
	isUnselected.value = false;
};

const startQuiz = () => {
	showQuiz.value = true;
	showResult.value = false;
};

const resetState = () => {
	showQuiz.value = false;
	showResult.value = false;
	selectedParty.value = null;
};

const handleShowResult = (answers) => {
	userAnswers.value = answers;
	showResult.value = true;
	showQuiz.value = false;
};

const selectedPartyAnswers = computed(() => {
	if (!selectedParty.value || !partyAnswers.value.length) return [];
	return partyAnswers.value
		.filter((ans) => ans.party_id === selectedParty.value.id)
		.sort((a, b) => {
			return (
				quizQuestions.value.findIndex((q) => q.id === a.quiz_id) -
				quizQuestions.value.findIndex((q) => q.id === b.quiz_id)
			);
		});
});

const allPartiesWithAnswers = computed(() => {
	if (!partyOptions.value.length || !partyAnswers.value.length) return [];

	return partyOptions.value.map((party) => {
		const answers = partyAnswers.value
			.filter((ans) => ans.party_id === party.id)
			.sort((a, b) => {
				return (
					quizQuestions.value.findIndex((q) => q.id === a.quiz_id) -
					quizQuestions.value.findIndex((q) => q.id === b.quiz_id)
				);
			});

		return {
			id: party.id,
			name: party.name,
			logo: party.logo,
			answers: answers,
		};
	});
});

const { data: electionData, pending } = await useAsyncData(
	'election-content',
	async () => {
		const {
			Column,
			asString,
			asNumber,
			Spreadsheet,
			Object: SheetObject,
		} = await import('sheethuahua');

		const spreadsheet = Spreadsheet(
			'1cg85RsWVrSTDgRsVMTsmbkABbDk8Y84kIU_SsRl_smQ',
		);

		const [partyData, quizData, partyAnswerData] = await Promise.all([
			spreadsheet.get(
				'party',
				SheetObject({
					id: Column('id', asString()),
					name: Column('party_name69', asString()),
					name66: Column('party_name66', asString().optional()),
					logo: Column('logo', asString().optional()),
				}),
			),
			spreadsheet.get(
				'bill',
				SheetObject({
					id: Column('id', asString()),
					title: Column('title', asString()),
					title_full: Column('title_full', asString()),
					description: Column('desc', asString()),
					pw_url: Column('pw_url', asString()),
				}),
			),
			spreadsheet.get(
				'quiz',
				SheetObject({
					party_id: Column('party_id', asString()),
					quiz_id: Column('question_no', asString()),
					party_answer: Column('party_answer', asString().optional()),
					party_count: Column('party_count', asNumber()),
					agree_count: Column('agree', asNumber()),
					disagree_count: Column('disagree', asNumber()),
					abstain_count: Column('abstain', asNumber()),
					absent_count: Column('absent', asNumber()),
					novote_count: Column('novote', asNumber()),
				}),
			),
		]);
		return {
			parties: partyData.filter((p) => p.id),
			questions: quizData,
			answers: partyAnswerData,
		};
	},
);
watchEffect(() => {
	if (electionData.value) {
		partyOptions.value = electionData.value.parties;
		quizQuestions.value = electionData.value.questions;
		partyAnswers.value = electionData.value.answers;
	}
});
watch(
	() => ({
		lottieContainer: lottieContainer.value,
		lottieLandingContainer: lottieLandingContainer.value,
	}),
	(containers) => {
		Object.entries(containers).forEach(([key, container]) => {
			if (container && !container._lottieInitialized) {
				lottie.loadAnimation({
					container,
					renderer: 'svg',
					loop: true,
					autoplay: true,
					animationData:
						key === 'lottieContainer' ? loadingAnimation : landingAnimation,
				});
				container._lottieInitialized = true;
			}
		});
	},
	{ immediate: true },
);
</script>

<template>
	<div class="bg-bg flex flex-col">
		<ElectionNavbar />

		<section
			id="landing"
			v-if="!showQuiz && !showResult"
			class="flex flex-col gap-30 pt-10 pb-20"
		>
			<!-- Title -->
			<div class="section flex flex-col gap-8">
				<h1 class="text-h4 font-kondolar text-center font-bold">
					Party <span class="font-sriracha text-green-1">Match</span> <br />
					or Red Flag Alert?
				</h1>
				<!-- <img src="/img/hero-img.svg" alt="" /> -->
				<div ref="lottieLandingContainer"></div>

				<h1 class="text-h4 font-kondolar text-center font-bold">
					พรรคที่คุณจะเลือก ทำงานตรงใจคุณแค่ไหน ?
				</h1>
			</div>

			<!-- Intro -->
			<div class="section text-b4 flex flex-col gap-8 text-center">
				<p>
					พรรคการเมือง มีหน้าที่ดำเนินนโยบายตามที่ได้สัญญาไว้กับประชาชน 
					กฎหมายส่วนใหญ่มีที่มาจากพรรคการเมือง และการตัดสินใจของ สส.
					ที่สังกัดพรรคเหล่านั้นผ่าน <b>มติพรรค</b>
				</p>
				<p>
					ก่อนเข้าคูหาในสนาม #เลือกตั้ง69
					<b
						>ขอชวนคุณมาตรวจการบ้าน<span class="text-green-1 font-bold">*</span>
						16 พรรคที่เคยทำงานในสภาชุดก่อนหน้า</b
					>
					เพื่อดูว่าในช่วง 3 ปีที่ผ่านมานี้ พวกเขาทำงานตรงใจคุณแค่ไหน ?
				</p>
				<p class="text-b6 text-green-1">
					*หมายเหตุ: คัดเลือกจาก 10 ร่างกฎหมายที่อยู่ในความสนใจ ของสาธารณชน
					ซึ่งไม่สามารถแทนวิสัยทัศน์เชิงนโยบาย ทั้งหมดของพรรคการเมือง
					และอาจเปลี่ยนแปลงในอนาคต
					<NuxtLink to="/about" class="cursor-pointer underline"
						>อ่านเพิ่มเติม</NuxtLink
					>
				</p>
			</div>

			<!-- Selection -->
			<div class="section flex flex-col gap-8 text-center">
				<div>
					<h2 class="text-h8 font-kondolar font-bold">
						เลือกตั้งรอบนี้ คุณจะเลือกพรรคไหน
					</h2>
					<p class="text-b6">
						ไม่มีการจัดเก็บหรือใช้ข้อมูลของผู้ใช้งานในทุกกรณี
						ข้อมูลที่กรอกใช้เฉพาะประมวลผลแบบทดสอบเท่านั้น
					</p>
				</div>
				<div class="flex flex-col gap-2 sm:flex-row">
					<PartyDropdown
						:options="partyOptions"
						:is-unselected="isUnselected"
						@update:selected="handlePartySelected"
						@update:isUnselected="isUnselected = $event"
					/>

					<button
						class="typo-h9 font-kondolar border-gray-2 hover:bg-purple-2 hover:border-purple-2 disabled:text-gray-2 h-12 w-full cursor-pointer self-center rounded-full border-2 px-6 font-bold text-nowrap disabled:cursor-not-allowed md:w-auto"
						:disabled="isUnselected"
						@click="toggleState"
					>
						ยังไม่แน่ใจ
					</button>
				</div>
				<PartyCard
					v-if="isUnselected || selectedParty"
					:selected-party="selectedParty"
					:is-unselected="isUnselected"
					class="self-center"
					@start-quiz="startQuiz"
				/>

				<div
					v-else
					class="flex w-full flex-row justify-center rounded-2xl bg-white p-10 shadow-md"
				>
					<div
						ref="lottieContainer"
						class="mx-auto aspect-square w-full max-w-[400px]"
					></div>
				</div>
			</div>
		</section>

		<!-- Quiz -->
		<section
			id="quiz"
			v-if="showQuiz"
			class="h-[calc(100dvh-92px)] md:h-[calc(100vh-133px)]"
		>
			<QuizMain
				@reset="resetState"
				:questionsData="quizQuestions"
				:party-answers="partyAnswers"
				:selected-party-id="selectedParty?.id"
				:partyLogo="selectedParty?.logo"
				:partyName="selectedParty?.name"
				@show-result="handleShowResult"
			/>
		</section>

		<!-- Result -->
		<section id="result" v-if="showResult && !showQuiz">
			<ResultMain
				@reset="resetState"
				:selectedParty="selectedParty"
				:partyLogo="selectedParty?.logo"
				:partyName="selectedParty?.name"
				:matchScore="matchScore"
				:matchAnswers="userAnswers"
				:partyAnswers="selectedPartyAnswers"
				:allPartiesData="allPartiesWithAnswers"
				@update:matchScore="(newScore) => (matchScore = newScore)"
			/>
		</section>

		<!-- Info -->
		<section id="info" v-if="!showQuiz" class="flex flex-col gap-6 py-12">
			<ElectionSharer />
			<ElectionButton class="typo-h9 font-kondolar self-center font-bold"
				><NuxtLink to="/about">เกี่ยวกับโครงการ</NuxtLink></ElectionButton
			>
		</section>

		<ElectionFooter />
	</div>
</template>
