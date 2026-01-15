import { Suspense } from 'react';
import ListviewPage from '@/src/constants/Listview';

export default function Listview() {
	return (
		<Suspense fallback={<div>Loading...</div>}>
			<ListviewPage />
		</Suspense>
	);
}
