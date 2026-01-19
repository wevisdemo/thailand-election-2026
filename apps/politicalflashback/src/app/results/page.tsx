import type { Metadata } from 'next';
import ResultsPage from '@/src/constants/ResultsPage';

export const metadata: Metadata = {
	metadataBase: new URL('https://election69.wevis.info'),
	title: 'ระลึกชาติ การเมืองไทย | Political Flashback',
	description:
		'การเมืองแห่งการเปลี่ยนผ่าน: คุณพลาด "ปมร้อน" อะไรไปบ้างหรือเปล่านะ?',
	openGraph: {
		title: 'ระลึกชาติ การเมืองไทย | Political Flashback',
		description:
			'การเมืองแห่งการเปลี่ยนผ่าน: คุณพลาด "ปมร้อน" อะไรไปบ้างหรือเปล่านะ?',
		type: 'website',
		locale: 'th_TH',
		url: 'https://election69.wevis.info/politicalflashback/',
		siteName: 'Political Flashbacks',
		images: ['/politicalflashback/img/og.png'],
	},
	twitter: {
		card: 'summary_large_image',
		title: 'ระลึกชาติ การเมืองไทย | Political Flashback',
		description:
			'การเมืองแห่งการเปลี่ยนผ่าน: คุณพลาด "ปมร้อน" อะไรไปบ้างหรือเปล่านะ?',
		images: ['/politicalflashback/img/og.png'],
	},
};

export default function Results() {
	return <ResultsPage />;
}
