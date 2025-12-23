'use client';

import { useState, useEffect } from 'react';
import DragDropBubbles from './components/DragDropBubbles';
import DropZone from './components/DropZone';
import { useTopicStore, Topic } from '@/src/stores/topicStore';

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

const HomePage = () => {
	const [loading, setLoading] = useState(true);
	const { setTopics, selectedTopics } = useTopicStore();

	useEffect(() => {
		fetch('/politicalflashback/data_bubble.json')
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

	const handleHelpClick = () => {
		// Show help modal or tooltip
		console.log('Help clicked');
	};

	const handleExpandClick = () => {
		// Expand selected topics view
		console.log('Expand clicked');
		console.log(selectedTopics);
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
			<div className="pointer-events-none absolute top-0 right-0 left-0 z-20 h-[80px] w-full bg-linear-to-b from-[#FBF8F4] to-transparent md:top-14" />

			{/* Main Chart Area */}
			<main className="relative z-10 flex-1" style={{ height: '100vh' }}>
				<DragDropBubbles />
			</main>

			{/* Drop Zone */}
			<DropZone
				onHelpClick={handleHelpClick}
				onExpandClick={handleExpandClick}
			/>
		</div>
	);
};

export default HomePage;
