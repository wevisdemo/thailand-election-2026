import { ConstituencyMap } from '@/src/type/candidate';
import ElectorateTemplate from '.';
import rawDistrictCandidate from '../../data/district_candidates.json' with { type: 'json' };
import rawParties from '../../data/parties.json' with { type: 'json' };
import rawElectoralDistrict from '../../data/electoral_district_table.json' with { type: 'json' };
import { ElectoralDistrictsMap } from '@/src/type/electoral_district';
import { Party } from '@/src/type/party';

const districtCandidateMap = rawDistrictCandidate as ConstituencyMap;
const electorateList = Object.keys(districtCandidateMap);
const electoralDistrictMap = rawElectoralDistrict as ElectoralDistrictsMap;

export async function generateStaticParams() {
	return electorateList.map((electorate) => ({ slug: encodeURI(electorate) }));
}

export default async function ElectoratePage({
	params,
}: {
	params: Promise<{ slug: string }>;
}) {
	const { slug } = await params;
	const decodedSlug = decodeURI(slug);
	const candidates = districtCandidateMap[decodedSlug] || [];
	const parties = rawParties as Party[];
	const electoralDistrict = electoralDistrictMap[decodedSlug];
	return (
		<>
			<h2>{decodeURI(slug)}</h2>
			<ElectorateTemplate
				candidates={candidates}
				parties={parties}
				electoralDistrict={electoralDistrict}
			/>
			;
		</>
	);
}
