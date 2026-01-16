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
	globalDateRange?: { start: string; end: string };
}

const StoryChart = ({
	chart,
	knobPosition: externalKnobPosition,
	onKnobPositionChange,
	globalDateRange,
}: StoryChartProps) => {
	const [internalKnobPosition, setInternalKnobPosition] = useState(0);
	const [isDragging, setIsDragging] = useState(false);
	const [hoverPosition, setHoverPosition] = useState<number>(0);
	const [hasInteracted, setHasInteracted] = useState(false);
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

		// Determine first and last date - use global range if provided, otherwise use bars data
		let firstDate: string;
		let lastDate: string;

		if (globalDateRange) {
			// Use global date range
			firstDate = globalDateRange.start;
			lastDate = globalDateRange.end;
		} else if (chart.bars.length === 0) {
			return {
				labels: [],
				values: [],
				maxValue: 1,
				dates: [],
				allMonths: [],
			};
		} else {
			// Fall back to bars data
			const sortedBars = [...chart.bars].sort((a, b) =>
				a.date.localeCompare(b.date),
			);
			firstDate = sortedBars[0].date;
			lastDate = sortedBars[sortedBars.length - 1].date;
		}

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
	}, [chart.bars, globalDateRange]);

	const MAX_BAR_HEIGHT = 24;

	const totalMonths = chartData.values.length;
	const widthPercent = totalMonths > 0 ? 100 / totalMonths : 0;

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

				// Update hover position during mouse drag
				setHoverPosition(position);
			}
		},
		[externalKnobPosition, onKnobPositionChange],
	);

	const updatePositionFromTouch = useCallback(
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

				// Update hover position during touch
				setHoverPosition(position);
			}
		},
		[externalKnobPosition, onKnobPositionChange],
	);

	// Note: handleMouseMove, handleMouseEnter, handleMouseLeave removed
	// to prevent hoverPosition updates during scroll which caused displayPosition to change
	// hoverPosition is now only updated during active dragging via updatePosition

	const handleMouseDown = (e: React.MouseEvent) => {
		e.preventDefault();
		setIsDragging(true);
		setHasInteracted(true);
		updatePosition(e.clientX);
	};

	const handleMouseUp = () => {
		setIsDragging(false);
		setHasInteracted(true);
		// Keep knob visible at current position after mouse release
		setHoverPosition(knobPosition);
	};

	const handleTouchStart = (e: React.TouchEvent) => {
		e.preventDefault();
		if (e.touches.length > 0) {
			setIsDragging(true);
			updatePositionFromTouch(e.touches[0].clientX);
		}
	};

	const handleTouchMove = (e: React.TouchEvent) => {
		if (isDragging && e.touches.length > 0) {
			e.preventDefault();
			updatePositionFromTouch(e.touches[0].clientX);
		}
	};

	const handleTouchEnd = () => {
		if (isDragging) {
			setIsDragging(false);
			const currentPosition =
				externalKnobPosition !== undefined
					? externalKnobPosition
					: internalKnobPosition;
			// Keep knob visible at current position after touch ends
			setHoverPosition(currentPosition);
		}
	};

	const handleTouchCancel = () => {
		setIsDragging(false);
		setHoverPosition(knobPosition);
	};

	// Sync hoverPosition with external knob position when it changes (e.g., from scroll)
	useEffect(() => {
		if (externalKnobPosition !== undefined && !isDragging) {
			setHoverPosition(externalKnobPosition);
			setHasInteracted(true);
		}
	}, [externalKnobPosition, isDragging]);

	// Handle global mouse move and up for dragging
	useEffect(() => {
		if (isDragging) {
			const handleGlobalMouseMove = (e: MouseEvent) => {
				updatePosition(e.clientX);
			};

			const handleGlobalMouseUp = () => {
				setIsDragging(false);
				setHasInteracted(true);
				const currentPosition =
					externalKnobPosition !== undefined
						? externalKnobPosition
						: internalKnobPosition;
				// Keep knob visible at current position after mouse release
				setHoverPosition(currentPosition);
			};

			const handleGlobalTouchMove = (e: TouchEvent) => {
				if (e.touches.length > 0) {
					e.preventDefault();
					updatePositionFromTouch(e.touches[0].clientX);
				}
			};

			const handleGlobalTouchEnd = () => {
				setIsDragging(false);
				const currentPosition =
					externalKnobPosition !== undefined
						? externalKnobPosition
						: internalKnobPosition;
				// Keep knob visible at current position after touch ends
				setHoverPosition(currentPosition);
			};

			const handleGlobalTouchCancel = () => {
				setIsDragging(false);
				setHoverPosition(knobPosition);
			};

			window.addEventListener('mousemove', handleGlobalMouseMove);
			window.addEventListener('mouseup', handleGlobalMouseUp);
			window.addEventListener('touchmove', handleGlobalTouchMove, {
				passive: false,
			});
			window.addEventListener('touchend', handleGlobalTouchEnd);
			window.addEventListener('touchcancel', handleGlobalTouchCancel);

			return () => {
				window.removeEventListener('mousemove', handleGlobalMouseMove);
				window.removeEventListener('mouseup', handleGlobalMouseUp);
				window.removeEventListener('touchmove', handleGlobalTouchMove);
				window.removeEventListener('touchend', handleGlobalTouchEnd);
				window.removeEventListener('touchcancel', handleGlobalTouchCancel);
			};
		}
	}, [
		isDragging,
		updatePosition,
		updatePositionFromTouch,
		externalKnobPosition,
		internalKnobPosition,
		knobPosition,
	]);

	// Calculate display position - always use knobPosition which is stable and not affected by scroll
	// knobPosition updates in real-time during drag via updatePosition/setInternalKnobPosition
	const displayPosition = knobPosition;

	return (
		<div className="relative mt-3 overflow-visible rounded-2xl border-2 border-black bg-white p-4">
			{/* Wrapper for bars and timeline - overlay is positioned relative to this */}

			<div
				className="absolute inset-y-0 left-0 z-0 rounded-l-2xl bg-black/20"
				style={{
					width: `16px`,
				}}
			/>
			<div className="relative">
				{/* Full-height hover indicator */}
				{hoverPosition >= 0 && (
					<div
						className="absolute inset-y-0 left-0 z-0 -my-4 bg-black/20"
						style={{
							width: `${Math.max(1, hoverPosition - 1)}%`,
						}}
					/>
				)}

				{/* Bars */}
				<div
					className="flex items-end"
					style={{ height: `${MAX_BAR_HEIGHT}px` }}
				>
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
				<div
					className="relative cursor-pointer touch-none overflow-visible"
					ref={timelineRef}
					onMouseDown={handleMouseDown}
					onMouseUp={handleMouseUp}
					onTouchStart={handleTouchStart}
					onTouchMove={handleTouchMove}
					onTouchEnd={handleTouchEnd}
					onTouchCancel={handleTouchCancel}
					onClick={(e) => {
						// Make entire box clickable
						if (!isDragging) {
							setHasInteracted(true);
							updatePosition(e.clientX);
							// Keep knob visible at clicked position
							if (timelineRef.current) {
								const rect = timelineRef.current.getBoundingClientRect();
								const x = e.clientX - rect.left;
								const position = Math.max(
									0,
									Math.min(100, (x / rect.width) * 100),
								);
								setHoverPosition(position);
							}
						}
					}}
				>
					<div className="absolute top-0 right-0 left-0 z-0 h-[2px] bg-black"></div>

					{/* Gray bar that moves with knob */}
					{hoverPosition >= 0 && (
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
									left: `${Math.max(0, hoverPosition - 2)}%`,
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

					<div className="relative flex pt-[2px]">
						{chartData.values.map((value, index) => {
							const hasLabel = !!chartData.labels[index];
							const position = (index / (chartData.values.length - 1)) * 100;

							return (
								<div
									key={index}
									className="relative flex flex-col items-center"
									style={{
										width: `${widthPercent}%`,
										flexShrink: 0,
									}}
								>
									<div
										className="bg-black"
										style={{
											width: '1px',
											height: '4px',
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

					{/* Tooltip for Prime Minister Changes - show all events only when dragging or hovering */}
					{isDragging &&
						hoverPosition > 0 &&
						chartData.allMonths.map((month, monthIndex) => {
							// Get all events for this month
							const events = getEventsForMonthIndex(monthIndex);
							if (events.length === 0) return null;

							// Calculate position of the month
							// Use (length - 2) if any event has label "นายก แพทองธาร", otherwise use (length - 1)
							const hasPaetongtarnEvent = events.some(
								(event) => event.label === 'นายก แพทองธาร',
							);
							const divisor = hasPaetongtarnEvent
								? chartData.allMonths.length - 2
								: chartData.allMonths.length - 1;
							const monthPosition =
								chartData.allMonths.length > 1
									? (monthIndex / divisor) * 100
									: 0;

							return (
								<div
									key={monthIndex}
									className="pointer-events-none absolute -top-20 z-10 -translate-x-1/2 transform"
									style={{
										left: `${monthPosition}%`,
										position: 'absolute',
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
									<div className="bg-green-3 mx-auto h-11 w-px"></div>
								</div>
							);
						})}

					{/* Tooltip for Month Label - show when hovering or dragging */}
					{hoverPosition > 0 && (
						<div
							className="pointer-events-none absolute -top-14 z-20 -translate-x-[38px] transform"
							style={{
								left: `${hoverPosition}%`,
								position: 'absolute',
							}}
						>
							<div className="bg-green-1 text-h11 font-sriracha rounded-full px-2 py-1 whitespace-nowrap text-white">
								{getCurrentMonthLabel(hoverPosition)}
							</div>
							<div className="border-t-green-1 mx-auto h-0 w-0 border-t-8 border-r-[6px] border-l-[6px] border-r-transparent border-l-transparent"></div>
						</div>
					)}
				</div>
			</div>
		</div>
	);
};

export default StoryChart;
