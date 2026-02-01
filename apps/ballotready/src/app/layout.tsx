import type { Metadata } from 'next';
import './globals.css';
import { WarningBanner } from './component/warning-banner';
import MaintenanceModal from './component/MaintenanceModal';

export const metadata: Metadata = {
	icons: '/favicon.png',
	title: 'Ballot Ready เข้าคูหารอบนี้ ต้องเลือกอะไรบ้าง ?',
	description:
		'หนึ่งในโปรเจกต์ของ Campaign #WeVisElection69 ที่ให้คุณได้เตรียมตัวเลือกตั้งอย่างมั่นใจ เริ่มจากทำความรู้จักผู้สมัคร สส. และพรรคการเมืองในตำบลหรือเขตเลือกตั้งของคุณว่ามีใครให้เลือกบ้าง พร้อมเข้าใจบัตรเลือกตั้งว่ามีกี่ใบและต้องกาอย่างไรให้ไม่เสียสิทธิ',
	openGraph: {
		title: 'Ballot Ready เข้าคูหารอบนี้ ต้องเลือกอะไรบ้าง ?',
		description:
			'หนึ่งในโปรเจกต์ของ Campaign #WeVisElection69 ที่ให้คุณได้เตรียมตัวเลือกตั้งอย่างมั่นใจ เริ่มจากทำความรู้จักผู้สมัคร สส. และพรรคการเมืองในตำบลหรือเขตเลือกตั้งของคุณว่ามีใครให้เลือกบ้าง พร้อมเข้าใจบัตรเลือกตั้งว่ามีกี่ใบและต้องกาอย่างไรให้ไม่เสียสิทธิ',
		url: 'https://election69.wevis.info/ballotready',
		images: [
			{
				url: 'https://election69.wevis.info/ballotready/og-image.png',
				width: 1200,
				height: 630,
				alt: 'ballot ready image',
			},
		],
		type: 'website',
	},
	twitter: {
		card: 'summary_large_image',
		title: 'Ballot Ready เข้าคูหารอบนี้ ต้องเลือกอะไรบ้าง ?',
		description:
			'หนึ่งในโปรเจกต์ของ Campaign #WeVisElection69 ที่ให้คุณได้เตรียมตัวเลือกตั้งอย่างมั่นใจ เริ่มจากทำความรู้จักผู้สมัคร สส. และพรรคการเมืองในตำบลหรือเขตเลือกตั้งของคุณว่ามีใครให้เลือกบ้าง พร้อมเข้าใจบัตรเลือกตั้งว่ามีกี่ใบและต้องกาอย่างไรให้ไม่เสียสิทธิ',
		images: 'https://election69.wevis.info/ballotready/og-image.png',
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
			<body className="relative h-screen">
				<MaintenanceModal />
				<div className="h-screen overflow-hidden">
					{children}
					<WarningBanner />
				</div>
			</body>
		</html>
	);
}
