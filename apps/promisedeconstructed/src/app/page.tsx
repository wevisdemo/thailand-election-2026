import { HomeBody } from '@/components/Home/HomeBody';
import { ShareBlock } from '@/components/ShareBlock';
import { getHomeData } from '@/utils/data';

export default async function Home() {
	const homeData = await getHomeData();

	return (
		<main className="bg-bg">
			<HomeBody homeData={homeData} />
			<ShareBlock />
		</main>
	);
}
