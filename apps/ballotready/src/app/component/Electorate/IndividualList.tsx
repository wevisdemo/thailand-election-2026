import { Candidate } from '@/src/type/candidate';
import IndividualCard from './IndividualCard';

interface IndividualListProps {
	candidates: Candidate[];
}

export default function IndividualList({ candidates }: IndividualListProps) {
	return candidates.length > 0 ? (
		<div className="w-full">
			{candidates.map((candidate, index) => (
				<IndividualCard key={index} candidate={candidate} />
			))}
		</div>
	) : (
		<div>
			<p className="text-gray-2 text-[14px]">ไม่พบผู้สมัครจากพรรคการเมืองนี้</p>
		</div>
	);
}
