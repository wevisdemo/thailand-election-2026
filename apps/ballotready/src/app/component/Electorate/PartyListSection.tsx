'use client';
import { useState } from 'react';
import AutoComplete from '../shared/Autocomplete';
import SearchInput from '../shared/SearchInput';
import { Candidate } from '@/src/type/candidate';
import IndividualList from './IndividualList';
import PartyList from './PartyList';
import { Party } from '@/src/type/party';
import ModalPartyList from './ModalPartyList';

// TODO: use props to dynamic variable

interface PartyListSectionProps {
	candidates: Candidate[];
	parties: Party[];
}

export default function PartyListSection({
	candidates,
	parties,
}: PartyListSectionProps) {
	const [voteType, setVoteType] = useState<'individual' | 'party'>(
		'individual',
	);
	const [individualSearch, setIndividualSearch] = useState('');
	const [partySearch, setPartySearch] = useState('');
	const [openModalPartyList, setOpenModalPartyList] = useState<boolean>(false);

	const getAmountOfPreviousPositionCandidates = () => {
		return getCandidatesDisplay().filter((c) => c.hasPreviousPosition).length;
	};

	const getCandidatesDisplay = () => {
		if (individualSearch === '') return candidates;
		const regex = new RegExp(`(${individualSearch})`, 'gi');
		return candidates.filter((c) => c.party.name.match(regex));
	};

	const getPartiesDisplay = () => {
		if (partySearch === '') return parties;
		const regex = new RegExp(`(${partySearch})`, 'gi');
		return parties.filter((p) => p.name.match(regex));
	};

	function isDateInYear(dateToCheck: Date, targetYear: number): boolean {
		// Use getFullYear() to get the 4-digit year from the Date object
		const dateYear = dateToCheck.getFullYear();

		// Compare the extracted year with the target year
		return dateYear === targetYear;
	}

	const getAmountOfPreviousPositionParties = () => {
		return getPartiesDisplay().filter((p) => {
			const lastPosition = p.previousPositions.find((position) => {
				const date = new Date(position.to);
				return isDateInYear(date, 2025);
			});
			return !!lastPosition;
		}).length;
	};
	return (
		<div>
			<div className="flex w-full">
				<button
					className={`text-h8 font-kondolar z-20 w-full rounded-tl-[16px] rounded-tr-[16px] py-[16px] font-bold hover:cursor-pointer ${voteType === 'individual' ? 'border-t-[2px] border-r-[2px] border-l-[2px] bg-white' : ''}`}
					onClick={() => setVoteType('individual')}
				>
					เลือกคนที่ใช่
				</button>
				<button
					className={`text-h8 font-kondolar z-20 w-full rounded-tl-[16px] rounded-tr-[16px] py-[16px] font-bold hover:cursor-pointer ${voteType === 'party' ? 'border-t-[2px] border-r-[2px] border-l-[2px] bg-white' : ''}`}
					onClick={() => setVoteType('party')}
				>
					เลือกพรรคที่ชอบ
				</button>
			</div>
			{voteType === 'individual' && (
				<div className="relative top-[-2px] flex w-full flex-col items-center gap-[16px] rounded-tr-[16px] rounded-br-[16px] rounded-bl-[16px] border-[2px] bg-white px-[16px] py-[24px] md:px-[52px]">
					<div className="text-center">
						<h5 className="text-h8 font-kondolar">
							ทั้งหมด{' '}
							<span className="font-bold">
								{getCandidatesDisplay().length} คน
							</span>
						</h5>
						<p className="text-b5 flex text-[#0EA177]">
							<img
								className="mr-[4px]"
								src="/ballotready/green-bookmark.svg"
								alt="green-bookmark"
							/>
							เคยมีตำแหน่งในสภาสมัยที่แล้ว &nbsp;
							<span className="font-bold">
								{getAmountOfPreviousPositionCandidates()} คน
							</span>
						</p>
					</div>
					<SearchInput
						placeholder="ค้นหาจากชื่อพรรคการเมือง"
						textInput={individualSearch}
						onChangeTextInput={(e) => setIndividualSearch(e.target.value)}
						resetTextInput={() => setIndividualSearch('')}
					/>

					<IndividualList candidates={getCandidatesDisplay()} />
				</div>
			)}
			{voteType === 'party' && (
				<div className="relative top-[-2px] flex w-full flex-col items-center gap-[16px] rounded-tl-[16px] rounded-br-[16px] rounded-bl-[16px] border-[2px] bg-white px-[16px] py-[24px] md:px-[52px]">
					<div className="text-center">
						<h5 className="text-h8 font-kondolar">
							ทั้งหมด{' '}
							<span className="font-bold">
								{getPartiesDisplay().length} พรรค
							</span>
						</h5>
						<p className="text-b5 flex text-[#0EA177]">
							<img
								className="mr-[4px]"
								src="/ballotready/green-bookmark.svg"
								alt="green-bookmark"
							/>
							เคยมีตำแหน่งในสภาสมัยที่แล้ว{' '}
							<span className="font-bold">
								{getAmountOfPreviousPositionParties()} พรรค
							</span>
						</p>
					</div>
					<SearchInput
						placeholder="ค้นหาชื่อพรรคการเมือง"
						textInput={partySearch}
						onChangeTextInput={(e) => setPartySearch(e.target.value)}
						resetTextInput={() => setPartySearch('')}
					/>

					<PartyList parties={getPartiesDisplay()} />
				</div>
			)}
		</div>
	);
}
