import {
	DESCRIPTION_MAX_LENGTH,
	TITLE_MAX_LENGTH,
	URL_SLUG_MAX_LENGTH
} from '$lib/constants/publish.constants';
import { notEmptyString } from '@dfinity/utils';

export const validateTitle = (title: string | undefined): boolean => notEmptyString(title) && title.length <= TITLE_MAX_LENGTH;

export const validateDescription = (description: string | undefined): boolean => notEmptyString(description) && description.length <= DESCRIPTION_MAX_LENGTH;

// TODO: improve validation
export const validateSlug = (slug: string | undefined): boolean => notEmptyString(slug) && slug.length <= URL_SLUG_MAX_LENGTH;

export const validateCanonical = (canonical: string | undefined): boolean => {
	try {
		const url: URL = new URL(canonical ?? '');

		return url.protocol === 'https:';
	} catch (_err: unknown) {
		return false;
	}
};
