// export interface Party {
// 	name: string;
// 	number: number;
// 	partyLogoUrl?: string;
// 	candidates: PresidentCandidate[];
// 	partyListCandidates: PartyListCandidate[];
// 	previousPositions?: PreviousPosition[];
// }

// interface PresidentCandidate {
// 	name: string;
// 	photoUrl?: string;
// }

// export interface PartyListCandidate {
// 	name: string;
// 	photoUrl?: string;
// 	number: number;
// 	hasHeldPositionBefore?: boolean;
// }

// interface PreviousPosition {
// 	position: string;
// 	duration: string;
// }

export interface PmCandidate {
	name: string;
	image: string;
}

export interface PartyListCandidate {
	name: string;
	number: number;
	hasPreviousPosition: boolean;
}

export interface ExternalLink {
	label: string;
	url: string;
}

export interface Party {
	name: string;
	number: number;
	image: string;
	pmCandidates: PmCandidate[];
	partyList: PartyListCandidate[];
	pastGovernmentPeriods: string[];
	pastOppositionPeriods: string[];
	externalLinks: ExternalLink[];
}
