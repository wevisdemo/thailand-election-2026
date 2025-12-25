import { SubCatgCard } from '@/components/SubCatgCard';
import { notFound } from 'next/navigation';

export default function Playground() {
	if (process.env.NODE_ENV !== 'development') notFound();

	return (
		<div className="mx-auto flex max-w-5xl flex-col gap-6 p-6">
			<h1 className="text-h3 font-kondolar font-bold">Playground</h1>

			<section>
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
		</div>
	);
}
