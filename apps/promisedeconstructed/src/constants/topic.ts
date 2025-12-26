export const TOPICS = [
	'problem',
	'action',
	'outcomeIndicator',
	'target',
	'timeframe',
	'budget',
	'budgetSource',
] as const;
export type Topic = (typeof TOPICS)[number];
