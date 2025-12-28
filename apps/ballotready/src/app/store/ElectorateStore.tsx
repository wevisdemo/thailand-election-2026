'use client';
import { createContext, ReactNode, useReducer } from 'react';
import {
	initialModalPartyListState,
	initialPartyListModalStore,
	modalPartyListReducer,
	PartyListModalStore,
} from './electorate/ModalPartyListStore';

export interface ElectorateStore {
	modalPartyList: PartyListModalStore;
}

export const ElectorateStoreContext = createContext<ElectorateStore>({
	modalPartyList: initialPartyListModalStore,
});

export const ElectorateStoreProvider = ({
	children,
}: {
	children: ReactNode;
}) => {
	const [modalPartyList, dispatchModalPartyList] = useReducer(
		modalPartyListReducer,
		initialModalPartyListState,
	);

	return (
		<ElectorateStoreContext.Provider
			value={{
				modalPartyList: {
					state: modalPartyList,
					dispatch: dispatchModalPartyList,
				},
			}}
		>
			{children}
		</ElectorateStoreContext.Provider>
	);
};
