'use client';
import {
	ElectionAboutActions,
	ElectionFooter,
	ElectionSharer,
} from '@election/ui/react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

const AboutPage = () => {
	const router = useRouter();
	return (
		<div className="mt-12 md:mt-20">
			<div className="mb-4 max-w-[600px] flex-col md:mx-auto">
				<div className="mx-4 flex gap-1" onClick={() => router.back()}>
					<Image
						src="/politicalflashback/icon/chevron-left.svg"
						alt="Back"
						width={12}
						height={12}
					/>
					<p className="text-b6 font-ibmplex cursor-pointer text-black hover:underline">
						ย้อนกลับ
					</p>
				</div>
				<div className="mx-4 flex flex-col gap-12 md:mx-auto">
					<div className="mt-20 mb-8 text-center">
						<h1 className="text-h3 font-kondolar font-bold text-black">
							เกี่ยวกับโครงการ
						</h1>
					</div>

					<div className="flex flex-col gap-4">
						<p className="text-h5 font-kondolar font-bold text-black">
							เกี่ยวกับเว็บไซต์
						</p>
						<p className="text-b4 font-ibmplex text-black">
							เว็บไซต์นี้จัดทำขึ้นเพื่อรวบรวมและสรุปเหตุการณ์ทางการเมืองที่สำคัญตลอดสมัยของสภาผู้แทนราษฎรชุดที่
							26 โดยมีเป้าหมายเพื่อสนับสนุนการการตัดสินใจของผู้มีสิทธิเลือกตั้ง
							(Voter) ในการเลือกตั้งปี 2569 ที่กำลังจะเกิดขึ้น
							<br />
							<br />
							เนื้อหาภายในเว็บไซต์นำเสนอการทบทวน (Recap)
							สถานการณ์ทางการเมืองผ่านข่าวประเด็นการเมืองที่หลากหลาย
							ครอบคลุมเหตุการณ์ทางการเมือง เหตุการณ์สาธารณะ นโยบาย
							การทำงานของพรรคการเมือง และบทบาทของผู้แทนราษฎร
							เพื่อช่วยให้ผู้ใช้สามารถระลึกถึงบริบททางการเมืองที่ผ่านมาอย่างรอบด้าน
							<br />
							<br />
							เว็บไซต์มุ่งหวังให้ข้อมูลที่เป็นประโยชน์ต่อสาธารณะ
							ส่งเสริมความเข้าใจทางการเมือง
							และสนับสนุนการตัดสินใจเลือกพรรคการเมืองและผู้แทนอย่างมีข้อมูลประกอบ
							บนพื้นฐานของการมีส่วนร่วมในระบอบประชาธิปไตย
						</p>
					</div>

					<div className="flex flex-col gap-4">
						<p className="text-h5 font-kondolar font-bold text-black">
							ที่มาและข้อจำกัดของข้อมูล
						</p>
						<p className="text-b4 font-ibmplex text-black">
							ข้อมูลข่าวหมวดหมู่การเมืองที่ใช้พัฒนางานชิ้นนี้
							ทีมงานได้เก็บรวบรวมจากเว็บไซต์สำนักข่าวในประเทศไทยที่น่าเชื่อถือและมีผู้ใช้งานจำนวนมาก
							จากการจัดอันดับของ Reuters Institute for the Study of Journalism
							ในปี 2025 และมีการจัดโครงสร้างเว็บไซต์ที่เป็นระบบ
							ทำให้สามารถเก็บรวบรวมข้อมูลได้ ข้อมูลในงานชิ้นนี้
							จึงไม่ได้ครอบคลุมข่าวทั้งหมดที่มีในประเทศไทย แต่มาจาก 4
							เว็บไซต์ข่าวออนไลน์ที่สำคัญ ได้แก่ ไทยรัฐ ออนไลน์, The Standard,
							Thai PBS และ อมรินทร์ทีวี วิธีที่ใช้ดึงข้อมูลจากเว็บไซต์ข่าว
							ข้อมูลที่ใช้ในงานมาจากการดึงข้อมูล (data scraping)
							บนเว็บไซต์สำนักข่าวด้วยเครื่องมือ{' '}
							<span
								className="underline"
								onClick={() =>
									window.open(
										'https://github.com/SeleniumHQ/selenium',
										'_blank',
									)
								}
							>
								python library selenium
							</span>{' '}
							ผ่าน Google Colab ทั้งนี้
							เว็บไซต์สำนักข่าวที่มีปริมาณข่าวค่อนข้างมากอย่างไทยรัฐออนไลน์
							มีการใช้ API ของเว็บไซต์มาช่วยดึงข้อมูลด้วย
							โดยข้อมูลที่ถูกดึงมาใช้ประกอบด้วย พาดหัวข่าว วันที่ลงข่าว
							แท็กที่เกี่ยวข้อง และลิงก์ URL ของข่าว
							ข้อมูลดังกล่าวถูกรวมและสร้างเป็น Pandas DataFrame เพื่อ export
							เป็นไฟล์นามสกุล CSV ตามลำดับ
						</p>
					</div>

					<div className="flex flex-col gap-4">
						<p className="text-h5 font-kondolar font-bold text-black">
							วิธีการในการคัดเลือกข้อมูล
						</p>
						<p className="text-b4 font-ibmplex text-black">
							เรานำข่าวในหมวดการเมืองทั้งหมดที่ได้มาจัดกลุ่มตามประเด็นให้ตามอ่านได้ง่าย
							ดังนี้ <br />
							<br />
							1. ทำการรวบรวมตัวอย่างข่าวมาวิเคราะห์ Tag ที่สำนักข่าวใช้
							เพื่อให้เห็นภาพรวมและกำหนดประเด็นสำคัญในเบื้องต้น <br /> <br />
							2. ทีมงานตรวจสอบและคัดเลือกประเด็นสำคัญเพิ่มเติม
							จากการสำรวจเนื้อหาและพาดหัวข่าว
							เพื่อเก็บประเด็นตกหล่นที่อาจไม่ปรากฏใน Tag
							หลักให้ได้ข้อมูลที่ครบถ้วนรอบด้าน <br /> <br />
							3. ทีมงานสรุปประเด็นทั้งหมดแล้วนำมาพัฒนาคีย์เวิร์ด โดยใช้
							Algorithm ทำงานร่วมกับทีมงาน เพื่อระบุคำที่เกี่ยวข้อง (Related
							Keywords) ช่วยให้การดึงข้อมูลข่าวครอบคลุมและแม่นยำยิ่งขึ้น <br />{' '}
							<br />
							4. รวบรวมพาดหัวข่าวตามชุดคีย์เวิร์ดที่กำหนด
							พร้อมให้ทีมงานตรวจสอบความถูกต้องในขั้นตอนสุดท้ายก่อนนำไปใช้งาน{' '}
							<br /> <br />
						</p>
					</div>

					<div className="flex flex-col gap-4">
						<p className="text-h5 font-kondolar font-bold text-black">
							อาสาสมัครร่วมพัฒนา
						</p>
						<div className="flex flex-col">
							<p className="text-b4 font-ibmplex font-bold text-black">
								เขียนโปรแกรม
							</p>
							<div className="ml-2 flex items-center gap-1">
								<div className="h-1 w-1 rounded-full bg-black" />

								<p className="text-b4 font-ibmplex text-black">พชร สังข์แก้ว</p>
							</div>
						</div>
						<div className="flex flex-col">
							<p className="text-b4 font-ibmplex font-bold text-black">
								ออกแบบ
							</p>
							<div className="ml-2 flex items-center gap-1">
								<div className="h-1 w-1 rounded-full bg-black" />

								<p className="text-b4 font-ibmplex text-black">
									ธนวิชญ์ ประสงค์พงษ์ชัย{' '}
								</p>
							</div>
						</div>
						<div className="flex flex-col">
							<p className="text-b4 font-ibmplex font-bold text-black">
								วิเคราะห์ข้อมูล
							</p>
							<div className="ml-2 flex items-center gap-1">
								<div className="h-1 w-1 rounded-full bg-black" />

								<p className="text-b4 font-ibmplex text-black">ปฏิภาณ ศรีชัย</p>
							</div>
						</div>
						<div className="flex flex-col">
							<p className="text-b4 font-ibmplex font-bold text-black">
								สืบค้นและเรียบเรียงข้อมูล
							</p>
							<div className="ml-2 flex items-center gap-1">
								<div className="h-1 w-1 rounded-full bg-black" />

								<p className="text-b4 font-ibmplex text-black">
									อัญชิสา บุญแก้ว
								</p>
							</div>
						</div>
						<div className="flex flex-col">
							<p className="text-b4 font-ibmplex font-bold text-black">
								บรรณาธิการ
							</p>
							<div className="ml-2 flex items-center gap-1">
								<div className="h-1 w-1 rounded-full bg-black" />

								<p className="text-b4 font-ibmplex text-black">
									ธนิสรา เรืองเดช
								</p>
							</div>
							<div className="ml-2 flex items-center gap-1">
								<div className="h-1 w-1 rounded-full bg-black" />

								<p className="text-b4 font-ibmplex text-black">น้ำใส ศุภวงศ์</p>
							</div>
						</div>
						<div className="flex flex-col">
							<p className="text-b4 font-ibmplex font-bold text-black">
								ประสานงานและจัดการอื่น ๆ
							</p>
							<div className="ml-2 flex items-center gap-1">
								<div className="h-1 w-1 rounded-full bg-black" />

								<p
									className="text-b4 font-ibmplex text-black underline"
									onClick={() => window.open('https://wevis.info/', '_blank')}
								>
									WeVis{' '}
								</p>
							</div>
						</div>
					</div>
				</div>
			</div>

			<ElectionAboutActions />
			<div>
				{/* <ElectionAboutActions dataUrl="#" /> */}
				<div className="flex w-full flex-col gap-10 bg-white pt-10">
					<div className="flex flex-col items-center justify-center gap-2 pb-5">
						<ElectionSharer />
					</div>
					<ElectionFooter />
				</div>
			</div>
		</div>
	);
};

export default AboutPage;
