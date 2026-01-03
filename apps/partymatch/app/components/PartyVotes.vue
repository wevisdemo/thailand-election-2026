<template>
	<div
		class="right-0 bottom-0 z-2 flex min-h-full w-90 flex-col gap-6 rounded-t-2xl border-3 border-b-0 bg-white p-6"
	>
		<div class="flex w-full flex-row justify-between">
			<div class="text-h11 font-kondolar font-bold">
				<h3 class="underline">ผลลงมติพรรค</h3>
				<h4>{{ billTitle }}</h4>
			</div>
			<img
				src="/img/icon-close.svg"
				@click="$emit('close')"
				class="cursor-pointer self-start"
			/>
		</div>
		<div class="flex flex-col gap-6">
			<div class="flex w-full flex-row justify-between">
				<div class="flex gap-2">
					<img :src="partyLogo" class="h-6 w-6" />
					<h3>{{ partyName }}</h3>
				</div>
				<div class="flex gap-2">
					<p>{{ result }}</p>
					<p class="text-h12 font-kondolar font-bold">{{ resultPct }}%</p>
				</div>
			</div>
			<!-- bar chart -->
			<div class="flex h-6 w-full shadow">
				<div
					v-for="vote in votes"
					:key="vote.label"
					:style="{
						width: `${(vote.count / partyCount) * 100}%`,
						backgroundColor: vote.color,
						border: vote.border || 'none',
					}"
					class="h-full"
				></div>
			</div>

			<!-- bar chart text -->
			<div class="flex flex-col gap-1">
				<div class="flex justify-between font-bold">
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
							xmlns="http://www.w3.org/2000/svg"
						>
							<circle
								cx="8"
								cy="8"
								r="7"
								:fill="vote.color"
								:stroke="vote.label === 'ลา/ขาด' ? 'gray' : 'none'"
								:stroke-width="vote.label === 'ลา/ขาด' ? 1 : 0"
							/>
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
	resultPct: Number,
	votes: Array,
});
</script>
