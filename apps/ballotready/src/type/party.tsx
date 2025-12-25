export interface Party {
	name: string;
	number: number;
	partyLogoUrl?: string;
	candidates: PresidentCandidate[];
	partyListCandidates: PartyListCandidate[];
	previousPositions?: PreviousPosition[];
}

interface PresidentCandidate {
	name: string;
	photoUrl?: string;
}

interface PartyListCandidate {
	name: string;
	photoUrl?: string;
	number: number;
	hasHeldPositionBefore?: boolean;
}

interface PreviousPosition {
	position: string;
	duration: string;
}
