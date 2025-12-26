export const TOPICS = [
	'problem',
	'action',
	'outcome_indicator',
	'target',
	'timeframe',
	'budget',
	'budget_source',
] as const;
export type Topic = (typeof TOPICS)[number];
