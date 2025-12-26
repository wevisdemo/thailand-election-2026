'use client';

import Link from 'next/link';
import { Carousel } from '../Carousel';
import { PartySelect, PartySelectChoice } from '../PartySelect';

export const EXAMPLE_PARTIES: PartySelectChoice[] = [
	{ value: 'ภูมิใจไทย' },
	{ value: 'ประชาชน' },
	{ value: 'เพื่อไทย' },
	{ value: 'พลังประชารัฐ', disabled: true },
	{ value: 'ประชาธิปัตย์', disabled: true },
];

export interface TopicBodyProps {
	topic: string;
}

export const TopicBody = ({ topic }: TopicBodyProps) => {
	return (
		<>
			<header className="mx-auto flex w-[85svw] max-w-[600px] flex-col">
				<p className="text-h7 font-kondolar mt-5 text-center font-bold">
					ปัญหา
				</p>
				<h1 className="text-h3 font-kondolar text-center font-bold">{topic}</h1>
				<p className="text-b4 text-center font-bold">มี 4 คำสัญญา จาก</p>
				<PartySelect
					className="my-2.5 w-full"
					choices={EXAMPLE_PARTIES}
					allChoiceText={(count) => `${count} พรรคที่พูดถึงปัญหานี้`}
				/>
				<p className="text-b7 text-gray-1 mb-5 text-center">
					*ฐานข้อมูลมีจำนวนทั้งหมด 5 พรรค
					โดยเลือกเฉพาะพรรคที่มีข้อมูลนโยบายในเว็บไซต์ทางการ
				</p>
				<article className="text-purple-1 my-2.5 flex flex-col gap-[5px] rounded-[10px] bg-white/40 p-[15px]">
					<h2 className="font-bold">คำชี้แจง</h2>
					<ul className="ml-[2ch] list-outside list-disc">
						<li>
							ข้อมูลในหน้านี้มาจากข้อความบนเว็บไซต์ทางการของพรรคการเมือง
							ซึ่งถูกจัดลงตารางตามหัวข้อต่างๆ ด้วยระบบปัญญาประดิษฐ์ (LLM)
							โดยพยายามคงข้อความตามต้นฉบับให้มากที่สุด
						</li>
						<li>
							หากจำเป็นต้องเพิ่มข้อความเพื่อให้ได้ใจความที่สมบูรณ์
							จะถูกแสดงด้วยตัวอักษรสีเทา
						</li>
						<li>
							แม้มีการตรวจสอบโดยทีมงานในระดับหนึ่ง
							แต่อาจมีความคลาดเคลื่อนเกิดขึ้นได้
						</li>
						<li>
							ผู้ใช้สามารถตรวจสอบเพิ่มเติมกับข้อความต้นฉบับตามลิงก์ด้านล่าง
						</li>
					</ul>
					<Link
						className="self-end underline"
						href="/about#sources-and-limitations"
					>
						อ่านที่มาและข้อจำกัดข้อมูล
					</Link>
				</article>
			</header>
			<div className="mx-auto py-5 md:w-[85svw]">
				<Carousel
					slides={Array(3).fill(
						<div className="h-[90svh] w-[280px] rounded-[10px] bg-white md:w-[320px]">
							Card
						</div>,
					)}
					noDots
				/>
			</div>
		</>
	);
};
