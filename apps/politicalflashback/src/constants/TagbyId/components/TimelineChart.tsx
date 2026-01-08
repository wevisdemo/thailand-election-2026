'use client';

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

const StoryChart = ({ chart }: { chart: Chart }) => {
	const [knobPosition, setKnobPosition] = useState(0);
	const [isDragging, setIsDragging] = useState(false);
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

	const updatePosition = useCallback((clientX: number) => {
		if (timelineRef.current) {
			const rect = timelineRef.current.getBoundingClientRect();
			const x = clientX - rect.left;
			const position = Math.max(0, Math.min(100, (x / rect.width) * 100));
			setKnobPosition(position);
		}
	}, []);

	const handleMouseDown = (e: React.MouseEvent) => {
		e.preventDefault();
		setIsDragging(true);
		updatePosition(e.clientX);
	};

	const handleMouseUp = () => {
		setIsDragging(false);
	};

	// Handle global mouse move and up for dragging
	useEffect(() => {
		if (isDragging) {
			const handleGlobalMouseMove = (e: MouseEvent) => {
				updatePosition(e.clientX);
			};

			const handleGlobalMouseUp = () => {
				setIsDragging(false);
			};

			window.addEventListener('mousemove', handleGlobalMouseMove);
			window.addEventListener('mouseup', handleGlobalMouseUp);

			return () => {
				window.removeEventListener('mousemove', handleGlobalMouseMove);
				window.removeEventListener('mouseup', handleGlobalMouseUp);
			};
		}
	}, [isDragging, updatePosition]);

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
				className="relative cursor-pointer"
				ref={timelineRef}
				onMouseDown={handleMouseDown}
				onMouseUp={handleMouseUp}
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
							</div>
						);
					})}
				</div>

				{/* Tooltip - only show when dragging */}
				{isDragging && (
					<div
						className="absolute -top-8 z-10 -translate-x-1/2 transform"
						style={{ left: `${knobPosition}%` }}
					>
						<div className="bg-green-1 text-b5 font-ibmplex rounded-lg px-2 py-1 whitespace-nowrap text-white">
							{getCurrentMonthLabel(knobPosition)}
						</div>
					</div>
				)}
			</div>
		</div>
	);
};

export default StoryChart;
