import { type PartySelectChoice } from '@/components/PartySelect';
import { ALL_PARTY_VALUE } from '@/constants/party';
import { create } from 'zustand';

interface usePartyStoreType {
	selectedParties: PartySelectChoice['value'][];
	setSelectedParties: (parties: PartySelectChoice['value'][]) => void;
}

export const usePartyStore = create<usePartyStoreType>((set) => ({
	selectedParties: [ALL_PARTY_VALUE],
	setSelectedParties: (parties) => set({ selectedParties: parties }),
}));
