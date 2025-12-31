<script setup>
import InfoPopup from './InfoPopup.vue';
import { ElectionButton } from '@election/ui/vue';

const props = defineProps({
	// questions: Array,
	// partyAnswers: Array,
	selectedPartyId: String,
	partyLogo: String,
	partyName: String,
});

const emit = defineEmits(['reset']);
const resetQuiz = () => {
	emit('reset');
};
const isInfoPopupVisible = ref(false);

const projects = [
	{
		href: 'https://parliamentwatch.wevis.info/',
		title: 'ดูผลโหวตในสภาฯ ชุดที่ผ่านมา',
		imgSrc: '/img/og-project.png',
	},
	{
		href: 'https://election69.wevis.info/',
		title: 'ส่องนโยบายพรรค เลือกตั้ง 69',
		imgSrc: '/img/og-project.png',
	},
];
</script>

<template>
	<!-- Result -->
	<div class="bg-green-3 relative flex h-[calc(100vh-56px)] flex-col p-10">
		<ResultCard :matchLogo="partyLogo" :matchParty="partyName" />
		<div class="section flex flex-col items-center gap-4 p-8">
			<ElectionButton
				>save ไป<span class="line-through">แฉ</span>แชร์ต่อ</ElectionButton
			>
			<div class="flex flex-row gap-4">
				<ElectionButton @click="resetQuiz">เล่นใหม่</ElectionButton>
				<ElectionButton>ดูลำดับทั้งหมด</ElectionButton>
			</div>
			<div
				href="#"
				class="text-b6 flex cursor-pointer flex-row items-center gap-1 underline"
				@click="isInfoPopupVisible = true"
			>
				<p>อ่านวิธีคำนวณคะแนนเพิ่มเติม</p>
				<img src="/img/icon-info.svg" class="h-4" />
			</div>
		</div>
		<InfoPopup
			v-if="isInfoPopupVisible"
			title="วิธีคำนวณคะแนน"
			class="fixed top-1/2 left-1/2 z-2 -translate-x-1/2 -translate-y-1/2 transform"
			content="นับคะแนนจากตัวเลือกที่คุณเลือก 10 ข้อ เทียบกับกับมติพรรคถถ้าตรงกันจะนับเป็น 1 คะแนน หรือ 10% ยกเว้นในกรณีที่เป็นมติเสียงแตก ผลการลงมติของคนในพรรคเท่ากัน จะนับเป็น 0.5 คะแนน หรือ 5%"
			@close="isInfoPopupVisible = false"
		/>
	</div>

	<!-- Outro -->
	<div class="section text-b4 flex flex-col gap-8 pt-20 pb-10 text-center">
		<p>
			แม้ร่างกฎหมายที่เราเลือกมาให้โหวต
			จะเป็นเพียงส่วนหนึ่งของประเด็นที่ถูกผลักดันในสภาตลอด 3 ปีที่ผ่านมา
			แต่ก็ชวนคิดว่าพรรคการเมืองที่คุณจะเลือก เคยได้ทำหน้าที่ตัดสินใจในมติต่าง ๆ
			อย่างที่คาดหวังไว้ไหม พร้อมทั้งให้ไอเดียคุณว่าการเลือกตั้งครั้งนี้
			จะเลือกสนับสนุนพรรคการเมืองไหนเพื่อทำหน้าที่ให้ตรงใจคุณมากขึ้น
		</p>
		<img src="/img/hearts.gif" class="mx-auto h-10" />
		<p class="text-b6 text-green-1">
			หมายเหตุ: มติพรรคในการเลือกโหวต ‘เห็นด้วย’ ‘ไม่เห็นด้วย’ หรือ ‘งดออกเสียง’
			มาจากการพิจารณาในรายละเอียดของร่างฯ กฎหมาย  มากกว่าแค่ชื่อร่างฯ กฎหมาย
			โดยสามารถศึกษารายละเอียดของแต่ละร่างได้ที่
			<a
				href="https://lis.parliament.go.th/index/search_advance.php"
				class="underline"
				>ระบบสารสนเทศด้านนิติบัญญัติ</a
			>
		</p>

		<div class="section flex flex-row gap-6">
			<div
				v-for="(project, index) in projects"
				:key="index"
				class="flex min-h-20 w-full cursor-pointer flex-col gap-4 rounded-2xl border-3 border-b-black bg-white p-6 shadow-md hover:shadow-none"
				href="project.href"
			>
				<h4 class="font-kondolar text-h10 font-bold">{{ project.title }}</h4>
				<img :src="project.imgSrc" alt="" />
			</div>
		</div>
	</div>
</template>
