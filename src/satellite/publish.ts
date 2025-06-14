import {
	arrayOfNumberToUint8Array,
	assertNonNullish,
	nonNullish,
	uint8ArrayToArrayOfNumber
} from '@dfinity/utils';
import type { Blob, OnSetDocContext } from '@junobuild/functions';
import { id } from '@junobuild/functions/ic-cdk';
import { decodeDocData, getAssetStore, getContentChunksStore } from '@junobuild/functions/sdk';
import type { PostMetadata } from '../lib/types/post';

export const createOrUpdatePost = async (context: OnSetDocContext) => {
	const { status } = decodeDocData<PostMetadata>(context.data.data.after.data);

	if (status !== 'submitted') {
		return;
	}

	console.log('HEHEHEHEHEHREEEE TODO');
	// TODO:
	// 1. find the asset
	// 2. get its HTML content
	// 3. build the blog post page
	// 4. publish the blog post page

	await getAsset(context);
};

const getAsset = async ({ data: { key } }: OnSetDocContext) => {
	// TODO: create utils for building full path
	const asset = getAssetStore({
		caller: id(),
		collection: 'content',
		full_path: `/content/${key}.html`
	});

	assertNonNullish(asset);

	const chunks: Blob[] = [];
	asset.encodings.forEach((encoding, i) => {
		const chunk = getContentChunksStore({
			encoding: encoding[1],
			chunk_index: BigInt(i),
			memory: 'stable'
		});

		if (nonNullish(chunk)) {
			chunks.push(chunk);
		}
	});

	const concatenateChunks = chunks.reduce<number[]>((acc, chunk) => {
		const nb = uint8ArrayToArrayOfNumber(chunk);
		return [...acc, ...nb];
	}, []);

	const decoder = new TextDecoder();
	const responseBody = decoder.decode(arrayOfNumberToUint8Array(concatenateChunks));

	// eslint-disable-next-line no-console
	console.log('Chunk:', responseBody);
};
