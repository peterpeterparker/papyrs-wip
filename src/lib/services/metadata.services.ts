import { updateMetadataDoc } from '$lib/services/idb.services';
import type { PostKey, PostMetadata } from '$lib/types/juno';
import { nonNullish } from '@dfinity/utils';
import { type Doc, type SatelliteOptions, setDoc } from '@junobuild/core';

export const setMetadata = async ({
	key,
	data,
	doc: currentDoc,
	satellite
}: {
	key: PostKey;
	data: Partial<PostMetadata>;
	doc: Doc<PostMetadata> | undefined;
	satellite?: SatelliteOptions;
}) => {
	const updateData: PostMetadata = {
		...(nonNullish(currentDoc) ? currentDoc.data : { status: 'draft' }),
		...data
	};

	const doc = await setDoc({
		collection: 'metadata',
		doc: {
			key,
			data: updateData,
			...(nonNullish(currentDoc) && { version: currentDoc.version })
		},
		satellite
	});

	await updateMetadataDoc({ docMetadata: doc });
};
