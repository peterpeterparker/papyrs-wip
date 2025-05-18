import type { SyncState } from '$lib/types/sync';
import { type Readable, writable } from 'svelte/store';

export interface SyncStoreData {
	metadata: SyncState;
	content: SyncState;
}

export interface SyncStore extends Readable<SyncStoreData> {
	busy: (id: keyof SyncStoreData) => void;
	idle: (id: keyof SyncStoreData) => void;
	error: (id: keyof SyncStoreData) => void;
}

const initSyncStore = (): SyncStore => {
	const { subscribe, update } = writable<SyncStoreData>({
		metadata: 'idle',
		content: 'idle'
	});

	return {
		subscribe,

		busy: (id: keyof SyncStoreData) => {
			update((state) => ({ ...state, [id]: 'busy' }));
		},

		idle: (id: keyof SyncStoreData) => {
			update((state) => ({ ...state, [id]: 'idle' }));
		},

		error: (id: keyof SyncStoreData) => {
			update((state) => ({ ...state, [id]: 'error' }));
		}
	};
};

export const syncStore = initSyncStore();
