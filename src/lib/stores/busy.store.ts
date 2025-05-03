import { type Readable, writable } from 'svelte/store';

export interface Busy {
	spinner: boolean;
	log: boolean;
	close: boolean;
}

export interface BusyStore extends Readable<Busy | undefined> {
	start: (log?: boolean) => void;
	show: () => void;
	stop: () => void;
}

const initBusyStore = (): BusyStore => {
	const { subscribe, set } = writable<Busy | undefined>(undefined);

	return {
		subscribe,

		start(log = false) {
			set({ log, spinner: true, close: false });
		},

		show() {
			set({ log: true, spinner: false, close: true });
		},

		stop() {
			set(undefined);
		}
	};
};

export const busy = initBusyStore();
