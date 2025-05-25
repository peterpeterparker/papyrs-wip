import { writable, type Readable } from 'svelte/store';

export interface Modal<T> {
	type: 'publish';
	data?: T;
}

export type ModalData<T> = Modal<T> | undefined | null;

export interface ModalStore<T> extends Readable<ModalData<T>> {
	openPublish: () => void;
	close: () => void;
}

const initModalStore = <T>(): ModalStore<T> => {
	const { subscribe, set } = writable<ModalData<T>>(undefined);

	const setType = (type: Modal<T>['type']) => () => set({ type });

	return {
		openPublish: setType('publish'),
		close: () => set(null),
		subscribe
	};
};

export const modalStore = initModalStore();
