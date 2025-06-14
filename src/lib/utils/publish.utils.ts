import { STORAGE_COLLECTION_CONTENT } from '$lib/constants/publish.constants';

export const titleToSlug = (title: string | undefined): string =>
	encodeURIComponent((title ?? '').replaceAll(' ', '-')).toLowerCase();

export const keyToFullPath = ({
	key,
	collection = STORAGE_COLLECTION_CONTENT
}: {
	key: string;
	collection?: string;
}): string => `/${collection}/${key}.html`;
