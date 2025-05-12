import { getMetadata, updateMetadataDoc } from '$lib/services/idb.services';
import type { PostMetadata } from '$lib/types/juno';
import type { WorkerSyncParams } from '$lib/workers/worker.sync';
import { isNullish, nonNullish } from '@dfinity/utils';
import { setDoc } from '@junobuild/core';

export const syncMetadata = async ({ satellite }: WorkerSyncParams) => {
	const value = await getMetadata();

	if (isNullish(value)) {
		console.error('Empty metadata state');
		return;
	}

	const [key, editableMetadata, docMetadata] = value;

	const metadataData: PostMetadata = {
		...(nonNullish(docMetadata) && docMetadata.data),
		...(nonNullish(editableMetadata) && editableMetadata)
	};

	const doc = await setDoc({
		satellite,
		collection: 'metadata',
		doc: {
			key,
			data: metadataData,
			...(nonNullish(docMetadata) && { version: docMetadata.version })
		}
	});

	await updateMetadataDoc({ docMetadata: doc });
};
