export default function BallotStepSection() {
	return (
		<div className="flex flex-col items-center gap-[18px] bg-[#9C81F6] px-[16px] py-[24px] md:py-[32px]">
			<div className="text-center">
				<h5 className="text-h5 font-kondolar font-bold">เข้าใจวิธีเข้าคูหา</h5>
				<p className="text-b3 font-kondolar font-bold">
					ในวันเลือกตั้ง คุณต้องเข้าคูหา 1 ครั้ง
				</p>
			</div>
			<div className="grid max-w-[600px] grid-cols-3 gap-[4px] text-center">
				<div className="flex flex-col items-center">
					<p className="font-kondolar text-h8 h-[24px] w-[24px] rounded-full bg-white text-center font-bold">
						1
					</p>
					<img
						className="h-[80px]"
						src="/ballotready/ballot-step-1.svg"
						alt="ballot-step-1"
					/>
					<p className="text-h9 font-kondolar font-bold">รับบัตร 3 ใบ</p>
				</div>
				<div className="flex flex-col items-center">
					<p className="font-kondolar text-h8 h-[24px] w-[24px] rounded-full bg-white text-center font-bold">
						2
					</p>
					<img
						className="h-[80px]"
						src="/ballotready/ballot-step-2.svg"
						alt="ballot-step-2"
					/>
					<p className="text-h9 font-kondolar font-bold">เข้าคูหากาบัตร 3 ใบ</p>
				</div>
				<div className="flex flex-col items-center">
					<p className="font-kondolar text-h8 h-[24px] w-[24px] rounded-full bg-white text-center font-bold">
						3
					</p>
					<img
						className="h-[80px]"
						src="/ballotready/ballot-step-3.svg"
						alt="ballot-step-3"
					/>
					<p className="text-h9 font-kondolar font-bold">
						หย่อนบัตรแต่ละใบตามหีบที่เตรียมไว้แยกกัน
					</p>
				</div>
			</div>
		</div>
	);
}
