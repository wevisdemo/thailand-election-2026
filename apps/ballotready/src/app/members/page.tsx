import { ElectoralDistrict } from '@/src/type/electoral_district';
import { ElectionNavbar } from '@election/ui/react';
import ElectorateCard from '../component/shared/ElectorateCard';
import BallotRemind from '../component/Electorate/BallotRemind';

const mockData: ElectoralDistrict = {
	province: 'กระบี่',
	districts: [
		{
			name: 'เมืองกระบี่',
			subDistricts: [
				'กระบี่น้อย',
				'กระบี่ใหญ่',
				'เขาคราม',
				'เขาทอง',
				'คลองประสงค์',
				'ทับปริก',
				'ปากน้ำ',
				'ไสไทย',
				'หนองทะเล',
				'อ่าวนาง',
			],
			belongsToOneElecDist: true,
		},
		{
			name: 'เหนือคลอง',
			subDistricts: [
				'เกาะศรีบอยา',
				'คลองขนาน',
				'คลองเขม้า',
				'ตลิ่งชัน',
				'เหนือคลอง',
			],
			belongsToOneElecDist: false,
		},
	],
	electoralDistrictNumber: 1,
};

export default function MembersPage() {
	return (
		<div className="flex flex-col">
			<ElectionNavbar />
			<div className="flex flex-col gap-[16px] px-[16px] py-[16px] md:px-[32px]">
				<button className="flex items-center gap-[4px] hover:cursor-pointer">
					<img
						className="w-[40px]"
						src="/ballotready/left-arrow.svg"
						alt="left-arrow"
					/>
					<p className="text-[14px] font-bold">กลับไปหน้าแรก</p>
				</button>
				<div className="m-auto grid max-w-[600px] justify-center gap-[16px]">
					<ElectorateCard electoralDistrict={mockData} />
					<BallotRemind />
				</div>
			</div>
		</div>
	);
}
