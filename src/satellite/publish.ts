import {
	arrayOfNumberToUint8Array,
	assertNonNullish,
	uint8ArrayToArrayOfNumber
} from '@dfinity/utils';
import type { Asset, Blob, OnSetDocContext, OptionAsset } from '@junobuild/functions';
import { id } from '@junobuild/functions/ic-cdk';
import { decodeDocData, getAssetStore, getContentChunksStore } from '@junobuild/functions/sdk';
import { STORAGE_COLLECTION_CONTENT } from '../lib/constants/publish.constants';
import type { PostMetadata } from '../lib/types/post';
import { keyToFullPath } from '../lib/utils/publish.utils';

export const createOrUpdatePost = async (context: OnSetDocContext) => {
	const { status } = decodeDocData<PostMetadata>(context.data.data.after.data);

	if (status !== 'submitted') {
		return;
	}

	// TODO:
	// 1. find the asset
	// 2. get its HTML content
	// 3. build the blog post page
	// 4. publish the blog post page

	const asset = getAsset(context);
	assertNonNullish(asset);

	const blogContentRaw = getContent(asset);
	const blogContentText = mapContent(blogContentRaw);

	// eslint-disable-next-line no-console
	console.log('Content:', blogContentText);
};

const getAsset = ({ data: { key } }: OnSetDocContext): OptionAsset =>
	getAssetStore({
		caller: id(),
		collection: STORAGE_COLLECTION_CONTENT,
		full_path: keyToFullPath({ key })
	});

const getContent = ({ encodings }: Asset): Blob => {
	const chunks: Blob[] = [];
	encodings.forEach((encoding, i) => {
		const chunk = getContentChunksStore({
			encoding: encoding[1],
			chunk_index: BigInt(i),
			memory: 'stable'
		});

		assertNonNullish(chunk);

		chunks.push(chunk);
	});

	const concatenateChunks = chunks.reduce<number[]>((acc, chunk) => {
		const nb = uint8ArrayToArrayOfNumber(chunk);
		return [...acc, ...nb];
	}, []);

	return arrayOfNumberToUint8Array(concatenateChunks);
};

const mapContent = (raw: Blob): string => {
	const decoder = new TextDecoder();
	return decoder.decode(raw);
};
