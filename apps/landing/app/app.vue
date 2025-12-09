<script setup>
import {
	ElectionNavbar,
	ElectionButton,
	ElectionSharer,
	ElectionAboutActions,
	ElectionFooter,
} from '@election/ui/vue';
import projects from '@election/constants/projects.json';
</script>

<template>
	<div class="flex flex-col gap-6">
		<ElectionNavbar />
		<h1 class="text-h1 font-sriracha text-center font-bold underline">
			Landing!
		</h1>

		<p>{{ projects }}</p>

		<ElectionButton class="typo-h9 font-kondolar self-center font-bold"
			>เริ่มเลอ</ElectionButton
		>
		<ElectionAboutActions dataUrl="#" />
		<ElectionSharer />
		<ElectionFooter />
	</div>
</template>
