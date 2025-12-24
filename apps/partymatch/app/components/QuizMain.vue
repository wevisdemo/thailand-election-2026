<script setup>
    const questions = ref([]);
    const currentQuestionIndex = ref(0);

    const currentQuestion = computed(() => {
      return questions.value[currentQuestionIndex.value] || {};
    });

    onMounted(async () => {
	const { Column, asString, Spreadsheet, Object } = await import('sheethuahua');

	const data = await Spreadsheet(
		'1cg85RsWVrSTDgRsVMTsmbkABbDk8Y84kIU_SsRl_smQ',
	).get(
		'bill',
		Object({
			id: Column('id', asString()),
			title: Column('title', asString()),
			title_full: Column('title_full', asString()),
			description: Column('desc', asString()),
		}),
	);
    questions.value = data;
    });    
</script>

<template>
    <!-- Progress bar -->
     <div class="section w-full py-8">
        <div class="bg-green-1 w-full h-2 rounded"></div>
     </div>

    <!-- Question -->
     <div class="section text-center bg-white p-10 rounded-2xl shadow-md">
        <h2 class="text-h8 font-kondolar font-bold">{{ currentQuestion.title }}</h2>
        <p v-if="currentQuestion.title_full">ชื่อเต็ม: {{ currentQuestion.title_full }}</p>
        <h3 class="font-bold" v-if="currentQuestion.description">รายละเอียด</h3>
        <p v-if="currentQuestion.description">{{ currentQuestion.description }}</p>
     </div>

    <!-- Quiz Choices -->

    <!-- Quiz Navigation -->
        <div class="flex justify-between">
          <button
        class="mt-6 px-6 py-3 font-kondolar cursor-pointer flex flex-row items-center gap-2"
        @click="currentQuestionIndex--">
        <img src="/assets/images/arrow-left.svg" class="h-8" />กลับ</button>
     <button
        class="mt-6 px-6 py-3 font-kondolar cursor-pointer flex flex-row items-center gap-2 "
        @click="currentQuestionIndex++">ไปต่อ
        <img src="/assets/images/arrow-right.svg"class="h-8"/></button>
        </div>
</template>