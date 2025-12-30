<template>
	<div
		class="section flex min-h-140 w-full flex-col items-center justify-between gap-6 rounded-2xl bg-white p-10 shadow-md"
	>
		<div class="flex h-full flex-col gap-4">
			<div class="flex flex-row">
				<h2>มติพรรคที่เลือก</h2>
				<img src="/img/icon-heart-ol.svg" class="inline h-6 w-6" />
				<h2>ใจตรงกับ</h2>
				<img src="/img/icon-heart-ol.svg" class="inline h-6 w-6" />
				<h2>คุณ</h2>
			</div>
			<div>
				<div class="flex flex-row items-center justify-center">
					<div class="relative">
						<img
							:src="matchLogo"
							class="absolute top-1/2 left-1/2 h-12 w-12 -translate-x-1/2 -translate-y-1/2 transform"
						/>
						<img src="/img/heart-party.svg" class="h-18 w-18" />
					</div>
					<div class="relative">
						<p
							class="text-h6 font-kondolar absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 transform font-black"
						>
							{{ matchPercentage }}%
						</p>
						<img src="/img/heart-match.svg" class="h-18 w-18" />
					</div>
				</div>
				<p class="font-sriracha text-center">{{ matchMessage }}เริ่ดเลยล่ะ</p>
			</div>

			<!-- <ScoreItem> for selected party -->

			<h3 class="font-bold">พรรคอื่นที่คะแนนตรงกับคุณ</h3>
			<!-- v-for <ScoreItem> other parties top 3 highest score -->
		</div>

		<div class="flex flex-col items-center gap-2">
			<p class="underline">election69.wevis.info/partymatch</p>
			<img src="/img/wv-election69-logo.svg" class="inline h-6" />
		</div>
	</div>
</template>

<script>
export default {
	props: {
		matchMessage: {
			type: String,
		},
		matchPercentage: {
			type: Number,
		},
		matchLogo: {
			type: String,
		},
	},
};
</script>
