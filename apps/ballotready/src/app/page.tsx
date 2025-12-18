import {
	ElectionNavbar,
	ElectionButton,
	ElectionSharer,
	ElectionAboutActions,
	ElectionFooter,
} from '@election/ui/react';

export default function Intro() {
	return (
		<div className="flex flex-col gap-6">
			<ElectionNavbar />
			<h1 className="text-h1 font-sriracha text-center font-bold underline">
				Ballot Ready!
			</h1>

			<ElectionButton className="typo-h9 font-kondolar self-center font-bold">
				เริ่มเลอ
			</ElectionButton>
			<ElectionAboutActions dataUrl="#" />
			<ElectionSharer />
			<ElectionFooter />
		</div>
	);
}
