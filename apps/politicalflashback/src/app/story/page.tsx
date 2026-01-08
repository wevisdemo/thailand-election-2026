'use client';

import TagbyId from '@/src/constants/TagbyId';
import { useSearchParams } from 'next/navigation';

export default function StoryPage() {
	const searchParams = useSearchParams();
	const name = searchParams.get('name');
	// console.log(name);
	return <TagbyId name={name} />;
}
