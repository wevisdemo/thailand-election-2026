export type ConstituencyMap = Record<string, Candidate[]>;

export interface Candidate {
	name: string;
	number: number;
	image: string | null;
	age: number | null;
	education: string;
	previousOccupation: string;
	party: Party;
	hasPreviousPosition: boolean;
	externalLinks: ExternalLink[];
}

export interface Party {
	name: string;
	image: string;
}

export interface ExternalLink {
	label: string;
	url: string;
}
