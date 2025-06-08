import { type Readable, writable } from 'svelte/store';

export interface Busy {
	spinner: boolean;
	// TODO: Not used. Should we keep it?
	log?: boolean;
	// TODO: Not used. Should we keep it?
	close?: boolean;
}

export type BusyStoreData = Busy | undefined | null;

export interface BusyStore extends Readable<BusyStoreData> {
	start: (log?: boolean) => void;
	stop: () => void;
}

const initBusyStore = (): BusyStore => {
	const { subscribe, set } = writable<BusyStoreData>(undefined);

	return {
		subscribe,

		start: () => {
			set({ spinner: true });
		},

		stop: () => {
			set(null);
		}
	};
};

export const busy = initBusyStore();
