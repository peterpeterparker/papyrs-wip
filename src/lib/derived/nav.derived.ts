import { page } from '$app/stores';
import { derived, type Readable } from 'svelte/store';

// TODO: migrate to Svelte v5
export const routeKey: Readable<string | undefined | null> = derived(
	[page],
	([
		{
			data: { key }
		}
	]) => key
);
