export default function HowToVoteSection() {
	return (
		<div className="grid gap-[16px] bg-[#CEC2F5] px-[16px] py-[24px] text-center">
			<div>
				<h5 className="text-h5 font-kondolar font-bold">ซ้อมใช้สิทธิ ! </h5>
				<p className="text-b3 font-kondolar font-bold">รู้จักบัตร 3 ใบ</p>
			</div>
			<div className="relative w-full max-w-[600px]">
				<div className="flex w-full">
					<button className="text-h8 font-kondolar z-20 w-full rounded-tl-[16px] rounded-tr-[16px] border-t-[2px] border-r-[2px] border-l-[2px] bg-white py-[16px] font-bold">
						บัตรเลือกตั้ง
					</button>
					<button className="text-h8 font-kondolar w-full py-[16px] font-bold">
						บัตรประชามติ
					</button>
				</div>
				<div className="relative top-[-2px] w-full rounded-tr-[16px] rounded-br-[16px] rounded-bl-[16px] border-[2px] bg-white px-[16px] py-[24px]">
					<h5 className="text-h5 font-kondolar font-bold">
						รู้จัก ‘บัตรเลือกตั้ง 2 ใบ’
					</h5>
					<div className="flex flex-col md:flex-row md:justify-between">
						<div className="mb-[16px] flex w-full flex-col items-center rounded-[16px] border-[2px] p-[16px] md:mr-[8px] md:mb-0">
							<img src="/ballotready/ballot-green.svg" alt="ballot-green" />
							<p className="text-h8 font-kondolar mt-[10px] font-bold">
								บัตรใบแรก
							</p>
							<p className="text-b5 mt-[6px]">
								ใช้เลือกผู้สมัคร สส. เขต 1 คนที่ใช่
								ให้เป็นผู้แทนเขตเลือกตั้งของตัวเอง
							</p>
						</div>
						<div className="mb-[16px] flex w-full flex-col items-center rounded-[16px] border-[2px] p-[16px] md:mr-[8px] md:mb-0">
							<img src="/ballotready/ballot-purple.svg" alt="ballot-purple" />
							<p className="text-h8 font-kondolar mt-[10px] font-bold">
								บัตรใบที่สอง
							</p>
							<p className="text-b5 mt-[6px]">
								ใช้เลือกพรรคการเมืองที่ชอบ โดยคะแนนที่แต่ละพรรคได้
								จะถูกคิดคำนวณตามสัดส่วน เพื่อจัดสรรที่นั่ง สส. บัญชีรายชื่อ
							</p>
						</div>
					</div>
					<div className="flex flex-col gap-[14px] rounded-[16px] bg-[#FBF8F4] px-[14px] py-[24px]">
						<p className="font-kondolar text-h9">
							ระวังจะสับสน !{' '}
							<span className="font-bold">
								เบอร์คนที่เรารักในบัตรใบแรกกับเบอร์ของพรรคในบัตรใบที่สอง
								อาจไม่เหมือนกันแม้จะอยู่พรรคเดียวกัน
							</span>
						</p>
						<p>
							และบัตรทั้งสองใบ ต้องเลือกผ่านการทำ{' '}
							<span className="text-[14px] font-bold">
								เครื่องหมายกากบาทเท่านั้น
							</span>
							หากพบเครื่องหมายอื่นจะถือว่าเป็นบัตรเสียโดยทันที
						</p>
						<div className="flex justify-center gap-[14px]">
							<div>
								<p className="w-[64px] rounded-[16px] bg-[#1AD39E] py-[2px] text-[14px] font-bold text-white">
									บัตรดี
								</p>
								<img
									className="mt-[4px] w-[64px]"
									src="/ballotready/good-ballot.svg"
									alt="good-ballot"
								/>
							</div>
							<div>
								<p className="w-[64px] rounded-[16px] bg-[#F41724] py-[2px] text-[14px] font-bold text-white">
									บัตรเสีย
								</p>
								<img
									className="mt-[4px] w-[64px]"
									src="/ballotready/bad-ballot.svg"
									alt="bad-ballot"
								/>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
