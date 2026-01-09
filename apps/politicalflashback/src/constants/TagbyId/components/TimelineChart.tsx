'use client';

import Image from 'next/image';
import React, {
	useState,
	useEffect,
	useMemo,
	useRef,
	useCallback,
} from 'react';

interface ChartBar {
	date: string;
	value: number;
}

interface ChartRange {
	start: string;
	end: string;
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

interface StoryChartProps {
	chart: Chart;
	knobPosition?: number;
	onKnobPositionChange?: (position: number) => void;
}

const StoryChart = ({
	chart,
	knobPosition: externalKnobPosition,
	onKnobPositionChange,
}: StoryChartProps) => {
	const [internalKnobPosition, setInternalKnobPosition] = useState(0);
	const [isDragging, setIsDragging] = useState(false);
	const [hoverPosition, setHoverPosition] = useState<number | null>(null);
	const timelineRef = useRef<HTMLDivElement>(null);

	// Use external position if provided, otherwise use internal state
	const knobPosition =
		externalKnobPosition !== undefined
			? externalKnobPosition
			: internalKnobPosition;

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

	// Get events for a given month index
	const getEventsForMonthIndex = (monthIndex: number) => {
		if (chartData.allMonths.length === 0 || !chart.events) return [];
		const month =
			chartData.allMonths[
				Math.max(0, Math.min(monthIndex, chartData.allMonths.length - 1))
			];
		if (!month) return [];

		// Find all events that match this month (compare by month key YYYY-MM)
		return chart.events.filter((event) => {
			const eventMonthKey = event.date.substring(0, 7);
			return eventMonthKey === month.date;
		});
	};

	const updatePosition = useCallback(
		(clientX: number) => {
			if (timelineRef.current) {
				const rect = timelineRef.current.getBoundingClientRect();
				const x = clientX - rect.left;
				const position = Math.max(0, Math.min(100, (x / rect.width) * 100));

				if (externalKnobPosition === undefined) {
					setInternalKnobPosition(position);
				}

				if (onKnobPositionChange) {
					onKnobPositionChange(position);
				}
			}
		},
		[externalKnobPosition, onKnobPositionChange],
	);

	const handleMouseMove = (e: React.MouseEvent) => {
		if (!isDragging && timelineRef.current) {
			const rect = timelineRef.current.getBoundingClientRect();
			const x = e.clientX - rect.left;
			const position = Math.max(0, Math.min(100, (x / rect.width) * 100));
			setHoverPosition(position);
		}
	};

	const handleMouseEnter = () => {
		// Hover position will be set by handleMouseMove
	};

	const handleMouseLeave = () => {
		if (!isDragging) {
			setHoverPosition(null);
		}
	};

	const handleMouseDown = (e: React.MouseEvent) => {
		e.preventDefault();
		setIsDragging(true);
		updatePosition(e.clientX);
	};

	const handleMouseUp = () => {
		setIsDragging(false);
		// Scroll to the selected position when released
		scrollToPosition(knobPosition);
	};

	const scrollToPosition = useCallback(
		(position: number) => {
			if (timelineRef.current && chartData.allMonths.length > 0) {
				// Calculate the position in pixels
				const rect = timelineRef.current.getBoundingClientRect();
				const targetX = (position / 100) * rect.width;
				const centerX = rect.left + targetX;

				// Try to scroll parent containers to center the selected position
				let element: HTMLElement | null = timelineRef.current;
				while (element) {
					const parent: HTMLElement | null = element.parentElement;
					if (!parent) break;

					const parentRect = parent.getBoundingClientRect();
					const scrollableWidth = parent.scrollWidth - parent.clientWidth;

					if (scrollableWidth > 0) {
						const relativeX = centerX - parentRect.left;
						const scrollLeft =
							parent.scrollLeft + (relativeX - parentRect.width / 2);

						parent.scrollTo({
							left: Math.max(0, Math.min(scrollLeft, scrollableWidth)),
							behavior: 'smooth',
						});
					}

					// Also try window scroll if needed
					if (parent === document.body || parent === document.documentElement) {
						const windowCenter = window.innerWidth / 2;
						const scrollX = centerX - windowCenter;
						window.scrollTo({
							left: Math.max(0, window.scrollX + scrollX),
							behavior: 'smooth',
						});
						break;
					}

					element = parent;
				}
			}
		},
		[chartData.allMonths.length],
	);

	// Handle global mouse move and up for dragging
	useEffect(() => {
		if (isDragging) {
			const handleGlobalMouseMove = (e: MouseEvent) => {
				updatePosition(e.clientX);
			};

			const handleGlobalMouseUp = () => {
				setIsDragging(false);
				// Scroll to the selected position when released
				const currentPosition =
					externalKnobPosition !== undefined
						? externalKnobPosition
						: internalKnobPosition;
				scrollToPosition(currentPosition);
				// Reset hover position after dragging
				setHoverPosition(null);
			};

			window.addEventListener('mousemove', handleGlobalMouseMove);
			window.addEventListener('mouseup', handleGlobalMouseUp);

			return () => {
				window.removeEventListener('mousemove', handleGlobalMouseMove);
				window.removeEventListener('mouseup', handleGlobalMouseUp);
			};
		}
	}, [
		isDragging,
		updatePosition,
		externalKnobPosition,
		internalKnobPosition,
		scrollToPosition,
	]);

	return (
		<div className="relative mt-3 rounded-2xl border-2 border-black bg-white p-4">
			{/* Full-height hover indicator */}
			{hoverPosition !== null && (
				<div
					className="absolute inset-y-0 left-0 z-0 rounded-l-2xl bg-black/20"
					style={{
						width: `${hoverPosition - 1}%`,
					}}
				/>
			)}

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
				className="relative cursor-pointer"
				ref={timelineRef}
				onMouseDown={handleMouseDown}
				onMouseUp={handleMouseUp}
				onMouseMove={handleMouseMove}
				onMouseEnter={handleMouseEnter}
				onMouseLeave={handleMouseLeave}
				onClick={(e) => {
					// Make entire box clickable
					if (!isDragging) {
						updatePosition(e.clientX);
						// Scroll to clicked position
						if (timelineRef.current) {
							const rect = timelineRef.current.getBoundingClientRect();
							const x = e.clientX - rect.left;
							const position = Math.max(
								0,
								Math.min(100, (x / rect.width) * 100),
							);
							scrollToPosition(position);
						}
					}
				}}
			>
				<div className="absolute top-0 right-0 left-0 z-0 h-[2px] bg-black"></div>

				{/* Gray bar that moves with knob */}
				{hoverPosition !== null && (
					<>
						<div
							className="bg-green-1 absolute top-0 z-50 h-[2px]"
							style={{
								left: '0%',
								width: `${hoverPosition}%`,
							}}
						/>
						<div
							className="absolute top-0 z-50"
							style={{
								left: `${hoverPosition - 2}%`,
							}}
						>
							<Image
								src="/politicalflashback/icon/node-chart.svg"
								alt="Timeline Chart Hover"
								width={16}
								height={16}
							/>
						</div>
					</>
				)}

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
							</div>
						);
					})}
				</div>

				{/* Tooltip for Prime Minister Changes - show all events */}
				{hoverPosition !== null &&
					chartData.allMonths.map((month, monthIndex) => {
						// Get all events for this month
						const events = getEventsForMonthIndex(monthIndex);
						if (events.length === 0) return null;

						// Calculate position of the month
						const monthPosition =
							chartData.allMonths.length > 1
								? (monthIndex / (chartData.allMonths.length - 1)) * 100
								: 0;

						return (
							<div
								key={monthIndex}
								className="absolute -top-20 z-10 -translate-x-1/2 transform"
								style={{
									left: `${monthPosition}%`,
								}}
							>
								{events.map((event, index) => (
									<div
										key={event.id}
										className="mb-1 last:mb-0"
										style={{
											marginBottom: index < events.length - 1 ? '4px' : '0',
										}}
									>
										<div className="bg-green-3 text-h11 font-sriracha rounded-full px-2 py-1 text-black">
											{event.label}
										</div>
									</div>
								))}
								<div className="border-t-green-3 mx-auto h-0 w-0 border-t-8 border-r-[6px] border-l-[6px] border-r-transparent border-l-transparent"></div>
								<div className="bg-green-3 mx-auto h-11 w-[1px]"></div>
							</div>
						);
					})}

				{/* Tooltip for Month Label - show when hovering or dragging */}
				{(hoverPosition !== null || isDragging) && (
					<div
						className="absolute -top-14 z-20 -translate-x-1/2 transform"
						style={{
							left: `${
								isDragging ? knobPosition : hoverPosition || knobPosition
							}%`,
						}}
					>
						<div className="bg-green-1 text-h11 font-sriracha rounded-full px-2 py-1 whitespace-nowrap text-white">
							{getCurrentMonthLabel(
								isDragging ? knobPosition : hoverPosition || knobPosition,
							)}
						</div>
						<div className="border-t-green-1 mx-auto h-0 w-0 border-t-8 border-r-[6px] border-l-[6px] border-r-transparent border-l-transparent"></div>
					</div>
				)}
			</div>
		</div>
	);
};

export default StoryChart;
