import { BackBar } from '@/components/BackBar';
import { ShareBlock } from '@/components/ShareBlock';
import { TopicBody } from '@/components/Topic/TopicBody';

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
			<TopicBody topic={topic} />
			<ShareBlock />
		</main>
	);
}
