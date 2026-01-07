import rawElectoralDistrict from '../app/data/electoral_district_table.json' with { type: 'json' };
import rawDistrictCandidate from '../app/data/district_candidates.json' with { type: 'json' };
import { ConstituencyMap } from '../type/candidate';

export const districtCandidateMap = rawDistrictCandidate as ConstituencyMap;
const electorateList = Object.keys(districtCandidateMap);

export const indexToElectorateMap = electorateList.reduce<
	Record<string, string>
>((acc, key, index) => {
	acc[index.toString()] = key;
	return acc;
}, {});

export const electorateToIndexMap = electorateList.reduce<
	Record<string, number>
>((acc, key, index) => {
	acc[key] = index;
	return acc;
}, {});
