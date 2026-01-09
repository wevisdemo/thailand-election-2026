'use client';

import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { useTopicStore, Topic } from '@/src/stores/topicStore';
import { useRouter } from 'next/navigation';
import DropZone from '@/src/components/DropZone';
import Image from 'next/image';

interface MonthlyData {
	year: string;
	months: Array<{
		id: number;
		name: string;
		sum_news: number;
		tags: Array<{
			id: number;
			name: string;
			sum_news: number;
		}>;
	}>;
}

const MonthlyPage = () => {
	const { setTopics, selectedTopics } = useTopicStore();
	const pathname = usePathname();
	const isHomePath =
		pathname === '/home' || pathname === '/politicalflashback/home';
	const router = useRouter();
	const isMonthlyPath =
		pathname === '/monthly' || pathname === '/politicalflashback/monthly';

	const [monthlyData, setMonthlyData] = useState<MonthlyData[]>([]);
	const [selectedYearIndex, setSelectedYearIndex] = useState(0);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		fetch('/politicalflashback/home_monthly_view.json')
			.then((res) => res.json())
			.then((data: MonthlyData[]) => {
				setMonthlyData(data);
				setLoading(false);
			})
			.catch((error) => {
				console.error('Failed to load monthly data:', error);
				setLoading(false);
			});
	}, []);

	// Scroll detection to update selectedYearIndex
	useEffect(() => {
		if (monthlyData.length === 0) return;

		const scrollContainer = document.querySelector(
			'[data-scroll-container]',
		) as HTMLElement;
		if (!scrollContainer) return;

		const handleScroll = () => {
			const scrollTop = scrollContainer.scrollTop;
			const containerRect = scrollContainer.getBoundingClientRect();
			const viewportTop = scrollTop;
			const stickyHeaderHeight = 50; // Approximate height of sticky header

			// Find which section is most visible in the viewport
			let currentIndex = 0;
			let maxVisibility = 0;

			monthlyData.forEach((_, index) => {
				const element = document.getElementById(`year-section-${index}`);
				if (element) {
					const elementTop = element.offsetTop;
					const elementBottom = elementTop + element.offsetHeight;

					// Calculate how much of the section is visible
					const visibleTop = Math.max(viewportTop, elementTop);
					const visibleBottom = Math.min(
						viewportTop + containerRect.height,
						elementBottom,
					);
					const visibleHeight = Math.max(
						0,
						visibleBottom - visibleTop - stickyHeaderHeight,
					);

					if (visibleHeight > maxVisibility) {
						maxVisibility = visibleHeight;
						currentIndex = index;
					}
				}
			});

			setSelectedYearIndex(currentIndex);
		};

		// Use IntersectionObserver for better performance
		const observerOptions = {
			root: scrollContainer,
			rootMargin: '-100px 0px -50% 0px', // Account for sticky header
			threshold: 0.1,
		};

		const observers: IntersectionObserver[] = [];
		monthlyData.forEach((_, index) => {
			const element = document.getElementById(`year-section-${index}`);
			if (element) {
				const observer = new IntersectionObserver((entries) => {
					entries.forEach((entry) => {
						if (entry.isIntersecting) {
							setSelectedYearIndex(index);
						}
					});
				}, observerOptions);
				observer.observe(element);
				observers.push(observer);
			}
		});

		// Fallback to scroll event for initial state
		scrollContainer.addEventListener('scroll', handleScroll);
		handleScroll(); // Initial check

		return () => {
			scrollContainer.removeEventListener('scroll', handleScroll);
			observers.forEach((observer) => observer.disconnect());
		};
	}, [monthlyData]);

	const handleYearUp = (currentIndex: number) => {
		if (currentIndex > 0) {
			const targetIndex = currentIndex - 1;
			const element = document.getElementById(`year-section-${targetIndex}`);
			if (element) {
				element.scrollIntoView({ behavior: 'smooth', block: 'start' });
				setSelectedYearIndex(targetIndex);
			}
		}
	};

	const handleYearDown = (currentIndex: number) => {
		if (currentIndex < monthlyData.length - 1) {
			const targetIndex = currentIndex + 1;
			const element = document.getElementById(`year-section-${targetIndex}`);
			if (element) {
				element.scrollIntoView({ behavior: 'smooth', block: 'start' });
				setSelectedYearIndex(targetIndex);
			}
		}
	};

	// Function to generate route ID from month data
	const getMonthRouteId = (monthName: string, buddhistYear: string): string => {
		// Convert Buddhist era year to AD year (subtract 543)
		const adYear = parseInt(buddhistYear) - 543;

		// Map Thai month names to month numbers
		const monthMap: { [key: string]: number } = {
			มกราคม: 1,
			กุมภาพันธ์: 2,
			มีนาคม: 3,
			เมษายน: 4,
			พฤษภาคม: 5,
			มิถุนายน: 6,
			กรกฎาคม: 7,
			สิงหาคม: 8,
			กันยายน: 9,
			ตุลาคม: 10,
			พฤศจิกายน: 11,
			ธันวาคม: 12,
		};

		// Extract month name from "มีนาคม 66" format
		const monthNameMatch = monthName.match(/^([^\s]+)/);
		if (monthNameMatch) {
			const thaiMonth = monthNameMatch[1];
			const monthNumber = monthMap[thaiMonth];
			if (monthNumber) {
				return `${adYear}-${monthNumber}`;
			}
		}

		// Fallback: return empty string if parsing fails
		return '';
	};

	const handleMonthClick = (
		month: { id: number; name: string },
		year: string,
	) => {
		const routeId = getMonthRouteId(month.name, year);
		if (routeId) {
			router.push(`/monthly/${routeId}`);
		}
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
							className="text-h9 font-kondolar w-full rounded-tr-full rounded-br-full border-2 border-black bg-white px-5 py-3 font-bold text-black transition-colors hover:bg-gray-100"
							onClick={() => router.push('/listview')}
						>
							ทั้งหมด
						</button>
					</div>

					{/* Right side - Search button */}
					<button className="flex items-center justify-center rounded-full border-2 border-black bg-white p-1 transition-colors hover:bg-gray-100">
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
					data-scroll-container
					className="h-full overflow-y-auto overscroll-contain"
					style={{ WebkitOverflowScrolling: 'touch' }}
				>
					<div className="mx-4 my-10 flex flex-col items-center gap-2">
						<Image
							src="/politicalflashback/icon/mini-monthly.svg"
							alt="Monthly"
							width={40}
							height={40}
						/>
						<div className="flex flex-col items-center justify-center">
							<p className="text-h4 font-kondolar font-black text-black">
								ประเด็นเด่นรายเดือน
							</p>
							<p className="text-h8 font-sriracha text-green-1">
								จาก "ยุบสภา 66" ถึง "ยุบสภา 69"
							</p>
						</div>
					</div>

					{/* Monthly View UI */}
					{!loading && monthlyData.length > 0 && (
						<div className="mx-auto mb-12 max-w-[600px]">
							{/* All Year Sections */}
							{monthlyData.map((yearData, yearIndex) => (
								<div
									key={yearData.year}
									id={`year-section-${yearIndex}`}
									className="mb-6 scroll-mt-0"
								>
									{/* Purple Header Bar - Sticky on scroll for each year */}
									<div className="bg-purple-2 sticky top-0 z-20 flex items-center justify-between px-4 py-2">
										<div className="flex items-center gap-2">
											<Image
												src="/politicalflashback/icon/icon-calenda.svg"
												alt="Calendar"
												width={24}
												height={24}
												className=""
											/>
											<p className="text-h9 font-kondolar font-bold text-white">
												{yearData.year}
											</p>
										</div>
										<div className="flex gap-0.5">
											<button
												onClick={() => handleYearUp(yearIndex)}
												disabled={yearIndex === 0}
												className={`${yearIndex === 0 ? 'cursor-not-allowed opacity-50' : 'hover:opacity-80'}`}
											>
												<Image
													src="/politicalflashback/icon/chevron-up.svg"
													alt="Up"
													width={24}
													height={24}
													className="brightness-0 invert"
												/>
											</button>
											<button
												onClick={() => handleYearDown(yearIndex)}
												disabled={yearIndex === monthlyData.length - 1}
												className={`${yearIndex === monthlyData.length - 1 ? 'cursor-not-allowed opacity-50' : 'hover:opacity-80'}`}
											>
												<Image
													src="/politicalflashback/icon/chevron-up.svg"
													alt="Up"
													width={24}
													height={24}
													className="rotate-180 brightness-0 invert"
												/>
											</button>
										</div>
									</div>

									{/* Month Cards */}
									<div className="mx-4 mt-4 flex flex-col gap-4">
										{yearData.months.map((month) => (
											<button
												key={month.id}
												onClick={() => handleMonthClick(month, yearData.year)}
												className="cursor-pointer rounded-2xl border-2 border-black bg-white p-4 text-left transition-colors hover:bg-gray-50"
											>
												{/* Month Header */}
												<div className="mb-3 flex items-center justify-between">
													<h3 className="text-h6 font-kondolar font-bold text-black">
														{month.name}
													</h3>
													<Image
														src="/politicalflashback/icon/chevron-left.svg"
														alt="Arrow"
														width={24}
														height={24}
														className="rotate-180"
													/>
												</div>

												{/* Divider */}
												<div className="mb-3 border-t-2 border-black"></div>

												{/* Tags */}
												<div className="flex flex-col gap-2">
													{month.tags.map((tag, index) => (
														<div
															key={tag.id}
															className="flex items-center gap-1"
														>
															<p className="text-b4 font-ibmplex font-bold text-black">
																{index + 1}.
															</p>
															<button
																className="bg-purple-3 hover:bg-purple-2 rounded-full px-4 py-2 transition-colors"
																onClick={(e) => {
																	e.stopPropagation();
																	router.push(
																		`/story?name=${encodeURIComponent(tag.name)}`,
																	);
																}}
															>
																<p className="text-h9 font-kondolar font-bold text-black">
																	{tag.name}
																</p>
															</button>
														</div>
													))}
												</div>
											</button>
										))}
									</div>

									{/* Year Footer - Only show on last year */}
									{yearIndex === monthlyData.length - 1 && (
										<div className="mx-4 mt-6 mb-12 md:mx-0">
											<div className="border-purple-2 flex w-full items-center justify-center rounded-full border-2 bg-white px-4 py-2">
												<p className="text-h9 font-sriracha text-purple-2">
													เริ่มต้น: #ประยุทธ์ยุบสภา66 20 มี.ค 66
												</p>
											</div>
										</div>
									)}
								</div>
							))}
						</div>
					)}

					{loading && (
						<div className="mx-4 py-10 text-center">
							<p className="text-h7 font-kondolar text-black">กำลังโหลด...</p>
						</div>
					)}

					{/* Padding bottom to prevent content from being hidden behind DropZone */}
					<div className="h-32 pb-4"></div>
				</div>
			</main>

			{/* Drop Zone - DropZone component handles its own fixed positioning */}
			<DropZone />
		</div>
	);
};

export default MonthlyPage;
