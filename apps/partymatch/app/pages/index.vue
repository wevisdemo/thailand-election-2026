<script setup>
import {
	ElectionNavbar,
	ElectionButton,
	ElectionSharer,
	ElectionAboutActions,
	ElectionFooter,
} from '@election/ui/vue';
import lottie from 'lottie-web';

const selectedParty = ref(null);
const lottieContainer = ref(null);

const handlePartySelected = (party) => {
	selectedParty.value = party;
};
onMounted(() => {
	lottie.loadAnimation({
		container: lottieContainer.value,
		renderer: 'svg',
		loop: true,
		autoplay: true,
		path: '/assets/lotties/loading.json',
	});
});
</script>

<template>
	<div class="bg-bg flex flex-col gap-10">
		<ElectionNavbar />
		<div class="section flex flex-col gap-8">
			<h1 class="text-h4 font-kondolar text-center font-bold">
				Party <span class="font-sriracha text-green-1">Match</span> or Red Flag
				Alert?
			</h1>
			<img src="/assets/images/hero-img.svg" alt="Illustration" />
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
				<a href="/partymatch/about" class="underline">อ่านเพิ่มเติม</a>
			</p>
		</div>

		<!-- Selection -->
		<section class="section flex flex-col gap-8 text-center">
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
				<PartyDropdown @update:selected="handlePartySelected" />

				<ElectionButton
					class="typo-h9 font-kondolar self-center font-bold whitespace-nowrap"
					>ยังไม่แน่ใจ</ElectionButton
				>
			</div>
			<PartyCard
				v-if="selectedParty"
				:selected-party="selectedParty"
				class="self-center"
			/>
			<div
				v-else
				class="flex w-full flex-row justify-center rounded-2xl bg-white p-10 shadow-md"
			>
				<div ref="lottieContainer" style="width: 400px; height: 400px"></div>
			</div>
		</section>

		<!-- Footer -->
		<div class="flex flex-col gap-6">
			<ElectionAboutActions
				dataUrl="https://docs.google.com/spreadsheets/d/1cg85RsWVrSTDgRsVMTsmbkABbDk8Y84kIU_SsRl_smQ/edit?usp=sharing"
			/>
			<ElectionSharer />
			<ElectionButton
				class="typo-h9 font-kondolar self-center font-bold"
				href="/partymatch/about"
				>เกี่ยวกับโครงการ</ElectionButton
			>
			<ElectionFooter />
		</div>
	</div>
</template>
