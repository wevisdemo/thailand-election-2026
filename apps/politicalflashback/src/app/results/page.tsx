import type { Metadata } from 'next';
import ResultsPage from '@/src/constants/ResultsPage';

export const metadata: Metadata = {
	metadataBase: new URL('https://election69.wevis.info'),
	title: 'ประเด็นสุดพีคของฉัน | Political Flashbacks',
	description:
		'ดูสรุปผลประเด็นสุดพีคของคุณ เปรียบเทียบกับประเด็นร้อนจากผู้ร่วมระลึกชาติคนอื่น',
	openGraph: {
		title: 'ประเด็นสุดพีคของฉัน | Political Flashbacks',
		description:
			'ดูสรุปผลประเด็นสุดพีคของคุณ เปรียบเทียบกับประเด็นร้อนจากผู้ร่วมระลึกชาติคนอื่น',
		type: 'website',
		locale: 'th_TH',
		url: 'https://election69.wevis.info/politicalflashback/',
		siteName: 'Political Flashbacks',
		images: ['/politicalflashback/img/og.png'],
	},
	twitter: {
		card: 'summary_large_image',
		title: 'ประเด็นสุดพีคของฉัน | Political Flashbacks',
		description:
			'ดูสรุปผลประเด็นสุดพีคของคุณ เปรียบเทียบกับประเด็นร้อนจากผู้ร่วมระลึกชาติคนอื่น',
		images: ['/politicalflashback/img/og.png'],
	},
};

export default function Results() {
	return <ResultsPage />;
}
