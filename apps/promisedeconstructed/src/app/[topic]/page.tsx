import { BackBar } from '@/components/BackBar';
import { ShareBlock } from '@/components/ShareBlock';
import { TopicBody } from '@/components/Topic/TopicBody';
import { fetchData, slugifySubCategory } from '@/utils/data';

export async function generateStaticParams() {
	const data = await fetchData();
	return data.subCategories.map((subCategory) => {
		const topic = slugifySubCategory(subCategory);
		return {
			topic:
				process.env.NODE_ENV === 'production'
					? topic
					: encodeURIComponent(topic),
		};
	});
}

export default async function TopicPage({ params }: PageProps<'/[topic]'>) {
	const { topic } = await params;
	const decodedTopic = decodeURIComponent(topic);

	const data = await fetchData();

	return (
		<main className="bg-green-3">
			<BackBar>
				<span className="text-h11 font-sriracha">Promise Deconstructed</span>
				<span className="text-box-cap">หน้าหลัก</span>
			</BackBar>
			<TopicBody topic={decodedTopic} data={data} />
			<ShareBlock />
		</main>
	);
}
