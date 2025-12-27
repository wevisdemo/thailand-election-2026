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

import PartyDropdown from '../components/PartyDropdown.vue';
import QuizMain from '../components/QuizMain.vue';

const selectedParty = ref(null);
const lottieContainer = ref(null);

const isUnselected = ref(false);
const showQuiz = ref(false);

const partyOptions = ref([]);
const quizQuestions = ref([]);

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
};

onMounted(async () => {
	const { Column, asString, Spreadsheet, Object } = await import('sheethuahua');
	const spreadsheet = Spreadsheet(
		'1cg85RsWVrSTDgRsVMTsmbkABbDk8Y84kIU_SsRl_smQ',
	);

	const partyData = await spreadsheet.get(
		'party',
		Object({
			id: Column('id', asString()),
			name: Column('party_name69', asString()),
			name66: Column('party_name66', asString().optional()),
			logo: Column('logo', asString().optional()),
		}),
	);
	partyOptions.value = partyData.filter((party) => party.id);

	const quizData = await spreadsheet.get(
		'bill',
		Object({
			id: Column('id', asString()),
			title: Column('title', asString()),
			title_full: Column('title_full', asString()),
			description: Column('desc', asString()),
		}),
	);
	quizQuestions.value = quizData;

	lottie.loadAnimation({
		container: lottieContainer.value,
		renderer: 'svg',
		loop: true,
		autoplay: true,
		animationData: loadingAnimation,
	});
});
</script>

<template>
	<div class="bg-bg flex flex-col">
		<ElectionNavbar />

		<section
			id="landing"
			v-if="!showQuiz"
			class="flex flex-col gap-30 pt-10 pb-20"
		>
			<!-- Title -->
			<div class="section flex flex-col gap-8">
				<h1 class="text-h4 font-kondolar text-center font-bold">
					Party <span class="font-sriracha text-green-1">Match</span> or Red
					Flag Alert?
				</h1>
				<img src="/img/hero-img.svg" alt="" />
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
					<b>ขอชวนคุณมาตรวจการบ้าน 16 พรรคที่เคยทำงานในสภาชุดก่อนหน้า</b>
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
				<div class="flex flex-row gap-2">
					<PartyDropdown
						:options="partyOptions"
						:is-unselected="isUnselected"
						@update:selected="handlePartySelected"
						@update:isUnselected="isUnselected = $event"
					/>

					<ElectionButton
						class="typo-h9 font-kondolar self-center font-bold text-nowrap"
						:disabled="isUnselected"
						@click="toggleState"
					>
						ยังไม่แน่ใจ
					</ElectionButton>
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
					<div ref="lottieContainer" style="width: 400px; height: 400px"></div>
				</div>
			</div>
		</section>

		<!-- Info -->
		<section id="info" v-if="!showQuiz" class="flex flex-col gap-6 py-12">
			<ElectionAboutActions
				dataUrl="https://docs.google.com/spreadsheets/d/1cg85RsWVrSTDgRsVMTsmbkABbDk8Y84kIU_SsRl_smQ/edit?usp=sharing"
			/>
			<ElectionSharer />
			<ElectionButton class="typo-h9 font-kondolar self-center font-bold"
				><NuxtLink to="/about">เกี่ยวกับโครงการ</NuxtLink></ElectionButton
			>
		</section>

		<section id="quiz" v-if="showQuiz" class="h-[calc(100vh-133px)]">
			<QuizMain v-if="showQuiz" :questions="quizQuestions" />
		</section>

		<ElectionFooter />
	</div>
</template>
