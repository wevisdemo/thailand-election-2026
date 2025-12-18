<script setup lang="ts">
import useEmblaCarousel from 'embla-carousel-vue';
import WheelGestures from 'embla-carousel-wheel-gestures';

interface Card {
	id: number;
	date: string;
	month: string;
	endDate: string;
	title: string;
	url?: string;
}

const cards = ref<Card[]>([
	{
		id: 0,
		date: '17 ธันวาคม 2568',
		month: 'ธันวาคม 2568',
		endDate: '2025-12-17',
		title: 'xxxxxxx xxxxxxx xxxxxxx xxxxxxx xxxxxxx',
	},
	{
		id: 1,
		date: '20 ธันวาคม 2568 - 5 มกราคม 2569',
		month: 'ธันวาคม 2568 - มกราคม 2569',
		endDate: '2026-01-05',
		title: 'ลงทะเบียนใช้สิทธิเลือกตั้งล่วงหน้าในเขต-นอกเขต-นอกราชอาณาจักร',
		url: '/',
	},
	{
		id: 2,
		date: 'TBA',
		month: 'TBA',
		endDate: '',
		title: 'ลงทะเบียนใช้สิทธิลงเสียงประชามตินอกเขต-นอกราชอาณาจักร',
		url: '/',
	},
	{
		id: 3,
		date: '1 กุมภาพันธ์ 2569',
		month: 'กุมภาพันธ์ 2569',
		endDate: '2026-02-01',
		title: 'วันเลือกตั้งล่วงหน้า ในเขตและนอกเขต',
	},
	{
		id: 4,
		date: '1-15 กุมภาพันธ์ 2569',
		month: 'กุมภาพันธ์ 2569',
		endDate: '2026-02-01',
		title: 'แจ้งเหตุไม่อาจใช้สิทธิเลือกตั้ง',
		url: '/',
	},
	{
		id: 5,
		date: '8 กุมภาพันธ์ 2569',
		month: 'กุมภาพันธ์ 2569',
		endDate: '2026-02-08',
		title: 'วันเลือกตั้งทั่วไป',
	},
]);

const selectedIndex = ref(0);

const [emblaRef, emblaApi] = useEmblaCarousel(
	{
		align: 'center',
		containScroll: false,
		dragFree: false,
	},
	[WheelGestures()],
);

const onSelect = () => {
	if (!emblaApi.value) return;
	selectedIndex.value = emblaApi.value.selectedScrollSnap();
};

onMounted(() => {
	if (emblaApi.value) {
		const firstActiveIndex = cards.value.findIndex(
			(card) => !isExpired(card.endDate),
		);

		if (firstActiveIndex !== -1) {
			emblaApi.value.scrollTo(firstActiveIndex, true);
			selectedIndex.value = firstActiveIndex;
		}

		emblaApi.value.on('select', onSelect);
		emblaApi.value.on('reInit', onSelect);
	}
});

const currentMonth = computed(() => {
	return cards.value[selectedIndex.value]?.month || '';
});

const isExpired = (endDateString: string) => {
	if (!endDateString) return false;

	const today = new Date();
	today.setHours(0, 0, 0, 0);

	const endDate = new Date(endDateString);
	endDate.setHours(0, 0, 0, 0);

	return today > endDate;
};
</script>

<template>
	<div class="mx-auto w-full overflow-hidden bg-[#333333] pt-4 pb-10">
		<div
			class="mx-auto mb-2.5 flex w-full items-center justify-center md:w-[730px]"
		>
			<div class="h-px flex-1 bg-white" />
			<p class="text-h8 font-kondolar px-5 font-bold text-white">
				{{ currentMonth }}
			</p>
			<div class="h-px flex-1 bg-white" />
		</div>
		<div
			ref="emblaRef"
			class="cursor-grab overflow-hidden active:cursor-grabbing"
		>
			<div class="flex gap-3">
				<div v-for="card in cards" :key="card.id" class="flex-none select-none">
					<div
						:class="`${isExpired(card.endDate) ? 'opacity-40' : 'opacity-100'} bg-bg flex w-60 flex-col items-center rounded-2xl border-2 p-[18px] text-center md:w-[316px]`"
					>
						<div class="flex items-start gap-1.5 md:gap-2">
							<div class="w-5 flex-none -translate-y-0.5 md:w-6">
								<img src="/assets/images/calendar-icon.svg" alt="" />
							</div>
							<p
								:class="`${card.id === 1 ? 'w-[125px] md:w-40' : 'w-fit'} text-h9 font-kondolar inline-block leading-[1.2] font-bold`"
							>
								{{ card.date }}
							</p>
						</div>
						<img
							src="/assets/images/rough-line.svg"
							class="w-full py-3 md:py-4"
							alt="Rough Line"
						/>
						<p class="text-h9 font-kondolar font-bold">
							{{ card.title }}
						</p>
						<a
							v-if="card.url"
							:href="card.url"
							target="_blank"
							rel="noopener noreferrer"
						>
							<div class="mt-3 flex items-center gap-1">
								<p class="text-gray-2 text-sm">ลงทะเบียนใช้สิทธิที่นี่</p>
								<img src="/assets/images/external-icon.svg" alt="" />
							</div>
						</a>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<style scoped></style>
