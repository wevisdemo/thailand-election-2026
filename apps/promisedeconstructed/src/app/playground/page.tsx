import { Carousel } from '@/components/Carousel';
import { CategoryGroup } from '@/components/CategoryGroup';
import { SubCatgCard } from '@/components/SubCatgCard';
import { notFound } from 'next/navigation';

export default function Playground() {
	if (process.env.NODE_ENV !== 'development') notFound();

	return (
		<div className="mx-auto flex max-w-5xl flex-col gap-6 p-6">
			<h1 className="text-h3 font-kondolar font-bold">Playground</h1>

			<section className="flex flex-col gap-3">
				<h2 className="text-h6 font-kondolar font-bold">Sub Category Cards</h2>
				<SubCatgCard
					href="/playground"
					category="💡 ค่าไฟแพง"
					promiseCount={10}
					parties={[
						'ภูมิใจไทย',
						'ประชาชน',
						'เพื่อไทย',
						'พลังประชารัฐ',
						'ประชาธิปัตย์',
					]}
				/>
			</section>

			<section className="flex flex-col gap-3">
				<h2 className="text-h6 font-kondolar font-bold">Carousel</h2>
				<Carousel
					slides={Array(10)
						.fill(0)
						.map((_, index) => (
							<SubCatgCard
								key={index}
								href="/playground"
								category="💡 ค่าไฟแพง"
								promiseCount={10}
								parties={[
									'ภูมิใจไทย',
									'ประชาชน',
									'เพื่อไทย',
									'พลังประชารัฐ',
									'ประชาธิปัตย์',
								]}
							/>
						))}
				/>
			</section>

			<section className="flex flex-col gap-3">
				<h2 className="text-h6 font-kondolar font-bold">Category Group</h2>
				<CategoryGroup
					name="เศรษฐกิจ"
					subCategories={Array(10).fill({
						href: '/playground',
						category: '💡 ค่าไฟแพง',
						promiseCount: 10,
						parties: [
							'ภูมิใจไทย',
							'ประชาชน',
							'เพื่อไทย',
							'พลังประชารัฐ',
							'ประชาธิปัตย์',
						],
					})}
				/>
			</section>
		</div>
	);
}
