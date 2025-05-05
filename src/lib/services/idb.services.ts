import { browser } from '$app/environment';
import type { Markdown } from '$lib/types/core';
import { createStore, setMany, type UseStore } from 'idb-keyval';

const KEY_POST_CONTENT = 'proposal-content';

const KEY_LAST_CONTENT_CHANGE = 'last-content-change';

// SSG
const papyrsStore = browser ? createStore('papyrs-posts', 'posts') : ({} as unknown as UseStore);

export const setContent = (content: Markdown): Promise<void> =>
	setMany(
		[
			[KEY_LAST_CONTENT_CHANGE, Date.now()],
			[KEY_POST_CONTENT, content]
		],
		papyrsStore
	);
