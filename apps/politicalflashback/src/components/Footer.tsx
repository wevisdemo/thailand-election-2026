import {
	ElectionButton,
	ElectionFooter,
	ElectionSharer,
} from '@election/ui/react';
import { useRouter } from 'next/navigation';
const Footer = () => {
	const router = useRouter();
	return (
		<div>
			{/* <ElectionAboutActions dataUrl="#" /> */}
			<div className="flex w-full flex-col gap-10 bg-white pt-10">
				<div className="flex flex-col items-center justify-center gap-2 pb-5">
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
