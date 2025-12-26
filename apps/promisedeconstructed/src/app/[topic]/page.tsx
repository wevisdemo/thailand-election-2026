import { BackBar } from '@/components/BackBar';
import { ShareBlock } from '@/components/ShareBlock';

export async function generateStaticParams() {
	return [{ topic: 'test' }];
}

export default async function TopicPage({ params }: PageProps<'/[topic]'>) {
	const { topic } = await params;
	return (
		<main className="bg-green-3">
			<BackBar>
				<span className="text-h11 font-sriracha">Promise Deconstructed</span>
				<span className="text-box-cap">หน้าหลัก</span>
			</BackBar>
			<div className="flex flex-col items-center text-center">
				<p className="text-h7 font-kondolar font-bold">ปัญหา</p>
				<h1 className="text-h3 font-kondolar font-bold">{topic}</h1>
			</div>
			<ShareBlock />
		</main>
	);
}
