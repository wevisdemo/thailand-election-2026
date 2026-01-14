export default function BallotStepSection() {
	return (
		<div className="flex flex-col items-center gap-[18px] bg-[#9C81F6] px-[16px] py-[24px] md:py-[32px]">
			<div className="text-center">
				<h5 className="text-h5 font-kondolar font-bold">เข้าใจวิธีเข้าคูหา</h5>
				<p className="text-b3 font-kondolar font-bold">
					ในวันเลือกตั้ง คุณต้องเข้าคูหา 2 ครั้ง
				</p>
			</div>
			<div className="flex max-w-[880px] flex-col gap-[25px] md:flex-row md:gap-0">
				<div className="grid max-w-[600px] grid-cols-3 gap-[4px] text-center">
					<div className="flex flex-col items-center">
						<p className="font-kondolar h-[24px] w-[24px] rounded-full bg-white text-center text-[18px] font-bold">
							1
						</p>
						<img
							className="h-[80px] md:h-[120px]"
							src="/ballotready/ballot-step-1.png"
							alt="ballot-step-1"
						/>
						<p className="text-b6">
							รับบัตรเลือกตั้ง 2 ใบ เลือก สส. เขตและบัญชีรายชื่อ
						</p>
					</div>
					<div className="flex flex-col items-center">
						<p className="font-kondolar h-[24px] w-[24px] rounded-full bg-white text-center text-[18px] font-bold">
							2
						</p>
						<img
							className="h-[80px] md:h-[120px]"
							src="/ballotready/ballot-step-2.svg"
							alt="ballot-step-2"
						/>
						<p className="text-b6">
							เค้าคูหา <span className="whitespace-pre">กาบัตรเลือกตั้ง</span>
						</p>
					</div>
					<div className="flex flex-col items-center">
						<p className="font-kondolar h-[24px] w-[24px] rounded-full bg-white text-center text-[18px] font-bold">
							3
						</p>
						<img
							className="h-[80px] md:h-[120px]"
							src="/ballotready/ballot-step-3.svg"
							alt="ballot-step-3"
						/>
						<p className="text-b6">
							หย่อนบัตรทั้ง 2 ใบ
							<span className="whitespace-pre">ลงหีบที่กำหนดแยกกัน</span>
						</p>
					</div>
				</div>
				<div className="grid max-w-[600px] grid-cols-3 gap-[4px] text-center">
					<div className="flex flex-col items-center">
						<p className="font-kondolar h-[24px] w-[24px] rounded-full bg-white text-center text-[18px] font-bold">
							4
						</p>
						<div className="m-auto flex h-[80px] md:h-[120px]">
							<img
								className="h-[80px] md:h-[120px]"
								src="/ballotready/ballot-step-4.png"
								alt="ballot-step-4"
							/>
						</div>
						<p className="text-b6">เดินออกมาอีกรอบรับบัตรออกเสียงประชามติ</p>
					</div>
					<div className="flex flex-col items-center">
						<p className="font-kondolar h-[24px] w-[24px] rounded-full bg-white text-center text-[18px] font-bold">
							5
						</p>
						<img
							className="h-[80px] md:h-[120px]"
							src="/ballotready/ballot-step-5.svg"
							alt="ballot-step-5"
						/>
						<p className="text-b6">เค้าคูหากาบัตรประชามติ</p>
					</div>
					<div className="flex flex-col items-center">
						<p className="font-kondolar h-[24px] w-[24px] rounded-full bg-white text-center text-[18px] font-bold">
							6
						</p>
						<img
							className="h-[80px] md:h-[120px]"
							src="/ballotready/ballot-step-6.svg"
							alt="ballot-step-6"
						/>
						<p className="text-b6">หย่อนบัตรประชามติลงหีบ</p>
					</div>
				</div>
			</div>
		</div>
	);
}
