import { DESCRIPTION_MAX_LENGTH } from '$lib/constants/publish.constants';
import { getMetadata, init, setMetadata } from '$lib/services/idb.services';
import { i18n } from '$lib/stores/i18n.store';
import { toasts } from '$lib/stores/toasts.store';
import template from '$lib/templates/new-post.md?raw';
import type { PostContent, PostKey, PostMetadata } from '$lib/types/post';
import type { UserOption } from '$lib/types/user';
import { replaceHistory } from '$lib/utils/route.utils';
import { isEmptyString, isNullish, nonNullish, notEmptyString } from '@dfinity/utils';
import { type Doc, getManyDocs } from '@junobuild/core';
import { get } from 'svelte/store';

interface InitPostResult {
	result: 'ok' | 'not_allowed' | 'error';
	content: PostContent | undefined;
	metadata: PostMetadata | undefined;
}

export const initUserPost = async ({
	user,
	routeKey
}: {
	user: UserOption;
	routeKey: string | undefined | null;
}): Promise<InitPostResult> => {
	if (isNullish(user)) {
		return { result: 'not_allowed', content: undefined, metadata: undefined };
	}

	if (isNullish(routeKey) || isEmptyString(routeKey)) {
		return await initNewPost();
	}

	return await initExistingPost({ routeKey });
};

const initExistingPost = async ({ routeKey }: { routeKey: string }): Promise<InitPostResult> => {
	try {
		const [docMetadata, docContent] = await getDocs(routeKey);

		if (isNullish(docMetadata)) {
			toasts.error({
				msg: { text: get(i18n).editor.errors.metadata_not_found }
			});

			return { result: 'error', metadata: undefined, content: undefined };
		}

		if (isNullish(docContent)) {
			toasts.error({
				msg: { text: get(i18n).editor.errors.content_not_found }
			});

			return { result: 'error', metadata: undefined, content: undefined };
		}

		const { data: editableMetadata, ...metadata } = docMetadata;

		const { data: markdownContent, ...content } = docContent;

		// TODO: support for assets
		const assets = undefined;

		await init({
			key: routeKey,
			metadata: editableMetadata,
			content: markdownContent,
			docMetadata: {
				...metadata,
				data: editableMetadata
			},
			docContent: content as Omit<Doc<PostMetadata>, 'data'> | undefined,
			newPost: false,
			assets
		});

		return {
			result: 'ok',
			metadata: editableMetadata,
			content: markdownContent
		};
	} catch (err: unknown) {
		toasts.error({
			msg: { text: get(i18n).editor.errors.load },
			err
		});

		return { result: 'error', metadata: undefined, content: undefined };
	}
};

const initNewPost = async (): Promise<InitPostResult> => {
	try {
		const key = window.crypto.randomUUID();
		const content = template;

		await Promise.all([
			init({
				key,
				content,
				metadata: undefined,
				docMetadata: undefined,
				docContent: undefined,
				newPost: true,
				assets: undefined
			}),
			updateUrl(key)
		]);

		return {
			result: 'ok',
			content,
			metadata: undefined
		};
	} catch (err: unknown) {
		toasts.error({
			msg: { text: get(i18n).editor.errors.init },
			err
		});

		return { result: 'error', content: undefined, metadata: undefined };
	}
};

// eslint-disable-next-line require-await
const updateUrl = async (proposalKey: string) => {
	const url: URL = new URL(window.location.href);

	url.searchParams.delete('key');
	url.searchParams.append('key', encodeURI(proposalKey));

	replaceHistory(url);
};

const getDocs = async (
	key: PostKey
): Promise<[Doc<PostMetadata> | undefined, Doc<PostContent> | undefined]> => {
	const [metadata, content] = await getManyDocs({
		docs: [
			{
				collection: 'metadata',
				key
			},
			{
				collection: 'content',
				key
			}
		]
	});

	return [metadata, content];
};

export const updateTitleAndDescription = async ({ article }: { article: Element }) => {
	// The article contains a div that is the contenteditable container.
	const contentEditable = article.firstElementChild;

	const title = contentEditable?.querySelector('*:nth-child(1)');
	const firstParagraph = contentEditable?.querySelector('*:nth-child(2)');

	const idbData = await getMetadata();
	const existingMetadata = nonNullish(idbData?.[1]) ? idbData[1] : { status: 'draft' as const };

	await setMetadata({
		...existingMetadata,
		title:
			title?.nodeType === Node.ELEMENT_NODE && notEmptyString(title?.textContent)
				? title.textContent
				: undefined,
		// TODO: if description is length > 500 => 497 chars + ...
		description:
			firstParagraph?.nodeType === Node.ELEMENT_NODE && notEmptyString(firstParagraph?.textContent)
				? firstParagraph.textContent.substring(0, DESCRIPTION_MAX_LENGTH)
				: undefined
	});
};
