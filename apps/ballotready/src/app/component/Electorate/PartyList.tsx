import { Party } from '@/src/type/party';
import PartyCard from './PartyCard';
import { useContext } from 'react';
import { ElectorateStoreContext } from '../../store/ElectorateStore';

interface PartyListProps {
	parties: Party[];
}

export default function PartyList({ parties }: PartyListProps) {
	const { modalPartyList } = useContext(ElectorateStoreContext);
	return (
		<div className="w-full">
			{parties.map((party, index) => (
				<PartyCard
					key={index}
					party={party}
					onClickViewPartyList={() => {
						modalPartyList.dispatch({
							type: 'OPEN_MODAL',
							payload: { party: party },
						});
					}}
				/>
			))}
		</div>
	);
}
