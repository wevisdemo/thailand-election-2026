'use client';

import { ALL_PARTY_VALUE } from '@/constants/party';
import { NO_PARTY } from '@/constants/sheet';
import { usePartyStore } from '@/stores/partyStore';
import { Data } from '@/utils/data';
import Link from 'next/link';
import { Carousel } from '../Carousel';
import { PartySelect } from '../PartySelect';
import { TopicCard } from './TopicCard';

export interface TopicBodyProps {
	topic: string;
	data: Data;
}

export const TopicBody = ({ topic, data }: TopicBodyProps) => {
	const selectedParties = usePartyStore((state) => state.selectedParties);

	const properTopic = data.slugSubCategoriesLookup[topic];
	const topicData = data.dataBySubCategorySlug[properTopic].map(
		(index) => data.data[index],
	);
	const topicParties = topicData.map((item) => item.party || NO_PARTY);
	const partyChoices = data.parties.map((party) => ({
		value: party,
		disabled: !topicParties.includes(party),
	}));
	const filteredTopicData = selectedParties.includes(ALL_PARTY_VALUE)
		? topicData
		: topicData.filter((data) =>
				selectedParties.includes(data.party || NO_PARTY),
			);

	return (
		<>
			<header className="mx-auto flex w-[85svw] max-w-[600px] flex-col">
				<p className="text-h7 font-kondolar mt-5 text-center font-bold">
					ปัญหา
				</p>
				<h1 className="text-h3 font-kondolar text-center font-bold">
					{properTopic}
				</h1>
				<p className="text-b4 text-center font-bold">
					มี {topicData.length} คำสัญญา จาก
				</p>
				<PartySelect
					className="my-2.5 w-full"
					choices={partyChoices}
					allChoiceText={(count) => `${count} พรรคที่พูดถึงปัญหานี้`}
				/>
				<p className="text-b7 text-gray-1 mb-5 text-center">
					*ฐานข้อมูลมีจำนวนทั้งหมด {data.parties.length} พรรค
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
							หากจำเป็นต้องเพิ่มข้อความเพื่อให้ได้ใจความที่สมบูรณ์ จะถูกแสดงด้วย
							<span className="text-gray-1">ตัวอักษรสีเทา</span>
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
					slides={filteredTopicData.map((data) => (
						<TopicCard key={data.party} data={data} />
					))}
					noDots
				/>
			</div>
		</>
	);
};
