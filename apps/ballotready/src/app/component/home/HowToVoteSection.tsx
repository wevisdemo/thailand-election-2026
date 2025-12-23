'use client';
import { useState } from 'react';

export default function HowToVoteSection() {
	const [ballotType, setBallotType] = useState<'election' | 'referendum'>(
		'election',
	);
	return (
		<div className="grid justify-center gap-[16px] bg-[#CEC2F5] px-[16px] py-[24px] text-center">
			<div>
				<h5 className="text-h5 font-kondolar font-bold">ซ้อมใช้สิทธิ ! </h5>
				<p className="text-b3 font-kondolar font-bold">รู้จักบัตร 3 ใบ</p>
			</div>
			<div className="relative w-full max-w-[600px]">
				<div className="flex w-full">
					<button
						className={`text-h8 font-kondolar z-20 w-full rounded-tl-[16px] rounded-tr-[16px] py-[16px] font-bold hover:cursor-pointer ${ballotType === 'election' ? 'border-t-[2px] border-r-[2px] border-l-[2px] bg-white' : ''}`}
						onClick={() => setBallotType('election')}
					>
						บัตรเลือกตั้ง
					</button>
					<button
						className={`text-h8 font-kondolar z-20 w-full rounded-tl-[16px] rounded-tr-[16px] py-[16px] font-bold hover:cursor-pointer ${ballotType === 'referendum' ? 'border-t-[2px] border-r-[2px] border-l-[2px] bg-white' : ''}`}
						onClick={() => setBallotType('referendum')}
					>
						บัตรประชามติ
					</button>
				</div>
				{ballotType === 'election' && (
					<div className="relative top-[-2px] flex w-full flex-col gap-[16px] rounded-tr-[16px] rounded-br-[16px] rounded-bl-[16px] border-[2px] bg-white px-[16px] py-[24px] md:px-[52px]">
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
				)}
				{ballotType === 'referendum' && (
					<div className="relative top-[-2px] flex w-full flex-col gap-[16px] rounded-tl-[16px] rounded-br-[16px] rounded-bl-[16px] border-[2px] bg-white px-[16px] py-[24px] md:px-[52px]">
						<h5 className="text-h5 font-kondolar font-bold">
							รู้จัก ‘บัตรออกเสียงประชามติ’
						</h5>
						<div className="flex flex-col md:flex-row md:justify-between">
							<div className="mb-[16px] flex w-full flex-col items-center rounded-[16px] border-[2px] p-[16px] md:mr-[8px] md:mb-0">
								<img src="/ballotready/ballot-yellow.svg" alt="ballot-yellow" />
								<p className="text-h8 font-kondolar mt-[10px] font-bold">
									ประชามติแก้รัฐธรรมนูญคืออะไร ?
								</p>
								<p className="text-b5 mt-[6px]">
									การสอบถามประชาชนว่าเห็นชอบหรือไม่กับการจัดทำรัฐธรรมนูญฉบับใหม่
									ซึ่งหากประชาชนเสียงข้างมากลงมติว่า “เห็นชอบ”
									จะเป็นการเริ่มต้นกระบวนการร่างรัฐธรรมนูญใหม่ต่อไป
								</p>
								<p className="text-b5 mt-[8px]">อ่านเนื้อหาเพิ่มเติมได้ที่</p>
								<a
									target="_blank"
									className="underline"
									href="https://conforall.com"
								>
									conforall.com
								</a>
							</div>
						</div>
						<div className="py-[24px]">
							<p className="font-kondolar text-[15px] font-bold">
								ในบัตรออกเสียงประชามติ
							</p>
							<p className="font-kondolar text-[18px] font-bold">
								จะมีคำถาม 1 ข้อ
							</p>
							<p className="mt-[8px] text-[14px]">
								ท่านเห็นชอบว่าสมควรมีรัฐธรรมนูญฉบับใหม่หรือไม่
							</p>
						</div>
						<div className="flex flex-col gap-[14px] rounded-[16px] bg-[#FBF8F4] px-[14px] py-[24px] md:px-[32px]">
							<div className="text-[14px]">
								<p>
									คุณต้องเลือกตอบว่า <span className="font-bold">เห็นชอบ</span>
									หรือ <span className="font-bold">ไม่เห็นชอบ</span>
								</p>
								<p>
									โดยทำเครื่องหมายกากบาท (X) ในช่องทำเครื่องหมายเพียงช่องเดียว
								</p>
							</div>
							<div className="flex justify-between">
								<div className="flex flex-col gap-[8px]">
									<p className="border-[1px] px-[8px] py-[4px] text-[12px] font-bold md:py-[8px] md:text-[14px]">
										เห็นชอบ
									</p>
									<img
										className="h-[32px] md:h-[60px]"
										src="/ballotready/vote-icon.svg"
										alt="vote-icon"
									/>
								</div>
								<div className="flex items-center justify-center">
									<img
										className="w-[16px]"
										src="/ballotready/caret-left.svg"
										alt="caret-left"
									/>
									<p className="text-b6">ช่องทำเครื่องหมาย</p>
									<img
										className="w-[16px] rotate-180"
										src="/ballotready/caret-left.svg"
										alt="caret-left"
									/>
								</div>
								<div className="flex flex-col gap-[8px]">
									<p className="border-[1px] px-[8px] py-[4px] text-[12px] font-bold md:py-[8px] md:text-[14px]">
										ไม่เห็นชอบ
									</p>
									<img
										className="h-[32px] md:h-[60px]"
										src="/ballotready/vote-icon.svg"
										alt="vote-icon"
									/>
								</div>
							</div>
							<div className="h-[1px] border-[1px]"></div>
							<div className="flex items-center justify-between">
								<p className="max-w-[221px] text-[14px]">
									ถ้าไม่ประสงค์แสดงความคิดเห็น ให้ทำเครื่องหมายกากบาท (X)ในช่อง
									&apos;ไม่แสดงความคิดเห็น&apos;
								</p>
								<img
									className="w-[32px] rotate-180"
									src="/ballotready/caret-left.svg"
									alt="caret-left"
								/>
								<div className="flex flex-col gap-[8px]">
									<p className="max-w-[100px] border-[1px] px-[8px] py-[4px] text-[12px] font-bold md:py-[8px] md:text-[14px]">
										ไม่แสดงความคิดเห็น
									</p>
									<img
										className="h-[32px] md:h-[60px]"
										src="/ballotready/vote-icon.svg"
										alt="vote-icon"
									/>
								</div>
							</div>
						</div>
					</div>
				)}
			</div>
		</div>
	);
}
