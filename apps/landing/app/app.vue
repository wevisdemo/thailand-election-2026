<script setup>
import {
	ElectionNavbar,
	ElectionButton,
	ElectionSharer,
	ElectionFooter,
} from '@election/ui/vue';
import projects from '@election/constants/projects.json';
</script>

<template>
	<div class="flex flex-col">
		<ElectionNavbar />
		<h1 class="text-h1 font-sriracha text-center font-bold underline">
			Landing!
		</h1>

		<p>{{ projects }}</p>

		<ElectionButton class="typo-h9 font-kondolar self-center font-bold"
			>เริ่มเลอ</ElectionButton
		>
		<ElectionSharer />
		<ElectionFooter />
	</div>
</template>
