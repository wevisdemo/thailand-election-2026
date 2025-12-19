'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import { Stage, Layer, Circle, Text, Group } from 'react-konva';
import * as d3 from 'd3';
import Konva from 'konva';

interface BubbleData {
	id: string;
	label: string;
	value: number;
	relatedIds?: string[];
}

interface BubbleNode extends BubbleData {
	x: number;
	y: number;
	targetRadius: number;
}

interface BubbleLink {
	source: string;
	target: string;
}

interface BubbleChartProps {
	data: BubbleData[];
	width?: number;
	height?: number;
}

const MIN_RADIUS = 48;
const MAX_RADIUS = 80;
const COLLISION_PADDING = 4; // Collider is 4px larger than drawn circle (8px gap between circles)
const CENTER_BUBBLE_LABEL = 'จัดตั้งรัฐบาล 2566';
const BUBBLE_COLOR = '#CEC2F5';
const BUBBLE_DRAGGING_COLOR = '#9C81F6';
const TEXT_COLOR = '#4A3260';
const MIN_ZOOM = 0.2;
const MAX_ZOOM = 3;
const ZOOM_SPEED = 1.1;

export default function BubbleChart({
	data,
	width = 800,
	height = 600,
}: BubbleChartProps) {
	const containerRef = useRef<HTMLDivElement>(null);
	const stageRef = useRef<Konva.Stage>(null);
	const [dimensions, setDimensions] = useState({ width, height });
	const [nodes, setNodes] = useState<BubbleNode[]>([]);
	const [draggedId, setDraggedId] = useState<string | null>(null);
	const originalPosRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
	const [stageScale, setStageScale] = useState(1);
	const [stagePos, setStagePos] = useState({ x: 0, y: 0 });

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

	// Initialize simulation
	useEffect(() => {
		if (!data.length) return;

		const { width: w, height: h } = dimensions;
		const centerX = w / 2;
		const centerY = h / 2;
		const maxValue = Math.max(...data.map((d) => d.value));

		// Initialize nodes in a circular pattern for better starting positions
		const initialNodes: BubbleNode[] = data.map((d, i) => {
			const angle = (i / data.length) * 2 * Math.PI;
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

		// Create links from sub_tag relationships
		const links: BubbleLink[] = [];
		const linkSet = new Set<string>();

		data.forEach((d) => {
			if (d.relatedIds) {
				d.relatedIds.forEach((relatedId) => {
					// Only create link if target exists and avoid duplicates
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
			// Link force: pull related nodes together
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
							// Distance = sum of radii + 8px gap (4px padding each side)
							return (
								source.targetRadius +
								target.targetRadius +
								COLLISION_PADDING * 2
							);
						}
						return 100;
					})
					.strength(1), // Strong link attraction
			)
			// Charge force: nodes repel each other
			.force(
				'charge',
				d3
					.forceManyBody<BubbleNode>()
					.strength((d) => -d.targetRadius * 2) // Repulsion based on size
					.distanceMin(10)
					.distanceMax(300),
			)
			// Collision force: prevent overlap (radius + 4px padding = 8px gap between circles)
			.force(
				'collision',
				d3
					.forceCollide<BubbleNode>()
					.radius((d) => d.targetRadius + COLLISION_PADDING)
					.strength(1)
					.iterations(3),
			)
			// Center forces: keep the graph centered
			.force('center', d3.forceCenter(centerX, centerY))
			.force('x', d3.forceX(centerX).strength(0.02))
			.force('y', d3.forceY(centerY).strength(0.02))
			.stop();

		// Fix center bubble at center
		if (centerNode) {
			(centerNode as any).fx = centerX;
			(centerNode as any).fy = centerY;
		}

		// Run simulation with cooling
		simulation.alpha(1);
		for (let i = 0; i < 500; i++) {
			simulation.tick();
		}

		// Ensure center bubble is exactly at center
		if (centerNode) {
			centerNode.x = centerX;
			centerNode.y = centerY;
		}

		setNodes([...initialNodes]);
	}, [data, dimensions, radiusScale]);

	// Drag handlers
	const handleDragStart = useCallback(
		(e: Konva.KonvaEventObject<DragEvent>, node: BubbleNode) => {
			const isCenter = node.label === CENTER_BUBBLE_LABEL;
			originalPosRef.current = {
				x: isCenter ? dimensions.width / 2 : node.x,
				y: isCenter ? dimensions.height / 2 : node.y,
			};
			setDraggedId(node.id);
		},
		[dimensions],
	);

	const handleDragMove = useCallback(
		(e: Konva.KonvaEventObject<DragEvent>, nodeId: string) => {
			const target = e.target;
			const newX = target.x();
			const newY = target.y();

			setNodes((prev) =>
				prev.map((n) => (n.id === nodeId ? { ...n, x: newX, y: newY } : n)),
			);
		},
		[],
	);

	const handleDragEnd = useCallback(
		(e: Konva.KonvaEventObject<DragEvent>, nodeId: string) => {
			// Return to original position
			const { x, y } = originalPosRef.current;

			setNodes((prev) =>
				prev.map((n) => (n.id === nodeId ? { ...n, x, y } : n)),
			);

			// Reset Konva node position
			e.target.position({ x, y });

			setDraggedId(null);
		},
		[],
	);

	// Wheel zoom handler
	const handleWheel = useCallback(
		(e: Konva.KonvaEventObject<WheelEvent>) => {
			e.evt.preventDefault();

			const stage = stageRef.current;
			if (!stage) return;

			const oldScale = stageScale;
			const pointer = stage.getPointerPosition();
			if (!pointer) return;

			const mousePointTo = {
				x: (pointer.x - stagePos.x) / oldScale,
				y: (pointer.y - stagePos.y) / oldScale,
			};

			// Determine zoom direction
			const direction = e.evt.deltaY > 0 ? -1 : 1;
			const newScale =
				direction > 0 ? oldScale * ZOOM_SPEED : oldScale / ZOOM_SPEED;

			// Clamp scale between MIN_ZOOM and MAX_ZOOM
			const clampedScale = Math.max(MIN_ZOOM, Math.min(MAX_ZOOM, newScale));

			const newPos = {
				x: pointer.x - mousePointTo.x * clampedScale,
				y: pointer.y - mousePointTo.y * clampedScale,
			};

			setStageScale(clampedScale);
			setStagePos(newPos);
		},
		[stageScale, stagePos],
	);

	// Sort nodes for z-index (dragged node on top)
	const sortedNodes = [...nodes].sort((a, b) => {
		if (a.id === draggedId) return 1;
		if (b.id === draggedId) return -1;
		return b.value - a.value;
	});

	return (
		<div
			ref={containerRef}
			style={{
				width: '100%',
				height: '100%',
				minHeight: '500px',
				position: 'relative',
				overflow: 'hidden',
			}}
		>
			<Stage
				ref={stageRef}
				width={dimensions.width}
				height={dimensions.height}
				scaleX={stageScale}
				scaleY={stageScale}
				x={stagePos.x}
				y={stagePos.y}
				onWheel={handleWheel}
			>
				<Layer>
					{sortedNodes.map((node) => (
						<Group
							key={node.id}
							x={node.x}
							y={node.y}
							draggable
							onDragStart={(e) => handleDragStart(e, node)}
							onDragMove={(e) => handleDragMove(e, node.id)}
							onDragEnd={(e) => handleDragEnd(e, node.id)}
							onMouseEnter={(e) => {
								const container = e.target.getStage()?.container();
								if (container) container.style.cursor = 'grab';
							}}
							onMouseLeave={(e) => {
								const container = e.target.getStage()?.container();
								if (container) container.style.cursor = 'default';
							}}
						>
							<Circle
								radius={node.targetRadius}
								fill={
									node.id === draggedId ? BUBBLE_DRAGGING_COLOR : BUBBLE_COLOR
								}
							/>
							<Text
								text={`#${node.label}`}
								fontFamily="Kondolar Thai"
								fontStyle="200"
								fill={TEXT_COLOR}
								width={node.targetRadius * 2 - 16}
								height={node.targetRadius}
								offsetX={node.targetRadius - 8}
								offsetY={node.targetRadius / 2}
								align="center"
								verticalAlign="middle"
								wrap="word"
								ellipsis={true}
								listening={false}
							/>
						</Group>
					))}
				</Layer>
			</Stage>
		</div>
	);
}
