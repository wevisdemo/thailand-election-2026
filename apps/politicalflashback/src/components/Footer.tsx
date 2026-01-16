import {
	ElectionButton,
	ElectionFooter,
	ElectionSharer,
} from '@election/ui/react';
import { useRouter } from 'next/navigation';

interface FooterProps {
	showBackHomeButton?: boolean;
}

const Footer = ({ showBackHomeButton }: FooterProps) => {
	const router = useRouter();
	return (
		<div>
			{/* <ElectionAboutActions dataUrl="#" /> */}
			<div className="flex w-full flex-col gap-10 bg-white pt-10">
				<div
					className={`flex flex-col items-center justify-center pb-5 ${showBackHomeButton ? 'gap-8' : 'gap-2'}`}
				>
					{showBackHomeButton && (
						<ElectionButton
							twClass="typo-b6 self-center font-bold"
							compact
							onClick={() => {
								if (confirm('คุณแน่ใจหรือไม่ว่าต้องการกลับไปหน้าแรก?')) {
									router.push('/');
								}
							}}
						>
							เริ่มเล่นใหม่ จากหน้าแรก
						</ElectionButton>
					)}
					{showBackHomeButton && (
						<div className="mx-auto h-0 w-[240px] border-t border-t-black" />
					)}

					<ElectionSharer />
					<ElectionButton
						twClass="typo-b6 self-center font-bold"
						compact
						onClick={() => router.push('/about')}
					>
						เกี่ยวกับโครงการ
					</ElectionButton>
				</div>
				<ElectionFooter />
			</div>
		</div>
	);
};

export default Footer;
