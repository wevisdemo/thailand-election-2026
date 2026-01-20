import { Party } from '@/src/type/party';
import { useState } from 'react';
import PlusButtonIcon from '../shared/PlusButtonIcon';
import NewTabIcon from '../shared/NewTabIcon';

interface PartyCardProps {
	party: Party;
	onClickViewPartyList: () => void;
}

export default function PartyCard({
	party,
	onClickViewPartyList,
}: PartyCardProps) {
	const [expanded, setExpanded] = useState(false);

	const hasLastPosition =
		party.pastGovernmentPeriods.length > 0 ||
		party.pastOppositionPeriods.length > 0;

	return (
		<div className="flex w-full flex-col py-[8px]">
			<div className="relative flex border-t-[1px]">
				<div className="flex w-[40px] flex-col items-center justify-center bg-black p-[8px]">
					<p className="text-[10px] text-white">เบอร์</p>
					<p className="font-kondolar text-[32px] font-bold text-white">
						{party.number}
					</p>
				</div>
				<div className="flex w-full items-center justify-between gap-4 p-[16px]">
					<div className="flex items-center gap-2">
						<div className="relative flex h-fit">
							<img
								className="h-[64px] w-[64px] object-contain"
								src={party.image}
								alt={party.name}
							/>
						</div>
						<p className="text-h8 font-kondolar ml-[4px] font-bold">
							{party.name}
						</p>
					</div>
					<img
						className={`w-[30px] transform transition-transform duration-300 ease-in-out ${expanded ? '' : 'rotate-180'} hover:cursor-pointer`}
						src="/ballotready/chevron-up.svg"
						alt="chevron-up-icon"
						onClick={() => setExpanded(!expanded)}
					/>
				</div>
				{hasLastPosition && (
					<img
						className="absolute top-0 right-[24px] w-[15px]"
						src="/ballotready/green-bookmark.svg"
						alt="green-bookmark"
					/>
				)}
			</div>
			{expanded && (
				<div className="flex flex-col gap-[8px] py-[8px]">
					{party.pmCandidates.length > 0 ? (
						<div>
							<p className="mb-[4px] text-[14px] text-[#9A9A9A]">
								แคนดิเดตนายก
							</p>
							{party.pmCandidates.map((candidate, index) => (
								<div className="flex items-center gap-[4px]" key={index}>
									<div className="relative flex h-fit">
										<img
											className="w-[40px] rounded-full"
											src={
												candidate.image || '/ballotready/dummie-candidate.svg'
											}
											alt={candidate.name}
										/>
										{party.image && (
											<img
												className="absolute right-[0px] bottom-[0px] w-[16px] rounded-full"
												src={party.image}
												alt={party.name}
											/>
										)}
									</div>
									<p className="text-h9 font-kondolar font-bold">
										{candidate.name}
									</p>
								</div>
							))}
						</div>
					) : (
						<p className="text-gray-2 text-[14px]">ไม่มีแคนดิเดตนายก</p>
					)}
					<button
						className="group flex items-center gap-[8px] rounded-[16px] bg-[#CEC2F5] px-[8px] py-[10px] hover:cursor-pointer hover:bg-[#9C81F6]"
						onClick={onClickViewPartyList}
					>
						<PlusButtonIcon />
						<p className="text-[14px]">ดูบัญชีรายชื่อ</p>
					</button>
					{hasLastPosition && (
						<div className="flex">
							<div className="flex flex-col">
								{[
									...(party.pastGovernmentPeriods.length
										? [
												{
													label: 'พรรคร่วมรัฐบาล',
													periods: party.pastGovernmentPeriods,
												},
											]
										: []),
									...(party.pastOppositionPeriods.length
										? [
												{
													label: 'พรรคร่วมฝ่ายค้าน',
													periods: party.pastOppositionPeriods,
												},
											]
										: []),
								].map(({ label, periods }, index) => (
									<div className="flex" key={label}>
										{index === 0 ? (
											<img
												className="m-[4px] h-[14px]"
												src="/ballotready/green-bookmark.svg"
												alt="green-bookmark"
											/>
										) : (
											<div className="h-[14px] w-[14px]" />
										)}

										<ul className="list-inside list-disc text-[14px] text-[#0EA177]">
											<p>{label}</p>
											{periods.map((period) => (
												<li className="ml-[4px]" key={period}>
													{period}
												</li>
											))}
										</ul>
									</div>
								))}
							</div>
						</div>
					)}
					<div className="w-full">
						{party.externalLinks.map((link) => {
							return (
								<a
									key={`${party}-${link.label}`}
									className="group flex justify-between md:justify-start"
									target="_blank"
									href={link.url}
								>
									<span className="text-[14px] text-[#6140D2] underline group-hover:text-[#9C81F6]">
										{link.label}
									</span>
									<NewTabIcon />
								</a>
							);
						})}
					</div>
				</div>
			)}
		</div>
	);
}
