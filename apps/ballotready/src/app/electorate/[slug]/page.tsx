import { ConstituencyMap } from '@/src/type/candidate';
import ElectorateTemplate from '.';
import rawDistrictCandidate from '../../data/district_candidates.json' with { type: 'json' };
import rawParties from '../../data/parties.json' with { type: 'json' };
import rawElectoralDistrict from '../../data/electoral_district_table.json' with { type: 'json' };
import { ElectoralDistrictsMap } from '@/src/type/electoral_district';
import { Party } from '@/src/type/party';
import {
	districtCandidateMap,
	indexToElectorateMap,
} from '@/src/constants/electorate';

// export const dynamicParams = false;

const electoralDistrictMap = rawElectoralDistrict as ElectoralDistrictsMap;

export async function generateStaticParams() {
	// const districtCandidateMap = rawDistrictCandidate as ConstituencyMap;
	// const electorateList = Object.keys(districtCandidateMap);
	const indexList = Object.keys(indexToElectorateMap);
	return indexList.map((index) => ({
		slug: index.toString(),
	}));
}

export default async function ElectoratePage({
	params,
}: {
	params: Promise<{ slug: string }>;
}) {
	const { slug } = await params;
	const electorateName = indexToElectorateMap[slug];
	// const decodedSlug = decodeURI(slug);
	const candidates = districtCandidateMap[electorateName] || [];
	const parties = rawParties as Party[];
	const electoralDistrict = electoralDistrictMap[electorateName];
	return (
		<>
			<h2>{decodeURIComponent(slug)}</h2>
			<ElectorateTemplate
				candidates={candidates}
				parties={parties}
				electoralDistrict={electoralDistrict}
			/>
			;
		</>
	);
}
