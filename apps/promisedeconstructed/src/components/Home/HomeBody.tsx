'use client';
import { CategoryGroup, CategoryGroupProps } from '@/components/CategoryGroup';
import { PartySelect } from '@/components/PartySelect';
import { ALL_PARTY_VALUE } from '@/constants/party';
import { usePartyStore } from '@/stores/partyStore';
import { HomeData, slugifySubCategory } from '@/utils/data';
import Image from 'next/image';
import Link from 'next/link';
import { useMemo } from 'react';
import { SparklesText } from '../SparklesText';

interface HomeBodyProps {
	homeData: HomeData;
	buildTime: string;
}

export const HomeBody = ({ homeData, buildTime }: HomeBodyProps) => {
	const selectedParties = usePartyStore((state) => state.selectedParties);

	const partyChoices = homeData.allParties.map((party) => ({ value: party }));
	const categories = useMemo((): CategoryGroupProps[] => {
		return homeData.categoryData
			.map((category) => {
				return {
					...category,
					subCategories: category.subCategories
						.map((subCategory) => {
							const promiseCountPartyEntries = Object.entries(
								subCategory.promiseCountByParty,
							);
							const filteredParty = selectedParties.includes(ALL_PARTY_VALUE)
								? promiseCountPartyEntries
								: promiseCountPartyEntries.filter(([party]) =>
										selectedParties.includes(party),
									);
							return {
								href: `/${slugifySubCategory(subCategory.category)}`,
								category: subCategory.category,
								promiseCount: filteredParty
									.map(([, count]) => count)
									.reduce((a, b) => a + b, 0),
								parties: filteredParty
									.map(([party]) => party)
									.sort((a, z) => a.localeCompare(z)),
							};
						})
						.filter((subCategory) => subCategory.promiseCount > 0)
						.sort((a, z) => z.promiseCount - a.promiseCount),
				};
			})
			.filter((category) => category.subCategories.length > 0)
			.sort(
				(a, z) =>
					z.subCategories.length - a.subCategories.length ||
					a.name.localeCompare(z.name),
			);
	}, [homeData.categoryData, selectedParties]);

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
						choices={partyChoices}
						allChoiceText={(count) => `ทั้งหมด ${count} พรรค`}
					/>
					<p className="text-b7 text-gray-1">
						*ฐานข้อมูลมีทั้งหมด {homeData.allParties.length} พรรค
						โดยเลือกเฉพาะพรรคที่มีข้อมูลนโยบายในเว็บไซต์ทางการ{' '}
						<Link className="block underline" href="/about#selection-process">
							อ่านเกณฑ์การคัดเลือกพรรคการเมือง
						</Link>
					</p>
					<p className="text-b4">
						ดูให้ชัดก่อนตัดสินใจ พรรคไหนจะทำอะไร เมื่อไหร่ และเพื่อใคร
					</p>
				</div>
				<SparklesText
					colors={['#FF91E5', '#05D6BA', '#ADF3EB', '#FFFDA0', '#FF8C4A']}
					sparklesCount={5}
				>
					<Image
						className="h-auto w-[250px] md:w-[400px]"
						src="/promisedeconstructed/images/deco1.svg"
						alt=""
						width={250}
						height={150}
						priority
						decoding="sync"
						loading="eager"
						fetchPriority="high"
					/>
				</SparklesText>
				<div className="text-b6 text-purple-1 flex flex-col items-center gap-[5px] text-center">
					<p>
						<strong>คำชี้แจง:</strong> ข้อมูลอัปเดทล่าสุด {buildTime}{' '}
						เก็บจากเว็บไซต์ทางการของพรรคการเมือง
						และถูกจัดกลุ่มประเด็นด้วยระบบปัญญาประดิษฐ์ (LLM) โดย 1
						คำสัญญาสามารถเกี่ยวข้องได้มากกว่า 1 ประเด็น
						แม้มีการตรวจสอบโดยทีมงานในระดับหนึ่ง
						แต่อาจมีความคลาดเคลื่อนเกิดขึ้นได้
					</p>
					<Link className="underline" href="/about#sources-and-limitations">
						อ่านที่มาและข้อจำกัดข้อมูล
					</Link>
				</div>
				<span className="text-h5 font-kondolar font-bold">
					สำรวจคำสัญญาตามประเด็น
				</span>
			</header>
			<div className="mx-auto flex flex-col gap-4 md:w-[85svw]">
				{categories.map((category, index) => (
					<CategoryGroup key={index} {...category} />
				))}
			</div>
		</>
	);
};
