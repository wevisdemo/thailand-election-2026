import { Candidate } from '@/src/type/candidate';
import { useState } from 'react';

interface IndividualCardProps {
	candidate: Candidate;
}

export default function IndividualCard({ candidate }: IndividualCardProps) {
	const [expanded, setExpanded] = useState(false);

	function calculateAge(
		birthDate: string | Date,
		asOf: Date = new Date(),
	): number {
		const dob = new Date(birthDate);

		let age = asOf.getFullYear() - dob.getFullYear();
		const monthDiff = asOf.getMonth() - dob.getMonth();
		const dayDiff = asOf.getDate() - dob.getDate();

		// If birthday hasn't happened yet this year, subtract 1
		if (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)) {
			age--;
		}

		return age;
	}

	return (
		<div className="flex w-full flex-col py-[8px]">
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
								className="h-[40px] w-[40px] rounded-full object-contain"
								src={candidate.image || '/ballotready/dummie-candidate.svg'}
								alt={candidate.name}
							/>
							{candidate.party.image && (
								<img
									className="absolute right-[0px] bottom-[0px] w-[16px] rounded-full"
									src={candidate.party.image}
									alt={candidate.party.name}
								/>
							)}
						</div>
						<div>
							<p className="text-h9 font-kondolar font-bold">
								{candidate.name}
							</p>
							<p className="text-[12px]">
								พรรค <span className="font-bold">{candidate.party.name}</span>
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
				{candidate.hasPreviousPosition && (
					<img
						className="absolute top-0 right-[24px] w-[15px]"
						src="/ballotready/green-bookmark.svg"
						alt="green-bookmark"
					/>
				)}
			</div>
			{expanded && (
				<div className="flex flex-col gap-[16px] py-[8px]">
					<table className="text-left">
						<tbody>
							<tr>
								<th
									className="mr-[6px] w-[72px] text-[16px] font-normal text-[#9A9A9A]"
									scope="row"
								>
									อายุ
								</th>
								<td className="pl-[6px] text-[14px]">
									{candidate.birthDate
										? calculateAge(candidate.birthDate)
										: 'ไม่ระบุ'}
								</td>
							</tr>
							<tr>
								<th
									className="mr-[6px] w-[72px] text-[16px] font-normal text-[#9A9A9A]"
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
									className="mr-[6px] w-[72px] text-[16px] font-normal text-[#9A9A9A]"
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
						{candidate.hasPreviousPosition && (
							<p className="text-[14px] text-[#0EA177]">เคยมีตำแหน่งในสภา</p>
						)}
						{candidate.externalLinks.map((link) => {
							return (
								<a
									key={`${candidate.name}-${link.label}`}
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
						{/* {candidate.hasPreviousPosition ? (
							<>
								<p className="text-[14px] text-[#0EA177]">เคยมีตำแหน่งในสภา</p>
								<a
									className="flex justify-between md:justify-start"
									target="_blank"
									href=""
								>
									<span className="text-[14px] text-[#6140D2] underline">
										ตรวจการบ้าน
									</span>
									<img src="/ballotready/new-tab.svg" alt="new-tab-icon" />
								</a>
							</>
						) : (
							<a
								className="flex justify-between md:justify-start"
								target="_blank"
								href=""
							>
								<span className="text-[14px] text-[#6140D2] underline">
									ส่องประวัติ
								</span>
								<img src="/ballotready/new-tab.svg" alt="new-tab-icon" />
							</a>
						)} */}

						{/* <a
							className="flex justify-between md:justify-start"
							target="_blank"
							href=""
						>
							<span className="text-[14px] text-[#6140D2] underline">
								ส่องนโยบายพรรคที่สังกัด
							</span>
							<img src="/ballotready/new-tab.svg" alt="new-tab-icon" />
						</a> */}
					</div>
				</div>
			)}
		</div>
	);
}
