import { syncStore } from '$lib/stores/sync.store';
import { derived, type Readable } from 'svelte/store';

export const syncBusy: Readable<boolean> = derived(
	syncStore,
	(syncStore) => syncStore.content === 'busy' || syncStore.metadata === 'busy'
);

export const syncError: Readable<boolean> = derived(
	syncStore,
	(syncStore) => syncStore.content === 'error' || syncStore.metadata === 'error'
);
