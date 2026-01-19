'use client';

import React, {
	useState,
	useEffect,
	useRef,
	useMemo,
	useCallback,
} from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import FireRating from '@/src/components/FireRating';
import DropZone from '@/src/components/DropZone';
import { useTopicStore } from '@/src/stores/topicStore';
import StoryChart from './components/TimelineChart';

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
	const [knobPosition, setKnobPosition] = useState(0);
	const newsDateRefs = useRef<Map<string, HTMLDivElement>>(new Map());
	const newsContainerRef = useRef<HTMLDivElement>(null);
	const isScrollingFromKnob = useRef(false);
	const isScrollingFromPage = useRef(false);
	const hasUserScrolled = useRef(false);

	const scrollToTop = () => {
		window.scrollTo({
			top: 0,
			behavior: 'smooth',
		});
	};

	const INITIAL_NEWS_DISPLAY = 3; // Show first 3 news items per date
	const globalDateRange = useMemo(() => {
		// มี.ค. 66 = March 2566 = 2023-03
		// ธ.ค. 68 = December 2568 = 2025-12
		return {
			start: '2023-03-01',
			end: '2025-12-31',
		};
	}, []);
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

	const isTopicSelected = (topicId: string): boolean => {
		return selectedTopics.some((topic) => topic.id === topicId);
	};

	const handleSaveClick = () => {
		if (!tagData) return;

		// Use name as ID for consistency across all pages
		const topicId = tagData.name;
		const isSelected = isTopicSelected(topicId);

		if (isSelected) {
			removeSelectedTopic(topicId);
		} else {
			addSelectedTopic({
				id: topicId,
				label: tagData.name,
				value: tagData.sum_new,
				score: tagData.score,
				relatedIds: tagData.sub_tag.map((st) => st.name), // Use name for related IDs
			});
		}
	};

	// Handle knob position change - scroll to corresponding news
	const handleKnobPositionChange = useCallback(
		(position: number) => {
			if (!tagData || isScrollingFromPage.current) return;

			isScrollingFromKnob.current = true;
			setKnobPosition(position);

			if (tagData.tag_news.length === 0) {
				// No news, scroll to bottom
				window.scrollTo({
					top: document.documentElement.scrollHeight,
					behavior: 'instant',
				});
				setTimeout(() => {
					isScrollingFromKnob.current = false;
				}, 500);
				return;
			}

			// Calculate target month from knob position (same logic as TimelineChart)
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

			// Build allMonths array (same as TimelineChart)
			const firstDate = globalDateRange.start;
			const lastDate = globalDateRange.end;
			const firstMonthKey = firstDate.substring(0, 7);
			const lastMonthKey = lastDate.substring(0, 7);
			const [firstYear, firstMonth] = firstMonthKey.split('-').map(Number);
			const [lastYear, lastMonth] = lastMonthKey.split('-').map(Number);

			const allMonths: Array<{
				date: string;
				label: string;
			}> = [];

			let currentYear = firstYear;
			let currentMonth = firstMonth;

			while (
				currentYear < lastYear ||
				(currentYear === lastYear && currentMonth <= lastMonth)
			) {
				const dateStr = `${currentYear}-${String(currentMonth).padStart(2, '0')}`;
				const buddhistYear = currentYear + 543;
				const monthIndex = currentMonth - 1;
				const monthAbbr = monthNames[monthIndex] || 'ม.ค.';
				const yearShort = buddhistYear.toString().slice(-2);

				allMonths.push({
					date: dateStr,
					label: `${monthAbbr} ${yearShort}`,
				});

				currentMonth++;
				if (currentMonth > 12) {
					currentMonth = 1;
					currentYear++;
				}
			}

			// Get target month from position (same as TimelineChart.getCurrentMonthLabel)
			if (allMonths.length === 0) {
				window.scrollTo({
					top: document.documentElement.scrollHeight,
					behavior: 'instant',
				});
				setTimeout(() => {
					isScrollingFromKnob.current = false;
				}, 500);
				return;
			}

			const monthIndex = Math.round((position / 100) * (allMonths.length - 1));
			const targetMonthData =
				allMonths[Math.max(0, Math.min(monthIndex, allMonths.length - 1))];

			if (!targetMonthData) {
				window.scrollTo({
					top: document.documentElement.scrollHeight,
					behavior: 'instant',
				});
				setTimeout(() => {
					isScrollingFromKnob.current = false;
				}, 500);
				return;
			}

			// Parse target month to get month name and year
			const [targetYear, targetMonthNum] = targetMonthData.date
				.split('-')
				.map(Number);
			const targetMonthName = monthNames[targetMonthNum - 1];
			const buddhistYear = targetYear + 543;
			const yearShort = buddhistYear.toString().slice(-2);

			// Find news items that match the target month/year
			let targetNews: TagNews | undefined = undefined;

			tagData.tag_news.forEach((tagNews) => {
				// Parse Thai date format (e.g., "21 พ.ย. 68")
				const dateMatch = tagNews.date.match(/(\d+)\s+(\S+)\s+(\d+)/);
				if (dateMatch) {
					const newsMonthName = dateMatch[2];
					const newsYearShort = parseInt(dateMatch[3]);

					// Check if month and year match
					if (
						newsMonthName === targetMonthName &&
						newsYearShort.toString() === yearShort
					) {
						if (!targetNews) {
							targetNews = tagNews;
						}
					}
				}
			});

			// Use targetNews if found (exact date match only)
			// If not found, scroll to bottom
			if (targetNews) {
				const foundNews: TagNews = targetNews;
				const targetDate = foundNews.date;
				if (newsDateRefs.current.has(targetDate)) {
					const element = newsDateRefs.current.get(targetDate);
					if (element) {
						const elementRect = element.getBoundingClientRect();
						const scrollTop = window.scrollY + elementRect.top - 150; // Offset for header

						window.scrollTo({
							top: Math.max(0, scrollTop),
							behavior: 'instant',
						});
					} else {
						// Element not found in refs, scroll to bottom
						window.scrollTo({
							top: document.documentElement.scrollHeight,
							behavior: 'instant',
						});
					}
				} else {
					// Date not found in refs, scroll to bottom
					window.scrollTo({
						top: document.documentElement.scrollHeight,
						behavior: 'instant',
					});
				}
			} else {
				// No matching news found, scroll to bottom
				window.scrollTo({
					top: document.documentElement.scrollHeight,
					behavior: 'instant',
				});
			}

			setTimeout(() => {
				isScrollingFromKnob.current = false;
			}, 500);
		},
		[tagData, globalDateRange],
	);

	// Helper function to convert Thai date to position on timeline
	const calculatePositionFromThaiDate = useCallback(
		(thaiDate: string): number | null => {
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

			// Parse Thai date format (e.g., "21 พ.ย. 68")
			const dateMatch = thaiDate.match(/(\d+)\s+(\S+)\s+(\d+)/);
			if (!dateMatch) return null;

			const newsMonthName = dateMatch[2];
			const newsYearShort = parseInt(dateMatch[3]);

			// Find month index from Thai month name
			const monthIndex = monthNames.findIndex((m) => m === newsMonthName);
			if (monthIndex === -1) return null;

			// Convert Buddhist year short to full year (e.g., 68 -> 2025)
			const fullYear = newsYearShort + 2500 - 543;

			// Build allMonths array (same as TimelineChart)
			const firstDate = globalDateRange.start;
			const lastDate = globalDateRange.end;
			const firstMonthKey = firstDate.substring(0, 7);
			const lastMonthKey = lastDate.substring(0, 7);
			const [firstYear, firstMonth] = firstMonthKey.split('-').map(Number);
			const [lastYear, lastMonth] = lastMonthKey.split('-').map(Number);

			const allMonths: string[] = [];
			let currentYear = firstYear;
			let currentMonth = firstMonth;

			while (
				currentYear < lastYear ||
				(currentYear === lastYear && currentMonth <= lastMonth)
			) {
				const dateStr = `${currentYear}-${String(currentMonth).padStart(2, '0')}`;
				allMonths.push(dateStr);

				currentMonth++;
				if (currentMonth > 12) {
					currentMonth = 1;
					currentYear++;
				}
			}

			// Find the target month in allMonths array
			const targetMonthStr = `${fullYear}-${String(monthIndex + 1).padStart(2, '0')}`;
			const targetMonthIndex = allMonths.findIndex((m) => m === targetMonthStr);

			if (targetMonthIndex === -1 || allMonths.length <= 1) return null;

			// Calculate position
			return (targetMonthIndex / (allMonths.length - 1)) * 100;
		},
		[globalDateRange],
	);

	// Handle page scroll - update knob position
	useEffect(() => {
		if (!tagData || isScrollingFromKnob.current) return;

		const handleScroll = () => {
			if (isScrollingFromKnob.current) return;

			// Mark that user has scrolled
			hasUserScrolled.current = true;

			isScrollingFromPage.current = true;

			// Find which news date is currently in view
			const viewportCenter = window.scrollY + window.innerHeight / 2;

			let closestDate: string | null = null;
			let closestDistance = Infinity;

			newsDateRefs.current.forEach((element, date) => {
				if (!element) return;

				const rect = element.getBoundingClientRect();
				const elementTop = window.scrollY + rect.top;
				const elementCenter = elementTop + rect.height / 2;

				const distance = Math.abs(viewportCenter - elementCenter);
				if (distance < closestDistance) {
					closestDistance = distance;
					closestDate = date;
				}
			});

			if (closestDate && tagData.tag_news.length > 0) {
				// Calculate position from the actual date (not index)
				const position = calculatePositionFromThaiDate(closestDate);

				if (position !== null) {
					setKnobPosition(Math.max(0, Math.min(100, position)));
				}
			}

			setTimeout(() => {
				isScrollingFromPage.current = false;
			}, 100);
		};

		// Calculate initial position only after a short delay to ensure refs are set
		// and only if user hasn't scrolled yet
		const initialTimeout = setTimeout(() => {
			if (!hasUserScrolled.current && newsDateRefs.current.size > 0) {
				// Only set initial position if user hasn't scrolled yet
				const viewportCenter = window.scrollY + window.innerHeight / 2;
				let closestDate: string | null = null;
				let closestDistance = Infinity;

				newsDateRefs.current.forEach((element, date) => {
					if (!element) return;
					const rect = element.getBoundingClientRect();
					const elementTop = window.scrollY + rect.top;
					const elementCenter = elementTop + rect.height / 2;
					const distance = Math.abs(viewportCenter - elementCenter);
					if (distance < closestDistance) {
						closestDistance = distance;
						closestDate = date;
					}
				});

				if (closestDate && tagData.tag_news.length > 0) {
					const position = calculatePositionFromThaiDate(closestDate);
					if (position !== null) {
						// Only set if it's not at the end (avoid setting to 100 on initial load)
						// Set to 0 if we're at the top, otherwise use calculated position
						if (window.scrollY < 100) {
							setKnobPosition(0);
						} else if (position < 100) {
							setKnobPosition(Math.max(0, Math.min(99, position)));
						}
					}
				}
			}
		}, 200);

		window.addEventListener('scroll', handleScroll, { passive: true });
		return () => {
			window.removeEventListener('scroll', handleScroll);
			clearTimeout(initialTimeout);
		};
	}, [tagData, calculatePositionFromThaiDate]);

	if (loading) {
		return (
			<div className="bg-green-3 flex h-full min-h-screen flex-col justify-between">
				<div className="mx-auto flex h-screen max-w-[600px] flex-col items-center justify-center gap-6 px-4 py-10">
					<p className="text-h9 font-sriracha text-black">Loading...</p>
				</div>
			</div>
		);
	}

	if (error) {
		return (
			<div className="bg-green-3 flex h-full min-h-screen flex-col justify-between">
				<div className="mx-auto flex h-screen max-w-[600px] flex-col items-center justify-center gap-6 px-4 py-10">
					<p className="text-h9 font-sriracha text-black">{error}</p>
				</div>
			</div>
		);
	}

	if (!tagData) {
		return (
			<div className="bg-green-3 flex h-full min-h-screen flex-col justify-between">
				<div className="mx-auto flex h-screen max-w-[600px] flex-col items-center justify-center gap-6 px-4 py-10">
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
				<div className="fixed top-10 right-0 left-0 z-20 mx-auto w-full max-w-[600px] md:top-14">
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

				<div className="mx-auto w-full max-w-[600px] px-4 pt-40 pb-6">
					{/* Title Section */}
					<div className="mb-6 text-center">
						<p className="text-b4 font-ibmplex text-black">ประเด็นร้อน</p>
						<h1 className="text-h4 font-kondolar font-black text-black">
							{tagData.name}
						</h1>
						{tagData.photo && tagData.photo.length > 0 && (
							<p className="text-b5 font-ibmplex mb-1 text-black">สมัยรัฐบาล</p>
						)}

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
										onClick={() =>
											router.push(
												`/story?name=${encodeURIComponent('#' + subTag.name)}`,
											)
										}
										className="text-h9 font-kondolar inline-flex cursor-pointer items-center rounded-full border-2 border-black bg-white px-3 py-1.5 font-bold whitespace-nowrap text-black"
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
				<div ref={newsContainerRef} className="relative flex flex-col gap-4">
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
								<div
									ref={(el) => {
										if (el) {
											newsDateRefs.current.set(tagNews.date, el);
										} else {
											newsDateRefs.current.delete(tagNews.date);
										}
									}}
									className="relative z-10 inline-flex w-full items-center"
								>
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
												key={`${tagNews.date}-${news.id}-${newsIndex}`}
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
										onClick={async () => {
											await router.push(
												`/story?name=${encodeURIComponent('#' + subTag.name)}`,
											);
											scrollToTop();
										}}
										className="text-h9 font-kondolar inline-flex cursor-pointer items-center rounded-full border-2 border-black bg-white px-3 py-1.5 font-bold whitespace-nowrap text-black"
									>
										#{subTag.name}
									</span>
								))}
							</div>
						</div>
					)}

					{/* Chart */}

					<div className="h-44 pb-4"></div>
				</div>
			</div>

			{/* Fixed Seeker above DropZone */}
			<div className="fixed bottom-[72px] left-1/2 z-40 w-full max-w-[600px] -translate-x-1/2 transform overflow-visible px-4 md:px-0">
				<StoryChart
					chart={tagData.chart}
					knobPosition={knobPosition}
					onKnobPositionChange={handleKnobPositionChange}
					globalDateRange={globalDateRange}
				/>
			</div>

			<DropZone hideHelpButton={true} />
		</div>
	);
};

export default TagbyId;
