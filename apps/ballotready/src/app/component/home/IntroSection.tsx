export default function IntroSection() {
	return (
		<div className="flex flex-col items-center px-[16px]">
			<div className="py-[24px] text-center">
				<h6 className="text-h6 font-sriracha text-[#6140D2]">Ballot Ready</h6>
				<h4 className="text-h4 font-kondolar font-bold">
					เข้าคูหารอบนี้ ต้องเลือกอะไรบ้าง ?
				</h4>
			</div>
			<img
				className="w-[140px] md:w-[200px]"
				src="/ballotready/intro-1.svg"
				alt="intro-1"
			/>
			<div className="font-kondolar flex flex-col py-[32px] text-center">
				<p className="text-[24px] font-bold">
					เตรียมตัว #เลือกตั้งพร้อมประชามติ
				</p>
				<p className="text-[24px]">เค้าคูหารอบนี้</p>
				<p className="text-[32px] font-bold">คุณต้องกาบัตร 3 ใบ</p>
			</div>
		</div>
	);
}
