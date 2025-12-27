<template>
	<div class="section flex w-full flex-col gap-4 py-4">
		<div>
			<p class="font-sriracha text-b2 text-center">It's a match</p>
			<p class="text-b6 text-center">เพราะพรรคนี้ ไม่เข้าประชุมเกินครึ่ง</p>
		</div>
		<div class="flex justify-between px-20">
			<div class="flex flex-col items-center">
				<div class="flex items-center">
					<img src="/assets/images/profile-pic.svg" class="h-8" />
					<img src="/assets/images/profile-pic.svg" class="h-8" />
				</div>
				<button class="bg-gray-3 w-20 rounded-full">
					<img src="/assets/images/choice-abstain.svg" class="h-20" />
				</button>
				<span class="mt-2">งดออกเสียง</span>
				<img src="/assets/images/icon-info.svg" class="h-6" />
			</div>
			<div class="flex flex-col items-center">
				<div class="flex items-center">
					<img src="/assets/images/profile-pic.svg" class="h-8" />
					<img src="/assets/images/profile-pic.svg" class="h-8" />
				</div>
				<button class="bg-green-2 w-20 rounded-full">
					<img src="/assets/images/choice-agree.svg" class="h-20" />
				</button>
				<span class="mt-2">เห็นด้วย</span>
			</div>
			<div class="flex flex-col items-center">
				<div class="flex items-center">
					<img src="/assets/images/profile-pic.svg" class="h-8" />
					<img src="/assets/images/profile-pic.svg" class="h-8" />
				</div>
				<button class="w-20 rounded-full" style="background-color: var(--red)">
					<img src="/assets/images/choice-disagree.svg" class="h-20" />
				</button>
				<span class="mt-2">ไม่เห็นด้วย</span>
			</div>
		</div>
	</div>
</template>
