import { Party } from '@/src/type/party';

export default function MaintenanceModal() {
	return (
		<div className="fixed inset-0 z-100 flex h-full w-full items-center justify-center bg-[#00000080]">
			<div className="relative flex max-h-[80vh] w-full max-w-[292px] flex-col gap-[8px] rounded-[16px] border-[2px] bg-[#f7e64f] p-[16px] text-[14px] md:max-w-[400px]">
				<p className="text-b6 mx-auto w-full max-w-5xl">
					<strong className="text-b5">
						[สำคัญ] ทีม WeVis พบข้อมูลเขตเลือกตั้งที่คลาดเคลื่อน
					</strong>
					<br />
					ในระหว่างที่เรากำลังทำการแก้ไข
					ขอแนะนำให้ตรวจสอบอีกครั้งว่าเขตเลือกตั้งที่คุณเลือกตรงกับ{' '}
					<a
						className="underline"
						href="https://boraservices.bora.dopa.go.th/election/enqelection/"
						target="_blank"
					>
						ข้อมูลอย่างเป็นทางการของ กกต.
					</a>{' '}
					หรือไม่ ขออภัยในความไม่สะดวกมา ณ ที่นี้ หากคุณพบข้อผิดพลาดใดๆ
					สามารถแจ้งปัญหามาได้ที่{' '}
					<a className="underline" href="mailto:team@wevis.info">
						team@wevis.info
					</a>
				</p>
			</div>
		</div>
	);
}
