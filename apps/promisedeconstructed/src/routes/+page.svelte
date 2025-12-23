<script lang="ts">
	import {
		ElectionNavbar,
		ElectionButton,
		ElectionSharer,
		ElectionAboutActions,
		ElectionFooter,
	} from '@election/ui/svelte';
</script>

<div class="flex flex-col gap-6">
	<ElectionNavbar />
	<h1 class="text-h1 font-sriracha text-center font-bold underline">
		Promise Deconstructed
	</h1>

	<div class="self-center">
		<ElectionButton twClass="typo-h9 font-kondolar font-bold">
			เริ่มเลอ
		</ElectionButton>
	</div>
	<ElectionAboutActions dataUrl="#" />
	<ElectionSharer />
	<ElectionFooter />
</div>
