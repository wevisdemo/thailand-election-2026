'use client';
import { ElectoralDistrict } from '@/src/type/electoral_district';
import { ElectionNavbar } from '@election/ui/react';
import ElectorateCard from '../../component/shared/ElectorateCard';
import BallotRemind from '../../component/Electorate/BallotRemind';
import PartyListSection from '../../component/Electorate/PartyListSection';
import { Candidate } from '@/src/type/candidate';
import { Party } from '@/src/type/party';
import {
	ElectorateStoreContext,
	ElectorateStoreProvider,
} from '../../store/ElectorateStore';
import { useContext } from 'react';
import ModalPartyList from '../../component/Electorate/ModalPartyList';
import districtCandidateMap from '../../data/district_candidates.json' with { type: 'json' };
import rawParties from '../../data/parties.json' with { type: 'json' };

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
	if (!props.electoralDistrict) return <></>;
	return (
		<>
			<div className="flex flex-col">
				<ElectionNavbar />
				<div className="flex flex-col gap-[16px] px-[16px] py-[16px] md:px-[32px]">
					<button className="flex items-center gap-[4px] hover:cursor-pointer">
						<img
							className="w-[40px]"
							src="/ballotready/left-arrow.svg"
							alt="left-arrow"
						/>
						<p className="text-[14px] font-bold">กลับไปหน้าแรก</p>
					</button>
					<div className="m-auto grid max-w-[600px] justify-center gap-[16px]">
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
		</>
	);
};
