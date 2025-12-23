import Footer from '@/src/components/Footer';
import Button from '@/src/components/Button';
import Image from 'next/image';

const TOTAL_STEPS = 3;

interface StepContainerProps {
	currentStep: number;
	onNext: () => void;
	onBack: () => void;
}

const StepContainer = ({ currentStep, onNext, onBack }: StepContainerProps) => {
	return (
		<div className="bg-bg flex h-screen min-h-screen flex-col">
			<div className="mx-auto flex w-full max-w-[600px] flex-1 flex-col items-center justify-between gap-6 px-4 py-6">
				{/* Step indicator */}
				<div className="flex items-center gap-2">
					{[1, 2, 3].map((step) => (
						<div
							key={step}
							className={`h-2 w-8 rounded-full transition-colors ${
								step === currentStep
									? 'bg-purple-1'
									: step < currentStep
										? 'bg-purple-1/50'
										: 'bg-gray-300'
							}`}
						/>
					))}
				</div>

				{/* Step content */}
				<div className="flex flex-col items-center justify-center gap-4 pb-1 text-center">
					{currentStep === 1 && (
						<div className="flex flex-col items-center justify-center gap-6 text-center">
							<Image
								src="/politicalflashback/img/so-many-news.svg"
								alt="step-1"
								width={100}
								height={100}
								className="w-full"
							/>
							<p className="text-h5 font-kondolar font-bold">
								จำได้มั้ย ตั้งแต่
								<br className="block md:hidden" />
								<span className="text-purple-1">#ประยุทธ์ยุบสภา66</span>
								<br className="block md:hidden" /> ถึง{' '}
								<span className="text-purple-1">#อนุทินยุบสภา68</span>
								<br className="block md:hidden" /> เกิดอะไรขึ้นบ้าง?
							</p>
							<div className="flex flex-col items-center justify-center gap-4">
								<p className="text-b4 text-center">
									ในเวลา 998 วันนั้น การเมืองไทย
									<br className="block md:hidden" />
									ผ่านนายกรัฐมนตรีไปแล้ว 3 คน
									<br className="block md:hidden" />
									และมีประเด็นร้อนถี่ยิ่งกว่ารายสัปดาห์
									<br className="block md:hidden" />
									จนจำกันแทบไม่ไหว
								</p>
								<p>
									ดังนั้น ก่อนจะไปถึง #เลือกตั้ง69 WeVis
									<br className="block md:hidden" />
									ขอชวนคุณมาระลึกชาติ จะได้ไม่เป็น
									<br className="block md:hidden" />
									<span className="bg-green-3 w-fit font-bold">
										“คนไทยลืมง่าย”
									</span>{' '}
									อย่างที่เขาว่ากัน
								</p>
							</div>
						</div>
					)}
					{currentStep === 2 && (
						<div className="flex flex-col items-center justify-center gap-6 text-center">
							<Image
								src="/politicalflashback/img/articles-to-stories.svg"
								alt="step-1"
								width={100}
								height={100}
								className="w-full"
							/>
							<p className="text-h5 font-kondolar font-bold">
								WeVis รวบรวม
								<br className="block md:hidden" />
								<span className="text-purple-1">7X,XXX ข่าวการเมือง</span>
								<br className="block md:hidden" /> มาเป็น XXX ประเด็นร้อน
								<br className="block md:hidden" /> ให้คุณได้ระลึกชาติ
							</p>
							<div className="flex flex-col items-center justify-center gap-4">
								<p className="text-b4 text-center">
									ทีมงานได้รวบรวมพาดหัวข่าวทั้งหมดในหมวด
									<br className="block md:hidden" />
									“ข่าวการเมือง” จาก 4 สำนักข่าวออนไลน์
									<br className="block md:hidden" />
									ที่____ ที่สุด อ้างอิงจาก____________
									<br className="block md:hidden" />
									ได้แก่ ไทยรัฐออนไลน์, ThaiPBS,
									<br className="block md:hidden" />
									THE STANDARD, และ อมรินทร์ทีวี
								</p>
								<div className="flex items-center justify-center gap-4">
									<Image
										src="/politicalflashback/img/image-2.svg"
										alt="thairat"
										width={40}
										height={40}
									/>
									<Image
										src="/politicalflashback/img/image-3.svg"
										alt="thairat"
										width={40}
										height={40}
									/>
									<Image
										src="/politicalflashback/img/image-4.svg"
										alt="thairat"
										width={40}
										height={40}
									/>
									<Image
										src="/politicalflashback/img/image-5.svg"
										alt="thairat"
										width={40}
										height={40}
									/>
								</div>
								<p>
									โดยข้อมูลเริ่มตั้งแต่{' '}
									<span className="bg-green-3 w-fit font-bold">
										20 มีนาคม พ.ศ. 2566
									</span>
									<br className="block md:hidden" />
									(ประยุทธ์ จันทร์โอชา ยุบสภาฯ){' '}
									<span className="bg-green-3 w-fit font-bold">
										ถึง 12 ธันวาคม
									</span>
									<br className="block md:hidden" />
									<span className="bg-green-3 w-fit font-bold">พ.ศ. 2568</span>
									(อนุทิน ชาญวีรกุล ยุบสภาฯ)
									<br className="block md:hidden" />
									เพื่อให้ครอบคลุมเหตุการณ์ตั้งแต่ช่วงเลือกตั้ง
									<br className="block md:hidden" />
									ครั้งที่แล้ว จนถึงจุดสิ้นสุดของรัฐสภาชุดล่าสุด
								</p>
								<p>
									จากนั้น เรานำข่าวที่ได้มาจัดกลุ่มตามประเด็น
									<br className="block md:hidden" />
									ให้ตามอ่านได้ง่าย โดยอ้างอิงเบื้องต้นจาก
									<br className="block md:hidden" />
									แท็กที่ติดอยู่กับแต่ละบทความข่าว
									<br className="block md:hidden" />
									จน
									<span className="bg-green-3 w-fit font-bold">
										สรุปออกมาได้เป็นประเด็นร้อน
									</span>
									<br className="block md:hidden" />
									<span className="bg-green-3 w-fit font-bold">
										ทั้งหมด XXX ประเด็น
									</span>
								</p>
							</div>
						</div>
					)}
					{currentStep === 3 && (
						<div className="flex flex-col items-center justify-center gap-6 text-center">
							<Image
								src="/politicalflashback/img/fav-stories.svg"
								alt="step-1"
								width={100}
								height={100}
								className="w-full"
							/>
							<p className="text-h5 font-kondolar font-bold">
								อ่านอย่างเดียวไม่พอ!
								<br className="block md:hidden" />
								ลองจัดลำดับ
								<span className="text-purple-1">ประเด็นสุดพีค</span>
								<br className="block md:hidden" /> ของคุณ แล้วบันทึกไปแชร์ต่อ
							</p>
							<div className="flex flex-col items-center justify-center gap-4">
								<p className="text-b4 text-center">
									เพราะประเด็นลืมไม่ลงของแต่ละคน
									<br className="block md:hidden" />
									ไม่เหมือนกัน หลังระลึกชาติจนกระจ่าง{' '}
									<br className="block md:hidden" />
									WeVis ขอชวนคุณลองจัดลำดับ <br className="block md:hidden" />
									<span className="bg-green-3 w-fit font-bold">
										“Top 5 ประเด็นสุดพีคของฉัน”
									</span>
								</p>
								<p>
									ถ้าจัดอันดับเสร็จแล้ว ก็สามารถเซฟผล
									<br className="block md:hidden" />
									ไปแชร์ต่อได้ และเรามี
									<span className="bg-green-3 w-fit font-bold">
										สถิติประเด็นร้อน
									</span>
									<br className="block md:hidden" />
									<span className="bg-green-3 w-fit font-bold">
										ที่คนอื่นๆ เคยเลือกติด Top ไว้
									</span>
									ให้ดูด้วย
								</p>
								<p>ถ้าพร้อมแล้ว ไปเริ่มระลึกชาติกันเลย</p>
							</div>
						</div>
					)}
				</div>

				{/* Navigation buttons */}
				<div className="flex w-full gap-3 pb-4">
					<Button
						onClick={onBack}
						className="typo-h9 font-kondolar border-gray-2 w-full rounded-full bg-transparent font-bold text-black"
					>
						ย้อนกลับ
					</Button>

					<Button
						onClick={onNext}
						className="typo-h9 font-kondolar bg-purple-1 border-purple-1 w-full rounded-full font-bold text-white"
					>
						{currentStep === 3 ? 'เริ่มเลย!' : 'ต่อไป'}
					</Button>
				</div>
			</div>

			<Footer />
		</div>
	);
};

export default StepContainer;
