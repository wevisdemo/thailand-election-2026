'use client';

import Footer from '@/src/components/Footer';
import { ElectionNavbar } from '@election/ui/react';
import Image from 'next/image';
import { useState } from 'react';
import StepContainer from './components/StepContainer';
import Button from '@/src/components/Button';
import { useRouter } from 'next/navigation';

const TOTAL_STEPS = 3;

const IntroPage = () => {
	const [currentStep, setCurrentStep] = useState(0); // 0 = intro, 1-3 = steps
	const router = useRouter();
	const handleStart = () => {
		setCurrentStep(1);
	};

	const handleNext = () => {
		if (currentStep < TOTAL_STEPS) {
			setCurrentStep(currentStep + 1);
		}
		if (currentStep === TOTAL_STEPS) {
			router.push('/home');
		}
	};

	const handleBack = () => {
		if (currentStep > 1) {
			setCurrentStep(currentStep - 1);
		} else {
			setCurrentStep(0); // Back to intro
		}
	};

	// Intro screen
	if (currentStep === 0) {
		return (
			<div className="bg-bg flex h-screen min-h-screen flex-col justify-between">
				<div className="mx-auto flex max-w-[600px] flex-col items-center justify-center gap-6 px-4 py-10">
					<Image
						src="/politicalflashback/img/intro-img.svg"
						alt="intro-page"
						width={500}
						height={500}
						className="h-full w-[182px] object-contain"
					/>
					<div className="flex flex-col items-center justify-center gap-2">
						<p className="text-h7 font-sriracha text-purple-1 text-center">
							A Political Flashback
						</p>
						<p className="text-h3 font-kondolar text-center font-bold">
							ระลึกชาติ
							<br className="block md:hidden" /> การเมืองไทย
						</p>
						<p className="text-b4 text-center font-normal">
							จากเลือกตั้ง 66 สู่สภาล้มลุกคลุกคลาน <br />
							การเมืองแห่งการเปลี่ยนผ่าน: คุณพลาด <br />
							'ปมร้อน' อะไรไปบ้างหรือเปล่านะ?
						</p>
					</div>
					<Button
						onClick={handleStart}
						className="typo-h9 font-kondolar bg-purple-1 border-purple-1 flex w-full items-center justify-between gap-2 rounded-full font-bold text-white"
					>
						<div></div>
						<p className="">เริ่มเลย</p>
						<Image
							src="/politicalflashback/icon/arrow-right.svg"
							alt="arrow-right"
							width={31}
							height={20}
							className=""
						/>
					</Button>
				</div>

				<Footer />
			</div>
		);
	}

	// Step screens (1, 2, 3)
	return (
		<StepContainer
			currentStep={currentStep}
			onNext={handleNext}
			onBack={handleBack}
		/>
	);
};

export default IntroPage;
