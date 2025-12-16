<script setup>
import {
	ElectionNavbar,
	ElectionSharer,
	ElectionFooter,
} from '@election/ui/vue';
import projects from '@election/constants/projects.json';
</script>

<template>
	<div class="flex flex-col">
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
			<div class="flex flex-col items-center md:flex-row md:gap-0">
				<p class="text-h8 text-bg font-bold">นับถอยหลัง</p>
				<div class="flex py-2 md:py-0">
					<div class="relative z-10 translate-x-2.5 -translate-y-1">
						<p
							class="font-ibmplex absolute left-[55%] -translate-x-1/2 translate-y-[-4%] text-[40px] font-bold"
						>
							6
						</p>
						<img src="/assets/images/purple-paper.svg" alt="" />
					</div>
					<div class="relative -translate-x-2.5 translate-y-1">
						<p
							class="font-ibmplex absolute left-1/2 -translate-x-1/3 translate-y-[-2%] text-[40px] font-bold"
						>
							8
						</p>
						<img src="/assets/images/green-paper.svg" alt="" />
					</div>
				</div>
				<p class="text-h8 text-bg mr-2 font-bold">วัน</p>
				<p class="text-green-3 text-h6 font-bold">สู่วันเลือกตั้ง</p>
			</div>
			<div
				class="relative hidden w-full max-w-[600px] pt-9 pb-11 md:block lg:max-w-[1050px]"
			>
				<div class="bg-bg relative flex h-0.5 w-full">
					<div
						class="bg-green-3 absolute top-1/2 left-[30%] h-1 w-[calc(100%-30%)] -translate-y-1/2"
					/>
				</div>
				<img
					class="absolute top-1/2 left-0 w-[50px] -translate-x-1/2 -translate-y-1/2"
					src="/assets/images/ect-icon.png"
					alt=""
				/>
				<img
					class="absolute top-1/2 left-[30%] -translate-x-1/2 -translate-y-1/2"
					src="/assets/images/calendar.svg"
					alt=""
				/>
				<img
					class="absolute top-1/2 right-0 translate-x-1/2 -translate-y-1/2"
					src="/assets/images/score-box.svg"
					alt=""
				/>
			</div>

			<p class="text-bg mt-2 text-[15px]">
				ดู Timeline การเลือกตั้งทั้งหมดที่นี่
			</p>
		</div>
		<div class="pt-10 pb-[60px]">
			<ElectionSharer />
		</div>
		<ElectionFooter />
	</div>
</template>
