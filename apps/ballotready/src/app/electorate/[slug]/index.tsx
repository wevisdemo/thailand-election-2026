'use client';
import { ElectoralDistrict } from '@/src/type/electoral_district';
import {
	ElectionFooter,
	ElectionNavbar,
	ElectionSharer,
} from '@election/ui/react';
import ElectorateCard from '../../component/shared/ElectorateCard';
import BallotRemind from '../../component/Electorate/BallotRemind';
import PartyListSection from '../../component/Electorate/PartyListSection';
import { Candidate } from '@/src/type/candidate';
import { Party } from '@/src/type/party';
import {
	ElectorateStoreContext,
	ElectorateStoreProvider,
} from '../../store/ElectorateStore';
import { useContext, useEffect, useState } from 'react';
import ModalPartyList from '../../component/Electorate/ModalPartyList';

interface ElectorateTemplateProps {
	candidates: Candidate[];
	parties: Party[];
	electoralDistrict: ElectoralDistrict | undefined;
}

export default function ElectorateTemplate(props: ElectorateTemplateProps) {
	if (!props.electoralDistrict) return null;
	return (
		<ElectorateStoreProvider>
			<PageTemplate {...props} />
		</ElectorateStoreProvider>
	);
}

const PageTemplate = (props: ElectorateTemplateProps): React.ReactElement => {
	const { modalPartyList } = useContext(ElectorateStoreContext);
	const [showJump, setShowJump] = useState(false);

	useEffect(() => {
		const px = window.innerWidth > 320 ? 48 : 24;
		const onScroll = () => {
			setShowJump(window.scrollY > px);
		};

		window.addEventListener('scroll', onScroll, { passive: true });
		return () => window.removeEventListener('scroll', onScroll);
	}, []);

	function scrollToTop() {
		window.scrollTo({
			top: 0,
			behavior: 'smooth',
		});
	}

	if (!props.electoralDistrict) return <></>;
	return (
		<>
			<div className="flex flex-col">
				{showJump && (
					<div
						onClick={() => scrollToTop()}
						className="fixed bottom-[24px] left-[50%] z-50 flex h-[48px] w-[48px] items-center justify-center rounded-[100%] bg-[#D9D9D9] hover:cursor-pointer md:bottom-[48px]"
					>
						<img
							className="w-[25px] rotate-270"
							src="/ballotready/right-arrow.svg"
							alt="right-arrow"
						/>
					</div>
				)}

				<ElectionNavbar />
				<div className="flex flex-col gap-[16px] px-[16px] py-[16px] md:px-[32px]">
					<a
						href="/ballotready"
						className="flex items-center gap-[4px] hover:cursor-pointer"
					>
						<img
							className="w-[40px]"
							src="/ballotready/left-arrow.svg"
							alt="left-arrow"
						/>
						<p className="text-[14px] font-bold">กลับไปหน้าแรก</p>
					</a>
					<div className="m-auto flex w-full max-w-[600px] flex-col justify-center gap-[16px]">
						<ElectorateCard electoralDistrict={props.electoralDistrict} />
						<BallotRemind />
						<PartyListSection
							candidates={props.candidates}
							parties={props.parties}
						/>
					</div>
				</div>
			</div>
			<ModalPartyList
				isOpen={modalPartyList.state.isModalOpen}
				onClose={() => modalPartyList.dispatch({ type: 'CLOSE_MODAL' })}
				party={modalPartyList.state.party}
			/>
			<ElectionSharer className="py-[40px]" />
			<ElectionFooter />
		</>
	);
};
