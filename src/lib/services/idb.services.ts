import { browser } from '$app/environment';
import type { PostAsset, PostContent, PostKey, PostMetadata } from '$lib/types/post';
import type { Doc } from '@junobuild/core';
import {
	clear as clearIdb,
	createStore,
	get as getIdb,
	set,
	setMany,
	update,
	type UseStore
} from 'idb-keyval';

const KEY_POST_KEY = 'post-key';
const KEY_POST_METADATA = 'post-metadata';
const KEY_POST_CONTENT = 'post-content';
const KEY_POST_ASSETS = 'post-assets';

const KEY_POST_DOC_METADATA = 'post-doc-metadata';
const KEY_POST_DOC_CONTENT = 'post-doc-content';

const KEY_LAST_METADATA_CHANGE = 'last-metadata-change';
const KEY_LAST_CONTENT_CHANGE = 'last-content-change';
const KEY_LAST_ASSETS_CHANGE = 'last-assets-change';

const KEY_LAST_METADATA_JOB = 'last-metadata-job';
const KEY_LAST_CONTENT_JOB = 'last-content-job';
const KEY_LAST_ASSETS_JOB = 'last-assets-job';

// SSG
const papyrsStore = browser ? createStore('papyrs-posts', 'posts') : ({} as unknown as UseStore);

export const init = ({
	key,
	metadata,
	content,
	docMetadata,
	docContent,
	newPost,
	assets
}: {
	key: string;
	metadata: PostMetadata | undefined;
	content: PostContent;
	docMetadata: Doc<PostMetadata> | undefined;
	docContent: Omit<Doc<PostContent>, 'data'> | undefined;
	newPost: boolean;
	assets: PostAsset[] | undefined;
}): Promise<void> =>
	setMany(
		[
			[KEY_LAST_METADATA_CHANGE, newPost ? Date.now() : undefined],
			[KEY_LAST_CONTENT_CHANGE, newPost ? Date.now() : undefined],
			[KEY_LAST_ASSETS_CHANGE, newPost ? Date.now() : undefined],
			[KEY_LAST_METADATA_JOB, undefined],
			[KEY_LAST_CONTENT_JOB, undefined],
			[KEY_LAST_ASSETS_JOB, undefined],
			[KEY_POST_KEY, key],
			[KEY_POST_METADATA, metadata],
			[KEY_POST_CONTENT, content],
			[KEY_POST_ASSETS, assets],
			[KEY_POST_DOC_METADATA, docMetadata],
			[KEY_POST_DOC_CONTENT, docContent]
		],
		papyrsStore
	);

export const setContent = (content: PostContent): Promise<void> =>
	setMany(
		[
			[KEY_LAST_CONTENT_CHANGE, Date.now()],
			[KEY_POST_CONTENT, content]
		],
		papyrsStore
	);

export const setAsset = async (asset: PostAsset): Promise<void> => {
	await Promise.all([
		set(KEY_LAST_ASSETS_CHANGE, Date.now(), papyrsStore),
		update(
			KEY_POST_ASSETS,
			(assets: PostAsset[] | undefined) => [
				...(assets ?? []).filter(({ fullPath }) => fullPath !== asset.fullPath),
				asset
			],
			papyrsStore
		)
	]);
};

export const setMetadata = (metadata: PostMetadata): Promise<void> =>
	setMany(
		[
			[KEY_LAST_METADATA_CHANGE, Date.now()],
			[KEY_POST_METADATA, metadata]
		],
		papyrsStore
	);

export const getEditable = (): Promise<[PostMetadata, PostContent, PostKey]> =>
	Promise.all([
		getIdb(KEY_POST_METADATA, papyrsStore),
		getIdb(KEY_POST_CONTENT, papyrsStore),
		getIdb(KEY_POST_KEY, papyrsStore)
	]);

export const getEditableAssets = (): Promise<PostAsset[] | undefined> =>
	getIdb(KEY_POST_ASSETS, papyrsStore);

export const updateMetadataDoc = ({
	docMetadata
}: {
	docMetadata: Doc<PostMetadata>;
}): Promise<void> =>
	setMany(
		[
			[KEY_LAST_METADATA_JOB, Date.now()],
			[KEY_POST_DOC_METADATA, docMetadata]
		],
		papyrsStore
	);

export const updateContentDoc = ({
	docContent
}: {
	docContent: Omit<Doc<PostContent>, 'data'>;
}): Promise<void> =>
	setMany(
		[
			[KEY_LAST_METADATA_JOB, Date.now()],
			[KEY_POST_DOC_CONTENT, docContent]
		],
		papyrsStore
	);

export const getMetadata = (): Promise<
	[string, PostMetadata | undefined, Doc<PostMetadata> | undefined]
> =>
	Promise.all([
		getIdb(KEY_POST_KEY, papyrsStore),
		getIdb(KEY_POST_METADATA, papyrsStore),
		getIdb(KEY_POST_DOC_METADATA, papyrsStore)
	]);

export const getContent = (): Promise<
	[string, PostContent | undefined, Omit<Doc<PostContent>, 'data'> | undefined]
> =>
	Promise.all([
		getIdb(KEY_POST_KEY, papyrsStore),
		getIdb(KEY_POST_CONTENT, papyrsStore),
		getIdb(KEY_POST_DOC_CONTENT, papyrsStore)
	]);

export const getDocs = (): Promise<
	[PostKey, Doc<PostMetadata> | undefined, Omit<Doc<PostContent>, 'data'> | undefined]
> =>
	Promise.all([
		getIdb(KEY_POST_KEY, papyrsStore),
		getIdb(KEY_POST_DOC_METADATA, papyrsStore),
		getIdb(KEY_POST_DOC_CONTENT, papyrsStore)
	]);

export const getDocMetadata = (): Promise<Doc<PostMetadata> | undefined> =>
	getIdb(KEY_POST_DOC_METADATA, papyrsStore);

export const getLastChangeMetadata = (): Promise<number | undefined> =>
	getIdb(KEY_LAST_METADATA_CHANGE, papyrsStore);

export const getLastChangeContent = (): Promise<number | undefined> =>
	getIdb(KEY_LAST_CONTENT_CHANGE, papyrsStore);

export const getLastJobMetadata = (): Promise<number | undefined> =>
	getIdb(KEY_LAST_METADATA_JOB, papyrsStore);

export const getLastJobContent = (): Promise<number | undefined> =>
	getIdb(KEY_LAST_CONTENT_JOB, papyrsStore);

export const clear = (): Promise<void> => clearIdb(papyrsStore);
