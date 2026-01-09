import { db } from '@/src/lib/firebase';
import { doc, runTransaction, increment } from 'firebase/firestore';

export async function addExportCount(tagNames: string[]) {
	const sumPeopleRef = doc(db, 'people', 'sumpeople');

	// สร้าง ref ของทุก tag
	const tagRefs = tagNames.map((tag) => doc(db, 'sum-tag', tag));

	await runTransaction(db, async (tx) => {
		/* ========= READ PHASE ========= */
		const sumSnap = await tx.get(sumPeopleRef);
		const tagSnaps = await Promise.all(tagRefs.map((ref) => tx.get(ref)));

		/* ========= WRITE PHASE ========= */

		// 1) sumpeople
		if (!sumSnap.exists()) {
			tx.set(sumPeopleRef, { sum: 1 });
		} else {
			tx.update(sumPeopleRef, { sum: increment(1) });
		}

		// 2) sum-tag
		tagSnaps.forEach((snap, i) => {
			const ref = tagRefs[i];
			const tagName = tagNames[i];

			if (!snap.exists()) {
				tx.set(ref, {
					name: tagName,
					sum: 1,
				});
			} else {
				tx.update(ref, {
					sum: increment(1),
				});
			}
		});
	});
}
