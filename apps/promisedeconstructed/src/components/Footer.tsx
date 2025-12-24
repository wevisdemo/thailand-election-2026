'use client';

import {
	ElectionButton,
	ElectionFooter,
	ElectionSharer,
} from '@election/ui/react';
import { usePathname } from 'next/navigation';

export const Footer = () => {
	const pathname = usePathname();
	return (
		<>
			<div className="flex flex-col items-center gap-2.5 pt-10 pb-15">
				<span className="text-b5 font-bold">แชร์หน้านี้</span>
				<ElectionSharer />
				{pathname !== '/about' && (
					<ElectionButton
						twClass="typo-h10 font-kondolar font-bold"
						onClick={() => {
							alert('LOL');
						}}
					>
						เกี่ยวกับโครงการ
					</ElectionButton>
				)}
			</div>
			<ElectionFooter />
		</>
	);
};
