import { ElectoralDistrict } from '@/src/type/electoral_district';

interface PropsType {
	electoralDistrict: ElectoralDistrict;
}

export default function ElectoralteCard({ electoralDistrict }: PropsType) {
	return (
		<div className="rounded-[16px] border-[2px] p-[18px]">
			<p className="text-h8 font-kondolar font-bold">
				{electoralDistrict.province} เขตเลือกตั้งที่{' '}
				{electoralDistrict.electoralDistrictNumber}
			</p>
			<ul className="mt-[6px] list-outside list-disc">
				{electoralDistrict.districts.map((district) => (
					<li key={district.name} className="ml-[16px]">
						<span className="font-kondolar text-h10 font-bold">
							{district.name}
						</span>
						<p className="text-b5">{district.subDistricts.join(', ')}</p>
					</li>
				))}
			</ul>
		</div>
	);
}
