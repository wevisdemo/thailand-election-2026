'use client';

import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import DragDropBubbles from './components/DragDropBubbles';
import DropZone from '../../components/DropZone';
import { useTopicStore, Topic } from '@/src/stores/topicStore';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import SearchModal from '@/src/components/SearchModal';

interface RawBubbleData {
	id: number;
	name: string;
	sum_new: number;
	radius: number;
	date: string;
	score: number;
	sub_tag: Array<{
		id: number;
		name: string;
		date: string;
	}>;
}

interface NewsItem {
	id: number;
	name: string;
	link: string;
	date?: string;
}

interface TagNews {
	date: string;
	news: NewsItem[];
}

interface TagData {
	id: number;
	name: string;
	sum_new: number;
	score: number;
	date: string;
	sub_tag: Array<{
		id: number;
		name: string;
	}>;
	chart: unknown;
	tag_news: TagNews[];
	photo: unknown[];
}

interface StoryDetailsData {
	all_tag: TagData[];
}

const HomePage = () => {
	const [loading, setLoading] = useState(true);
	const [isSearchOpen, setIsSearchOpen] = useState(false);
	const [searchQuery, setSearchQuery] = useState('');
	const [storyData, setStoryData] = useState<StoryDetailsData | null>(null);
	const { setTopics, selectedTopics, topics } = useTopicStore();
	const pathname = usePathname();
	const isHomePath =
		pathname === '/home' || pathname === '/politicalflashback/home';
	const isMonthlyPath =
		pathname === '/monthly' || pathname === '/politicalflashback/monthly';
	const router = useRouter();
	useEffect(() => {
		fetch('/politicalflashback/home_explore_view.json')
			.then((res) => res.json())
			.then((data: RawBubbleData[]) => {
				const transformedData: Topic[] = data.map((item) => ({
					id: String(item.id),
					label: item.name,
					score: item.score,
					value: item.sum_new,
					relatedIds: item.sub_tag.map((sub) => String(sub.id)),
				}));
				setTopics(transformedData);
				setLoading(false);
			})
			.catch((error) => {
				console.error('Failed to load bubble data:', error);
				setLoading(false);
			});
	}, [setTopics]);

	// Load story_details.json for news search
	useEffect(() => {
		fetch('/politicalflashback/story_details.json')
			.then((res) => res.json())
			.then((data: StoryDetailsData) => {
				setStoryData(data);
			})
			.catch((error) => {
				console.error('Failed to load story data:', error);
			});
	}, []);

	const handleSearchClick = () => {
		setIsSearchOpen(true);
	};

	const handleCloseSearch = () => {
		setIsSearchOpen(false);
		setSearchQuery('');
	};

	const handleTopicClick = (topic: Topic) => {
		router.push(`/story?name=${encodeURIComponent(topic.label)}`);
		handleCloseSearch();
	};

	if (loading) {
		return (
			<div className="bg-pattern flex min-h-screen w-full items-center justify-center">
				<div className="text-lg text-purple-600">Loading...</div>
			</div>
		);
	}

	return (
		<div className="bg-pattern relative max-h-screen w-full overflow-hidden">
			{/* Gradient overlay from top */}
			<div className="absolute top-10 right-0 left-0 z-20 h-[64px] w-full md:h-[80px]">
				{/* Gradient background */}
				<div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-[#FBF8F4] to-transparent"></div>

				{/* Navigation bar */}
				<div className="absolute right-0 bottom-0 left-0 mx-auto flex h-12 max-w-[600px] items-center gap-2 px-4 sm:gap-4 md:px-6">
					{/* Center - Filter buttons */}
					<div className="flex w-full items-center gap-1 sm:gap-2">
						<button
							className={`text-h9 font-kondolar w-full rounded-tl-full rounded-bl-full border-2 border-black px-5 py-3 font-bold transition-colors ${
								isHomePath
									? 'text-green-2 bg-black'
									: 'bg-white text-black hover:bg-gray-100'
							}`}
							onClick={() => router.push('/home')}
						>
							สำรวจ
						</button>
						<button
							className={`text-h9 font-kondolar w-full rounded-sm border-2 border-black px-2 py-3 font-bold transition-colors sm:px-3 ${
								isMonthlyPath
									? 'text-green-2 bg-black'
									: 'bg-white text-black hover:bg-gray-100'
							}`}
							onClick={() => router.push('/monthly')}
						>
							รายเดือน
						</button>
						<button
							className="text-h9 font-kondolar w-full rounded-tr-full rounded-br-full border-2 border-black bg-white px-5 py-3 font-bold text-black transition-colors hover:bg-gray-100"
							onClick={() => router.push('/listview')}
						>
							ทั้งหมด
						</button>
					</div>

					{/* Right side - Search button */}
					<button
						onClick={handleSearchClick}
						className="flex items-center justify-center rounded-full border-2 border-black bg-white p-1 transition-colors hover:bg-gray-100"
					>
						<Image
							src="/politicalflashback/icon/icon-search.svg"
							alt="Search"
							width={40}
							height={40}
						/>
					</button>
				</div>
			</div>

			{/* Main Chart Area */}
			<main className="relative z-10 flex-1" style={{ height: '100vh' }}>
				<DragDropBubbles />
			</main>

			{/* Drop Zone */}
			<DropZone />

			{/* Search Overlay */}
			<SearchModal
				isOpen={isSearchOpen}
				searchQuery={searchQuery}
				setSearchQuery={setSearchQuery}
				onClose={handleCloseSearch}
				topics={topics}
				storyData={storyData}
				onTopicClick={handleTopicClick}
			/>
		</div>
	);
};

export default HomePage;
