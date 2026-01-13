import type { Metadata } from 'next';
import './globals.css';
import { ElectionNavbar } from '@election/ui/react';

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

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<head>
				<link
					href="https://fonts.googleapis.com/css2?family=IBM+Plex+Sans+Thai+Looped:wght@400;600;700&family=Sriracha&display=swap"
					rel="stylesheet"
				/>
				<link
					href="https://design-systems.wevis.info/typography.css"
					rel="stylesheet"
				/>
				<script
					defer
					data-domain="election69.wevis.info"
					src="https://analytics.punchup.world/js/script.js"
				></script>
			</head>

			<body>
				<ElectionNavbar className="fixed top-0 z-[9999] w-full" />
				{children}
			</body>
		</html>
	);
}
