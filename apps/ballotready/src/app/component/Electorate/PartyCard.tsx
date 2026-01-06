import { Party } from '@/src/type/party';
import { ElectionButton } from '@election/ui/react';
import { useContext, useState } from 'react';
import { ElectorateStoreContext } from '../../store/ElectorateStore';

interface PartyCardProps {
	party: Party;
	onClickViewPartyList: () => void;
}

function isDateInYear(dateToCheck: Date, targetYear: number): boolean {
	// Use getFullYear() to get the 4-digit year from the Date object
	const dateYear = dateToCheck.getFullYear();

	// Compare the extracted year with the target year
	return dateYear === targetYear;
}

export default function PartyCard({
	party,
	onClickViewPartyList,
}: PartyCardProps) {
	const [expanded, setExpanded] = useState(false);

	const hasLastPostition = () => {
		const lastPosition = party.previousPositions.find((position) => {
			const date = new Date(position.to);
			return isDateInYear(date, 2025);
		});
		return !!lastPosition;
	};

	return (
		<div className="flex w-full flex-col py-[8px]">
			<div className="relative flex border-t-[1px]">
				<div className="flex w-[40px] flex-col items-center justify-center bg-black p-[8px]">
					<p className="text-[10px] text-white">เบอร์</p>
					<p className="font-kondolar text-[32px] font-bold text-white">
						{party.number}
					</p>
				</div>
				<div className="flex w-full items-center justify-between gap-[16px] p-[16px]">
					<div className="flex items-center">
						<div className="relative flex h-fit">
							<img
								className="h-[64px] w-[64px] rounded-full"
								src={party.image}
								alt={party.name}
							/>
						</div>
						<p className="text-h8 font-kondolar font-bold">{party.name}</p>
					</div>
					<img
						className={`w-[30px] transform transition-transform duration-300 ease-in-out ${expanded ? '' : 'rotate-180'} hover:cursor-pointer`}
						src="/ballotready/chevron-up.svg"
						alt="chevron-up-icon"
						onClick={() => setExpanded(!expanded)}
					/>
				</div>
				{hasLastPostition() && (
					<img
						className="absolute top-0 right-[24px] w-[15px]"
						src="/ballotready/green-bookmark.svg"
						alt="green-bookmark"
					/>
				)}
			</div>
			{expanded && (
				<div className="flex flex-col gap-[8px] py-[8px]">
					{party.pmCandidates.length > 0 && (
						<div>
							<p className="mb-[4px] text-[14px] text-[#9A9A9A]">
								แคนดิเดตนายก
							</p>
							{party.pmCandidates.map((candidate, index) => (
								<div className="flex items-center" key={index}>
									<div className="relative flex h-fit">
										{/* TODO: candidate photo */}
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
					)}
					<button
						className="flex gap-[8px] rounded-[16px] bg-[#CEC2F5] px-[8px] py-[10px] hover:cursor-pointer"
						onClick={onClickViewPartyList}
					>
						<img src="/ballotready/plus-cotton.svg" alt="plus-cotton" />
						<p className="text-[14px]">ดูบัญชีรายชื่อ</p>
					</button>
					{party.previousPositions && party.previousPositions.length > 0 && (
						<div className="flex">
							<div className="flex flex-col">
								{party.previousPositions.map((position, index) => (
									<div className="flex" key={index}>
										{isDateInYear(new Date(position.to), 2025) ? (
											<img
												className="mr-[4px] h-[14px]"
												src="/ballotready/green-bookmark.svg"
												alt="green-bookmark"
											/>
										) : (
											<div className="h-[14px] w-[14px]" />
										)}

										<ul className="list-inside list-disc text-[14px] text-[#0EA177]">
											<p>{position.label}</p>
											{/* TODO: convert date to thai date */}
											<li className="ml-[4px]">
												{position.from} - {position.to}{' '}
											</li>
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
									className="flex justify-between md:justify-start"
									target="_blank"
									href={link.url}
								>
									<span className="text-[14px] text-[#6140D2] underline">
										{link.label}
									</span>
									<img src="/ballotready/new-tab.svg" alt="new-tab-icon" />
								</a>
							);
						})}
						{/* <a
							className="flex justify-between md:justify-start"
							target="_blank"
							href=""
						>
							<span className="text-[14px] text-[#6140D2] underline">
								มีนโยบายอะไรบ้าง
							</span>
							<img src="/ballotready/new-tab.svg" alt="new-tab-icon" />
						</a>
						{party.previousPositions && party.previousPositions.length > 0 && (
							<a
								className="flex justify-between md:justify-start"
								target="_blank"
								href=""
							>
								<span className="text-[14px] text-[#6140D2] underline">
									เคยเสนอร่างกฏหมายอะไรบ้าง
								</span>
								<img src="/ballotready/new-tab.svg" alt="new-tab-icon" />
							</a>
						)}
						<a
							className="flex justify-between md:justify-start"
							target="_blank"
							href=""
						>
							<span className="text-[14px] text-[#6140D2] underline">
								เว็บไซต์
							</span>
							<img src="/ballotready/new-tab.svg" alt="new-tab-icon" />
						</a> */}
					</div>
				</div>
			)}
		</div>
	);
}
