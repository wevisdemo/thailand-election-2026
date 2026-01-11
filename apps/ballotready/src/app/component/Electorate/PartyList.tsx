import { Party } from '@/src/type/party';
import PartyCard from './PartyCard';
import { useContext } from 'react';
import { ElectorateStoreContext } from '../../store/ElectorateStore';

interface PartyListProps {
	parties: Party[];
}

export default function PartyList({ parties }: PartyListProps) {
	const { modalPartyList } = useContext(ElectorateStoreContext);
	return parties.length > 0 ? (
		<div className="w-full">
			{parties
				.sort((a, b) => a.number - b.number)
				.map((party, index) => (
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
	) : (
		<div>
			<p className="text-gray-2 text-[14px]">ไม่พบพรรคการเมืองนี้ลงสมัคร</p>
		</div>
	);
}
