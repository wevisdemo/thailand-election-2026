export default function BallotRemind() {
	return (
		<div className="flex items-start rounded-[16px] bg-[#CEC2F5] p-[18px]">
			<img
				className="w-[40px]"
				src="/ballotready/exclamation-icon.svg"
				alt="exclamation-icon"
			/>
			<div className="ml-[10px]">
				<p className="text-h10 font-kondolar font-bold">บัตรเลือกตั้งมี 2 ใบ</p>
				<ul className="ml-[12px] list-inside list-disc">
					<li className="text-h10 font-kondolar font-bold">
						บัตรใบแรก เลือกคนที่ใช่
					</li>
					<li className="text-h10 font-kondolar font-bold">
						บัตรอีกใบ เลือกพรรคที่ชอบ
					</li>
				</ul>
			</div>
		</div>
	);
}
