import { ElectionFooter, ElectionNavbar } from '@election/ui/react';
import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
	title: 'Promise Deconstructed: ถอดโครงสร้างสัญญาพรรคการเมือง',
	description: 'ดูให้ชัดก่อนตัดสินใจ พรรคไหนจะทำอะไร เมื่อไหร่ และเพื่อใคร',
	metadataBase: new URL('https://election69.wevis.info'),
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="th">
			<head>
				<link
					href="https://fonts.googleapis.com/css2?family=IBM+Plex+Sans+Thai+Looped:wght@400;600;700&family=Sriracha&display=swap"
					rel="stylesheet"
				/>
				<link
					href="https://design-systems.wevis.info/typography.css"
					rel="stylesheet"
				/>
				<meta
					name="apple-mobile-web-app-title"
					content="Promise Deconstructed"
				/>
			</head>
			<body>
				<ElectionNavbar />
				{children}
				<ElectionFooter />
			</body>
		</html>
	);
}
