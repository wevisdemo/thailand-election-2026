'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import * as d3 from 'd3';
import { useTopicStore, Topic } from '@/src/stores/topicStore';

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
}

const MIN_RADIUS = 48;
const MAX_RADIUS = 80;
const COLLISION_PADDING = 4;
const CENTER_BUBBLE_LABEL = 'จัดตั้งรัฐบาล 2566';
const BUBBLE_COLOR = '#CEC2F5';
const BUBBLE_DRAGGING_COLOR = '#9C81F6';
const BUBBLE_SELECTED_COLOR = '#5EEAD4';
const TEXT_COLOR = '#4A3260';

export default function DragDropBubbles({
	width = 800,
	height = 600,
}: DragDropBubblesProps) {
	const containerRef = useRef<HTMLDivElement>(null);
	const [dimensions, setDimensions] = useState({ width, height });
	const [nodes, setNodes] = useState<BubbleNode[]>([]);
	const [draggedId, setDraggedId] = useState<string | null>(null);
	const [scale, setScale] = useState(1);
	const [pan, setPan] = useState({ x: 0, y: 0 });
	const [isPanning, setIsPanning] = useState(false);
	const panStartRef = useRef({ x: 0, y: 0 });
	const panPosRef = useRef({ x: 0, y: 0 });

	// Touch drag state
	const [touchDragPos, setTouchDragPos] = useState<{
		x: number;
		y: number;
	} | null>(null);
	const touchDragNodeRef = useRef<BubbleNode | null>(null);
	const ghostRef = useRef<HTMLDivElement | null>(null);

	const {
		topics,
		selectedTopics,
		setDraggedTopic,
		addSelectedTopic,
		setIsOverDropZone,
	} = useTopicStore();

	// Calculate radius based on value
	const radiusScale = useCallback((value: number, maxValue: number) => {
		return MIN_RADIUS + (value / maxValue) * (MAX_RADIUS - MIN_RADIUS);
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

	// Initialize simulation when topics change
	useEffect(() => {
		if (!topics.length) return;

		const { width: w, height: h } = dimensions;
		const centerX = w / 2;
		const centerY = h / 2;
		const maxValue = Math.max(...topics.map((d) => d.value));

		// Initialize nodes in a circular pattern
		const initialNodes: BubbleNode[] = topics.map((d, i) => {
			const angle = (i / topics.length) * 2 * Math.PI;
			const radius = Math.min(w, h) * 0.3;
			return {
				...d,
				x: centerX + Math.cos(angle) * radius * (0.5 + Math.random() * 0.5),
				y: centerY + Math.sin(angle) * radius * (0.5 + Math.random() * 0.5),
				targetRadius: radiusScale(d.value, maxValue),
			};
		});

		// Create a map for quick node lookup
		const nodeMap = new Map(initialNodes.map((n) => [n.id, n]));

		// Create links from relatedIds
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

		// Find center bubble and fix it
		const centerNode = initialNodes.find(
			(n) => n.label === CENTER_BUBBLE_LABEL,
		);

		// Force-directed simulation
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

		setNodes([...initialNodes]);
	}, [topics, dimensions, radiusScale]);

	// Desktop Drag handlers
	const handleDragStart = (e: React.DragEvent, node: BubbleNode) => {
		e.stopPropagation();
		e.dataTransfer.effectAllowed = 'move';
		e.dataTransfer.setData('text/plain', node.id);
		e.dataTransfer.setData('application/json', JSON.stringify(node));
		setDraggedId(node.id);
		setDraggedTopic(node);

		// Create drag image
		const dragImage = document.createElement('div');
		dragImage.style.cssText = `
			width: ${node.targetRadius * 2}px;
			height: ${node.targetRadius * 2}px;
			border-radius: 50%;
			background: ${BUBBLE_DRAGGING_COLOR};
			display: flex;
			align-items: center;
			justify-content: center;
			font-size: 14px;
			font-weight: bold;
			color: ${TEXT_COLOR};
			position: fixed;
			top: -9999px;
			left: -9999px;
			padding: 8px;
			text-align: center;
			pointer-events: none;
		`;
		dragImage.textContent = node.label;
		document.body.appendChild(dragImage);
		e.dataTransfer.setDragImage(
			dragImage,
			node.targetRadius,
			node.targetRadius,
		);

		requestAnimationFrame(() => {
			document.body.removeChild(dragImage);
		});
	};

	const handleDrag = (e: React.DragEvent) => {
		e.stopPropagation();
	};

	const handleDragEnd = (e: React.DragEvent) => {
		e.stopPropagation();
		setDraggedId(null);
		setDraggedTopic(null);
	};

	// Touch handlers for mobile
	const handleTouchStart = (e: React.TouchEvent, node: BubbleNode) => {
		e.stopPropagation();
		const touch = e.touches[0];

		setDraggedId(node.id);
		setDraggedTopic(node);
		touchDragNodeRef.current = node;
		setTouchDragPos({ x: touch.clientX, y: touch.clientY });

		// Create ghost element
		const ghost = document.createElement('div');
		ghost.id = 'touch-drag-ghost';
		ghost.style.cssText = `
			width: ${node.targetRadius * 1.8}px;
			height: ${node.targetRadius * 1.8}px;
			border-radius: 50%;
			background: ${BUBBLE_DRAGGING_COLOR};
			display: flex;
			align-items: center;
			justify-content: center;
			font-size: 14px;
			font-weight: bold;
			color: ${TEXT_COLOR};
			position: fixed;
			top: ${touch.clientY - node.targetRadius}px;
			left: ${touch.clientX - node.targetRadius}px;
			padding: 8px;
			text-align: center;
			pointer-events: none;
			z-index: 9999;
			box-shadow: 0 10px 25px rgba(0,0,0,0.3);
			transform: scale(1.1);
		`;
		ghost.textContent = node.label;
		document.body.appendChild(ghost);
		ghostRef.current = ghost;
	};

	const handleTouchMove = useCallback(
		(e: TouchEvent) => {
			if (!touchDragNodeRef.current || !ghostRef.current) return;

			const touch = e.touches[0];
			const node = touchDragNodeRef.current;

			// Update ghost position
			ghostRef.current.style.top = `${touch.clientY - node.targetRadius}px`;
			ghostRef.current.style.left = `${touch.clientX - node.targetRadius}px`;

			setTouchDragPos({ x: touch.clientX, y: touch.clientY });

			// Check if over drop zone
			const dropZone = document.querySelector('[data-dropzone]');
			if (dropZone) {
				const rect = dropZone.getBoundingClientRect();
				const isOver =
					touch.clientX >= rect.left &&
					touch.clientX <= rect.right &&
					touch.clientY >= rect.top &&
					touch.clientY <= rect.bottom;
				setIsOverDropZone(isOver);
			}
		},
		[setIsOverDropZone],
	);

	const handleTouchEnd = useCallback(
		(e: TouchEvent) => {
			if (!touchDragNodeRef.current) return;

			const node = touchDragNodeRef.current;

			// Check if dropped on drop zone
			const dropZone = document.querySelector('[data-dropzone]');
			if (dropZone && touchDragPos) {
				const rect = dropZone.getBoundingClientRect();
				const isOver =
					touchDragPos.x >= rect.left &&
					touchDragPos.x <= rect.right &&
					touchDragPos.y >= rect.top &&
					touchDragPos.y <= rect.bottom;

				if (isOver) {
					addSelectedTopic(node);
				}
			}

			// Cleanup
			if (ghostRef.current) {
				document.body.removeChild(ghostRef.current);
				ghostRef.current = null;
			}

			setDraggedId(null);
			setDraggedTopic(null);
			setIsOverDropZone(false);
			touchDragNodeRef.current = null;
			setTouchDragPos(null);
		},
		[touchDragPos, addSelectedTopic, setDraggedTopic, setIsOverDropZone],
	);

	// Add global touch event listeners
	useEffect(() => {
		if (draggedId && touchDragNodeRef.current) {
			document.addEventListener('touchmove', handleTouchMove, {
				passive: false,
			});
			document.addEventListener('touchend', handleTouchEnd);
			document.addEventListener('touchcancel', handleTouchEnd);

			return () => {
				document.removeEventListener('touchmove', handleTouchMove);
				document.removeEventListener('touchend', handleTouchEnd);
				document.removeEventListener('touchcancel', handleTouchEnd);
			};
		}
	}, [draggedId, handleTouchMove, handleTouchEnd]);

	// Wheel zoom handler
	const handleWheel = (e: React.WheelEvent) => {
		e.preventDefault();
		const direction = e.deltaY > 0 ? -1 : 1;
		const zoomSpeed = 1.1;
		const newScale = direction > 0 ? scale * zoomSpeed : scale / zoomSpeed;
		setScale(Math.max(0.2, Math.min(3, newScale)));
	};

	// Pan handlers - only pan when clicking on the background, not bubbles
	const handleMouseDown = (e: React.MouseEvent) => {
		const target = e.target as HTMLElement;
		// Only start panning if clicking on container or the inner transform div
		if (
			e.button === 0 &&
			(target === containerRef.current ||
				target.classList.contains('pan-layer'))
		) {
			setIsPanning(true);
			panStartRef.current = { x: e.clientX, y: e.clientY };
			panPosRef.current = pan;
		}
	};

	const handleMouseMove = (e: React.MouseEvent) => {
		if (isPanning) {
			const dx = e.clientX - panStartRef.current.x;
			const dy = e.clientY - panStartRef.current.y;
			setPan({
				x: panPosRef.current.x + dx,
				y: panPosRef.current.y + dy,
			});
		}
	};

	const handleMouseUp = () => {
		setIsPanning(false);
	};

	// Touch pan handlers
	const handleContainerTouchStart = (e: React.TouchEvent) => {
		const target = e.target as HTMLElement;
		if (
			target === containerRef.current ||
			target.classList.contains('pan-layer')
		) {
			const touch = e.touches[0];
			setIsPanning(true);
			panStartRef.current = { x: touch.clientX, y: touch.clientY };
			panPosRef.current = pan;
		}
	};

	const handleContainerTouchMove = (e: React.TouchEvent) => {
		if (isPanning && !touchDragNodeRef.current) {
			const touch = e.touches[0];
			const dx = touch.clientX - panStartRef.current.x;
			const dy = touch.clientY - panStartRef.current.y;
			setPan({
				x: panPosRef.current.x + dx,
				y: panPosRef.current.y + dy,
			});
		}
	};

	const handleContainerTouchEnd = () => {
		setIsPanning(false);
	};

	// Check if topic is selected
	const isSelected = (id: string) => selectedTopics.some((t) => t.id === id);

	// Sort nodes for z-index
	const sortedNodes = [...nodes].sort((a, b) => {
		if (a.id === draggedId) return 1;
		if (b.id === draggedId) return -1;
		return b.value - a.value;
	});

	return (
		<div
			ref={containerRef}
			className="relative h-full w-full touch-none overflow-hidden"
			style={{ minHeight: '500px', cursor: isPanning ? 'grabbing' : 'grab' }}
			onWheel={handleWheel}
			onMouseDown={handleMouseDown}
			onMouseMove={handleMouseMove}
			onMouseUp={handleMouseUp}
			onMouseLeave={handleMouseUp}
			onTouchStart={handleContainerTouchStart}
			onTouchMove={handleContainerTouchMove}
			onTouchEnd={handleContainerTouchEnd}
		>
			<div
				className="pan-layer absolute inset-0"
				style={{
					transform: `translate(${pan.x}px, ${pan.y}px) scale(${scale})`,
					transformOrigin: 'center center',
				}}
			>
				{sortedNodes.map((node) => {
					const selected = isSelected(node.id);
					const isDragging = node.id === draggedId;

					return (
						<div
							key={node.id}
							draggable={true}
							onDragStart={(e) => handleDragStart(e, node)}
							onDrag={handleDrag}
							onDragEnd={handleDragEnd}
							onMouseDown={(e) => e.stopPropagation()}
							onTouchStart={(e) => handleTouchStart(e, node)}
							className={`absolute flex cursor-grab touch-none items-center justify-center rounded-full p-2 text-center transition-all duration-200 select-none ${
								isDragging
									? 'outline-purple-3 bg-white! outline-2 outline-offset-0 outline-dashed'
									: 'opacity-100 hover:scale-105 hover:shadow-lg active:scale-95'
							} ${selected ? 'ring-4 ring-[#2DD4BF] ring-offset-2' : ''}`}
							style={
								{
									left: node.x - node.targetRadius,
									top: node.y - node.targetRadius,
									width: node.targetRadius * 2,
									height: node.targetRadius * 2,
									backgroundColor: selected
										? BUBBLE_SELECTED_COLOR
										: isDragging
											? BUBBLE_DRAGGING_COLOR
											: BUBBLE_COLOR,
									zIndex: isDragging ? 100 : selected ? 50 : 1,
									WebkitUserDrag: 'element',
								} as React.CSSProperties
							}
						>
							<span
								className="pointer-events-none line-clamp-3 text-sm leading-tight font-bold"
								style={{ color: isDragging ? '#fff' : TEXT_COLOR }}
							>
								#{node.label}
							</span>
						</div>
					);
				})}
			</div>
		</div>
	);
}
