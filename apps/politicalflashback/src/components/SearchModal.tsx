'use client';

import { useState, useMemo } from 'react';
import Image from 'next/image';
import { Topic } from '@/src/stores/topicStore';

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

interface NewsByDate {
	date: string;
	news: NewsItem[];
}

// Helper function to extract source name from URL
const getSourceName = (url: string): string => {
	try {
		const urlObj = new URL(url);
		const hostname = urlObj.hostname;

		if (hostname.includes('thairath.co.th')) return 'ไทยรัฐ';
		if (hostname.includes('thaipbs.or.th') || hostname.includes('news.thaipbs'))
			return 'ไทยพีบีเอส';
		if (hostname.includes('thestandard.co')) return 'The Standard';
		if (hostname.includes('amarintv.com')) return 'อมรินทร์ทีวี';

		return hostname.replace('www.', '');
	} catch {
		return 'แหล่งข่าว';
	}
};

interface SearchModalProps {
	isOpen: boolean;
	searchQuery: string;
	setSearchQuery: (query: string) => void;
	onClose: () => void;
	topics: Topic[];
	storyData: StoryDetailsData | null;
	onTopicClick: (topic: Topic) => void;
}

const SearchModal = ({
	isOpen,
	searchQuery,
	setSearchQuery,
	onClose,
	topics,
	storyData,
	onTopicClick,
}: SearchModalProps) => {
	const INITIAL_NEWS_DISPLAY = 3;
	const [expandedDates, setExpandedDates] = useState<Set<string>>(new Set());
	const [expandedNewsCount, setExpandedNewsCount] = useState<
		Map<string, number>
	>(new Map());

	// Get trending topics (top topics by score)
	const trendingTopics = useMemo(() => {
		return [...topics].sort((a, b) => b.score - a.score).slice(0, 10);
	}, [topics]);

	// Filter topics based on search query
	const searchResults = useMemo(() => {
		if (!searchQuery.trim()) return [];
		const query = searchQuery.toLowerCase().trim();
		return topics.filter((topic) => topic.label.toLowerCase().includes(query));
	}, [searchQuery, topics]);

	// Search news headlines from story_details.json
	const newsSearchResults = useMemo(() => {
		if (!searchQuery.trim() || !storyData) return [];
		const query = searchQuery.toLowerCase().trim();
		const results: NewsItem[] = [];

		// Search through all tags, dates, and news items
		storyData.all_tag.forEach((tag) => {
			tag.tag_news.forEach((tagNews) => {
				tagNews.news.forEach((newsItem) => {
					if (newsItem.name.toLowerCase().includes(query)) {
						// Avoid duplicates by checking if news item with same id already exists
						if (!results.find((item) => item.id === newsItem.id)) {
							results.push({
								...newsItem,
								date: tagNews.date,
							});
						}
					}
				});
			});
		});

		return results;
	}, [searchQuery, storyData]);

	// Group news items by date
	const newsByDate = newsSearchResults.reduce(
		(acc, newsItem) => {
			const date = newsItem.date || 'ไม่มีวันที่';
			if (!acc[date]) {
				acc[date] = [];
			}
			acc[date].push(newsItem);
			return acc;
		},
		{} as Record<string, NewsItem[]>,
	);

	// Convert to array and sort by date (most recent first)
	const newsGroups: NewsByDate[] = Object.entries(newsByDate)
		.map(([date, news]) => ({ date, news }))
		.sort((a, b) => {
			// Sort by date string (assuming format like "4 ธ.ค. 68")
			return b.date.localeCompare(a.date);
		});

	const toggleDateExpansion = (date: string, totalNews: number) => {
		const newExpanded = new Set(expandedDates);
		const newCount = new Map(expandedNewsCount);

		if (newExpanded.has(date)) {
			newExpanded.delete(date);
			newCount.set(date, INITIAL_NEWS_DISPLAY);
		} else {
			newExpanded.add(date);
			newCount.set(date, totalNews);
		}

		setExpandedDates(newExpanded);
		setExpandedNewsCount(newCount);
	};

	const getDisplayNewsCount = (date: string, totalNews: number): number => {
		return expandedNewsCount.get(date) || INITIAL_NEWS_DISPLAY;
	};

	const remainingNewsCount = (
		date: string,
		displayed: number,
		total: number,
	) => {
		return total - displayed;
	};

	if (!isOpen) return null;

	return (
		<div className="fixed inset-0 z-50 flex flex-col bg-[#FBF8F4]">
			{/* Header with search bar */}
			<div className="w-full bg-[#FBF8F4] pt-10 md:pt-20">
				<div className="mx-auto flex max-w-[600px] items-center gap-2 px-4 py-4 sm:gap-4 md:px-6">
					{/* Search input */}
					<div className="flex flex-1 items-center gap-2 rounded-full border-2 border-black bg-white px-4 py-3">
						<Image
							src="/politicalflashback/icon/icon-search.svg"
							alt="Search"
							width={24}
							height={24}
						/>
						<input
							type="text"
							value={searchQuery}
							onChange={(e) => setSearchQuery(e.target.value)}
							placeholder="ค้นหาประเด็น/ข่าว..."
							className="text-h9 font-kondolar flex-1 bg-transparent outline-none placeholder:text-gray-400"
							autoFocus
						/>
						{searchQuery && (
							<button
								// onClick={() => setSearchQuery('')}
								className="flex items-center justify-center"
							>
								<Image
									src="/politicalflashback/icon/icon-search.svg"
									alt="Clear"
									width={20}
									height={20}
								/>
							</button>
						)}
					</div>
					{/* Close button */}
					<button
						onClick={onClose}
						className="flex items-center justify-center rounded-full border-2 border-black bg-white p-2 transition-colors hover:bg-gray-100"
					>
						<Image
							src="/politicalflashback/icon/close.svg"
							alt="Close"
							width={24}
							height={24}
						/>
					</button>
				</div>
			</div>

			{/* Search Content */}
			<div className="flex-1 overflow-y-auto">
				<div className="mx-auto max-w-[600px] md:px-6">
					{!searchQuery ? (
						/* Trending Topics */
						<div>
							<div className="bg-green-3 mb-4 flex h-full items-center justify-between gap-2 px-4 py-2">
								<div className="flex items-center gap-2">
									<Image
										src="/politicalflashback/icon/fire.svg"
										alt="Fire"
										width={24}
										height={24}
										className="brightness-0"
									/>
									<h2 className="text-h8 font-kondolar font-bold text-black">
										ประเด็นร้อน
									</h2>
								</div>

								<span className="text-b5 font-kondolar text-gray-600">10</span>
							</div>
							<div className="flex flex-wrap gap-2 px-4">
								{trendingTopics.map((topic) => (
									<button
										key={topic.id}
										onClick={() => onTopicClick(topic)}
										className="bg-purple-3 hover:bg-purple-2 rounded-2xl px-4 py-2 transition-colors"
									>
										<p className="text-h9 font-kondolar font-bold text-black">
											{topic.label}
										</p>
									</button>
								))}
							</div>
						</div>
					) : (
						/* Search Results */
						<div className="flex flex-col gap-6">
							{/* Hot Issues Section */}
							<div>
								<div className="bg-green-3 mb-4 flex h-full items-center justify-between gap-2 px-4 py-2">
									<div className="flex items-center gap-2">
										<Image
											src="/politicalflashback/icon/fire.svg"
											alt="Fire"
											width={24}
											height={24}
											className="brightness-0"
										/>
										<h2 className="text-h8 font-kondolar font-bold text-black">
											ประเด็นร้อน
										</h2>
									</div>

									<span className="text-b5 font-kondolar text-gray-600">
										{searchResults.length}
									</span>
								</div>
								{searchResults.length > 0 ? (
									<div className="flex flex-wrap gap-2 px-4">
										{searchResults.slice(0, 10).map((topic) => (
											<button
												key={topic.id}
												onClick={() => onTopicClick(topic)}
												className="bg-purple-3 hover:bg-purple-2 rounded-2xl px-4 py-2 transition-colors"
											>
												<p className="text-h9 font-kondolar font-bold text-black">
													{topic.label}
												</p>
											</button>
										))}
										{searchResults.length > 10 && (
											<button className="bg-purple-3 hover:bg-purple-2 rounded-full border-2 border-black px-4 py-2 transition-colors">
												<p className="text-h9 font-kondolar font-bold text-black">
													เพิ่มเติม ({searchResults.length - 10})...
												</p>
											</button>
										)}
									</div>
								) : (
									<p className="text-b5 font-kondolar px-4 text-center text-gray-600">
										ไม่พบประเด็นตามคำค้นหา
									</p>
								)}
							</div>

							{/* Headlines Section */}
							<div>
								<div className="bg-green-3 mb-4 flex h-full items-center justify-between gap-2 px-4 py-2">
									<div className="flex items-center gap-2">
										<Image
											src="/politicalflashback/icon/icon-comment.svg"
											alt="Fire"
											width={24}
											height={24}
										/>
										<h2 className="text-h8 font-kondolar font-bold text-black">
											พาดหัวข่าว
										</h2>
									</div>

									<span className="text-b5 font-kondolar text-gray-600">
										{newsSearchResults.length}
									</span>
								</div>
								{newsSearchResults.length > 0 ? (
									<div className="relative flex flex-col gap-4 px-4">
										{/* Vertical Timeline Line */}
										<div className="bg-purple-3 absolute top-0 bottom-0 left-8 w-0.5"></div>

										{newsGroups.map((newsGroup) => {
											const displayedCount = getDisplayNewsCount(
												newsGroup.date,
												newsGroup.news.length,
											);
											const isExpanded = expandedDates.has(newsGroup.date);
											const hasMore =
												newsGroup.news.length > INITIAL_NEWS_DISPLAY;
											const remaining = remainingNewsCount(
												newsGroup.date,
												displayedCount,
												newsGroup.news.length,
											);

											return (
												<div
													key={newsGroup.date}
													className="relative flex w-full flex-col gap-3"
												>
													{/* Date Header */}
													<div className="relative z-10 inline-flex w-full items-center">
														<span className="bg-purple-3 text-h9 font-kondolar w-full rounded-2xl px-4 py-2 font-bold text-black">
															{newsGroup.date}
														</span>
													</div>

													{/* News Items */}
													<div className="relative flex flex-col gap-3 pl-8">
														{newsGroup.news
															.slice(0, displayedCount)
															.map((newsItem, newsIndex) => (
																<div
																	key={`${newsGroup.date}-${newsItem.id}-${newsIndex}`}
																	className="relative flex flex-col gap-1"
																>
																	{/* Timeline Marker */}
																	<div className="bg-purple-3 absolute top-1 -left-[23px] z-10 h-4 w-4 rounded-full"></div>

																	<p className="text-h9 font-kondolar leading-relaxed font-bold text-black hover:underline">
																		{newsItem.name}
																	</p>
																	<a
																		href={newsItem.link}
																		target="_blank"
																		rel="noopener noreferrer"
																		className="text-b6 font-ibmplex text-green-1 flex items-center gap-1 underline"
																	>
																		{getSourceName(newsItem.link)}
																		<svg
																			xmlns="http://www.w3.org/2000/svg"
																			className="h-4 w-4"
																			fill="none"
																			viewBox="0 0 24 24"
																			stroke="currentColor"
																			strokeWidth={2}
																		>
																			<path
																				strokeLinecap="round"
																				strokeLinejoin="round"
																				d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
																			/>
																		</svg>
																	</a>
																</div>
															))}

														{/* Expand/Collapse Button */}
														{hasMore && (
															<button
																onClick={() =>
																	toggleDateExpansion(
																		newsGroup.date,
																		newsGroup.news.length,
																	)
																}
																className="text-b5 font-ibmplex text-green-1 flex items-center gap-1 self-start hover:underline"
															>
																{isExpanded
																	? 'แสดงน้อยลง'
																	: `เพิ่มเติม (${remaining})`}
																<Image
																	src="/politicalflashback/icon/chevron-up.svg"
																	alt={isExpanded ? 'Collapse' : 'Expand'}
																	width={16}
																	height={16}
																	className={`transition-transform ${isExpanded ? 'rotate-180' : ''}`}
																/>
															</button>
														)}
													</div>
												</div>
											);
										})}
									</div>
								) : (
									<p className="text-b5 font-kondolar px-4 text-center text-gray-600">
										ไม่พบพาดหัวข่าวตามคำค้นหา
									</p>
								)}
							</div>
						</div>
					)}
				</div>
			</div>
		</div>
	);
};

export default SearchModal;
