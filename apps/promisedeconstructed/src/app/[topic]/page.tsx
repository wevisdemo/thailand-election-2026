import { BackBar } from '@/components/BackBar';
import { ShareBlock } from '@/components/ShareBlock';
import { TopicBody } from '@/components/Topic/TopicBody';
import {
	getTopicData,
	getTopicSubCategoryData,
	slugifySubCategory,
} from '@/utils/data';
import type { Metadata } from 'next';
import { metadata } from '../layout';

export async function generateStaticParams() {
	const data = await getTopicSubCategoryData();
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

export async function generateMetadata({
	params,
}: PageProps<'/[topic]'>): Promise<Metadata> {
	const { topic } = await params;
	const decodedTopic = decodeURIComponent(topic);

	return {
		...metadata,
		title: `${decodedTopic} — Promise Deconstructed: ถอดโครงสร้างสัญญาพรรคการเมือง`,
		openGraph: {
			...metadata.openGraph,
			title: `${decodedTopic} — Promise Deconstructed: ถอดโครงสร้างสัญญาพรรคการเมือง`,
		},
		twitter: {
			...metadata.twitter,
			title: `${decodedTopic} — Promise Deconstructed: ถอดโครงสร้างสัญญาพรรคการเมือง`,
		},
	};
}

export default async function TopicPage({ params }: PageProps<'/[topic]'>) {
	const { topic } = await params;
	const decodedTopic = decodeURIComponent(topic);

	const topicData = await getTopicData(decodedTopic);

	return (
		<main className="bg-green-3">
			<BackBar>
				<span className="text-h11 font-sriracha">Promise Deconstructed</span>
				<span className="text-box-cap">หน้าหลัก</span>
			</BackBar>
			<TopicBody topicData={topicData} />
			<ShareBlock />
		</main>
	);
}
