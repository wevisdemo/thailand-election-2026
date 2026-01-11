<script setup lang="ts">
import projectsData from '@election/constants/projects.json';
import projectCover1 from '~/assets/animations/project-cover-1.json';
import projectCover2 from '~/assets/animations/project-cover-2.json';
import projectCover3 from '~/assets/animations/project-cover-3.json';
import projectCover4 from '~/assets/animations/project-cover-4.json';
import projectCover5 from '~/assets/animations/project-cover-5.json';
import projectCover6 from '~/assets/animations/project-cover-6.json';
import projectCover7 from '~/assets/animations/project-cover-7.json';

type TabKey = 'all' | 'prepare' | 'review';

interface TabItem {
	key: TabKey;
	label: string;
}

interface FeatureCard {
	id: number;
	name: {
		th: string;
		en: string;
	};
	description: string;
	theme: string;
	url: string;
	willLaunchedOn?: string;
	isLaunched?: boolean;
	isExternal?: boolean;
}

const projects = projectsData.map((p, index) => {
	return { ...p, id: index + 1 };
}) as FeatureCard[];

const tabs: TabItem[] = [
	{ key: 'all', label: 'ดูทั้งหมด' },
	{ key: 'prepare', label: 'เตรียมตัวเลือกตั้ง' },
	{ key: 'review', label: 'ทวนความจำ' },
];

const activeTab = ref<TabKey>('all');

const setActive = (key: TabKey) => {
	activeTab.value = key;
};

const isProjectLaunched = (dateString?: string) => {
	if (!dateString) return true;

	const today = new Date();
	const launchDate = new Date(dateString);

	today.setHours(0, 0, 0, 0);
	launchDate.setHours(0, 0, 0, 0);

	return today >= launchDate;
};

const filteredProjects = computed(() => {
	let result = projects;
	if (activeTab.value !== 'all') {
		result = result.filter((p) => {
			if (activeTab.value === 'prepare')
				return p.theme === 'เตรียมตัวเลือกตั้ง';
			if (activeTab.value === 'review') return p.theme === 'ทวนความจำ';
			return false;
		});
	}
	return result.map((p) => ({
		...p,
		isLaunched: isProjectLaunched(p.willLaunchedOn),
		isExternal: p.url.startsWith('http'),
	}));
});

const formatDate = (dateString: string) => {
	if (!dateString) return '';

	const [year, month, day] = dateString.split('-');
	if (!year || !month || !day) {
		return dateString;
	}

	const thaiYear = parseInt(year) + 543;
	return `${day}/${month}/${thaiYear}`;
};

const animationMap: Record<number, any> = {
	1: projectCover1,
	2: projectCover2,
	3: projectCover3,
	4: projectCover4,
	5: projectCover5,
	6: projectCover6,
	7: projectCover7,
};

const getAnimation = (id: number) => {
	return animationMap[id];
};
</script>

<template>
	<div class="bg-bg flex flex-col items-center py-8 text-center md:py-16">
		<h4 class="text-h4 font-kondolar font-bold">Election Pocketbook</h4>
		<p class="text-b4">
			สมุดพกการเมืองไทย <br class="md:hidden" />
			ตัวช่วยตัดสินใจก่อนเข้าคูหา
		</p>

		<div class="mt-4 mb-4 flex flex-col items-center gap-2 md:mt-8 md:flex-row">
			<button
				v-for="tab in tabs"
				:key="tab.key"
				:class="`w-fit transition-all duration-300 ${tab.key === activeTab ? 'text-green-2 border-black bg-black' : 'hover:bg-purple-2 hover:border-purple-2 border-gray-2 bg-white'} text-h9 font-kondolar cursor-pointer rounded-full border-2 px-8 py-2 font-bold`"
				@click="setActive(tab.key)"
			>
				{{ tab.label }}
			</button>
		</div>

		<Transition name="fade" mode="out-in">
			<div
				:key="activeTab"
				class="flex max-w-7xl flex-wrap justify-center gap-2"
			>
				<div
					v-for="project in filteredProjects"
					:key="project.url"
					:class="`rounded-2xl bg-black px-3 pt-5 pb-[50px] transition-all duration-300 ease-in-out ${!project.willLaunchedOn ? 'cursor-pointer hover:shadow-[6px_6px_4px_0px_rgba(0,0,0,0.4)]' : 'cursor-not-allowed'}`"
				>
					<a
						:href="project.isLaunched ? project.url : undefined"
						target="_blank"
						rel="noopener noreferrer"
					>
						<div
							:class="`flex h-full w-[265px] flex-col ${project.isLaunched ? 'bg-white text-black' : 'bg-gray-1 text-white'} p-2 text-left`"
						>
							<ClientOnly>
								<div v-if="project.isLaunched" class="lottie-container">
									<Vue3Lottie
										:animationData="getAnimation(project.id)"
										:loop="true"
										:autoplay="true"
									/>
								</div>

								<img
									v-else
									src="/images/project-cover.png"
									alt="Project Cover"
									class="h-[140px]"
								/>
							</ClientOnly>

							<img src="/assets/images/rough-line.svg" class="py-4" alt="" />
							<p
								class="text-h10 font-kondolar h-[50px] font-bold text-pretty md:h-[75px]"
							>
								{{ project.name.th }}
							</p>
							<div
								v-if="project.isLaunched"
								class="flex flex-1 flex-col justify-between"
							>
								<div>
									<div class="mb-2 flex items-center gap-1">
										<p class="text-h10 text-green-1 font-kondolar font-bold">
											{{ project.name.en }}
										</p>
										<img
											v-if="project.isExternal"
											class="w-5 -translate-y-0.5 md:w-6"
											src="/assets/images/external-icon.svg"
											alt="External Link Icon"
										/>
									</div>
									<p class="text-b7 mb-2 flex-1">
										{{ project.description }}
									</p>
									<p v-if="project.isLaunched" class="text-orange"></p>
								</div>
								<p class="text-b7 text-gray-2">
									{{ project.theme }}
								</p>
							</div>
							<div
								v-if="!project.isLaunched && project.willLaunchedOn"
								class="pt-2"
							>
								<p class="text-b6">
									เนื้อหาจะมาในวันที่ {{ formatDate(project.willLaunchedOn) }}
								</p>
							</div>
						</div>
					</a>

					<div
						v-if="project.name.en === 'ConforAll'"
						class="flex items-baseline justify-center gap-1.5"
					>
						<span class="text-h11 font-kondolar text-gray-2 z-10 pt-2 font-bold"
							>WeVis</span
						>
						<img src="/assets/images/green-x-icon.svg" alt="" />
						<span class="text-h11 font-kondolar text-gray-2 z-10 pt-2 font-bold"
							>ConforAll</span
						>
					</div>
					<p
						v-else
						class="text-h11 font-kondolar text-gray-2 z-10 pt-2 font-bold"
					>
						WeVis
					</p>
				</div>
			</div>
		</Transition>
	</div>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
	transition:
		opacity 0.3s ease,
		transform 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
	opacity: 0;
	transform: translateY(2px);
}
</style>
