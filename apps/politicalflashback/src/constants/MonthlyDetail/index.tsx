'use client';

import { useState, useEffect, useMemo } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { useTopicStore } from '@/src/stores/topicStore';
import DropZone from '@/src/components/DropZone';
import FireRating from '@/src/components/FireRating';
import Image from 'next/image';

interface Tag {
	id: number;
	name: string;
	sum_news: number;
	score: number;

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

interface MonthlyDetailData {
	by_month: {
		id: number;
		name: string;
		sum_news: number;
		next_month: string;
		prev_month: string;
		tags: Tag[];
	};
}

// Component to render trend chart
const TrendChart = ({
	bars,
}: {
	bars: Array<{ date: string; value: number }>;
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

		// Find first and last date
		if (bars.length === 0) {
			return {
				labels: [],
				values: [],
				maxValue: 1,
				dates: [],
			};
		}

		const sortedBars = [...bars].sort((a, b) => a.date.localeCompare(b.date));
		const firstDate = sortedBars[0].date;
		const lastDate = sortedBars[sortedBars.length - 1].date;

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
	}, [bars]);

	// Max bar height is 24px
	const MAX_BAR_HEIGHT = 24;

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
			<div className="relative">
				{/* Horizontal timeline line */}
				<div className="absolute top-0 right-0 left-0 h-[2px] bg-black"></div>

				{/* Tick marks and labels */}
				<div className="relative flex items-start gap-1 pt-[2px]">
					{chartData.values.map((value, index) => {
						const hasLabel = !!chartData.labels[index];

						return (
							<div
								key={index}
								className="relative flex flex-1 flex-col items-center"
							>
								{/* Tick mark extending upward - same height for all */}
								<div
									className="bg-black"
									style={{
										width: '1px',
										height: '4px',
										marginTop: '0',
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

const MonthlyDetailPage = () => {
	const { setTopics, selectedTopics, addSelectedTopic, removeSelectedTopic } =
		useTopicStore();
	const pathname = usePathname();
	const router = useRouter();

	// Extract ID from pathname (e.g., /monthly/2023-3 or /politicalflashback/monthly/2023-3)
	const pathSegments = pathname.split('/');
	const id = pathSegments[pathSegments.length - 1];

	const [monthlyData, setMonthlyData] = useState<MonthlyDetailData | null>(
		null,
	);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		if (!id) {
			setError('Invalid month ID');
			setLoading(false);
			return;
		}

		fetch(`/politicalflashback/monthly-view-by-month/${id}.json`)
			.then((res) => {
				if (!res.ok) {
					throw new Error('Failed to load monthly data');
				}
				return res.json();
			})
			.then((data: MonthlyDetailData) => {
				setMonthlyData(data);
				setLoading(false);
			})
			.catch((error) => {
				console.error('Failed to load monthly data:', error);
				setError('Failed to load data');
				setLoading(false);
			});
	}, [id]);

	const handleBackClick = () => {
		router.push('/monthly');
	};

	// Helper function to generate label from month ID (format: "YYYY-M")
	const getMonthLabel = (monthId: string): string => {
		if (!monthId || monthId === '') return '';

		const [year, month] = monthId.split('-').map(Number);
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

		const buddhistYear = year + 543;
		const yearShort = buddhistYear.toString().slice(-2);
		return `${monthNames[month - 1]} ${yearShort}`;
	};

	// Get navigation values from monthlyData
	const prevMonth = monthlyData?.by_month.prev_month || '';
	const nextMonth = monthlyData?.by_month.next_month || '';
	const prevLabel = prevMonth ? getMonthLabel(prevMonth) : '';
	const nextLabel = nextMonth ? getMonthLabel(nextMonth) : '';

	const handlePrevMonth = () => {
		if (prevMonth && prevMonth !== '') {
			router.push(`/monthly/${prevMonth}`);
		}
	};

	const handleNextMonth = () => {
		if (nextMonth && nextMonth !== '') {
			router.push(`/monthly/${nextMonth}`);
		}
	};

	return (
		<div className="bg-bg relative flex h-screen w-full flex-col overflow-hidden">
			{/* Main Content Area */}
			<main className="relative z-10 min-h-0 flex-1 overflow-hidden">
				<div
					className="h-full overflow-y-auto overscroll-contain"
					style={{ WebkitOverflowScrolling: 'touch' }}
				>
					{/* Back button */}
					<div className="mx-4 mt-4 mb-2">
						<button
							onClick={handleBackClick}
							className="flex items-center gap-2 rounded-full border-2 border-black bg-white p-1 text-black transition-opacity hover:opacity-80"
						>
							<Image
								src="/politicalflashback/icon/chevron-left.svg"
								alt="Back"
								width={40}
								height={40}
							/>
						</button>
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

					{!loading && !error && monthlyData && (
						<div className="mx-auto mb-12 max-w-[600px]">
							{/* Header Section */}
							<div className="mx-4 mb-6 text-center">
								<p className="text-b4 font-ibmplex text-black">
									รวมประเด็นร้อนประจำเดือน
								</p>
								<h1 className="text-h4 font-kondolar font-black text-black">
									{monthlyData.by_month.name}
								</h1>
								<p className="text-b5 font-ibmplex text-black">สมัยรัฐบาล</p>
							</div>

							{/* Summary Bar */}
							<div className="mx-4 mb-6">
								<div className="border-t-2 border-black p-4">
									<p className="text-h9 font-kondolar text-center text-black">
										{monthlyData.by_month.tags.length} ประเด็น จาก{' '}
										{monthlyData.by_month.sum_news.toLocaleString()} ข่าว
									</p>
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
								{monthlyData.by_month.tags.map((tag, index) => (
									<div
										key={tag.id}
										className="overflow-hidden rounded-2xl border-2 border-black bg-white"
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
														<FireRating value={tag.score} />
														<p className="text-b5 font-kondolar text-gray-1">
															({tag.sum_news.toLocaleString()} ข่าว)
														</p>
													</div>
												</div>
											</div>
											{/* Action Icons */}
											<div className="flex shrink-0 items-center gap-2">
												<button
													onClick={() => {
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
																score: tag.score,
																relatedIds: [],
															});
														}
													}}
													className="flex h-8 w-8 items-center justify-center transition-opacity hover:opacity-80"
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
												<button className="flex h-8 w-8 items-center justify-center transition-opacity hover:opacity-80">
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
											<TrendChart bars={tag.chart.bars} />
										</div>
									</div>
								))}
							</div>

							{/* Month Navigation */}
							{(prevMonth || nextMonth) && (
								<div className="mx-4 mt-6 mb-10 flex items-center justify-between">
									{/* Previous Month */}
									{prevMonth ? (
										<div className="flex items-center gap-2">
											<button
												onClick={handlePrevMonth}
												className="flex h-12 w-12 items-center justify-center rounded-full border-2 border-black bg-white transition-opacity hover:opacity-80"
											>
												<Image
													src="/politicalflashback/icon/chevron-left.svg"
													alt="Previous"
													width={48}
													height={48}
												/>
											</button>
											{prevLabel && (
												<p className="text-h8 font-kondolar font-bold text-black">
													{prevLabel}
												</p>
											)}
										</div>
									) : (
										<div></div>
									)}

									{/* Next Month */}
									{nextMonth ? (
										<div className="flex items-center gap-2">
											{nextLabel && (
												<p className="text-h8 font-kondolar font-bold text-black">
													{nextLabel}
												</p>
											)}
											<button
												onClick={handleNextMonth}
												className="relative flex h-12 w-12 items-center justify-center rounded-full border-2 border-black bg-white transition-opacity hover:opacity-80"
											>
												<Image
													src="/politicalflashback/icon/chevron-left.svg"
													alt="Next"
													width={48}
													height={48}
													className="rotate-180"
												/>
											</button>
										</div>
									) : (
										<div></div>
									)}
								</div>
							)}
						</div>
					)}
					{/* Padding bottom to prevent content from being hidden behind DropZone */}
					<div className="h-32 pb-4 md:h-36"></div>
				</div>
			</main>

			{/* Drop Zone */}
			<DropZone />
		</div>
	);
};

export default MonthlyDetailPage;
