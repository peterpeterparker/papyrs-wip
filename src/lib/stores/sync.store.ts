import { writable } from 'svelte/store';

export type SyncState = 'init' | 'pending' | 'in_progress' | 'error' | 'idle';

interface SyncStore {
	sync: SyncState;
	dirty: boolean;
}

export const sync = writable<SyncStore>({
	sync: 'idle',
	dirty: false
});
