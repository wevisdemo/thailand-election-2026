'use client';

import AutoComplete from '../shared/Autocomplete';

export default function SearchSection() {
	return (
		<div className="grid items-center gap-[16px] bg-[#76EECC] px-[16px] py-[24px] text-center">
			<p className="font-kondolar text-h5 font-bold">รู้จักผู้สมัคร</p>
			<p className="font-kondolar text-h8 font-bold">
				ค้นหารายชื่อผู้สมัคร ส.ส. ในเขตเลือกตั้งของคุณ
			</p>
			<AutoComplete
				options={['ต.ยะหา อ.ยะหา จ.ยะลา', 'กรุงเทพมหานคร', 'เชียงใหม่']}
				onSelect={() => {}}
				placeholder="พิมพ์ชื่อตำบล/เขต/แขวง"
			/>
			<p className="text-b5">
				ถ้ายังไม่แน่ใจเรื่องเขตเลือกตั้ง ตรวจสอบสิทธิได้ที่นี่
			</p>
		</div>
	);
}
