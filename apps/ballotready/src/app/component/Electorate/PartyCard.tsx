import { Party } from '@/src/type/party';
import { ElectionButton } from '@election/ui/react';
import { useState } from 'react';

interface PartyCardProps {
	party: Party;
}

export default function PartyCard({ party }: PartyCardProps) {
	const [expanded, setExpanded] = useState(false);

	return (
		<div className="flex w-full flex-col">
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
								src={party.partyLogoUrl}
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
				{party.previousPositions && party.previousPositions.length > 0 && (
					<img
						className="absolute top-0 right-[24px] w-[15px]"
						src="/ballotready/green-bookmark.svg"
						alt="green-bookmark"
					/>
				)}
			</div>
			{expanded && (
				<div className="flex flex-col gap-[8px] py-[8px]">
					<div>
						<p className="mb-[4px] text-[14px] text-[#9A9A9A]">แคนดิเดตนายก</p>
						{party.candidates.map((candidate, index) => (
							<div className="flex items-center" key={index}>
								<div className="relative flex h-fit">
									<img
										className="w-[40px] rounded-full"
										src={
											candidate.photoUrl || '/ballotready/dummie-candidate.svg'
										}
										alt={candidate.name}
									/>
									{party.partyLogoUrl && (
										<img
											className="absolute right-[0px] bottom-[0px] w-[16px] rounded-full"
											src={party.partyLogoUrl}
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
					<button className="flex gap-[8px] rounded-[16px] bg-[#CEC2F5] px-[8px] py-[10px]">
						<img src="/ballotready/plus-cotton.svg" alt="plus-cotton" />
						<p className="text-[14px]">ดูบัญชีรายชื่อ</p>
					</button>
					{party.previousPositions && party.previousPositions.length > 0 && (
						<div className="flex">
							<img
								className="mr-[4px] h-[14px]"
								src="/ballotready/green-bookmark.svg"
								alt="green-bookmark"
							/>
							<div className="flex flex-col">
								{party.previousPositions.map((position, index) => (
									<ul
										className="list-inside list-disc text-[14px] text-[#0EA177]"
										key={index}
									>
										<p>{position.position}</p>
										<li className="ml-[4px]">{position.duration}</li>
									</ul>
								))}
							</div>
						</div>
					)}
					<div className="w-full">
						<a
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
						</a>
					</div>
				</div>
			)}
		</div>
	);
}
