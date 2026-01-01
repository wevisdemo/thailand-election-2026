import {
	ElectionNavbar,
	ElectionButton,
	ElectionSharer,
	ElectionAboutActions,
	ElectionFooter,
} from '@election/ui/react';
import IntroSection from './component/home/IntroSection';
import SearchSection from './component/home/SearchSection';
import HowToVoteSection from './component/home/HowToVoteSection';
import BallotStepSection from './component/home/BallotStepSection';
import districtProvince from './data/district_province_list.json' with { type: 'json' };
import { ThailandDistrict } from '../type/district';
import rawElectoralDistrict from './data/electoral_district_table.json' with { type: 'json' };
import { ElectoralDistrictsMap } from '../type/electoral_district';

export default function Intro() {
	const districtList = districtProvince as ThailandDistrict[];
	const electoralDistrictMap = rawElectoralDistrict as ElectoralDistrictsMap;

	const districtMapLabel = new Map(
		districtList.map((d) => [
			`ต.${d.subDistrict} อ.${d.district} จ.${d.province}`,
			d,
		]),
	);
	return (
		<div className="flex flex-col">
			<ElectionNavbar />
			<IntroSection />
			<SearchSection mapDistrict={districtMapLabel} />
			<HowToVoteSection />
			<BallotStepSection />
			<div className="flex flex-col items-center gap-[10px] px-[16px] py-[32px]">
				<ElectionSharer />
				<ElectionButton className="typo-h9 font-kondolar self-center font-bold">
					เกี่ยวกับโครงการ
				</ElectionButton>
			</div>
			<ElectionFooter />
		</div>
	);
}
