<script setup>
import {
	ElectionNavbar,
	ElectionButton,
	ElectionSharer,
	ElectionAboutActions,
	ElectionFooter,
} from '@election/ui/vue';
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
				<button
					@click="toggleDropdown"
					class="button-dropdown typo-h9 font-kondolar flex w-full flex-row font-bold"
				>
					เลือกพรรค
					<img src="/assets/images/icon-chevron-down.svg" />
				</button>
				<ElectionButton
					class="typo-h9 font-kondolar self-center font-bold whitespace-nowrap"
					>ยังไม่แน่ใจ</ElectionButton
				>
			</div>
			<div class="flex flex-row self-center">
				<img src="/assets/images/hero-img.svg" />
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

<style scoped>
.button-dropdown {
	max-height: 48px;
	border: black 2px solid;
	border-radius: 100px;
	align-items: center;
	justify-content: space-between;
	padding: 0 0.8rem 0 1.5rem;
	background-color: var(--color-white);
}
</style>
