'use client';

import { useEffect, useState } from 'react';
import {
	collection,
	doc,
	onSnapshot,
	orderBy,
	query,
} from 'firebase/firestore';
import { db } from '@/src/lib/firebase';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

interface Ranking {
	name: string;
	sum: number;
}
const Ranking = () => {
	const [sum, setSum] = useState<number | null>(null);
	const [ranking, setRanking] = useState<Ranking[]>([]);
	const [loading, setLoading] = useState(true);
	const router = useRouter();
	useEffect(() => {
		/* =========================
           1) sumpeople (document)
        ========================== */
		const sumRef = doc(db, 'people', 'sumpeople');

		const unsubSum = onSnapshot(sumRef, (snap) => {
			if (snap.exists()) {
				setSum(snap.data().sum ?? 0);
			} else {
				setSum(0);
			}
		});

		/* =========================
           2) sum-tag ranking
        ========================== */
		const tagQuery = query(collection(db, 'sum-tag'), orderBy('sum', 'desc'));

		const unsubRanking = onSnapshot(tagQuery, (snap) => {
			const data: Ranking[] = snap.docs.map((d) => ({
				id: d.id,
				name: d.data().name,
				sum: d.data().sum,
			}));

			setRanking(data);
			setLoading(false);
		});

		return () => {
			unsubSum();
			unsubRanking();
		};
	}, []);

	if (loading) {
		return <p>กำลังโหลด...</p>;
	}

	return (
		<div className="flex w-full flex-col items-center justify-center gap-6">
			<div>
				<p className="text-h4 font-kondolar text-center font-black text-black">
					ประเด็นไฟลุก
					<br />
					ที่ถูกเลือกเป็น Top 5<br /> มากที่สุด
				</p>
				<p className="text-h8 font-sriracha text-purple-1 mb-10 text-center">
					จากผู้ร่วมระลึกชาติ {sum?.toLocaleString() ?? 0} คน
				</p>
			</div>

			<div className="flex w-full flex-col items-center justify-center gap-6">
				{ranking.slice(0, 10).map((item, index) => (
					<div
						key={item.name}
						className="w-full cursor-pointer rounded-2xl border-2 border-black bg-white px-4 py-6"
						onClick={() =>
							router.push(`/story?name=${encodeURIComponent(item.name)}`)
						}
					>
						<div className="flex items-center justify-between gap-4">
							<div className="flex items-center gap-4">
								<div
									className={`flex h-12 w-12 items-end justify-center rounded-full ${index === 0 ? 'bg-[#F5E399]!' : ''} ${index === 1 ? 'bg-[#D8DDE0]!' : ''} ${index === 2 ? 'bg-[#E1BBB1]!' : ''} bg-purple-3`}
								>
									<p className={`text-h6 font-kondolar font-bold text-black`}>
										{index + 1}
									</p>
								</div>
								<div>
									<p className="text-h6 font-kondolar font-bold text-black">
										{item.name}
									</p>
									<p className="text-h9 font-sriracha text-purple-1">
										{item.sum} คน เลือกเป็น Top 5
									</p>
								</div>
							</div>
							<div>
								<Image
									src="/politicalflashback/icon/chevron-left.svg"
									alt="go"
									width={32}
									height={32}
									className="rotate-180"
								/>
							</div>
						</div>
					</div>
				))}
			</div>
		</div>
	);
};

export default Ranking;
