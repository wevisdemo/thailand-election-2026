'use client';

import { create } from 'zustand';

export interface Topic {
	id: string;
	label: string;
	value: number;
	score: number;
	relatedIds: string[];
}

interface TopicState {
	topics: Topic[];
	selectedTopics: Topic[];
	draggedTopic: Topic | null;
	isOverDropZone: boolean;

	// Actions
	setTopics: (topics: Topic[]) => void;
	addSelectedTopic: (topic: Topic) => void;
	removeSelectedTopic: (id: string) => void;
	clearSelectedTopics: () => void;
	setDraggedTopic: (topic: Topic | null) => void;
	setIsOverDropZone: (isOver: boolean) => void;
	reorderSelectedTopics: (fromIndex: number, toIndex: number) => void;
}

export const useTopicStore = create<TopicState>((set, get) => ({
	topics: [],
	selectedTopics: [],
	draggedTopic: null,
	isOverDropZone: false,

	setTopics: (topics) => set({ topics }),

	addSelectedTopic: (topic) => {
		const { selectedTopics } = get();
		// Allow unlimited topics (no max limit)
		if (selectedTopics.find((t) => t.id === topic.id)) return;
		set({ selectedTopics: [...selectedTopics, topic] });
	},

	removeSelectedTopic: (id) => {
		set((state) => ({
			selectedTopics: state.selectedTopics.filter((t) => t.id !== id),
		}));
	},

	clearSelectedTopics: () => set({ selectedTopics: [] }),

	setDraggedTopic: (topic) => set({ draggedTopic: topic }),

	setIsOverDropZone: (isOver) => set({ isOverDropZone: isOver }),

	reorderSelectedTopics: (fromIndex, toIndex) => {
		set((state) => {
			const newTopics = [...state.selectedTopics];
			const [movedItem] = newTopics.splice(fromIndex, 1);
			newTopics.splice(toIndex, 0, movedItem);
			return { selectedTopics: newTopics };
		});
	},
}));
