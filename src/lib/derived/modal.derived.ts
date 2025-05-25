import { modalStore } from '$lib/stores/modal.store';
import { derived, type Readable } from 'svelte/store';

export const modalPublish: Readable<boolean> = derived(
	modalStore,
	($modalStore) => $modalStore?.type === 'publish'
);
