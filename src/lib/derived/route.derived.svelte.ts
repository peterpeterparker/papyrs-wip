import { page } from '$app/state';

class Route {
	key = $derived<string | undefined | null>(page?.data?.key);
}

export const route = new Route();
