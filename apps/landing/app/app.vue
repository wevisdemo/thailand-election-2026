<script setup>
import {
	ElectionNavbar,
	ElectionSharer,
	ElectionFooter,
	ElectionAboutActions,
} from '@election/ui/vue';
import PocketbookSection from './components/PocketbookSection.vue';
import Timeline from './components/Timeline.vue';
import { fetchWeVisElectionPosts } from './wordpress/src';

const isLoading = ref(true);

const articleList = ref([]);
const showTimeline = ref(false);

const startDate = new Date('2025-12-15T00:00:00'); // 15 ธ.ค. 2568
const targetDate = new Date('2026-02-08T00:00:00'); // 8 ก.พ. 2569
const daysLeft = ref(0);

const calculateDaysLeft = () => {
	const now = new Date();
	const diffTime = targetDate.getTime() - now.getTime();
	const diffDays = Math.max(0, Math.ceil(diffTime / (1000 * 60 * 60 * 24)));
	daysLeft.value = diffDays;
};

const tensDigit = computed(() => Math.floor(daysLeft.value / 10).toString());
const unitsDigit = computed(() => (daysLeft.value % 10).toString());

const progressPercentage = computed(() => {
	const now = new Date();

	const totalDuration = targetDate.getTime() - startDate.getTime();
	const elapsed = now.getTime() - startDate.getTime();

	const percent = (elapsed / totalDuration) * 100;
	return Math.min(Math.max(percent, 0), 100);
});

const remainingWidth = computed(() => 100 - progressPercentage.value);

const isTimeUp = computed(() => daysLeft.value <= 0);

onMounted(async () => {
	setTimeout(() => {
		isLoading.value = false;
	}, 300);

	articleList.value = await fetchWeVisElectionPosts({ limit: 10 });
	calculateDaysLeft();
});
</script>

<template>
	<div class="flex flex-col">
		<Transition name="fade">
			<div
				v-if="isLoading"
				class="bg-bg fixed inset-0 z-50 flex flex-col items-center justify-center"
			/>
		</Transition>

		<ElectionNavbar />
		<div
			class="font-kondolar flex flex-col items-center bg-[#333333] pt-8 pb-3 text-center md:pt-16 md:pb-6"
		>
			<h4 class="text-h4 text-green-3 w-[280px] font-bold md:w-full">
				ทบทวน เตรียมพร้อม ซ้อมใช้สิทธิ 
			</h4>
			<p class="text-h8 mb-4 w-[280px] text-white md:w-[400px] lg:w-full">
				รวม ‘ข้อมูลเปิด’
				<br class="md:hidden" />
				สำหรับทวนความจำและเตรียมตัวเลือกตั้งพร้อมประชามติ 2569
			</p>
			<div v-if="!isTimeUp" class="flex w-full flex-col items-center">
				<div class="flex flex-col items-center md:flex-row md:gap-0">
					<p class="text-h8 text-bg font-bold">นับถอยหลัง</p>
					<div class="flex flex-row-reverse py-2 md:py-0">
						<div class="relative -translate-x-2.5 translate-y-1">
							<p
								class="font-ibmplex absolute left-1/2 -translate-x-1/3 translate-y-[-2%] text-[40px] font-bold"
							>
								{{ unitsDigit }}
							</p>
							<img src="/assets/images/green-paper.svg" alt="Green Paper" />
						</div>
						<div class="relative translate-x-2.5 -translate-y-1">
							<p
								class="font-ibmplex absolute left-[55%] -translate-x-1/2 translate-y-[-4%] text-[40px] font-bold"
							>
								{{ tensDigit }}
							</p>
							<img src="/assets/images/purple-paper.svg" alt="Purple Paper" />
						</div>
					</div>
					<p class="text-h8 text-bg mr-2 font-bold">วัน</p>
					<p class="text-green-3 text-h6 font-bold">สู่วันเลือกตั้ง</p>
				</div>
				<div
					class="relative hidden w-full max-w-[600px] pt-9 pb-11 md:block lg:max-w-[950px]"
				>
					<div class="bg-bg relative flex h-0.5 w-full">
						<div
							class="bg-green-3 absolute top-1/2 right-0 h-1 -translate-y-1/2 transition-all duration-500"
							:style="{ width: `${remainingWidth}%` }"
						/>
					</div>

					<p
						class="font-kondolar text-h11 absolute bottom-0 left-0 -translate-x-[70%] translate-y-3 font-bold text-white"
					>
						ประกาศวันเลือกตั้ง
					</p>

					<img
						class="absolute top-1/2 left-0 w-[50px] -translate-x-full -translate-y-1/2"
						src="/assets/images/ect-icon.png"
						alt="Start"
					/>

					<img
						class="absolute top-1/2 -translate-x-1/2 -translate-y-1/2 transition-all duration-500"
						:style="{ left: `${progressPercentage}%` }"
						src="/assets/images/calendar.svg"
						alt="Current"
					/>

					<img
						class="absolute top-1/2 right-0 translate-x-[90%] -translate-y-1/2"
						src="/assets/images/score-box.svg"
						alt="Target"
					/>
				</div>
			</div>
			<div
				v-else
				class="flex flex-col items-center md:flex-row md:gap-3 md:py-8"
			>
				<p class="text-h8 text-bg font-bold">ออกไปกา</p>
				<div class="py-2 md:py-0">
					<img
						src="/assets/images/calendar-stacked.svg"
						alt="Calendar Stacked"
					/>
				</div>
				<p class="text-green-3 text-h6 font-bold">สู่อนาคตที่ดีกว่า</p>
			</div>

			<p class="text-bg mt-2 text-[15px]">
				ดู Timeline การเลือกตั้งทั้งหมดที่นี่
			</p>
		</div>
		<div
			class="overflow-hidden transition-[max-height] duration-800 ease-in-out"
			:class="showTimeline ? 'max-h-[1000px]' : 'max-h-0'"
		>
			<Timeline />
		</div>
		<div class="bg-bg flex w-full justify-center">
			<div
				@click="showTimeline = !showTimeline"
				class="flex h-[21px] w-[60px] cursor-pointer justify-center bg-[#333333]"
			>
				<img
					src="/assets/images/chevron-down.svg"
					alt="Chevron Down"
					class="-translate-y-0.5 transition-transform delay-300 duration-500 ease-in-out"
					:class="{ 'rotate-180': showTimeline }"
				/>
			</div>
		</div>

		<PocketbookSection />

		<!-- Extended Piece -->
		<div
			class="bg-green-3 flex flex-col items-center py-8 text-center md:py-16"
		>
			<HeadingGroup
				part="extended"
				title="Extended Piece"
				:subtitle="{
					before: 'ชิ้นงานเสริม เติมความฟิตก่อนไปเลือก',
				}"
			/>
			<p class="text-b6 mb-4 md:mb-6">{{ articleList.length }} บทความ</p>
			<div class="no-scrollbar w-full overflow-x-scroll">
				<div class="mx-auto flex w-max gap-2 px-4 py-2.5">
					<Card
						v-for="article in articleList"
						:data="article"
						:key="article.id"
					/>
				</div>
			</div>
		</div>

		<!-- ECT Side Story -->
		<div
			class="bg-purple-3 flex flex-col items-center py-8 text-center md:py-16"
		>
			<HeadingGroup
				part="ect"
				title="ECT Side Story"
				:subtitle="{
					before: 'เรื่องราวดี ๆ ที่อยาก',
					strike: 'ตะโกนนน',
					after: 'เล่าให้ กกต. ฟัง',
				}"
			/>
			<p class="text-b6 mb-4 md:mb-6">{{ articleList.length }} บทความ</p>
			<div class="no-scrollbar w-full overflow-x-scroll">
				<div class="mx-auto flex w-max gap-2 px-4 py-2.5">
					<Card
						v-for="article in articleList"
						:data="article"
						:key="article.id"
					/>
				</div>
			</div>
		</div>

		<!-- ผู้ผลักดันเบื้องหลังทุกไอเดีย -->
		<div
			class="flex flex-col items-center bg-[#D9D9D9] pt-[60px] pb-20 text-center md:pt-20 md:pb-[100px]"
		>
			<HeadingGroup
				part="team"
				title="ผู้ผลักดันเบื้องหลังทุกไอเดีย"
				:subtitle="{
					before: 'โปรเจกต์เหล่านี้จะเกิดขึ้นไม่ได้ หากขาดกลุ่มคนเหล่านี้',
				}"
			/>
			<div
				class="mt-[50px] flex w-60 flex-wrap justify-center gap-2.5 md:mt-[65px] md:w-[640px]"
			>
				<img
					class="w-[60px] md:w-20"
					src="/assets/images/partner-logo-conforall.png"
					alt="Logo"
				/>
				<img
					class="w-[60px] md:w-20"
					src="/assets/images/partner-logo-wewatch.png"
					alt="Logo"
				/>
				<img
					class="w-[60px] md:w-20"
					src="/assets/images/partner-logo-ilaw.png"
					alt="Logo"
				/>
				<img
					class="w-[60px] md:w-20"
					src="/assets/images/partner-logo-theactive.png"
					alt="Logo"
				/>
				<img
					class="w-[60px] md:w-20"
					src="/assets/images/partner-logo-commonmuze.png"
					alt="Logo"
				/>
			</div>
		</div>

		<!-- เกี่ยวกับ WeVis -->
		<div
			class="flex flex-col items-center bg-white px-4 pt-[60px] text-center md:pt-20"
		>
			<h3 class="text-h3 mb-10 font-bold md:mb-[65px]">เกี่ยวกับ WeVis</h3>
			<div class="b4 w-full md:w-[650px]">
				<p class="mb-5 md:mb-[30px]">
					WeVis เป็นกลุ่มเทคโนโลยีภาคประชาชนที่เชื่อว่าข้อมูลเปิดและเทคโนโลยี<br
						class="hidden md:block"
					/>
					สามารถทำให้พวกเรามีส่วนร่วมในการเมือง
					<span class="whitespace-nowrap">การเลือกตั้ง</span>
					และประชาธิปไตยได้<br class="hidden md:block" />
					พวกเราจึงรวมตัวกันขึ้นมาเพื่อทำโปรเจกต์เหล่านี้<br
						class="hidden md:block"
					/>
					หวังให้ผู้มีสิทธิเลือกตั้ง<span class="whitespace-nowrap">ทุกคน</span
					>และสื่อมวลชน สามารถค้นหาข้อมูล<span class="whitespace-nowrap"
						>ได้สะดวกขึ้น</span
					>
				</p>
				<p class="mb-3">
					ทางทีมมีความตั้งใจที่พัฒนาทุกโปรเจกต์ให้เป็น Open Source
					และเปิดข้อมูลเป็น Open Data ภายใต้ข้อตกลงในการใช้งาน
					<a
						href="https://wevis.info/terms-of-use/"
						target="_blank"
						rel="noopener noreferrer"
						class="underline"
						>(Terms of Use)</a
					>
					<br />
					หากมีข้อสงสัยต้องการสอบถามเพิ่มเติมประสงค์แจ้งเปลี่ยนแปลงหรือเพิ่มเติมข้อมูล<span
						class="whitespace-nowrap"
						>เพื่อความถูกต้อง</span
					>
					หรือมีข้อเสนอแนะใด ๆ สามารถติดต่อได้ที่ team@wevis.info
				</p>
			</div>
		</div>

		<div class="py-5 md:py-[50px]">
			<ElectionAboutActions />
		</div>

		<div class="pt-10 pb-[60px]">
			<ElectionSharer />
		</div>
		<ElectionFooter />
	</div>
</template>

<style scoped>
.no-scrollbar {
	-ms-overflow-style: none;
	scrollbar-width: none;
}
.no-scrollbar::-webkit-scrollbar {
	display: none;
}

.fade-leave-active {
	transition: opacity 1s ease;
}
.fade-leave-to {
	opacity: 0;
}
</style>
