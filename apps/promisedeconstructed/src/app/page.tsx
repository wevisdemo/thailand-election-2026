import { HomeBody } from '@/components/Home/HomeBody';
import { ShareBlock } from '@/components/ShareBlock';
import { fetchData } from '@/utils/data';

export default async function Home() {
	const data = await fetchData();

	return (
		<main className="bg-bg">
			<HomeBody data={data} />
			<ShareBlock />
		</main>
	);
}
