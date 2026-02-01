export function WarningBanner() {
	return (
		<div className="sticky bottom-0 z-100 w-full border-t border-t-[#c1b75e] bg-[#f7e64f] p-3 shadow">
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
	);
}
