import { Candidate } from '@/src/type/candidate';
import IndividualCard from './IndividualCard';

interface IndividualListProps {
	candidates: Candidate[];
}

export default function IndividualList({ candidates }: IndividualListProps) {
	return (
		<div className="w-full">
			{candidates.map((candidate, index) => (
				<IndividualCard key={index} candidate={candidate} />
			))}
		</div>
	);
}
