<script setup lang="ts">
import useEmblaCarousel from 'embla-carousel-vue';
import WheelGestures from 'embla-carousel-wheel-gestures';
import {
	Column,
	Object as SheetObject,
	Spreadsheet,
	asBoolean,
	asString,
	type StaticDecode,
} from 'sheethuahua';

const schema = SheetObject({
	date: Column('date', asString()),
	event: Column('event', asString()),
	urlText: Column('urlText', asString().optional()),
	url: Column('url', asString().optional()),
	hasUrl: Column('url_embedded', asBoolean()),
});

interface Card {
	id: number;
	date: string;
	month: string;
	endDate: string;
	title: string;
	url?: string;
	urlText?: string;
	hasUrl: boolean;
}

const thai_months = [
	'มกราคม',
	'กุมภาพันธ์',
	'มีนาคม',
	'เมษายน',
	'พฤษภาคม',
	'มิถุนายน',
	'กรกฎาคม',
	'สิงหาคม',
	'กันยายน',
	'ตุลาคม',
	'พฤศจิกายน',
	'ธันวาคม',
];

const getMonthIndex = (monthName: string): string => {
	const index = thai_months.indexOf(monthName);
	if (index === -1) return '01';
	return String(index + 1).padStart(2, '0');
};

const convertYearToAD = (beYear: string): number => {
	return parseInt(beYear) - 543;
};

const padDay = (day: string): string => {
	return day.padStart(2, '0');
};

const getEndDateAndMonth = (input: string) => {
	if (!input) return null;

	const text = input.trim();
	if (text.includes(' - ')) {
		const parts = text.split(' - ');

		const startPart = parts[0];
		const endPart = parts[1];

		if (!startPart || !endPart) {
			return null;
		}

		const startTokens = startPart.split(' ').filter(Boolean);
		const endTokens = endPart.split(' ').filter(Boolean);

		const day = endTokens[0];
		const monthStr = endTokens[1];
		const yearBe = endTokens[2];

		const startMonthStr = startTokens[1];
		const startYearBe = startTokens[2];

		if (!day || !monthStr || !yearBe || !startMonthStr || !startYearBe) {
			return null;
		}

		return {
			endDate: `${convertYearToAD(yearBe)}-${getMonthIndex(monthStr)}-${padDay(day)}`,
			month: `${startMonthStr} ${startYearBe} - ${monthStr} ${yearBe}`,
		};
	}

	const tokens = text.split(' ').filter(Boolean);

	const dateSegment = tokens[0];
	const monthStr = tokens[1];
	const yearBe = tokens[2];

	if (!dateSegment || !monthStr || !yearBe) {
		return null;
	}

	if (dateSegment.includes('-')) {
		const days = dateSegment.split('-');
		const endDay = days[1];

		if (!endDay) return null;

		return {
			endDate: `${convertYearToAD(yearBe)}-${getMonthIndex(monthStr)}-${padDay(endDay)}`,
			month: `${monthStr} ${yearBe}`,
		};
	}

	return {
		endDate: `${convertYearToAD(yearBe)}-${getMonthIndex(monthStr)}-${padDay(dateSegment)}`,
		month: `${monthStr} ${yearBe}`,
	};
};

const cards = ref<Card[]>([]);

const transformSheetData = (rawData: StaticDecode<typeof schema>[]) => {
	return rawData.map((row, index) => {
		const obj = getEndDateAndMonth(row.date);

		return {
			id: index + 1,
			date: row.date,
			month: obj?.month ?? 'รอประกาศ',
			endDate: obj?.endDate ?? '',
			title: row.event,
			url: row.url,
			urlText: row.urlText,
			hasUrl: row.hasUrl,
		};
	});
};

onMounted(async () => {
	const output = await Spreadsheet(
		'1RCSn6V-TsfYKAsU84lCKeETUMJ3Kj3HFqPQbROVPMmw',
	).get('Voter timeline', schema);
	const data = transformSheetData(output);

	cards.value = data;
});

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
	<div
		class="mx-auto w-full overflow-hidden bg-[#333333] pt-1 pb-4 md:pt-4 md:pb-10"
	>
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
								:class="`${[1, 2].includes(card.id) ? 'w-[125px] md:w-40' : 'w-fit'} text-h9 font-kondolar inline-block leading-[1.2] font-bold`"
							>
								{{ card.date }}
							</p>
						</div>
						<img
							src="/assets/images/rough-line.svg"
							class="w-full py-3 md:py-4"
							alt="Rough Line"
						/>
						<p
							:class="`text-h9 font-kondolar font-bold ${[1, 2].includes(card.id) ? 'w-[180px] md:w-60' : ''}`"
						>
							{{ card.title }}
						</p>
						<a
							v-if="card.hasUrl"
							:href="card.url"
							target="_blank"
							rel="noopener noreferrer"
							:class="card.urlText === 'รอประกาศ' && 'pointer-events-none'"
						>
							<div class="mt-2 flex items-center gap-1 md:mt-3">
								<p class="text-gray-2 text-b6 hover:text-gray-1">
									{{ card.urlText }}
								</p>
								<img
									src="/assets/images/external-icon.svg"
									alt="External Link Icon"
								/>
							</div>
						</a>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<style scoped></style>
