import { init } from '$lib/services/idb.services';
import type { PostContent } from '$lib/types/juno';
import type { UserOption } from '$lib/types/user';
import { replaceHistory } from '$lib/utils/route.utils';
import { isNullish } from '@dfinity/utils';

export const initUserPost = async ({
	user,
	routeKey
}: {
	user: UserOption;
	routeKey: string | undefined | null;
}): Promise<{
	result: 'ok' | 'not_allowed' | 'error' | 'readonly';
	content: PostContent | undefined;
	// TODO: metadata?
}> => {
	if (isNullish(user)) {
		return { result: 'not_allowed', content: undefined };
	}

	try {
		if (isNullish(routeKey)) {
			const key = window.crypto.randomUUID();

			// TODO: template
			const content = 'Hello World';

			await Promise.all([
				init({
					key,
					content,
					newPost: true
				}),
				updateUrl(key)
			]);

			return {
				result: 'ok',
				content
			};
		}
	} catch (err: unknown) {
		// TODO: toast error

		return { result: 'error', content: undefined };
	}

	try {
		// TODO: retrieve data from Satellite and load

		return {
			result: 'ok',
			content: 'From Satellite'
		};
	} catch (err: unknown) {
		// TODO: toast

		return { result: 'error', content: undefined };
	}
};

const updateUrl = async (proposalKey: string) => {
	const url: URL = new URL(window.location.href);

	url.searchParams.delete('key');
	url.searchParams.append('key', encodeURI(proposalKey));

	replaceHistory(url);
};
