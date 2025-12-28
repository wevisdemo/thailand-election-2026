import { Party } from '@/src/type/party';

export interface ModalPartyListState {
	isModalOpen: boolean;
	party?: Party;
}

export interface ActionOpenModalPayload {
	party: Party;
}

export type ModalAction =
	| {
			type: 'OPEN_MODAL';
			payload: ActionOpenModalPayload;
	  }
	| { type: 'CLOSE_MODAL' };

export const initialModalPartyListState: ModalPartyListState = {
	isModalOpen: false,
};

export const modalPartyListReducer = (
	state: ModalPartyListState,
	action: ModalAction,
): ModalPartyListState => {
	switch (action.type) {
		case 'OPEN_MODAL': {
			return {
				isModalOpen: true,
				...action.payload,
			};
		}
		case 'CLOSE_MODAL':
			return { isModalOpen: false };
		default:
			return state;
	}
};

export const initialPartyListModalStore = {
	state: initialModalPartyListState,
	dispatch: () => null,
};

export interface PartyListModalStore {
	state: ModalPartyListState;
	dispatch: React.Dispatch<ModalAction>;
}
