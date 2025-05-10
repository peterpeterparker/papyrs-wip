import { browser } from '$app/environment';
import type { Markdown } from '$lib/types/core';
import type { PostContent } from '$lib/types/juno';
import { createStore, setMany, type UseStore } from 'idb-keyval';

const KEY_POST_KEY = 'post-key';
const KEY_POST_CONTENT = 'post-content';

const KEY_LAST_CONTENT_CHANGE = 'last-content-change';

// SSG
const papyrsStore = browser ? createStore('papyrs-posts', 'posts') : ({} as unknown as UseStore);

export const init = ({
	key,
	content,
	newPost
}: {
	key: string;
	content: PostContent;
	newPost: boolean;
}): Promise<void> =>
	setMany(
		[
			[KEY_LAST_CONTENT_CHANGE, newPost ? Date.now() : undefined],
			[KEY_POST_KEY, key],
			[KEY_POST_CONTENT, content]
		],
		papyrsStore
	);

export const setContent = (content: Markdown): Promise<void> =>
	setMany(
		[
			[KEY_LAST_CONTENT_CHANGE, Date.now()],
			[KEY_POST_CONTENT, content]
		],
		papyrsStore
	);
