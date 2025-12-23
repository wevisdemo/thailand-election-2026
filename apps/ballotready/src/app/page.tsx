import {
	ElectionNavbar,
	ElectionButton,
	ElectionSharer,
	ElectionAboutActions,
	ElectionFooter,
} from '@election/ui/react';
import IntroSection from './component/home/IntroSection';
import SearchSection from './component/home/SearchSection';
import HowToVoteSection from './component/home/HowToVoteSection';
import BallotStepSection from './component/home/BallotStepSection';

export default function Intro() {
	return (
		<div className="flex flex-col">
			<ElectionNavbar />
			<IntroSection />
			<SearchSection />
			<HowToVoteSection />
			<BallotStepSection />
			<div className="flex flex-col items-center gap-[10px] px-[16px] py-[32px]">
				<ElectionSharer />
				<ElectionButton className="typo-h9 font-kondolar self-center font-bold">
					เกี่ยวกับโครงการ
				</ElectionButton>
			</div>
			<ElectionFooter />
		</div>
	);
}
