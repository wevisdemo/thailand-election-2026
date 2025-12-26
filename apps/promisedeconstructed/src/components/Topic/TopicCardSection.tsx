'use client';
import { Topic } from '@/constants/topic';
import { useState } from 'react';
import useMeasure from 'react-use-measure';
import { TopicCardSectionTitle } from './TopicCardSectionTitle';

export interface TopicCardSectionProps {
	type: Topic;
}

export const TopicCardSection = ({
	type,
	children,
}: React.PropsWithChildren<TopicCardSectionProps>) => {
	const [contentRef, { height }] = useMeasure();
	const [isExpanded, setIsExpanded] = useState(false);

	const contentHeight = ['problem', 'action', 'outcome_indicator'].includes(
		type,
	)
		? { mobile: 200, desktop: 280 }
		: { mobile: 90, desktop: 180 };

	return (
		<div
			className="group/section relative z-0 flex flex-col gap-2.5 py-2.5"
			data-expanded={isExpanded || undefined}
		>
			<TopicCardSectionTitle type={type} />
			{children ? (
				<>
					<div
						className="relative max-h-(--content-height) overflow-hidden overscroll-y-contain transition-[max-height] duration-300 ease-in-out will-change-[max-height] group-data-expanded/section:max-h-(--expanded-content-height) md:max-h-(--desktop-content-height)"
						style={
							{
								'--expanded-content-height': `${height}px`,
								'--content-height': `${contentHeight.mobile}px`,
								'--desktop-content-height': `${contentHeight.desktop}px`,
							} as React.CSSProperties
						}
					>
						<div ref={contentRef} className="topic-content pb-[47px]">
							{children}
						</div>
						<div className="from-bg absolute bottom-0 flex w-full justify-center bg-linear-to-t pt-12.5 transition-opacity duration-300 group-data-expanded/section:opacity-0" />
					</div>
					<button
						type="button"
						className="text-b6 text-purple-1 absolute bottom-0 left-1/2 flex -translate-x-1/2 items-center gap-1 py-2.5 transition-transform duration-300 ease-in-out group-data-expanded/section:-translate-y-2.5"
						onClick={() => setIsExpanded((s) => !s)}
					>
						<span className="underline">{isExpanded ? 'ซ่อน' : 'อ่านต่อ'}</span>
						<svg
							className="h-1.5 w-[9px] shrink-0 group-data-expanded/section:rotate-180"
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 9 6"
						>
							<path stroke="currentColor" d="M.354.354l4 4 4-4" />
						</svg>
					</button>
				</>
			) : (
				<p className="text-b4 text-topic-not-indicate">ไม่ระบุ</p>
			)}
		</div>
	);
};
