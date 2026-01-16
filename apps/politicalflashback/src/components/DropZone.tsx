'use client';

import Button from '@/src/components/Button';
import { useTopicStore } from '@/src/stores/topicStore';
import Image from 'next/image';
import { useCallback, useRef, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import FireRating from './FireRating';
import Footer from './Footer';

// Delete confirmation button component with hover/click expand
function DeleteButton({
	topicId,
	isConfirming,
	onDeleteClick,
	onConfirmDelete,
}: {
	topicId: string;
	isConfirming: boolean;
	onDeleteClick: (id: string) => void;
	onConfirmDelete: (id: string) => void;
}) {
	const [isHovered, setIsHovered] = useState(false);

	const showExpanded = isConfirming || isHovered;

	return (
		<div
			className="relative"
			onMouseEnter={() => setIsHovered(true)}
			onMouseLeave={() => setIsHovered(false)}
		>
			<button
				onClick={() => {
					if (showExpanded) {
						onConfirmDelete(topicId);
					} else {
						onDeleteClick(topicId);
					}
				}}
				className={`flex items-center justify-center rounded-full transition-all duration-300 ease-out ${
					showExpanded
						? 'gap-2 bg-[#CE4500] px-2 py-1'
						: 'h-8 w-8 bg-purple-100 hover:bg-purple-200'
				}`}
			>
				{showExpanded ? (
					<>
						<span className="font-kondolar text-h11 font-bold text-white">
							ลบ
						</span>
						<div className="flex h-7 w-7 items-center justify-center">
							<Image
								src="/politicalflashback/icon/button-fav.svg"
								alt="Remove"
								width={28}
								height={28}
								className="brightness-0 invert"
							/>
						</div>
					</>
				) : (
					<Image
						src="/politicalflashback/icon/button-fav.svg"
						alt="Remove"
						width={32}
						height={32}
					/>
				)}
			</button>
		</div>
	);
}

interface DropZoneProps {
	onHelpClick?: () => void;
	onExpandClick?: () => void;
	hideHelpButton?: boolean;
}

export default function DropZone({
	onHelpClick,
	onExpandClick,
	hideHelpButton = false,
}: DropZoneProps) {
	const {
		selectedTopics,
		draggedTopic,
		isOverDropZone,
		addSelectedTopic,
		removeSelectedTopic,
		setIsOverDropZone,
		setDraggedTopic,
		reorderSelectedTopics,
	} = useTopicStore();
	const router = useRouter();
	const pathname = usePathname();
	const [isExpanded, setIsExpanded] = useState(false);
	const [isHelpModalOpen, setIsHelpModalOpen] = useState(false);
	const [confirmDeleteId, setConfirmDeleteId] = useState<string | null>(null);
	const [draggedIndex, setDraggedIndex] = useState<number | null>(null);
	const [dragOverIndex, setDragOverIndex] = useState<number | null>(null);

	// Touch drag state
	const listRef = useRef<HTMLDivElement>(null);
	const itemRefs = useRef<(HTMLDivElement | null)[]>([]);

	const handleDragOver = useCallback(
		(e: React.DragEvent) => {
			e.preventDefault();
			if (!isOverDropZone) {
				setIsOverDropZone(true);
			}
		},
		[isOverDropZone, setIsOverDropZone],
	);

	const handleDragLeave = useCallback(
		(e: React.DragEvent) => {
			e.preventDefault();
			setIsOverDropZone(false);
		},
		[setIsOverDropZone],
	);

	const handleDrop = useCallback(
		(e: React.DragEvent) => {
			e.preventDefault();
			setIsOverDropZone(false);

			if (draggedTopic) {
				addSelectedTopic(draggedTopic);
				setDraggedTopic(null);
			}
		},
		[draggedTopic, addSelectedTopic, setIsOverDropZone, setDraggedTopic],
	);

	const handleRemove = (id: string) => {
		removeSelectedTopic(id);
		setConfirmDeleteId(null);
	};

	const handleExpandClick = () => {
		setIsExpanded(!isExpanded);
		onExpandClick?.();
	};

	const handleClose = () => {
		setIsExpanded(false);
		setConfirmDeleteId(null);
	};

	const handleHelpClick = () => {
		setIsHelpModalOpen(true);
		onHelpClick?.();
	};

	const handleCloseHelpModal = () => {
		setIsHelpModalOpen(false);
	};

	const handleDeleteClick = (id: string) => {
		if (confirmDeleteId === id) {
			// Already showing confirm, clicking elsewhere cancels
			setConfirmDeleteId(null);
		} else {
			setConfirmDeleteId(id);
		}
	};

	// Drag handlers for reordering
	const handleReorderDragStart = (index: number) => {
		setDraggedIndex(index);
	};

	const handleReorderDragOver = (e: React.DragEvent, index: number) => {
		e.preventDefault();
		if (draggedIndex !== null && draggedIndex !== index) {
			setDragOverIndex(index);
		}
	};

	const handleReorderDrop = (e: React.DragEvent, index: number) => {
		e.preventDefault();
		if (draggedIndex !== null && draggedIndex !== index) {
			reorderSelectedTopics(draggedIndex, index);
		}
		setDraggedIndex(null);
		setDragOverIndex(null);
	};

	const handleReorderDragEnd = () => {
		setDraggedIndex(null);
		setDragOverIndex(null);
	};

	// Touch handlers for mobile reordering
	const handleTouchStart = (index: number) => {
		setDraggedIndex(index);
	};

	const handleTouchMove = useCallback(
		(e: React.TouchEvent) => {
			if (draggedIndex === null) return;

			const touch = e.touches[0];
			const touchY = touch.clientY;

			// Find which item we're hovering over
			let newDragOverIndex: number | null = null;
			itemRefs.current.forEach((ref, index) => {
				if (ref && index !== draggedIndex) {
					const rect = ref.getBoundingClientRect();
					if (touchY >= rect.top && touchY <= rect.bottom) {
						newDragOverIndex = index;
					}
				}
			});

			setDragOverIndex(newDragOverIndex);
		},
		[draggedIndex],
	);

	const handleTouchEnd = useCallback(() => {
		if (
			draggedIndex !== null &&
			dragOverIndex !== null &&
			draggedIndex !== dragOverIndex
		) {
			reorderSelectedTopics(draggedIndex, dragOverIndex);
		}
		setDraggedIndex(null);
		setDragOverIndex(null);
	}, [draggedIndex, dragOverIndex, reorderSelectedTopics]);

	const isEmpty = selectedTopics.length === 0;

	return (
		<>
			{/* Overlay Background */}
			{isExpanded && (
				<div
					className="bg-bg/70 fixed inset-0 z-40 transition-opacity duration-300"
					onClick={handleClose}
				/>
			)}

			<div className="fixed bottom-0 left-1/2 z-50 w-full max-w-[600px] -translate-x-1/2 transform px-4 md:px-0">
				{/* Action Buttons */}
				{isExpanded && (
					<div className="absolute top-[16px] right-4 -translate-y-1/2 items-center gap-2">
						<button
							onClick={handleExpandClick}
							className="flex h-12 w-12 items-center justify-center rounded-full border-2 border-black bg-white text-black transition-all hover:border-black hover:bg-white/30"
						>
							<Image
								src="/politicalflashback/icon/close.svg"
								alt="Chevron Up"
								width={40}
								height={40}
							/>
						</button>
					</div>
				)}

				{/* Expanded Panel */}
				{isExpanded && (
					<div className="mb-0 flex h-[80vh] flex-col overflow-hidden rounded-t-2xl border-2 border-b-0 border-black bg-white shadow-xl">
						{/* Header */}
						<div className="bg-green-3 flex shrink-0 items-center justify-between px-4 py-3">
							<div className="flex items-center gap-2">
								<Image
									src="/politicalflashback/icon/heart.svg"
									alt="Heart"
									width={20}
									height={20}
								/>
								<span className="text-h9 font-sriracha text-black">
									จัดอันดับประเด็นสุดพีค ({selectedTopics.length}/5)
								</span>
							</div>
						</div>

						{/* Topics List */}
						<div
							ref={listRef}
							className="min-h-0 flex-1 divide-y divide-gray-200 overflow-y-auto overscroll-contain px-4"
							style={{ WebkitOverflowScrolling: 'touch' }}
						>
							{isEmpty ? (
								<div className="flex h-full flex-col items-center justify-center py-16">
									<div className="mb-4 flex items-center justify-center rounded-full bg-purple-50">
										<Image
											src="/politicalflashback/img/empty.svg"
											alt="Heart"
											width={96}
											height={96}
										/>
									</div>

									<p className="font-ibmplex text-b4 text-back text-center">
										บันทึกประเด็นสุดพีคของคุณ <br />
										แล้วนำไปไปแชร์ต่อและเทียบกับคนอื่น
									</p>
								</div>
							) : (
								selectedTopics.map((topic, index) => (
									<div
										key={topic.id}
										className={`${index === 4 ? 'border-b-0!' : ''} ${index === selectedTopics.length - 1 ? 'mb-20' : ''}`}
									>
										{/* Separator for items beyond 5 */}
										{index === 5 && (
											<div className="bg-green-3 -mx-4 px-4 py-3">
												<span className="font-sriracha text-h9 text-back">
													อันดับ 6 เป็นต้นไป...
												</span>
											</div>
										)}
										<div
											ref={(el) => {
												itemRefs.current[index] = el;
											}}
											draggable
											onDragStart={() => handleReorderDragStart(index)}
											onDragOver={(e) => handleReorderDragOver(e, index)}
											onDrop={(e) => handleReorderDrop(e, index)}
											onDragEnd={handleReorderDragEnd}
											className={`flex items-center gap-3 py-6 transition-all ${
												draggedIndex === index
													? 'scale-[1.02] bg-purple-50 opacity-50'
													: dragOverIndex === index
														? 'border-t-2 border-purple-500 bg-purple-50'
														: 'hover:bg-gray-50'
											} `}
										>
											{/* Drag Handle */}
											<button
												className="cursor-grab touch-none text-gray-400 active:cursor-grabbing"
												onTouchStart={() => handleTouchStart(index)}
												onTouchMove={handleTouchMove}
												onTouchEnd={handleTouchEnd}
											>
												<Image
													src="/politicalflashback/icon/hamburger.svg"
													alt="Drag Handle"
													width={32}
													height={32}
												/>
											</button>

											{/* Number Badge */}
											<div
												className={`text-h8 bg-purple-3 font-kondolar flex h-8 w-8 shrink-0 items-center justify-center rounded-full font-bold text-black ${index >= 5 ? 'opacity-50' : ''}`}
											>
												{index + 1}
											</div>

											{/* Topic Info */}
											<div
												className={`min-w-0 flex-1 ${index >= 5 ? 'opacity-50' : ''}`}
											>
												<div className="text-h9 font-kondolar truncate font-bold text-black">
													{topic.label}
												</div>
												<div className="flex items-center gap-1 text-xs text-gray-500">
													<FireRating value={topic.score} />
													<span>({topic.value} ข่าว)</span>
												</div>
											</div>

											{/* Delete Button */}
											<DeleteButton
												topicId={topic.id}
												isConfirming={confirmDeleteId === topic.id}
												onDeleteClick={handleDeleteClick}
												onConfirmDelete={handleRemove}
											/>
										</div>
									</div>
								))
							)}
						</div>

						{/* Compare Button */}
						<div className="fixed right-0 bottom-3 left-0 mx-12">
							<Button
								onClick={() => router.push('/results')}
								className={`typo-h9 font-kondolar bg-purple-1 border-purple-1 flex w-full items-center justify-between gap-2 rounded-full font-bold text-white ${isEmpty ? 'cursor-not-allowed opacity-50' : ''}`}
								disabled={isEmpty}
							>
								<div></div>
								<p className="">ดูผล/เทียบกับคนอื่น</p>
								<Image
									src="/politicalflashback/icon/arrow-right.svg"
									alt="arrow-right"
									width={31}
									height={20}
									className=""
								/>
							</Button>
						</div>
					</div>
				)}

				{/* Bottom Bar (hidden when expanded) */}
				{!isExpanded && (
					<div
						data-dropzone
						className={`flex items-center gap-2 rounded-t-2xl border-t-2 border-r-2 border-l-2 border-black px-4 py-4 shadow-lg transition-all duration-300 ${isOverDropZone ? 'bg-green-1 ring-4 ring-[#2DD4BF]/30' : 'bg-green-3'}`}
						onDragOver={handleDragOver}
						onDragLeave={handleDragLeave}
						onDrop={handleDrop}
					>
						{/* Heart Icon */}
						<span className="shrink-0 text-white">
							<Image
								src="/politicalflashback/icon/heart.svg"
								alt="Heart"
								width={24}
								height={24}
							/>
						</span>

						{/* Content */}
						<div className="flex items-center gap-2">
							{isEmpty ? (
								<span className="text-h9 font-sriracha text-black">
									{pathname !== '/home'
										? 'จัดอันดับประเด็นสุดพีค (0/5)'
										: 'ลากประเด็นสุดพีคของคุณมาที่นี่'}
								</span>
							) : (
								<div className="flex items-center gap-2">
									{selectedTopics.length >= 1 && (
										<span className="text-h9 font-sriracha flex items-center gap-1 text-black">
											จัดอันดับประเด็นสุดพีค{' '}
											<p
												className={`font-ibmplex text-h9 ${selectedTopics.length > 5 ? 'text-[#CE4500]' : 'text-black'}`}
											>
												({selectedTopics.length}/5)
											</p>
										</span>
									)}
								</div>
							)}
						</div>

						{/* Action Buttons */}
						<div
							className={`absolute right-4 -translate-y-1/2 items-center gap-2 ${hideHelpButton ? 'top-[18px]' : 'top-[-10px]'}`}
						>
							{!hideHelpButton && (
								<button
									onClick={handleHelpClick}
									className="mb-2 flex h-12 w-12 items-center justify-center rounded-full border-2 border-black bg-white text-black transition-all hover:border-black hover:bg-white/30"
								>
									<Image
										src="/politicalflashback/icon/icon-question-mark.svg"
										alt="Question"
										width={40}
										height={40}
									/>
								</button>
							)}

							<button
								onClick={handleExpandClick}
								className="flex h-12 w-12 items-center justify-center rounded-full border-2 border-black bg-white text-black transition-all hover:border-black hover:bg-white/30"
							>
								<Image
									src="/politicalflashback/icon/chevron-up.svg"
									alt="Chevron Up"
									width={40}
									height={40}
								/>
							</button>
						</div>
					</div>
				)}

				{/* Counter indicator when dragging */}
				{draggedTopic && (
					<div className="absolute -top-2 left-1/2 -translate-x-1/2 -translate-y-full animate-bounce">
						<div className="rounded-full bg-[#0D9488] px-3 py-1 text-xs font-medium text-white shadow-lg">
							วางที่นี่!
						</div>
					</div>
				)}
			</div>

			{/* Help Modal */}
			{isHelpModalOpen && (
				<>
					{/* Overlay */}
					<div
						className="bg-bg/70 fixed inset-0 z-50 transition-opacity duration-300"
						onClick={handleCloseHelpModal}
					/>

					{/* Modal Content */}
					<div className="fixed right-0 bottom-0 left-0 z-50 w-full">
						<div
							className="relative w-full bg-white shadow-xl"
							onClick={(e) => e.stopPropagation()}
						>
							{/* Close Button */}
							<div className="absolute top-[16px] right-4 -translate-y-1/2 items-center gap-2">
								<button
									onClick={handleCloseHelpModal}
									className="flex h-12 w-12 items-center justify-center rounded-full border-2 border-black bg-white text-black transition-all hover:border-black hover:bg-white/30"
								>
									<Image
										src="/politicalflashback/icon/close.svg"
										alt="Chevron Up"
										width={40}
										height={40}
									/>
								</button>
							</div>

							{/* Main Content */}

							<Footer showBackHomeButton={true} />
						</div>
					</div>
				</>
			)}
		</>
	);
}
