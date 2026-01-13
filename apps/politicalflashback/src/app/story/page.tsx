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
		<Suspense
			fallback={
				<div className="text-h7 font-kondolar flex h-screen items-center justify-center pt-20 text-center text-black">
					Loading...
				</div>
			}
		>
			<StoryContent />
		</Suspense>
	);
}
