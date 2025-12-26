'use client';
import { CategoryGroup } from '@/components/CategoryGroup';
import {
	CATEGORY_FILTER_CATEGORY,
	FilterCategoryToggle,
} from '@/components/FilterCategoryToggle';
import { PartySelect } from '@/components/PartySelect';
import { ALL_PARTY_VALUE } from '@/constants/party';
import { usePartyStore } from '@/stores/partyStore';
import { Data, getUnique, slugifySubCategory } from '@/utils/data';
import Image from 'next/image';
import Link from 'next/link';
import { useMemo, useState } from 'react';

interface HomeBodyProps {
	data: Data;
}

export const HomeBody = ({ data }: HomeBodyProps) => {
	const selectedParties = usePartyStore((state) => state.selectedParties);
	const [displayCategory, setDisplayCategory] = useState([
		CATEGORY_FILTER_CATEGORY,
	]);

	const parties = data.parties.map((party) => ({ value: party }));
	const categories = useMemo(() => {
		const group = displayCategory.includes(CATEGORY_FILTER_CATEGORY)
			? data.dataByProblem
			: data.dataByTarget;
		return Object.entries(group)
			.map(([category, subcategories]) => ({
				name: category,
				subCategories: Object.entries(subcategories)
					.map(([subCategory, dataIndex]) => {
						const realizedData = dataIndex.map((index) => data.data[index]);
						const filteredData = selectedParties.includes(ALL_PARTY_VALUE)
							? realizedData
							: realizedData.filter((data) =>
									selectedParties.includes(data.party || ''),
								);
						return {
							href: `/${slugifySubCategory(subCategory)}`,
							category: subCategory,
							promiseCount: filteredData.length,
							parties: getUnique(filteredData.map((data) => data.party || '')),
						};
					})
					.filter((subCategory) => subCategory.promiseCount > 0),
			}))
			.filter((category) => category.subCategories.length > 0);
	}, [
		data.data,
		data.dataByProblem,
		data.dataByTarget,
		displayCategory,
		selectedParties,
	]);

	return (
		<>
			<header className="mx-auto flex w-[85svw] max-w-[600px] flex-col items-center gap-4 py-5 md:py-10">
				<div className="flex flex-col gap-2 text-center">
					<p className="text-purple-1 font-sriracha text-h7">
						Promise Deconstructed
					</p>
					<h1 className="text-h3 font-kondolar font-bold">
						ถอดโครงสร้างสัญญาพรรคการเมือง
					</h1>
					<PartySelect
						choices={parties}
						allChoiceText={(count) => `ทั้งหมด ${count} พรรค`}
					/>
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
				<div className="flex w-full flex-col items-center gap-2">
					<span className="text-b5 font-bold">แบ่งคำสัญญาตาม</span>
					<FilterCategoryToggle
						filter={displayCategory}
						setFilter={setDisplayCategory}
					/>
				</div>
				<div className="text-b6 text-purple-1 flex flex-col items-center gap-[5px] text-center">
					<p className="text-balance">
						<strong>คำชี้แจง:</strong> ข้อมูลอัปเดทล่าสุด xx ม.ค. 2569
						เก็บจากเว็บไซต์ทางการของพรรคการเมือง
						และถูกจัดกลุ่มด้วยระบบปัญญาประดิษฐ์ (LLM)
						แม้มีการตรวจสอบโดยทีมงานในระดับหนึ่ง
						แต่อาจมีความคลาดเคลื่อนเกิดขึ้นได้
					</p>
					<Link className="underline" href="/about#sources-and-limitations">
						อ่านที่มาและข้อจำกัดข้อมูล
					</Link>
				</div>
			</header>
			<div className="mx-auto flex flex-col gap-4 md:w-[85svw]">
				{categories.map((category, index) => (
					<CategoryGroup key={index} {...category} />
				))}
			</div>
		</>
	);
};
