'use client';
import {
	ElectionButton,
	ElectionFooter,
	ElectionSharer,
} from '@election/ui/react';

export default function AboutPage() {
	return (
		<div>
			<button
				className="flex items-center gap-[4px] p-[10px] hover:cursor-pointer"
				onClick={() => {
					window.location.href = '/ballotready';
				}}
			>
				<img
					className="w-[12px]"
					src="/ballotready/left-arrow.svg"
					alt="left-arrow"
				/>
				<p className="text-[14px]">กลับไปหน้าแรก</p>
			</button>
			<h1 className="font-kondolar text-h3 py-[72px] text-center font-bold">
				เกี่ยวกับโครงการ
			</h1>
			<div className="m-auto flex grid w-full max-w-[288px] flex-col justify-center gap-[50px] md:max-w-[650px] md:gap-[100px]">
				<div>
					<h2 className="font-kondolar text-h5 mb-[15px] font-bold md:mb-[30px]">
						เป้าหมาย
					</h2>
					<p className="mb-[20px]">
						การเลือกตั้งคือกลไกในระบอบประชาธิปไตยที่ประชาชนผู้ที่เป็นเจ้าของอำนาจจะต้องเลือก
						‘ผู้แทน’ ของตัวเองเข้าไปทำหน้าที่ในสภา
						จึงถือเป็นการตัดสินใจครั้งสำคัญว่าเราจะใช้อำนาจที่มีอยู่นี้เปลี่ยนแปลงสังคมและประเทศไปในทิศทางไหน
					</p>
					<p className="mb-[20px]">
						พวกเราทีม WeVis จึงจัดทำโปรเจกต์ ‘Ballot Ready เข้าคูหารอบนี้
						ต้องเลือกอะไรบ้าง ?’ ภายใต้แคมเปญ #WeVisElection69
						ที่จะช่วยให้คุณได้เตรียมตัวเลือกตั้งอย่างมั่นใจ
						โดยเริ่มจากทำความรู้จักผู้สมัคร ส.ส.
						และพรรคการเมืองในตำบลหรือเขตเลือกตั้งของคุณว่ามีใครให้เลือกบ้าง
						พร้อมเข้าใจบัตรเลือกตั้งว่ามีกี่ใบและต้องกาอย่างไรให้ไม่เสียสิทธิ
					</p>
					<p>
						ก่อนเข้าคูหา #เลือกตั้ง69
						ขอชวนทุกคนศึกษาข้อมูลนี้เพื่อตัดสินใจมอบอำนาจให้กับ ‘ผู้แทน’
						ที่จะเข้าไปในรัฐสภาเพื่อใช้สิทธิและเสียงแทนเราอย่างแท้จริง
					</p>
				</div>
				<div>
					<h2 className="font-kondolar text-h5 mb-[15px] font-bold md:mb-[30px]">
						ที่มาของข้อมูล & ข้อจำกัด
					</h2>
					<p>
						ข้อมูลผู้สมัครสมาชิกสภาผู้แทนราษฎรแบบเขตและบัญชีรายชื่อ
						และรายชื่อบุคคลที่พรรคการเมืองมีมติจะเสนอสภาผู้แทนราษฎรพิจารณาให้ความเห็นชอบแต่งตั้งเป็นนายกรัฐมนตรี
						โดยคณะกรรมการการเลือกตั้ง
					</p>
				</div>
				<div>
					<h2 className="font-kondolar text-h5 mb-[15px] font-bold md:mb-[30px]">
						นโยบายการนำข้อมูลไปใช้ต่อ
					</h2>
					<p>
						ทางทีมมีความตั้งใจที่พัฒนาทุกโปรเจกต์ให้เป็น Open Source
						และเปิดข้อมูลเป็น Open Data ภายใต้ข้อตกลงในการใช้งาน (
						<a
							className="underline"
							href="https://wevis.info/terms-of-use/"
							target="_blank"
						>
							Terms of Use
						</a>
						)
						หากมีข้อสงสัยต้องการสอบถามเพิ่มเติมประสงค์แจ้งเปลี่ยนแปลงหรือเพิ่มเติมข้อมูลเพื่อความถูกต้อง
						หรือมีข้อเสนอแนะใด ๆ สามารถติดต่อได้ที่ team@wevis.info
					</p>
				</div>
				<div>
					<h2 className="font-kondolar text-h5 mb-[15px] font-bold md:mb-[30px]">
						อาสาสมัครร่วมพัฒนา
					</h2>
					<div className="mb-[15px] md:mb-[30px]">
						<p className="mb-[5px] font-bold md:mb-[10px]">พัฒนาเว็บไซต์</p>
						<p>ทรงพล นิลวงษ์</p>
					</div>
					<div className="mb-[15px] md:mb-[30px]">
						<p className="mb-[5px] font-bold md:mb-[10px]">ออกแบบ</p>
						<p>ชินธิป เอกก้านตรงษ์</p>
					</div>
					<div className="mb-[15px] md:mb-[30px]">
						<p className="mb-[5px] font-bold md:mb-[10px]">จัดการข้อมูล</p>
						<p>xxxxx</p>
					</div>
					<div className="mb-[15px] md:mb-[30px]">
						<p className="mb-[5px] font-bold md:mb-[10px]">
							สืบค้นและรวบรวมข้อมูล
						</p>
						<p>อาลาวีย์ วาแม</p>
					</div>
					<div>
						<p className="mb-[5px] font-bold md:mb-[10px]">บรรณาธิการ</p>
						<p>ธนิสรา เรืองเดช</p>
						<p>น้ําใส ศุภวงศ์</p>
					</div>
				</div>
				<div>
					<h2 className="font-kondolar text-h5 mb-[15px] font-bold md:mb-[30px]">
						หมายเหตุ
					</h2>
					<p>
						ทางทีมมีความตั้งใจที่พัฒนาทุกโปรเจกต์ให้เป็น Open Source
						และเปิดข้อมูลเป็น Open Data ภายใต้ข้อตกลงในการใช้งาน (
						<a
							className="underline"
							href="https://wevis.info/terms-of-use/"
							target="_blank"
						>
							Terms of Use
						</a>
						)
						หากมีข้อสงสัยต้องการสอบถามเพิ่มเติมประสงค์แจ้งเปลี่ยนแปลงหรือเพิ่มเติมข้อมูลเพื่อความถูกต้อง
						หรือมีข้อเสนอแนะใด ๆ สามารถติดต่อได้ที่ team@wevis.info
					</p>
				</div>
			</div>
			<div className="flex flex-col justify-center gap-[10px] py-[20px] md:flex-row md:py-[50px]">
				<a
					href="https://drive.google.com/drive/folders/171KdzhbsE-x2k9HNFioWBnnHVUk7xXEN"
					target="_blank"
				>
					<ElectionButton className="typo-h9 font-kondolar self-center text-[14px] font-bold">
						<div className="flex w-[132px] gap-[8px]">
							<img src="/ballotready/download-icon.svg" alt="download-icon" />{' '}
							ดาวน์โหลดข้อมูล
						</div>
					</ElectionButton>
				</a>
				<a
					href="https://airtable.com/appsowPzCsRLmUvNx/shryu4errnlj1LWsM"
					target="_blank"
				>
					<ElectionButton className="typo-h9 font-kondolar w-[180px] self-center text-[14px] font-bold">
						<div className="flex w-[132px] gap-[8px]">
							<img src="/ballotready/envelop-icon.svg" alt="envelop-icon" />{' '}
							Feedback
						</div>
					</ElectionButton>
				</a>
				<a
					href="https://github.com/wevisdemo/thailand-election-2026"
					target="_blank"
				>
					<ElectionButton className="typo-h9 font-kondolar w-[180px] self-center text-[14px] font-bold">
						<div className="flex w-[132px] gap-[8px]">
							<img src="/ballotready/github-icon.svg" alt="github-icon" /> View
							on Github
						</div>
					</ElectionButton>
				</a>
			</div>
			<ElectionSharer className="py-[40px]" />
			<ElectionFooter />
		</div>
	);
}
