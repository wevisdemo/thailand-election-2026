// /Users/songponninwong/projects/wevis/thailand-election-2026/apps/ballotready/src/type/electoral_district.ts

export interface District {
	name: string;
	subDistricts: string[];
	belongsToOneElecDist: boolean;
}

export interface ElectoralDistrict {
	province: string;
	districts: District[];
	electoralDistrictNumber: number;
}

/**
 * Top-level map where keys are strings like "กระบี่-1"
 */
export type ElectoralDistrictsMap = Record<string, ElectoralDistrict>;
