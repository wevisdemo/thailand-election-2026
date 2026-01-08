'use client';

import TagbyId from '@/src/constants/TagbyId';
import { useSearchParams } from 'next/navigation';
import { Suspense } from 'react';

function StoryContent() {
	const searchParams = useSearchParams();
	const name = searchParams.get('name');
	// console.log(name);
	return <TagbyId name={name} />;
}

export default function StoryPage() {
	return (
		<Suspense fallback={<div>Loading...</div>}>
			<StoryContent />
		</Suspense>
	);
}
