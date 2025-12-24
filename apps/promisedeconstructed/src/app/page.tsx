import { Select } from '@/components/Select';
import { ShareBlock } from '@/components/ShareBlock';
import Image from 'next/image';
import Link from 'next/link';

export default function Home() {
	return (
		<main className="bg-bg">
			<header className="mx-auto flex w-[85svw] max-w-[600px] flex-col items-center gap-4 py-5 md:py-10">
				<div className="flex flex-col gap-2 text-center">
					<p className="text-purple-1 font-sriracha text-h7">
						Promise Deconstructed
					</p>
					<h1 className="text-h3 font-kondolar font-bold">
						ถอดโครงสร้างสัญญาพรรคการเมือง
					</h1>
					<Select />
					<p className="text-b7 text-gray-1">
						*ฐานข้อมูลมีจำนวนทั้งหมด 5 พรรค
						โดยเลือกเฉพาะพรรคที่มีข้อมูลนโยบายในเว็บไซต์ทางการ
					</p>
					<p className="text-b4">
						ดูให้ชัดก่อนตัดสินใจ พรรคไหนจะทำอะไร เมื่อไหร่ และเพื่อใคร
					</p>
				</div>
				<Image
					className="h-auto w-[250px] md:w-[400px]"
					src="/promisedeconstructed/images/deco1.svg"
					alt=""
					width={250}
					height={150}
					priority
				/>
				<div className="text-b6 text-purple-1 flex flex-col items-center gap-[5px] text-center">
					<p className="text-balance">
						<strong>คำชี้แจง:</strong> ข้อมูลอัปเดทล่าสุด xx ม.ค. 2569
						เก็บจากเว็บไซต์ทางการของ
						พรรคการเมือง และถูกจัดกลุ่มด้วยระบบปัญญาประดิษฐ์ (LLM)
						แม้มีการตรวจสอบโดยทีมงานในระดับหนึ่ง
						แต่อาจมีความคลาดเคลื่อนเกิดขึ้นได้
					</p>
					<Link className="underline" href="/about">
						อ่านที่มาและข้อจำกัดข้อมูล
					</Link>
				</div>
			</header>
			<ShareBlock />
		</main>
	);
}
