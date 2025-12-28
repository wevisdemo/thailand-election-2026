import { Party, PartyListCandidate } from '@/src/type/party';

interface ModalPartyListProps {
	party?: Party;
	onClose: () => void;
	isOpen: boolean;
}

export default function ModalPartyList({
	party,
	onClose,
	isOpen,
}: ModalPartyListProps) {
	if (!isOpen) return null;
	if (!party) return null;
	const handleBackdropClick = (e: React.MouseEvent) => {
		if (e.target === e.currentTarget) {
			handleClose();
		}
	};

	const handleClose = () => {
		onClose();
	};
	return (
		<div
			className="bg-opacity-50 fixed inset-0 z-50 flex h-full w-full items-center justify-center bg-transparent"
			onClick={handleBackdropClick}
		>
			<div className="relative flex flex-col rounded-[16px] border-[2px] bg-white p-[16px]">
				<img
					className="absolute right-[16px] w-[37px] hover:cursor-pointer"
					src="/ballotready/cross-icon.svg"
					alt="cross-icon"
				/>
				<p className="font-kondolar text-[18px] font-bold">ประชาธิปไตยใหม่</p>
				<p className="font-[14px]">
					ส.ส. บัญชีรายชื่อ <span className="font-bold">xxx คน</span>
				</p>
				<p className="text-b5 flex text-[#0EA177]">
					<img
						className="mr-[4px]"
						src="/ballotready/green-bookmark.svg"
						alt="green-bookmark"
					/>
					เคยมีตำแหน่งในสภาสมัยที่แล้ว <span className="font-bold">xx คน</span>
				</p>
				<div className="mt-4 overflow-x-auto">
					<table className="w-full border-collapse">
						<thead>
							<tr className="text-[#9A9A9A]">
								<th className="w-[42px] px-4 py-2 text-left !font-normal">
									ลำดับ
								</th>
								<th className="px-4 py-2 text-left !font-normal">ชื่อ-สกุล</th>
							</tr>
						</thead>
						<tbody>
							{party.partyListCandidates.map((candidate, index) => (
								<tr key={index} className="border-b hover:bg-gray-50">
									<td className="relative px-4 py-2 text-center">
										{candidate.hasHeldPositionBefore && (
											<img
												className="absolute top-1/2 left-1/2 z-10 w-[24px] -translate-x-1/2 -translate-y-1/2"
												src="/ballotready/green-bookmark.svg"
												alt="green-bookmark"
											/>
										)}
										<span className="relative z-20">{candidate.number}</span>
									</td>
									<td className="flex justify-between px-4 py-2">
										<span>{candidate.name}</span>
										<img
											className="hover:cursor-pointer"
											src="/ballotready/new-tab-grey.svg"
											alt="new-tab-grey-icon"
										/>
									</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>
			</div>
		</div>
	);
}
