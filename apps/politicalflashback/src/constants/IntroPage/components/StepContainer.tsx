import Footer from '@/src/components/Footer';
import Button from '@/src/components/Button';
import { ElectionNavbar } from '@election/ui/react';

const TOTAL_STEPS = 3;

interface StepContainerProps {
	currentStep: number;
	onNext: () => void;
	onBack: () => void;
}

const StepContainer = ({ currentStep, onNext, onBack }: StepContainerProps) => {
	return (
		<div className="bg-bg flex h-screen min-h-screen flex-col">
			<ElectionNavbar />
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
				<div className="flex flex-col items-center justify-center gap-4 text-center">
					{currentStep === 1 && (
						<div className="flex flex-col items-center justify-center gap-2 text-center">
							<p className="text-h4 font-kondolar font-bold">
								ยังจำได้มั้ย? ตั้งแต่
								<br className="block md:hidden" />
								<span className="text-purple-1">#ประยุทธ์ยุบสภา66</span>
								<br className="block md:hidden" /> ถึง{' '}
								<span className="text-purple-1">#อนุทินยุบสภา68</span>
								<br className="block md:hidden" /> มีอะไรเกิดขึ้นบ้าง?
							</p>
							<p className="text-b4">
								lorem ipsum dolor sit amet lorem ipsum dolor sit amet lorem
								ipsum dolor sit amet lorem ipsum dolor sit amet
							</p>
						</div>
					)}
					{currentStep === 2 && (
						<div className="flex flex-col items-center justify-center gap-2 text-center">
							<p className="text-h4 font-kondolar font-bold">
								WeVis รวบรวมประเด็น
								<br className="block md:hidden" /> การเมืองจาก XX,XXX
								<br className="block md:hidden" /> ข่าว มาให้คุณได้ระลึกชาติ
							</p>
							<p className="text-b4">
								Methodology lorem ipsum dolor sit amet lorem ipsum dolor sit
								amet lorem ipsum dolor sit amet lorem ipsum dolor sit amet
							</p>
						</div>
					)}
					{currentStep === 3 && (
						<div className="flex flex-col items-center justify-center gap-2 text-center">
							<p className="text-h4 font-kondolar font-bold">
								ดูแล้วก็ลองจัดลำดับ
								<br className="block md:hidden" /> ประเด็นสุดพีคของคุณ
							</p>
							<p className="text-b4">
								Methodology lorem ipsum dolor sit amet lorem ipsum dolor sit
								amet lorem ipsum dolor sit amet lorem ipsum dolor sit amet
							</p>
							<div className="bg-purple-3 mt-2 flex h-[142px] w-[142px] items-center justify-center rounded-full">
								<p className="text-h8 font-kondolar font-bold">
									#ประยุทธ์
									<br /> ยุบสภา2566
								</p>
							</div>
						</div>
					)}
				</div>

				{/* Navigation buttons */}
				<div className="flex w-full gap-3">
					<Button
						onClick={onBack}
						className="typo-h9 font-kondolar border-purple-1 border-gray-2 w-full rounded-full bg-transparent font-bold text-black"
					>
						ย้อนกลับ
					</Button>
					{currentStep < TOTAL_STEPS && (
						<Button
							onClick={onNext}
							className="typo-h9 font-kondolar bg-purple-1 border-purple-1 w-full rounded-full font-bold text-white"
						>
							ต่อไป
						</Button>
					)}
				</div>
			</div>

			<Footer />
		</div>
	);
};

export default StepContainer;
