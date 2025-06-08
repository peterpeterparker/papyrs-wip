import { browser } from '$app/environment';
import type { LoadEvent } from '@sveltejs/kit';

export interface RouteKey { key: string | null | undefined }

export const loadRouteKey = ($event: LoadEvent): RouteKey => {
	if (!browser) {
		return {
			key: undefined
		};
	}

	const {
		url: { searchParams }
	} = $event;

	return {
		key: searchParams?.get('key')
	};
};
