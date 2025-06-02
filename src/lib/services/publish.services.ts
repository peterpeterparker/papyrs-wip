import { getMetadata, updateMetadataDoc } from '$lib/services/idb.services';
import { i18n } from '$lib/stores/i18n.store';
import { toasts } from '$lib/stores/toasts.store';
import type { PostMetadata } from '$lib/types/juno';
import type { PublishData } from '$lib/types/publish';
import { sanitize } from '$lib/utils/html.utils';
import { assertNonNullish, nonNullish } from '@dfinity/utils';
import { setDoc, uploadBlob } from '@junobuild/core';
import { get } from 'svelte/store';

export const publish = async ({
	html,
	key,
	...rest
}: PublishData): Promise<{ result: 'success' } | { result: 'error'; err: unknown }> => {
	try {
		await Promise.all([updateMetadata(rest), uploadHtml({ html, key })]);

		return { result: 'success' };
	} catch (err: unknown) {
		toasts.error({
			msg: { text: get(i18n).publish_edit.errors.publish_failed },
			err
		});

		return { result: 'error', err };
	}
};

const updateMetadata = async (data: Omit<PublishData, 'html' | 'key'>) => {
	const value = await getMetadata();

	assertNonNullish(value);

	const [key, _, docMetadata] = value;

	// TODO: refactor code with worker.sync
	const metadataData: PostMetadata = {
		...(nonNullish(docMetadata) && docMetadata.data),
		...data,
		status: 'submitted'
	};

	const doc = await setDoc({
		collection: 'metadata',
		doc: {
			key,
			data: metadataData,
			...(nonNullish(docMetadata) && { version: docMetadata.version })
		}
	});

	await updateMetadataDoc({ docMetadata: doc });
};

const uploadHtml = async ({ html, key }: Pick<PublishData, 'html' | 'key'>) => {
	const cleanHtml = sanitize(`<html lang="en">${html}</html>`);

	const blob = new Blob([cleanHtml], {
		type: 'text/html'
	});

	const filename = `${key}.html`;

	const result = await uploadBlob({
		data: blob,
		collection: 'content',
		token: window.crypto.randomUUID(),
		fullPath: `/content/${filename}`,
		filename
	});
};
