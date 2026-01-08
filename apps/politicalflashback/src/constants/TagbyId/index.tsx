'use client';

import React, { useState, useEffect, useMemo, useRef } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import FireRating from '@/src/components/FireRating';
import DropZone from '@/src/components/DropZone';
import { useTopicStore } from '@/src/stores/topicStore';

interface SubTag {
	id: number;
	name: string;
}

interface ChartRange {
	start: string;
	end: string;
}

interface ChartBar {
	date: string;
	value: number;
}

interface ChartEvent {
	id: string;
	label: string;
	date: string;
	color: string;
}

interface Chart {
	range: ChartRange;
	bars: ChartBar[];
	events: ChartEvent[];
}

interface NewsItem {
	id: number;
	name: string;
	link: string;
}

interface TagNews {
	date: string;
	news: NewsItem[];
}

interface Photo {
	id: number;
	img: string;
	color?: string;
}

interface TagData {
	id: number;
	name: string;
	sum_new: number;
	score: number;
	date: string;
	sub_tag: SubTag[];
	chart: Chart;
	tag_news: TagNews[];
	photo: Photo[];
}

interface StoryDetailsData {
	all_tag: TagData[];
}

// Helper function to format date range in Thai
const formatDateRange = (startDate: string, endDate: string): string => {
	const monthNames = [
		'ม.ค.',
		'ก.พ.',
		'มี.ค.',
		'เม.ย.',
		'พ.ค.',
		'มิ.ย.',
		'ก.ค.',
		'ส.ค.',
		'ก.ย.',
		'ต.ค.',
		'พ.ย.',
		'ธ.ค.',
	];

	const parseDate = (dateStr: string) => {
		const [year, month] = dateStr.split('-').map(Number);
		const buddhistYear = year + 543;
		const yearShort = buddhistYear.toString().slice(-2);
		return {
			month: monthNames[month - 1],
			year: yearShort,
		};
	};

	const start = parseDate(startDate);
	const end = parseDate(endDate);

	if (start.year === end.year) {
		return `${start.month} - ${end.month} ${start.year}`;
	}
	return `${start.month} ${start.year} - ${end.month} ${end.year}`;
};

// Chart component for timeline visualization
const StoryChart = ({ chart }: { chart: Chart }) => {
	const [isHovering, setIsHovering] = useState(false);
	const [hoverPosition, setHoverPosition] = useState(0);
	const timelineRef = useRef<HTMLDivElement>(null);

	const chartData = useMemo(() => {
		const monthNames = [
			'ม.ค.',
			'ก.พ.',
			'มี.ค.',
			'เม.ย.',
			'พ.ค.',
			'มิ.ย.',
			'ก.ค.',
			'ส.ค.',
			'ก.ย.',
			'ต.ค.',
			'พ.ย.',
			'ธ.ค.',
		];

		const dataMap = new Map<string, number>();
		chart.bars.forEach((bar) => {
			const monthKey = bar.date.substring(0, 7);
			const currentValue = dataMap.get(monthKey) || 0;
			dataMap.set(monthKey, currentValue + bar.value);
		});

		if (chart.bars.length === 0) {
			return {
				labels: [],
				values: [],
				maxValue: 1,
				dates: [],
				allMonths: [],
			};
		}

		const sortedBars = [...chart.bars].sort((a, b) =>
			a.date.localeCompare(b.date),
		);
		const firstDate = sortedBars[0].date;
		const lastDate = sortedBars[sortedBars.length - 1].date;

		const firstMonthKey = firstDate.substring(0, 7);
		const lastMonthKey = lastDate.substring(0, 7);
		const [firstYear, firstMonth] = firstMonthKey.split('-').map(Number);
		const [lastYear, lastMonth] = lastMonthKey.split('-').map(Number);

		const allMonths: Array<{
			date: string;
			value: number;
			label: string;
			year: number;
		}> = [];

		let currentYear = firstYear;
		let currentMonth = firstMonth;

		while (
			currentYear < lastYear ||
			(currentYear === lastYear && currentMonth <= lastMonth)
		) {
			const dateStr = `${currentYear}-${String(currentMonth).padStart(2, '0')}`;
			const value = dataMap.get(dateStr) || 0;
			const buddhistYear = currentYear + 543;
			const monthIndex = currentMonth - 1;
			const monthAbbr = monthNames[monthIndex] || 'ม.ค.';
			const yearShort = buddhistYear.toString().slice(-2);

			allMonths.push({
				date: dateStr,
				value,
				label: `${monthAbbr} ${yearShort}`,
				year: buddhistYear,
			});

			currentMonth++;
			if (currentMonth > 12) {
				currentMonth = 1;
				currentYear++;
			}
		}

		const labels: string[] = [];
		let prevYear = -1;

		allMonths.forEach((group, index) => {
			if (index === 0) {
				labels.push(group.label);
				prevYear = group.year;
			} else if (group.year !== prevYear) {
				labels.push(group.year.toString());
				prevYear = group.year;
			} else {
				labels.push('');
			}
		});

		const maxValue = Math.max(...Array.from(dataMap.values()), 1);

		return {
			labels,
			values: allMonths.map((m) => m.value),
			maxValue,
			dates: allMonths.map((m) => m.date),
			allMonths,
		};
	}, [chart.bars]);

	const MAX_BAR_HEIGHT = 24;

	// Get current month label based on position
	const getCurrentMonthLabel = (position: number) => {
		if (chartData.allMonths.length === 0) return '';
		const index = Math.round(
			(position / 100) * (chartData.allMonths.length - 1),
		);
		const month =
			chartData.allMonths[
				Math.max(0, Math.min(index, chartData.allMonths.length - 1))
			];
		return month ? month.label : '';
	};

	const handleMouseMove = (e: React.MouseEvent) => {
		if (timelineRef.current) {
			const rect = timelineRef.current.getBoundingClientRect();
			const x = e.clientX - rect.left;
			const position = Math.max(0, Math.min(100, (x / rect.width) * 100));
			setHoverPosition(position);
		}
	};

	return (
		<div className="mt-3 rounded-2xl border-2 border-black bg-white p-4">
			{/* Bars */}
			<div className="flex items-end" style={{ height: `${MAX_BAR_HEIGHT}px` }}>
				{chartData.values.map((value, index) => {
					const height =
						value > 0 && chartData.maxValue > 0
							? (value / chartData.maxValue) * MAX_BAR_HEIGHT
							: 0;
					return (
						<div key={index} className="flex flex-1 flex-col items-center">
							{value > 0 && height > 0 && (
								<div
									className="bg-green-3 w-full transition-all"
									style={{ height: `${Math.max(height, 2)}px` }}
								/>
							)}
						</div>
					);
				})}
			</div>

			{/* Timeline with horizontal line and tick marks */}
			<div
				className="relative"
				ref={timelineRef}
				onMouseMove={handleMouseMove}
				onMouseEnter={() => setIsHovering(true)}
				onMouseLeave={() => setIsHovering(false)}
			>
				<div className="absolute top-0 right-0 left-0 h-[2px] bg-black"></div>

				<div className="relative flex items-start gap-1 pt-[2px]">
					{chartData.values.map((value, index) => {
						const hasLabel = !!chartData.labels[index];
						const position = (index / (chartData.values.length - 1)) * 100;

						return (
							<div
								key={index}
								className="relative flex flex-1 flex-col items-center"
							>
								<div
									className="bg-black"
									style={{
										width: '1px',
										height: '4px',
										marginTop: '0',
									}}
								/>
								{hasLabel && (
									<p className="font-ibmplex mt-1 text-center text-[10px] whitespace-nowrap text-black">
										{chartData.labels[index]}
									</p>
								)}

								{/* Tooltip on hover */}
								{isHovering && Math.abs(position - hoverPosition) < 5 && (
									<div className="absolute -top-8 left-1/2 z-10 -translate-x-1/2 transform">
										<div className="bg-green-1 text-b5 font-ibmplex rounded-lg px-2 py-1 whitespace-nowrap text-white">
											{getCurrentMonthLabel(hoverPosition)}
										</div>
									</div>
								)}
							</div>
						);
					})}
				</div>
			</div>
		</div>
	);
};

// Helper function to extract source name from URL
const getSourceName = (url: string): string => {
	try {
		const urlObj = new URL(url);
		const hostname = urlObj.hostname;

		if (hostname.includes('thairath.co.th')) return 'ไทยราษฎร์';
		if (hostname.includes('thaipbs.or.th') || hostname.includes('news.thaipbs'))
			return 'ไทยพีบีเอส';
		if (hostname.includes('thestandard.co')) return 'The Standard';
		if (hostname.includes('amarintv.com')) return 'อมรินทร์ทีวี';

		return hostname.replace('www.', '');
	} catch {
		return 'แหล่งข่าว';
	}
};

const TagbyId = ({ name }: { name: string | null }) => {
	const router = useRouter();
	const [tagData, setTagData] = useState<TagData | null>(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);
	const { setTopics, selectedTopics, addSelectedTopic, removeSelectedTopic } =
		useTopicStore();
	const [expandedDates, setExpandedDates] = useState<Set<string>>(new Set());
	const [expandedNewsCount, setExpandedNewsCount] = useState<
		Map<string, number>
	>(new Map());

	const INITIAL_NEWS_DISPLAY = 3; // Show first 3 news items per date

	useEffect(() => {
		if (!name) {
			setError('Please provide a name parameter');
			setLoading(false);
			return;
		}

		// Fetch the data file
		fetch('/politicalflashback/story_details.json')
			.then((res) => {
				if (!res.ok) {
					throw new Error('Failed to load story data');
				}
				return res.json();
			})
			.then((data: StoryDetailsData) => {
				// Decode the name from URL parameter
				const decodedName = decodeURIComponent(name);

				// Find the tag data by name
				const foundTag = data.all_tag?.find(
					(item: { name: string }) => item.name === decodedName,
				);

				if (!foundTag) {
					setError('Tag not found');
				} else {
					setTagData(foundTag);
				}
				setLoading(false);
			})
			.catch((error) => {
				console.error('Failed to load story data:', error);
				setError('Failed to load data');
				setLoading(false);
			});
	}, [name]);

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

	const isTopicSelected = (tagName: string): boolean => {
		return selectedTopics.some((topic) => topic.label === tagName);
	};

	const handleSaveClick = () => {
		if (!tagData) return;

		const topicId = tagData.id.toString();
		const isSelected = isTopicSelected(tagData.name);

		if (isSelected) {
			removeSelectedTopic(topicId);
		} else {
			addSelectedTopic({
				id: topicId,
				label: tagData.name,
				value: tagData.sum_new,
				score: tagData.score,
				relatedIds: tagData.sub_tag.map((st) => st.id.toString()),
			});
		}
	};

	if (loading) {
		return (
			<div className="bg-green-3 flex h-full min-h-screen flex-col justify-between">
				<div className="mx-auto flex max-w-[600px] flex-col items-center justify-center gap-6 px-4 py-10">
					<p className="text-h9 font-sriracha text-black">Loading...</p>
				</div>
			</div>
		);
	}

	if (error) {
		return (
			<div className="bg-green-3 flex h-full min-h-screen flex-col justify-between">
				<div className="mx-auto flex max-w-[600px] flex-col items-center justify-center gap-6 px-4 py-10">
					<p className="text-h9 font-sriracha text-black">{error}</p>
				</div>
			</div>
		);
	}

	if (!tagData) {
		return (
			<div className="bg-green-3 flex h-full min-h-screen flex-col justify-between">
				<div className="mx-auto flex max-w-[600px] flex-col items-center justify-center gap-6 px-4 py-10">
					<p className="text-h9 font-sriracha text-black">Tag not found</p>
				</div>
			</div>
		);
	}

	const dateRange = formatDateRange(
		tagData.chart.range.start,
		tagData.chart.range.end,
	);
	const remainingNewsCount = (
		date: string,
		displayed: number,
		total: number,
	) => {
		return total - displayed;
	};

	return (
		<div className="flex min-h-screen flex-col bg-white">
			{/* Header Section */}
			<div className="bg-purple-3">
				<div className="top10 fixed right-0 left-0 z-20 md:top-14">
					<div className="m-4 mb-6 flex items-center justify-between">
						<button
							onClick={() => router.back()}
							className="flex h-12 w-12 items-center justify-center rounded-full border-2 border-black bg-white text-black transition-all hover:border-black hover:bg-white/30"
						>
							<Image
								src="/politicalflashback/icon/chevron-left.svg"
								alt="Back"
								width={40}
								height={40}
								className="h-auto w-10"
							/>
						</button>

						<button
							onClick={handleSaveClick}
							className={`flex items-center gap-2 rounded-full border-2 border-black px-4 py-2 transition-colors ${
								isTopicSelected(tagData.name)
									? 'text-green-2 bg-black'
									: 'bg-green-3 text-black hover:bg-gray-100'
							}`}
						>
							{isTopicSelected(tagData.name) ? (
								<p className="text-h9 font-sriracha">บันทึกแล้ว</p>
							) : (
								<p className="text-h9 font-sriracha">บันทึกประเด็น</p>
							)}
							{isTopicSelected(tagData.name) ? (
								<Image
									src="/politicalflashback/icon/button-unfav-green.svg"
									alt="Save"
									width={32}
									height={32}
								/>
							) : (
								<Image
									src="/politicalflashback/icon/button-fav-black.svg"
									alt="Save"
									width={32}
									height={32}
								/>
							)}
						</button>
					</div>
				</div>

				<div className="mx-auto w-full max-w-[600px] px-4 pt-20 pb-6">
					{/* Title Section */}
					<div className="mb-6 text-center">
						<p className="text-b4 font-ibmplex text-black">ประเด็นร้อน</p>
						<h1 className="text-h4 font-kondolar font-black text-black">
							{tagData.name}
						</h1>
						<p className="text-b5 font-ibmplex mb-1 text-black">สมัยรัฐบาล</p>

						{/* Profile Pictures */}
						{tagData.photo && tagData.photo.length > 0 && (
							<div className="mb-1 flex items-center justify-center">
								{tagData.photo.slice(0, 3).map((photo, index) => (
									<div
										key={photo.id}
										className={`h-12 w-12 overflow-hidden rounded-full border-2 bg-white ${
											index > 0 ? '-ml-3' : ''
										}`}
										style={{ borderColor: photo.color }}
									>
										<img
											src={photo.img}
											alt="Profile"
											className="h-full w-full object-cover"
										/>
									</div>
								))}
							</div>
						)}

						{/* Date Range */}
						<p className="text-b4 font-ibmplex text-black">{dateRange}</p>

						{/* News Count with Fire Rating */}
						<div className="flex items-center justify-center gap-2">
							<span className="text-h8 font-sriracha text-purple-1">
								จำนวนข่าว:
							</span>
							<FireRating value={tagData.score} maxFires={5} />
							<span className="text-b5 font-ibmplex text-purple-1">
								({tagData.sum_new} ข่าว)
							</span>
						</div>
					</div>

					{/* Related Issues Section */}
					{tagData.sub_tag && tagData.sub_tag.length > 0 && (
						<div className="mb-6 pt-4">
							<div className="mb-4 h-px bg-black"></div>
							<p className="text-b4 font-ibmplex mb-1 text-black">
								ประเด็นเกี่ยวข้อง
							</p>
							<div className="flex gap-2 overflow-x-auto">
								{tagData.sub_tag.slice(0, 6).map((subTag) => (
									<span
										key={subTag.id}
										className="text-h9 font-kondolar inline-flex items-center rounded-full border-2 border-black bg-white px-3 py-1.5 font-bold whitespace-nowrap text-black"
									>
										#{subTag.name}
									</span>
								))}
							</div>
						</div>
					)}
				</div>
			</div>

			{/* News Timeline Section */}
			<div className="mx-auto w-full max-w-[600px] flex-1 px-4 py-6">
				<div className="relative flex flex-col gap-4">
					{/* Vertical Timeline Line */}
					<div className="bg-purple-3 absolute top-0 bottom-0 left-4 w-0.5"></div>

					{tagData.tag_news.map((tagNews, index) => {
						const displayedCount = getDisplayNewsCount(
							tagNews.date,
							tagNews.news.length,
						);
						const isExpanded = expandedDates.has(tagNews.date);
						const hasMore = tagNews.news.length > INITIAL_NEWS_DISPLAY;
						const remaining = remainingNewsCount(
							tagNews.date,
							displayedCount,
							tagNews.news.length,
						);

						return (
							<div key={index} className="relative flex w-full flex-col gap-3">
								{/* Date Header */}
								<div className="relative z-10 inline-flex w-full items-center">
									<span className="bg-purple-3 text-h9 font-kondolar w-full rounded-2xl px-4 py-2 font-bold text-black">
										{tagNews.date}
									</span>
								</div>

								{/* News Items */}
								<div className="relative flex flex-col gap-3 pl-8">
									{tagNews.news
										.slice(0, displayedCount)
										.map((news, newsIndex) => (
											<div
												key={news.id}
												className="relative flex flex-col gap-1"
											>
												{/* Timeline Marker */}
												<div className="bg-purple-3 absolute top-1 -left-[23px] z-10 h-4 w-4 rounded-full"></div>

												<p className="text-h9 font-kondolar leading-relaxed font-bold text-black hover:underline">
													{news.name}
												</p>
												<a
													href={news.link}
													target="_blank"
													rel="noopener noreferrer"
													className="text-b6 font-ibmplex text-green-1 flex items-center gap-1 underline"
												>
													{getSourceName(news.link)}
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
												toggleDateExpansion(tagNews.date, tagNews.news.length)
											}
											className="text-b5 font-ibmplex text-green-1 flex items-center gap-1 self-start hover:underline"
										>
											{isExpanded ? 'แสดงน้อยลง' : `เพิ่มเติม (${remaining})`}
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

					{/* End of News Indicator */}
					<div className="relative z-10 inline-flex w-full items-center pt-4">
						<p className="border-purple-3 text-h9 font-kondolar w-full rounded-2xl border-2 bg-white px-4 py-2 font-bold text-black">
							หมดข่าวในแท็กนี้
						</p>
					</div>
				</div>
			</div>

			{/* Bottom Section */}
			<div className="bg-purple-3">
				<div className="mx-auto w-full max-w-[600px] px-4 pb-6">
					{/* View Other Issues */}
					{tagData.sub_tag && tagData.sub_tag.length > 0 && (
						<div className="mb-6 pt-4">
							<p className="text-b4 font-ibmplex mb-1 text-black">
								ดูประเด็นอื่นต่อ
							</p>
							<div className="flex gap-2 overflow-x-auto">
								{tagData.sub_tag.slice(0, 6).map((subTag) => (
									<span
										key={subTag.id}
										className="text-h9 font-kondolar inline-flex items-center rounded-full border-2 border-black bg-white px-3 py-1.5 font-bold whitespace-nowrap text-black"
									>
										#{subTag.name}
									</span>
								))}
							</div>
						</div>
					)}

					{/* Chart */}
					<StoryChart chart={tagData.chart} />

					<div className="h-32 pb-4"></div>
				</div>
			</div>

			<DropZone />
		</div>
	);
};

export default TagbyId;
