import { type Readable, writable } from 'svelte/store';

export interface Busy {
	spinner: boolean;
	log: boolean;
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

		start(log = false) {
			set({ log, spinner: true });
		},

		stop() {
			set(null);
		}
	};
};

export const busy = initBusyStore();
