import { Party } from '@/src/type/party';
import PartyCard from './PartyCard';

interface PartyListProps {
	parties: Party[];
}

export default function PartyList({ parties }: PartyListProps) {
	return (
		<div className="w-full">
			{parties.map((party, index) => (
				<PartyCard key={index} party={party} />
			))}
		</div>
	);
}
