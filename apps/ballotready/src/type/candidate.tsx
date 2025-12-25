export interface Candidate {
	name: string;
	party: string;
	electoralDistrict: string;
	photoUrl?: string;
	partyLogoUrl?: string;
	number: number;
	age?: number;
	education?: string;
	previousOccupation?: string;
	hasHeldPositionBefore?: boolean;
}
