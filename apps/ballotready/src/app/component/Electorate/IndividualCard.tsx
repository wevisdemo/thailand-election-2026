import { Candidate } from '@/src/type/candidate';
import { useState } from 'react';

interface IndividualCardProps {
	candidate: Candidate;
}

export default function IndividualCard({ candidate }: IndividualCardProps) {
	const [expanded, setExpanded] = useState(false);
	return (
		<div className="flex w-full flex-col">
			<div className="relative flex border-t-[1px]">
				<div className="flex w-[40px] flex-col items-center justify-center bg-black p-[8px]">
					<p className="text-[10px] text-white">เบอร์</p>
					<p className="font-kondolar text-[32px] font-bold text-white">
						{candidate.number}
					</p>
				</div>
				<div className="flex w-full items-center justify-between gap-[16px] p-[16px]">
					<div className="flex">
						<div className="relative flex h-fit">
							<img
								className="w-[40px] rounded-full"
								src={candidate.photoUrl || '/ballotready/dummie-candidate.svg'}
								alt={candidate.name}
							/>
							{candidate.partyLogoUrl && (
								<img
									className="absolute right-[0px] bottom-[0px] w-[16px] rounded-full"
									src={candidate.partyLogoUrl}
									alt={candidate.party}
								/>
							)}
						</div>
						<div>
							<p className="text-h9 font-kondolar font-bold">
								{candidate.name}
							</p>
							<p className="text-[12px]">
								พรรค <span className="font-bold">{candidate.party}</span>
							</p>
						</div>
					</div>
					<img
						className={`w-[30px] transform transition-transform duration-300 ease-in-out ${expanded ? '' : 'rotate-180'} hover:cursor-pointer`}
						src="/ballotready/chevron-up.svg"
						alt="chevron-up-icon"
						onClick={() => setExpanded(!expanded)}
					/>
				</div>
				<img
					className="absolute top-0 right-[24px] w-[15px]"
					src="/ballotready/green-bookmark.svg"
					alt="green-bookmark"
				/>
			</div>
			{expanded && (
				<div className="flex flex-col gap-[16px] py-[8px]">
					<table className="text-left">
						<tbody>
							<tr>
								<th
									className="mr-[6px] text-[16px] font-normal text-[#9A9A9A]"
									scope="row"
								>
									อายุ
								</th>
								<td className="pl-[6px] text-[14px]">
									{candidate.age || 'ไม่ระบุ'}
								</td>
							</tr>
							<tr>
								<th
									className="mr-[6px] text-[16px] font-normal text-[#9A9A9A]"
									scope="row"
								>
									การศึกษา
								</th>
								<td className="pl-[6px] text-[14px]">
									{candidate.education || 'ไม่ระบุ'}
								</td>
							</tr>
							<tr>
								<th
									className="mr-[6px] text-[16px] font-normal text-[#9A9A9A]"
									scope="row"
								>
									อาชีพเดิม
								</th>
								<td className="pl-[6px] text-[14px]">
									{candidate.previousOccupation || 'ไม่ระบุ'}
								</td>
							</tr>
						</tbody>
					</table>
					<div>
						{candidate.hasHeldPositionBefore ? (
							<>
								<p className="text-[14px] text-[#0EA177]">เคยมีตำแหน่งในสภา</p>
								<a className="flex" target="_blank" href="">
									<span className="text-[14px] text-[#6140D2] underline">
										ตรวจการบ้าน
									</span>
									<img src="/ballotready/new-tab.svg" alt="new-tab-icon" />
								</a>
							</>
						) : (
							<a className="flex" target="_blank" href="">
								<span className="text-[14px] text-[#6140D2] underline">
									ส่องประวัติ
								</span>
								<img src="/ballotready/new-tab.svg" alt="new-tab-icon" />
							</a>
						)}

						<a className="flex" target="_blank" href="">
							<span className="text-[14px] text-[#6140D2] underline">
								ส่องนโยบายพรรคที่สังกัด
							</span>
							<img src="/ballotready/new-tab.svg" alt="new-tab-icon" />
						</a>
					</div>
				</div>
			)}
		</div>
	);
}
