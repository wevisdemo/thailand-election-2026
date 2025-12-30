<template>
	<div
		class="section flex min-h-140 w-full flex-col items-center justify-between gap-6 rounded-2xl bg-white p-10 shadow-md"
	>
		<div class="flex h-full flex-col">
			<div class="flex flex-row">
				<h2>มติพรรคที่เลือก</h2>
				<img src="/img/icon-heart-ol.svg" class="inline h-6 w-6" />
				<h2>ใจตรงกับ</h2>
				<img src="/img/icon-heart-ol.svg" class="inline h-6 w-6" />
				<h2>คุณ</h2>
			</div>
			<div>
				<div class="flex flex-row items-center justify-center gap-2">
					<!-- heart with logo -->
					<div>
						<img :src="matchLogo" class="h-12 w-12" />
						<img src="/img/icon-heart-ol.svg" class="h-12 w-12" />
					</div>
					<!-- heart with percentage number -->
					<div>
						<p>{{ matchPercentage }}</p>
						<img src="/img/icon-heart-ol.svg" class="h-12 w-12" />
					</div>
				</div>
				<p>{{ matchMessage }}</p>
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
			type: String,
		},
		matchLogo: {
			type: String,
		},
	},
};
</script>
