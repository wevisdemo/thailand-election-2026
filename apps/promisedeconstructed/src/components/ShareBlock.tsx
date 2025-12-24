'use client';

import { ElectionButton, ElectionSharer } from '@election/ui/react';
import { useRouter } from 'next/navigation';

interface ShareBlockProps {
	showAboutButton?: boolean;
	className?: string;
}

export const ShareBlock = ({
	showAboutButton = true,
	className,
}: ShareBlockProps) => {
	const router = useRouter();

	return (
		<div
			className={`flex flex-col items-center gap-2.5 pt-10 pb-15 ${className}`}
		>
			<span className="text-b5 font-bold">แชร์หน้านี้</span>
			<ElectionSharer />
			{showAboutButton && (
				<ElectionButton
					twClass="typo-h10 font-kondolar font-bold"
					onClick={() => {
						router.push('/about');
					}}
				>
					เกี่ยวกับโครงการ
				</ElectionButton>
			)}
		</div>
	);
};
