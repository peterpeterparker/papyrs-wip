import { getMetadata } from '$lib/services/idb.services';
import { setMetadata } from '$lib/services/metadata.services';
import type { WorkerSyncParams } from '$lib/workers/worker.sync';
import { isNullish, nonNullish } from '@dfinity/utils';

export const syncMetadata = async ({ satellite }: WorkerSyncParams) => {
	const value = await getMetadata();

	if (isNullish(value)) {
		console.error('Empty metadata state');
		return;
	}

	const [key, editableMetadata, docMetadata] = value;

	if (
		nonNullish(docMetadata) &&
		docMetadata.data.title === editableMetadata?.title &&
		docMetadata.data.description === editableMetadata?.description
	) {
		// No changes need to be persisted in the backend.
		return;
	}

	await setMetadata({
		key,
		doc: docMetadata,
		data: { ...(nonNullish(editableMetadata) && editableMetadata), status: 'draft' },
		satellite
	});
};
