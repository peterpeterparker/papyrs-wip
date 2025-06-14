import { getMetadata } from '$lib/services/idb.services';
import { setMetadata } from '$lib/services/metadata.services';
import { i18n } from '$lib/stores/i18n.store';
import { toasts } from '$lib/stores/toasts.store';
import type { PublishData } from '$lib/types/publish';
import { sanitize } from '$lib/utils/html.utils';
import { assertNonNullish } from '@dfinity/utils';
import { uploadBlob } from '@junobuild/core';
import { get } from 'svelte/store';
import { STORAGE_COLLECTION_CONTENT } from '$lib/constants/publish.constants';
import { keyToFullPath } from '$lib/utils/publish.utils';

export const publish = async ({
	html,
	key,
	...rest
}: Omit<PublishData, 'status'>): Promise<
	{ result: 'success' } | { result: 'error'; err: unknown }
> => {
	try {
		await uploadHtml({ html, key });
		await updateMetadata(rest);

		return { result: 'success' };
	} catch (err: unknown) {
		toasts.error({
			msg: { text: get(i18n).publish_edit.errors.publish_failed },
			err
		});

		return { result: 'error', err };
	}
};

const updateMetadata = async (data: Omit<PublishData, 'html' | 'key' | 'status'>) => {
	const value = await getMetadata();

	assertNonNullish(value);

	const [key, __, docMetadata] = value;

	await setMetadata({
		key,
		doc: docMetadata,
		data: { ...data, status: 'submitted' }
	});
};

const uploadHtml = async ({ html, key }: Pick<PublishData, 'html' | 'key'>) => {
	const cleanHtml = sanitize(`<html lang="en">${html}</html>`);

	const blob = new Blob([cleanHtml], {
		type: 'text/html'
	});

	await uploadBlob({
		data: blob,
		collection: STORAGE_COLLECTION_CONTENT,
		token: window.crypto.randomUUID(),
		fullPath: keyToFullPath({key}),
		filename: `${key}.html`
	});
};
