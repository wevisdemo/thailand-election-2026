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
    <div class="flex flex-col h-full relative">
    <!-- Progress bar -->
        <div class="section w-full py-8">
            <div class="bg-green-2 w-full h-1 rounded"></div>
        </div>

        <!-- Question -->
        <div class="section flex flex-row">
            <img src="/assets/images/card-side.png" class="py-4 transform scale-x-[-1]"/>
            <div class="text-center bg-white p-6 rounded-2xl shadow-md h-80 flex flex-col gap-4">
                <h2 class="text-h8 font-kondolar font-bold">{{ currentQuestion.title }}</h2>
                <p v-if="currentQuestion.title_full">ชื่อเต็ม: {{ currentQuestion.title_full }}</p>
                <h3 class="font-bold" v-if="currentQuestion.description">รายละเอียด</h3>
                <p v-if="currentQuestion.description">{{ currentQuestion.description }}</p>
            </div>
            <img src="/assets/images/card-side.png" class="py-4"/>
        </div>

        <!-- Quiz Choices -->

        <!-- Quiz Navigation -->
        
            <button
            v-if="currentQuestionIndex > 0"
            class="p-6 font-kondolar cursor-pointer flex flex-row items-center gap-2 mb-0 mt-auto absolute bottom-0 left-0"
            @click="currentQuestionIndex--">
                <img src="/assets/images/arrow-left.svg" class="h-8" />
                กลับ
            </button>
            <button
            v-if="currentQuestionIndex < questions.length - 1"
            class="p-6 font-kondolar cursor-pointer flex flex-row items-center gap-2 mb-0 mt-auto absolute bottom-0 right-0"
            @click="currentQuestionIndex++">
                ไปต่อ
                <img src="/assets/images/arrow-right.svg" class="h-8"/>
            </button>
            <button
            v-else-if="currentQuestionIndex === questions.length - 1"
            class="p-6 font-kondolar font-bold cursor-pointer flex flex-row items-center gap-2 mb-0 mt-auto absolute bottom-0 right-0"
            @click="currentQuestionIndex++"> 
                ดูผลลัพธ์
                <img src="/assets/images/icon-heart-ol.svg" class="h-8"/>
            </button>
        
    </div>
</template>