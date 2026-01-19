'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import * as d3 from 'd3';
import { useRouter } from 'next/navigation';
import { useTopicStore, Topic } from '@/src/stores/topicStore';
import { useDraggable } from '@dnd-kit/core';

interface BubbleNode extends Topic {
	x: number;
	y: number;
	targetRadius: number;
}

interface BubbleLink {
	source: string;
	target: string;
}

interface DragDropBubblesProps {
	width?: number;
	height?: number;
	activeDragId?: string | null;
}

const MIN_RADIUS = 48;
const MAX_RADIUS = 80;
const COLLISION_PADDING = 4;
const CENTER_BUBBLE_LABEL = '#เลือกตั้ง 2566';
const BUBBLE_COLOR = '#CEC2F5';
const BUBBLE_DRAGGING_COLOR = '#9C81F6';
const BUBBLE_SELECTED_COLOR = '#5EEAD4';
const TEXT_COLOR = '#4A3260';
const STORAGE_KEY = 'bubble-view-state';

// Draggable Bubble Component
function DraggableBubble({
	node,
	isSelected,
	isDragging,
	onClick,
}: {
	node: BubbleNode;
	isSelected: boolean;
	isDragging: boolean;
	onClick: () => void;
}) {
	const { attributes, listeners, setNodeRef, transform } = useDraggable({
		id: node.id,
		data: node,
	});

	const basePosition: React.CSSProperties = {
		left: node.x - node.targetRadius,
		top: node.y - node.targetRadius,
		width: node.targetRadius * 2,
		height: node.targetRadius * 2,
	};

	const style: React.CSSProperties = {
		...basePosition,
		backgroundColor: isSelected
			? BUBBLE_SELECTED_COLOR
			: isDragging
				? BUBBLE_DRAGGING_COLOR
				: BUBBLE_COLOR,
		zIndex: isDragging ? 100 : isSelected ? 50 : 1,
		// Hide when dragging - DragOverlay will show it
		opacity: isDragging ? 0 : 1,
		touchAction: 'none',
	};

	// Placeholder style - shows at original position when dragging
	const placeholderStyle: React.CSSProperties = {
		...basePosition,
		backgroundColor: 'white',
		border: '3px dashed #CEC2F5',
		zIndex: 0,
	};

	return (
		<>
			{/* Placeholder at original position when dragging */}
			{isDragging && (
				<div
					className="absolute flex items-center justify-center rounded-full p-2 text-center"
					style={placeholderStyle}
				>
					<span className="pointer-events-none line-clamp-3 text-sm leading-tight font-bold text-white opacity-0">
						{node.label}
					</span>
				</div>
			)}

			{/* Actual draggable bubble */}
			<div
				ref={setNodeRef}
				data-node-id={node.id}
				onClick={onClick}
				className={`absolute flex touch-none items-center justify-center rounded-full p-2 text-center select-none ${
					isDragging
						? 'cursor-grab'
						: 'cursor-pointer opacity-100 transition-all duration-200 hover:scale-105 hover:shadow-lg active:scale-95'
				} ${isSelected ? 'ring-4 ring-[#2DD4BF] ring-offset-2' : ''}`}
				style={style}
				{...listeners}
				{...attributes}
			>
				<span
					className="pointer-events-none line-clamp-3 text-sm leading-tight font-bold"
					style={{ color: isDragging ? '#000' : TEXT_COLOR }}
				>
					{node.label}
				</span>
			</div>
		</>
	);
}

export default function DragDropBubbles({
	width = 800,
	height = 600,
	activeDragId,
}: DragDropBubblesProps) {
	const router = useRouter();
	const containerRef = useRef<HTMLDivElement>(null);
	const [dimensions, setDimensions] = useState({ width, height });
	const [nodes, setNodes] = useState<BubbleNode[]>([]);
	const [scale, setScale] = useState(1);
	const [pan, setPan] = useState({ x: 0, y: 0 });
	const [isPanning, setIsPanning] = useState(false);
	const panStartRef = useRef({ x: 0, y: 0 });
	const panPosRef = useRef({ x: 0, y: 0 });

	const { topics, selectedTopics } = useTopicStore();

	// Calculate radius based on value (1-10 scale to 48-80px)
	const radiusScale = useCallback((radius: number) => {
		const normalized = (radius - 1) / 9;
		return MIN_RADIUS + normalized * (MAX_RADIUS - MIN_RADIUS);
	}, []);

	// Handle dimensions
	useEffect(() => {
		const updateDimensions = () => {
			if (containerRef.current) {
				const { clientWidth, clientHeight } = containerRef.current;
				setDimensions({
					width: clientWidth || width,
					height: clientHeight || height,
				});
			}
		};

		updateDimensions();
		window.addEventListener('resize', updateDimensions);
		return () => window.removeEventListener('resize', updateDimensions);
	}, [width, height]);

	// Save state to sessionStorage
	const saveState = useCallback(
		(
			nodesToSave: BubbleNode[],
			panState: { x: number; y: number },
			scaleState: number,
		) => {
			try {
				const state = {
					nodes: nodesToSave.map((n) => ({
						id: n.id,
						x: n.x,
						y: n.y,
					})),
					pan: panState,
					scale: scaleState,
					topicIds: topics.map((t) => t.id),
				};
				sessionStorage.setItem(STORAGE_KEY, JSON.stringify(state));
			} catch (error) {
				console.warn('Failed to save state to sessionStorage:', error);
			}
		},
		[topics],
	);

	// Load state from sessionStorage
	const loadState = useCallback(() => {
		try {
			const saved = sessionStorage.getItem(STORAGE_KEY);
			if (!saved) return null;

			const state = JSON.parse(saved);
			const currentTopicIds = new Set(topics.map((t) => t.id));
			const savedTopicIds = new Set(state.topicIds || []);

			if (
				currentTopicIds.size !== savedTopicIds.size ||
				[...currentTopicIds].some((id) => !savedTopicIds.has(id))
			) {
				return null;
			}

			return state;
		} catch (error) {
			console.warn('Failed to load state from sessionStorage:', error);
			return null;
		}
	}, [topics]);

	// Initialize simulation when topics change
	useEffect(() => {
		if (!topics.length) return;

		const { width: w, height: h } = dimensions;
		const centerX = w / 2;
		const centerY = h / 2;

		const savedState = loadState();
		let initialNodes: BubbleNode[];

		if (savedState && savedState.nodes) {
			type SavedNode = { id: string; x: number; y: number };
			const savedNodeMap = new Map<string, SavedNode>(
				(savedState.nodes as SavedNode[]).map((n) => [n.id, n]),
			);

			initialNodes = topics.map((d) => {
				const saved = savedNodeMap.get(d.id);
				return {
					...d,
					x: saved?.x ?? centerX,
					y: saved?.y ?? centerY,
					targetRadius: radiusScale(d.value),
				};
			});

			if (savedState.pan) {
				setPan(savedState.pan);
			}
			if (savedState.scale !== undefined) {
				setScale(savedState.scale);
			}
		} else {
			const sortedTopics = [...topics].sort((a, b) => {
				if (!a.date && !b.date) return 0;
				if (!a.date) return 1;
				if (!b.date) return -1;
				return a.date.localeCompare(b.date);
			});

			const datesWithValues = sortedTopics
				.filter((t) => t.date)
				.map((t) => new Date(t.date!).getTime());
			const minDate =
				datesWithValues.length > 0 ? Math.min(...datesWithValues) : 0;
			const maxDate =
				datesWithValues.length > 0 ? Math.max(...datesWithValues) : 0;
			const dateRange = maxDate - minDate || 1;

			initialNodes = sortedTopics.map((d, i) => {
				const angle = (i / sortedTopics.length) * 2 * Math.PI;

				let distanceFromCenter: number;
				if (d.date) {
					const dateValue = new Date(d.date).getTime();
					const normalized = (dateValue - minDate) / dateRange;
					const invertedNormalized = 1 - normalized;
					const baseRadius = Math.min(w, h) * 0.35;
					distanceFromCenter = baseRadius * (0.5 + invertedNormalized * 0.3);
				} else {
					const baseRadius = Math.min(w, h) * 0.35;
					distanceFromCenter = baseRadius * 0.8;
				}

				const randomOffset = (Math.random() - 0.5) * 0.2;
				const finalDistance = distanceFromCenter * (1 + randomOffset);

				return {
					...d,
					x: centerX + Math.cos(angle) * finalDistance,
					y: centerY + Math.sin(angle) * finalDistance,
					targetRadius: radiusScale(d.value),
				};
			});

			const nodeMap = new Map(initialNodes.map((n) => [n.id, n]));
			const links: BubbleLink[] = [];
			const linkSet = new Set<string>();

			topics.forEach((d) => {
				if (d.relatedIds) {
					d.relatedIds.forEach((relatedId) => {
						if (nodeMap.has(relatedId)) {
							const linkKey =
								d.id < relatedId
									? `${d.id}-${relatedId}`
									: `${relatedId}-${d.id}`;
							if (!linkSet.has(linkKey)) {
								linkSet.add(linkKey);
								links.push({ source: d.id, target: relatedId });
							}
						}
					});
				}
			});

			const centerNode = initialNodes.find(
				(n) => n.label === CENTER_BUBBLE_LABEL,
			);

			const simulation = d3
				.forceSimulation(initialNodes)
				.force(
					'link',
					d3
						.forceLink<BubbleNode, BubbleLink>(links)
						.id((d) => d.id)
						.distance((d) => {
							const source = nodeMap.get(
								typeof d.source === 'string'
									? d.source
									: (d.source as BubbleNode).id,
							);
							const target = nodeMap.get(
								typeof d.target === 'string'
									? d.target
									: (d.target as BubbleNode).id,
							);
							if (source && target) {
								return (
									source.targetRadius +
									target.targetRadius +
									COLLISION_PADDING * 2
								);
							}
							return 100;
						})
						.strength(1),
				)
				.force(
					'charge',
					d3
						.forceManyBody<BubbleNode>()
						.strength((d) => -d.targetRadius * 2)
						.distanceMin(10)
						.distanceMax(300),
				)
				.force(
					'collision',
					d3
						.forceCollide<BubbleNode>()
						.radius((d) => d.targetRadius + COLLISION_PADDING)
						.strength(1)
						.iterations(3),
				)
				.force('center', d3.forceCenter(centerX, centerY))
				.force('x', d3.forceX(centerX).strength(0.02))
				.force('y', d3.forceY(centerY).strength(0.02))
				.stop();

			if (centerNode) {
				(centerNode as any).fx = centerX;
				(centerNode as any).fy = centerY;
			}

			simulation.alpha(1);
			for (let i = 0; i < 500; i++) {
				simulation.tick();
			}

			if (centerNode) {
				centerNode.x = centerX;
				centerNode.y = centerY;
			}
		}

		setNodes([...initialNodes]);
	}, [topics, dimensions, radiusScale, loadState]);

	// Sync panPosRef with pan state when not panning
	useEffect(() => {
		if (!isPanning) {
			panPosRef.current = pan;
		}
	}, [pan, isPanning]);

	// Save state when nodes change
	useEffect(() => {
		if (nodes.length > 0 && !isPanning) {
			const timeoutId = setTimeout(() => {
				saveState(nodes, pan, scale);
			}, 300);
			return () => clearTimeout(timeoutId);
		}
	}, [nodes, pan, scale, isPanning, saveState]);

	// Handle click navigation
	const handleClick = useCallback(
		(node: BubbleNode) => {
			// Don't navigate if we were just dragging
			if (!activeDragId) {
				router.push(`/story?name=${encodeURIComponent(node.label)}`);
			}
		},
		[router, activeDragId],
	);

	// Wheel zoom handler
	const handleWheel = (e: React.WheelEvent) => {
		e.preventDefault();
		const direction = e.deltaY > 0 ? -1 : 1;
		const zoomSpeed = 1.1;
		const newScale = Math.max(
			0.2,
			Math.min(3, direction > 0 ? scale * zoomSpeed : scale / zoomSpeed),
		);
		setScale(newScale);
		if (nodes.length > 0) {
			saveState(nodes, pan, newScale);
		}
	};

	// Pan handlers
	const handleMouseDown = (e: React.MouseEvent) => {
		const target = e.target as HTMLElement;
		if (
			e.button === 0 &&
			!target.closest('[data-node-id]') &&
			(target === containerRef.current ||
				target.classList.contains('pan-layer'))
		) {
			setIsPanning(true);
			panStartRef.current = { x: e.clientX, y: e.clientY };
			panPosRef.current = pan;
		}
	};

	const handleGlobalMouseMove = useCallback(
		(e: MouseEvent) => {
			if (isPanning) {
				const dx = e.clientX - panStartRef.current.x;
				const dy = e.clientY - panStartRef.current.y;
				const newPan = {
					x: panPosRef.current.x + dx,
					y: panPosRef.current.y + dy,
				};
				setPan(newPan);
				if (nodes.length > 0) {
					saveState(nodes, newPan, scale);
				}
			}
		},
		[isPanning, nodes, scale, saveState],
	);

	const handleGlobalMouseUp = useCallback(() => {
		setIsPanning(false);
	}, []);

	useEffect(() => {
		if (isPanning) {
			document.addEventListener('mousemove', handleGlobalMouseMove);
			document.addEventListener('mouseup', handleGlobalMouseUp);
			document.body.style.cursor = 'grabbing';
			document.body.style.userSelect = 'none';
		} else {
			document.body.style.cursor = '';
			document.body.style.userSelect = '';
		}

		return () => {
			document.removeEventListener('mousemove', handleGlobalMouseMove);
			document.removeEventListener('mouseup', handleGlobalMouseUp);
			document.body.style.cursor = '';
			document.body.style.userSelect = '';
		};
	}, [isPanning, handleGlobalMouseMove, handleGlobalMouseUp]);

	// Touch pan handlers
	const handleContainerTouchStart = (e: React.TouchEvent) => {
		if (activeDragId) return;
		const touch = e.touches[0];
		panStartRef.current = { x: touch.clientX, y: touch.clientY };
		panPosRef.current = pan;
	};

	const handleContainerTouchMove = useCallback(
		(e: React.TouchEvent) => {
			if (activeDragId) return;

			const touch = e.touches[0];
			if (!touch) return;

			const dx = touch.clientX - panStartRef.current.x;
			const dy = touch.clientY - panStartRef.current.y;
			const absDx = Math.abs(dx);
			const absDy = Math.abs(dy);

			if (absDx > 3 || absDy > 3) {
				e.preventDefault();

				if (!isPanning) {
					setIsPanning(true);
					panStartRef.current = { x: touch.clientX, y: touch.clientY };
					panPosRef.current = pan;
				}

				const newPan = {
					x: panPosRef.current.x + dx,
					y: panPosRef.current.y + dy,
				};
				setPan(newPan);
				if (nodes.length > 0) {
					saveState(nodes, newPan, scale);
				}
			}
		},
		[isPanning, activeDragId, nodes, scale, saveState, pan],
	);

	const handleContainerTouchEnd = () => {
		setIsPanning(false);
	};

	// Check if topic is selected
	const isSelected = (id: string) => selectedTopics.some((t) => t.id === id);

	// Sort nodes for z-index
	const sortedNodes = [...nodes].sort((a, b) => {
		if (a.id === activeDragId) return 1;
		if (b.id === activeDragId) return -1;
		return b.value - a.value;
	});

	return (
		<div
			ref={containerRef}
			className="relative h-full w-full overflow-hidden"
			style={{
				minHeight: '500px',
				cursor: isPanning ? 'grabbing' : 'grab',
				touchAction: 'none',
			}}
			onWheel={handleWheel}
			onMouseDown={handleMouseDown}
			onTouchStart={handleContainerTouchStart}
			onTouchMove={handleContainerTouchMove}
			onTouchEnd={handleContainerTouchEnd}
		>
			<div
				className="pan-layer absolute inset-0"
				style={{
					transform: `translate(${pan.x}px, ${pan.y}px) scale(${scale})`,
					transformOrigin: 'center center',
					willChange: isPanning ? 'transform' : 'auto',
				}}
			>
				{sortedNodes.map((node) => (
					<DraggableBubble
						key={node.id}
						node={node}
						isSelected={isSelected(node.id)}
						isDragging={node.id === activeDragId}
						onClick={() => handleClick(node)}
					/>
				))}
			</div>
		</div>
	);
}
