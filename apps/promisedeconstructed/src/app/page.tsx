import { HomeBody } from '@/components/Home/HomeBody';
import { ShareBlock } from '@/components/ShareBlock';
import { getHomeData } from '@/utils/data';
import dayjs from '@/utils/date';

export default async function Home() {
	const homeData = await getHomeData();
	const buildTime = dayjs().format('D MMM BBBB');

	return (
		<main className="bg-bg">
			<HomeBody homeData={homeData} buildTime={buildTime} />
			<ShareBlock />
		</main>
	);
}
