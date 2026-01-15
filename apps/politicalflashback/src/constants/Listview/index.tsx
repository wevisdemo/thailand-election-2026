'use client';

import { useState, useEffect, useMemo, useRef } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import { Topic, useTopicStore } from '@/src/stores/topicStore';
import { useRouter } from 'next/navigation';
import DropZone from '@/src/components/DropZone';
import FireRating from '@/src/components/FireRating';
import Image from 'next/image';
import SearchModal from '@/src/components/SearchModal';

interface TagData {
	id: number;
	name: string;
	sum_news: number;
	category: string[];
	chart: {
		range: {
			start: string;
			end: string;
		};
		bars: Array<{
			date: string;
			value: number;
		}>;
	};
}

interface ListViewData {
	data_tags: TagData[];
}

interface Category {
	id: number;
	name: string;
}

interface CategoryData {
	data: Category[];
}

interface NewsItem {
	id: number;
	name: string;
	link: string;
	date?: string;
}

interface StoryDetailsData {
	all_tag: TagData[];
}

// Type for SearchModal's story data (different structure from Listview's TagData)
interface SearchModalTagData {
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
	tag_news: Array<{
		date: string;
		news: NewsItem[];
	}>;
	photo: unknown[];
}

interface SearchModalStoryDetailsData {
	all_tag: SearchModalTagData[];
}

type SortOption =
	| 'most_news'
	| 'least_news'
	| 'longest_news'
	| 'shortest_news'
	| 'oldest'
	| 'newest'
	| 'random';

// Calculate score from sum_news (1-5 scale)
// Based on legend: 1 fire = 1 news, 5 fires = 1,000 news
const calculateScore = (sumNews: number): number => {
	if (sumNews <= 1) return 1;
	if (sumNews <= 10) return 1;
	if (sumNews <= 100) return 2;
	if (sumNews <= 500) return 3;
	if (sumNews <= 1000) return 4;
	return 5;
};

const TrendChart = ({
	bars,
	globalDateRange,
}: {
	bars: Array<{ date: string; value: number }>;
	globalDateRange?: { start: string; end: string };
}) => {
	// Group bars by month and calculate max value
	const chartData = useMemo(() => {
		// Thai month abbreviations
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

		// Create a map of existing data grouped by month (YYYY-MM)
		const dataMap = new Map<string, number>();
		bars.forEach((bar) => {
			// Extract YYYY-MM from YYYY-MM-DD format
			const monthKey = bar.date.substring(0, 7); // "2024-01-19" -> "2024-01"
			const currentValue = dataMap.get(monthKey) || 0;
			dataMap.set(monthKey, currentValue + bar.value);
		});

		// Determine first and last date - use global range if provided, otherwise use bars data
		let firstDate: string;
		let lastDate: string;

		if (globalDateRange) {
			// Use global date range
			firstDate = globalDateRange.start;
			lastDate = globalDateRange.end;
		} else if (bars.length === 0) {
			return {
				labels: [],
				values: [],
				maxValue: 1,
				dates: [],
			};
		} else {
			// Fall back to bars data
			const sortedBars = [...bars].sort((a, b) => a.date.localeCompare(b.date));
			firstDate = sortedBars[0].date;
			lastDate = sortedBars[sortedBars.length - 1].date;
		}

		// Parse dates (extract YYYY-MM from YYYY-MM-DD)
		const firstMonthKey = firstDate.substring(0, 7);
		const lastMonthKey = lastDate.substring(0, 7);
		const [firstYear, firstMonth] = firstMonthKey.split('-').map(Number);
		const [lastYear, lastMonth] = lastMonthKey.split('-').map(Number);

		// Generate all months from first to last
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

			// Move to next month
			currentMonth++;
			if (currentMonth > 12) {
				currentMonth = 1;
				currentYear++;
			}
		}

		// Generate labels: first month shows full label (e.g., "มี.ค. 66"), then show year labels at start of each new year
		const labels: string[] = [];
		let prevYear = -1;

		allMonths.forEach((group, index) => {
			if (index === 0) {
				// First bar: always show full month label (e.g., "มี.ค. 66")
				labels.push(group.label);
				prevYear = group.year;
			} else if (group.year !== prevYear) {
				// New year: show year label (e.g., "2567")
				labels.push(group.year.toString());
				prevYear = group.year;
			} else {
				// Same year: show empty label
				labels.push('');
			}
		});

		// Find max value for scaling (only from actual data, not zeros)
		const maxValue = Math.max(...Array.from(dataMap.values()), 1);

		return {
			labels,
			values: allMonths.map((m) => m.value),
			maxValue,
			dates: allMonths.map((m) => m.date),
		};
	}, [bars, globalDateRange]);

	// Max bar height is 24px
	const MAX_BAR_HEIGHT = 24;

	const totalMonths = chartData.values.length;
	const widthPercent = totalMonths > 0 ? 100 / totalMonths : 0;

	return (
		<div className="mt-3">
			{/* Bars */}
			<div className="flex items-end" style={{ height: `${MAX_BAR_HEIGHT}px` }}>
				{chartData.values.map((value, index) => {
					const height =
						value > 0 && chartData.maxValue > 0
							? (value / chartData.maxValue) * MAX_BAR_HEIGHT
							: 0;
					return (
						<div
							key={index}
							className="flex flex-col items-center"
							style={{
								width: `${widthPercent}%`,
								flexShrink: 0,
							}}
						>
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
			<div className="relative">
				{/* Horizontal timeline line */}
				<div className="absolute top-0 right-0 left-0 h-[2px] bg-black"></div>

				{/* Tick marks and labels */}
				<div className="relative flex pt-[2px]">
					{chartData.values.map((value, index) => {
						const hasLabel = !!chartData.labels[index];

						return (
							<div
								key={index}
								className="relative flex flex-col items-center"
								style={{
									width: `${widthPercent}%`,
									flexShrink: 0,
								}}
							>
								{/* Tick mark extending upward - positioned at center */}
								<div
									className="bg-black"
									style={{
										width: '1px',
										height: '4px',
									}}
								/>
								{/* Label */}
								{hasLabel && (
									<p className="font-ibmplex mt-1 text-center text-[10px] whitespace-nowrap text-black">
										{chartData.labels[index]}
									</p>
								)}
							</div>
						);
					})}
				</div>
			</div>
		</div>
	);
};

const ListviewPage = () => {
	const { selectedTopics, addSelectedTopic, removeSelectedTopic, topics } =
		useTopicStore();
	const pathname = usePathname();
	const searchParams = useSearchParams();
	const isHomePath =
		pathname === '/home' || pathname === '/politicalflashback/home';
	const router = useRouter();
	const isMonthlyPath =
		pathname === '/monthly' || pathname === '/politicalflashback/monthly';
	const isListviewPath =
		pathname === '/listview' || pathname === '/politicalflashback/listview';

	const [listData, setListData] = useState<ListViewData | null>(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);
	const [categories, setCategories] = useState<Category[]>([]);

	// Initialize state from URL params
	const getInitialSortOption = (): SortOption => {
		const sortParam = searchParams.get('sort');
		if (
			sortParam &&
			[
				'most_news',
				'least_news',
				'longest_news',
				'shortest_news',
				'oldest',
				'newest',
				'random',
			].includes(sortParam)
		) {
			return sortParam as SortOption;
		}
		return 'most_news';
	};

	const getInitialCategories = (): Set<string> => {
		const categoryParam = searchParams.get('category');
		if (categoryParam) {
			return new Set([categoryParam]);
		}
		return new Set();
	};

	const [selectedCategories, setSelectedCategories] =
		useState<Set<string>>(getInitialCategories);
	const [sortOption, setSortOption] =
		useState<SortOption>(getInitialSortOption);
	const [showSortDropdown, setShowSortDropdown] = useState(false);
	const sortButtonRef = useRef<HTMLDivElement>(null);
	const scrollContainerRef = useRef<HTMLDivElement>(null);
	const [dropdownPosition, setDropdownPosition] = useState({ top: 0, left: 0 });
	const [isSearchOpen, setIsSearchOpen] = useState(false);
	const [searchQuery, setSearchQuery] = useState('');
	const [storyData, setStoryData] =
		useState<SearchModalStoryDetailsData | null>(null);

	// Sync state from URL params when they change
	useEffect(() => {
		const sortParam = searchParams.get('sort');
		const categoryParam = searchParams.get('category');

		if (sortParam) {
			if (
				[
					'most_news',
					'least_news',
					'longest_news',
					'shortest_news',
					'oldest',
					'newest',
					'random',
				].includes(sortParam)
			) {
				const newSort = sortParam as SortOption;
				if (newSort !== sortOption) {
					setSortOption(newSort);
				}
			}
		} else if (sortOption !== 'most_news') {
			setSortOption('most_news');
		}

		if (categoryParam) {
			const newCategories = new Set([categoryParam]);
			if (
				selectedCategories.size !== newCategories.size ||
				!selectedCategories.has(categoryParam)
			) {
				setSelectedCategories(newCategories);
			}
		} else if (selectedCategories.size > 0) {
			setSelectedCategories(new Set());
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [searchParams]);

	useEffect(() => {
		// Load categories
		fetch('/politicalflashback/category.json')
			.then((res) => res.json())
			.then((data: CategoryData) => {
				setCategories(data.data);
			})
			.catch((error) => {
				console.error('Failed to load categories:', error);
			});

		// Load list data
		fetch('/politicalflashback/home_list_view.json')
			.then((res) => res.json())
			.then((data: ListViewData) => {
				setListData(data);
				setLoading(false);
			})
			.catch((error) => {
				console.error('Failed to load list data:', error);
				setError('ไม่สามารถโหลดข้อมูลได้');
				setLoading(false);
			});

		// Load story_details.json for news search
		fetch('/politicalflashback/story_details.json')
			.then((res) => res.json())
			.then((data: SearchModalStoryDetailsData) => {
				setStoryData(data);
			})
			.catch((error) => {
				console.error('Failed to load story data:', error);
			});
	}, []);

	// Calculate dropdown position and handle click outside
	useEffect(() => {
		const updateDropdownPosition = () => {
			if (showSortDropdown && sortButtonRef.current) {
				const rect = sortButtonRef.current.getBoundingClientRect();
				setDropdownPosition({
					top: rect.bottom + 8, // 8px = mt-2 equivalent
					left: rect.left,
				});
			}
		};

		if (showSortDropdown && sortButtonRef.current) {
			updateDropdownPosition();
		}

		const handleClickOutside = (event: MouseEvent) => {
			const target = event.target as HTMLElement;
			if (
				showSortDropdown &&
				!target.closest('.sort-dropdown-container') &&
				!target.closest('.sort-dropdown-menu')
			) {
				setShowSortDropdown(false);
			}
		};

		if (showSortDropdown) {
			const scrollContainer = scrollContainerRef.current;

			// Update position on scroll (both window and scroll container)
			window.addEventListener('scroll', updateDropdownPosition, true);
			if (scrollContainer) {
				scrollContainer.addEventListener('scroll', updateDropdownPosition);
			}
			// Update position on resize
			window.addEventListener('resize', updateDropdownPosition);
			// Handle click outside
			document.addEventListener('mousedown', handleClickOutside);

			return () => {
				window.removeEventListener('scroll', updateDropdownPosition, true);
				if (scrollContainer) {
					scrollContainer.removeEventListener('scroll', updateDropdownPosition);
				}
				window.removeEventListener('resize', updateDropdownPosition);
				document.removeEventListener('mousedown', handleClickOutside);
			};
		}
	}, [showSortDropdown]);

	// Filter and sort data
	const filteredAndSortedData = useMemo(() => {
		if (!listData) return [];

		let filtered = listData.data_tags;

		// Filter by selected categories
		if (selectedCategories.size > 0) {
			filtered = filtered.filter((tag) =>
				tag.category.some((cat) => selectedCategories.has(cat)),
			);
		}

		// Calculate date range duration in days
		const getDateRangeDays = (tag: TagData): number => {
			const start = new Date(tag.chart.range.start);
			const end = new Date(tag.chart.range.end);
			return Math.floor(
				(end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24),
			);
		};

		// Sort data
		let sorted = [...filtered];

		if (sortOption === 'random') {
			// Shuffle array randomly
			for (let i = sorted.length - 1; i > 0; i--) {
				const j = Math.floor(Math.random() * (i + 1));
				[sorted[i], sorted[j]] = [sorted[j], sorted[i]];
			}
		} else {
			sorted.sort((a, b) => {
				switch (sortOption) {
					case 'most_news':
						return b.sum_news - a.sum_news;
					case 'least_news':
						return a.sum_news - b.sum_news;
					case 'longest_news':
						return getDateRangeDays(b) - getDateRangeDays(a);
					case 'shortest_news':
						return getDateRangeDays(a) - getDateRangeDays(b);
					case 'oldest':
						return (
							new Date(a.chart.range.start).getTime() -
							new Date(b.chart.range.start).getTime()
						);
					case 'newest':
						return (
							new Date(b.chart.range.end).getTime() -
							new Date(a.chart.range.end).getTime()
						);
					default:
						return 0;
				}
			});
		}

		return sorted;
	}, [listData, selectedCategories, sortOption]);

	// Calculate total news count from filtered data
	const totalNews = useMemo(() => {
		return filteredAndSortedData.reduce((sum, tag) => sum + tag.sum_news, 0);
	}, [filteredAndSortedData]);

	// Calculate global date range - fixed to "มี.ค. 66-ธ.ค. 68" (March 2023 - December 2025)
	const globalDateRange = useMemo(() => {
		// มี.ค. 66 = March 2566 = 2023-03
		// ธ.ค. 68 = December 2568 = 2025-12
		return {
			start: '2023-03-01',
			end: '2025-12-31',
		};
	}, []);

	// Update URL when sort or category changes
	const updateURL = (sort: SortOption, category: Set<string>) => {
		const params = new URLSearchParams();
		if (sort !== 'most_news') {
			params.set('sort', sort);
		}
		if (category.size > 0) {
			params.set('category', Array.from(category)[0]);
		}
		const queryString = params.toString();
		const newUrl = queryString ? `${pathname}?${queryString}` : pathname;

		// Only update if URL is different from current
		const currentUrl = searchParams.toString()
			? `${pathname}?${searchParams.toString()}`
			: pathname;
		if (newUrl !== currentUrl) {
			router.replace(newUrl, { scroll: false });
		}
	};

	const handleCategoryToggle = (categoryName: string) => {
		setSelectedCategories((prev) => {
			// If clicking the same category, deselect it
			const newCategories = prev.has(categoryName)
				? new Set<string>()
				: new Set([categoryName]);
			// Update URL
			updateURL(sortOption, newCategories);
			return newCategories;
		});
	};

	const handleSortChange = (newSort: SortOption) => {
		setSortOption(newSort);
		updateURL(newSort, selectedCategories);
	};

	const getSortLabel = (option: SortOption): string => {
		switch (option) {
			case 'most_news':
				return 'เรียง: ข่าวเยอะสุด';
			case 'least_news':
				return 'เรียง: ข่าวน้อยสุด';
			case 'longest_news':
				return 'เรียง: เป็นข่าวนานสุด';
			case 'shortest_news':
				return 'เรียง: เป็นข่าวสั้นสุด';
			case 'oldest':
				return 'เรียง: เก่าสุด';
			case 'newest':
				return 'เรียง: ใหม่สุด';
			case 'random':
				return 'เรียง: สุ่ม';
			default:
				return 'เรียง: ข่าวเยอะสุด';
		}
	};

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

	return (
		<div className="bg-bg relative flex h-screen w-full flex-col overflow-hidden">
			{/* Navigation bar */}
			<div className="mt-2 mb-2 w-full shrink-0 pt-10 md:mt-8">
				<div className="mx-auto flex h-12 max-w-[600px] items-center gap-2 px-4 sm:gap-4 md:px-6">
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
							className={`text-h9 font-kondolar w-full rounded-tr-full rounded-br-full border-2 border-black px-5 py-3 font-bold text-black transition-colors hover:bg-gray-100 sm:w-full ${
								isListviewPath
									? 'text-green-2 bg-black'
									: 'bg-white text-black hover:bg-gray-100'
							}`}
							onClick={() => router.push('/listview')}
						>
							ทั้งหมด
						</button>
					</div>

					{/* Right side - Search button */}
					<button
						className="flex items-center justify-center rounded-full border-2 border-black bg-white p-1 transition-colors hover:bg-gray-100"
						onClick={handleSearchClick}
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
			<main className="relative z-10 min-h-0 flex-1 overflow-hidden">
				<div
					ref={scrollContainerRef}
					className="h-full overflow-y-auto overscroll-contain"
					style={{ WebkitOverflowScrolling: 'touch' }}
				>
					<div className="mx-4 my-10 flex flex-col items-center gap-2">
						<Image
							src="/politicalflashback/icon/mini-stories.svg"
							alt="Monthly"
							width={40}
							height={40}
						/>
						<div className="flex flex-col items-center justify-center">
							<p className="text-h4 font-kondolar font-black text-black">
								ประเด็นทั้งหมด
							</p>
							<p className="text-h8 font-sriracha text-green-1">
								จาก "ยุบสภา 66" ถึง "ยุบสภา 69"
							</p>
						</div>
					</div>

					{loading && (
						<div className="mx-4 py-10 text-center">
							<p className="text-h7 font-kondolar text-black">กำลังโหลด...</p>
						</div>
					)}

					{error && (
						<div className="mx-4 py-10 text-center">
							<p className="text-h7 font-kondolar text-red-600">{error}</p>
						</div>
					)}

					{!loading && !error && listData && (
						<div className="mx-auto mb-12 max-w-[600px]">
							{/* Summary Bar */}
							<div className="mx-4 mb-6">
								<div className="border-t-2 border-black px-0 py-4 sm:px-4">
									<p className="text-h9 font-kondolar text-center text-black">
										{filteredAndSortedData.length} ประเด็น จาก{' '}
										{totalNews.toLocaleString()} ข่าว
									</p>
									{/* Filter UI */}
									<div className="mx-[-16px] mt-4 flex items-center gap-2 overflow-x-auto pb-2">
										{/* Category Buttons */}
										<div className="flex items-center gap-2 overflow-x-auto">
											{/* Sort Button */}
											<div
												ref={sortButtonRef}
												className="sort-dropdown-container relative shrink-0"
											>
												<button
													onClick={() => setShowSortDropdown(!showSortDropdown)}
													className={`text-h9 font-kondolar flex items-center gap-2 rounded-full border-2 border-black px-4 py-2 font-bold text-black transition-opacity hover:opacity-90 ${showSortDropdown ? 'text-green-2 bg-black' : 'bg-white text-black hover:bg-gray-100'}`}
												>
													<span>{getSortLabel(sortOption)}</span>
													{showSortDropdown ? (
														<Image
															src="/politicalflashback/icon/down-green.svg"
															alt="Dropdown"
															width={24}
															height={24}
														/>
													) : (
														<Image
															src="/politicalflashback/icon/chevron-up.svg"
															alt="Dropdown"
															width={24}
															height={24}
														/>
													)}
												</button>
											</div>
											{categories.map((category) => {
												const isSelected = selectedCategories.has(
													category.name,
												);
												return (
													<button
														key={category.id}
														onClick={() => handleCategoryToggle(category.name)}
														className={`text-h9 font-kondolar shrink-0 rounded-full border-2 border-black px-4 py-2 font-bold transition-colors ${
															isSelected
																? 'text-green-2 bg-black'
																: 'bg-white text-black hover:bg-gray-100'
														}`}
													>
														{category.name}
													</button>
												);
											})}
										</div>
									</div>
									<div className="flex items-center justify-center gap-4 text-xs">
										<div className="flex items-center gap-1">
											<FireRating value={1} />
											<span className="text-h9 font-sriracha ml-1 text-black">
												= 1 ข่าว
											</span>
										</div>
										<div className="flex items-center gap-1">
											<FireRating value={5} />
											<span className="text-h9 font-sriracha ml-1 text-black">
												= 1,000 ข่าว
											</span>
										</div>
									</div>
								</div>
							</div>

							{/* Tags List */}
							<div className="mx-4 flex flex-col gap-4">
								{filteredAndSortedData.map((tag, index) => {
									const score = calculateScore(tag.sum_news);
									return (
										<div
											key={tag.id}
											className="cursor-pointer overflow-hidden rounded-2xl border-2 border-black bg-white"
											onClick={() =>
												router.push(
													`/story?name=${encodeURIComponent(tag.name)}`,
												)
											}
										>
											{/* Purple Header Section */}
											<div className="bg-purple-3 flex items-center justify-between p-4">
												<div className="flex items-center gap-3">
													{/* Rank Circle */}
													<div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white">
														<p className="text-h8 font-kondolar font-bold text-black">
															{index + 1}
														</p>
													</div>
													{/* Tag Name and Flames */}
													<div className="min-w-0 flex-1">
														<h3 className="text-h8 font-kondolar mb-1 font-bold text-black">
															{tag.name}
														</h3>
														<div className="flex items-center gap-2">
															<FireRating value={score} />
															<p className="text-b5 font-kondolar text-gray-1">
																({tag.sum_news.toLocaleString()} ข่าว)
															</p>
														</div>
													</div>
												</div>
												{/* Action Icons */}
												<div className="flex shrink-0 items-center gap-2">
													<button
														onClick={(e) => {
															e.stopPropagation();
															const tagId = String(tag.id);
															const isSelected = selectedTopics.some(
																(t) => t.id === tagId,
															);

															if (isSelected) {
																removeSelectedTopic(tagId);
															} else {
																// Convert tag to Topic format
																addSelectedTopic({
																	id: tagId,
																	label: tag.name,
																	value: tag.sum_news,
																	score: score,
																	relatedIds: [],
																});
															}
														}}
														className="flex h-8 w-8 cursor-pointer items-center justify-center transition-opacity hover:opacity-80"
													>
														{selectedTopics.some(
															(t) => t.id === String(tag.id),
														) ? (
															<Image
																src="/politicalflashback/icon/unfav.svg"
																alt="Favorite"
																width={32}
																height={32}
															/>
														) : (
															<Image
																src="/politicalflashback/icon/fav-add.svg"
																alt="Favorite"
																width={32}
																height={32}
															/>
														)}
													</button>
													<button className="flex h-8 w-8 cursor-pointer items-center justify-center transition-opacity hover:opacity-80">
														<Image
															src="/politicalflashback/icon/chevron-left.svg"
															alt="View details"
															width={32}
															height={32}
															className="rotate-180"
														/>
													</button>
												</div>
											</div>

											{/* Trend Chart Section */}
											<div className="p-4">
												<TrendChart
													bars={tag.chart.bars}
													globalDateRange={globalDateRange}
												/>
											</div>
										</div>
									);
								})}
							</div>
						</div>
					)}

					{/* Padding bottom to prevent content from being hidden behind DropZone */}
					<div className="h-32 pb-4"></div>
				</div>
			</main>

			{/* Drop Zone - DropZone component handles its own fixed positioning */}
			<DropZone />

			{/* Sort Dropdown - Fixed positioned outside container */}
			{showSortDropdown && (
				<div
					className="sort-dropdown-menu fixed z-20 min-w-[200px] overflow-hidden rounded-lg border-2 border-black bg-white shadow-lg"
					style={{
						top: `${dropdownPosition.top}px`,
						left: `${dropdownPosition.left}px`,
					}}
				>
					<button
						onClick={() => {
							handleSortChange('most_news');
							setShowSortDropdown(false);
						}}
						className={`text-h9 font-kondolar w-full border-b border-gray-200 px-4 py-2 text-left hover:bg-gray-100 ${
							sortOption === 'most_news' ? 'bg-gray-100' : ''
						}`}
					>
						ข่าวเยอะสุด
					</button>
					<button
						onClick={() => {
							handleSortChange('least_news');
							setShowSortDropdown(false);
						}}
						className={`text-h9 font-kondolar w-full border-b border-gray-200 px-4 py-2 text-left hover:bg-gray-100 ${
							sortOption === 'least_news' ? 'bg-gray-100' : ''
						}`}
					>
						ข่าวน้อยสุด
					</button>
					<button
						onClick={() => {
							handleSortChange('longest_news');
							setShowSortDropdown(false);
						}}
						className={`text-h9 font-kondolar flex w-full items-center justify-between border-b border-gray-200 px-4 py-2 text-left hover:bg-gray-100 ${
							sortOption === 'longest_news' ? 'bg-gray-100' : ''
						}`}
					>
						<span>เป็นข่าวนานสุด</span>
						<span className="h-2 w-2 rounded-full bg-amber-700"></span>
					</button>
					<button
						onClick={() => {
							handleSortChange('shortest_news');
							setShowSortDropdown(false);
						}}
						className={`text-h9 font-kondolar w-full border-b border-gray-200 px-4 py-2 text-left hover:bg-gray-100 ${
							sortOption === 'shortest_news' ? 'bg-gray-100' : ''
						}`}
					>
						เป็นข่าวสั้นสุด
					</button>
					<button
						onClick={() => {
							handleSortChange('oldest');
							setShowSortDropdown(false);
						}}
						className={`text-h9 font-kondolar flex w-full items-center justify-between border-b border-gray-200 px-4 py-2 text-left hover:bg-gray-100 ${
							sortOption === 'oldest' ? 'bg-gray-100' : ''
						}`}
					>
						<span>เก่าสุด</span>
						<span className="h-2 w-2 rounded-full bg-amber-700"></span>
					</button>
					<button
						onClick={() => {
							handleSortChange('newest');
							setShowSortDropdown(false);
						}}
						className={`text-h9 font-kondolar w-full border-b border-gray-200 px-4 py-2 text-left hover:bg-gray-100 ${
							sortOption === 'newest' ? 'bg-gray-100' : ''
						}`}
					>
						ใหม่สุด
					</button>
					<button
						onClick={() => {
							handleSortChange('random');
							setShowSortDropdown(false);
						}}
						className={`text-h9 font-kondolar flex w-full items-center justify-between px-4 py-2 text-left hover:bg-gray-100 ${
							sortOption === 'random' ? 'bg-gray-100' : ''
						}`}
					>
						<span>สุ่ม</span>
						<span className="text-lg">🎲</span>
					</button>
				</div>
			)}

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

export default ListviewPage;
