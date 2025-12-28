<script setup>
import { ElectionButton } from '@election/ui/vue';

const emit = defineEmits(['reset']);
const resetQuiz = () => {
	emit('reset');
};
</script>

<template>
	<div class="bg-green-3 relative flex h-full flex-col">
		<ElectionButton @click="resetQuiz">เล่นใหม่</ElectionButton>
	</div>
</template>
