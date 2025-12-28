<template>
	<div class="z-2 flex w-90 flex-col gap-4 border-3 bg-white p-6">
		<div class="flex w-full flex-row justify-between">
			<div>
				<h3>ผลลงมติพรรค</h3>
				<h4>{{ billTitle }}</h4>
			</div>
			<img
				src="/img/icon-close.svg"
				@click="$emit('close')"
				class="self-start"
			/>
		</div>
		<div>
			<div class="flex w-full flex-row justify-between">
				<div>
					<img :src="partyLogo" class="w-6" />
					<h3>{{ partyName }}</h3>
				</div>
				<div class="flex gap-2">
					<p>{{ result }}</p>
					<p>99%</p>
				</div>
			</div>
			<!-- bar chart -->
			<div></div>

			<!-- bar chart text -->
			<div>
				<div class="flex justify-between">
					<p>ทั้งหมด</p>
					<p>{{ partyCount }} คน</p>
				</div>
				<div
					v-for="vote in votes"
					:key="vote.label"
					v-bind="vote"
					class="flex justify-between"
				>
					<div class="flex items-center gap-2">
						<svg
							width="16"
							height="16"
							viewBox="0 0 16 16"
							:fill="vote.color"
							xmlns="http://www.w3.org/2000/svg"
						>
							<circle cx="8" cy="8" r="8" :fill="vote.color" />
						</svg>

						<p>{{ vote.label }}</p>
					</div>
					<p>{{ vote.count }} คน</p>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup>
import { defineProps } from 'vue';

defineProps({
	billTitle: String,
	partyLogo: String,
	partyName: String,
	partyCount: Number,
	result: String,
	votes: Array,
});
</script>
